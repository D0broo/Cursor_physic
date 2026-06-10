export type ConservationsTabId = "theory" | "laws" | "formulas";

export type ConservationsTab = {
    id: ConservationsTabId;
    label: string;
};

export type ConservationsDefinition = {
    number: number;
    term: string;
    description: string;
  };
  
export type ConservationsLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
};
  
export type ConservationsFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const CONSERVATIONS_TABS: ConservationsTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони" },
    { id: "formulas", label: "Формули" },
];

export const conservationsData = {
    theory: [
      {
        number: 1,
        term: "Замкнута система тіл (ізольована)",
        description:
          "це така система тіл, на яку не діють зовнішні сили, а будь-які зміни стану системи є результатом дії внутрішніх сил",
      },
      {
        number: 2,
        term: "Абсолютно пружний удар",
        description:
          "це зіткнення тіл, у результаті якого повністю відновлюється форма та розміри тіл, що взаємодіють",
      },
      {
        number: 3,
        term: "Абсолютно непружний удар",
        description:
          "це зіткнення тіл, у результаті якого форма тіл не відновлюється і тіла після взаємодії рухаються як одне ціле",
      },
      {
        number: 4,
        term: "Реактивний рух",
        description:
          "це рух, що виникає внаслідок відділення з деякою швидкістю від тіла якоїсь його частини",
      },
      {
        number: 5,
        term: "Енергія",
        description:
          "це здатність системи виконувати роботу",
      },
      {
        number: 6,
        term: "Коли тіло має енергію?",
        description:
          "Коли воно може виконати роботу",
      },
      {
        number: 7,
        term: "Кінетична енергія",
        description:
          "це фізична величина, яка характеризує механічний стан рухомого тіла",
      },
      {
        number: 8,
        term: "Потенціальна енергія",
        description:
          "це енергія, яку має тіло внаслідок взаємодії з іншими тілами або внаслідок взаємодії частин тіла між собою",
      },
      {
        number: 9,
        term: "Повна механічна енергія",
        description:
          "це сума кінетичної і потенціальної енергії системи",
      },
      {
        number: 10,
        term: "Консервативна сила",
        description:
          "це сила, робота якої не залежить від форми траєкторії, а визначається тільки початковим і кінцевим механічним станом тіла (системи тіл)",
      },
      {
        number: 11,
        term: "Чому дорівнює робота консервативної сили по замкненій траєкторії?",
        description:
          "нулю (тому що робота консервативних сил залежить лише від початкового і кінцевого положення тіла, а не від конкретного шляху, яким тіло рухається між цими точками)",
      },
      {
        number: 12,
        term: "Як залежить робота від форми траєкторії для консервативної сили?",
        description:
          "для консервативної сили робота не залежить від форми траєкторії, а визначається лише початковим і кінцевим положенням тіла",
      },
      {
        number: 13,
        term: "Як залежить робота від форми траєкторії для консервативної сили?",
        description:
          "для консервативної сили робота не залежить від форми траєкторії, а визначається лише початковим і кінцевим положенням тіла",
      }
    ] satisfies ConservationsDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Закон збереження енергії",
        description:
          "у замкненій системі тіл, які взаємодіють тільки з консервативними силами, повна механічна енергія залишається незмінною (зберігається)",
        imageFile: "zakonzberezhennyaenergii.png",
      },
      {
        number: 2,
        title: "Закон збереження імпульсу",
        description:
          "у замкненій системі тіл векторна сума імпульсів тіл до взаємодії дорівнює векторній сумі імпульсів тіл після взаємодії",
          imageFile: "zakonzberezhennyaimpulsu.png",
      },
    ] satisfies ConservationsLaw[],
  
    formulas: [
          {
            number: 1,
            title: "Робота сили",
            latex: "A = F \\cdot s \\cdot \\cos\\alpha, \\quad A = \\Delta E_k",
          },
          {
            number: 2,
            title: "Потужність (середня та миттєва)",
            latex: "P_{сер} = \\frac{A}{t}, \\quad P_{мит} = F \\cdot v \\cdot \\cos\\alpha",
          },
          {
            number: 3,
            title: "Коефіцієнт корисної дії (ККД)",
            latex: "\\eta = \\frac{A_{кор}}{A_{зат}} \\cdot 100\\%",
          },
          {
            number: 4,
            title: "Енергія тіл",
            latex: [
              "E_k = \\frac{mv^2}{2} \\quad (\\text{Кінетична})",
              "E_p = mgh \\quad (\\text{Потенціальна тяжіння})",
              "E_{пр} = \\frac{kx^2}{2} \\quad (\\text{Потенціальна пружини})",
              "E = E_k + E_p \\quad (\\text{Повна механічна})"
            ],
          },
          {
            number: 5,
            title: "Закон збереження енергії",
            latex: "E_{поч} = E_{кін}, \\quad E_1 = E_2 + A",
          },
          {
            number: 6,
            title: "Імпульс",
            latex: "\\vec{p} = m\\vec{v}, \\quad \\vec{F}\\Delta t = \\Delta\\vec{p}",
          },
          {
            number: 7,
            title: "Закон збереження імпульсу",
            latex: "m_1\\vec{v}_1 + m_2\\vec{v}_2 = m_1\\vec{v}_1' + m_2\\vec{v}_2'",
          },
          {
            number: 8,
            title: "Гідродинаміка та тиск",
            latex: [
              "p = \\frac{F}{S} \\quad (\\text{Тиск})",
              "p = \\rho gh \\quad (\\text{Тиск рідини})",
              "\\frac{F_2}{F_1} = \\frac{S_2}{S_1} \\quad (\\text{Гідравлічна машина})",
              "\\frac{h_1}{h_2} = \\frac{\\rho_2}{\\rho_1} \\quad (\\text{Сполучені посудини})",
              "S_1 v_1 = S_2 v_2 \\quad (\\text{Рівняння неперервності})",
              "p + \\frac{\\rho v^2}{2} + \\rho gh = const \\quad (\\text{Рівняння Бернуллі})"
            ],
          },
    ] satisfies ConservationsFormula[],
  };