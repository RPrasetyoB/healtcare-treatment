import { TextField } from "@mui/material";


const PatientData = ({ handleInputForm, patientId, errors, patientName }: PersonalDataProps ) => {
  return (
    <>
      <TextField
        label="Patient ID"
        name="patientId"
        onChange={handleInputForm}
        value={patientId}
        error={Boolean(errors.patientId)}
        helperText={errors.patientId}
        required
      />
      <TextField
        label="Patient Name"
        name="patientName"
        onChange={handleInputForm}
        value={patientName}
        required
      />
    </>
  );
};

export default PatientData;
