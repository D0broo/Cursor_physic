"use client";

import { useCallback, useEffect, useState } from "react";

export type Favorite = {
  id: string;
  title: string;
  href: string;
  sectionTitle: string;
};

const STORAGE_KEY = "favorites";

function readFavorites(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Favorite[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setMounted(true);
  }, []);

  const write = useCallback((next: Favorite[]) => {
    setFavorites(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (fav: Favorite) => {
      const next = favorites.some((f) => f.id === fav.id)
        ? favorites.filter((f) => f.id !== fav.id)
        : [...favorites, fav];
      write(next);
    },
    [favorites, write]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      write(favorites.filter((f) => f.id !== id));
    },
    [favorites, write]
  );

  return { favorites, isFavorite, toggleFavorite, removeFavorite, mounted };
}
