import { CurrencyCode } from "shared/models";

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
