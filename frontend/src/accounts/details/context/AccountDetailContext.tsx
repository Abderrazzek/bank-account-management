import React, { createContext, useState, PropsWithChildren } from "react";
import { Account } from "../../hooks/useAccounts";

interface AccountDetailContextType {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  isAccountLoading: boolean;
  setAccountLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccountDetailContext = createContext<AccountDetailContextType>({
  accounts: [],
  setAccounts: () => {},
  isAccountLoading: false,
  setAccountLoading: () => {},
});

const AccountDetailContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isAccountLoading, setAccountLoading] = useState<boolean>(false);

  return (
    <AccountDetailContext.Provider
      value={{
        accounts,
        setAccounts,
        isAccountLoading,
        setAccountLoading,
      }}
    >
      {children}
    </AccountDetailContext.Provider>
  );
};

export default AccountDetailContextProvider;
