import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountDetailContextProvider from "./accounts/details/context/AccountDetailContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AccountDetailContextProvider>
      <App />
    </AccountDetailContextProvider>
  </React.StrictMode>
);

reportWebVitals();
