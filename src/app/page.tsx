import Link from "next/link";
import { PHYSICS_CATEGORIES, PHYSICS_SECTIONS } from "@/data/physics-sections";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Енциклопедія фізики
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Ваш інтерактивний довідник з основних розділів фізики
        </p>
      </header>

      <div className="space-y-12">
        {PHYSICS_CATEGORIES.map((category) => (
          <section key={category.title}>
            <h2 className="mb-6 text-2xl font-bold text-gray-800 border-b pb-2">
              {category.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {category.sections.map((slug) => {
                const section = PHYSICS_SECTIONS.find((s) => s.slug === slug);
                if (!section) return null;
                return (
                  <Link
                    key={section.slug}
                    href={`/physics/${section.slug}`}
                    className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900 group-hover:text-blue-700">
                        {section.title}
                      </span>
                      <svg
                        className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
