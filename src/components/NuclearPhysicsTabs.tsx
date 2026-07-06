"use client";

import { useState, type ReactNode } from "react";
import { BlockMath } from "react-katex";
import {
    NUCLEUSPHYSICS_TABS,
    nucleusPhysicsData,
    type NucleusPhysicsTabId,
} from "@/data/nuclearPhysicsData";

function FormulaBlock({ latex }: { latex: string }) {
    return (
      <div className="overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
        <BlockMath math={latex} />
      </div>
    );
}

function TheoryPanel() {
    return (
      <div className="space-y-4">
        {nucleusPhysicsData.theory.map((item, index) => (
          item.isHeader ? (
            <h2 
              key={`header-${index}`} 
              className="mb-2 mt-8 border-b-2 border-blue-100 pb-1 text-lg font-bold uppercase tracking-wide text-blue-700 first:mt-0"
            >
              {item.term}
            </h2>
          ) : (
            <div
              key={item.number || index}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                {item.number && (
                  <span className="mt-0.5 shrink-0 font-mono text-sm text-gray-400">
                    {item.number}.
                  </span>
                )}
                <div>
                  <span className="font-semibold text-gray-900">{item.term}</span>
                  {item.description && (
                    <>
                      <span className="mx-2 text-gray-400">—</span>
                      <span className="text-gray-700">{item.description}</span>
                    </>
                  )}
                  {item.imageFile && (
                    <img
                      src={`/images/${item.imageFile}`} // <-- Використовуємо imageFile
                      alt={item.term}
                      className="mt-3 h-40 w-full rounded-lg object-contain bg-slate-50"
                    />
                  )}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    );
}

function LawsPanel() {
    return (
      <div className="space-y-4">
        {nucleusPhysicsData.laws.map((law) => (
          <article
            key={law.number}
            className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900">
              {law.number}. {law.title}
            </h3>
            <p className="mt-2 text-gray-700">{law.description}</p>
            {law.note && (
              <p className="mt-2 text-sm text-gray-500">{law.note}</p>
            )}
            {law.latex && (
              <div className="mt-3">
                <FormulaBlock latex={law.latex} />
              </div>
            )}
            {law.imageFile && (
              <img
                src={`/images/${law.imageFile}`} // <-- Використовуємо imageFile
                alt={law.title}
                className="mt-3 h-40 w-full rounded-lg object-contain bg-slate-50"
              />
            )}
          </article>
        ))}
      </div>
    );
}

function FormulasPanel() {
    return (
      <ol className="space-y-3" start={35}>
        {nucleusPhysicsData.formulas.map((formula) => (
          <li
            key={formula.number}
            className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
          >
            <p className="mb-3">
              <span className="mr-2 font-mono text-sm text-gray-400">
                {formula.number}.
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

const TAB_PANELS: Record<NucleusPhysicsTabId, () => ReactNode> = {
    theory: TheoryPanel,
    laws: LawsPanel,
    formulas: FormulasPanel
};

export default function NucleusPhysicsTabs() {
    const [activeTab, setActiveTab] = useState<NucleusPhysicsTabId>("theory");
    const ActivePanel = TAB_PANELS[activeTab];
  
    return (
      <div>
        <nav
          className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm"
          role="tablist"
          aria-label="Розділи динаміки"
        >
          {NUCLEUSPHYSICS_TABS.map((tab) => {
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