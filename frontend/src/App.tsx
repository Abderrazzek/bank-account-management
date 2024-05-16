import React from "react";

import SidebarWithHeader from "./components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FundTransfer from "modules/fundTransfer";
import AccountDetails from "modules/accountDetails";
import Accounts from "modules/accounts";

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
            {/* TODO: ADD PARAMS TO WORKS AS DELETED ACCOUNTS */}
            <Route path="/deleted-accounts" Component={Accounts} />
            {/* TODO: ADD PARAMS TO WORKS AS DELETED ACCOUNTS */}
            <Route
              path="/deleted-accounts/:userId"
              Component={AccountDetails}
            />
            <Route path="*" element={<Navigate to="/accounts" replace />} />
          </Routes>
        </SidebarWithHeader>
      </QueryClientProvider>
    </div>
  );
};

export default App;
