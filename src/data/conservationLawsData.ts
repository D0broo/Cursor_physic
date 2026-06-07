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
        term: "Динаміка",
        description:
          "розділ механіки, в якому вивчаються причини виникнення механічного руху",
      },
      
    ] satisfies ConservationsDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Перший закон Ньютона (закон інерції)",
        description:
          "існують такі системи відліку, відносно яких тіло зберігає стан спокою або рівномірного прямолінійного руху, якщо на тіло не діють жодні сили або якщо дія цих сил скомпенсована"
      },
    ] satisfies ConservationsLaw[],
  
    formulas: [
      {
        number: 1,
        title: "Прискорення",
        latex: "a = \\frac{v - v_0}{t} = \\frac{\\Delta v}{\\Delta t}",
      },
    ] satisfies ConservationsFormula[],
  };