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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientTreatmens = exports.getAllPatients = exports.createPatientTreatment = void 0;
const patientTreatmentServices_1 = require("../services/patientTreatmentServices");
// add new patient treatment controller
const createPatientTreatment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patient_id, patient_name, treatment_description, treatment_date, treatment_cost, medication_prescribed } = req.body;
        const response = yield (0, patientTreatmentServices_1.createPatientTreatmentService)({
            patientId: patient_id,
            patientName: patient_name,
            treatment: treatment_description,
            date: treatment_date,
            cost: treatment_cost,
            medication: medication_prescribed
        });
        if (response.success) {
            return res.status(200).json({
                message: response.message,
                data: response.data
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createPatientTreatment = createPatientTreatment;
// get all registered patients
const getAllPatients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, patientTreatmentServices_1.getAllPatientService)();
        if (response.status == 201) {
            return res.status(201).json({
                message: response.message,
                data: response.data
            });
        }
        if (response.success) {
            return res.status(200).json({
                message: response.message,
                data: response.data
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPatients = getAllPatients;
// get all patient treatment
const getPatientTreatmens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patient_id } = req.params;
        const response = yield (0, patientTreatmentServices_1.getPatientTreatmentService)(patient_id);
        if (response.status == 201) {
            return res.status(201).json({
                message: response.message,
                data: response.data
            });
        }
        else if (response.status == 200) {
            return res.status(200).json({
                message: response.message,
                data: response.data
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getPatientTreatmens = getPatientTreatmens;
