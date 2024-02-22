interface PatientTreamentInput {
    patientId: string;
    patientName: string;
    treatment: string[];
    date: Date;
    cost: number;
    medication: string[];
}

interface Patient {
    id: string;
}

interface PatientTreatmentData {
    patient: any;
    treatments: Patient[];
}