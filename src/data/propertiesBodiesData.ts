export type PropertiesBodiesTabId = "theory" | "laws" | "formulas";

export type PropertiesBodiesTab = {
    id: PropertiesBodiesTabId;
    label: string;
};

export type PropertiesBodiesDefinition = {
    number: number;
    term: string;
    description: string;
  };
  
export type PropertiesBodiesLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
};
  
export type PropertiesBodiesFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const PROPERTIESBODIES_TABS: PropertiesBodiesTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони" },
    { id: "formulas", label: "Формули" },
];

export const propertiesBodiessData = {
    theory: [
      {
        number: 1,
        term: "Термодинаміка",
        description: "розділ фізики, що вивчає співвідношення і перетворення теплової та інших форм енергії.",
      },
    ] satisfies PropertiesBodiesDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Перший закон термодинаміки",
        description: "Зміна внутрішньої енергії системи дорівнює сумі виконаної над системою роботи та кількості отриманої теплоти. Це закон збереження енергії для теплових процесів.",
        latex: "\\pm Q = \\pm \\Delta U \\pm A",
        note: "Вчений: Майєр, Джоуль, Гельмгольц. Енергія не виникає з нічого і не зникає безслідно.",
      },
    ] satisfies PropertiesBodiesLaw[],
  
    formulas: [
      {
        number: 7,
        title: "Внутрішня енергія",
        latex: [
          "U = \\frac{3}{2} \\frac{m}{M} RT \\quad (\\text{одноатомний газ})",
          "\\Delta U = \\frac{3}{2} \\frac{m}{M} R \\Delta T \\quad (\\text{зміна енергії})"
        ],
      },
    ] satisfies PropertiesBodiesFormula[],
  };