import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Config check for the order pipeline. Reports only booleans and error
// messages — never secret values — so it is safe to hit unauthenticated.
// Exists because a broken Firebase credential in production silently killed
// the Stripe webhook for weeks with no visible symptom on the storefront.
//
// firebaseAdmin is imported dynamically inside a try/catch: if that module
// ever fails to load again, this endpoint must report the reason rather than
// crash with it.
export async function GET() {
  const checks: Record<string, unknown> = {
    stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    resendApiKey: Boolean(process.env.RESEND_API_KEY),
    orderNotifyEmail: Boolean(process.env.ORDER_NOTIFY_EMAIL || process.env.ADMIN_EMAIL),
    firebaseProjectId: Boolean(process.env.FIREBASE_PROJECT_ID),
    firebaseClientEmail: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
    firebasePrivateKey: Boolean(process.env.FIREBASE_PRIVATE_KEY),
  }

  try {
    const { adminDb, isFirebaseAdminConfigured, firebaseAdminError } = await import(
      '@/lib/firebaseAdmin'
    )
    checks.firebaseAdminInit = isFirebaseAdminConfigured
    checks.firebaseAdminError = firebaseAdminError

    // A live round-trip: credentials can parse and still lack Firestore IAM.
    if (isFirebaseAdminConfigured && adminDb) {
      try {
        await adminDb.collection('orders').limit(1).get()
        checks.firestoreRead = 'ok'
      } catch (err) {
        checks.firestoreRead = err instanceof Error ? err.message : String(err)
      }
    } else {
      checks.firestoreRead = 'skipped'
    }
  } catch (err) {
    checks.firebaseAdminInit = false
    checks.firebaseAdminError = `module load failed: ${
      err instanceof Error ? (err.stack ?? err.message) : String(err)
    }`
    checks.firestoreRead = 'skipped'
  }

  const healthy =
    checks.stripeSecretKey === true &&
    checks.stripeWebhookSecret === true &&
    checks.firebaseAdminInit === true &&
    checks.firestoreRead === 'ok' &&
    checks.resendApiKey === true &&
    checks.orderNotifyEmail === true

  return NextResponse.json({ healthy, checks }, { status: healthy ? 200 : 503 })
}
