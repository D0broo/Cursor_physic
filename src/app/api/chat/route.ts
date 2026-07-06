import { NextResponse } from "next/server";
import { getGeminiClient, GEMINI_MODEL } from "@/lib/gemini";
import { getSectionContext, getSectionTitle } from "@/lib/section-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Невалідний JSON у запиті" }, { status: 400 });
  }

  const { messages, sectionSlug } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Поле messages обов'язкове" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY не налаштовано. Додай його у .env.local" },
      { status: 500 }
    );
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
      return NextResponse.json({ error: "Немає повідомлення від користувача" }, { status: 400 });
    }

    const preceding = messages.filter((m) => m !== lastUser);
    const firstUserIdx = preceding.findIndex((m) => m.role === "user");
    const validHistory = firstUserIdx === -1 ? [] : preceding.slice(firstUserIdx);

    const history = validHistory.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastUser.content);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Невідома помилка";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
