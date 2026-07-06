"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PHYSICS_SECTIONS } from "@/data/physics-sections";
import RichText from "./RichText";
import type { TestMode, TestResponse } from "@/lib/test-types";

type ChatMessage = { role: "user" | "assistant"; content: string };

type QuizAnswer = Record<number, number | string>;

const AUTO = "__auto__";

function slugFromPath(pathname: string | null): string {
  if (!pathname) return "";
  const m = pathname.match(/^\/physics\/([^/]+)/);
  if (!m) return "";
  return PHYSICS_SECTIONS.some((s) => s.slug === m[1]) ? m[1] : "";
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "quiz">("chat");

  const [manualSlug, setManualSlug] = useState<string | null>(null);
  const pathSlug = useMemo(() => slugFromPath(pathname), [pathname]);
  const activeSlug = manualSlug ?? pathSlug;
  const activeTitle =
    PHYSICS_SECTIONS.find((s) => s.slug === activeSlug)?.title ?? null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Привіт! Я ШІ-асистент з фізики. Запитай щось або пройди тест по поточному розділу нижче 👇",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quiz, setQuiz] = useState<TestResponse | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [submitted, setSubmitted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const hydratedRef = useRef(false);

  const STORAGE_KEY = "physics-chat-messages";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(saved) && saved.length > 0) {
          setMessages(saved);
        }
      }
    } catch {
      // ignore
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendChat() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text };
    const assistantMsg: ChatMessage = { role: "assistant", content: "" };
    const nextMessages = [...messages, userMsg, assistantMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], sectionSlug: activeSlug || null }),
        signal: controller.signal,
      });

      if (!res.ok) {
        let errMsg = "Помилка запиту";
        try {
          const data = await res.json();
          errMsg = data.error || errMsg;
        } catch {
          // ignore
        }
        throw new Error(errMsg);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Стрім недоступний");
      const decoder = new TextDecoder();

      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const current = acc;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: current };
          return copy;
        });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // keep whatever was streamed so far; remove empty assistant placeholder
        setMessages((prev) => {
          if (prev.length && prev[prev.length - 1].role === "assistant" && !prev[prev.length - 1].content) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } else {
        setError(err instanceof Error ? err.message : "Невідома помилка");
        // remove empty assistant placeholder on error
        setMessages((prev) => {
          if (prev.length && prev[prev.length - 1].role === "assistant" && !prev[prev.length - 1].content) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      }
    } finally {
      abortRef.current = null;
      setLoading(false);
    }
  }

  function stopChat() {
    abortRef.current?.abort();
  }

  function clearChat() {
    abortRef.current?.abort();
    setMessages([
      {
        role: "assistant",
        content:
          "Привіт! Я ШІ-асистент з фізики. Запитай щось або пройди тест по поточному розділу нижче 👇",
      },
    ]);
    setError(null);
  }

  async function startQuiz(mode: TestMode) {
    if (!activeSlug) {
      setQuizError("Спочатку вибери розділ фізики (зверху у полі «Розділ»).");
      return;
    }
    setQuizLoading(true);
    setQuizError(null);
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    setView("quiz");
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, sectionSlug: activeSlug, count: 5 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка генерації тесту");
      setQuiz(data as TestResponse);
    } catch (err) {
      setQuizError(err instanceof Error ? err.message : "Невідома помилка");
    } finally {
      setQuizLoading(false);
    }
  }

  function scoreQuiz(): { correct: number; total: number } {
    if (!quiz) return { correct: 0, total: 0 };
    if (quiz.mode === "multiple-choice") {
      const total = quiz.questions.length;
      let correct = 0;
      quiz.questions.forEach((q, i) => {
        if (answers[i] === q.correctIndex) correct++;
      });
      return { correct, total };
    }
    const total = quiz.problems.length;
    let correct = 0;
    quiz.problems.forEach((p, i) => {
      const val = parseFloat(String(answers[i] ?? "").replace(",", "."));
      if (!Number.isNaN(val) && Math.abs(val - p.answer) <= p.tolerance) correct++;
    });
    return { correct, total };
  }

  const quizScore = submitted ? scoreQuiz() : null;

  return (
    <>
      <button
        type="button"
        aria-label="Відкрити чат з ШІ"
        onClick={() => setOpen((v) => !v)}
        className="no-print fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5M21 12a9 9 0 11-3.5-7.1L21 4l-1.1 3.5A8.96 8.96 0 0121 12z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="no-print fixed bottom-24 right-5 z-50 flex h-[min(620px,80vh)] w-[min(390px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
          {/* Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/60">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                ШІ-асистент
              </span>
              <div className="flex rounded-lg bg-gray-200 p-0.5 dark:bg-gray-700">
                <button
                  type="button"
                  onClick={() => setView("chat")}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    view === "chat"
                      ? "bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Чат
                </button>
                <button
                  type="button"
                  onClick={() => setView("quiz")}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    view === "quiz"
                      ? "bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Тест
                </button>
              </div>
            </div>
            <label className="block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Розділ (контекст)
              <select
                value={manualSlug ?? AUTO}
                onChange={(e) => setManualSlug(e.target.value === AUTO ? null : e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value={AUTO}>
                  {pathSlug ? `Авто: ${activeTitle ?? pathSlug}` : "Авто (відкрий розділ)"}
                </option>
                {PHYSICS_SECTIONS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Body */}
          {view === "chat" ? (
            <ChatView
              messages={messages}
              loading={loading}
              error={error}
              input={input}
              setInput={setInput}
              sendChat={sendChat}
              stopChat={stopChat}
              clearChat={clearChat}
              scrollRef={scrollRef}
              canQuiz={!!activeSlug}
              onQuiz={() => startQuiz("multiple-choice")}
              onTask={() => startQuiz("numeric")}
            />
          ) : (
            <QuizView
              quiz={quiz}
              loading={quizLoading}
              error={quizError}
              answers={answers}
              setAnswers={setAnswers}
              submitted={submitted}
              score={quizScore}
              onSubmit={() => setSubmitted(true)}
              onReset={() => startQuiz(quiz?.mode ?? "multiple-choice")}
              hasSlug={!!activeSlug}
              onPickMode={startQuiz}
            />
          )}
        </div>
      )}
    </>
  );
}

type ChatViewProps = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  input: string;
  setInput: (v: string) => void;
  sendChat: () => void;
  stopChat: () => void;
  clearChat: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  canQuiz: boolean;
  onQuiz: () => void;
  onTask: () => void;
};

function ChatView(props: ChatViewProps) {
  const {
    messages,
    loading,
    error,
    input,
    setInput,
    sendChat,
    stopChat,
    clearChat,
    scrollRef,
    canQuiz,
    onQuiz,
    onTask,
  } = props;

  return (
    <>
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
              }`}
            >
              <RichText text={m.content} />
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </div>
        )}
      </div>

      <div className="flex gap-1.5 border-t border-gray-200 px-3 py-2 dark:border-gray-700">
        <button
          type="button"
          onClick={onQuiz}
          disabled={!canQuiz}
          title={canQuiz ? "Тест з вибором відповіді по розділу" : "Відкрий розділ або вибери його зверху"}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          📝 Тест
        </button>
        <button
          type="button"
          onClick={onTask}
          disabled={!canQuiz}
          title={canQuiz ? "Розрахункові задачі по розділу" : "Відкрий розділ або вибери його зверху"}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          🧮 Задачі
        </button>
        <button
          type="button"
          onClick={clearChat}
          disabled={loading || messages.length <= 1}
          title="Очистити історію чату"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          🗑 Очистити
        </button>
      </div>

      <div className="border-t border-gray-200 p-3 dark:border-gray-700">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendChat();
              }
            }}
            rows={1}
            placeholder="Запитай щось з фізики…"
            className="max-h-32 flex-1 resize-none rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
          {loading ? (
            <button
              type="button"
              onClick={stopChat}
              title="Зупинити генерацію"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={sendChat}
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-40 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

type QuizViewProps = {
  quiz: TestResponse | null;
  loading: boolean;
  error: string | null;
  answers: QuizAnswer;
  setAnswers: React.Dispatch<React.SetStateAction<QuizAnswer>>;
  submitted: boolean;
  score: { correct: number; total: number } | null;
  onSubmit: () => void;
  onReset: () => void;
  hasSlug: boolean;
  onPickMode: (mode: TestMode) => void;
};

function QuizView(props: QuizViewProps) {
  const { quiz, loading, error, answers, setAnswers, submitted, score, onSubmit, onReset, hasSlug, onPickMode } = props;

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-sm text-gray-500 dark:text-gray-400">
        <span className="inline-flex gap-1">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500" />
        </span>
        Генеруємо тест…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </div>
        <button
          type="button"
          onClick={() => onPickMode("multiple-choice")}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Спробувати знову
        </button>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-1 flex-col gap-3 p-4 text-sm text-gray-600 dark:text-gray-300">
        <p className="font-medium text-gray-800 dark:text-gray-100">Оберіть тип завдання:</p>
        <button
          type="button"
          onClick={() => onPickMode("multiple-choice")}
          disabled={!hasSlug}
          className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-left transition-colors hover:bg-blue-50 disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <span className="block font-medium text-gray-800 dark:text-gray-100">📝 Тест з вибором відповіді</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">5 питань, по 4 варіанти</span>
        </button>
        <button
          type="button"
          onClick={() => onPickMode("numeric")}
          disabled={!hasSlug}
          className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-left transition-colors hover:bg-blue-50 disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <span className="block font-medium text-gray-800 dark:text-gray-100">🧮 Розрахункові задачі</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">5 задач з числовою відповіддю</span>
        </button>
        {!hasSlug && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Відкрий розділ довідника або вибери його в полі «Розділ» зверху.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {quiz.mode === "multiple-choice" ? "Тест" : "Задачі"}: {quiz.sectionTitle}
          </span>
          {score && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {score.correct}/{score.total}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {quiz.mode === "multiple-choice"
            ? quiz.questions.map((q, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <div className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {i + 1}. <RichText text={q.question} />
                  </div>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oi) => {
                      const selected = answers[i] === oi;
                      const isCorrect = oi === q.correctIndex;
                      let cls =
                        "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800";
                      if (submitted) {
                        if (isCorrect)
                          cls = "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/40";
                        else if (selected)
                          cls = "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40";
                      } else if (selected) {
                        cls = "border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/40";
                      }
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={submitted}
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [i]: oi }))
                          }
                          className={`flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left text-sm transition-colors ${cls} ${
                            submitted ? "cursor-default" : "hover:border-blue-300"
                          }`}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs">
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span className="text-gray-700 dark:text-gray-200">
                            <RichText text={opt} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <RichText text={q.explanation} />
                    </p>
                  )}
                </div>
              ))
            : quiz.problems.map((p, i) => {
                const val = String(answers[i] ?? "");
                const numVal = parseFloat(val.replace(",", "."));
                const correct =
                  submitted && !Number.isNaN(numVal) && Math.abs(numVal - p.answer) <= p.tolerance;
                const wrong = submitted && !correct;
                return (
                  <div key={i} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {i + 1}. <RichText text={p.question} />
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={val}
                        disabled={submitted}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [i]: e.target.value }))
                        }
                        placeholder="число"
                        className={`w-32 rounded-md border px-2 py-1 text-sm focus:outline-none ${
                          correct
                            ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/40"
                            : wrong
                              ? "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40"
                              : "border-gray-300 bg-white focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900"
                        }`}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{p.unit}</span>
                      {submitted && (
                        <span className={`text-xs font-medium ${correct ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                          {correct ? "✓" : `✗ ${p.answer}`}
                        </span>
                      )}
                    </div>
                    {submitted && (
                      <div className="mt-2 rounded-md bg-gray-50 p-2 text-xs text-gray-600 dark:bg-gray-900/50 dark:text-gray-400">
                        <RichText text={p.solution} />
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      </div>

      <div className="border-t border-gray-200 p-3 dark:border-gray-700">
        {!submitted ? (
          <button
            type="button"
            onClick={onSubmit}
            className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Перевірити відповіді
          </button>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-center text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100">
              Результат: {score?.correct} / {score?.total}
            </div>
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Новий тест
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
