export type CurrencyData = {
  result: CurrencyList[];
};

export type CurrencyList = {
  id: string;
  label: string;
  entries: CurrencyItem[];
};

export type CurrencyItem = {
  id: string;
  text: string;
  image: string;
};
