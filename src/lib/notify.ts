// Order notifications for the shop owner.
//
// Sent over Resend's HTTPS API rather than SMTP: outbound SMTP from Vercel
// serverless functions is slow and frequently blocked, and a hung socket would
// stall the Stripe webhook past its timeout. Plain fetch, no extra dependency.
import type { Address, Order } from '@/lib/types'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

// Resend's shared sender works with no domain verification, but only delivers
// to the address that owns the Resend account. Override once a domain is set up.
const DEFAULT_FROM = 'GiftBalloon Orders <onboarding@resend.dev>'

export interface NotifyResult {
  sent: boolean
  error?: string
}

function recipients(): string[] {
  return (process.env.ORDER_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
}

function formatAddress(addr: Address | undefined): string {
  if (!addr) return '—'
  const parts = [addr.line1, addr.line2, addr.city, addr.postal_code, addr.country]
  return parts.filter(Boolean).join(', ') || '—'
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function money(amount: number, currency: string): string {
  const symbol = currency.toLowerCase() === 'gbp' ? '£' : ''
  return `${symbol}${amount.toFixed(2)}`
}

function buildHtml(order: Order, stripeUrl: string): string {
  const items = order.items
    .map((item) => {
      const opts = item.selectedOptions ?? {}
      const extras = Object.entries(opts)
        .filter(([, v]) => Boolean(v))
        .map(([k, v]) => `<div style="color:#6b7280;font-size:13px">${escapeHtml(k)}: ${escapeHtml(String(v))}</div>`)
        .join('')
      return `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">
          <strong>${escapeHtml(item.name)}</strong> × ${item.quantity}
          ${extras}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">
          ${money(item.price * item.quantity, order.currency)}
        </td>
      </tr>`
    })
    .join('')

  const delivery = order.deliverySameAsBilling
    ? formatAddress(order.billingAddress)
    : `${order.deliveryRecipientName ? escapeHtml(order.deliveryRecipientName) + '<br>' : ''}${escapeHtml(formatAddress(order.deliveryAddress))}`

  return `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 4px">New order — ${money(order.total, order.currency)}</h1>
    <div style="color:#6b7280;font-size:13px;margin-bottom:20px">Order ${escapeHtml(order.orderId)}</div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">${items}
      <tr><td style="padding:8px 0;color:#6b7280">Delivery</td><td style="padding:8px 0;text-align:right">${money(order.deliveryFee, order.currency)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Total</td><td style="padding:8px 0;text-align:right;font-weight:600">${money(order.total, order.currency)}</td></tr>
    </table>

    <h2 style="font-size:15px;margin:0 0 6px">Customer</h2>
    <div style="color:#374151;font-size:14px;margin-bottom:16px">
      ${escapeHtml(order.customer.name || '—')}<br>
      ${escapeHtml(order.customer.email || '—')}<br>
      ${escapeHtml(order.customer.phone || 'no phone given')}
    </div>

    <h2 style="font-size:15px;margin:0 0 6px">Deliver to</h2>
    <div style="color:#374151;font-size:14px;margin-bottom:20px">${delivery}</div>

    <a href="${stripeUrl}" style="display:inline-block;background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-size:14px">View payment in Stripe</a>
  </div></body></html>`
}

function buildText(order: Order, stripeUrl: string): string {
  const items = order.items
    .map((item) => {
      const opts = Object.entries(item.selectedOptions ?? {})
        .filter(([, v]) => Boolean(v))
        .map(([k, v]) => `      ${k}: ${v}`)
        .join('\n')
      return `  - ${item.name} x${item.quantity}  ${money(item.price * item.quantity, order.currency)}${opts ? '\n' + opts : ''}`
    })
    .join('\n')

  return [
    `New order ${order.orderId} — ${money(order.total, order.currency)}`,
    '',
    'Items:',
    items,
    `  Delivery: ${money(order.deliveryFee, order.currency)}`,
    `  Total: ${money(order.total, order.currency)}`,
    '',
    'Customer:',
    `  ${order.customer.name || '—'}`,
    `  ${order.customer.email || '—'}`,
    `  ${order.customer.phone || 'no phone given'}`,
    '',
    'Deliver to:',
    order.deliverySameAsBilling
      ? `  ${formatAddress(order.billingAddress)}`
      : `  ${order.deliveryRecipientName || ''}\n  ${formatAddress(order.deliveryAddress)}`,
    '',
    stripeUrl,
  ].join('\n')
}

// Never throws — a notification failure must not roll back a paid order.
export async function sendOrderNotification(order: Order): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY
  const to = recipients()

  if (!apiKey) {
    console.error('ORDER NOTIFICATION SKIPPED: RESEND_API_KEY is not set', order.orderId)
    return { sent: false, error: 'RESEND_API_KEY not set' }
  }
  if (to.length === 0) {
    console.error('ORDER NOTIFICATION SKIPPED: ORDER_NOTIFY_EMAIL is not set', order.orderId)
    return { sent: false, error: 'ORDER_NOTIFY_EMAIL not set' }
  }

  const stripeUrl = `https://dashboard.stripe.com/payments/${order.paymentIntentId}`

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.ORDER_NOTIFY_FROM || DEFAULT_FROM,
        to,
        reply_to: order.customer.email || undefined,
        subject: `New order ${order.orderId} — ${money(order.total, order.currency)}`,
        html: buildHtml(order, stripeUrl),
        text: buildText(order, stripeUrl),
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('Order notification failed:', response.status, detail)
      return { sent: false, error: `Resend ${response.status}: ${detail.slice(0, 200)}` }
    }

    console.log('Order notification sent:', order.orderId, '->', to.join(', '))
    return { sent: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Order notification threw:', message)
    return { sent: false, error: message }
  }
}
