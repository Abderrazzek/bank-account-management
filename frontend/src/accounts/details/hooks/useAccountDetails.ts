import { useCallback, useContext } from "react";
import { AccountDetailContext } from "../context/AccountDetailContext";
import useAccounts, { Account } from "../../hooks/useAccounts";

const useAccountDetails = () => {
  const { accounts, setAccounts, isAccountLoading, setAccountLoading } =
    useContext(AccountDetailContext);

  const { deleteAccount, getAccounts, postAccount } = useAccounts();

  const loadAccounts = useCallback(() => {
    setAccountLoading(true);
    if (isAccountLoading) {
      return;
    }
    return getAccounts()
      .then((resp) => {
        setAccounts(resp.data);
      })
      .catch((err) => {
        console.error("Failed to load accounts", err);
      })
      .finally(() => setAccountLoading(false));
  }, [setAccountLoading, getAccounts, setAccounts, isAccountLoading]);

  const saveAccount = useCallback(
    (account: Account) => {
      return postAccount(account)
        .then(() => {
          loadAccounts();
        })
        .catch((err) => {
          console.error("Failed to save account", err);
        });
    },
    [postAccount, loadAccounts]
  );

  const removeAccount = useCallback(
    (id: number) => {
      deleteAccount(id)
        .then(() => {
          loadAccounts();
        })
        .catch((err) => {
          console.error("Failed to delete account", err);
        });
    },
    [deleteAccount, loadAccounts]
  );

  return {
    loadAccounts,
    saveAccount,
    removeAccount,
    accounts,
    isAccountLoading,
  };
};

export default useAccountDetails;
