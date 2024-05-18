import { CurrencyCode } from "shared/models";

// TODO CHECK WHAT TO USE ID OR OWNERID AND IF WE NEED TO REMOVE OWNERID FROM THE TABLE!
export interface Account {
  id: number;
  ownerId: number;
  firstName: string;
  lastName: string;
  currency: CurrencyCode;
  balance: number;
  historyBalance: Record<string, string | number>[];
  isDeleted?: boolean;
}
