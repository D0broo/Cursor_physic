import { kinematicsData } from "@/data/kinematicsData";
import { dynamicsData } from "@/data/dynamicsData";
import { conservationsData } from "@/data/conservationLawsData";
import { molecularyData } from "@/data/molecularyData";
import { termoDynamicsData } from "@/data/termoDynamicsData";
import { propertiesBodiessData } from "@/data/propertiesBodiesData";
import { electrostaticsData } from "@/data/electrostaticsData";
import { postiyniyStrumData } from "@/data/postiyniyStrumData";
import { magnitnepoleData } from "@/data/magnitnepoleData";
import { strumSeredovichaData } from "@/data/strumSeredovicha";
import { mechanicalvibrationsData } from "@/data/mechanicalVibrationsData";
import { magnitnivibrationsData } from "@/data/magnitnivibrationsData";
import { geomOpticaData } from "@/data/geomOpticaData";
import { waveOpticaData } from "@/data/waveOpticaData";
import { quantumOpticaData } from "@/data/quantumOpticaData";
import { atomNucleusData } from "@/data/atomNucleusData";
import { nucleusPhysicsData } from "@/data/nuclearPhysicsData";
import { getSectionBySlug } from "@/data/physics-sections";

const SECTION_DATA: Record<string, unknown> = {
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

function valueToText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value
      .map((item) => valueToText(item))
      .filter(Boolean)
      .join("\n");
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return entries
      .map(([k, v]) => {
        const child = valueToText(v);
        if (!child) return "";
        if (child.includes("\n")) {
          return `${k}:\n${child}`;
        }
        return `${k}: ${child}`;
      })
      .filter(Boolean)
      .join("\n");
  }
  return String(value);
}

export function getSectionContext(slug: string | null | undefined): string {
  if (!slug) return "";
  const section = getSectionBySlug(slug);
  const data = SECTION_DATA[slug];
  if (!section || !data) return "";
  const body = valueToText(data);
  return `Розділ: ${section.title} (slug: ${slug})\n\n${body}`;
}

export function getSectionTitle(slug: string | null | undefined): string {
  if (!slug) return "";
  return getSectionBySlug(slug)?.title ?? "";
}

export function hasSectionData(slug: string | null | undefined): boolean {
  return !!slug && slug in SECTION_DATA;
}
