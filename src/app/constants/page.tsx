"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlockMath } from "react-katex";
import {
  PHYSICAL_CONSTANTS,
  CONSTANT_CATEGORIES,
  type PhysicalConstant,
} from "@/data/constantsData";

function FormulaBlock({ latex }: { latex: string }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
      <BlockMath math={latex} />
    </div>
  );
}

function ConstantCard({ constant }: { constant: PhysicalConstant }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="font-semibold text-gray-900 dark:text-gray-100">{constant.name}</span>
        <span className="font-mono text-blue-700 dark:text-blue-400">{constant.symbol}</span>
      </div>
      <p className="mb-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {constant.category} · {constant.unit}
      </p>
      <FormulaBlock latex={constant.latex} />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{constant.value}</p>
    </article>
  );
}

export default function ConstantsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Усі");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHYSICAL_CONSTANTS.filter((c) => {
      if (activeCategory !== "Усі" && c.category !== activeCategory) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.value.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, query]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="no-print mb-8 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Назад до розділів
      </Link>

      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        Фізичні сталі
      </h1>

      <div className="mb-6 space-y-3">
        <nav
          className="no-print flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          aria-label="Фільтр за категоріями"
        >
          {["Усі", ...CONSTANT_CATEGORIES].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук за назвою, символом або значенням…"
          className="no-print w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white px-5 py-8 text-center text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          Нічого не знайдено.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((constant) => (
            <ConstantCard key={constant.name} constant={constant} />
          ))}
        </div>
      )}
    </main>
  );
}
