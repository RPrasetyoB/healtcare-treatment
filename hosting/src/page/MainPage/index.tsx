import { DataRetrieve, PatientForm } from "../../container"
import Box from "@mui/material/Box";
import styles from "./mainPage.module.scss"
import { useContext } from "react";
import { PublicData } from "../../utils/GlobalState";

const MainPage = ()=> {
    const { darkMode } = useContext(PublicData)
    return (
        <Box className={styles.container} sx={{bgcolor: darkMode ? "#101418" : "#f3f3fb"}}>
            <PatientForm />
            <DataRetrieve />
        </Box>
    )
}

export default MainPage