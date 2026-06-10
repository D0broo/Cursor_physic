export type MolecularyTabId = "theory" | "laws" | "formulas";

export type MolecularyTab = {
    id: MolecularyTabId;
    label: string;
};

export type MolecularyDefinition = {
    number: number;
    term: string;
    description: string;
  };
  
export type MolecularyLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
};
  
export type MolecularyFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const MOLECULARY_TABS: MolecularyTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони" },
    { id: "formulas", label: "Формули" },
];

export const molecularyData = {
    theory: [
      {
        number: 1,
        term: "Коливання",
        description:
          "рухи, які повторюються через певні інтервали часу",
      },
      {
        number: 2,
        term: "Дифузія та Осмос",
        description: "Дифузія — взаємне проникнення молекул однієї речовини в іншу. Осмос — однобічна дифузія молекул розчинника крізь мембрану.",
      },
      {
        number: 3,
        term: "Броунівський рух та Відносна атомна маса",
        description: "Броунівський рух — безладний хаотичний рух частинок. Відносна атомна маса — безрозмірна величина, що вказує відношення маси атома до 1/12 маси атома Карбону.",
      },
      {
        number: 4,
        term: "Молярна маса",
        description: "Маса 1 моля речовини.",
      },
      {
        number: 5,
        term: "Моль та Число Авогадро",
        description: "1 моль — кількість речовини, що містить стільки ж частинок, скільки атомів у 12 г Карбону. Число Авогадро — кількість частинок в 1 молі речовини.",
      },
      {
        number: 6,
        term: "Ідеальний газ",
        description: "Фізична модель газу, де нехтують об'ємом молекул та силами взаємодії між ними (крім моментів зіткнень).",
      },
      {
        number: 7,
        term: "Тиск газу",
        description: "Фізична величина, що виникає в результаті хаотичних ударів молекул газу об стінки посудини.",
      },
      {
        number: 8,
        term: "Температурна шкала",
        description: "Переведення температури: T(K) = t(°C) + 273.",
      },
      {
        number: 9,
        term: "Абсолютний нуль",
        description: "Найнижча теоретично можлива температура, що дорівнює -273°C (0 К).",
      },
      {
        number: 10,
        term: "Ізопроцес",
        description: "Процес у газі сталої маси, під час якого один із макропараметрів (тиск, об'єм або температура) не змінюється.",
      },
      {
        number: 11,
        term: "Парціальний тиск",
        description: "Тиск, який чинив би окремий газ, якби він один займав весь об'єм суміші.",
      },
      {
        number: 12,
        term: "Закон Дальтона",
        description: "Тиск суміші газів дорівнює сумі парціальних тисків усіх газів, що входять до її складу.",
      },
    ] satisfies MolecularyDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Ізотермічний процес",
        description: "Процес при сталій температурі (T = const). Закон Бойля-Маріотта: добуток тиску на об'єм є величиною сталою.",
        latex: "p_1 V_1 = p_2 V_2",
        note: "Вчений: Бойль-Маріотт. При збільшенні тиску об'єм зменшується.",
        imageFile: "izoterma.png"
      },
      {
        number: 2,
        title: "Ізобарний процес",
        description: "Процес при сталому тиску (p = const). Закон Гей-Люссака: відношення об'єму до температури є сталим.",
        latex: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
        note: "Вчений: Гей-Люссак. При нагріванні газ розширюється.",
        imageFile: "izobara.png"
      },
      {
        number: 3,
        title: "Ізохорний процес",
        description: "Процес при сталому об'ємі (V = const). Закон Шарля: відношення тиску до температури є сталим.",
        latex: "\\frac{p_1}{T_1} = \\frac{p_2}{T_2}",
        note: "Вчений: Шарль. При нагріванні в закритій посудині тиск зростає.",
        imageFile: "izohora.png"
      },
    ] satisfies MolecularyLaw[],
  
    formulas: [
        {
            number: 1,
            title: "Кількість речовини",
            latex: [
              "\\nu = \\frac{m}{M} \\quad (\\text{через масу})",
              "\\nu = \\frac{N}{N_A} \\quad (\\text{через кількість частинок})"
            ],
          },
          {
            number: 2,
            title: "Основні параметри",
            latex: [
              "n = \\frac{N}{V} \\quad (\\text{Концентрація})",
              "\\rho = \\frac{m}{V} \\quad (\\text{Густина})",
              "p = \\frac{F}{S} \\quad (\\text{Тиск})"
            ],
          },
          {
            number: 3,
            title: "Тиск газу (МКТ)",
            latex: [
              "p = nkT \\quad (\\text{основне рівняння МКТ})",
              "p = \\frac{1}{3} n m_0 v^2 \\quad (\\text{через середній квадрат швидкості})",
              "p = \\frac{1}{3} \\rho v^2 \\quad (\\text{через густину})",
              "p = \\frac{2}{3} n E_k \\quad (\\text{через кінетичну енергію})"
            ],
          },
          {
            number: 4,
            title: "Додаткові рівняння тиску",
            latex: [
              "p = \\frac{\\rho}{M} RT \\quad (\\text{через густину})",
              "p = \\rho gh \\quad (\\text{тиск стовпа рідини})"
            ],
          },
          {
            number: 5,
            title: "Енергія та температура",
            latex: "E_k = \\frac{3}{2} kT",
          },
          {
            number: 6,
            title: "Газові закони",
            latex: [
              "pV = \\frac{m}{M} RT \\quad (\\text{Менделєєва-Клапейрона})",
              "\\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2} \\quad (\\text{Клапейрона})",
              "p = \\sum p_i \\quad (\\text{Закон Дальтона})"
            ],
          },
    ] satisfies MolecularyFormula[],
  };