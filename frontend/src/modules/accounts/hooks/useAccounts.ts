import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

type UseDeleteAccountResult = UseMutationResult<
  AxiosResponse,
  unknown,
  string
> & {
  deleteAccount: (id: string) => void;
  isDeleteAccountPending: boolean;
};

export const useDeleteAccount = (
  options?: UseMutationOptions<AxiosResponse, unknown, string>
): UseDeleteAccountResult => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAccount,
    isPending: isDeleteAccountPending,
    ...rest
  } = useMutation<AxiosResponse, unknown, string>({
    mutationFn: (id: string) =>
      axios.patch(`/accounts/${id}`, { isDeleted: "true" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    ...options,
  });

  return {
    deleteAccount,
    isDeleteAccountPending,
    ...rest,
  } as UseDeleteAccountResult;
};
