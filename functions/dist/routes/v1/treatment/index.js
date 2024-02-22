"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = require("../../../controllers/patientController");
const treatmentRoutes = express_1.default.Router();
treatmentRoutes.post('/', patientController_1.createPatientTreatment);
treatmentRoutes.get('/', patientController_1.getAllPatients);
treatmentRoutes.get('/:patient_id', patientController_1.getPatientTreatmens);
exports.default = treatmentRoutes;
