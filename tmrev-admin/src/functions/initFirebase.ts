import { initializeApp, cert, getApps } from "firebase-admin/app";
const certs = require("../../../cred.json");

const initFirebase = () => {
  try {
    // Check if an app is already initialized
    if (getApps().length > 0) {
      return getApps()[0];
    }

    const firebaseApp = initializeApp({
      credential: cert(certs),
    });
  
    return firebaseApp
  } catch (error) {
    console.error(error)
  }
}

export { initFirebase }