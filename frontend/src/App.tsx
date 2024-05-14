import React from "react";

import SidebarWithHeader from "./components/sidebar";
import AccountDetails from "layouts/accountDetails";
import Dashboard from "layouts/dashboard";
import Accounts from "layouts/accounts";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeletedAccounts from "layouts/deletedAccounts";
import FundTransfer from "layouts/fundTransfer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SidebarWithHeader>
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/accounts" Component={Accounts} />
            <Route path="/accounts" Component={Accounts} />
            <Route path="/accounts/:userId" Component={AccountDetails} />
            <Route path="/fund-transfer" Component={FundTransfer} />
            <Route path="/deleted-accounts" Component={DeletedAccounts} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SidebarWithHeader>
      </QueryClientProvider>
    </div>
  );
};

export default App;
