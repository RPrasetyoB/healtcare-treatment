import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";

const TreatmentCost = ({ costFormat, handleInputChange }: CostProps) => {
  return (
    <>
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

export default TreatmentCost;
