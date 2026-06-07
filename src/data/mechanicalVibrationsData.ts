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
        term: "Замкнута система тіл (ізольована)",
        description:
          "це така система тіл, на яку не діють зовнішні сили, а будь-які зміни стану системи є результатом дії внутрішніх сил",
      },
    ] satisfies MechanicalVibrationsDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Закон збереження енергії",
        description:
          "у замкненій системі тіл, які взаємодіють тільки з консервативними силами, повна механічна енергія залишається незмінною (зберігається)",
      },
    ] satisfies MechanicalVibrationsLaw[],
  
    formulas: [
          {
            number: 1,
            title: "Робота сили",
            latex: "A = F \\cdot s \\cdot \\cos\\alpha, \\quad A = \\Delta E_k",
          },
    ] satisfies MechanicalVibrationsFormula[],
  };