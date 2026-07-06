import Link from "next/link";
import { BlockMath } from "react-katex";
import { BASE_UNITS, DERIVED_UNITS } from "@/data/unitsData";

function FormulaBlock({ latex }: { latex: string }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
      <BlockMath math={latex} />
    </div>
  );
}

export default function UnitsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="no-print mb-8 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Назад до розділів
      </Link>

      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        Одиниці вимірювання SI
      </h1>

      <section className="mb-12">
        <h2 className="mb-4 border-b-2 border-blue-100 pb-1 text-lg font-bold uppercase tracking-wide text-blue-700 dark:border-blue-900 dark:text-blue-400">
          Основні одиниці SI
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Величина</th>
                <th className="px-4 py-3 font-semibold">Назва</th>
                <th className="px-4 py-3 font-semibold">Позначення</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {BASE_UNITS.map((unit) => (
                <tr key={unit.name}>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{unit.quantity}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {unit.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-400">
                    {unit.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 border-b-2 border-blue-100 pb-1 text-lg font-bold uppercase tracking-wide text-blue-700 dark:border-blue-900 dark:text-blue-400">
          Похідні одиниці SI
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {DERIVED_UNITS.map((unit) => (
            <article
              key={unit.name}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {unit.name}
                  <span className="ml-2 font-mono text-blue-700 dark:text-blue-400">
                    {unit.symbol}
                  </span>
                </span>
              </div>
              <p className="mb-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {unit.quantity}
              </p>
              <FormulaBlock latex={unit.primary} />
              {unit.alternatives && unit.alternatives.length > 0 && (
                <div className="mt-2 space-y-2">
                  {unit.alternatives.map((alt) => (
                    <FormulaBlock key={alt} latex={alt} />
                  ))}
                </div>
              )}
              {unit.note && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{unit.note}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
