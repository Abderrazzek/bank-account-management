import React, { createContext, useContext, useState, ReactNode } from "react";

interface SelectedAccountContextProps {
  selectedAccountId: number;
  setSelectedAccountId: (id: number) => void;
}

const SelectedAccountContext = createContext<
  SelectedAccountContextProps | undefined
>(undefined);

export const SelectedAccountProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<number>(0);

  return (
    <SelectedAccountContext.Provider
      value={{ selectedAccountId, setSelectedAccountId }}
    >
      {children}
    </SelectedAccountContext.Provider>
  );
};

export const useSelectedAccount = (): SelectedAccountContextProps => {
  const context = useContext(SelectedAccountContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedAccount must be used within a SelectedAccountProvider"
    );
  }
  return context;
};
