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

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  country: string;
}

export const currencies: CurrencyInfo[] = [
  {
    code: "AUD",
    symbol: "$",
    country: "Australia",
  },
  {
    code: "BGN",
    symbol: "лв",
    country: "Bulgaria",
  },
  {
    code: "BRL",
    symbol: "R$",
    country: "Brazil",
  },
  {
    code: "CAD",
    symbol: "$",
    country: "Canada",
  },
  {
    code: "CHF",
    symbol: "CHF",
    country: "Switzerland",
  },
  {
    code: "CNY",
    symbol: "¥",
    country: "China",
  },
  {
    code: "CZK",
    symbol: "Kč",
    country: "Czech Republic",
  },
  {
    code: "DKK",
    symbol: "kr",
    country: "Denmark",
  },
  {
    code: "EUR",
    symbol: "€",
    country: "European Union",
  },
  {
    code: "GBP",
    symbol: "£",
    country: "United Kingdom",
  },
  {
    code: "HKD",
    symbol: "HK$",
    country: "Hong Kong",
  },
  {
    code: "HRK",
    symbol: "kn",
    country: "Croatia",
  },
  {
    code: "HUF",
    symbol: "Ft",
    country: "Hungary",
  },
  {
    code: "IDR",
    symbol: "Rp",
    country: "Indonesia",
  },
  {
    code: "INR",
    symbol: "₹",
    country: "India",
  },
  {
    code: "ISK",
    symbol: "kr",
    country: "Iceland",
  },
  {
    code: "JPY",
    symbol: "¥",
    country: "Japan",
  },
  {
    code: "KRW",
    symbol: "₩",
    country: "South Korea",
  },
  {
    code: "MXN",
    symbol: "$",
    country: "Mexico",
  },
  {
    code: "MYR",
    symbol: "RM",
    country: "Malaysia",
  },
  {
    code: "NOK",
    symbol: "kr",
    country: "Norway",
  },
  {
    code: "NZD",
    symbol: "$",
    country: "New Zealand",
  },
  {
    code: "PHP",
    symbol: "₱",
    country: "Philippines",
  },
  {
    code: "PLN",
    symbol: "zł",
    country: "Poland",
  },
  {
    code: "RON",
    symbol: "lei",
    country: "Romania",
  },
  {
    code: "RUB",
    symbol: "₽",
    country: "Russia",
  },
  {
    code: "SEK",
    symbol: "kr",
    country: "Sweden",
  },
  {
    code: "SGD",
    symbol: "$",
    country: "Singapore",
  },
  {
    code: "THB",
    symbol: "฿",
    country: "Thailand",
  },
  {
    code: "TRY",
    symbol: "₺",
    country: "Turkey",
  },
  {
    code: "USD",
    symbol: "$",
    country: "United States",
  },
  {
    code: "ZAR",
    symbol: "R",
    country: "South Africa",
  },
];
