import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
// This uses Application Default Credentials (ADC) automatically.
// On Cloud Run, it uses the service account.
// Locally, it uses your 'gcloud auth login' credentials.
initializeApp({
    credential: applicationDefault(),
    projectId: 'job-applier-479614'
});

export const auth = getAuth();
export const db = getFirestore();
