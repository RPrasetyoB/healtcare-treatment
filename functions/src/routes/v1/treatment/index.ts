import express from 'express'
import { createPatientTreatment, getAllPatients, getPatientTreatmens } from '../../../controllers/patientController'
const treatmentRoutes = express.Router()

treatmentRoutes.post('/', createPatientTreatment)
treatmentRoutes.get('/', getAllPatients)
treatmentRoutes.get('/:patient_id', getPatientTreatmens)

export default treatmentRoutes