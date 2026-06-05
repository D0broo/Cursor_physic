import Link from "next/link";
import { PHYSICS_SECTIONS } from "@/data/physics-sections";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Енциклопедія фізики
        </h1>
        <p className="mt-3 text-gray-600">
          Оберіть розділ, щоб дізнатися більше
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {PHYSICS_SECTIONS.map((section) => (
          <li key={section.slug}>
            <Link
              href={`/physics/${section.slug}`}
              className="block rounded-xl border border-gray-200 bg-white px-5 py-4 font-medium shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
