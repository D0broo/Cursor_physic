import Link from "next/link";
import { notFound } from "next/navigation";
import { getSectionBySlug, PHYSICS_SECTIONS } from "@/data/physics-sections";

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

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {section.title}
      </h1>
      <p className="mt-4 text-gray-600">
        Сторінка розділу «{section.title}» — тут з&apos;явиться зміст енциклопедії.
      </p>
    </main>
  );
}
