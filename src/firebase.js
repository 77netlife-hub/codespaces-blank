import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCH2FjaTIqIdgd_00ntXFXUBgLF23joXwQ",
  authDomain: "livra-uganda.firebaseapp.com",
  databaseURL: "https://livra-uganda-default-rtdb.firebaseio.com",
  projectId: "livra-uganda",
  storageBucket: "livra-uganda.firebasestorage.app",
  messagingSenderId: "93859601052",
  appId: "1:93859601052:web:03209abe638f2121f32b59",
  measurementId: "G-QSFMN15B86"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const rtdb = getDatabase(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
