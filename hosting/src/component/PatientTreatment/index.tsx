import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { treatmentList } from "./list";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      sx: {position :"relative"},
    },
  },
};

const PatientTreatment = ({ treatments, handleChangeTreatment } : PatientTreatmentProps ) => {
  return (
    <>
      <FormControl required sx={{ position: "relative" }}>
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
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {treatmentList.map(treat => (
            <MenuItem key={treat} value={treat}>
              <Checkbox
                checked={treatments.indexOf(treat) > -1}
              />
              <ListItemText primary={treat} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default PatientTreatment
