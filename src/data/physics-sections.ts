export type PhysicsSection = {
  slug: string;
  title: string;
};

export const PHYSICS_SECTIONS: PhysicsSection[] = [
  { slug: "kinematics", title: "Кінематика" },
  { slug: "dynamics", title: "Динаміка" },
  { slug: "conservation-laws", title: "Закони збереження" },
  { slug: "mechanical-vibrations", title: "Механічні коливання і хвилі"},
  { slug: "moleculare", title: "Молекулярна фізика" },
  { slug: "thermodynamics", title: "Термодинаміка" },
  { slug: "propertiesbodies", title: "Властивості газів, рідин і твердих тіл"},
  { slug: "electrodynamics", title: "Електродинаміка" },
  { slug: "optics", title: "Оптика" },
  { slug: "quantum-mechanics", title: "Квантова механіка" },
  { slug: "atomic-physics", title: "Атомна фізика" },
  { slug: "nuclear-physics", title: "Ядерна фізика" },
  { slug: "relativity", title: "Теорія відносності" },
];

export function getSectionBySlug(slug: string): PhysicsSection | undefined {
  return PHYSICS_SECTIONS.find((section) => section.slug === slug);
}
