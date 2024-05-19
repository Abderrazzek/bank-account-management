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

type UseDeleteAccountResult = UseMutationResult<
  AxiosResponse,
  unknown,
  number
> & {
  deleteAccount: (id: number) => void;
  isDeleteAccountPending: boolean;
};

export const useDeleteAccount = (
  options?: UseMutationOptions<AxiosResponse, unknown, number>
): UseDeleteAccountResult => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAccount,
    isPending: isDeleteAccountPending, // Correct key is `isLoading`
    ...rest
  } = useMutation<AxiosResponse, unknown, number>({
    mutationFn: (id: number) => axios.delete(`/accounts/${id}`),
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
