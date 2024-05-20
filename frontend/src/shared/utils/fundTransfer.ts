import { ExchangeRates } from "shared/constants";
import { format } from "date-fns";
import axios from "services/axios";

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
  const response = await axios.get(
    process.env.REACT_APP_CURRENCY_EXCHANGE_API!
  );
  return response.data;
};

export const updateHistoryBalance = async (
  historyBalance: Record<string, string | number>[],
  newBalance: number | string,
  currency: string
): Promise<Record<string, string | number>[]> => {
  // Ensure newBalance is treated as a number
  let balance =
    typeof newBalance === "string" ? parseFloat(newBalance) : newBalance;

  // Fetch exchange rates
  const exchangeRates = await fetchConversionRates();
  // Convert new balance to EUR if the currency is not already EUR
  let eurBalance = balance;
  if (currency !== "EUR") {
    eurBalance = convertCurrency(exchangeRates, currency, "EUR", balance);
  }

  // Format the balance to 2 decimal places
  eurBalance = parseFloat(eurBalance.toFixed(2));

  // Check if the last entry's balance matches the new balance
  const lastEntry = historyBalance[historyBalance.length - 1];
  const currentDate = format(new Date(), "MMM dd");
  if (!lastEntry || lastEntry.balance !== eurBalance) {
    // If the balances don't match or there are no previous entries, add a new entry
    const newEntry = {
      date: currentDate,
      balance: eurBalance,
    };

    // If the last entry has the same date, update it
    if (lastEntry && lastEntry.date === currentDate) {
      historyBalance[historyBalance.length - 1] = newEntry;
      return [...historyBalance];
    } else {
      return [...historyBalance, newEntry];
    }
  }
  // If the balances match, return the existing history
  return historyBalance;
};
