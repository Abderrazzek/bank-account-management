import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "services/axios";
import { AxiosResponse } from "axios";
import { Account } from "../models";

type UseAccountsResult = UseQueryResult<Account[], AxiosResponse> & {
  accounts: Account[];
};

export const useAccounts = (): UseAccountsResult => {
  const accountsQueryResult = useQuery<Account[], AxiosResponse>({
    queryKey: ["accounts"],
    queryFn: () => axios.get("/accounts"),
  });

  return {
    accounts: accountsQueryResult.data ?? [],
    ...accountsQueryResult,
  } as UseAccountsResult;
};

type UseAddAccountResult = UseMutationResult & {
  addAccount: () => void;
  isAddAccountPending: boolean;
};

export const useAddAccount = (
  options?: UseMutationOptions
): UseAddAccountResult => {
  const {
    mutate: addAccount,
    isPending: isAddAccountPending,
    ...rest
  } = useMutation({
    onMutate: () => axios.post("/accounts"),
    ...options,
  });
  return { addAccount, isAddAccountPending, ...rest } as UseAddAccountResult;
};
