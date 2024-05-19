import { Account } from "shared/constants";

export const getAccountIds = (accounts: Account[]): number[] => {
  return accounts
    .filter((account) => !account.isDeleted)
    .map((account) => account.id);
};
