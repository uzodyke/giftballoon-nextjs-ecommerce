import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { FieldValue } from 'firebase-admin/firestore'
import { adminDb, isFirebaseAdminConfigured, firebaseAdminError } from '@/lib/firebaseAdmin'
import { sendOrderNotification } from '@/lib/notify'
import type { Address, Order, OrderItem } from '@/lib/types'

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

function buildOrder(pi: Stripe.PaymentIntent, orderId: string): Order {
  const pm = pi.payment_method as Stripe.PaymentMethod | null
  const billingDetails = pm?.billing_details
  const billingAddress = toAddress(billingDetails?.address)
  const deliveryAddress = toAddress(pi.shipping?.address)

  return {
    orderId,
    paymentIntentId: pi.id,
    status: 'paid',
    customer: {
      name: billingDetails?.name ?? pi.shipping?.name ?? '',
      email: billingDetails?.email ?? pi.receipt_email ?? '',
      phone: billingDetails?.phone ?? pi.shipping?.phone ?? '',
    },
    billingAddress,
    deliveryAddress,
    deliverySameAsBilling: sameAddress(billingAddress, deliveryAddress),
    deliveryRecipientName: pi.shipping?.name ?? '',
    items: parseItems(pi.metadata),
    subtotal: Number(pi.metadata.subtotal) || 0,
    deliveryFee: Number(pi.metadata.deliveryFee) || 0,
    total: Number(pi.metadata.total) || pi.amount / 100,
    currency: pi.currency,
    createdAt: new Date(pi.created * 1000).toISOString(),
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

  let order: Order
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

    order = buildOrder(pi, orderId)
  } catch (error) {
    console.error('Failed to read PaymentIntent from Stripe:', error)
    return NextResponse.json({ error: 'Failed to read payment' }, { status: 500 })
  }

  // Firestore and email are deliberately independent. A Firestore outage used
  // to swallow the order entirely; now the email still goes out, and vice
  // versa. Only a total failure of both returns non-2xx to trigger a retry.
  const ref = isFirebaseAdminConfigured && adminDb
    ? adminDb.collection('orders').doc(order.orderId)
    : null

  // Doc id = orderId makes the write idempotent across Stripe retries, and the
  // notifiedAt marker stops a retry from re-sending the email.
  let alreadyNotified = false
  if (ref) {
    try {
      const existing = await ref.get()
      alreadyNotified = Boolean(existing.exists && existing.data()?.notifiedAt)
    } catch (error) {
      console.error('Could not read existing order doc:', error)
    }
  }

  const notification = alreadyNotified
    ? { sent: false, error: 'already notified' }
    : await sendOrderNotification(order)

  let persisted = false
  if (!ref) {
    console.error(
      'ORDER NOT PERSISTED — Firebase admin unavailable:',
      order.orderId,
      firebaseAdminError ?? 'unknown reason'
    )
  } else {
    try {
      await ref.set(
        {
          ...order,
          createdAt: FieldValue.serverTimestamp(),
          ...(notification.sent ? { notifiedAt: FieldValue.serverTimestamp() } : {}),
        },
        { merge: true }
      )
      persisted = true
      console.log('Order persisted from webhook:', order.orderId)
    } catch (error) {
      console.error('ORDER NOT PERSISTED — Firestore write failed:', order.orderId, error)
    }
  }

  // Nothing worked: no record, nobody told. Fail loudly so Stripe retries.
  if (!persisted && !notification.sent && !alreadyNotified) {
    return NextResponse.json(
      { error: 'Order could not be recorded or notified' },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true, persisted, notified: notification.sent })
}
