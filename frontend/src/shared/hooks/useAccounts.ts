import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "services/axios";
import { AxiosResponse } from "axios";
import { Account } from "shared/constants";

type UseAccountsResult = UseQueryResult<Account[], AxiosResponse> & {
  accounts: Account[];
};

export const useAccounts = (isDeleted: string = "false"): UseAccountsResult => {
  const accountsQueryResult = useQuery<Account[], AxiosResponse>({
    queryKey: ["accounts"],
    queryFn: () => axios.get(`/accounts?isDeleted=${isDeleted}`),
  });

  return {
    accounts: accountsQueryResult.data ?? [],
    ...accountsQueryResult,
  } as UseAccountsResult;
};
