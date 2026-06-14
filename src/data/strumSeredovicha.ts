

export type StrumSeredovichaTabId = "theory" | "laws" | "formulas";

export type StrumSeredovichaTab = {
    id: StrumSeredovichaTabId;
    label: string;
};

export type StrumSeredovichaDefinition = {
    number: number;
    term: string;
    description: string;
  };
  
export type StrumSeredovichaLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
    imageFile?: string;
};
  
export type StrumSeredovichaFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const STRUMSEREDOVICHA_TABS: StrumSeredovichaTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони" },
    { id: "formulas", label: "Формули" },
];

export const strumSeredovichaData = {
    theory: [
        {
            number: 1,
            term: "Електричний струм та його напрямок",
            description: "Електричний струм — процес напрямленого руху заряджених частинок. За традиційний напрямок струму прийнято напрямок руху позитивних зарядів.",
          },
    ] satisfies StrumSeredovichaDefinition[],
  
    laws: [
        {
            number: 1,
            title: "Закон Ома для ділянки кола",
            description: "Сила струму в ділянці кола прямо пропорційна напрузі на кінцях цієї ділянки та обернено пропорційна її електричному опору.",
            latex: "I = \\frac{U}{R}",
            note: "1 Ом = 1 В / 1 А. Опір в 1 Ом має такий провідник, у якому за напруги 1 В протікає струм силою 1 А.",
            imageFile: "zakonoma.png"
          },
    ] satisfies StrumSeredovichaLaw[],
  
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
    ] satisfies StrumSeredovichaFormula[],
  };