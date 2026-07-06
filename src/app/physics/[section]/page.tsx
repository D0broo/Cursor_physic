import Link from "next/link";
import { notFound } from "next/navigation";
import DynamicsTabs from "@/components/DynamicsTabs";
import KinematicsTabs from "@/components/KinematicsTabs";
import { getSectionBySlug, PHYSICS_SECTIONS } from "@/data/physics-sections";
import ConservationsTabs from "@/components/ConservationLawsTabs";
import MechanicalVibrationsTabs from "@/components/MechanicalVibrationsTabs";
import MolecularyTabs from "@/components/MolecularyTabs";
import TermoDynamicsTabs from "@/components/TermoDynamicTabs";
import PropertiesBodiesTabs from "@/components/PropertiesBodiesTabs";
import PostiyniyStrumTabs from "@/components/PostiyniyStrumTabs";
import StrumSeredovichaTabs from "@/components/StrumSeredovichaTabs";
import MagnitnepoleTabs from "@/components/MagnitnepoleTabs";
import MagnitnivibrationsTabs from "@/components/MagnitnivibrationsTabs";
import ElectrostaticsTabs from "@/components/ElectrostaticsTabs";
import GeomOpticaTabs from "@/components/GeomOpticaTabs";
import WaveOpticaTabs from "@/components/WaveOpticaTabs";
import QuantumOpticaTabs from "@/components/QuantumOpticaTabs";
import AtomNucleusTabs from "@/components/AtomNucleusTabs";
import NucleusPhysicsTabs from "@/components/NuclearPhysicsTabs";
import FavoriteButton from "@/components/FavoriteButton";
import PrintButton from "@/components/PrintButton";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return PHYSICS_SECTIONS.map((section) => ({
    section: section.slug,
  }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: slug } = await params;
  const section = getSectionBySlug(slug);

  if (!section) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="no-print mb-8 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Назад до розділів
      </Link>

      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {section.title}
        </h1>
        <div className="no-print flex shrink-0 items-center gap-2">
          <FavoriteButton
            favorite={{
              title: section.title,
              href: `/physics/${section.slug}`,
              sectionTitle: section.title,
            }}
          />
          <PrintButton />
        </div>
      </div>

      {slug === "kinematics" ? (
        <KinematicsTabs />
      ) : slug === "dynamics" ? (
        <DynamicsTabs />
      ) : slug === "conservation-laws" ? (
        <ConservationsTabs />
      ) : slug === "mechanical-vibrations" ? (
        <MechanicalVibrationsTabs />
      ) : slug === "moleculare" ? (
        <MolecularyTabs />
      ) : slug === "thermodynamics" ? (
        <TermoDynamicsTabs />
      ) : slug === "propertiesbodies" ? (
        <PropertiesBodiesTabs />
      ) : slug === "postiyniystrum" ? (
        <PostiyniyStrumTabs />
      ) : slug === "strumvriznichseredovischach" ? (
        <StrumSeredovichaTabs />
      ) : slug === "margnitnepole" ? (
        <MagnitnepoleTabs />
      ) : slug === "mangintnivibrations" ? (
        <MagnitnivibrationsTabs />
      ) : slug === "electrostatycs" ? (
        <ElectrostaticsTabs />
      ) : slug === "optics-geometric" ? (
        <GeomOpticaTabs />
      ) : slug === "optics-wave" ? (
        <WaveOpticaTabs />
      ) : slug === "quantum-light" ? (
        <QuantumOpticaTabs />
      ) : slug === "atomic-nucleus" ? (
        <AtomNucleusTabs />
      ) : slug === "nuclear-physics" ? (
        <NucleusPhysicsTabs />
      ) : (
        <p className="text-gray-600">
          Сторінка розділу «{section.title}» — тут з&apos;явиться зміст
          енциклопедії.
        </p>
      )}
    </main>
  );
}
