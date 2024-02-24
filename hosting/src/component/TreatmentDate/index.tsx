import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FilledInput, FormControl, InputAdornment, InputLabel, Typography } from "@mui/material";

const TreatmentDate = ({ treatmentDate, handleDatePickerChange, costFormat, handleInputChange }: DatePickerProps) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Treatment Date"
            format="dd/MM/yyyy"
            value={treatmentDate}
            onChange={handleDatePickerChange}
            sx={{ width: "100%" }}
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
    </>
  );
};

export default TreatmentDate;
