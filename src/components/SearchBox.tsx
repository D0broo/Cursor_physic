"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SEARCH_INDEX, type SearchResultType } from "@/data/searchIndex";

const TYPE_COLORS: Record<SearchResultType, string> = {
  "Термін": "bg-emerald-100 text-emerald-700",
  "Закон": "bg-amber-100 text-amber-700",
  "Формула": "bg-violet-100 text-violet-700",
};

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.snippet.toLowerCase().includes(q) ||
        r.sectionTitle.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук термінів, законів, формул…"
        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-base shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />

      {query.trim().length >= 2 && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {results.length === 0 ? (
            <p className="px-5 py-6 text-center text-sm text-gray-500">
              Нічого не знайдено.
            </p>
          ) : (
            <ul className="max-h-[28rem] divide-y divide-gray-100 overflow-y-auto">
              {results.map((r, i) => (
                <li key={i}>
                  <Link
                    href={`/physics/${r.sectionSlug}`}
                    className="flex flex-col gap-1 px-5 py-3 transition-colors hover:bg-blue-50"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[r.type]}`}
                      >
                        {r.type}
                      </span>
                      <span className="font-medium text-gray-900">{r.title}</span>
                    </div>
                    {r.snippet && (
                      <span className="line-clamp-2 text-sm text-gray-500">
                        {r.snippet}
                      </span>
                    )}
                    <span className="text-xs text-blue-600">
                      {r.sectionTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
