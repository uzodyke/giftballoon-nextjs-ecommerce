import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Stripe configuration
export const stripeConfig = {
  currency: 'gbp',
  locale: 'en-GB' as const,

  // Appearance customization for Stripe Elements
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#db2777', // pink-600
      colorBackground: '#ffffff',
      colorText: '#374151', // gray-700
      colorDanger: '#ef4444', // red-500
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        border: '2px solid #e5e7eb', // gray-200
        padding: '12px',
        fontSize: '16px',
      },
      '.Input:focus': {
        borderColor: '#db2777', // pink-600
        boxShadow: '0 0 0 2px rgba(219, 39, 119, 0.1)',
      },
      '.Label': {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151', // gray-700
      },
    },
  },
}

// Delivery fee calculation
export const calculateDeliveryFee = (subtotal: number): number => {
  return subtotal >= 50 ? 0 : 5.99
}

// Order total calculation
export const calculateOrderTotal = (subtotal: number): {
  subtotal: number
  deliveryFee: number
  total: number
} => {
  const deliveryFee = calculateDeliveryFee(subtotal)
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  }
}