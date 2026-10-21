import React, { useEffect, useRef, useState } from "react";
import { X, PaperPlaneTilt, ChatCircleDots } from "@phosphor-icons/react";
import {
  ASSISTANT_PERSONA,
  COMMERCIAL_SERVICES,
  COMPANY,
  ESCALATION,
  EXTERIOR_SERVICES,
  FAQ,
  HOURS,
  INTERIOR_SERVICES,
  PRICING,
  PROCESS_STEPS,
} from "./knowledge";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "assistant" | "user";

interface Message {
  id: number;
  role: Role;
  text: string;
}

// ─── Simple rule-based AI engine (no external API required) ──────────────────

function matchAnswer(input: string): string {
  const q = input.toLowerCase().trim();

  // ── Phone / contact ──────────────────────────────────────────────────────
  if (/phone|call|number|reach|contact/.test(q)) {
    return `You can reach us at **${COMPANY.phone}** — ${HOURS.find((h) => h.day === "Monday")?.open ?? "8:00 AM"} to ${HOURS.find((h) => h.day === "Monday")?.close ?? "6:00 PM"} Mon–Fri, and Saturday ${HOURS.find((h) => h.day === "Saturday")?.open} – ${HOURS.find((h) => h.day === "Saturday")?.close}.`;
  }

  // ── Hours ────────────────────────────────────────────────────────────────
  if (/hour|open|close|weekend|saturday|sunday|schedule/.test(q)) {
    return `Our hours are:\n- **Mon–Fri:** 8:00 AM – 6:00 PM\n- **Saturday:** 9:00 AM – 2:00 PM\n- **Sunday:** Closed`;
  }

  // ── Free estimate / quote ────────────────────────────────────────────────
  if (/estimate|quote|free|cost|price|pricing|how much|charge/.test(q)) {
    return `We offer **free, no-obligation estimates**. ${PRICING.policy}\n\nTo get started: call **${COMPANY.phone}** or fill out the contact form on this page and we'll follow up shortly.`;
  }

  // ── Insured / insurance ──────────────────────────────────────────────────
  if (/insur|licens|certif/.test(q)) {
    return `Yes — NuBrite Painting of Orlando is **fully insured**. We carry general liability insurance to protect your property throughout every project.`;
  }

  // ── Warranty ─────────────────────────────────────────────────────────────
  if (/warrant|guarantee|quality|satisfaction/.test(q)) {
    return `We back all of our work with a **workmanship warranty** and remain available for follow-up after project completion. Specific terms are reviewed during your estimate based on project scope and products used.`;
  }

  // ── Paint brands ─────────────────────────────────────────────────────────
  if (/brand|sherwin|benjamin|paint brand|product/.test(q)) {
    return `We primarily use premium products from **Sherwin-Williams** and **Benjamin Moore** — both top-tier residential and commercial paint lines. We'll discuss specific products and sheens during your estimate.`;
  }

  // ── Color consultation ───────────────────────────────────────────────────
  if (/color|colour|consult|swatch|shade|tone|finish|sheen/.test(q)) {
    return `Yes, we offer **color consultations**! We review your lighting, flooring, and furnishings, narrow down swatches, and apply sample patches on your actual walls before you commit. We also help select the right finish sheen (flat, eggshell, satin) for each room.`;
  }

  // ── Interior services ────────────────────────────────────────────────────
  if (
    /interior|inside|wall|ceiling|trim|baseboard|kitchen|bathroom|closet|stairwell|entry|move.in|listing/.test(
      q,
    )
  ) {
    const list = INTERIOR_SERVICES.map(
      (s) => `• **${s.name}** — ${s.description}`,
    ).join("\n");
    return `Our interior painting services include:\n${list}\n\nCall **${COMPANY.phone}** or use the contact form for a free estimate.`;
  }

  // ── Exterior services ────────────────────────────────────────────────────
  if (
    /exterior|outside|pressure wash|fascia|soffit|eave|garage|fence|front door|shutter|caulk|patch|prim/.test(
      q,
    )
  ) {
    const list = EXTERIOR_SERVICES.map(
      (s) => `• **${s.name}** — ${s.description}`,
    ).join("\n");
    return `Our exterior painting services include:\n${list}\n\nWe use premium products formulated for Florida's UV exposure and humidity. Call **${COMPANY.phone}** for a free estimate.`;
  }

  // ── Commercial ───────────────────────────────────────────────────────────
  if (
    /commercial|business|office|retail|warehouse|boom lift|scissor lift|storefront|facade/.test(
      q,
    )
  ) {
    const list = COMMERCIAL_SERVICES.map(
      (s) => `• **${s.name}** — ${s.description}`,
    ).join("\n");
    return `Our commercial services include:\n${list}\n\nWe schedule around your business hours to minimize disruption. Call **${COMPANY.phone}** to discuss your project.`;
  }

  // ── Furniture / prep ─────────────────────────────────────────────────────
  if (/furniture|move|prep|prepare|protect|drop cloth/.test(q)) {
    return `We move and protect furniture as part of our standard process — floors are covered with drop cloths and surfaces are protected. We ask that you clear small personal items, fragile decor, and valuables before we arrive.`;
  }

  // ── Timeline / how long ──────────────────────────────────────────────────
  if (/how long|timeline|time|day|week|duration/.test(q)) {
    return `Timeline depends on scope. A single room typically takes **one day**; a full interior repaint may take **three to five days**. We provide a clear timeline during your free estimate and keep you updated throughout.`;
  }

  // ── Service area / location ──────────────────────────────────────────────
  if (/area|location|serve|where|city|florida|central/.test(q)) {
    return `We serve **Orlando and surrounding Central Florida communities**. Call us at **${COMPANY.phone}** to confirm service availability in your specific area.`;
  }

  // ── After hours / commercial scheduling ─────────────────────────────────
  if (/after hour|weekend|disrupt|business hour|overnight/.test(q)) {
    return `Yes! We regularly schedule commercial jobs **after hours or on weekends** to minimize disruption to your operations. Let us know your scheduling requirements during the estimate.`;
  }

  // ── Process ──────────────────────────────────────────────────────────────
  if (/process|how do|how does|step|work/.test(q)) {
    return `Our process:\n${PROCESS_STEPS.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;
  }

  // ── Generic FAQ lookup ────────────────────────────────────────────────────
  const faqMatch = FAQ.find((f) =>
    f.question
      .toLowerCase()
      .split(" ")
      .filter((w) => w.length > 3)
      .some((w) => q.includes(w)),
  );
  if (faqMatch) return faqMatch.answer;

  // ── Greeting ─────────────────────────────────────────────────────────────
  if (/^(hi|hello|hey|good morning|good afternoon|howdy|sup|yo)\b/.test(q)) {
    return `Hello! I'm the NuBrite Painting assistant. I can help with questions about our services, hours, estimates, and more. What can I help you with?`;
  }

  // ── Thank you ────────────────────────────────────────────────────────────
  if (/thank|thanks|thx|ty\b|appreciate/.test(q)) {
    return `You're welcome! If you have any other questions or are ready to get a free estimate, feel free to ask — or call us at **${COMPANY.phone}**.`;
  }

  // ── Fallback ─────────────────────────────────────────────────────────────
  return `${ESCALATION.escalationMessage}\n\nI can answer questions about our services, hours, process, and estimates — feel free to ask!`;
}

// ─── Simulates a typing delay for realism ─────────────────────────────────────

function simulateTyping(callback: () => void, ms = 600 + Math.random() * 400) {
  setTimeout(callback, ms);
}

// ─── Quick reply suggestions ──────────────────────────────────────────────────

const QUICK_REPLIES = [
  "Do you offer free estimates?",
  "What are your hours?",
  "Do you paint commercial buildings?",
  "What paint brands do you use?",
  "How long does a project take?",
];

// ─── ChatWidget component ─────────────────────────────────────────────────────

let msgId = 0;
function nextId() {
  return ++msgId;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: "assistant", text: ASSISTANT_PERSONA.greeting },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Auto-focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Proactive nudge after 8s on first visit
  useEffect(() => {
    if (hasOpened) return;
    const t = setTimeout(() => {
      if (!open) {
        // Just show badge pulse — no forced open
      }
    }, 8000);
    return () => clearTimeout(t);
  }, [hasOpened, open]);

  function handleOpen() {
    setOpen(true);
    setHasOpened(true);
  }

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", text: trimmed },
    ]);
    setInput("");
    setTyping(true);

    simulateTyping(() => {
      const answer = matchAnswer(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", text: answer },
      ]);
      setTyping(false);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleQuickReply(text: string) {
    sendMessage(text);
  }

  // Render markdown-lite: **bold**, bullet lists, newlines
  function renderText(text: string) {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return (
        <span key={i}>
          {rendered}
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  }

  const showQuickReplies =
    messages.length === 1 && messages[0].role === "assistant";

  return (
    <>
      {/* ── Floating launcher button ── */}
      {!open && (
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open chat assistant"
          className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChatCircleDots size={28} weight="fill" className="text-white" />
        </button>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="NuBrite Painting chat assistant"
          aria-modal="false"
          className="fixed bottom-6 left-6 z-50 flex w-[340px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          style={{ maxHeight: "min(520px, calc(100dvh - 5rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-primary px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                <ChatCircleDots
                  size={20}
                  weight="fill"
                  className="text-white"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight text-white">
                  {ASSISTANT_PERSONA.name}
                </p>
                <p className="text-[11px] font-normal text-white/80">
                  NuBrite Painting · Orlando, FL
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={18} weight="regular" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && !typing && (
              <div className="mt-1 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuickReply(q)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-normal text-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border bg-background px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={typing}
              className="min-h-10 flex-1 rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PaperPlaneTilt size={18} weight="fill" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
