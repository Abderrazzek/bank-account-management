export interface ExchangeRates {
  [currency: string]: number;
}

export interface TransactionResult {
  updatedSenderBalance: number;
  updatedReceiverBalance: number;
}
