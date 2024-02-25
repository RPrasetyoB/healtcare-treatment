import { SelectChangeEvent, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from "react";
import { PublicData } from "../../utils/GlobalState";
import { PatientData, PatientMedication, PatientTreatment, TreatmentDate } from "../../component";
import Box from "@mui/material/Box";
import { API_URL } from "../../utils/url";
import styles from "./patientForm.module.scss";

// currency formater
const formatNumber = (value: string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PatientForm = () => {
  // react states
  const { patientData, setDataAdded, darkMode } = useContext(PublicData);
  const [isSubmiting, setSubmiting] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [treatments, setTreatments] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [treatmentDate, setTreatmentDate] = useState<Date | null>(new Date());
  const [treatmentCost, setTreatmentCost] = useState("");
  const [costFormat, setCostFormat] = useState("");
  const [errors, setErrors] = useState({patientId: ""});

  // patient ID validator
  const validateField = (name: string, value: string) => {
    let valid = true;
    const newErrors = { ...errors, [name]: "" };
    if (name === "patientId") {
      const patientIdRegex = /^(?=.*\d)[a-zA-Z0-9]*$/;
      if (value && !patientIdRegex.test(value)) {
        newErrors.patientId = "Patient ID must be numeric or alphanumeric. Enter a valid Patient ID containing at least one numeric character.";
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  // validate if there any changes in patientId form
  useEffect(() => {
    validateField("patientId", patientId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  // setState with value from forms
  const handleInputForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === "patientId") {
      setPatientId(value);
    } else if (name === "patientName") {
      setPatientName(value);
    } else if (name === "treatmentCost") {
      setTreatmentCost(value);
    }
  };

  // treatment cost handleChange
  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const newValue = event.target.value.replace(/\D/g, "");
    setTreatmentCost(newValue);
    setCostFormat(formatNumber(newValue));
  };

  // treatment option selection handleChange
  const handleChangeTreatment = (event: SelectChangeEvent<typeof treatments>) => {
    const { target: { value }} = event;
    setTreatments(typeof value === "string" ? value.split(",") : value);
  };

  // treatment option selection handleChange
  const handleChangeMedication = (event: SelectChangeEvent<typeof medications>) => {
    const { target: { value }} = event;
    setMedications(typeof value === "string" ? value.split(",") : value);
  };

  // date handleChange
  const handleDatePickerChange = (date: Date | null) => {
    setTreatmentDate(date);
  };

  // reset form after submit
  const resetForm = () => {
    setTreatmentCost("");
    setCostFormat("");
    setPatientId("");
    setPatientName("");
    setTreatments([]);
    setMedications([]);
    setTreatmentDate(new Date());
    setTreatmentCost("");
  };

  // submit and fetch to API
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmiting(true);
    const unixDate = treatmentDate ? Math.floor(treatmentDate.getTime() / 1000) : null;
    const values = {
        patient_id: patientId,
        patient_name: patientName,
        treatment_description: treatments,
        medication_prescribed: medications,
        treatment_date: unixDate,
        treatment_cost: treatmentCost
    };
    try {
        const response = await fetch(API_URL + "/v1/treatment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify(values), 
        })
        if(response.ok){
            setDataAdded(prev => !prev)
            setTimeout(()=> {
                setSubmiting(false)
                resetForm()
            },1000)
        } else {
            console.error("Failed to submit treatment data.");
        }
    } catch (error) {
        console.error("Error occurred while submitting treatment data:", error);
    }    
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>Input Patient Data</Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{border: 1, borderColor: darkMode ? "white" : "black"}}
        className={styles.formContainer}
        onSubmit={handleSubmit}
      >
        <PatientData handleInputForm={handleInputForm} errors={errors} patientId={patientId} patientName={patientName} />
        <PatientTreatment handleChangeTreatment={handleChangeTreatment} treatments={treatments}/>
        <PatientMedication handleChangeMedication={handleChangeMedication} medications={medications}/>
        <TreatmentDate handleInputChange={handleInputChange} handleDatePickerChange={handleDatePickerChange} treatmentDate={treatmentDate} costFormat={costFormat}/>
        <LoadingButton
          type="submit"
          loading={isSubmiting}
          loadingIndicator="Submiting..."
          variant="contained"
          sx={{ mt: 2, "&:hover": { bgcolor: "#000" } }}
          disabled= {
            !treatmentDate ||
            Boolean(errors.patientId) ||
            treatmentCost == "" ||
            patientId == "" ||
            patientName == "" ||
            treatments.length < 0 ||
            medications.length < 0
          }
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default PatientForm;
