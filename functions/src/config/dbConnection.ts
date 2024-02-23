import { initializeFirebase } from "./dbService";

export const db = initializeFirebase();


// check DB connection
export const dbConnection = async () => {
  try {
    const response = await db.collection('test').doc("1").get();
    if (response.exists) {
      console.log("Connected to Firestore database");
    } else {
      console.log("Failed to connect to Firestore database");
    }
  } catch (error) {
    console.error(error);
  }
};
