import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FundTransfer from "modules/fundTransfer";
import Accounts from "modules/accounts";
import SidebarWithHeader from "shared/components/Sidebar";
import AccountDetails from "modules/accountDetails";
import NewAccount from "modules/newAccount";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SidebarWithHeader>
          <Routes>
            <Route path="/accounts" Component={Accounts} />
            <Route path="/accounts/:id" Component={AccountDetails} />
            <Route path="/new-account" Component={NewAccount} />
            <Route path="/fund-transfer" Component={FundTransfer} />
            <Route
              path="/deleted-accounts"
              element={<Accounts isDeletedAccounts />}
            />
            <Route path="/deleted-accounts/:id" Component={AccountDetails} />
            <Route path="*" element={<Navigate to="/accounts" replace />} />
          </Routes>
        </SidebarWithHeader>
      </QueryClientProvider>
    </div>
  );
};

export default App;
