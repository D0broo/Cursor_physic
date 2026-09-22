import type { NextApiRequest, NextApiResponse } from "next";
import { SchemaType, type Schema } from "@google/generative-ai";
import { getGeminiClient, GEMINI_MODEL } from "@/lib/gemini";
import { getSectionContext, getSectionTitle, hasSectionData } from "@/lib/section-content";
import type { TestMode } from "@/lib/test-types";

type RequestBody = {
  mode: TestMode;
  sectionSlug?: string | null;
  count?: number;
};

const MULTIPLE_CHOICE_SCHEMA: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    questions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: { type: SchemaType.STRING },
          options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          correctIndex: { type: SchemaType.INTEGER },
          explanation: { type: SchemaType.STRING },
        },
        required: ["question", "options", "correctIndex", "explanation"],
      },
    },
  },
  required: ["questions"],
};

const NUMERIC_SCHEMA: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    problems: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: { type: SchemaType.STRING },
          answer: { type: SchemaType.NUMBER },
          tolerance: { type: SchemaType.NUMBER },
          unit: { type: SchemaType.STRING },
          solution: { type: SchemaType.STRING },
        },
        required: ["question", "answer", "tolerance", "unit", "solution"],
      },
    },
  },
  required: ["problems"],
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Метод не підтримується" });
    return;
  }

  const body = (req.body ?? {}) as RequestBody;
  const mode: TestMode = body.mode === "numeric" ? "numeric" : "multiple-choice";
  const sectionSlug = body.sectionSlug ?? null;

  if (!sectionSlug || !hasSectionData(sectionSlug)) {
    res.status(400).json({ error: "Вкажіть коректний sectionSlug розділу довідника" });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: "GEMINI_API_KEY не налаштовано. Додай його у .env.local" });
    return;
  }

  const context = getSectionContext(sectionSlug);
  const sectionTitle = getSectionTitle(sectionSlug);
  const count = Math.min(Math.max(body.count ?? 5, 1), 8);

  const prompt =
    mode === "multiple-choice"
      ? `На основі наведеного нижче контенту розділу "${sectionTitle}" склади ${count} тестових питань з вибором однієї правильної відповіді.
Вимоги:
- Кожне питання має рівно 4 варіанти відповідей.
- correctIndex — індекс правильної відповіді (0..3).
- Питання мають перевіряти розуміння формул, понять та законів цього розділу.
- explanation — коротке пояснення, чому саме ця відповідь правильна.
- Мова: українська. Для формул використовуй LaTeX у $...$.

=== КОНТЕКТ РОЗДІЛУ ===
${context}`
      : `На основі наведеного нижче контенту розділу "${sectionTitle}" склади ${count} розрахункових задач.
Вимоги:
- Кожна задача має чітку умову з числовими даними.
- answer — числова відповідь (число без одиниць).
- tolerance — допустима похибка (наприклад 0.01).
- unit — одиниця вимірювання (наприклад "м/с").
- solution — покрокове розв'язання з використанням LaTeX у $...$.
- Мова: українська.

=== КОНТЕКТ РОЗДІЛУ ===
${context}`;

  const schema = mode === "multiple-choice" ? MULTIPLE_CHOICE_SCHEMA : NUMERIC_SCHEMA;

  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text) as Record<string, unknown>;

    if (mode === "multiple-choice") {
      res.status(200).json({
        mode: "multiple-choice",
        sectionSlug,
        sectionTitle,
        questions: parsed.questions ?? [],
      });
      return;
    }

    res.status(200).json({
      mode: "numeric",
      sectionSlug,
      sectionTitle,
      problems: parsed.problems ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Невідома помилка";
    res.status(500).json({ error: message });
  }
}