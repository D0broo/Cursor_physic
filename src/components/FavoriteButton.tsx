"use client";

import { useFavorites, type Favorite } from "./useFavorites";

type Props = {
  favorite: Omit<Favorite, "id"> & { id?: string };
};

export default function FavoriteButton({ favorite }: Props) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();

  const id = favorite.id ?? `${favorite.href}#${favorite.title}`;
  const fav: Favorite = { ...favorite, id };
  const active = isFavorite(id);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Додати в обране"
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white"
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={active ? "Видалити з обраного" : "Додати в обране"}
      onClick={() => toggleFavorite(fav)}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
        active
          ? "border-amber-300 bg-amber-100 text-amber-600 dark:border-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
          : "border-gray-200 bg-white text-gray-400 hover:bg-gray-100 hover:text-amber-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      }`}
    >
      <svg
        className="h-5 w-5"
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </button>
  );
}
