"use client";

import { InlineMath, BlockMath } from "react-katex";

type Segment =
  | { type: "text"; value: string }
  | { type: "inline"; value: string }
  | { type: "block"; value: string };

function pushTextSegments(arr: Segment[], text: string) {
  const inlineRe = /\$([^\$\n]+?)\$/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = inlineRe.exec(text)) !== null) {
    if (m.index > lastIndex) {
      arr.push({ type: "text", value: text.slice(lastIndex, m.index) });
    }
    arr.push({ type: "inline", value: m[1] });
    lastIndex = inlineRe.lastIndex;
  }
  if (lastIndex < text.length) {
    arr.push({ type: "text", value: text.slice(lastIndex) });
  }
}

function parseLatex(input: string): Segment[] {
  const segments: Segment[] = [];
  const blockRe = /\$\$([\s\S]+?)\$\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = blockRe.exec(input)) !== null) {
    if (match.index > lastIndex) {
      pushTextSegments(segments, input.slice(lastIndex, match.index));
    }
    segments.push({ type: "block", value: match[1] });
    lastIndex = blockRe.lastIndex;
  }
  if (lastIndex < input.length) {
    pushTextSegments(segments, input.slice(lastIndex));
  }
  return segments;
}

function TextWithBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function RichText({ text }: { text: string }) {
  const segments = parseLatex(text);
  return (
    <div className="whitespace-pre-wrap break-words leading-relaxed">
      {segments.map((seg, i) => {
        if (seg.type === "block") {
          return (
            <div key={i} className="my-1 overflow-x-auto">
              <BlockMath math={seg.value} />
            </div>
          );
        }
        if (seg.type === "inline") {
          return <InlineMath key={i} math={seg.value} />;
        }
        return <TextWithBold key={i} text={seg.value} />;
      })}
    </div>
  );
}
