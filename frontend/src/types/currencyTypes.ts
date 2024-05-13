export type CurrencyCode =
  | "AUD"
  | "BGN"
  | "BRL"
  | "CAD"
  | "CHF"
  | "CNY"
  | "CZK"
  | "DKK"
  | "EUR"
  | "GBP"
  | "HKD"
  | "HRK"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "ISK"
  | "JPY"
  | "KRW"
  | "MXN"
  | "MYR"
  | "NOK"
  | "NZD"
  | "PHP"
  | "PLN"
  | "RON"
  | "RUB"
  | "SEK"
  | "SGD"
  | "THB"
  | "TRY"
  | "USD"
  | "ZAR";

export const CurrencyCodes: CurrencyCode[] = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
];

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
}

export const currencies: CurrencyInfo[] = [
  { code: "AUD", symbol: "$" },
  { code: "BGN", symbol: "лв" },
  { code: "BRL", symbol: "R$" },
  { code: "CAD", symbol: "$" },
  { code: "CHF", symbol: "CHF" },
  { code: "CNY", symbol: "¥" },
  { code: "CZK", symbol: "Kč" },
  { code: "DKK", symbol: "kr" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "HKD", symbol: "HK$" },
  { code: "HRK", symbol: "kn" },
  { code: "HUF", symbol: "Ft" },
  { code: "IDR", symbol: "Rp" },
  { code: "ILS", symbol: "₪" },
  { code: "INR", symbol: "₹" },
  { code: "ISK", symbol: "kr" },
  { code: "JPY", symbol: "¥" },
  { code: "KRW", symbol: "₩" },
  { code: "MXN", symbol: "$" },
  { code: "MYR", symbol: "RM" },
  { code: "NOK", symbol: "kr" },
  { code: "NZD", symbol: "$" },
  { code: "PHP", symbol: "₱" },
  { code: "PLN", symbol: "zł" },
  { code: "RON", symbol: "lei" },
  { code: "RUB", symbol: "₽" },
  { code: "SEK", symbol: "kr" },
  { code: "SGD", symbol: "$" },
  { code: "THB", symbol: "฿" },
  { code: "TRY", symbol: "₺" },
  { code: "USD", symbol: "$" },
  { code: "ZAR", symbol: "R" },
];
