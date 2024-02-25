interface PersonalDataProps {
  handleInputForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  patientId: string;
  errors: {
      patientId: string;
    };
  patientName: string;
}

interface PatientTreatmentProps {
  handleChangeTreatment: (e: SelectChangeEvent<[]>) => void;
  treatments: string[];
}

interface PatientMedicationProps {
  handleChangeMedication: (e: SelectChangeEvent<[]>) => void;
  medications: string[];
}

interface DatePickerProps {
  treatmentDate: Date | null;
  handleDatePickerChange: (value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => void;
}

interface CostProps {
  costFormat: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}