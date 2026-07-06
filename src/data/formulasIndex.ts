import { PHYSICS_CATEGORIES, PHYSICS_SECTIONS } from "./physics-sections";
import { kinematicsData } from "./kinematicsData";
import { dynamicsData } from "./dynamicsData";
import { conservationsData } from "./conservationLawsData";
import { molecularyData } from "./molecularyData";
import { termoDynamicsData } from "./termoDynamicsData";
import { propertiesBodiessData } from "./propertiesBodiesData";
import { electrostaticsData } from "./electrostaticsData";
import { postiyniyStrumData } from "./postiyniyStrumData";
import { magnitnepoleData } from "./magnitnepoleData";
import { strumSeredovichaData } from "./strumSeredovicha";
import { mechanicalvibrationsData } from "./mechanicalVibrationsData";
import { magnitnivibrationsData } from "./magnitnivibrationsData";
import { geomOpticaData } from "./geomOpticaData";
import { waveOpticaData } from "./waveOpticaData";
import { quantumOpticaData } from "./quantumOpticaData";
import { atomNucleusData } from "./atomNucleusData";
import { nucleusPhysicsData } from "./nuclearPhysicsData";

export type FormulaEntry = {
  title: string;
  latex: string | string[];
};

export type FormulaSection = {
  slug: string;
  title: string;
  category: string;
  formulas: FormulaEntry[];
};

const DATA_BY_SLUG: Record<string, { formulas: FormulaEntry[] }> = {
  kinematics: kinematicsData,
  dynamics: dynamicsData,
  "conservation-laws": conservationsData,
  moleculare: molecularyData,
  thermodynamics: termoDynamicsData,
  propertiesbodies: propertiesBodiessData,
  electrostatycs: electrostaticsData,
  postiyniystrum: postiyniyStrumData,
  margnitnepole: magnitnepoleData,
  strumvriznichseredovischach: strumSeredovichaData,
  "mechanical-vibrations": mechanicalvibrationsData,
  mangintnivibrations: magnitnivibrationsData,
  "optics-geometric": geomOpticaData,
  "optics-wave": waveOpticaData,
  "quantum-light": quantumOpticaData,
  "atomic-nucleus": atomNucleusData,
  "nuclear-physics": nucleusPhysicsData,
};

function categoryOf(slug: string): string {
  for (const category of PHYSICS_CATEGORIES) {
    if (category.sections.includes(slug)) return category.title;
  }
  return "Інше";
}

export const FORMULAS_BY_SECTION: FormulaSection[] = PHYSICS_SECTIONS.map(
  (section) => {
    const data = DATA_BY_SLUG[section.slug];
    return {
      slug: section.slug,
      title: section.title,
      category: categoryOf(section.slug),
      formulas: data ? data.formulas : [],
    };
  }
).filter((section) => section.formulas.length > 0);

export const FORMULA_CATEGORIES: string[] = Array.from(
  new Set(FORMULAS_BY_SECTION.map((s) => s.category))
);
