import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// import CssBaseline from "@mui/material"
// import CssBaseline from "@mui/material"
// import CssBaseline from "@mui/material"
// import CssBaseline from "@mui/material"

import "./styles/main.css";
import "./styles/chrome-bug.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/Store";
// import CssBaseline from "@mui/material/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import {
  createTheme,
  ThemeProvider,
  styled,
  StyledEngineProvider,
} from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  "&.Mui-checked": {
    color: theme.status.danger,
  },
}));

const theme = createTheme({
  status: {
    danger: orange[500],
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
    h5: {
      marginTop: "16px",
      marginBottom: "8px",
      fontSize: "22px",
      fontWeight: 400,
      lineHeight: "28px",
    },
    h6: {
      marginTop: "16px",
      marginBottom: "8px",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
              <Toaster />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
