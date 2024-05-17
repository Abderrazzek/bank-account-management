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

// type UseAddAccountResult = UseMutationResult<
//   AxiosResponse,
//   unknown,
//   Account
// > & {
//   addAccount: (newAccount: Account) => void;
//   isAddAccountPending: boolean;
// };

// export const useAddAccount = (
//   options?: UseMutationOptions<AxiosResponse, unknown, Account>
// ): UseAddAccountResult => {
//   const queryClient = useQueryClient();

//   const {
//     mutate: addAccount,
//     isPending: isAddAccountPending,
//     ...rest
//   } = useMutation<AxiosResponse, unknown, Account>({
//     mutationFn: (newAccount: Account) => axios.post("/accounts", newAccount),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["accounts"] });
//     },
//     ...options,
//   });

//   return { addAccount, isAddAccountPending, ...rest } as UseAddAccountResult;
// };

// type UseEditAccountResult = UseMutationResult<
//   AxiosResponse,
//   unknown,
//   Account
// > & {
//   editAccount: (updatedAccount: Account) => void;
//   isEditAccountPending: boolean;
// };

// export const useEditAccount = (
//   options?: UseMutationOptions<AxiosResponse, unknown, Account>
// ): UseEditAccountResult => {
//   const queryClient = useQueryClient();

//   const {
//     mutate: editAccount,
//     isPending: isEditAccountPending,
//     ...rest
//   } = useMutation<AxiosResponse, unknown, Account>({
//     mutationFn: (updatedAccount: Account) =>
//       axios.put(`/accounts/${updatedAccount.id}`, updatedAccount),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["accounts"] });
//     },
//     ...options,
//   });

//   return { editAccount, isEditAccountPending, ...rest } as UseEditAccountResult;
// };

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
