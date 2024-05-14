import { useCallback } from "react";
import { toast } from "react-toastify";
import { deleteAPI, getAPI, paths, postAPI } from "../../services";
import { CurrencyCode } from "types/currencyTypes";

export type HistoryBalance = {
  date: Date;
  balance: number;
};

export interface Account {
  id: number;
  ownerId: number;
  firstName: string;
  lastName: string;
  currency: CurrencyCode;
  balance: number;
  historyBalance: HistoryBalance[];
  isDeleted?: boolean;
}

const useAccounts = () => {
  const getAccounts = useCallback(() => {
    return getAPI<Account[]>(`${paths.ACCOUNTS}`, {}).then((response) => {
      return response;
    });
  }, []);

  const postAccount = useCallback((account: Account) => {
    return toast.promise(postAPI<Account>(paths.ACCOUNTS, account), {
      pending: "Saving account...",
      success: "Account saved !",
      error: "Error while saving account. Please try again.",
    });
  }, []);

  const deleteAccount = useCallback((id: number) => {
    return toast.promise(deleteAPI<void>(`${paths.ACCOUNTS}/${id}`), {
      pending: "Deleting account...",
      success: "Account deleted !",
      error: "Error while deleting account. Please try again.",
    });
  }, []);

  return {
    getAccounts,
    postAccount,
    deleteAccount,
  };
};

export default useAccounts;
