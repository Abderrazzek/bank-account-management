import axios from "axios";
import { ExchangeRates } from "../models";
import { Account } from "shared/constants";

export function convertCurrency(
  exchangeRates: ExchangeRates,
  sourceCurrency: string,
  targetCurrency: string,
  value: number
): number {
  // Check if the currencies are available in the exchange rates data
  if (
    !(sourceCurrency in exchangeRates) ||
    !(targetCurrency in exchangeRates)
  ) {
    throw new Error("Invalid currencies");
  }

  // Get the exchange rates for the source and target currencies
  const sourceRate = exchangeRates[sourceCurrency];
  const targetRate = exchangeRates[targetCurrency];

  // Calculate the converted value
  const convertedValue = (value / sourceRate) * targetRate;

  // Return the converted value
  return convertedValue;
}

// TODO CONFIRM THIS AND IT'S EMPLACEMENT
export const fetchConversionRates = async (): Promise<ExchangeRates> => {
  const response = await axios.get(process.env.CURRENCY_EXCHANGE_API!);
  return response.data;
};

export const updateHistoryBalance = (
  account: Account,
  newBalance: number
): Record<string, string | number>[] => {
  const newEntry = {
    date: new Date().toISOString(),
    balance: newBalance,
  };
  return [...account.historyBalance, newEntry];
};

export const getAccountIds = (accounts: Account[]): number[] => {
  return accounts
    .filter((account) => !account.isDeleted)
    .map((account) => account.id);
};
