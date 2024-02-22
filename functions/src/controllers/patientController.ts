import { NextFunction, Request, Response } from 'express';
import { createPatientTreatmentService, getAllPatientService, getPatientTreatmentService } from "../services/patientTreatmentServices";

// add new patient treatment controller
const createPatientTreatment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {patient_id, patient_name, treatment_description, treatment_date, treatment_cost, medication_prescribed} = req.body;
        const response = await createPatientTreatmentService({
            patientId: patient_id,
            patientName: patient_name,
            treatment: treatment_description,
            date: treatment_date,
            cost: treatment_cost,
            medication: medication_prescribed
        });
        if(response.success) {
            return res.status(200).json({
                message: response.message,
                data: response.data
            })
        }
    } catch (error) {
        next(error)
    }
}

// get all registered patients
const getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const response = await getAllPatientService();
        if(response.success) {
            return res.status(200).json({
                message: response.message,
                data: response.data
            })
        }
    } catch (error) {
        next(error)
    }
}

// get all patient treatment
const getPatientTreatmens = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patient_id } = req.params
        const response = await getPatientTreatmentService(patient_id);
        if(response.success) {
            return res.status(200).json({
                message: response.message,
                data: response.data
            })
        }
    } catch (error) {
        next(error)
    }
}

export { createPatientTreatment, getAllPatients, getPatientTreatmens }