import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  selectedOptions?: Record<string, any>
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export async function POST(request: NextRequest) {
  try {
    // Improved JSON parsing with error handling
    let body
    try {
      body = await request.json()
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { amount, currency = 'gbp', orderDetails } = body

    console.log('Create payment intent request:', { amount, currency, orderDetails })

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      )
    }

    // Validate Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured')
      return NextResponse.json(
        { error: 'Payment system not properly configured' },
        { status: 500 }
      )
    }

    // Generate order ID
    const orderId = `GB-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

    // Persist the cart line-items in the PaymentIntent metadata so the webhook
    // can reconstruct the full order after payment. Stripe caps each metadata
    // value at 500 chars, so the items JSON is split across items_0, items_1…
    const items = (orderDetails?.items as OrderItem[]) || []
    const itemsJson = JSON.stringify(items)
    const itemChunks: Record<string, string> = {}
    for (let i = 0; i * 450 < itemsJson.length; i++) {
      itemChunks[`items_${i}`] = itemsJson.slice(i * 450, (i + 1) * 450)
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to pence
      currency,
      metadata: {
        orderId,
        itemCount: items.length.toString(),
        itemSummary: items
          .map((item: OrderItem) => `${item.name} (x${item.quantity})`)
          .join(', ')
          .substring(0, 400), // Keep under 500 char limit
        subtotal: String(orderDetails?.subtotal ?? ''),
        deliveryFee: String(orderDetails?.deliveryFee ?? ''),
        total: String(orderDetails?.total ?? amount),
        currency,
        ...itemChunks,
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always'
      },
      description: `GiftBalloon Order ${orderId}`,
      receipt_email: orderDetails?.customerEmail,
    })

    console.log('Payment intent created successfully:', paymentIntent.id)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Payment intent creation failed:', error)

    return NextResponse.json(
      {
        error: 'Payment intent creation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}