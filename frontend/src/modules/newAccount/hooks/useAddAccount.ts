import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios from "services/axios";

import { Account } from "shared/constants";

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
    mutationFn: (newAccount: Account) => {
      // Create a copy of newAccount and delete the id key
      const { id, ...accountWithoutId } = newAccount;
      return axios.post("/accounts", accountWithoutId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    ...options,
  });

  return { addAccount, isAddAccountPending, ...rest } as UseAddAccountResult;
};
