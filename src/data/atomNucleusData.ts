
export type AtomNucleusTabId = "theory" | "laws" | "formulas";

export type AtomNucleusTab = {
    id: AtomNucleusTabId;
    label: string;
};

export type AtomNucleusDefinition = {
    number?: number;
    term: string;
    description?: string;
    isHeader?: boolean;
    imageFile?: string;
  };
  
export type AtomNucleusLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
    imageFile?: string;
};
  
export type AtomNucleusFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const ATOMNUCLEUS_TABS: AtomNucleusTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони, правила та досліди" },
    { id: "formulas", label: "Формули" },
];

export const atomNucleusData = {
    theory: [
        {
            number: 1,
            term: "Планетарна модель Резерфорда",
            description: "Атом складається з позитивно зарядженого масивного ядра, навколо якого по замкнених орбітах рухаються електрони.",
        },
        {
            number: 2,
            term: "Склад атомного ядра",
            description: "Ядро складається з нуклонів — протонів (позитивно заряджених частинок) та нейтронів (частинок без заряду).",
        },
        {
            number: 3,
            term: "Характеристики ядра",
            description: "Z — зарядове число (кількість протонів, що дорівнює порядковому номеру елемента); N — кількість нейтронів; A — масове число (загальна кількість нуклонів, A = Z + N).",
        },
        {
            number: 4,
            term: "Ізотопи",
            description: "Атоми одного й того самого хімічного елемента, ядра яких містять однакову кількість протонів (Z), але різну кількість нейтронів (N).",
        },
    ] as AtomNucleusDefinition[],
  
    laws: [
        {
            number: 1,
            title: "Перший постулат Бора (стаціонарних станів)",
            description: "Атом може перебувати лише в особливих стаціонарних (квантових) енергетичних станах, у яких він не випромінює і не поглинає енергію.",
        },
        {
            number: 2,
            title: "Другий постулат Бора (правило частот)",
            description: "При переході атома з одного стаціонарного стану з енергією En в інший з енергією Em випромінюється або поглинається квант світла (фотон) з енергією, що дорівнює різниці цих енергій.",
        },
    ] as AtomNucleusLaw[],
  
    formulas: [
        {
            number: 1,
            title: "Формула Рідберга (частота випромінювання)",
            latex: "\\nu_{n,k} = R \\left( \\frac{1}{k^2} - \\frac{1}{n^2} \\right)"
        },
        {
            number: 2,
            title: "Правило частот Бора (енергія випроміненого або поглинутого кванта)",
            latex: "h\\nu = E_m - E_n"
        },
        {
            number: 3,
            title: "Правило квантування орбіт (постулат Бора)",
            latex: "m_e v r = n \\frac{h}{2\\pi}"
        }
    ] as AtomNucleusFormula[]
};
