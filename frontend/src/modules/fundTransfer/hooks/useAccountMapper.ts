import React from "react";

import { Account } from "shared/constants";
import { getAccountIds } from "../utils";

export const useAccountIdsMapper = (accounts: Account[]) => {
  return React.useMemo(() => getAccountIds(accounts), [accounts]);
};
