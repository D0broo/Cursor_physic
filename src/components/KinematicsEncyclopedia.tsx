"use client";

import { BlockMath } from "react-katex";
import {
  KINEMATICS_DEFINITIONS,
  KINEMATICS_FORMULAS,
} from "@/data/kinematics";

function FormulaBlock({ latex }: { latex: string }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
      <BlockMath math={latex} />
    </div>
  );
}

export default function KinematicsEncyclopedia() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-5 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800">
          Визначення
        </h2>
        <ol className="space-y-4">
          {KINEMATICS_DEFINITIONS.map((item, index) => (
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
      </section>

      <section>
        <h2 className="mb-5 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800">
          Основні формули
        </h2>
        <ol className="space-y-4" start={21}>
          {KINEMATICS_FORMULAS.map((formula, index) => (
            <li
              key={formula.title}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
            >
              <p className="mb-3">
                <span className="mr-2 font-mono text-sm text-gray-400">
                  {index + 21}.
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
      </section>
    </div>
  );
}
