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
import { updateHistoryBalance } from "shared/utils";

// Fetch account details
type UseAccountDetailsResult = UseQueryResult<Account, AxiosResponse> & {
  account: Account | undefined;
};

export const useAccountDetails = (id: string): UseAccountDetailsResult => {
  const accountQueryResult = useQuery<Account, AxiosResponse>({
    queryKey: ["account", id],
    queryFn: () => axios.get(`/accounts/${id}`),
  });

  return {
    account: accountQueryResult.data,
    ...accountQueryResult,
  } as UseAccountDetailsResult;
};

// Edit account
type UseEditAccountResult = UseMutationResult<
  AxiosResponse,
  unknown,
  Account
> & {
  editAccount: (updatedAccount: Account) => void;
  isEditAccountPending: boolean;
};

export const useEditAccount = (
  options?: UseMutationOptions<AxiosResponse, unknown, Account>
): UseEditAccountResult => {
  const queryClient = useQueryClient();

  const {
    mutate: editAccount,
    isPending: isEditAccountPending,
    ...rest
  } = useMutation<AxiosResponse, unknown, Account>({
    mutationFn: async (updatedAccount: Account) => {
      const updatedHistoryBalance = await updateHistoryBalance(
        updatedAccount.historyBalance,
        updatedAccount.balance,
        updatedAccount.currency
      );
      // Update the account with the new history balance
      const accountWithUpdatedHistory = {
        ...updatedAccount,
        balance: parseFloat(updatedAccount.balance as any),
        historyBalance: updatedHistoryBalance,
      };
      // Proceed with the mutation to update the account
      return axios.put(
        `/accounts/${accountWithUpdatedHistory.id}`,
        accountWithUpdatedHistory
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["account", variables.id] });
    },
    ...options,
  });

  return { editAccount, isEditAccountPending, ...rest } as UseEditAccountResult;
};

// Delete account
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
