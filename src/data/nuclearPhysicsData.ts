
export type NucleusPhysicsTabId = "theory" | "laws" | "formulas";

export type NucleusPhysicsTab = {
    id: NucleusPhysicsTabId;
    label: string;
};

export type NucleusPhysicsDefinition = {
    number?: number;
    term: string;
    description?: string;
    isHeader?: boolean;
    imageFile?: string;
  };
  
export type NucleusPhysicsLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
    imageFile?: string;
};
  
export type NucleusPhysicsFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const NUCLEUSPHYSICS_TABS: NucleusPhysicsTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони, правила та досліди" },
    { id: "formulas", label: "Формули" },
];

export const nucleusPhysicsData = {
    theory: [
        {
            number: 1,
            term: "Ядерні сили",
            description: "Сильні взаємодії, що утримують нуклони в ядрі. Вони є тільки силами притягання, є короткодіючими (діють на відстанях близько 10⁻¹⁵ м) та мають властивість насичення.",
        },
        {
            number: 2,
            term: "Дефект мас",
            description: "Різниця між сумою мас спокою всіх нуклонів, що входять до складу ядра, і масою самого ядра. Маса ядра завжди менша за суму мас його вільних нуклонів.",
        },
        {
            number: 3,
            term: "Енергія зв'язку ядра",
            description: "Енергія, яка необхідна для повного розщеплення ядра на окремі нуклони, або яка виділяється під час утворення ядра з вільних нуклонів.",
        },
        {
            number: 4,
            term: "Питома енергія зв'язку",
            description: "Енергія зв'язку, що припадає на один нуклон ядра. Вона характеризує міцність та стабільність ядра (максимальну мають елементи в середині таблиці Менделєєва, наприклад, Залізо).",
        },
        {
            number: 5,
            term: "Період напіврозпаду",
            description: "Час, протягом якого розпадається половина початкової кількості радіоактивних ядер.",
        },
        {
            number: 6,
            term: "Види радіоактивного випромінювання",
            description: "Альфа (α) — потік ядер Гелію (низька проникаюча здатність); Бета (β) — потік швидких електронів або позитронів (середня проникаюча здатність); Гамма (γ) — короткохвильове електромагнітне випромінювання (дуже висока проникаюча здатність).",
        },
        {
            number: 7,
            term: "Радіаційна безпека",
            description: "При роботі з джерелами іонізуючого випромінювання необхідно використовувати захисні екрани (свинець для γ-променів, плексиглас для β-частинок) та дотримуватися правила відстані й часу.",
        },
    ] as NucleusPhysicsDefinition[],
  
    laws: [
        {
            number: 1,
            title: "Закон збереження зарядового та масового числа",
            description: "У будь-якій ядерній реакції сума масових чисел (A) та сума зарядових чисел (Z) вихідних продуктів дорівнює сумі відповідних чисел продуктів реакції.",
        },
        {
            number: 2,
            title: "Правило зміщення Содді",
            description: "При α-розпаді елемент зміщується в періодичній системі на дві клітинки ліворуч, а при β-розпаді — на одну клітинку праворуч.",
        },
    ] as NucleusPhysicsLaw[],
  
    formulas: [
        {
            number: 1,
            title: "Масове число",
            latex: "A = Z + N"
        },
        {
            number: 2,
            title: "Дефект мас ядра",
            latex: "\\Delta m = [Z \\cdot m_p + (A - Z) \\cdot m_n] - m_{\\text{ядра}}"
        },
        {
            number: 3,
            title: "Енергія зв'язку ядра",
            latex: [
                "E_{\\text{зв}} = \\Delta m \\cdot c^2",
                "E_{\\text{зв}} = \\Delta m \\cdot 931,5 \\text{ МеВ}"
            ]
        },
        {
            number: 4,
            title: "Питома енергія зв'язку",
            latex: "f = \\frac{E_{\\text{зв}}}{A}"
        },
        {
            number: 5,
            title: "Основний закон радіоактивного розпаду",
            latex: "N = N_0 \\cdot 2^{-\\frac{t}{T_{1/2}}}"
        },
        {
            number: 6,
            title: "Активність радіоактивного джерела",
            latex: "A = \\lambda \\cdot N = \\frac{\\ln 2}{T_{1/2}} \\cdot N"
        },
        {
            number: 7,
            title: "Рівняння альфа-розпаду",
            latex: "{}_{Z}^{A}\\text{X} \\rightarrow {}_{Z-2}^{A-4}\\text{Y} + {}_{2}^{4}\\text{He}"
        },
        {
            number: 8,
            title: "Рівняння бета-мінус розпаду",
            latex: "{}_{Z}^{A}\\text{X} \\rightarrow {}_{Z+1}^{A}\\text{Y} + {}_{-1}^{0}\\text{e} + \\bar{\\nu}_e"
        },
        {
            number: 9,
            title: "Енергетичний вихід ядерної реакції",
            latex: "\\Delta E = \\Delta M \\cdot c^2 = (M_{\\text{вих}} - M_{\\text{прод}}) \\cdot c^2"
        },
        {
            number: 10,
            title: "Енергія ядерної реакції (через енергії зв'язку та кінетичні енергії)",
            latex: [
                "E = E_{\\text{зв}_B} + E_{\\text{зв}_b} - E_{\\text{зв}_A} - E_{\\text{зв}_a}",
                "E = E_{k_B} + E_{k_b} - E_{k_A} - E_{k_a}"
            ]
        },
        {
            number: 11,
            title: "Поглинута доза опромінення",
            latex: "D = \\frac{W}{m}"
        },
        {
            number: 12,
            title: "Еквівалентна доза опромінення",
            latex: "H = Dk"
        },
        {
            number: 13,
            title: "Потужність поглинутої дози",
            latex: "P = \\frac{D}{t}"
        }
    ] as NucleusPhysicsFormula[]
};
