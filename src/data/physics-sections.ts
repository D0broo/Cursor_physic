export type PhysicsSection = {
  slug: string;
  title: string;
};

export type PhysicsCategory = {
  title: string;
  sections: string[]; // array of slugs
};

export const PHYSICS_SECTIONS: PhysicsSection[] = [
  { slug: "kinematics", title: "Кінематика" },
  { slug: "dynamics", title: "Динаміка" },
  { slug: "conservation-laws", title: "Закони збереження" },
  { slug: "moleculare", title: "Основи молекулярної-кінетичної теорії" },
  { slug: "thermodynamics", title: "Основи термодинаміки" },
  { slug: "propertiesbodies", title: "Властивості газів, рідин і твердих тіл" },
  { slug: "electrostatycs", title: "Основи електростатики" },
  { slug: "postiyniystrum", title: "Постійний струм" },
  { slug: "margnitnepole", title: "Магнітне поле, електромагнітна індукція" },
  { slug: "strumvriznichseredovischach", title: "Електричний струм у різних середовищах" },
  { slug: "mechanical-vibrations", title: "Механічні коливання і хвилі" },
  { slug: "mangintnivibrations", title: "Електромагнітні коливання і хвилі" },
  { slug: "optics-geometric", title: "Геометрична оптика" },
  { slug: "optics-wave", title: "Хвильова оптика" },
  { slug: "quantum-light", title: "Світлові кванти" },
  { slug: "atomic-nucleus", title: "Атом та атомне ядро" },
  { slug: "nuclear-physics", title: "Ядерна фізика" },
];

export const PHYSICS_CATEGORIES: PhysicsCategory[] = [
  {
    title: "Механіка",
    sections: ["kinematics", "dynamics", "conservation-laws"],
  },
  {
    title: "Молекулярна фізика і термодинаміка",
    sections: ["moleculare", "thermodynamics", "propertiesbodies"],
  },
  {
    title: "Електродинаміка",
    sections: ["electrostatycs", "postiyniystrum", "margnitnepole", "strumvriznichseredovischach"],
  },
  {
    title: "Коливання і хвилі",
    sections: ["mechanical-vibrations", "mangintnivibrations"],
  },
  {
    title: "Оптика",
    sections: ["optics-geometric", "optics-wave"],
  },
  {
    title: "Квантова фізика",
    sections: ["quantum-light"],
  },
  {
    title: "Атомна і Ядерна фізика",
    sections: ["atomic-nucleus", "nuclear-physics"],
  },
];

export function getSectionBySlug(slug: string): PhysicsSection | undefined {
  return PHYSICS_SECTIONS.find((section) => section.slug === slug);
}
