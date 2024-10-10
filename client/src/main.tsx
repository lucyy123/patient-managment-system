import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import { theme } from "./utils/theme.ts";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store} >
        <PersistGate persistor={persistor} loading={null}>
        <App />
        </PersistGate>
      </Provider>
      <CssBaseline />
    </ThemeProvider>
  </StrictMode>
);
