import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useAccounts } from "shared/hooks";
import { getNextAccountId } from "modules/accounts/utils";
import axios from "services/axios";

import { Account } from "shared/constants";
import { updateHistoryBalance } from "shared/utils";

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
  const { data: accounts } = useAccounts();

  const {
    mutate: addAccount,
    isPending: isAddAccountPending,
    ...rest
  } = useMutation<AxiosResponse, unknown, Account>({
    mutationFn: async (newAccount: Account) => {
      // Determine the next account ID because JSON-SERVER doesn't have any computing elements of it's own
      const nextId = accounts ? getNextAccountId(accounts) : 1;
      newAccount.id = nextId.toString();

      // Update historyBalance with the first value in EUR
      newAccount.historyBalance = await updateHistoryBalance(
        [],
        newAccount.balance,
        newAccount.currency
      );

      // Add new account
      return axios.post("/accounts", newAccount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    ...options,
  });

  return { addAccount, isAddAccountPending, ...rest } as UseAddAccountResult;
};
