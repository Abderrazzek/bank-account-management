import { ExchangeRates } from "modules/shared/models/currency";

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
