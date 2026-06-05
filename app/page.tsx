"use client";

import { useState } from "react";

const BACKGROUND_COLORS = [
  "#f0f9ff",
  "#fef3c7",
  "#dcfce7",
  "#fce7f3",
  "#ede9fe",
  "#ffedd5",
];

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);

  const handleChangeColor = () => {
    setColorIndex((prev) => (prev + 1) % BACKGROUND_COLORS.length);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 transition-colors duration-500"
      style={{ backgroundColor: BACKGROUND_COLORS[colorIndex] }}
    >
      <h1 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Вітаю в моєму Full-stack проєкті
      </h1>

      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        <p className="mb-6 text-center text-gray-600">
          Натисніть кнопку нижче, щоб змінити колір фону сторінки.
        </p>
        <button
          type="button"
          onClick={handleChangeColor}
          className="w-full rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-[0.98]"
        >
          пупупуіііііsss
        </button>
      </div>
    </main>
  );
}
