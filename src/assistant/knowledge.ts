/**
 * NuBrite Painting of Orlando — AI Assistant Knowledge Base
 *
 * USAGE POLICY (strict):
 * - Answer ONLY from the facts listed below.
 * - If a question cannot be answered from this file, say: "I don't have that information right now — please call us at (407) 429-5586 and we'll be happy to help."
 * - NEVER invent prices, availability, or policies not stated here.
 * - NEVER discuss competitors by name.
 * - Always offer to connect the user with a human when uncertain or when the question involves scheduling, firm quotes, or complaints.
 * - Keep answers concise — 1-4 sentences preferred. Use bullet points only when listing 3+ items.
 * - Tone: friendly, professional, helpful. No slang.
 */

// ─── COMPANY IDENTITY ─────────────────────────────────────────────────────────

export const COMPANY = {
  name: "NuBrite Painting of Orlando",
  phone: "(407) 429-5586",
  phoneHref: "tel:+14074295586",
  email: null, // not published yet
  website: "https://www.nubritepainting.com/",
  city: "Orlando",
  state: "FL",
  serviceArea: "Orlando and surrounding Central Florida communities",
  tagline:
    "Residential & Commercial Painting — Trusted by Orlando homeowners and businesses alike.",
  licenseInfo: "Fully insured",
  paintBrands: ["Sherwin-Williams", "Benjamin Moore"],
  warranty: "Warranty-backed workmanship — we stand behind every job.",
};

// ─── HOURS OF OPERATION ───────────────────────────────────────────────────────

export const HOURS = [
  { day: "Monday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Tuesday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Wednesday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Thursday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Friday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Saturday", open: "9:00 AM", close: "2:00 PM" },
  { day: "Sunday", open: null, close: null, note: "Closed" },
];

// ─── RESIDENTIAL INTERIOR SERVICES ───────────────────────────────────────────

export const INTERIOR_SERVICES = [
  {
    name: "Wall & Ceiling Painting",
    description:
      "Living spaces, bedrooms, and hallways. Two finish coats with primer where needed, crisp cut-in edges.",
  },
  {
    name: "Trim, Baseboard & Crown Molding",
    description:
      "Semi-gloss or gloss finish on doors, trim, and molding for crisp, professional lines.",
  },
  {
    name: "Kitchen & Bathroom",
    description:
      "Moisture-resistant finishes, mold-resistant primer, caulk around fixtures.",
  },
  {
    name: "Closets, Stairwells & Entries",
    description:
      "Tight corners, high-wear areas, durable finish coat — forgotten spaces refreshed.",
  },
  {
    name: "Move-In & Pre-Listing Updates",
    description:
      "Quick turnarounds for real estate — neutral buyer-friendly colors, rapid-dry products.",
  },
  {
    name: "Color Consultations",
    description:
      "Help with lighting, flooring, furnishings, finish sheen selection, and paint samples on actual walls.",
  },
];

// ─── RESIDENTIAL EXTERIOR SERVICES ───────────────────────────────────────────

export const EXTERIOR_SERVICES = [
  {
    name: "Full Exterior House Repaint",
    description:
      "Pressure wash, caulk, scrape, prime, two finish coats, final walk-through.",
  },
  {
    name: "Trim, Fascia, Soffit & Eaves",
    description:
      "Detail work around rooflines — scrape, prime, brush-applied trim color.",
  },
  {
    name: "Front Door & Shutters",
    description:
      "Exterior-grade enamel, hardware masked, shutters removed and rehung.",
  },
  {
    name: "Garage Door & Fence",
    description:
      "Rust-inhibiting primer on metal, solid stain or paint on wood fencing.",
  },
  {
    name: "Pressure Washing & Surface Prep",
    description:
      "High-pressure mildew removal, 48-hour dry time, caulk and spot-prime before finish.",
  },
  {
    name: "Caulking, Patching & Priming",
    description:
      "All gaps caulked, stucco cracks filled, sanded flush, full primer before finish coat.",
  },
];

// ─── COMMERCIAL SERVICES ──────────────────────────────────────────────────────

export const COMMERCIAL_SERVICES = [
  {
    name: "Commercial Interior Painting",
    description:
      "Offices, retail spaces & commercial interiors. After-hours / weekend scheduling to minimize disruption.",
  },
  {
    name: "Commercial Exterior Painting",
    description:
      "Storefronts, facades & building exteriors. Elastomeric or commercial-grade finish.",
  },
  {
    name: "Boom Lift High-Reach Painting",
    description:
      "Multi-story and high-elevation surfaces — OSHA protocols, complete overspray protection.",
  },
  {
    name: "Scissor Lift Services",
    description:
      "Elevated interior & exterior access — high ceilings, soffits, upper walls.",
  },
  {
    name: "Office & Retail Refresh",
    description:
      "Scheduled repaints with minimal downtime. Brand colors matched exactly if specs provided.",
  },
];

// ─── PRICING POLICY ──────────────────────────────────────────────────────────

export const PRICING = {
  policy:
    "We provide free, no-obligation estimates. Pricing depends on scope, square footage, surface condition, and product selection. We do not quote specific prices without a site visit or consultation.",
  estimateProcess:
    "Call (407) 429-5586 or submit the contact form on our website. A team member will follow up to schedule a walk-through.",
  paymentInfo: null, // not published — direct to phone
};

// ─── TRUST & CREDENTIALS ──────────────────────────────────────────────────────

export const TRUST = [
  "Orlando-based local business",
  "Fully insured",
  "Free estimates",
  "Warranty-backed workmanship",
  "Premium Sherwin-Williams and Benjamin Moore products",
  "Professional prep: pressure washing, caulking, patching, priming before every coat",
];

// ─── PROCESS OVERVIEW ─────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  "Clear, upfront pricing — no confusing surprises",
  "Expert color guidance — finish, undertones, product choices",
  "Respect for your space — furniture moved, floors covered, tidy work areas",
  "Professional craftsmanship — crisp lines, smooth coverage, premium products",
  "Satisfaction guaranteed — final walk-through and touch-ups included",
  "Ongoing warranty support — available for follow-up after project completion",
];

// ─── FAQ (source of truth — mirrors live database) ────────────────────────────

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. We provide free, no-obligation estimates for all residential and commercial painting projects in the Orlando area. Call us at (407) 429-5586 or submit our online contact form to get started.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes. NuBrite Painting of Orlando is fully insured. We carry general liability insurance to protect your property throughout the project.",
  },
  {
    question: "What paint brands do you use?",
    answer:
      "We primarily use premium products from Sherwin-Williams and Benjamin Moore — both are widely regarded as top-tier residential and commercial paint lines. We can discuss specific product lines and sheens during your estimate.",
  },
  {
    question: "How long does an interior painting project take?",
    answer:
      "Timeline depends on the scope — a single room typically takes one day, while a full interior repaint may take three to five days. We provide a clear timeline during your estimate and keep you updated throughout.",
  },
  {
    question: "Do I need to move my furniture before you arrive?",
    answer:
      "We move and protect furniture as part of our process. We ask that you clear small personal items, fragile decor, and valuables before we begin so they stay safe.",
  },
  {
    question: "Do you do exterior painting in Florida's climate?",
    answer:
      "Yes. We use premium exterior-grade products formulated for Florida's UV exposure, humidity, and moisture cycles. Proper prep — pressure washing, caulking, sanding, and priming — is always completed before any finish coat.",
  },
  {
    question: "Can you paint commercial properties after business hours?",
    answer:
      "Yes. We regularly schedule commercial jobs after hours or on weekends to minimize disruption to your operations. Let us know your scheduling needs during the estimate.",
  },
  {
    question: "Do you offer color consultations?",
    answer:
      "Yes. We help you review lighting, flooring, and furnishings, narrow down swatches, and apply sample patches on your actual walls before committing to a color. Finish sheen selection (flat, eggshell, satin) is also part of the consultation.",
  },
  {
    question: "What is your warranty?",
    answer:
      "We back our work with a workmanship warranty and remain available for follow-up after project completion. Specific warranty terms are discussed during the estimate based on your project scope and the products used.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Orlando and surrounding Central Florida communities. Call us at (407) 429-5586 to confirm service availability in your specific area.",
  },
];

// ─── ESCALATION RULES ─────────────────────────────────────────────────────────

export const ESCALATION = {
  alwaysEscalate: [
    "firm price quotes",
    "scheduling and booking",
    "complaints or quality concerns",
    "warranty claims",
    "emergency requests",
    "anything the AI is not certain about",
  ],
  escalationMessage:
    "For this, I'd recommend speaking directly with our team — they'll give you the most accurate answer. You can reach us at (407) 429-5586 (Mon–Fri 8 AM–6 PM, Sat 9 AM–2 PM).",
};

// ─── ASSISTANT PERSONA ────────────────────────────────────────────────────────

export const ASSISTANT_PERSONA = {
  name: "NuBrite Assistant",
  greeting: "Hi! I'm the NuBrite Painting assistant. How can I help you today?",
  role: "I help answer questions about NuBrite Painting of Orlando — our services, process, hours, and how to get a free estimate.",
  outOfScope:
    "I'm only able to answer questions about NuBrite Painting. For anything else, I'd suggest giving our team a call at (407) 429-5586.",
};
