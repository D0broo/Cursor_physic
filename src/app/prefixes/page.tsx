import Link from "next/link";
import { BlockMath } from "react-katex";
import { SI_PREFIX_GROUPS } from "@/data/prefixesData";

export default function PrefixesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Назад до розділів
      </Link>

      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Пристави SI
      </h1>
      <p className="mb-8 text-gray-600">
        Префікси для утворення кратних та дольних одиниць.
      </p>

      <div className="space-y-10">
        {SI_PREFIX_GROUPS.map((group) => (
          <section key={group.label}>
            <h2 className="mb-4 border-b-2 border-blue-100 pb-1 text-lg font-bold uppercase tracking-wide text-blue-700">
              {group.label}
            </h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Пристава</th>
                    <th className="px-4 py-3 font-semibold">Позначення</th>
                    <th className="px-4 py-3 font-semibold">Множник</th>
                    <th className="px-4 py-3 font-semibold">Ступінь</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {group.prefixes.map((prefix) => (
                    <tr key={prefix.name}>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {prefix.name}
                      </td>
                      <td className="px-4 py-3 font-mono text-blue-700">
                        {prefix.symbol}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {prefix.factor}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        <BlockMath math={prefix.latex} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
