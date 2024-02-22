import { initializeFirebase } from "../utils/firebaseService"

const db = initializeFirebase()

export const dbConnection = () => {
    if (db) {
      console.log("Connected to Firestore database");
    } else {
      console.error("Failed to connect to Firestore database");
    }
  };