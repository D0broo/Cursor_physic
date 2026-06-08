export type MechanicalVibrationsTabId = "theory" | "laws" | "formulas";

export type MechaniclaVibrationsTab = {
    id: MechanicalVibrationsTabId;
    label: string;
};

export type MechanicalVibrationsDefinition = {
    number: number;
    term: string;
    description: string;
  };
  
export type MechanicalVibrationsLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
};
  
export type MechanicalVibrationsFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const MECHANICALVIBRATIONS_TABS: MechanicalVibrationsTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони" },
    { id: "formulas", label: "Формули" },
];

export const mechanicalvibrationsData = {
    theory: [
      {
        number: 1,
        term: "Коливання",
        description:
          "рухи, які повторюються через певні інтервали часу",
      },
      {
        number: 2,
        term: "Вільні коливання",
        description:
          "коливання, які відбуваються під дією внутрішніх сил",
      },
      {
        number: 3,
        term: "Затухаючі коливання",
        description:
          "коливання, амплітуда яких із часом зменшується",
      },
      {
        number: 4,
        term: "Вимушені коливання",
        description:
          "коливання, які відбуваються внаслідок дії зовнішньої сили",
      },
      {
        number: 5,
        term: "Автоколивання",
        description:
          "це незатухаючі коливання, які відбуваються в системі за рахунок надходження енергії від постійного джерела, що регулюється самою системою",
      },
      {
        number: 6,
        term: "Перетворення енергії під час коливань:",
        description:
          "яка енергія в положенні рівноваги, Ek; в крайньому положенні, Ep; в будь-якому Ek, Ep",
      },
      {
        number: 7,
        term: "Період",
        description:
          "час, за який тіло робить одне повне коливання",
      },
      {
        number: 8,
        term: "Частота",
        description:
          "кількість здійснених повних коливань в одиницю часу",
      },
      {
        number: 9,
        term: "Зміщення",
        description:
          "відстань від положення рівноваги до точки, в якій у даний момент часу перебуває тіло, що коливається",
      },
      {
        number: 10,
        term: "Амплітуда",
        description:
          "максимальна відстань, на яку відхиляється тіло, що коливається, від свого положення рівноваги",
      },
      {
        number: 11,
        term: "Циклічна частота",
        description:
          "кількість коливань за 2π секунд",
      },
      {
        number: 12,
        term: "Фаза коливань",
        description:
          "фізична величина, яка характеризує стан коливальної системи в даний момент часу",
      },
      {
        number: 13,
        term: "Математичний маятник",
        description:
          "куля на нитці",
      },
      {
        number: 14,
        term: "Резонанс",
        description:
          "це явище різкого збільшення амплітуди вимушених коливань",
      },
      {
        number: 15,
        term: "Умова резонансу",
        description:
          "частота зовнішньої сили, що періодично змінюється, збігається з власною частотою коливань системи",
      },
      {
        number: 16,
        term: "Хвиля",
        description:
          "це поширення в просторі коливань речовини або поля",
      },
      {
        number: 17,
        term: "Умови виникнення хвилі",
        description:
          "джерело коливань і пружне середовище (у вакуумі хвилі розповсюджуватися не будуть)",
      },
      {
        number: 18,
        term: "Два види хвиль",
        description:
          "Поперечні хвилі - хвиля, у якій коливання відбуваються в площині, перпендикулярній до напрямку поширення частинок; Поздовжні хвилі - це хвилі, у яких частинки коливаються вздовж напрямку поширення частинок",
      },
      {
        number: 19,
        term: "Властивості хвиль",
        description:
          "відбивання, поглинання, додавання, оминання, заломлення, поляризація",
      },
      {
        number: 20,
        term: "Діапазони звуку, який звук чує людина",
        description:
          "16 Гц - 20 кГц",
      },
      {
        number: 21,
        term: "Характеристики звуку",
        description:
          "висота тону [v \ T] - фізіологічна характеристика звуку, що відповідає фізичній характеристиці звуку частоті. (чим більше частота, більше висота тону); гучність [A]; тембр; довжина хвилі [λ]; Гучність - сприйняття сили звуку; Тембр - визначається складом звукової хвилі: звукова хвиля, основний тон, обертони",
      },
      {
        number: 22,
        term: "Відлуння",
        description:
          "відбивання звуку",
      },
      {
        number: 23,
        term: "Довжина хвилі",
        description:
          "відстань між фронтами хвилі",
      },
    ] satisfies MechanicalVibrationsDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Закон гармонічних коливань",
        description:
          "описує зміщення (x) тіла від положення рівноваги залежно від часу (t)",
        imageFile: "garmohichnykolivannya.svg"
      },
      {
        number: 2,
        title: "Закон поширення енергії",
        description:
          "хвилі переносять енергію у просторі без перенесення речовини. Інтенсивність хвилі прямо пропорційна квадрату її амплітуди",
      },
    ] satisfies MechanicalVibrationsLaw[],
  
    formulas: [
      {
        number: 1,
        title: "Період коливань",
        latex: [
          "T = \\frac{t}{n} \\quad (\\text{Базова})",
          "T = 2\\pi \\sqrt{\\frac{m}{k}} \\quad (\\text{Пружинний маятник})",
          "T = 2\\pi \\sqrt{\\frac{l}{g}} \\quad (\\text{Нитяний маятник})"
        ],
      },
      {
        number: 2,
        title: "Частота коливань",
        latex: [
          "\\nu = \\frac{n}{t} \\quad (\\text{Базова})",
          "\\nu = \\frac{1}{T} \\quad (\\text{Зв'язок з періодом})"
        ],
      },
      {
        number: 3,
        title: "Циклічна частота",
        latex: [
          "\\omega = \\frac{2\\pi}{T}",
          "\\omega = 2\\pi \\nu"
        ],
      },
      {
        number: 4,
        title: "Рівняння гармонічних коливань",
        latex: [
          "x(t) = A \\sin(\\omega t + \\varphi_0)",
          "x(t) = A \\cos(\\omega t + \\varphi_0)"
        ],
      },
      {
        number: 5,
        title: "Хвилі",
        latex: [
          "\\lambda = v \\cdot T = \\frac{v}{\\nu} \\quad (\\text{Довжина хвилі})",
          "y(x, t) = A \\cos(\\omega t - \\frac{2\\pi x}{\\lambda}) \\quad (\\text{Рівняння хвилі})"
        ],
      },
    ] satisfies MechanicalVibrationsFormula[],
  };