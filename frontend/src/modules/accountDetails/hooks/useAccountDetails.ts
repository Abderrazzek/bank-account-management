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
import { Account } from "modules/accounts/models";

// Fetch account details
type UseAccountDetailsResult = UseQueryResult<Account, AxiosResponse> & {
  account: Account | undefined;
};

export const useAccountDetails = (id: number): UseAccountDetailsResult => {
  const accountQueryResult = useQuery<Account, AxiosResponse>({
    queryKey: ["account", id],
    queryFn: () => axios.get(`/accounts/${id}`),
  });

  return {
    account: accountQueryResult.data,
    ...accountQueryResult,
  } as UseAccountDetailsResult;
};

type UseAddAccountResult = UseMutationResult<
  AxiosResponse,
  unknown,
  Account
> & {
  addAccount: (newAccount: Account) => void;
  isAddAccountPending: boolean;
};

export const useAddAccount = (
  options?: UseMutationOptions<AxiosResponse, unknown, Account>
): UseAddAccountResult => {
  const queryClient = useQueryClient();

  const {
    mutate: addAccount,
    isPending: isAddAccountPending,
    ...rest
  } = useMutation<AxiosResponse, unknown, Account>({
    mutationFn: (newAccount: Account) => axios.post("/accounts", newAccount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    ...options,
  });

  return { addAccount, isAddAccountPending, ...rest } as UseAddAccountResult;
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
    mutationFn: (updatedAccount: Account) =>
      axios.put(`/accounts/${updatedAccount.id}`, updatedAccount),
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
    isPending: isDeleteAccountPending,
    ...rest
  } = useMutation<AxiosResponse, unknown, number>({
    mutationFn: (id: number) => axios.delete(`/accounts/${id}`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.removeQueries({ queryKey: ["account", variables] });
    },
    ...options,
  });

  return {
    deleteAccount,
    isDeleteAccountPending,
    ...rest,
  } as UseDeleteAccountResult;
};
