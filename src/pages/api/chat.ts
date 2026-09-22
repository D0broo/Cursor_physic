import type { NextApiRequest, NextApiResponse } from "next";
import { getGeminiClient, GEMINI_MODEL } from "@/lib/gemini";
import { getSectionContext, getSectionTitle } from "@/lib/section-content";

type ChatMessage = { role: "user" | "assistant"; content: string };

type RequestBody = {
  messages: ChatMessage[];
  sectionSlug?: string | null;
};

const BASE_INSTRUCTION = `Ти — допоміжний ШІ-асистент для українського довідника з фізики "Енциклопедія фізики".
Відповідай українською мовою, чітко та по суті.
Використовуй LaTeX у форматі $...$ дляinline-формул та $$...$$ для блоків формул, щоб вони рендерились у чаті.
Пояснюй фізичні поняття зрозуміло, при потребі наводь приклади.
Якщо питання не стосується фізики — чемно поверни розмову до фізики.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Метод не підтримується" });
    return;
  }

  const body = (req.body ?? {}) as RequestBody;
  const { messages, sectionSlug } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Поле messages обов'язкове" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY не налаштовано. Додай його у .env.local" });
    return;
  }

  const sectionContext = getSectionContext(sectionSlug ?? null);
  const sectionTitle = getSectionTitle(sectionSlug ?? null);

  const systemInstruction = sectionContext
    ? `${BASE_INSTRUCTION}\n\nКористувач зараз на сторінці розділу "${sectionTitle}". Нижче — структурований контент цієї сторінки довідника. Спирайся на нього у відповідях.\n\n=== КОНТЕКТ СТОРІНКИ ===\n${sectionContext}\n=== КІНЕЦЬ КОНТЕКСТУ ===`
    : `${BASE_INSTRUCTION}\n\nКористувач не на конкретній сторінці довідника — відповідай загально з фізики.`;

  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction,
    });

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      res.status(400).json({ error: "Немає повідомлення від користувача" });
      return;
    }

    const preceding = messages.filter((m) => m !== lastUser);
    const firstUserIdx = preceding.findIndex((m) => m.role === "user");
    const validHistory = firstUserIdx === -1 ? [] : preceding.slice(firstUserIdx);

    const history = validHistory.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const stream = await chat.sendMessageStream(lastUser.content);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();

    const encoder = new TextEncoder();
    try {
      for await (const chunk of stream.stream) {
        const piece = chunk.text();
        if (piece) res.write(encoder.encode(piece));
      }
    } finally {
      res.end();
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Невідома помилка";
    res.status(500).json({ error: message });
  }
}