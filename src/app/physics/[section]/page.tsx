import Link from "next/link";
import { notFound } from "next/navigation";
import DynamicsTabs from "@/components/DynamicsTabs";
import KinematicsTabs from "@/components/KinematicsTabs";
import { getSectionBySlug, PHYSICS_SECTIONS } from "@/data/physics-sections";
import ConservationsTabs from "@/components/ConservationLawsTabs";
import MechanicalVibrationsTabs from "@/components/MechanicalVibrationsTabs";
import MolecularyTabs from "@/components/MolecularyTabs";

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
        className="mb-8 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Назад до розділів
      </Link>

      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        {section.title}
      </h1>

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
      ) : (
        <p className="text-gray-600">
          Сторінка розділу «{section.title}» — тут з&apos;явиться зміст
          енциклопедії.
        </p>
      )}
    </main>
  );
}
