import createTheme from "@mui/material/styles/createTheme";
import React, { ReactNode } from "react";
import { PublicData } from "../utils/GlobalState";
import { ThemeProvider } from "@mui/material";

declare module "@mui/material" {
  interface TypographyVariants {
    logotype?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    logotype?: React.CSSProperties;
  }
}

interface CustomThemeProviderProps {
  children: ReactNode; // Define children prop as ReactNode
}
const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const { darkMode } = React.useContext(PublicData);
  const theme = createTheme({
    typography: {
      button: {
        fontWeight: 700,
      },
      logotype: {
        fontFamily: "eixample-dip, serif",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "1.8rem",
        color: darkMode ? "white" : "black",
      },
      h1: {
        fontFamily: "Rubik, system-ui",
        fontWeight: 700,
        color: darkMode ? "white" : "black",
        '@media (max-width:768px)': {
          fontSize: '2.5rem',
        }
      },
      h2: {
        fontFamily: "Rubik, system-ui",
        fontWeight: 700,
        color: darkMode ? "white" : "black",
        '@media (max-width:768px)': {
          fontSize: '2.4rem',
        }
      },
      h3: {
        fontFamily: "Rubik, system-ui",
        fontWeight: 700,
        color: darkMode ? "white" : "black",
        '@media (max-width:768px)': {
          fontSize: '2rem',
        }
      },
      h4: {
        fontFamily: "Rubik, system-ui",
        fontWeight: 400,
        color: darkMode ? "white" : "black",
        '@media (max-width:768px)': {
          fontSize: '1.2rem',
        }
      },
      h5: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 800,
        fontSize: "1.4rem",
        color: darkMode ? "white" : "black",
        '@media (max-width:768px)': {
          fontSize: '1.3rem',
        }
      },
      h6: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 200,
        fontSize: "1.1rem",
        color: darkMode ? "white" : "black",
        '@media (max-width: 1100px)': {
          fontSize: '1rem',
        },
        '@media (max-width:768px)': {
          fontSize: '0.9rem',
        }
      },
      body1: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 300,
        color: darkMode ? "white" : "black",
        fontSize: '1rem',
        '@media (max-width:768px)': {
          fontSize: '0.6rem',
        }
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
