// Server-side Firebase Admin SDK. Used by API routes (webhook write, order
// reads, admin auth verification). Bypasses Firestore security rules, so it
// must only ever be imported from server code.
//
// Initialisation NEVER throws. A malformed FIREBASE_PRIVATE_KEY used to blow
// up at module scope, which took down every route that imported this file
// (webhook included) with an opaque 500 before any handler ran — orders were
// lost with no trace. Failures are now captured in `firebaseAdminError` and
// callers degrade gracefully.
import { initializeApp, getApps, getApp, cert, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'
import { getAuth, type Auth } from 'firebase-admin/auth'

// Env values pasted through dashboards pick up junk: wrapping quotes, literal
// "\n" instead of newlines, or the whole PEM base64-encoded. Normalise all three.
function normalisePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  let key = raw.trim()

  // Strip a single layer of wrapping quotes (Vercel/shell paste artefact).
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1)
  }

  // Some setups store the PEM base64-encoded to dodge newline handling entirely.
  if (!key.includes('BEGIN') && /^[A-Za-z0-9+/=\s]+$/.test(key)) {
    try {
      const decoded = Buffer.from(key, 'base64').toString('utf8')
      if (decoded.includes('BEGIN')) key = decoded
    } catch {
      // fall through — treat as a normal (broken) key and let cert() report it
    }
  }

  // Turn literal backslash-n sequences back into real newlines for the PEM parser.
  return key.replace(/\\n/g, '\n').trim()
}

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = normalisePrivateKey(process.env.FIREBASE_PRIVATE_KEY)

const hasCredentials = Boolean(projectId && clientEmail && privateKey)

let adminApp: App | null = null
let initError: string | null = null

if (!hasCredentials) {
  const missing = [
    !projectId && 'FIREBASE_PROJECT_ID',
    !clientEmail && 'FIREBASE_CLIENT_EMAIL',
    !privateKey && 'FIREBASE_PRIVATE_KEY',
  ].filter(Boolean)
  initError = `Missing env vars: ${missing.join(', ')}`
} else {
  try {
    adminApp = getApps().length
      ? getApp()
      : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  } catch (err) {
    // Almost always a malformed private key ("Failed to parse private key").
    initError = err instanceof Error ? err.message : String(err)
    adminApp = null
    console.error('Firebase admin init failed:', initError)
  }
}

// getFirestore/getAuth can also throw (bad project id, unavailable bundle), so
// they are guarded too — nothing in this module may take down its importers.
let db: Firestore | null = null
let auth: Auth | null = null

if (adminApp) {
  try {
    db = getFirestore(adminApp)
    auth = getAuth(adminApp)
  } catch (err) {
    initError = err instanceof Error ? err.message : String(err)
    db = null
    auth = null
    console.error('Firebase admin service init failed:', initError)
  }
}

export const adminDb: Firestore | null = db
export const adminAuth: Auth | null = auth
export const isFirebaseAdminConfigured = db !== null && auth !== null
export const firebaseAdminError = initError
