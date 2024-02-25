import AppBar from "@mui/material/AppBar";
import {
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import logo from "../../assets/healthcare.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { PublicData } from "../../utils/GlobalState";
import styles from "./navbar.module.scss"


const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(PublicData)

  const isMobile = useMediaQuery("(max-width:600px)");
  // const isTable = useMediaQuery("(max-width:900px)");

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar
        component="nav"
        className={styles.appbar}
        sx={{
          background: darkMode ? "black" : "rgb(245, 245, 245, 0.5)"
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            src={logo}
            alt="logo"
            width={40}
            style={{marginLeft: isMobile ? 0 : 40}}
          />
          <Box
            sx={{ display:"flex", alignItems: "center" }}
          >
            <DarkModeSwitch
              style={{ marginRight: isMobile? 0 : 40 }}
              checked={darkMode}
              onChange={toggleDarkMode}
              size={20}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
