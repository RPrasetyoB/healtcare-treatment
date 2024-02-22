import { initializeFirebase } from "./dbService";

export const db = initializeFirebase();

export const dbConnection = async () => {
  try {
    const response = await db.collection('patient').doc('1').get();

    if (response.exists) {
      console.log("Connected to Firestore database");
    } else {
      console.log("Failed to connect to Firestore database");
    }
  } catch (error) {
    console.error(error);
  }
};
