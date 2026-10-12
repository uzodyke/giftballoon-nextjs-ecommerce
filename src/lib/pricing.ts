import { products, getProductById, Product } from '@/data/products'

// Single source of truth for what a cart line costs. Used by the cart (to
// refresh prices saved in localStorage) and by the payment API (so the amount
// charged never comes from the browser).

export interface PriceableItem {
  id: string
  productId?: string
  quantity: number
  selectedOptions?: { balloonType?: string } & Record<string, unknown>
}

// Cart item ids are `${product.id}-${suffix}`. Older carts have no productId
// field, so fall back to the longest catalogue id that prefixes the cart id.
export function resolveProduct(item: Pick<PriceableItem, 'id' | 'productId'>): Product | undefined {
  if (item.productId) return getProductById(item.productId)
  return products
    .filter(p => item.id === p.id || item.id.startsWith(`${p.id}-`))
    .sort((a, b) => b.id.length - a.id.length)[0]
}

// Base price plus any paid style upgrade. Returns undefined for unknown products.
export function getUnitPrice(item: PriceableItem): number | undefined {
  const product = resolveProduct(item)
  if (!product || !product.inStock) return undefined

  let price = product.price
  const balloonType = item.selectedOptions?.balloonType
  if (balloonType && product.options?.styles) {
    const style = product.options.styles.find(s => s.name === balloonType)
    if (style) price += style.price
  }
  return price
}

// Delivery fee calculation (flat standard delivery)
export const calculateDeliveryFee = (_subtotal: number): number => {
  return 5.99
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
