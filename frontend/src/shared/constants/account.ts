import { CurrencyCode } from "shared/models";

export interface Account {
  id: string;
  ownerId: number;
  firstName: string;
  lastName: string;
  currency: CurrencyCode;
  balance: number;
  historyBalance: Record<string, string | number>[];
  //TODO should be changed to boolean after they fix the issue on JSON SERVER package
  // https://github.com/typicode/json-server/issues/412
  isDeleted?: string;
}
