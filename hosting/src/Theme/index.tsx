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
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
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
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
