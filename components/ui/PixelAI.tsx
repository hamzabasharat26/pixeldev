"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SendHorizontal, X } from "lucide-react";
import { PixelAvatar } from "./PixelAvatar";
import type { AssistantLink, AssistantTopic } from "@/content/assistant";

type Knowledge = typeof import("@/lib/assistant");

type Message = {
  id: number;
  from: "you" | "pixel";
  text: readonly string[];
  links?: readonly AssistantLink[];
  /** The next questions offered under this answer, so the chat keeps moving. */
  follow?: readonly AssistantTopic[];
};

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const noSubscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Long enough to read as a lookup, short enough not to be theatre. */
const THINKING_MS = 420;

/**
 * Pixel AI: the site's assistant. It answers only from what this site
 * publishes (content/assistant.ts), so it cannot invent a price, a client or a
 * result, and anything it cannot match goes to the contact page.
 *
 * The knowledge base, and the content it quotes, is imported on first open, so
 * a visitor who never opens the panel never downloads it.
 */
export function PixelAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [starters, setStarters] = useState<readonly AssistantTopic[]>([]);
  const [thinking, setThinking] = useState(false);
  const [draft, setDraft] = useState("");

  const knowledge = useRef<Knowledge | null>(null);
  const tab = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const seq = useRef(0);

  // False on the server and during hydration, true once JS is running, so the
  // tab is never a control that does nothing.
  const mounted = useSyncExternalStore(noSubscribe, clientSnapshot, serverSnapshot);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const load = useCallback(async () => {
    knowledge.current ??= await import("@/lib/assistant");
    return knowledge.current;
  }, []);

  const say = useCallback((message: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...message, id: seq.current++ }]);
  }, []);

  const ask = useCallback(
    async (question: string, topic?: AssistantTopic) => {
      const kb = await load();
      say({ from: "you", text: [question] });
      setThinking(true);
      const hit = topic ?? kb.matchTopic(question);
      window.clearTimeout(timer.current);
      const follow = hit
        ? kb.followUps(hit)
        : (kb.fallback.follow ?? [])
            .map((id) => kb.byId(id))
            .filter((t): t is AssistantTopic => Boolean(t));
      timer.current = window.setTimeout(
        () => {
          setThinking(false);
          say(
            hit
              ? { from: "pixel", text: hit.answer, links: hit.links, follow }
              : { from: "pixel", text: kb.fallback.answer, links: kb.fallback.links, follow },
          );
        },
        reduced() ? 0 : THINKING_MS,
      );
    },
    [load, say],
  );

  const openPanel = useCallback(async () => {
    setOpen(true);
    const kb = await load();
    setStarters(kb.starters);
    setMessages((prev) =>
      prev.length ? prev : [{ id: seq.current++, from: "pixel", text: kb.intro }],
    );
  }, [load]);

  const closePanel = useCallback(() => {
    const done = () => {
      setOpen(false);
      tab.current?.focus();
    };
    const el = panel.current;
    if (!el || reduced()) return done();
    gsap.to(el, { opacity: 0, y: 10, scale: 0.99, duration: 0.16, ease: "power2.in", onComplete: done });
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    if (el && !reduced()) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "power3.out" },
      );
    }
    el?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  if (!mounted) return null;

  return (
    <>
      <button
        ref={tab}
        type="button"
        className="pixel-tab"
        aria-label="Ask Pixel AI"
        aria-expanded={open}
        aria-controls="pixel-ai-panel"
        onPointerEnter={() => void load()}
        onFocus={() => void load()}
        onClick={() => void openPanel()}
      >
        <PixelAvatar size={20} />
        <span className="pixel-tab-label">Ask Pixel AI</span>
        <span aria-hidden="true" className="pixel-tab-dot" />
      </button>

      {open ? (
        <div
          ref={panel}
          id="pixel-ai-panel"
          role="dialog"
          aria-label="Pixel AI assistant"
          tabIndex={-1}
          className="pixel-panel"
        >
          <span aria-hidden="true" className="pixel-scan" />

          <header className="relative flex items-center gap-2.5 border-b border-white/10 px-3.5 py-3">
            <PixelAvatar size={32} live={thinking} />
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[0.95rem] font-semibold leading-tight text-d-text">
                Pixel AI
              </span>
              <span className="text-readout block text-signal/80">Answers from this site</span>
            </span>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close Pixel AI"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/12 text-d-muted transition-colors hover:border-white/30 hover:text-d-text"
            >
              <X size={15} strokeWidth={2} aria-hidden="true" />
            </button>
          </header>

          <div
            ref={log}
            aria-live="polite"
            className="flex min-h-[8rem] flex-1 flex-col gap-3 overflow-y-auto px-3.5 py-3.5"
          >
            {messages.map((m) => (
              <Bubble key={m.id} message={m} onAsk={(topic) => void ask(topic.chip, topic)} />
            ))}
            {thinking ? (
              <p aria-hidden="true" className="text-readout flex items-center gap-2 text-signal/80">
                Matching
                <span className="pixel-dots">
                  <i />
                  <i />
                  <i />
                </span>
              </p>
            ) : null}
          </div>

          {starters.length ? (
            <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-3.5 py-2.5">
              {starters.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  className="pixel-chip"
                  onClick={() => void ask(topic.chip, topic)}
                >
                  {topic.chip}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="flex items-center gap-2 border-t border-white/10 bg-navy-ink/50 p-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              const question = draft.trim();
              if (question.length < 2) return;
              setDraft("");
              void ask(question);
            }}
          >
            <label htmlFor="pixel-ai-input" className="sr-only">
              Ask a question
            </label>
            <input
              id="pixel-ai-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={200}
              autoComplete="off"
              placeholder="Ask a question..."
              className="min-w-0 flex-1 bg-transparent px-1.5 text-[0.9rem] text-d-text outline-none placeholder:text-d-muted"
            />
            <button
              type="submit"
              aria-label="Send question"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-300 text-navy-ink transition-transform hover:scale-105"
            >
              <SendHorizontal size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

function Bubble({
  message,
  onAsk,
}: {
  message: Message;
  onAsk: (topic: AssistantTopic) => void;
}) {
  if (message.from === "you") {
    return (
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-amber/30 bg-amber/15 px-3.5 py-2 text-[0.9rem] text-d-text">
        {message.text[0]}
      </p>
    );
  }

  // Words carry their own delay, so the reveal runs in CSS on the compositor
  // rather than a frame loop. The full text is in the DOM from the start, so
  // the live region announces it once and a reader never hears it twice.
  let word = 0;
  return (
    <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.045] px-3.5 py-3 text-[0.9rem] leading-relaxed text-d-text">
      {message.text.map((paragraph, i) => (
        <p key={i} className={i ? "mt-2.5" : undefined}>
          {paragraph.split(" ").map((w, j) => (
            <span
              key={j}
              className="pixel-word"
              style={{ animationDelay: `${Math.min(word++ * 14, 700)}ms` }}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      ))}
      {message.follow?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
          {message.follow.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className="pixel-chip"
              onClick={() => onAsk(topic)}
            >
              {topic.chip}
            </button>
          ))}
        </div>
      ) : null}
      {message.links?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {message.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-amber-300/40 px-2.5 py-1 text-[0.78rem] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
