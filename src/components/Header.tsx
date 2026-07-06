"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Розділи" },
  { href: "/formules", label: "Формули" },
  { href: "/units", label: "Одиниці" },
  { href: "/constants", label: "Сталі" },
  { href: "/prefixes", label: "Пристави" },
  { href: "/favorites", label: "Обране" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold text-gray-900 dark:text-gray-100"
        >
          <span className="text-blue-600 dark:text-blue-400">Ф</span>ізика
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
