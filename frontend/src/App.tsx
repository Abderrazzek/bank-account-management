import React from "react";

import SidebarWithHeader from "./components/Sidebar";
import AccountDetails from "layouts/accountDetails";
import Accounts from "layouts/accounts";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeletedAccounts from "layouts/deletedAccounts";
import FundTransfer from "modules/fundTransfer";
import DeletedAccountDetails from "layouts/deletedAccountDetails";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SidebarWithHeader>
          <Routes>
            <Route path="/accounts" Component={Accounts} />
            <Route path="/accounts/:userId" Component={AccountDetails} />
            <Route path="/fund-transfer" Component={FundTransfer} />
            <Route path="/deleted-accounts" Component={DeletedAccounts} />
            <Route
              path="/deleted-accounts/:userId"
              Component={DeletedAccountDetails}
            />
            <Route path="*" element={<Navigate to="/accounts" replace />} />
          </Routes>
        </SidebarWithHeader>
      </QueryClientProvider>
    </div>
  );
};

export default App;
