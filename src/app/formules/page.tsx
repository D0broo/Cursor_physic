"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlockMath } from "react-katex";
import {
  FORMULAS_BY_SECTION,
  FORMULA_CATEGORIES,
  type FormulaSection,
} from "@/data/formulasIndex";

function FormulaBlock({ latex }: { latex: string }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
      <BlockMath math={latex} />
    </div>
  );
}

function FormulaItem({
  index,
  title,
  latex,
}: {
  index: number;
  title: string;
  latex: string | string[];
}) {
  return (
    <li className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <p className="mb-3">
        <span className="mr-2 font-mono text-sm text-gray-400">{index}.</span>
        <span className="font-medium text-gray-900">{title}</span>
      </p>
      {Array.isArray(latex) ? (
        <div className="space-y-2">
          {latex.map((expression) => (
            <FormulaBlock key={expression} latex={expression} />
          ))}
        </div>
      ) : (
        <FormulaBlock latex={latex} />
      )}
    </li>
  );
}

function SectionBlock({ section, startIndex }: { section: FormulaSection; startIndex: number }) {
  return (
    <section>
      <h3 className="mb-3 mt-2 text-xl font-bold text-gray-800">
        {section.title}
      </h3>
      <ol className="space-y-3" start={startIndex}>
        {section.formulas.map((formula, i) => (
          <FormulaItem
            key={`${section.slug}-${i}`}
            index={startIndex + i}
            title={formula.title}
            latex={formula.latex}
          />
        ))}
      </ol>
    </section>
  );
}

export default function FormulasPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Усі");
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FORMULAS_BY_SECTION.filter((section) => {
      if (activeCategory !== "Усі" && section.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      return (
        section.title.toLowerCase().includes(q) ||
        section.formulas.some(
          (f) =>
            f.title.toLowerCase().includes(q) ||
            (Array.isArray(f.latex)
              ? f.latex.join(" ").toLowerCase().includes(q)
              : f.latex.toLowerCase().includes(q))
        )
      );
    });
  }, [activeCategory, query]);

  let runningIndex = 1;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Назад до розділів
      </Link>

      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Усі формули
      </h1>

      <div className="mb-6 space-y-3">
        <nav
          className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm"
          aria-label="Фільтр за категоріями"
        >
          {["Усі", ...FORMULA_CATEGORIES].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
          placeholder="Пошук за назвою або формулою…"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {filteredSections.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white px-5 py-8 text-center text-gray-500 shadow-sm">
          Нічого не знайдено.
        </p>
      ) : (
        <div className="space-y-10">
          {filteredSections.map((section) => {
            const startIndex = runningIndex;
            runningIndex += section.formulas.length;
            return (
              <SectionBlock
                key={section.slug}
                section={section}
                startIndex={startIndex}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
