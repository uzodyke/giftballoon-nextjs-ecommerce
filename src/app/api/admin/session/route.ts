import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, isFirebaseAdminConfigured } from '@/lib/firebaseAdmin'
import { ADMIN_SESSION_COOKIE, isAdminEmail } from '@/lib/admin'

export const runtime = 'nodejs'

// Session cookie lifetime: 5 days.
const EXPIRES_IN_MS = 5 * 24 * 60 * 60 * 1000

// POST: exchange a Firebase ID token (from client sign-in) for an HTTP-only
// admin session cookie. Rejects anyone whose email isn't an allowed admin.
export async function POST(request: NextRequest) {
  if (!isFirebaseAdminConfigured || !adminAuth) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 })
  }

  let idToken: string | undefined
  try {
    ({ idToken } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!idToken) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken)
    if (!isAdminEmail(decoded.email)) {
      return NextResponse.json({ error: 'Not authorised' }, { status: 403 })
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: EXPIRES_IN_MS,
    })

    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: EXPIRES_IN_MS / 1000,
    })
    return response
  } catch (err) {
    console.error('Admin session creation failed:', err)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

// DELETE: log out by clearing the session cookie.
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
