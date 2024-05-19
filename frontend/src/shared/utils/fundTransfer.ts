import axios from "axios";
import { ExchangeRates } from "shared/constants";
import { format } from "date-fns";

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

export const fetchConversionRates = async (): Promise<ExchangeRates> => {
  const response = await axios.get(process.env.CURRENCY_EXCHANGE_API!);
  return response.data;
};

export const updateHistoryBalance = async (
  historyBalance: Record<string, string | number>[],
  newBalance: number,
  currency: string
): Promise<Record<string, string | number>[]> => {
  console.log("hahahahahahaha", format(new Date(), "MMM dd"));
  // Fetch exchange rates
  const exchangeRates = await fetchConversionRates();

  // Convert new balance to EUR if the currency is not already EUR
  let eurBalance = newBalance;
  if (currency !== "EUR") {
    eurBalance = convertCurrency(exchangeRates, currency, "EUR", newBalance);
  }

  // Check if the last entry's balance matches the new balance
  const lastEntry = historyBalance[historyBalance.length - 1];
  if (!lastEntry || lastEntry.balance !== eurBalance) {
    // If the balances don't match or there are no previous entries, add a new entry
    const newEntry = {
      date: format(new Date(), "MMM dd"),
      balance: eurBalance,
    };
    console.log("=====", newEntry);
    return [...historyBalance, newEntry];
  }
  // If the balances match, return the existing history
  return historyBalance;
};
