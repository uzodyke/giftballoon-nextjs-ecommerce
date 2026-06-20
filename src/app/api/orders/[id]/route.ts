import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Timestamp } from 'firebase-admin/firestore'
import { adminDb, isFirebaseAdminConfigured } from '@/lib/firebaseAdmin'
import type { Order } from '@/lib/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export const runtime = 'nodejs'

// GET /api/orders/:id?cs=<paymentIntent client secret>
// The client secret proves the caller is the buyer (only they receive it),
// gating access to the order's PII without requiring a login.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const clientSecret = request.nextUrl.searchParams.get('cs')

  if (!clientSecret) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 401 })
  }
  if (!isFirebaseAdminConfigured || !adminDb) {
    return NextResponse.json({ error: 'Orders unavailable' }, { status: 503 })
  }

  // Verify the client secret belongs to a PaymentIntent for this order.
  try {
    const intentId = clientSecret.split('_secret_')[0]
    const pi = await stripe.paymentIntents.retrieve(intentId)
    if (pi.client_secret !== clientSecret || pi.metadata.orderId !== id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const snap = await adminDb.collection('orders').doc(id).get()
  if (!snap.exists) {
    // Webhook may not have landed yet — tell the page to keep showing
    // a "processing" state rather than an error.
    return NextResponse.json({ orderId: id, status: 'processing' }, { status: 202 })
  }

  const data = snap.data() as Omit<Order, 'createdAt'> & { createdAt?: Timestamp }
  const order: Order = {
    ...data,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
  }

  return NextResponse.json(order)
}
