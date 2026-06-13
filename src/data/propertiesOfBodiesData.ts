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

export const propertiesBodiesData = {
    theory: [
      {
        number: 1,
        term: "Коливання",
        description:
          "рухи, які повторюються через певні інтервали часу",
      },
    ] satisfies PropertiesBodiesDefinition[],
  
    laws: [
      {
        number: 1,
        title: "Ізотермічний процес",
        description: "Процес при сталій температурі (T = const). Закон Бойля-Маріотта: добуток тиску на об'єм є величиною сталою.",
        latex: "p_1 V_1 = p_2 V_2",
        note: "Вчений: Бойль-Маріотт. При збільшенні тиску об'єм зменшується.",
        imageFile: "izoterma.png"
      },
    ] satisfies PropertiesBodiesLaw[],
  
    formulas: [
        {
            number: 1,
            title: "Кількість речовини",
            latex: [
              "\\nu = \\frac{m}{M} \\quad (\\text{через масу})",
              "\\nu = \\frac{N}{N_A} \\quad (\\text{через кількість частинок})"
            ],
          },
    ] satisfies PropertiesBodiesFormula[],
  };