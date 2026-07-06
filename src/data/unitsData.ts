export type BaseUnit = {
  name: string;
  symbol: string;
  quantity: string;
};

export type DerivedUnit = {
  name: string;
  symbol: string;
  quantity: string;
  primary: string;
  alternatives?: string[];
  note?: string;
};

export const BASE_UNITS: BaseUnit[] = [
  { name: "Метр", symbol: "м", quantity: "Довжина" },
  { name: "Кілограм", symbol: "кг", quantity: "Маса" },
  { name: "Секунда", symbol: "с", quantity: "Час" },
  { name: "Ампер", symbol: "А", quantity: "Сила електричного струму" },
  { name: "Кельвін", symbol: "К", quantity: "Термодинамічна температура" },
  { name: "Моль", symbol: "моль", quantity: "Кількість речовини" },
  { name: "Кандела", symbol: "кд", quantity: "Сила світла" },
];

export const DERIVED_UNITS: DerivedUnit[] = [
  {
    name: "Герц",
    symbol: "Гц",
    quantity: "Частота",
    primary: "1\\,\\text{Гц} = 1\\,\\text{с}^{-1}",
  },
  {
    name: "Ньютон",
    symbol: "Н",
    quantity: "Сила",
    primary: "1\\,\\text{Н} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}}{\\text{с}^{2}}",
    alternatives: ["1\\,\\text{Н} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}}{\\text{с}^{2}}"],
  },
  {
    name: "Паскаль",
    symbol: "Па",
    quantity: "Тиск",
    primary: "1\\,\\text{Па} = 1\\,\\frac{\\text{Н}}{\\text{м}^{2}}",
    alternatives: ["1\\,\\text{Па} = 1\\,\\frac{\\text{кг}}{\\text{м}\\cdot\\text{с}^{2}}"],
  },
  {
    name: "Джоуль",
    symbol: "Дж",
    quantity: "Робота, енергія",
    primary: "1\\,\\text{Дж} = 1\\,\\text{Н}\\cdot\\text{м}",
    alternatives: ["1\\,\\text{Дж} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}^{2}}{\\text{с}^{2}}"],
  },
  {
    name: "Ват",
    symbol: "Вт",
    quantity: "Потужність",
    primary: "1\\,\\text{Вт} = 1\\,\\frac{\\text{Дж}}{\\text{с}}",
    alternatives: ["1\\,\\text{Вт} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}^{2}}{\\text{с}^{3}}"],
  },
  {
    name: "Кулон",
    symbol: "Кл",
    quantity: "Електричний заряд",
    primary: "1\\,\\text{Кл} = 1\\,\\text{А}\\cdot\\text{с}",
  },
  {
    name: "Вольт",
    symbol: "В",
    quantity: "Електрична напруга",
    primary: "1\\,\\text{В} = 1\\,\\frac{\\text{Дж}}{\\text{Кл}}",
    alternatives: [
      "1\\,\\text{В} = 1\\,\\frac{\\text{Вт}}{\\text{А}}",
      "1\\,\\text{В} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}^{2}}{\\text{с}^{3}\\cdot\\text{А}}",
    ],
  },
  {
    name: "Ом",
    symbol: "Ом",
    quantity: "Електричний опір",
    primary: "1\\,\\text{Ом} = 1\\,\\frac{\\text{В}}{\\text{А}}",
    alternatives: ["1\\,\\text{Ом} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}^{2}}{\\text{с}^{3}\\cdot\\text{А}^{2}}"],
  },
  {
    name: "Сіменс",
    symbol: "См",
    quantity: "Електрична провідність",
    primary: "1\\,\\text{См} = 1\\,\\text{Ом}^{-1}",
    alternatives: ["1\\,\\text{См} = 1\\,\\frac{\\text{с}^{3}\\cdot\\text{А}^{2}}{\\text{кг}\\cdot\\text{м}^{2}}"],
  },
  {
    name: "Фарад",
    symbol: "Ф",
    quantity: "Електрична ємність",
    primary: "1\\,\\text{Ф} = 1\\,\\frac{\\text{Кл}}{\\text{В}}",
    alternatives: ["1\\,\\text{Ф} = 1\\,\\frac{\\text{с}^{4}\\cdot\\text{А}^{2}}{\\text{кг}\\cdot\\text{м}^{2}}"],
  },
  {
    name: "Тесла",
    symbol: "Тл",
    quantity: "Магнітна індукція",
    primary: "1\\,\\text{Тл} = 1\\,\\frac{\\text{Вб}}{\\text{м}^{2}}",
    alternatives: ["1\\,\\text{Тл} = 1\\,\\frac{\\text{кг}}{\\text{с}^{2}\\cdot\\text{А}}"],
  },
  {
    name: "Вебер",
    symbol: "Вб",
    quantity: "Магнітний потік",
    primary: "1\\,\\text{Вб} = 1\\,\\text{В}\\cdot\\text{с}",
    alternatives: ["1\\,\\text{Вб} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}^{2}}{\\text{с}^{2}\\cdot\\text{А}}"],
  },
  {
    name: "Генрі",
    symbol: "Гн",
    quantity: "Індуктивність",
    primary: "1\\,\\text{Гн} = 1\\,\\frac{\\text{Вб}}{\\text{А}}",
    alternatives: ["1\\,\\text{Гн} = 1\\,\\frac{\\text{кг}\\cdot\\text{м}^{2}}{\\text{с}^{2}\\cdot\\text{А}^{2}}"],
  },
  {
    name: "Люмен",
    symbol: "лм",
    quantity: "Світловий потік",
    primary: "1\\,\\text{лм} = 1\\,\\text{кд}\\cdot\\text{ср}",
  },
  {
    name: "Люкс",
    symbol: "лк",
    quantity: "Освітленість",
    primary: "1\\,\\text{лк} = 1\\,\\frac{\\text{лм}}{\\text{м}^{2}}",
  },
  {
    name: "Радіан",
    symbol: "рад",
    quantity: "Плоский кут",
    primary: "1\\,\\text{рад} = 1\\,\\frac{\\text{м}}{\\text{м}}",
  },
  {
    name: "Стерадіан",
    symbol: "ср",
    quantity: "Тілесний кут",
    primary: "1\\,\\text{ср} = 1\\,\\frac{\\text{м}^{2}}{\\text{м}^{2}}",
  },
  {
    name: "Градус Цельсія",
    symbol: "°C",
    quantity: "Температура за шкалою Цельсія",
    primary: "t\\,(^{\\circ}\\text{C}) = T\\,(\\text{K}) - 273{,}15",
  },
  {
    name: "Бекерель",
    symbol: "Бк",
    quantity: "Активність радіонукліда",
    primary: "1\\,\\text{Бк} = 1\\,\\text{с}^{-1}",
  },
  {
    name: "Грей",
    symbol: "Гр",
    quantity: "Поглинена доза іонізівного випромінювання",
    primary: "1\\,\\text{Гр} = 1\\,\\frac{\\text{Дж}}{\\text{кг}}",
    alternatives: ["1\\,\\text{Гр} = 1\\,\\frac{\\text{м}^{2}}{\\text{с}^{2}}"],
  },
  {
    name: "Зіверт",
    symbol: "Зв",
    quantity: "Еквівалентна доза випромінювання",
    primary: "1\\,\\text{Зв} = 1\\,\\frac{\\text{Дж}}{\\text{кг}}",
    note: "Еквівалентна доза = поглинена доза × коефіцієнт якості випромінювання.",
  },
  {
    name: "Діоптрія",
    symbol: "дптр",
    quantity: "Оптична сила лінзи",
    primary: "1\\,\\text{дптр} = 1\\,\\text{м}^{-1}",
    note: "Позасистемна одиниця, дозволена до застосування разом з SI.",
  },
  {
    name: "Рентген",
    symbol: "Р",
    quantity: "Експозиційна доза фотонного випромінювання",
    primary: "1\\,\\text{Р} = 2{,}58 \\cdot 10^{-4}\\,\\frac{\\text{Кл}}{\\text{кг}}",
    note: "Позасистемна одиниця. Одиниця SI для експозиційної дози — Кл/кг.",
  },
];
