// Shared order/data-model types for the Firestore `orders` collection.

export interface Address {
  line1: string
  line2?: string
  city: string
  postal_code: string
  country: string // GB-only for now
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  selectedOptions?: Record<string, string>
}

export interface OrderCustomer {
  name: string
  email: string
  phone?: string
}

export type OrderStatus =
  | 'paid'
  | 'processing'
  | 'fulfilled'
  | 'cancelled'

export interface Order {
  orderId: string
  paymentIntentId: string
  status: OrderStatus
  customer: OrderCustomer
  billingAddress: Address
  deliveryAddress: Address
  deliverySameAsBilling: boolean
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  currency: string
  // ISO string when serialised over the API; Firestore stores a Timestamp.
  createdAt: string
}
