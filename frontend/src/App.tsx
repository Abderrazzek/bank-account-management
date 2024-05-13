import React from "react";

import SidebarWithHeader from "./components/sidebar";
import AccountDetails from "layouts/accountDetails";
import Dashboard from "layouts/dashboard";
import Accounts from "layouts/accounts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeactivatedAccounts from "layouts/deactivatedAccounts";
import FundTransfer from "layouts/fundTransfer";

const App = () => {
  return (
    <div className="App">
      <SidebarWithHeader>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/accounts" Component={Accounts} />
            <Route path="/fund-transfer" Component={FundTransfer} />
            <Route
              path="/deactivated-accounts"
              Component={DeactivatedAccounts}
            />
          </Routes>
        </BrowserRouter>
      </SidebarWithHeader>
    </div>
  );
};

export default App;
