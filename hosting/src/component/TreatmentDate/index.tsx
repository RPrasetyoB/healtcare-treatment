import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TreatmentDate = ({ treatmentDate, handleDatePickerChange }: DatePickerProps) => {
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
    </>
  );
};

export default TreatmentDate;
