export type KinematicsTabId =
  | "theory"
  | "graphs"
  | "formulas"
  | "examples"
  | "advanced-theory";

export type KinematicsTab = {
  id: KinematicsTabId;
  label: string;
};

export type KinematicsDefinition = {
  term: string;
  description: string;
};

export type KinematicsFormula = {
  title: string;
  latex: string | string[];
};

export type KinematicsGraph = {
  id: string;
  title: string;
  motionType: string;
  xAxis: string;
  yAxis: string;
  description: string;
  shape: "linear-up" | "horizontal" | "linear-through-origin" | "parabola-up";
};

export type KinematicsExample = {
  title: string;
  condition: string;
  steps: string[];
  answer: string;
};

export const KINEMATICS_TABS: KinematicsTab[] = [
  { id: "theory", label: "Теорія" },
  { id: "graphs", label: "Графіки" },
  { id: "formulas", label: "Формули" },
  { id: "examples", label: "Приклади задач" },
  { id: "advanced-theory", label: "Поглиблена теорія" },
];

export const advancedTheory = {
  transmissions: [
    {
      name: "Пасова передача",
      desc: "v_1 = v_2 (ремені не розтягуються), n2 = n3 (жорстке кріплення).",
      imageFile: "pasova-peredacha.svg"
    },
    {
      name: "Фрикційна передача",
      desc: "n1/n2 = r2/r1 (відношення частот обернене до радіусів).",
      imageFile: "phrykziyna-peredacha.svg"
    },
    {
      name: "Зубчаста передача",
      desc: "r1/r2 = z1/z2, n1/n2 = z2/z1 (відношення частот через кількість зубців).",
      imageFile: "zubchasta-peredacha.svg"
    },
    {
      name: "Ланцюгова передача",
      desc: "Забезпечує передачу руху без проковзування на великі відстані.",
      imageFile: "lanzugova-peredacha.svg"
    }
  ],
  circularMotion: {
    title: "Нерівномірний рух по колу",
    imageFile: "pivne-pryskorennya.png",
    concepts: [
      { 
        name: "Повне прискорення", 
        formula: "a = a_r + a_t", 
        desc: "Векторна сума радіального (доцентрового) та тангенційного прискорень. Вони завжди перпендикулярні: a_r ⊥ a_t." 
      },
      { 
        name: "Складові прискорення", 
        formula: "a_r = \\omega^2 r; \\quad a_t = \\varepsilon r", 
        desc: "Радіальне (a_r) відповідає за зміну напрямку швидкості, тангенційне (a_t) — за зміну її модуля." 
      },
      { 
        name: "Кутове прискорення", 
        formula: "\\varepsilon = \\frac{\\Delta\\omega}{\\Delta t}", 
        desc: "Характеризує швидкість зміни кутової швидкості." 
      },
      { 
        name: "Середні значення", 
        formula: "\\omega_{сер} = \\frac{\\omega + \\omega_0}{2}; \\quad n_{сер} = \\frac{n + n_0}{2}", 
        desc: "Використовуються при рівнозмінному обертальному русі." 
      }
    ]
  }
};

export const kinematicsData = {
  theory: [
    {
      term: "Механіка",
      description:
        "наука про механічний рух матеріальних тіл і про взаємодії між тілами",
    },
    {
      term: "Механічний рух",
      description:
        "зміна з часом положення тіла в просторі відносно інших тіл",
    },
    {
      term: "Кінематика / Динаміка",
      description:
        "кінематика — розділ механіки, що вивчає як рухається тіло; динаміка — розділ механіки, що вивчає чому рухається тіло",
    },
    {
      term: "Тіло відліку",
      description:
        "тіло, відносно якого розглядають рух всіх інших тіл",
    },
    {
      term: "Система відліку",
      description:
        "тіло відліку, система координат і прилад для відліку часу",
    },
    {
      term: "Матеріальна точка",
      description:
        "тіло, розмірами якого можна знехтувати за певних умов",
    },
    {
      term: "Траєкторія",
      description: "уявна лінія, по якій рухається тіло",
    },
    {
      term: "Шлях",
      description: "фізична величина, що дорівнює довжині траєкторії",
    },
    {
      term: "Переміщення",
      description:
        "вектор, що з'єднує початкове і кінцеве положення тіла",
    },
    {
      term: "Основна задача механіки",
      description:
        "визначити положення тіла в просторі в будь-який момент часу",
    },
    {
      term: "Поступальний рух",
      description:
        "рух, за якого точки тіла або системи матеріальних точок переміщуються однаково",
    },
    {
      term: "Рівномірний рух",
      description:
        "тіло за будь-які рівні проміжки часу проходить однаковий шлях",
    },
    {
      term: "Нерівномірний рух",
      description:
        "тіло за будь-які рівні проміжки часу проходить різний шлях",
    },
    {
      term: "Прискорення",
      description:
        "векторна фізична величина, яка характеризує швидкість зміни швидкості руху тіла",
    },
    {
      term: "Рівноприскорений рух",
      description:
        "швидкість тіла за будь-які рівні проміжки часу змінюється однаково",
    },
    {
      term: "Геометрична суть площі під графіком v(t)",
      description:
        "для будь-якого руху проекція переміщення чисельно дорівнює площі фігури під графіком залежності швидкості від часу",
    },
    {
      term: "Вільне падіння",
      description:
        "падіння тіл у безповітряному просторі, тобто лише під дією сили тяжіння",
    },
    {
      term: "Співвідношення шляхів при v₀ = 0",
      description:
        "якщо початкова швидкість дорівнює нулю, то шляхи за послідовні рівні проміжки часу відносяться як s₁ : s₂ : s₃ = 1 : 3 : 5",
    },
    {
      term: "Період",
      description:
        "проміжок часу, протягом якого повторюється якийсь циклічний процес",
    },
    {
      term: "Частота",
      description:
        "фізична величина, що дорівнює кількості однакових подій за одиницю часу",
    },
  ] satisfies KinematicsDefinition[],

  graphs: [
    {
      id: "uniform-x",
      title: "Графік координати при рівномірному русі",
      motionType: "Рівномірний рух",
      xAxis: "t",
      yAxis: "x",
      description:
        "Залежність x(t) — пряма лінія з додатним нахилом. Кутовий коефіцієнт дорівнює швидкості v.",
      shape: "linear-up",
    },
    {
      id: "uniform-v",
      title: "Графік швидкості при рівномірному русі",
      motionType: "Рівномірний рух",
      xAxis: "t",
      yAxis: "v",
      description:
        "Графік v(t) — горизонтальна пряма. Швидкість не змінюється з часом.",
      shape: "horizontal",
    },
    {
      id: "accelerated-v",
      title: "Графік швидкості при рівноприскореному русі",
      motionType: "Рівноприскорений рух",
      xAxis: "t",
      yAxis: "v",
      description:
        "Графік v(t) — пряма, що починається з v₀. Нахил прямої дорівнює прискоренню a.",
      shape: "linear-up",
    },
    {
      id: "accelerated-s",
      title: "Графік шляху при рівноприскореному русі",
      motionType: "Рівноприскорений рух",
      xAxis: "t",
      yAxis: "s",
      description:
        "Графік s(t) — парабола. При v₀ = 0 шлях зростає пропорційно t².",
      shape: "parabola-up",
    },
    {
      id: "accelerated-a",
      title: "Графік прискорення при рівноприскореному русі",
      motionType: "Рівноприскорений рух",
      xAxis: "t",
      yAxis: "a",
      description:
        "Графік a(t) — горизонтальна пряма. Прискорення постійне.",
      shape: "horizontal",
    },
    {
      id: "free-fall-v",
      title: "Графік швидкості при вільному падінні",
      motionType: "Вільне падіння",
      xAxis: "t",
      yAxis: "v",
      description:
        "Графік v(t) — пряма через початок координат. v = gt, де g ≈ 9,8 м/с².",
      shape: "linear-through-origin",
    },
  ] satisfies KinematicsGraph[],

  formulas: [
    {
      title: "Швидкість рівномірного руху",
      latex: "v = \\frac{s}{t}",
    },
    {
      title: "Координата рівномірного руху",
      latex: "x = x_0 + vt",
    },
    {
      title: "Прискорення",
      latex: "a = \\frac{v - v_0}{t} = \\frac{\\Delta v}{\\Delta t}",
    },
    {
      title: "Швидкість рівноприскореного руху",
      latex: "v = v_0 + at",
    },
    {
      title: "Переміщення рівноприскореного руху",
      latex: "s = v_0 t + \\frac{at^2}{2}",
    },
    {
      title: "Переміщення без часу (рівноприскорений рух)",
      latex: "v^2 - v_0^2 = 2as",
    },
    {
      title: "Координата рівноприскореного руху",
      latex: "x = x_0 + v_0 t + \\frac{at^2}{2}",
    },
    {
      title: "Період",
      latex: "T = \\frac{t}{n}",
    },
    {
      title: "Частота",
      latex: "\\nu = \\frac{1}{T} = \\frac{n}{t}",
    },
    {
      title: "Залежність між періодом і частотою",
      latex: "T = \\frac{1}{\\nu}",
    },
    {
      title: "Швидкість руху по колу",
      latex: "v = \\frac{2\\pi R}{T} = \\omega R",
    },
    {
      title: "Кутова швидкість",
      latex: [
        "\\omega = \\frac{2\\pi}{T}",
        "\\omega = \\frac{\\varphi}{t}",
      ],
    },
    {
      title: "Доцентрове прискорення",
      latex: "a = \\frac{v^2}{R} = \\omega^2 R",
    },
    {
      title: "Довжина кола",
      latex: "C = 2\\pi R",
    },
  ] satisfies KinematicsFormula[],

  examples: [
    {
      title: "Швидкість рівномірного руху",
      condition:
        "Автомобіль рівномірно проїхав 120 км за 2 години. Знайдіть його швидкість.",
      steps: [
        "s = 120\\ \\text{км},\\quad t = 2\\ \\text{год}",
        "v = \\frac{s}{t} = \\frac{120}{2} = 60\\ \\text{км/год}",
      ],
      answer: "v = 60 км/год",
    },
    {
      title: "Шлях при рівноприскореному русі",
      condition:
        "Тіло рухається з прискоренням 2 м/с² без початкової швидкості. Який шлях воно пройде за 5 с?",
      steps: [
        "v_0 = 0,\\quad a = 2\\ \\text{м/с}^2,\\quad t = 5\\ \\text{с}",
        "s = v_0 t + \\frac{at^2}{2} = 0 + \\frac{2 \\cdot 25}{2} = 25\\ \\text{м}",
      ],
      answer: "s = 25 м",
    },
    {
      title: "Швидкість при вільному падінні",
      condition:
        "Камінь падає з висоти без початкової швидкості. Яку швидкість він матиме через 3 с? g = 10 м/с².",
      steps: [
        "v_0 = 0,\\quad t = 3\\ \\text{с},\\quad g = 10\\ \\text{м/с}^2",
        "v = v_0 + gt = 0 + 10 \\cdot 3 = 30\\ \\text{м/с}",
      ],
      answer: "v = 30 м/с",
    },
    {
      title: "Співвідношення шляхів",
      condition:
        "Тіло рухається рівноприскорено з v₀ = 0. Як відносяться шляхи за 1-у, 2-у та 3-ю секунди?",
      steps: [
        "s_1 : s_2 : s_3 = 1 : 3 : 5",
        "Наприклад, якщо s_1 = 2\\ \\text{м}, то s_2 = 6\\ \\text{м},\\ s_3 = 10\\ \\text{м}",
      ],
      answer: "s₁ : s₂ : s₃ = 1 : 3 : 5",
    },
    {
      title: "Період і частота обертання",
      condition:
        "Колесо здійснює 30 повних обертів за 1 хвилину. Знайдіть період обертання, частоту та перевірте залежність T = 1/ν.",
      steps: [
        "n = 30,\\quad t = 1\\ \\text{хв} = 60\\ \\text{с}",
        "T = \\frac{t}{n} = \\frac{60}{30} = 2\\ \\text{с}",
        "\\nu = \\frac{n}{t} = \\frac{30}{60} = 0{,}5\\ \\text{Гц}",
        "T = \\frac{1}{\\nu} = \\frac{1}{0{,}5} = 2\\ \\text{с}",
      ],
      answer: "T = 2 с, ν = 0,5 Гц",
    },
    {
      title: "Рух по колу",
      condition:
        "Точка рівномірно рухається по колу радіусом R = 0,5 м з періодом T = 4 с. Знайдіть лінійну швидкість, кутову швидкість і доцентрове прискорення.",
      steps: [
        "R = 0{,}5\\ \\text{м},\\quad T = 4\\ \\text{с}",
        "v = \\frac{2\\pi R}{T} = \\frac{2\\pi \\cdot 0{,}5}{4} = \\frac{\\pi}{4} \\approx 0{,}79\\ \\text{м/с}",
        "\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{4} = \\frac{\\pi}{2} \\approx 1{,}57\\ \\text{рад/с}",
        "a = \\frac{v^2}{R} = \\frac{(\\pi/4)^2}{0{,}5} = \\frac{\\pi^2}{8} \\approx 1{,}23\\ \\text{м/с}^2",
      ],
      answer: "v ≈ 0,79 м/с, ω ≈ 1,57 рад/с, a ≈ 1,23 м/с²",
    },
  ] satisfies KinematicsExample[],
};
