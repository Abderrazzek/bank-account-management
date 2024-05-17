import AccountsTable from "./components/AccountsTable";
import React from "react";
import { SelectedAccountProvider } from "./context";

interface Props {
  isDeletedAccounts?: boolean;
}

const Accounts: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  return (
    <SelectedAccountProvider>
      <AccountsTable isDeletedAccounts={isDeletedAccounts} />
    </SelectedAccountProvider>
  );
};

export default Accounts;
