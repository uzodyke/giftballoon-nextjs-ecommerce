// Server-side Firebase Admin SDK. Used by API routes (webhook write, order
// reads, admin auth verification). Bypasses Firestore security rules, so it
// must only ever be imported from server code.
// Degrades gracefully: if the service-account env vars are absent, `adminDb`
// and `adminAuth` are null and callers should handle that.
import { initializeApp, getApps, getApp, cert, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'
import { getAuth, type Auth } from 'firebase-admin/auth'

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
// The private key is stored with literal "\n" sequences in the env var; turn
// them back into real newlines for the PEM parser.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

export const isFirebaseAdminConfigured = Boolean(
  projectId && clientEmail && privateKey
)

let adminApp: App | null = null

if (isFirebaseAdminConfigured) {
  adminApp = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      })
}

export const adminDb: Firestore | null = adminApp ? getFirestore(adminApp) : null
export const adminAuth: Auth | null = adminApp ? getAuth(adminApp) : null
