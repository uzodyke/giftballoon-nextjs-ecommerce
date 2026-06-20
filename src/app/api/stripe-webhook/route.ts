import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { FieldValue } from 'firebase-admin/firestore'
import { adminDb, isFirebaseAdminConfigured } from '@/lib/firebaseAdmin'
import type { Address, OrderItem } from '@/lib/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

// Stripe needs the raw, unparsed body to verify the signature.
export const runtime = 'nodejs'

function toAddress(addr: Stripe.Address | null | undefined): Address {
  return {
    line1: addr?.line1 ?? '',
    line2: addr?.line2 ?? '',
    city: addr?.city ?? '',
    postal_code: addr?.postal_code ?? '',
    country: addr?.country ?? 'GB',
  }
}

function sameAddress(a: Address, b: Address): boolean {
  return (
    a.line1.trim().toLowerCase() === b.line1.trim().toLowerCase() &&
    a.postal_code.replace(/\s/g, '').toLowerCase() ===
      b.postal_code.replace(/\s/g, '').toLowerCase() &&
    a.city.trim().toLowerCase() === b.city.trim().toLowerCase()
  )
}

// Reassemble the items JSON that create-payment-intent split across items_0…
function parseItems(metadata: Stripe.Metadata): OrderItem[] {
  const chunks: string[] = []
  for (let i = 0; metadata[`items_${i}`] !== undefined; i++) {
    chunks.push(metadata[`items_${i}`])
  }
  if (chunks.length === 0) return []
  try {
    return JSON.parse(chunks.join('')) as OrderItem[]
  } catch {
    return []
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get('stripe-signature')

  if (!webhookSecret || webhookSecret.includes('your_webhook_secret')) {
    console.error('Stripe webhook secret not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const body = await request.text()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'payment_intent.succeeded') {
    // Acknowledge events we don't act on so Stripe stops retrying.
    return NextResponse.json({ received: true })
  }

  if (!isFirebaseAdminConfigured || !adminDb) {
    console.warn('Firebase admin not configured — order not persisted')
    return NextResponse.json({ received: true })
  }

  try {
    const intentId = (event.data.object as Stripe.PaymentIntent).id
    // Re-fetch with the payment method expanded so we get billing details.
    const pi = await stripe.paymentIntents.retrieve(intentId, {
      expand: ['payment_method'],
    })

    const orderId = pi.metadata.orderId
    if (!orderId) {
      console.error('PaymentIntent has no orderId metadata:', intentId)
      return NextResponse.json({ received: true })
    }

    const pm = pi.payment_method as Stripe.PaymentMethod | null
    const billingDetails = pm?.billing_details
    const billingAddress = toAddress(billingDetails?.address)
    const deliveryAddress = toAddress(pi.shipping?.address)
    const deliverySameAsBilling = sameAddress(billingAddress, deliveryAddress)

    const order = {
      orderId,
      paymentIntentId: pi.id,
      status: 'paid' as const,
      customer: {
        name: billingDetails?.name ?? pi.shipping?.name ?? '',
        email: billingDetails?.email ?? pi.receipt_email ?? '',
        phone: billingDetails?.phone ?? '',
      },
      billingAddress,
      deliveryAddress,
      deliverySameAsBilling,
      items: parseItems(pi.metadata),
      subtotal: Number(pi.metadata.subtotal) || 0,
      deliveryFee: Number(pi.metadata.deliveryFee) || 0,
      total: Number(pi.metadata.total) || pi.amount / 100,
      currency: pi.currency,
      createdAt: FieldValue.serverTimestamp(),
    }

    // Doc id = orderId makes the write idempotent across Stripe retries.
    const ref = adminDb.collection('orders').doc(orderId)
    const existing = await ref.get()
    if (existing.exists) {
      await ref.set({ status: 'paid', paymentIntentId: pi.id }, { merge: true })
    } else {
      await ref.set(order)
    }

    console.log('Order persisted from webhook:', orderId)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Failed to persist order from webhook:', error)
    return NextResponse.json({ error: 'Failed to persist order' }, { status: 500 })
  }
}
