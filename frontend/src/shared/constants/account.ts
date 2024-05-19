import { CurrencyCode } from "shared/models";

export interface Account {
  id: string;
  ownerId: number;
  firstName: string;
  lastName: string;
  currency: CurrencyCode;
  balance: number;
  historyBalance: Record<string, string | number>[];
  //TODO should be changed to boolean after the issue will be fixed on server json package
  // https://stackoverflow.com/questions/51217008/filter-boolean-from-an-json-object-in-javascript
  isDeleted?: string;
}
