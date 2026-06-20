import { redirect } from 'next/navigation'
import { Timestamp } from 'firebase-admin/firestore'
import { adminDb, isFirebaseAdminConfigured } from '@/lib/firebaseAdmin'
import { getAdminSession } from '@/lib/admin'
import type { Address, Order } from '@/lib/types'
import LogoutButton from './LogoutButton'

// Always render fresh — orders change constantly and this is behind auth.
export const dynamic = 'force-dynamic'

function formatAddress(addr: Address): string {
  return [addr.line1, addr.line2, addr.city, addr.postal_code, addr.country]
    .filter(Boolean)
    .join(', ')
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

async function getOrders(): Promise<Order[]> {
  if (!isFirebaseAdminConfigured || !adminDb) return []
  const snap = await adminDb
    .collection('orders')
    .orderBy('createdAt', 'desc')
    .limit(200)
    .get()

  return snap.docs.map((doc) => {
    const data = doc.data() as Omit<Order, 'createdAt'> & { createdAt?: Timestamp }
    return {
      ...data,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : '',
    }
  })
}

export default async function AdminOrdersPage() {
  const adminEmail = await getAdminSession()
  if (!adminEmail) {
    redirect('/admin/login')
  }

  const orders = await getOrders()

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-gray-600">
              Signed in as {adminEmail} · {orders.length} order
              {orders.length === 1 ? '' : 's'}
            </p>
          </div>
          <LogoutButton />
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-600">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="font-mono font-semibold text-gray-900">
                      {order.orderId}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-900">
                      £{order.total.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Customer</div>
                    <div className="text-gray-600">{order.customer?.name}</div>
                    <div className="text-gray-600">{order.customer?.email}</div>
                    {order.customer?.phone && (
                      <div className="text-gray-600">{order.customer.phone}</div>
                    )}
                  </div>

                  <div>
                    <div className="font-medium text-gray-900 mb-1">Items</div>
                    <ul className="text-gray-600 space-y-0.5">
                      {order.items?.map((item, i) => (
                        <li key={`${item.id}-${i}`}>
                          {item.name} × {item.quantity}
                          {item.selectedOptions?.customMessage && (
                            <span className="text-gray-400">
                              {' '}
                              — “{item.selectedOptions.customMessage}”
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="font-medium text-gray-900 mb-1">Billing address</div>
                    <div className="text-gray-600">{formatAddress(order.billingAddress)}</div>
                  </div>

                  <div>
                    <div className="font-medium text-gray-900 mb-1">Delivery address</div>
                    {order.deliverySameAsBilling ? (
                      <div className="text-gray-500 italic">Same as billing</div>
                    ) : (
                      <div className="text-gray-600">
                        {formatAddress(order.deliveryAddress)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
