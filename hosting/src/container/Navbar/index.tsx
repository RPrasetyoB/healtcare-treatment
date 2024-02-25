import AppBar from "@mui/material/AppBar";
import {
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import logo from "../../assets/healthcare.png";
// import blackLogo from "../../assets/black logo.png";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useContext } from "react";
import { PublicData } from "../../utils/GlobalState";


const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(PublicData)

  // const isMobile = useMediaQuery("(max-width:600px)");
  const isTable = useMediaQuery("(max-width:900px)");

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: darkMode ? "black" : "rgb(245, 245, 245, 0.5)",
          maxWidth: "100%",
          transition: "background 0.8s ease-in-out",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "0 20px"
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
            style={{marginLeft: 50}}
          />
          <Box
            sx={{ display: { sm: "none", xs: "flex" }, alignItems: "center" }}
          >
            <DarkModeSwitch
              style={{ marginRight: 50 }}
              checked={darkMode}
              onChange={toggleDarkMode}
              size={20}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "1vw",
              marginRight: "2vw",
              alignItems: "center",
            }}
          >
            <DarkModeSwitch
              style={{ marginRight: 50 }}
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
