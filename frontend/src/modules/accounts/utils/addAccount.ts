import { Account } from "shared/constants";

export const getNextAccountId = (accounts: Account[]): number => {
  if (accounts.length === 0) return 1;
  const lastId = Math.max(
    ...accounts.map((account) => parseInt(account.id, 10))
  );
  return lastId + 1;
};
