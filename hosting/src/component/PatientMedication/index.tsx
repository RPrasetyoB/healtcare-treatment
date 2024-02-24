import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { medicationList } from "./list";

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

const PatientMedication = ({ medications, handleChangeMedication }: PatientMedicationProps) => {
  return (
    <>
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
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {medicationList.map(medic => (
            <MenuItem key={medic} value={medic}>
              <Checkbox checked={medications.indexOf(medic) > -1} />
              <ListItemText primary={medic} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default PatientMedication