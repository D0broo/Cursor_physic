"use client";

import { useState, type ReactNode } from "react";
import { BlockMath } from "react-katex";
import {
    STRUMSEREDOVICHA_TABS,
    strumSeredovichaData,
    type StrumSeredovichaTabId,
} from "@/data/strumSeredovicha";

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
        {strumSeredovichaData.theory.map((item, index) => (
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
        {strumSeredovichaData.laws.map((law) => (
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
        {strumSeredovichaData.formulas.map((formula) => (
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

function VahGraph({ type }: { type: string }) {
  const width = 200;
  const height = 150;
  const padding = 20;

  let path = "";
  if (type === "linear") {
    path = `M ${padding} ${height - padding} L ${width - padding} ${padding}`;
  } else if (type === "electrolyte") {
    path = `M ${padding + 20} ${height - padding} L ${width - padding} ${padding}`;
  } else if (type === "semiconductor") {
    path = `M ${padding} ${height - padding} Q ${width / 2} ${height - padding}, ${width - padding} ${padding}`;
  } else if (type === "gas") {
    path = `M ${padding} ${height - padding} L ${padding + 30} ${height - 60} Q ${width / 2} ${height - 70}, ${width - 60} ${height - 70} Q ${width - 30} ${height - 70}, ${width - padding} ${padding}`;
  } else if (type === "vacuum") {
    path = `M ${padding} ${height - padding} C ${padding + 50} ${height - padding}, ${width - 50} ${height - 50}, ${width - padding} ${padding}`;
  }

  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 text-xs font-semibold text-gray-500">ВАХ (I від U)</span>
      <svg width={width} height={height} className="overflow-visible">
        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width} y2={height - padding} stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1={padding} y1={height - padding} x2={padding} y2="0" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x={width - 5} y={height - padding + 15} fontSize="12">U</text>
        <text x={padding - 15} y="10" fontSize="12">I</text>
        
        {/* Plot */}
        <path d={path} fill="none" stroke="#2563eb" strokeWidth="3" />
        
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function RtGraph({ type }: { type: string }) {
  const width = 200;
  const height = 150;
  const padding = 20;

  let path = "";
  if (type === "increasing") {
    path = `M ${padding} ${height - 40} L ${width - padding} ${padding}`;
  } else if (type === "decreasing") {
    path = `M ${padding} ${padding} Q ${padding + 20} ${height - padding}, ${width - padding} ${height - padding - 20}`;
  } else if (type === "none") {
    return (
      <div className="flex h-[150px] w-[200px] items-center justify-center rounded-lg bg-gray-50 text-center text-xs text-gray-400">
        Не розглядається<br />в межах курсу
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 text-xs font-semibold text-gray-500">R від T</span>
      <svg width={width} height={height} className="overflow-visible">
        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width} y2={height - padding} stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1={padding} y1={height - padding} x2={padding} y2="0" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x={width - 5} y={height - padding + 15} fontSize="12">T</text>
        <text x={padding - 15} y="10" fontSize="12">R</text>
        
        {/* Plot */}
        <path d={path} fill="none" stroke="#dc2626" strokeWidth="3" />
      </svg>
    </div>
  );
}

function GraphsPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {strumSeredovichaData.graphs.map((graph) => (
        <article
          key={graph.id}
          className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h3 className="mb-2 text-lg font-bold text-gray-900">{graph.title}</h3>
          <p className="mb-6 text-sm text-gray-600">{graph.description}</p>
          
          <div className="flex flex-wrap justify-around gap-8">
            <VahGraph type={graph.vahType} />
            <RtGraph type={graph.rtType} />
          </div>
        </article>
      ))}
    </div>
  );
}

const TAB_PANELS: Record<StrumSeredovichaTabId, () => ReactNode> = {
    theory: TheoryPanel,
    laws: LawsPanel,
    formulas: FormulasPanel,
    graphs: GraphsPanel,
};

export default function StrumSeredovichaTabs() {
    const [activeTab, setActiveTab] = useState<StrumSeredovichaTabId>("theory");
    const ActivePanel = TAB_PANELS[activeTab];
  
    return (
      <div>
        <nav
          className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm"
          role="tablist"
          aria-label="Розділи динаміки"
        >
          {STRUMSEREDOVICHA_TABS.map((tab) => {
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