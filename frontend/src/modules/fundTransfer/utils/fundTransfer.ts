import { Account } from "shared/constants";

export const getAccountIds = (accounts: Account[]): string[] => {
  return accounts
    .filter((account) => account.isDeleted === "false")
    .map((account) => account.id);
};
