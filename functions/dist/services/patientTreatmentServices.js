"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientTreatmentService = exports.getAllPatientService = exports.createPatientTreatmentService = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const dbConnection_1 = require("../config/dbConnection");
const uuid_1 = require("uuid");
// Create new patient data and treatment
const createPatientTreatmentService = ({ patientId, patientName, treatment, date, cost, medication }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConnection_1.db.runTransaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            // Check if patient already exists
            const existingPatientRef = dbConnection_1.db.collection("patient").doc(patientId);
            const existingPatient = yield transaction.get(existingPatientRef);
            let newTreatmentObject, newMedicationObject;
            // If patient exists, return existing data
            if (existingPatient.exists) {
                const patientData = existingPatient.data();
                // Create new treatment
                const treatmentId = (0, uuid_1.v4)();
                const newTreatmentRef = dbConnection_1.db.collection("treatment").doc(treatmentId);
                newTreatmentObject = {
                    patient_id: patientId,
                    treatment_description: treatment,
                    treatment_date: date,
                    treatment_cost: cost,
                };
                transaction.set(newTreatmentRef, newTreatmentObject);
                // Create new medication
                const medicationId = (0, uuid_1.v4)();
                const newMedicationRef = dbConnection_1.db.collection("medication").doc(medicationId);
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
            }
            else {
                // Create new patient
                const newPatientRef = dbConnection_1.db.collection("patient").doc(patientId);
                const patientObject = {
                    patient_name: patientName,
                };
                transaction.set(newPatientRef, patientObject);
                // Create new treatment
                const treatmentId = (0, uuid_1.v4)();
                const newTreatmentRef = dbConnection_1.db.collection("treatment").doc(treatmentId);
                newTreatmentObject = {
                    patient_id: patientId,
                    treatment_description: treatment,
                    treatment_date: date,
                    treatment_cost: cost,
                };
                transaction.set(newTreatmentRef, newTreatmentObject);
                // Create new medication
                const medicationId = (0, uuid_1.v4)();
                const newMedicationRef = dbConnection_1.db.collection("medication").doc(medicationId);
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
        }));
        return {
            success: true,
            data: result,
            message: result.message
        };
    }
    catch (error) {
        throw new errorHandler_1.default({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
});
exports.createPatientTreatmentService = createPatientTreatmentService;
//get all registered patients
const getAllPatientService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield dbConnection_1.db.collection("patient").get();
        const allPatients = [];
        snapshot.forEach((doc) => {
            allPatients.push(Object.assign({ id: doc.id }, doc.data()));
        });
        if (!allPatients.length) {
            return {
                success: true,
                status: 201,
                message: "No data",
                data: allPatients
            };
        }
        return {
            success: true,
            data: allPatients,
            message: "Successfully retrieved all patients",
        };
    }
    catch (error) {
        throw new errorHandler_1.default({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
});
exports.getAllPatientService = getAllPatientService;
//get patient treatment history
const getPatientTreatmentService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientSnapshot = yield dbConnection_1.db.collection("patient").doc(patientId).get();
        const patientData = patientSnapshot.data();
        if (!patientData) {
            throw new errorHandler_1.default({
                success: false,
                message: "Patient not found",
                status: 404,
            });
        }
        const treatmentsSnapshot = yield dbConnection_1.db
            .collection("treatment")
            .where("patient_id", "==", patientId)
            .get();
        const allTreatments = [];
        treatmentsSnapshot.forEach((doc) => {
            allTreatments.push(Object.assign({ id: doc.id }, doc.data()));
        });
        if (!allTreatments.length) {
            return {
                success: true,
                status: 201,
                message: "No treatment history for current patient",
                data: allTreatments
            };
        }
        const patientTreatmentData = {
            patient: patientData,
            treatments: allTreatments,
        };
        return {
            success: true,
            status: 200,
            data: patientTreatmentData,
            message: "Successfully retrieved patient's treatment history",
        };
    }
    catch (error) {
        throw new errorHandler_1.default({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
});
exports.getPatientTreatmentService = getPatientTreatmentService;
