import {
  Checkbox,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { ChangeEvent, ChangeEventHandler, useContext, useState } from "react";
import { PublicData } from "../../utils/GlobalState";
import { medicationList, treatmentList } from "./list";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { format } from 'date-fns';
import { API_URL } from "../../utils/url";
import styles from "./patientForm.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const formatNumber = (value: string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PatientForm = () => {
  const { patientData } = useContext(PublicData);
  const [isSubmiting, setSubmiting] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [treatments, setTreatments] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [treatmentDate, setTreatmentDate] = useState<Date | null>(null);
  const [treatmentCost, setTreatmentCost] = useState("");
  const [costFormat, setCostFormat] = useState("");

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

  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const newValue = event.target.value.replace(/\D/g, "");
    setTreatmentCost(newValue);
    setCostFormat(formatNumber(newValue));
  };

  const handleChangeTreatment = (event: SelectChangeEvent<typeof treatments>) => {
    const { target: { value }} = event;
    setTreatments(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeMedication = (event: SelectChangeEvent<typeof medications>) => {
    const { target: { value }} = event;
    setMedications(typeof value === "string" ? value.split(",") : value);
  };

  const handleDatePickerChange = (date: Date | null) => {
    setTreatmentDate(date);
  };

  const resetForm = () => {
    setTreatmentCost("");
    setCostFormat("");
    setPatientId("");
    setPatientName("");
    setTreatments([]);
    setMedications([]);
    setTreatmentDate(null);
    setTreatmentCost("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmiting(true);
    // const formattedDueDate = treatmentDate ? format(treatmentDate, "yyyy-MM-dd") : "";
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
        console.log(response)
        // console.log('id', patientId)
        // console.log('name', patientName)
        // console.log('treatments', treatments)
        // console.log('medications', medications)
        // console.log('cost', treatmentCost)
        if(response.ok){
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
    <Box
      component="form"
      autoComplete="off"
      className={styles.formContainer}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Patient ID"
        name="patientId"
        onChange={handleInputForm}
        value={patientId}
        required
      />
      <TextField
        label="Patient Name"
        name="patientName"
        onChange={handleInputForm}
        value={patientName}
        required
      />
      <FormControl required>
        <InputLabel id="demo-multiple-checkbox-label">
          Treatment Description
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={treatments}
          onChange={handleChangeTreatment}
          input={<OutlinedInput label="Treatment Description" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {treatmentList.map((treat) => (
            <MenuItem key={treat} value={treat}>
              <Checkbox checked={treatments.indexOf(treat) > -1} />
              <ListItemText primary={treat} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required>
        <InputLabel id="demo-multiple-checkbox-label">
          Medication Prescribed
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={medications}
          onChange={handleChangeMedication}
          input={<OutlinedInput label="Medication Prescribed" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {medicationList.map((medic) => (
            <MenuItem key={medic} value={medic}>
              <Checkbox checked={medications.indexOf(medic) > -1} />
              <ListItemText primary={medic} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DemoContainer components={['DatePicker']}>
            <DatePicker
            label="Treatment Date"
            value={treatmentDate}
            onChange={handleDatePickerChange}
            />
        </DemoContainer>
      </LocalizationProvider>
      <FormControl variant="filled" required>
        <InputLabel htmlFor="filled-adornment-amount">
          Treatment Cost
        </InputLabel>
        <FilledInput
          id="filled-adornment-amount"
          name="treatmentCost"
          value={costFormat}
          onChange={handleInputChange}
          startAdornment={
            <InputAdornment position="start">
              <Typography sx={{ fontWeight: "bold" }}>IDR</Typography>
            </InputAdornment>
          }
          inputProps={{
            type: "text",
          }}
        />
      </FormControl>
      <LoadingButton
        type="submit"
        loading={isSubmiting}
        loadingIndicator="Submiting..."
        variant="contained"
        sx={{ mt: 2, bgcolor: "#E73873", "&:hover": { bgcolor: "#000" } }}
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default PatientForm;
