export type SIPrefix = {
  name: string;
  symbol: string;
  factor: string;
  power: number;
  latex: string;
};

export type SIPrefixGroup = {
  label: string;
  prefixes: SIPrefix[];
};

export const SI_PREFIX_GROUPS: SIPrefixGroup[] = [
  {
    label: "Кратні (збільшення)",
    prefixes: [
      { name: "дека", symbol: "да", factor: "10", power: 1, latex: "10^{1}" },
      { name: "гекто", symbol: "г", factor: "100", power: 2, latex: "10^{2}" },
      { name: "кіло", symbol: "к", factor: "1 000", power: 3, latex: "10^{3}" },
      { name: "мега", symbol: "М", factor: "1 000 000", power: 6, latex: "10^{6}" },
      { name: "гіга", symbol: "Г", factor: "1 000 000 000", power: 9, latex: "10^{9}" },
      { name: "тера", symbol: "Т", factor: "10¹²", power: 12, latex: "10^{12}" },
      { name: "пета", symbol: "П", factor: "10¹⁵", power: 15, latex: "10^{15}" },
    ],
  },
  {
    label: "Дольні (зменшення)",
    prefixes: [
      { name: "деци", symbol: "д", factor: "0,1", power: -1, latex: "10^{-1}" },
      { name: "санти", symbol: "с", factor: "0,01", power: -2, latex: "10^{-2}" },
      { name: "мілі", symbol: "м", factor: "0,001", power: -3, latex: "10^{-3}" },
      { name: "мікро", symbol: "мк", factor: "10⁻⁶", power: -6, latex: "10^{-6}" },
      { name: "нано", symbol: "н", factor: "10⁻⁹", power: -9, latex: "10^{-9}" },
      { name: "піко", symbol: "п", factor: "10⁻¹²", power: -12, latex: "10^{-12}" },
      { name: "фемто", symbol: "ф", factor: "10⁻¹⁵", power: -15, latex: "10^{-15}" },
    ],
  },
];
