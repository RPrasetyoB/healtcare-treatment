import { FormControl, TextField } from "@mui/material"
import Box from "@mui/material/Box"


const PatientForm = ()=> {
    return (
        <Box>
            <FormControl>
                <TextField label= "Patient ID" />
                <TextField label= "Patient Name" />
            </FormControl>
        </Box>
    )
}

export default PatientForm