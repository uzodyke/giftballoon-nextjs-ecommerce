import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to pence
      currency,
      metadata: {
        orderId,
        customerEmail: orderDetails?.customerEmail || 'guest@giftballoon.com',
        customerName: orderDetails?.customerName || 'Guest Customer',
        items: JSON.stringify(orderDetails?.items || [])
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