import { initializeApp, cert } from "firebase-admin/app";
const certs = require("../../../cred.json");

const initFirebase = () => {
  try {
    const firebaseApp = initializeApp({
      credential: cert(certs),
    });
  
    return firebaseApp
  } catch (error) {
    console.error(error)
  }
}

export { initFirebase }