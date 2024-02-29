/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectChangeEvent, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import { PublicData } from "../../utils/GlobalState";
import {
  PatientData,
  PatientMedication,
  PatientTreatment,
  TreatmentCost,
  TreatmentDate,
} from "../../component";
import "react-toastify/dist/ReactToastify.css";
import styles from "./patientForm.module.scss";
import { postTreatment } from "../../utils/fetchAPI";

// currency formater
const formatNumber = (value: string) => {
  if (value === value.match(/0.*/)?.toString() || value === "00") {
    return "0";
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PatientForm = () => {
  // react states
  const {patientData, setDataAdded, darkMode } = useContext(PublicData);
  const [isSubmiting, setSubmiting] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [treatments, setTreatments] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [treatmentDate, setTreatmentDate] = useState<Date | null>(new Date());
  const [treatmentCost, setTreatmentCost] = useState("");
  const [costFormat, setCostFormat] = useState("");
  const [errors, setErrors] = useState({ patientId: "" });
  const [isPatientExist, setPatientExist] = useState(false)

  // patient ID validator
  const validateField = (name: string, value: string) => {
    let valid = true;
    const newErrors = { ...errors, [name]: "" };
    if (name === "patientId") {
      const patientIdRegex = /^(?=.*\d)[a-zA-Z0-9]*$/;
      if (value && !patientIdRegex.test(value)) {
        newErrors.patientId =
          "Patient ID must be numeric or alphanumeric. Enter a valid Patient ID containing at least one numeric character.";
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

  useEffect(() => {
    const existingPatient = patientData.find((patient : PatientData) => patient.id === patientId);
    if (existingPatient){
      setPatientExist(!!existingPatient);
    }else{
      setPatientExist(false)
    }
  }, [patientId]);
  console.log(isPatientExist)
  // setState with value from forms
  const handleInputForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const existingPatient = patientData.find((patient : PatientData) => patient.id === patientId);
    if (name === "patientId") {
      setPatientId(value);
    } else if (isPatientExist){
      setPatientName(existingPatient!.patient_name)
    } else if (name === "patientName") {
      setPatientName(value);
    } else if (name === "treatmentCost") {
      setTreatmentCost(value);
    }
  };

  // treatment cost handleChange
  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    const newValue = event.target.value.replace(/\D/g, "");
    if (newValue === "00") {
      setTreatmentCost("0");
    } else {
      setTreatmentCost(newValue);
    }
    setCostFormat(formatNumber(newValue));
  };

  // treatment option selection handleChange
  const handleChangeTreatment = (
    event: SelectChangeEvent<typeof treatments>
  ) => {
    const {
      target: { value },
    } = event;
    setTreatments(typeof value === "string" ? value.split(",") : value);
  };

  // treatment option selection handleChange
  const handleChangeMedication = (
    event: SelectChangeEvent<typeof medications>
  ) => {
    const {
      target: { value },
    } = event;
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
    // convert date to unix date
    const unixDate = treatmentDate
      ? Math.floor(treatmentDate.getTime() / 1000)
      : null;
    const values = {
      patient_id: patientId,
      patient_name: patientName,
      treatment_description: treatments,
      medication_prescribed: medications,
      treatment_date: unixDate,
      treatment_cost: treatmentCost,
    };
    try {
      const response = await postTreatment(values);
      if (response.success) {
        // toaster notification
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setDataAdded(prev => !prev);
        setTimeout(() => {
          setSubmiting(false);
          resetForm();
        }, 1000);
      }else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          setSubmiting(false);
          resetForm();
        }, 1000);
      }
    } catch (error : any) {
      console.error("Error occurred while submitting treatment data:", error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Box className={styles.container}>
      <ToastContainer
        position="top-center"
        toastStyle={{ top: 50 }}
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Typography variant="h5" className={styles.title}>
        Input Patient Data
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{ border: 1, borderColor: darkMode ? "white" : "black" }}
        className={styles.formContainer}
        onSubmit={handleSubmit}
      >
        <PatientData
          handleInputForm={handleInputForm}
          errors={errors}
          patientId={patientId}
          patientName={patientName}
        />
        <PatientTreatment
          handleChangeTreatment={handleChangeTreatment}
          treatments={treatments}
        />
        <PatientMedication
          handleChangeMedication={handleChangeMedication}
          medications={medications}
        />
        <TreatmentDate
          handleDatePickerChange={handleDatePickerChange}
          treatmentDate={treatmentDate}
        />
        <TreatmentCost
          handleInputChange={handleInputChange}
          costFormat={costFormat}
        />
        <LoadingButton
          type="submit"
          loading={isSubmiting}
          loadingIndicator="Submiting..."
          variant="contained"
          sx={{ mt: 2, "&:hover": { bgcolor: "#000" } }}
          disabled={
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
