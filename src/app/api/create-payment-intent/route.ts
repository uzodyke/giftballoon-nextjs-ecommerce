import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { calculateOrderTotal, getUnitPrice, resolveProduct } from '@/lib/pricing'

interface OrderItem {
  id: string
  productId?: string
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

    const { orderDetails } = body
    const currency = 'gbp'

    // Never trust prices or totals from the browser: rebuild every line from
    // the product catalogue and charge only what the server calculates.
    const rawItems = Array.isArray(orderDetails?.items) ? orderDetails.items : []
    if (rawItems.length === 0) {
      return NextResponse.json({ error: 'Your cart is empty' }, { status: 400 })
    }

    const items: OrderItem[] = []
    for (const raw of rawItems) {
      const quantity = Number(raw?.quantity)
      if (typeof raw?.id !== 'string' || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        return NextResponse.json({ error: 'Invalid item in cart' }, { status: 400 })
      }
      const product = resolveProduct(raw)
      const price = product && getUnitPrice({ ...raw, quantity })
      if (!product || price === undefined) {
        return NextResponse.json(
          { error: `"${raw.name ?? raw.id}" is no longer available. Please remove it from your cart.` },
          { status: 400 }
        )
      }
      items.push({
        id: raw.id,
        productId: product.id,
        name: product.name,
        price,
        quantity,
        selectedOptions: raw.selectedOptions ?? {},
      })
    }

    const subtotal = Math.round(items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100
    const { deliveryFee, total } = calculateOrderTotal(subtotal)
    const amount = Math.round(total * 100) / 100

    console.log('Create payment intent request:', { amount, currency, itemCount: items.length })

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
        subtotal: String(subtotal),
        deliveryFee: String(deliveryFee),
        total: String(amount),
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
      paymentIntentId: paymentIntent.id,
      subtotal,
      deliveryFee,
      total: amount,
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