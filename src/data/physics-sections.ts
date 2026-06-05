export type PhysicsSection = {
  slug: string;
  title: string;
};

export const PHYSICS_SECTIONS: PhysicsSection[] = [
  { slug: "kinematics", title: "Кінематика" },
  { slug: "dynamics", title: "Динаміка" },
  { slug: "moleculare", title: "Молекулярна фізика" },
  { slug: "thermodynamics", title: "Термодинаміка" },
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
