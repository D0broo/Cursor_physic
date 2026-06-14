
export type MagnitnivibrationsTabId = "theory" | "laws" | "formulas";

export type MagnitnivibrationsTab = {
    id: MagnitnivibrationsTabId;
    label: string;
};

export type MagnitnivibrationsDefinition = {
    number?: number;
    term: string;
    description?: string;
    isHeader?: boolean;
  };
  
export type MagnitnivibrationsLaw = {
    number: number;
    title: string;
    description: string;
    latex?: string;
    note?: string;
    imageQuery?: string;
    imageFile?: string;
};
  
export type MagnitnivibrationsFormula = {
    number: number;
    title: string;
    latex: string | string[];
};

export const MAGNITNIVIBRATIONS_TABS: MagnitnivibrationsTab[] = [
    { id: "theory", label: "Теорія" },
    { id: "laws", label: "Закони, правила та досліди" },
    { id: "formulas", label: "Формули" },
];

export const magnitnivibrationsData = {
    theory: [
        {
            number: 1,
            term: "Магнітне поле. Властивості",
            description: "Магнітне поле - форма матерії, яка існує навколо намагнічених тіл, провідників зі струмом та рухомих заряджених частинок і діє на них силою. Властивості: є матеріальним(існуючим); є складовою електромагнітного поля; створюють: намагнічені тіла, провідники зі струмом, рухомі заряджені частинки і тіла, змінне електричне поле; Діє силою на рухомі заряджені частинки, провідники зі струмом і магніти; Орієнтує магнітні стрілки та рамки зі струмом; Магнітить речовину.",
        },
    ] satisfies MagnitnivibrationsDefinition[],
  
    laws: [
        {
            number: 1,
            title: "Дослід Ерстеда. Дослід Ампера",
            description: "Дослід Ерстеда - У досліді Ерстеда показано, що провідник зі струмом створює навколо себе магнітне поле, яке відхиляє магнітну стрілку. Це довело зв’язок між електричними та магнітними явищами. Дослід Ампера - Дослід Ампера показав, що два провідники зі струмом взаємодіють: притягуються при однакових напрямках струму та відштовхуються при протилежних. Це підтвердило силову дію магнітного поля струму.",
        },
    ] satisfies MagnitnivibrationsLaw[],
  
    formulas: [
        {
            number: 1,
            title: "Сила Ампера",
            latex: "F_{\\text{А}} = I B l \\sin \\alpha"
        },
    ] satisfies MagnitnivibrationsFormula[],
};
