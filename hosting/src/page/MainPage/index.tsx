import { BasicEditingGrid, PatientForm } from "../../container"
import Box from "@mui/material/Box";
import styles from "./mainPage.module.scss"

const MainPage = ()=> {
    return (
        <Box className={styles.container}>
            <PatientForm />
            <BasicEditingGrid />
        </Box>
    )
}

export default MainPage