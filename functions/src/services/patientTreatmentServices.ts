import ErrorHandler from "../utils/errorHandler";
import { db } from "../config/dbConnection";
import { v4 as uuidv4 } from "uuid";

// Create new patient data and treatment
const createPatientTreatmentService = async ({ patientId, patientName, treatment, date, cost, medication }: PatientTreamentInput) => {
    try {
        const result = await db.runTransaction(async (transaction) => {
            // Check if patient already exists
            const existingPatientRef = db.collection("patient").doc(patientId);
            const existingPatient = await transaction.get(existingPatientRef);

            let newTreatmentObject, newMedicationObject;

            // If patient exists, return existing data
            if (existingPatient.exists) {
                const patientData = existingPatient.data();

                // Create new treatment
                const treatmentId = uuidv4();
                const newTreatmentRef = db.collection("treatment").doc(treatmentId);
                newTreatmentObject = {
                    patient_id: patientId,
                    treatment_description: treatment,
                    treatment_date: date,
                    treatment_cost: cost,
                };
                transaction.set(newTreatmentRef, newTreatmentObject);

                // Create new medication
                const medicationId = uuidv4();
                const newMedicationRef = db.collection("medication").doc(medicationId);
                newMedicationObject = {
                    patient_id: patientId,
                    medication_description: medication,
                };
                transaction.set(newMedicationRef, newMedicationObject);

                // Return existing patient data along with new treatment and medication data
                return {
                    patient: patientData,
                    newTreatment: newTreatmentObject,
                    newMedication: newMedicationObject,
                    message: "Patient exists. Added new treatment and medication."
                };
            } else {
                // Create new patient
                const newPatientRef = db.collection("patient").doc(patientId);
                const patientObject = {
                    patient_name: patientName,
                };
                transaction.set(newPatientRef, patientObject);

                // Create new treatment
                const treatmentId = uuidv4();
                const newTreatmentRef = db.collection("treatment").doc(treatmentId);
                newTreatmentObject = {
                    patient_id: patientId,
                    treatment_description: treatment,
                    treatment_date: date,
                    treatment_cost: cost,
                };
                transaction.set(newTreatmentRef, newTreatmentObject);

                // Create new medication
                const medicationId = uuidv4();
                const newMedicationRef = db.collection("medication").doc(medicationId);
                newMedicationObject = {
                    patient_id: patientId,
                    medication_description: medication,
                };
                transaction.set(newMedicationRef, newMedicationObject);

                // Return new patient, treatment, and medication data
                return {
                    patient: patientObject,
                    newTreatment: newTreatmentObject,
                    newMedication: newMedicationObject,
                    message: "New patient, treatment, and medication data created."
                };
            }
        });

        return {
            success: true,
            data: result,
            message: result.message
        };
    } catch (error: any) {
        throw new ErrorHandler({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
};

//get all registered patients
const getAllPatientService = async (): Promise<{
  success: boolean;
  data: Patient[];
  message: string;
}> => {
  try {
    const snapshot = await db.collection("patient").get();
    const allPatients: Patient[] = [];
    snapshot.forEach((doc) => {
      allPatients.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return {
      success: true,
      data: allPatients,
      message: "Successfully retrieved all patients",
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      message: error.message,
      status: error.status,
    });
  }
};

//get patient treatment history
const getPatientTreatmentService = async (
  patientId: string
): Promise<{ success: boolean; data: Patient[] | any; message: string }> => {
  try {
    const patientSnapshot = await db.collection("patient").doc(patientId).get();
    const patientData = patientSnapshot.data();

    const treatmentsSnapshot = await db
      .collection("treatment")
      .where("patient_id", "==", patientId)
      .get();

    const allTreatments: Patient[] = [];
    treatmentsSnapshot.forEach((doc) => {
      allTreatments.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    const patientTreatmentData: PatientTreatmentData = {
      patient: patientData,
      treatments: allTreatments,
    };

    return {
      success: true,
      data: patientTreatmentData,
      message: "Successfully retrieved patient's treatment history",
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      message: error.message,
      status: error.status,
    });
  }
};

export {
    createPatientTreatmentService,
    getAllPatientService,
    getPatientTreatmentService,
};
