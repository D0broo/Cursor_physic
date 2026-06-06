export type DynamicsTabId = "theory" | "laws" | "formulas" | "algorithms";

export type DynamicsTab = {
  id: DynamicsTabId;
  label: string;
};

export type DynamicsDefinition = {
  number: number;
  term: string;
  description: string;
};

export type DynamicsLaw = {
  number: number;
  title: string;
  description: string;
  latex?: string;
  note?: string;
  imageQuery?: string;
};

export type DynamicsFormula = {
  number: number;
  title: string;
  latex: string | string[];
};

export const DYNAMICS_TABS: DynamicsTab[] = [
  { id: "theory", label: "Теорія" },
  { id: "laws", label: "Закони" },
  { id: "formulas", label: "Формули" },
  { id: "algorithms", label: "Алгоритм" },
];

export const dynamicsData = {
  theory: [
    {
      number: 1,
      term: "Динаміка",
      description:
        "розділ механіки, в якому вивчаються причини виникнення механічного руху",
    },
    {
      number: 2,
      term: "Інерція, інертність",
      description:
        "для зміни швидкостей руху тіла під дією сили потрібен деякий час",
    },
    {
      number: 3,
      term: "Маса, сила, рівнодійна сила, взаємодія",
      description:
        "маса (m) — фізична величина, яка є мірою інертності й гравітації [кг]; сила (F) — векторна фізична величина, яка є мірою взаємодії тіл [Н]; рівнодійна сила — сума всіх сил; взаємодія — дія тіл одне на одного (зміна швидкості або деформація)",
    },
    {
      number: 32,
      term: "Перша умова рівноваги",
      description:
        "тіло, що не має осі обертання, знаходиться у стані рівноваги, якщо векторна сума сил, що діють на тіло, дорівнює нулю",
    },
    {
      number: 33,
      term: "Друга умова рівноваги",
      description:
        "необхідна для досягнення рівноваги, передбачає уникнення прискореного обертання",
    },
    {
      number: 34,
      term: "Густина",
      description:
        "фізична величина, яка дорівнює відношенню маси речовини до її об'єму",
    },
  ] satisfies DynamicsDefinition[],

  laws: [
    {
      number: 1,
      title: "Перший закон Ньютона (закон інерції)",
      description:
        "існують такі системи відліку, відносно яких тіло зберігає стан спокою або рівномірного прямолінійного руху, якщо на тіло не діють жодні сили або якщо дія цих сил скомпенсована",
      imageQuery: "newton first law inertia physics diagram",
    },
    {
      number: 2,
      title: "Другий закон Ньютона",
      description:
        "прискорення, якого набуває тіло внаслідок дії сили, прямо пропорційне цій силі та обернено пропорційне масі тіла",
      latex: "F = ma",
      imageQuery: "newton second law force acceleration physics",
    },
    {
      number: 3,
      title: "Третій закон Ньютона",
      description:
        "тіла взаємодіють із силами, що мають одну природу, напрямлені вздовж однієї прямої, рівні за модулем і протилежні за напрямом",
      note: "F₁ — сила, з якою перше тіло діє на друге; F₂ — сила, з якою друге тіло діє на перше",
      latex: "F_1 = -F_2",
      imageQuery: "newton third law action reaction physics",
    },
  ] satisfies DynamicsLaw[],

  formulas: [
    {
      number: 35,
      title: "Прискорення",
      latex: "a = \\frac{v - v_0}{t} = \\frac{\\Delta v}{\\Delta t}",
    },
    {
      number: 36,
      title: "Швидкість",
      latex: "v = \\frac{s}{t}",
    },
    {
      number: 37,
      title: "Переміщення",
      latex: "s = v_0 t + \\frac{at^2}{2}",
    },
    {
      number: 38,
      title: "Координата",
      latex: "x = x_0 + v_0 t + \\frac{at^2}{2}",
    },
    {
      number: 39,
      title: "Лінійна швидкість",
      latex: "v = \\frac{2\\pi R}{T}",
    },
    {
      number: 40,
      title: "Лінійна швидкість через кутову швидкість",
      latex: "v = \\omega R",
    },
    {
      number: 41,
      title: "Кутова швидкість",
      latex: [
        "\\omega = \\frac{2\\pi}{T}",
        "\\omega = \\frac{\\varphi}{t}",
      ],
    },
    {
      number: 43,
      title: "Період",
      latex: "T = \\frac{t}{n}",
    },
    {
      number: 44,
      title: "Частота",
      latex: "\\nu = \\frac{1}{T} = \\frac{n}{t}",
    },
    {
      number: 45,
      title: "Зв'язок між періодом та частотою",
      latex: "T = \\frac{1}{\\nu}",
    },
    {
      number: 46,
      title: "Доцентрове прискорення",
      latex: "a = \\frac{v^2}{R} = \\omega^2 R",
    },
  ] satisfies DynamicsFormula[],

  algorithms: [
    "Уважно прочитайте умову задачі. З'ясуйте, які сили діють на тіло та характер руху тіла (рухається тіло рівномірно чи з прискоренням; якою є траєкторія руху тіла).",
    "Запишіть коротко умову задачі, виразіть числові значення в СІ.",
    "Зробіть схематичний рисунок, покажіть на ньому обрану систему координат, всі сили, що діють на тіло, та напрям прискорення тіла.",
    "Запишіть другий закон Ньютона у векторному вигляді та проекціях на осі координат.",
    "Запишіть додаткові рівняння (наприклад, формули для сил або рівняння кінематики з урахуванням початкових умов: початкових координат та швидкостей тіла).",
    "Розв'яжіть отриману систему рівнянь у загальному вигляді.",
    "Проаналізуйте отриманий результат (перевірте одиниці величин).",
    "Виконайте числові розрахунки, оцініть правдоподібність результатів.",
    "Запишіть відповідь.",
  ],
};
