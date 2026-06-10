export type TermoDynamicsTabId = "theory" | "laws" | "formulas";

export type TermoDynamicsTab = {
    id: TermoDynamicsTabId;
    label: string;
};

export type TermoDynamicsDefinition = {
    number: number;
    term: string;
    description: string;
  };
  
export type TermoDynamicsLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
};
  
export type TermoDynamicsFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const TERMODYNAMICS_TABS: TermoDynamicsTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони" },
    { id: "formulas", label: "Формули" },
];

export const termoDynamicsData = {
    theory: [
      {
        number: 1,
        term: "Коливання",
        description:
          "рухи, які повторюються через певні інтервали часу",
      },
    ] satisfies TermoDynamicsDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Ізотермічний процес",
        description: "Процес при сталій температурі (T = const). Закон Бойля-Маріотта: добуток тиску на об'єм є величиною сталою.",
        latex: "p_1 V_1 = p_2 V_2",
        note: "Вчений: Бойль-Маріотт. При збільшенні тиску об'єм зменшується.",
        imageFile: "izoterma.png"
      },
    ] satisfies TermoDynamicsLaw[],
  
    formulas: [
        {
            number: 1,
            title: "Кількість речовини",
            latex: [
              "\\nu = \\frac{m}{M} \\quad (\\text{через масу})",
              "\\nu = \\frac{N}{N_A} \\quad (\\text{через кількість частинок})"
            ],
          },
    ] satisfies TermoDynamicsFormula[],
  };