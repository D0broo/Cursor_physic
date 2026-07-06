"use client";

import Link from "next/link";
import { useFavorites } from "@/components/useFavorites";

export default function FavoritesPage() {
  const { favorites, removeFavorite, mounted } = useFavorites();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="no-print mb-8 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Назад до розділів
      </Link>

      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Обране
      </h1>

      {!mounted ? null : favorites.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            Тут з&apos;являться позначені формула, терміни та закони.
          </p>
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
            Натискайте на зірочку біля елемента, щоб зберегти його.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {favorites.map((fav) => (
            <li
              key={fav.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <Link
                href={fav.href}
                className="min-w-0 flex-1"
              >
                <span className="block font-medium text-gray-900 dark:text-gray-100">
                  {fav.title}
                </span>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {fav.sectionTitle}
                </span>
              </Link>
              <button
                type="button"
                aria-label="Видалити з обраного"
                onClick={() => removeFavorite(fav.id)}
                className="no-print shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
