'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/admin/session', { method: 'DELETE' })
      if (auth) await auth.signOut()
    } catch {
      // ignore — we redirect regardless
    }
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </button>
  )
}
