// Helpers shared by the admin session route and the protected admin pages.
import { cookies } from 'next/headers'
import { adminAuth, isFirebaseAdminConfigured } from '@/lib/firebaseAdmin'

export const ADMIN_SESSION_COOKIE = 'admin_session'

// Allowed admin emails — single value, or a comma-separated list.
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false
  return getAdminEmails().includes(email.toLowerCase())
}

// Returns the verified admin email if the current request has a valid admin
// session cookie, otherwise null. Server-only.
export async function getAdminSession(): Promise<string | null> {
  if (!isFirebaseAdminConfigured || !adminAuth) return null

  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  if (!session) return null

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true)
    if (!isAdminEmail(decoded.email)) return null
    return decoded.email ?? null
  } catch {
    return null
  }
}
