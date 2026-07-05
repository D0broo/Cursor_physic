"use client";

import { useState, type ReactNode } from "react";
import { BlockMath } from "react-katex";
import {
    MAGNITNIVIBRATIONS_TABS,
    magnitnivibrationsData,
    type MagnitnivibrationsTabId,
} from "@/data/magnitnivibrationsData";

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
        {magnitnivibrationsData.theory.map((item, index) => (
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
        {magnitnivibrationsData.laws.map((law) => (
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
        {magnitnivibrationsData.formulas.map((formula) => (
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

function SineWave({ phaseDeg, color }: { phaseDeg: number; color: string }) {
    const w = 280;
    const cy = 50;
    const amp = 30;
    const phase = (phaseDeg * Math.PI) / 180;
    const steps = 80;

    let d = "";
    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * 2 * Math.PI;
        const x = (i / steps) * w;
        const y = cy - amp * Math.sin(t + phase);
        d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
    }
    return <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />;
}

function Arrow({ x, y, len, angle, color, label }: { x: number; y: number; len: number; angle: number; color: string; label: string }) {
    const arrowSize = 8;
    const rad = (angle * Math.PI) / 180;
    const dx = len * Math.cos(rad);
    const dy = len * Math.sin(rad);
    const ex = x + dx;
    const ey = y + dy;

    const ax1 = ex - arrowSize * Math.cos(rad - Math.PI / 6);
    const ay1 = ey - arrowSize * Math.sin(rad - Math.PI / 6);
    const ax2 = ex - arrowSize * Math.cos(rad + Math.PI / 6);
    const ay2 = ey - arrowSize * Math.sin(rad + Math.PI / 6);

    const lx = ex + 8 * Math.cos(rad);
    const ly = ey + 8 * Math.sin(rad);

    return (
        <g>
            <line x1={x} y1={y} x2={ex} y2={ey} stroke={color} strokeWidth="3" strokeLinecap="round" />
            <polygon points={`${ax1},${ay1} ${ex},${ey} ${ax2},${ay2}`} fill={color} />
            <text x={lx} y={ly + 4} fill={color} fontSize="11" fontWeight="700">{label}</text>
        </g>
    );
}

function PhaseDiagram({ phaseLabel, phaseDeg }: { phaseLabel: string; phaseDeg: number }) {
    return (
        <svg viewBox="0 0 280 100" className="h-24 w-full max-w-xs" role="img" aria-label={`Phase shift ${phaseLabel}`}>
            <line x1="0" y1="50" x2="280" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
            <SineWave phaseDeg={0} color="#3b82f6" />
            <SineWave phaseDeg={phaseDeg} color="#ef4444" />
            <text x="275" y="18" fill="#3b82f6" fontSize="12" fontWeight="600">U</text>
            <text x="275" y="88" fill="#ef4444" fontSize="12" fontWeight="600">I</text>
        </svg>
    );
}

function ArrowDiagram({ phaseDeg }: { phaseDeg: number }) {
    const sw = 220;
    const cx = sw / 2;
    const arrowLen = 60;
    const uAngle = phaseDeg === 90 ? -90 : phaseDeg === -90 ? 90 : 0;

    return (
        <svg viewBox={`0 0 ${sw} 90`} className="h-20 w-full" role="img">
            <Arrow x={cx - arrowLen / 2} y={45} len={arrowLen} angle={0} color="#ef4444" label="I" />
            <Arrow x={cx} y={uAngle === 0 ? 65 : 45} len={uAngle === 0 ? arrowLen : 50} angle={uAngle} color="#3b82f6" label="U" />
        </svg>
    );
}

function PhaseShiftPanel() {
    const rows = [
        {
            type: "Активний",
            symbol: "R",
            formula: "R",
            formulaLabel: "Активний опір",
            phaseLabel: "φ = 0°",
            phaseDeg: 0,
            description: "Струм і напруга збігаються за фазою",
            color: "border-l-emerald-500 bg-emerald-50",
        },
        {
            type: "Ємнісний",
            symbol: "X_C",
            formula: "\\frac{1}{\\omega C}",
            formulaLabel: "Ємнісний опір",
            phaseLabel: "φ = -90°",
            phaseDeg: -90,
            description: "Струм випереджає напругу на 90°",
            color: "border-l-sky-500 bg-sky-50",
        },
        {
            type: "Індуктивний",
            symbol: "X_L",
            formula: "\\omega L",
            formulaLabel: "Індуктивний опір",
            phaseLabel: "φ = +90°",
            phaseDeg: 90,
            description: "Струм відстає від напруги на 90°",
            color: "border-l-violet-500 bg-violet-50",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
                <h2 className="mb-2 text-lg font-bold text-gray-900">Зсув фаз у колі змінного струму</h2>
                <p className="text-sm leading-relaxed text-gray-600">
                    У колі змінного струму напруга та сила струму можуть не збігатися за фазою.
                    Величина зсуву фаз залежить від типу навантаження: активного, ємнісного чи індуктивного.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
                {rows.map((row) => (
                    <div
                        key={row.type}
                        className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${row.color} border-l-4`}
                    >
                        <div className="p-4">
                            <div className="mb-1 flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">{row.type}</span>
                                <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-600">
                                    {row.symbol}
                                </span>
                            </div>
                            <div className="mt-3 overflow-x-auto rounded-lg bg-slate-50 px-3 py-2 text-center text-sm">
                                <BlockMath math={row.formula} />
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold">
                                <span className="text-gray-800">{row.phaseLabel}</span>
                            </div>
                            <div className="mt-2 flex justify-center">
                                <PhaseDiagram phaseLabel={row.phaseLabel} phaseDeg={row.phaseDeg} />
                            </div>
                            <div className="mt-1 flex justify-center">
                                <ArrowDiagram phaseDeg={row.phaseDeg} />
                            </div>
                            <p className="mt-2 text-center text-xs text-gray-500">{row.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const TAB_PANELS: Record<MagnitnivibrationsTabId, () => ReactNode> = {
    theory: TheoryPanel,
    laws: LawsPanel,
    formulas: FormulasPanel,
    "phase-shift": PhaseShiftPanel,
};

export default function MagnitnivibrationsTabs() {
    const [activeTab, setActiveTab] = useState<MagnitnivibrationsTabId>("theory");
    const ActivePanel = TAB_PANELS[activeTab];
  
    return (
      <div>
        <nav
          className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm"
          role="tablist"
          aria-label="Розділи динаміки"
        >
          {MAGNITNIVIBRATIONS_TABS.map((tab) => {
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