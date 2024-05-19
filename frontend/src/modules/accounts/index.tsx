import AccountsTable from "./components/AccountsTable";
import React from "react";

interface Props {
  isDeletedAccounts?: boolean;
}

const Accounts: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  return <AccountsTable isDeletedAccounts={isDeletedAccounts} />;
};

export default Accounts;
