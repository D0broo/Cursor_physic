

export type MagnitnepoleTabId = "theory" | "laws" | "formulas";

export type MagnitnepoleTab = {
    id: MagnitnepoleTabId;
    label: string;
};

export type MagnitnepoleDefinition = {
    number?: number;
    term: string;
    description?: string;
    isHeader?: boolean;
  };
  
export type MagnitnepoleLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
    imageFile?: string;
};
  
export type MagnitnepoleFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const MAGNITNEPOLE_TABS: MagnitnepoleTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони" },
    { id: "formulas", label: "Формули" },
];

export const magnitnepoleData = {
    theory: [
        { term: "Загальні поняття", isHeader: true },
        {
            number: 1,
            term: "Електричний струм",
            description: "напрямлений (упорядкований) рух заряджених частинок. Напрям струму прийнято від позитивного полюса (+) до негативного (-). Дії струму: завжди — магнітна й теплова; рідко — хімічна й світлова.",
        },
    ] satisfies MagnitnepoleDefinition[],
  
    laws: [
        {
            number: 1,
            title: "I закон електролізу (закон Фарадея)",
            description: "Маса речовини, яка виділяється на електроді, прямо пропорційна заряду, що пройшов через електроліт.",
            latex: "m = k q = k I t",
            note: "k — електрохімічний еквівалент речовини.",
        },
    ] satisfies MagnitnepoleLaw[],
  
    formulas: [
        {
            number: 1,
            title: "Сила струму та заряд",
            latex: [
              "q = I t \\quad (1 \\text{ Кл} = 1 \\text{ А} \\cdot 1 \\text{ с})",
              "I = \\frac{q}{t} \\quad (\\text{Сила струму})",
              "I = q_0 n v S \\quad (\\text{через швидкість частинок})"
            ],
          },
    ] satisfies MagnitnepoleFormula[],
  };