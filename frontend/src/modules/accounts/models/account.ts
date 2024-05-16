import { CurrencyCode } from "modules/shared/models";

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

export interface HistoryBalance {
  date: string;
  balance: number;
}