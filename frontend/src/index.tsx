import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountDetailContextProvider from "./accounts/details/context/AccountDetailContext";
import theme from "assets/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AccountDetailContextProvider>
        <App />
      </AccountDetailContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
