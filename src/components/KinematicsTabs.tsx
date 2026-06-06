"use client";

import { useState, type ReactNode } from "react";
import { BlockMath } from "react-katex";
import {
  advancedTheory,
  KINEMATICS_TABS,
  kinematicsData,
  type KinematicsGraph,
  type KinematicsTabId,
} from "@/data/kinematicsData";

function FormulaBlock({ latex }: { latex: string }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
      <BlockMath math={latex} />
    </div>
  );
}

function MotionGraph({ graph }: { graph: KinematicsGraph }) {
  const paths: Record<KinematicsGraph["shape"], string> = {
    "linear-up": "M 40 150 L 260 40",
    horizontal: "M 40 95 L 260 95",
    "linear-through-origin": "M 40 150 L 260 40",
    "parabola-up": "M 40 150 Q 150 150 260 40",
  };

  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
      <svg viewBox="0 0 300 180" className="mx-auto h-44 w-full max-w-sm">
        <line x1="40" y1="150" x2="260" y2="150" stroke="#94a3b8" strokeWidth="2" />
        <line x1="40" y1="150" x2="40" y2="30" stroke="#94a3b8" strokeWidth="2" />
        <path
          d={paths[graph.shape]}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="250" y="170" className="fill-slate-500 text-[12px]">
          {graph.xAxis}
        </text>
        <text x="12" y="40" className="fill-slate-500 text-[12px]">
          {graph.yAxis}
        </text>
      </svg>
    </div>
  );
}

function TheoryPanel() {
  return (
    <ol className="space-y-3">
      {kinematicsData.theory.map((item, index) => (
        <li
          key={item.term}
          className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
        >
          <span className="mr-2 font-mono text-sm text-gray-400">
            {index + 1}.
          </span>
          <span className="font-semibold text-gray-900">{item.term}</span>
          <span className="text-gray-400"> — </span>
          <span className="text-gray-700">{item.description}</span>
        </li>
      ))}
    </ol>
  );
}

function GraphsPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {kinematicsData.graphs.map((graph) => (
        <article
          key={graph.id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {graph.motionType}
          </span>
          <h3 className="mb-3 font-semibold text-gray-900">{graph.title}</h3>
          <MotionGraph graph={graph} />
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {graph.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function FormulasPanel() {
  return (
    <ol className="space-y-3">
      {kinematicsData.formulas.map((formula, index) => (
        <li
          key={formula.title}
          className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
        >
          <p className="mb-3">
            <span className="mr-2 font-mono text-sm text-gray-400">
              {index + 1}.
            </span>
            <span className="font-medium text-gray-900">{formula.title}</span>
          </p>
          {Array.isArray(formula.latex) ? (
            <div className="space-y-2">
              {formula.latex.map((expression) => (
                <FormulaBlock key={expression} latex={expression} />
              ))}
            </div>
          ) : (
            <FormulaBlock latex={formula.latex} />
          )}
        </li>
      ))}
    </ol>
  );
}

function AdvancedTheoryPanel() {
  const { transmissions, circularMotion } = advancedTheory;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Механічні передачі
        </h2>
        <ul className="space-y-3">
          {transmissions.map((transmission) => (
            <li
              key={transmission.name}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
            >
              <h3 className="font-medium text-gray-900">{transmission.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{transmission.desc}</p>
              <img
                src={`/images/${transmission.imageFile}`} // <-- Використовуємо imageFile
                alt={transmission.name}
                className="mt-3 h-40 w-full rounded-lg object-contain bg-slate-50"
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          Обертальний рух
        </h2>
        <p className="text-sm text-gray-500">{circularMotion.title}</p>
        <img
                src={`/images/${circularMotion.imageFile}`} // <-- Використовуємо imageFile
                alt={circularMotion.title}
                className="mt-3 h-40 w-full rounded-lg object-contain bg-slate-50"
        />
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-slate-50">
                <th className="px-4 py-3 font-medium text-gray-700">Поняття</th>
                <th className="px-4 py-3 font-medium text-gray-700">Формула</th>
                <th className="px-4 py-3 font-medium text-gray-700">Опис</th>
              </tr>
            </thead>
            <tbody>
              {circularMotion.concepts.map((concept) => (
                <tr
                  key={concept.name}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {concept.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="overflow-x-auto">
                      <BlockMath math={concept.formula} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{concept.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ExamplesPanel() {
  return (
    <div className="space-y-4">
      {kinematicsData.examples.map((example, index) => (
        <article
          key={example.title}
          className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
        >
          <h3 className="mb-2 font-semibold text-gray-900">
            Задача {index + 1}. {example.title}
          </h3>
          <p className="mb-4 text-gray-700">{example.condition}</p>
          <div className="space-y-2 rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Розв&apos;язання
            </p>
            {example.steps.map((step) => (
              <FormulaBlock key={step} latex={step} />
            ))}
          </div>
          <p className="mt-3 text-sm font-medium text-blue-700">
            Відповідь: {example.answer}
          </p>
        </article>
      ))}
    </div>
  );
}

const TAB_PANELS: Record<KinematicsTabId, () => ReactNode> = {
  theory: TheoryPanel,
  graphs: GraphsPanel,
  formulas: FormulasPanel,
  examples: ExamplesPanel,
  "advanced-theory": AdvancedTheoryPanel,
};

export default function KinematicsTabs() {
  const [activeTab, setActiveTab] = useState<KinematicsTabId>("theory");
  const ActivePanel = TAB_PANELS[activeTab];

  return (
    <div>
      <nav
        className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm"
        role="tablist"
        aria-label="Розділи кінематики"
      >
        {KINEMATICS_TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div role="tabpanel" key={activeTab}>
        <ActivePanel />
      </div>
    </div>
  );
}
