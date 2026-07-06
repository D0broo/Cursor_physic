import { PHYSICS_SECTIONS } from "./physics-sections";
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

export type SearchResultType = "Термін" | "Закон" | "Формула";

export type SearchResult = {
  type: SearchResultType;
  title: string;
  snippet: string;
  sectionSlug: string;
  sectionTitle: string;
};

type SearchableData = {
  theory?: { term: string; description?: string; isHeader?: boolean }[];
  laws?: { title: string; description: string; latex?: string | string[] }[];
  formulas?: { title: string; latex: string | string[] }[];
};

const DATA_BY_SLUG: Record<string, SearchableData> = {
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

const SECTION_TITLE_BY_SLUG: Record<string, string> = Object.fromEntries(
  PHYSICS_SECTIONS.map((s) => [s.slug, s.title])
);

function latexToString(latex: string | string[]): string {
  return Array.isArray(latex) ? latex.join(" ") : latex;
}

export const SEARCH_INDEX: SearchResult[] = [];

for (const section of PHYSICS_SECTIONS) {
  const data = DATA_BY_SLUG[section.slug];
  if (!data) continue;
  const sectionTitle = SECTION_TITLE_BY_SLUG[section.slug] ?? section.title;

  if (data.theory) {
    for (const item of data.theory) {
      if (item.isHeader || !item.term) continue;
      SEARCH_INDEX.push({
        type: "Термін",
        title: item.term,
        snippet: item.description ?? "",
        sectionSlug: section.slug,
        sectionTitle,
      });
    }
  }

  if (data.laws) {
    for (const law of data.laws) {
      const snippet = law.description + (law.latex ? ` ${latexToString(law.latex)}` : "");
      SEARCH_INDEX.push({
        type: "Закон",
        title: law.title,
        snippet,
        sectionSlug: section.slug,
        sectionTitle,
      });
    }
  }

  if (data.formulas) {
    for (const formula of data.formulas) {
      SEARCH_INDEX.push({
        type: "Формула",
        title: formula.title,
        snippet: latexToString(formula.latex),
        sectionSlug: section.slug,
        sectionTitle,
      });
    }
  }
}
