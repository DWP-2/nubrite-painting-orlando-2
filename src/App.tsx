import React, { useEffect, useRef, useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useMutation } from "@animaapp/playground-react-sdk";
import {
  ArrowRight,
  Buildings,
  CheckCircle,
  ClipboardText,
  House,
  List,
  MapPin,
  PaintBrush,
  Phone,
  ShieldCheck,
  Sparkle,
  Star,
  X,
} from "@phosphor-icons/react";
import { ChatWidget } from "@/assistant/ChatWidget";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  projectDetails: string;
  consent: boolean;
  company: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

const phoneDisplay = "(407) 429-5586";
const phoneHref = "tel:+14074295586";
const supportEmail = "nubriteinc@gmail.com";
const expectedResponseWindow = "within 1 business day";

type NavItem =
  | { label: string; href: string; children?: undefined }
  | {
      label: string;
      href?: undefined;
      children: { label: string; href: string }[];
    };

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  {
    label: "Residential",
    children: [
      { label: "Interior", href: "/residential-interior" },
      { label: "Exterior", href: "/residential-exterior" },
    ],
  },
  { label: "Commercial", href: "/commercial" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Flat link lists used in the mobile nav for each tab
const interiorNavLinks = [
  { label: "Wall & Ceiling Painting", href: "/residential-interior" },
  { label: "Trim, Baseboard & Crown Molding", href: "/residential-interior" },
  { label: "Kitchen & Bathroom", href: "/residential-interior" },
  { label: "Closets, Stairwells & Entries", href: "/residential-interior" },
  { label: "Move-In & Pre-Listing Updates", href: "/residential-interior" },
  { label: "Color Consultations", href: "/residential-interior" },
];

const exteriorNavLinks = [
  { label: "Full Exterior House Repaint", href: "/residential-exterior" },
  { label: "Trim, Fascia, Soffit & Eaves", href: "/residential-exterior" },
  { label: "Front Door & Shutters", href: "/residential-exterior" },
  { label: "Garage Door & Fence", href: "/residential-exterior" },
  { label: "Pressure Washing & Surface Prep", href: "/residential-exterior" },
  { label: "Caulking, Patching & Priming", href: "/residential-exterior" },
];

const commercialNavLinks = [
  { label: "Commercial Interior Painting", href: "/commercial" },
  { label: "Commercial Exterior Painting", href: "/commercial" },
  { label: "Boom Lift High-Reach Painting", href: "/commercial" },
  { label: "Scissor Lift Services", href: "/commercial" },
  { label: "Office & Retail Refresh", href: "/commercial" },
];

const servicesMenuGroups = [
  { title: "Interior Residential", links: interiorNavLinks },
  { title: "Exterior Residential", links: exteriorNavLinks },
  { title: "Commercial", links: commercialNavLinks },
];

const utilityLinks = [{ label: "Location Map", href: "/#contact" }];

const trustItems = [
  { label: "Orlando-based", icon: MapPin },
  { label: "Fully Insured", icon: ShieldCheck },
  { label: "Free Estimates", icon: ClipboardText },
  { label: "Warranty Backed", icon: Star },
];

const faqItems = [
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
    question: "Do you do exterior painting in Florida&#39;s climate?",
    answer:
      "Yes. We use premium exterior-grade products formulated for Florida&#39;s UV exposure, humidity, and moisture cycles. Proper prep — pressure washing, caulking, sanding, and priming — is always completed before any finish coat.",
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

function scrollToHash(hashOrPath: string) {
  const hashIndex = hashOrPath.indexOf("#");
  const hash = hashIndex >= 0 ? hashOrPath.slice(hashIndex) : hashOrPath;
  const path = hashIndex >= 0 ? hashOrPath.slice(0, hashIndex) : "";

  if (!hash || !hash.startsWith("#")) {
    return;
  }

  if (path && path !== window.location.pathname) {
    window.location.href = `${path}${hash}`;
    return;
  }

  let target: Element | null = null;
  try {
    target = document.querySelector(hash);
  } catch {
    return;
  }

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function navigateToDestination(href: string) {
  if (href.startsWith("#") || href.includes("#")) {
    scrollToHash(href);
    return;
  }

  window.location.href = href;
}

function setSeoMetadata() {
  document.title = "Interior House Painters in Orlando, FL | NuBrite Painting";

  const setMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
    let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement("meta");
      if (isProperty) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  const setLink = (rel: string, href: string) => {
    let tag = document.head.querySelector(
      `link[rel="${rel}"]`,
    ) as HTMLLinkElement | null;
    if (!tag) {
      tag = document.createElement("link");
      tag.setAttribute("rel", rel);
      document.head.appendChild(tag);
    }
    tag.setAttribute("href", href);
  };

  setMeta(
    "description",
    "Transform your home with NuBrite Painting in Orlando, FL. Expert interior house painters, premium paints, and free estimates. Call (407) 429-5586 today!",
  );
  setMeta(
    "og:title",
    "Interior House Painters in Orlando, FL | NuBrite Painting",
    true,
  );
  setMeta(
    "og:description",
    "Transform your home with NuBrite Painting in Orlando, FL. Expert interior house painters, premium paints, and free estimates. Call (407) 429-5586 today!",
    true,
  );
  setMeta("og:type", "website", true);
  setMeta(
    "og:url",
    "https://www.nubritepainting.com/orlando/interior-house-painting",
    true,
  );
  setMeta(
    "og:image",
    "https://c.animaapp.com/mouf8r47O98IqE/img/ai_1.png",
    true,
  );
  setMeta("twitter:card", "summary_large_image");
  setMeta(
    "twitter:title",
    "Interior House Painters in Orlando, FL | NuBrite Painting",
  );
  setMeta(
    "twitter:description",
    "Transform your home with NuBrite Painting in Orlando, FL. Expert interior house painters, premium paints, and free estimates. Call (407) 429-5586 today!",
  );
  setLink(
    "canonical",
    "https://www.nubritepainting.com/orlando/interior-house-painting",
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    setSeoMetadata();

    if (location.hash) {
      setTimeout(() => {
        scrollToHash(location.hash);
      }, 50);
    }
  }, [location.pathname, location.hash]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PaintingContractor"],
    name: "NuBrite Painting of Orlando",
    url: "https://www.nubritepainting.com/orlando/interior-house-painting",
    telephone: "+1-407-429-5586",
    areaServed: ["Orlando, FL", "Central Florida"],
    image: "https://c.animaapp.com/mouf8r47O98IqE/img/ai_1.png",
    description:
      "NuBrite Painting of Orlando provides trusted interior house painting services, free estimates, and professional residential painting solutions in Orlando, Florida.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
    openingHours: ["Mo-Fr 08:00-18:00"],
    sameAs: [],
    serviceType: [
      "Interior house painting",
      "Orlando interior painting services",
      "Residential painters Orlando",
      "Interior painting estimate Orlando",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nubritepainting.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Location",
        item: "https://www.nubritepainting.com/location",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Orlando Interior House Painting",
        item: "https://www.nubritepainting.com/orlando/interior-house-painting",
      },
    ],
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-background text-foreground">
      <Routes>
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route
          path="/"
          element={
            <>
              <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
              </script>
              <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
              </script>
              <UtilityHeader />
              <main id="top" className="bg-background text-foreground">
                <HeroSection />
                <ServicesSections />
                <BottomCta />
                <QRCodeSection />
                <MobileQRFloat />
              </main>
              <SiteFooter />
              <ChatWidget />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <UtilityHeader />
              <main className="bg-background text-foreground">
                <FaqAccordionSection />
                <BottomCta />
                <QRCodeSection />
                <MobileQRFloat />
              </main>
              <SiteFooter />
              <ChatWidget />
            </>
          }
        />
        <Route path="/services" element={<ServicesMenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path={serviceCategoryPagePaths.residential}
          element={<ServiceCategoryRoutePage categoryId="residential" />}
        />
        <Route
          path={serviceCategoryPagePaths.exterior}
          element={<ServiceCategoryRoutePage categoryId="exterior" />}
        />
        <Route
          path={serviceCategoryPagePaths.commercial}
          element={<ServiceCategoryRoutePage categoryId="commercial" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

type ServiceDetail = {
  label: string;
  description: string;
  img: string;
  alt: string;
  process: string[];
};

const interiorServices: ServiceDetail[] = [
  {
    label: "Wall & Ceiling Painting",
    description: "Living spaces, bedrooms, and hallways",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/uploaded-asset-1789681798545-0.png",
    alt: "Couple reviewing paint color swatches in a room being painted blue-grey",
    process: [
      "Furniture moved & floors covered with drop cloths",
      "Walls wiped down; holes & cracks patched smooth",
      "Primer coat applied where needed for even coverage",
      "Two finish coats rolled on for consistent color",
      "Edges cut-in by brush for crisp, clean lines",
      "Cleanup & final walkthrough with you",
    ],
  },
  {
    label: "Trim, Baseboard & Crown Molding",
    description: "Crisp lines on doors, trim, and molding",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789682076419.png",
    alt: "Elegant room with freshly painted white crown molding, door trim, and baseboards against teal-blue walls",
    process: [
      "All surfaces lightly sanded & cleaned",
      "Adjacent walls & floors taped off carefully",
      "Primer applied to bare or stained wood",
      "Semi-gloss or gloss finish brushed on evenly",
      "Drips & runs caught and corrected while wet",
      "Tape removed for sharp, professional edges",
    ],
  },
  {
    label: "Kitchen & Bathroom",
    description: "Moisture-resistant finishes for wet rooms",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789682243063.png",
    alt: "Vibrant freshly painted modern kitchen and bathroom with colorful walls, white cabinets and professional painting work",
    process: [
      "Grease & moisture wiped from all surfaces",
      "Caulk applied around edges & fixtures",
      "Mold-resistant primer applied first",
      "Moisture-resistant finish paint rolled on",
      "Cabinets & hardware protected throughout",
      "Ventilation confirmed before final coat",
    ],
  },
  {
    label: "Closets, Stairwells & Entries",
    description: "Refreshing forgotten spaces",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789682476502.png",
    alt: "Vibrant interior collage showing a beautifully organized closet, elegant painted stairwell, and welcoming home entryway",
    process: [
      "Contents cleared or protected in place",
      "Tight corners & angles cut-in by hand",
      "Primer applied to high-wear scuff areas",
      "Durable finish coat rolled or brushed on",
      "Stair treads protected during drying",
      "Space returned to original order after work",
    ],
  },
  {
    label: "Move-In & Pre-Listing Updates",
    description: "Quick turnarounds for real estate",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789747645894.png",
    alt: "Freshly painted bright staged home rooms ready for move-in or real estate listing with painter doing quick turnaround updates",
    process: [
      "Walk-through to scope every room quickly",
      "Priority order set to match your timeline",
      "Patch, prime, and paint in one efficient visit",
      "Neutral, buyer-friendly colors recommended",
      "Rapid-dry products used to hit deadlines",
      "Clean handoff so staging can begin immediately",
    ],
  },
  {
    label: "Color Consultations",
    description: "Expert guidance on finishes and tones",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789682600450.png",
    alt: "Color consultant holding vibrant paint swatch fan deck with colorful paint chips and accent wall samples",
    process: [
      "Review your lighting, flooring & furnishings",
      "Discuss the mood & feel you want each room to have",
      "Fan-deck swatches narrowed to top candidates",
      "Sample patches applied on your actual walls",
      "Finish sheen (flat, eggshell, satin) selected per room",
      "Final color palette confirmed before any work begins",
    ],
  },
];

const commercialServices: ServiceDetail[] = [
  {
    label: "Commercial Interior Painting",
    description: "Offices, retail spaces & commercial interiors",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789838103202.png",
    alt: "Professional painters in white uniforms painting the interior of a bright modern commercial office space with large windows",
    process: [
      "Walk-through to scope all surfaces and square footage",
      "After-hours or weekend scheduling to minimize disruption",
      "Furniture, fixtures & flooring fully protected",
      "Low-VOC commercial-grade primer applied first",
      "Two finish coats rolled for consistent, professional coverage",
      "Final walk with property manager before sign-off",
    ],
  },
  {
    label: "Commercial Exterior Painting",
    description: "Storefronts, facades & building exteriors",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789750846309.png",
    alt: "Professional painters working on a commercial building facade exterior",
    process: [
      "Pressure wash and clean all exterior surfaces",
      "Caulk gaps around windows, doors and expansion joints",
      "Scrape, sand and prime any peeling or failing paint",
      "Elastomeric or commercial-grade finish applied by spray/roll",
      "Signage, glass and landscaping masked throughout",
      "Final inspection with building owner or manager",
    ],
  },
  {
    label: "Boom Lift High-Reach Painting",
    description: "Multi-story and high-elevation surfaces",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789750133257.png",
    alt: "Painter on a boom lift painting the high exterior facade of a multi-story commercial building",
    process: [
      "Site survey to confirm lift access and ground conditions",
      "All safety checks and OSHA protocols followed",
      "High-reach boom positioned for complete surface coverage",
      "Primer and two finish coats applied at elevation",
      "Overspray guards installed to protect adjacent areas",
      "Ground-level cleanup and equipment removed daily",
    ],
  },
  {
    label: "Scissor Lift Services",
    description: "Elevated interior & exterior access painting",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789838208783.png",
    alt: "Painter in white uniform on a scissor lift painting high interior ceilings and walls of a large commercial building",
    process: [
      "Scissor lift staged inside or outside as needed",
      "Floor protection laid under lift travel path",
      "High ceilings, soffits and upper walls cleaned first",
      "Primer and finish applied working section by section",
      "Adjacent surfaces masked to prevent overspray",
      "Lift removed and area restored before reopening",
    ],
  },
  {
    label: "Office & Retail Refresh",
    description: "Scheduled repaints with minimal downtime",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789838627823.png",
    alt: "Freshly painted bright modern open-plan office and retail storefront interior with clean light gray walls and professional finish",
    process: [
      "After-hours scheduling coordinated with your team",
      "Furniture and fixtures protected or relocated temporarily",
      "Walls, ceilings and trim refreshed efficiently",
      "Brand colors matched exactly to specs if provided",
      "Low-odor, fast-dry products used for quick turnaround",
      "Space ready for business the next morning",
    ],
  },
];

const exteriorServices: ServiceDetail[] = [
  {
    label: "Full Exterior House Repaint",
    description: "Complete color change or refresh",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789840076722.png",
    alt: "Large bright yellow two-story residential house with white trim, freshly painted exterior and clean curb appeal",
    process: [
      "Pressure wash entire exterior to remove dirt & mildew",
      "Caulk gaps around windows, doors & trim",
      "Sand & scrape any peeling or failing paint",
      "Prime bare wood & stucco patches",
      "Two coats of premium exterior finish applied",
      "Final inspection & touch-ups with homeowner",
    ],
  },
  {
    label: "Trim, Fascia, Soffit & Eaves",
    description: "Detail work around rooflines",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/uploaded-asset-1782344761568-0.png",
    alt: "Painters working on fascia soffit and eaves detail along residential roofline",
    process: [
      "Ladder & scaffold set safely at roofline height",
      "Old loose paint scraped & sanded smooth",
      "Wood rot noted & reported to homeowner",
      "Primer applied to bare or weathered wood",
      "Trim color brush-applied for clean edges",
      "Overspray on siding wiped clean",
    ],
  },
  {
    label: "Front Door & Shutters",
    description: "Curb appeal accent painting",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/uploaded-asset-1782346126961-0.png",
    alt: "Freshly painted navy blue front door with white shutters and lush landscaping",
    process: [
      "Door hardware & glass masked off carefully",
      "Surface scuffed & cleaned for adhesion",
      "Primer coat applied for bold color coverage",
      "Exterior-grade enamel brushed on in thin coats",
      "Shutters removed, painted flat, and rehung",
      "Hardware reinstalled after full cure time",
    ],
  },
  {
    label: "Garage Door & Fence",
    description: "Durable finishes for outdoor surfaces",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789747869220.png",
    alt: "Vibrant collage of freshly painted residential garage doors and wood fences in various colors and styles",
    process: [
      "Surface cleaned of dirt, oil & old flaking paint",
      "Metal garage panels sanded to dull the sheen",
      "Rust-inhibiting primer applied on metal surfaces",
      "Fence boards cleaned & dried completely",
      "Solid stain or exterior paint sprayed or rolled on",
      "Second coat applied after proper dry time",
    ],
  },
  {
    label: "Pressure Washing & Surface Prep",
    description: "Thorough cleaning before every coat",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789747760025.png",
    alt: "Professional pressure washing house exterior siding with high-pressure spray, surface prep, caulking and priming before painting",
    process: [
      "High-pressure rinse removes mildew, chalk & dirt",
      "Low-pressure tip used near windows & vents",
      "48-hour dry period before any paint applied",
      "Peeling areas scraped & feathered smooth",
      "Gaps & cracks caulked with paintable sealant",
      "Spot-prime bare areas before finish coat",
    ],
  },
  {
    label: "Caulking, Patching & Priming",
    description: "Residential sealing & prep for a lasting finish",
    img: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789748093425.png",
    alt: "Residential caulking gaps around windows, patching stucco, and priming exterior walls before painting",
    process: [
      "All gaps around windows, doors & siding caulked",
      "Stucco cracks filled with elastomeric patch",
      "Patched areas sanded flush with surrounding surface",
      "Full primer coat applied over repaired sections",
      "Primer extends to all bare wood & fresh patches",
      "Surface inspected before first finish coat begins",
    ],
  },
];

function ServicesDropdown({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="inline-flex min-h-11 items-center gap-1 rounded-full px-4 py-3 text-sm font-normal text-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Services
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-[820px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="border-b border-border px-6 py-4">
            <p className="text-sm font-semibold text-foreground">
              Service Menu
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Browse all NuBrite Painting service categories and details.
            </p>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-3">
            {servicesMenuGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.title}
                </p>
                <div className="flex flex-col gap-1">
                  {group.links.map((link) => (
                    <a
                      key={`${group.title}-${link.label}`}
                      href={link.href}
                      onClick={() => {
                        close();
                        onClose?.();
                      }}
                      className="rounded-lg px-2 py-2 text-left text-xs font-normal text-foreground transition-colors duration-150 hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-muted px-4 py-3">
            <a
              href="/services"
              onClick={() => {
                close();
                onClose?.();
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-hover"
            >
              Open full services page
              <ArrowRight size={16} weight="regular" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CommercialDropdown({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setSelectedService(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="inline-flex min-h-11 items-center gap-1 rounded-full px-4 py-3 text-sm font-normal text-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Commercial
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[780px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="border-b border-border px-6 py-4">
            <p className="text-sm font-semibold text-foreground">
              🏢 Commercial Painting Services
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Orlando-area offices, retail, warehouses & high-reach exteriors
            </p>
          </div>

          {selectedService ? (
            <ServiceDetailPanel
              service={selectedService}
              onClose={close}
              onBack={() => setSelectedService(null)}
              targetHref={serviceCategoryPagePaths.commercial}
            />
          ) : (
            <>
              <div className="grid grid-cols-[1fr_200px] divide-x divide-border">
                {/* Service photo grid */}
                <div className="grid grid-cols-3 gap-3 p-4">
                  {commercialServices.map((service) => (
                    <button
                      key={service.label}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="group overflow-hidden rounded-xl border border-border bg-background text-left transition-all duration-150 hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={service.img}
                          alt={service.alt}
                          width={200}
                          height={110}
                          className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium leading-tight text-foreground">
                          {service.label}
                        </p>
                        <p className="mt-1 text-xs font-normal leading-tight text-muted-foreground">
                          {service.description}
                        </p>
                        <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium text-primary">
                          Learn more <ArrowRight size={10} weight="regular" />
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick link list */}
                <div className="flex flex-col gap-1 p-4">
                  <p className="mb-2 px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Commercial Services
                  </p>
                  {commercialNavLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        const match = commercialServices.find(
                          (s) => s.label === link.label,
                        );
                        if (match) {
                          setSelectedService(match);
                        } else {
                          close();
                          onClose?.();
                          setTimeout(() => scrollToHash(link.href), 50);
                        }
                      }}
                      className="rounded-lg px-2 py-2 text-left text-xs font-normal text-foreground transition-colors duration-150 hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="border-t border-border bg-muted px-4 py-3">
                <a
                  href={serviceCategoryPagePaths.commercial}
                  onClick={() => {
                    close();
                    onClose?.();
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-hover"
                >
                  View all Commercial services
                  <ArrowRight size={16} weight="regular" />
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ServiceDetailPanel({
  service,
  onClose,
  onBack,
  targetHref,
}: {
  service: ServiceDetail;
  onClose: () => void;
  onBack: () => void;
  targetHref: string;
}) {
  return (
    <div className="flex flex-col">
      {/* Back button */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowRight size={13} weight="regular" className="rotate-180" />
          Back to services
        </button>
        <span className="text-xs text-muted-foreground/50">/</span>
        <span className="text-xs font-medium text-foreground">
          {service.label}
        </span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-[1fr_1.1fr] divide-x divide-border">
        {/* Left: photo + description */}
        <div className="p-4">
          <div className="overflow-hidden rounded-xl">
            <img
              src={service.img}
              alt={service.alt}
              width={400}
              height={220}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-foreground">
            {service.label}
          </h3>
          <p className="mt-1 text-xs font-normal leading-5 text-muted-foreground">
            {service.description}
          </p>
          <a
            href="#contact"
            onClick={() => {
              onClose();
              setTimeout(() => scrollToHash("#contact"), 50);
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get a Free Quote
            <ArrowRight size={13} weight="regular" />
          </a>
        </div>

        {/* Right: process steps */}
        <div className="p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <ol className="flex flex-col gap-2">
            {service.process.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-xs font-normal leading-5 text-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-muted px-4 py-3">
        <a
          href={targetHref}
          onClick={() => {
            onClose();
            setTimeout(() => navigateToDestination(targetHref), 50);
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-hover"
        >
          View all services in this category
          <ArrowRight size={16} weight="regular" />
        </a>
      </div>
    </div>
  );
}

function ResidentialDropdown({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"interior" | "exterior">(
    "interior",
  );
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setSelectedService(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  // Reset selected service when tab changes
  useEffect(() => {
    setSelectedService(null);
  }, [activeTab]);

  const services =
    activeTab === "interior" ? interiorServices : exteriorServices;
  const detailPageHref =
    activeTab === "interior"
      ? serviceCategoryPagePaths.residential
      : serviceCategoryPagePaths.exterior;
  const navLinks =
    activeTab === "interior" ? interiorNavLinks : exteriorNavLinks;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="inline-flex min-h-11 items-center gap-1 rounded-full px-4 py-3 text-sm font-normal text-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Residential
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[780px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Tab header */}
          <div className="flex border-b border-border">
            <button
              type="button"
              onClick={() => setActiveTab("interior")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none ${
                activeTab === "interior"
                  ? "border-b-2 border-primary bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              🏠 Interior Painting
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("exterior")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none ${
                activeTab === "exterior"
                  ? "border-b-2 border-primary bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              🏡 Exterior Painting
            </button>
          </div>

          {/* Detail panel OR service grid */}
          {selectedService ? (
            <ServiceDetailPanel
              service={selectedService}
              onClose={close}
              onBack={() => setSelectedService(null)}
              targetHref={detailPageHref}
            />
          ) : (
            <>
              {/* Two-column layout: photo cards + quick links */}
              <div className="grid grid-cols-[1fr_200px] divide-x divide-border">
                {/* Service photo grid — click opens detail panel */}
                <div className="grid grid-cols-3 gap-3 p-4">
                  {services.map((service) => (
                    <button
                      key={service.label}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="group overflow-hidden rounded-xl border border-border bg-background text-left transition-all duration-150 hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={service.img}
                          alt={service.alt}
                          width={200}
                          height={110}
                          className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium leading-tight text-foreground">
                          {service.label}
                        </p>
                        <p className="mt-1 text-xs font-normal leading-tight text-muted-foreground">
                          {service.description}
                        </p>
                        <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium text-primary">
                          Learn more <ArrowRight size={10} weight="regular" />
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick link list */}
                <div className="flex flex-col gap-1 p-4">
                  <p className="mb-2 px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {activeTab === "interior" ? "Interior" : "Exterior"}{" "}
                    Services
                  </p>
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        const match = services.find(
                          (s) => s.label === link.label,
                        );
                        if (match) {
                          setSelectedService(match);
                        } else {
                          close();
                          onClose?.();
                          setTimeout(() => scrollToHash(link.href), 50);
                        }
                      }}
                      className="rounded-lg px-2 py-2 text-left text-xs font-normal text-foreground transition-colors duration-150 hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="border-t border-border bg-muted px-4 py-3">
                <a
                  href={detailPageHref}
                  onClick={() => {
                    close();
                    onClose?.();
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-hover"
                >
                  View all {activeTab === "interior" ? "Interior" : "Exterior"}{" "}
                  services
                  <ArrowRight size={16} weight="regular" />
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function UtilityHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div
        className={`transition-all duration-200 ease-in-out ${isCondensed ? "py-1.5" : "py-2 sm:py-3"}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-3 sm:px-6 lg:px-8">
          <div className="flex min-h-14 items-center justify-between gap-3 border-b border-border pb-2 sm:min-h-16 sm:gap-6 sm:pb-3">
            <a
              href="/"
              className="inline-flex items-center rounded-full px-1 py-1 transition-all duration-200 ease-in-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="NuBrite Painting of Orlando home"
            >
              <img
                src="https://c.animaapp.com/mouf8r47O98IqE/img/uploaded-asset-1783300566123-0.png"
                alt="NuBrite Painting and Texture Designs logo"
                className="h-9 w-auto object-contain sm:h-12 lg:h-14"
              />
            </a>

            <div className="hidden items-center gap-4 lg:flex">
              <a
                href={phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-secondary px-4 py-3 text-sm font-normal text-secondary-foreground transition-all duration-200 ease-in-out hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Call NuBrite Painting of Orlando at (407) 429-5586"
              >
                <Phone size={32} weight="regular" />
                <span className="text-secondary-foreground">
                  {phoneDisplay}
                </span>
              </a>
              <div className="inline-flex items-center gap-2 px-2 py-2">
                <MapPin size={32} weight="regular" className="text-primary" />
                <span className="text-sm font-normal text-foreground">
                  Orlando, FL
                </span>
              </div>
              <div className="flex items-center gap-2">
                {utilityLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-full px-3 py-3 text-sm font-normal text-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-card px-3 py-2 text-card-foreground transition-all duration-200 ease-in-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-11 sm:px-4 sm:py-3 lg:hidden"
            >
              {isMenuOpen ? (
                <X size={22} weight="regular" className="sm:hidden" />
              ) : (
                <List size={22} weight="regular" className="sm:hidden" />
              )}
              {isMenuOpen ? (
                <X size={28} weight="regular" className="hidden sm:block" />
              ) : (
                <List size={28} weight="regular" className="hidden sm:block" />
              )}
              <span className="sr-only">Toggle navigation menu</span>
            </button>
          </div>

          <div className="hidden min-h-16 items-center justify-between pt-3 lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap gap-2">
                <NavigationMenuItem key="services-main-menu">
                  <ServicesDropdown />
                </NavigationMenuItem>
                {navItems.map((item) =>
                  item.children ? (
                    <NavigationMenuItem key={item.label}>
                      <ResidentialDropdown />
                    </NavigationMenuItem>
                  ) : item.label === "Commercial" ? (
                    <NavigationMenuItem key={item.label}>
                      <CommercialDropdown />
                    </NavigationMenuItem>
                  ) : item.label === "FAQ" ? (
                    <NavigationMenuItem key={item.label}>
                      <a
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault();
                          navigateToDestination(item.href);
                        }}
                        className="inline-flex min-h-11 items-center rounded-full px-4 py-3 text-sm font-normal text-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        FAQ
                      </a>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.label}>
                      <a
                        href={item.href}
                        className="inline-flex min-h-11 items-center rounded-full px-4 py-3 text-sm font-normal text-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {item.label}
                      </a>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
            <a
              href="/#contact"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-3 text-sm font-normal text-primary-foreground transition-all duration-200 ease-in-out hover:scale-[1.01] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Request a Quote
            </a>
          </div>

          {isMenuOpen ? (
            <div
              id="mobile-navigation"
              className="mt-2 max-h-[80vh] overflow-y-auto rounded-2xl border border-border bg-card p-3 sm:mt-3 sm:p-4 lg:hidden"
            >
              {/* Contact info bar */}
              <div className="mb-3 flex flex-col gap-2 border-b border-border pb-3 sm:gap-3 sm:pb-4">
                <a
                  href={phoneHref}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-sm font-normal text-secondary-foreground transition-all duration-200 ease-in-out hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-11 sm:py-3"
                >
                  <Phone size={20} weight="regular" />
                  <span className="text-secondary-foreground">
                    {phoneDisplay}
                  </span>
                </a>
                <div className="inline-flex min-h-10 items-center gap-2 rounded-full bg-muted px-4 py-2.5">
                  <MapPin size={20} weight="regular" className="text-primary" />
                  <span className="text-sm font-normal text-foreground">
                    Orlando, FL
                  </span>
                </div>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1">
                {/* Services menu */}
                <p className="px-3 pt-1 pb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Services
                </p>
                <a
                  href="/services"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex min-h-10 items-center rounded-xl px-5 py-2.5 text-sm font-normal text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Open full services menu
                </a>

                {/* Residential section */}
                <p className="px-3 pt-1 pb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Residential
                </p>
                <p className="px-5 pb-0.5 text-xs font-medium text-muted-foreground">
                  🏠 Interior
                </p>
                {interiorNavLinks.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => navigateToDestination(sub.href), 50);
                    }}
                    className="flex min-h-10 items-center rounded-xl px-7 py-2 text-sm font-normal text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {sub.label}
                  </a>
                ))}
                <p className="px-5 pt-2 pb-0.5 text-xs font-medium text-muted-foreground">
                  🏡 Exterior
                </p>
                {exteriorNavLinks.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => navigateToDestination(sub.href), 50);
                    }}
                    className="flex min-h-10 items-center rounded-xl px-7 py-2 text-sm font-normal text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {sub.label}
                  </a>
                ))}

                {/* Top-level nav items (skip Residential which is rendered above) */}
                <div className="my-1 border-t border-border" />
                {navItems
                  .filter((item) => !item.children)
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(event) => {
                        setIsMenuOpen(false);
                        if (item.label === "FAQ") {
                          event.preventDefault();
                          setTimeout(
                            () => navigateToDestination(item.href),
                            50,
                          );
                        }
                      }}
                      className="flex min-h-10 items-center rounded-xl px-3 py-2.5 text-sm font-normal text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </a>
                  ))}
                {utilityLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-10 items-center rounded-xl px-3 py-2.5 text-sm font-normal text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-3 border-t border-border pt-3">
                <a
                  href="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex min-h-10 w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-normal text-primary-foreground transition-all duration-200 ease-in-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Request a Quote
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

const heroCarouselPhotos = [
  {
    src: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789757415011.png",
    alt: "Modern vibrant luxury interior living room with freshly painted warm sage green walls and bright white crown molding",
  },
  {
    src: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789682076419.png",
    alt: "Elegant finished interior room with crisp white crown molding, door trim, and rich teal accent walls",
  },
  {
    src: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789682243063.png",
    alt: "Vibrant freshly painted modern kitchen with bold colorful walls and white cabinets",
  },
  {
    src: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789751265621.png",
    alt: "Beautifully finished residential living room with freshly painted warm neutral walls and modern decor",
  },
  {
    src: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789755356276.png",
    alt: "Crisp two-story suburban home exterior with fresh professional paint job and clean curb appeal",
  },
];

/* Inject flash+zoom keyframes once into <head> */
const FLASH_STYLE_ID = "hero-carousel-keyframes";

function ensureHeroCarouselStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(FLASH_STYLE_ID)) return;

  const styleEl = document.createElement("style");
  styleEl.id = FLASH_STYLE_ID;
  styleEl.textContent = `
    @keyframes carouselFlash {
      0%   { opacity: 0; }
      15%  { opacity: 0.85; }
      100% { opacity: 0; }
    }
    @keyframes carouselZoomIn {
      0%   { opacity: 0; transform: scale(1.13); }
      18%  { opacity: 1; }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes carouselZoomOut {
      0%   { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.94); }
    }
    .carousel-flash {
      animation: carouselFlash 0.42s ease-out forwards;
    }
    .carousel-zoom-in {
      animation: carouselZoomIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    .carousel-zoom-out {
      animation: carouselZoomOut 0.38s ease-in forwards;
    }
  `;
  document.head.appendChild(styleEl);
}

function HeroPhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [flashKey, setFlashKey] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ensureHeroCarouselStyles();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (locked || next === current) return;
      setLocked(true);
      setFlashKey((k) => k + 1);
      window.setTimeout(() => {
        setPrev(current);
        setCurrent(next);
        setAnimKey((k) => k + 1);
        window.setTimeout(() => {
          setPrev(null);
          setLocked(false);
        }, 600);
      }, 80);
    },
    [current, locked],
  );

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      goTo((current + 1) % heroCarouselPhotos.length);
    }, 3800);
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [current, goTo]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/15">
      {heroCarouselPhotos.map((photo, index) => {
        const isActive = index === current;
        const isPrev = index === prev;
        const isHidden = !isActive && !isPrev;
        const imgKey = isActive ? `${photo.src}-${animKey}` : photo.src;
        return (
          <img
            key={imgKey}
            src={photo.src}
            alt={photo.alt}
            width={1200}
            height={900}
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover ${
              isActive ? "carousel-zoom-in" : isPrev ? "carousel-zoom-out" : ""
            }`}
            style={
              {
                opacity: isHidden ? 0 : undefined,
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              } as React.CSSProperties
            }
          />
        );
      })}

      {/* White flash burst overlay — re-triggers via key */}
      <div
        key={`flash-${flashKey}`}
        className={`pointer-events-none absolute inset-0 z-10 bg-white ${flashKey > 0 ? "carousel-flash" : "opacity-0"}`}
      />

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
        {heroCarouselPhotos.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to photo ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nodes = contentRef.current?.querySelectorAll("[data-hero-item]");
    if (!nodes?.length) return;

    nodes.forEach((node, index) => {
      const element = node as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(14px)";
      window.setTimeout(
        () => {
          element.style.transition =
            "opacity 0.6s ease-in-out, transform 0.6s ease-in-out";
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        },
        120 + index * 120,
      );
    });
  }, []);

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-gradient-hero"
      aria-labelledby="hero-heading"
    >
      {/* Hero background */}
      <div className="absolute inset-0">
        <img
          src="https://c.animaapp.com/mouf8r47O98IqE/img/ai_1.png"
          alt="Professional painter in white uniform painting a residential interior"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-6 px-3 py-8 sm:px-6 sm:py-14 sm:gap-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-24">
        <div ref={contentRef} className="flex flex-col justify-center">
          <h1
            id="hero-heading"
            data-hero-item
            className="mt-1 max-w-3xl text-2xl font-medium tracking-tight text-hero-foreground sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            NuBrite Painting of Orlando!
          </h1>
          <p
            data-hero-item
            className="mt-3 max-w-2xl text-sm font-normal leading-6 text-hero-foreground/85 sm:text-base sm:leading-7"
          >
            Residential &amp; Commercial Painting. Trusted by Orlando homeowners
            and businesses alike.
          </p>
          <a
            data-hero-item
            href={phoneHref}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-normal text-hero-foreground transition-all duration-200 ease-in-out hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:mt-5 sm:gap-3 sm:px-5 sm:py-4 sm:text-base"
            aria-label="Call NuBrite Painting of Orlando at (407) 429-5586"
          >
            <Phone size={18} weight="regular" />
            <span className="text-hero-foreground">{phoneDisplay}</span>
          </a>
          <div data-hero-item className="mt-4 sm:mt-6">
            <a
              href="/contact"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-tertiary px-4 py-2.5 text-sm font-normal text-tertiary-foreground transition-all duration-200 ease-in-out hover:scale-[1.01] hover:bg-tertiary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-11 sm:px-6 sm:py-4 sm:text-base"
            >
              View Location &amp; Hours
              <ArrowRight size={16} weight="regular" />
            </a>
          </div>
          <div
            data-hero-item
            className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3 xl:grid-cols-4"
          >
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 sm:min-h-14 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  <Icon
                    size={16}
                    weight="regular"
                    className="shrink-0 text-hero-foreground sm:hidden"
                  />
                  <Icon
                    size={22}
                    weight="regular"
                    className="hidden shrink-0 text-hero-foreground sm:block"
                  />
                  <span className="text-xs font-normal text-hero-foreground">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo carousel — hidden on mobile, shown sm+ */}
        <div className="hidden items-center sm:flex">
          <div className="w-full" style={{ height: "300px" }}>
            <HeroPhotoCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Inline service detail modal used on the home page ── */
function ServiceDetailModal({
  service,
  onClose,
}: {
  service: ServiceDetail;
  onClose: () => void;
}) {
  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={service.label}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-sm font-semibold text-foreground">
            {service.label}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <X size={18} weight="regular" />
          </button>
        </div>

        {/* Body — photo left, process right */}
        <div className="grid sm:grid-cols-[1fr_1.1fr] divide-y sm:divide-y-0 sm:divide-x divide-border max-h-[75vh] overflow-y-auto">
          {/* Photo + description */}
          <div className="p-5">
            <div className="overflow-hidden rounded-xl">
              <img
                src={service.img}
                alt={service.alt}
                width={400}
                height={220}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {service.label}
            </h3>
            <p className="mt-1 text-xs font-normal leading-5 text-muted-foreground">
              {service.description}
            </p>
            <a
              href="#contact"
              onClick={() => {
                onClose();
                setTimeout(() => scrollToHash("#contact"), 50);
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Get a Free Quote
              <ArrowRight size={13} weight="regular" />
            </a>
          </div>

          {/* Process steps */}
          <div className="p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              How It Works
            </p>
            <ol className="flex flex-col gap-2">
              {service.process.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-xs font-normal leading-5 text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

type ServiceCategoryCard = {
  text: string;
  key: string;
};

type ServiceCategoryContent = {
  id: "residential" | "exterior" | "commercial";
  title: string;
  paragraphs: {
    full: string[];
    summary: string[];
  };
  firstParagraphMarginClass: string;
  image: {
    src: string;
    alt: string;
    minHeightClass: string;
  };
  cards: ServiceCategoryCard[];
  detailsByKey: Record<string, ServiceDetail>;
  cta: {
    label: string;
    href: string;
  };
};

const serviceCategoryPagePaths: Record<ServiceCategoryContent["id"], string> = {
  residential: "/residential-interior",
  exterior: "/residential-exterior",
  commercial: "/commercial",
};

/* Map plain text labels to their ServiceDetail objects */
const interiorLabelMap: Record<string, ServiceDetail> = Object.fromEntries(
  interiorServices.map((s) => [s.label, s]),
);
const exteriorLabelMap: Record<string, ServiceDetail> = Object.fromEntries(
  exteriorServices.map((s) => [s.label, s]),
);
const commercialLabelMap: Record<string, ServiceDetail> = Object.fromEntries(
  commercialServices.map((s) => [s.label, s]),
);

const serviceCategoryContent: Record<
  ServiceCategoryContent["id"],
  ServiceCategoryContent
> = {
  residential: {
    id: "residential",
    title: "Interior Residential Painting in Orlando, FL",
    paragraphs: {
      full: [
        "NuBrite Painting provides detail-focused interior residential painting for Orlando homeowners who want clean execution, organized prep, and a finish that looks professionally maintained for years.",
        "From walls and ceilings to trim and high-traffic spaces, our team uses premium products and consistent application methods to deliver smooth coverage, crisp lines, and a polished result aligned with your home&#39;s style.",
      ],
      summary: [
        "Detail-focused interior painting for Orlando homeowners with clean prep, premium products, and polished finishes built to last.",
      ],
    },
    firstParagraphMarginClass: "mt-4",
    image: {
      src: "https://c.animaapp.com/mouf8r47O98IqE/img/uploaded-asset-1789681798545-0.png",
      alt: "Interior residential room with fresh wall and ceiling paint",
      minHeightClass: "min-h-[220px]",
    },
    cards: [
      {
        text: "Wall and ceiling painting for living spaces, bedrooms, and hallways",
        key: "Wall & Ceiling Painting",
      },
      {
        text: "Trim, baseboard, crown molding, and door painting",
        key: "Trim, Baseboard & Crown Molding",
      },
      {
        text: "Kitchen, bathroom, and laundry room repaints",
        key: "Kitchen & Bathroom",
      },
      {
        text: "Closet, stairwell, and entryway refreshes",
        key: "Closets, Stairwells & Entries",
      },
      {
        text: "Move-in and pre-listing interior updates",
        key: "Move-In & Pre-Listing Updates",
      },
      {
        text: "Color consultations and finish recommendations",
        key: "Color Consultations",
      },
    ],
    detailsByKey: interiorLabelMap,
    cta: {
      label: "View Interior Service Page",
      href: serviceCategoryPagePaths.residential,
    },
  },
  exterior: {
    id: "exterior",
    title: "Exterior Residential Painting in Orlando, FL",
    paragraphs: {
      full: [
        "Orlando&#39;s heat, humidity, and afternoon storms demand more from exterior paint than in most other climates. NuBrite Painting uses premium exterior-grade products from Sherwin-Williams and Benjamin Moore specifically formulated for Florida&#39;s UV exposure and moisture cycles, so your home&#39;s finish holds up year after year.",
        "Our exterior residential painting process starts with thorough surface preparation — pressure washing, caulking gaps and cracks, sanding peeling areas, and priming bare surfaces — before a single drop of finish coat is applied. Proper prep is what separates a paint job that fades or peels in two years from one that stays fresh for ten.",
      ],
      summary: [
        "Florida-ready exterior painting with weather-resistant products and thorough prep for lasting curb appeal.",
      ],
    },
    firstParagraphMarginClass: "mt-5",
    image: {
      src: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1787254898217.png",
      alt: "Painter on ladder painting a residential exterior wall",
      minHeightClass: "min-h-[260px]",
    },
    cards: [
      {
        text: "Full exterior house repaints and color changes",
        key: "Full Exterior House Repaint",
      },
      {
        text: "Trim, fascia, soffit, and eave painting",
        key: "Trim, Fascia, Soffit & Eaves",
      },
      { text: "Front door and shutter painting", key: "Front Door & Shutters" },
      { text: "Garage door and fence painting", key: "Garage Door & Fence" },
      {
        text: "Pressure washing and surface preparation",
        key: "Pressure Washing & Surface Prep",
      },
      {
        text: "Caulking, patching, and priming before paint",
        key: "Caulking, Patching & Priming",
      },
    ],
    detailsByKey: exteriorLabelMap,
    cta: {
      label: "View Exterior Service Page",
      href: serviceCategoryPagePaths.exterior,
    },
  },
  commercial: {
    id: "commercial",
    title: "Commercial Painting Services in Orlando, FL",
    paragraphs: {
      full: [
        "NuBrite Painting serves Orlando-area businesses, property managers, and commercial clients who need reliable, professional results with minimal disruption to operations. From office interiors and retail storefronts to warehouses and multi-story facades, our commercial team is equipped with the right tools — including boom lifts and scissor lifts — to handle any scale of project.",
        "We schedule around your business hours, protect your property throughout, and use commercial-grade products built to last in Florida&#39;s climate. Whether you need a single-suite refresh or a full building repaint, we deliver clean, professional work on time.",
      ],
      summary: [
        "Reliable Orlando commercial painting with flexible scheduling, lift access, and durable finishes for active business environments.",
      ],
    },
    firstParagraphMarginClass: "mt-5",
    image: {
      src: "https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789838103202.png",
      alt: "Commercial painting crew working inside a modern office space",
      minHeightClass: "min-h-[260px]",
    },
    cards: commercialServices.map((service) => ({
      key: service.label,
      text: `${service.label} — ${service.description}`,
    })),
    detailsByKey: commercialLabelMap,
    cta: {
      label: "View Commercial Service Page",
      href: serviceCategoryPagePaths.commercial,
    },
  },
};

function ServiceCategorySection({
  content,
  wrapperClassName,
  onSelectService,
  variant = "full",
  showCta = false,
  ctaLabelOverride,
  ctaHrefOverride,
}: {
  content: ServiceCategoryContent;
  wrapperClassName: string;
  onSelectService: (service: ServiceDetail) => void;
  variant?: "full" | "summary";
  showCta?: boolean;
  ctaLabelOverride?: string;
  ctaHrefOverride?: string;
}) {
  const paragraphCopy =
    variant === "summary"
      ? content.paragraphs.summary
      : content.paragraphs.full;
  const cardsToRender =
    variant === "summary" ? content.cards.slice(0, 3) : content.cards;

  return (
    <div id={content.id} className={wrapperClassName}>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-8">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            {content.title}
          </h3>
          {paragraphCopy.map((paragraph, index) => (
            <p
              key={`${content.id}-paragraph-${index}`}
              className={`${index === 0 ? content.firstParagraphMarginClass : "mt-4"} text-base font-normal leading-7 text-muted-foreground`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-border">
          <img
            src={content.image.src}
            alt={content.image.alt}
            width={1200}
            height={900}
            className={`h-full ${content.image.minHeightClass} w-full object-cover`}
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {cardsToRender.map((card) => {
          const detail = content.detailsByKey[card.key];
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => detail && onSelectService(detail)}
              className="group rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 sm:p-5 text-left transition-all duration-150 hover:border-primary hover:bg-primary-soft/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <p className="text-base font-normal leading-7 text-card-foreground">
                {card.text}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                View details <ArrowRight size={11} weight="regular" />
              </p>
            </button>
          );
        })}
      </div>
      {showCta ? (
        <div className="mt-5">
          <a
            href={ctaHrefOverride ?? content.cta.href}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 ease-in-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {ctaLabelOverride ?? content.cta.label}
            <ArrowRight size={14} weight="regular" />
          </a>
        </div>
      ) : null}
    </div>
  );
}

function ContactPage() {
  return (
    <>
      <UtilityHeader />
      <main className="bg-background text-foreground">
        <ContactMapSection />
        <QRCodeSection />
        <MobileQRFloat />
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}

function ServicesMenuPage() {
  const serviceCards = [
    {
      title: "Interior Residential Painting",
      description:
        "Walls, ceilings, trim, and complete room refreshes for Orlando homes.",
      href: serviceCategoryPagePaths.residential,
    },
    {
      title: "Exterior Residential Painting",
      description:
        "Weather-ready exterior painting with full prep for lasting curb appeal.",
      href: serviceCategoryPagePaths.exterior,
    },
    {
      title: "Commercial Painting",
      description:
        "Professional interior and exterior services for offices, retail, and facilities.",
      href: serviceCategoryPagePaths.commercial,
    },
  ];

  return (
    <>
      <UtilityHeader />
      <main className="bg-background text-foreground">
        <section className="bg-background py-8 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Services Menu
            </h1>
            <p className="mt-4 max-w-3xl text-base font-normal leading-7 text-muted-foreground">
              Explore every NuBrite Painting service category and open the page
              that matches your project.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="group rounded-3xl border border-border bg-card p-5 transition-all duration-150 hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <h2 className="text-lg font-medium tracking-tight text-foreground">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm font-normal leading-6 text-muted-foreground">
                    {card.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open page <ArrowRight size={14} weight="regular" />
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
        <BottomCta />
        <ContactMapSection />
        <QRCodeSection />
        <MobileQRFloat />
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}

function ServiceCategoryRoutePage({
  categoryId,
}: {
  categoryId: ServiceCategoryContent["id"];
}) {
  const [activeModal, setActiveModal] = useState<ServiceDetail | null>(null);
  const categoryContent = serviceCategoryContent[categoryId];

  return (
    <>
      {activeModal ? (
        <ServiceDetailModal
          service={activeModal}
          onClose={() => setActiveModal(null)}
        />
      ) : null}
      <UtilityHeader />
      <main className="bg-background text-foreground">
        <section className="bg-background py-8 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <a
              href="/#about"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-normal text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowRight size={14} weight="regular" className="rotate-180" />
              Back to all services
            </a>

            <ServiceCategorySection
              content={categoryContent}
              wrapperClassName="mt-5 rounded-3xl border border-border bg-card p-5 sm:p-8"
              variant="full"
              showCta
              ctaLabelOverride="Get a Free Estimate"
              ctaHrefOverride="/#contact"
              onSelectService={setActiveModal}
            />
          </div>
        </section>
        <BottomCta />
        <ContactMapSection />
        <QRCodeSection />
        <MobileQRFloat />
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}

function ServicesSections() {
  return (
    <section id="about" className="bg-background py-8 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="max-w-none">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-8">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                About NuBrite Painting of Orlando
              </h2>
              <p className="mt-6 text-base font-normal leading-7 text-muted-foreground">
                If you are searching for interior house painters in Orlando, FL,
                NuBrite Painting delivers a cleaner, more organized experience
                built around your home and your schedule. We help homeowners
                refresh bedrooms, living rooms, kitchens, hallways, ceilings,
                trim, and more with dependable prep, consistent communication,
                and beautiful finishes that last.
              </p>
              <p className="mt-4 text-base font-normal leading-7 text-muted-foreground">
                Our Orlando interior painting services are designed to make the
                process easier from the start. That means clear estimates,
                careful protection of your furniture and flooring, and detailed
                workmanship from a professional residential painters Orlando
                team. Whether you are updating one room or planning a larger
                transformation, we focus on smooth execution and a finished
                result that feels polished and welcoming.
              </p>
              <p className="mt-4 text-base font-normal leading-7 text-muted-foreground">
                We regularly work with premium paint systems from
                Sherwin-Williams and Benjamin Moore, helping homeowners select
                colors and finishes that match the way they live. If you are
                comparing options for a residential repaint, a move-in refresh,
                or an interior painting estimate Orlando homeowners can trust,
                our team is ready to help.
              </p>
            </div>
            <Card className="overflow-hidden border-border bg-card">
              <img
                src="https://c.animaapp.com/mouf8r47O98IqE/img/ai_2.png"
                alt="Painters preparing room with drop cloths for interior painting"
                width={1200}
                height={900}
                className="h-full min-h-[280px] w-full object-cover"
                loading="lazy"
              />
            </Card>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-gradient-surface p-5 sm:mt-10 sm:p-8">
            <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              Why Hire a Professional Orlando Painting Company?
            </h3>
            <p className="mt-5 text-base font-normal leading-7 text-muted-foreground">
              Professional painters deliver a better finish, stronger surface
              prep, and a smoother project timeline than most DIY attempts.
              NuBrite Painting follows a proven process so every room feels
              polished, protected, and ready to enjoy.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="overflow-hidden rounded-2xl border border-primary/20 bg-primary-soft/60">
                <img
                  src="https://c.animaapp.com/mouf8r47O98IqE/img/ai_1.png"
                  alt="Professional painter applying paint with clean prep in a residential interior"
                  width={1200}
                  height={900}
                  className="h-36 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h4 className="text-base font-medium text-foreground">
                    Better Preparation
                  </h4>
                  <p className="mt-2 text-sm font-normal leading-6 text-muted-foreground">
                    Proper patching, sanding, masking, and priming create a
                    cleaner final look and longer-lasting paint performance.
                  </p>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-secondary/30 bg-secondary/10">
                <img
                  src="https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789682076419.png"
                  alt="Freshly painted trim and molding with crisp lines and smooth coverage"
                  width={1200}
                  height={900}
                  className="h-36 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h4 className="text-base font-medium text-foreground">
                    Professional Finish Quality
                  </h4>
                  <p className="mt-2 text-sm font-normal leading-6 text-muted-foreground">
                    Experienced application and premium products deliver smooth
                    coverage, consistent color, and sharp detail throughout.
                  </p>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-tertiary/30 bg-tertiary/15">
                <img
                  src="https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789750133257.png"
                  alt="Commercial painter working at height with proper equipment and safety setup"
                  width={1200}
                  height={900}
                  className="h-36 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h4 className="text-base font-medium text-foreground">
                    Safer, Faster Completion
                  </h4>
                  <p className="mt-2 text-sm font-normal leading-6 text-muted-foreground">
                    From ladders and lift access to daily cleanup and
                    scheduling, our team keeps the work moving safely and
                    efficiently.
                  </p>
                </div>
              </article>
            </div>

            <p className="mt-5 text-base font-normal leading-7 text-muted-foreground">
              If you are ready to get started, call{" "}
              <a
                href={phoneHref}
                className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {phoneDisplay}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {supportEmail}
              </a>{" "}
              for a free estimate and next steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordionSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 bg-gradient-surface py-8 md:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="text-sm font-normal uppercase tracking-[0.12em] text-primary">
              Frequently Asked Questions
            </p>
            <h2 className="mt-3 text-xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Answers to common Orlando painting questions
            </h2>
            <p className="mt-5 text-base font-normal leading-7 text-muted-foreground">
              Review common questions about pricing, timelines, warranty, and
              service-area details before requesting your estimate.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-primary/20 bg-primary-soft/50">
                <img
                  src="https://c.animaapp.com/mouf8r47O98IqE/img/ai_1.png"
                  alt="Professional painter working on an interior project"
                  width={900}
                  height={700}
                  className="h-28 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground">
                    Trusted process
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Prep, protection, and clean execution are built into every
                    project.
                  </p>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-secondary/25 bg-secondary/10">
                <img
                  src="https://c.animaapp.com/mouf8r47O98IqE/img/generated-image-1789755356276.png"
                  alt="Freshly painted residential exterior in Orlando"
                  width={900}
                  height={700}
                  className="h-28 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground">
                    Florida-ready finishes
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Premium products selected for Orlando heat, humidity, and UV
                    exposure.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="p-5 sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-base font-medium text-foreground">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal leading-6 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="bg-secondary py-8 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/15 bg-secondary px-4 py-6 sm:rounded-3xl sm:px-8 sm:py-10 md:px-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-secondary-foreground sm:text-3xl lg:text-4xl">
                Have an interior painting project on the horizon?
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-7 text-secondary-foreground/90">
                Talk with our Orlando team about your rooms, timeline, and
                goals. We make it easy to get clear next steps and a
                professional estimate.
              </p>
              <a
                href={phoneHref}
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-4 text-base font-normal text-secondary-foreground transition-all duration-200 ease-in-out hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <Phone size={32} weight="regular" />
                <span className="text-secondary-foreground">
                  {phoneDisplay}
                </span>
              </a>
            </div>
            <div className="flex lg:justify-end">
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-tertiary px-6 py-4 text-base font-normal text-tertiary-foreground transition-all duration-200 ease-in-out hover:scale-[1.01] hover:bg-tertiary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Get a Free Estimate Today
                <ArrowRight size={32} weight="regular" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function validateLeadForm(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!data.name.trim()) errors.name = "Please enter your full name.";
  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[0-9()+\-\s]{10,}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.zipCode.trim()) {
    errors.zipCode = "Please enter your ZIP code.";
  } else if (!/^\d{5}(-\d{4})?$/.test(data.zipCode.trim())) {
    errors.zipCode = "Please enter a valid ZIP code.";
  }

  if (!data.projectDetails.trim()) {
    errors.projectDetails = "Please tell us about your project.";
  } else if (data.projectDetails.trim().length < 20) {
    errors.projectDetails =
      "Please provide a few more details so we can prepare accurately.";
  }

  if (!data.consent)
    errors.consent = "Please agree before submitting your request.";
  if (data.company.trim()) errors.company = "Spam detected.";

  return errors;
}

async function sendLeadAutoReplyEmail(lead: {
  name: string;
  email: string;
  zipCode: string;
  projectDetails: string;
}) {
  const autoReplyBody = [
    `Hi ${lead.name},`,
    "",
    "Thank you for contacting NuBrite Painting of Orlando for your free estimate.",
    `Our team will review your project details and follow up ${expectedResponseWindow}.`,
    "",
    "If you need immediate help, contact us directly:",
    `Phone: ${phoneDisplay}`,
    `Email: ${supportEmail}`,
    "Hours: Monday to Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 2:00 PM",
    "",
    "We appreciate the opportunity to serve your home painting project.",
    "",
    "NuBrite Painting of Orlando",
  ].join("\n");

  const response = await fetch(`https://formsubmit.co/ajax/${supportEmail}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      zipCode: lead.zipCode,
      message: lead.projectDetails,
      _subject: `New Quote Request from ${lead.name}`,
      _replyto: lead.email,
      _template: "table",
      _captcha: "false",
      _autoresponse: autoReplyBody,
    }),
  });

  if (!response.ok) {
    throw new Error("Auto-reply request failed");
  }
}

function ContactMapSection() {
  const { create, isPending, error } = useMutation("LeadSubmission");
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    zipCode: "",
    projectDetails: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [autoReplyFailed, setAutoReplyFailed] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleBlur = (field: keyof LeadFormData) => {
    const nextErrors = validateLeadForm(formData);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateLeadForm(formData);
    setErrors(nextErrors);
    setSubmissionError(null);
    setAutoReplyFailed(false);

    if (Object.values(nextErrors).some(Boolean)) return;

    const leadPayload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      zipCode: formData.zipCode.trim(),
      projectDetails: formData.projectDetails.trim(),
      consent: formData.consent,
    };

    try {
      await create(leadPayload);

      let emailFailed = false;
      try {
        await sendLeadAutoReplyEmail({
          name: leadPayload.name,
          email: leadPayload.email,
          zipCode: leadPayload.zipCode,
          projectDetails: leadPayload.projectDetails,
        });
      } catch {
        emailFailed = true;
      }

      setAutoReplyFailed(emailFailed);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        zipCode: "",
        projectDetails: "",
        consent: false,
        company: "",
      });
      setErrors({});
    } catch {
      setSubmissionError(
        `We could not submit your request right now. Please call us at ${phoneDisplay}.`,
      );
    }
  };

  return (
    <section id="contact" className="bg-background py-8 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <p className="text-sm font-normal uppercase tracking-[0.12em] text-primary">
            Contact & Location
          </p>
          <h2 className="mt-3 text-xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Request your free interior painting estimate in Orlando
          </h2>
          <p className="mt-5 text-base font-normal leading-7 text-muted-foreground">
            Share a few project details and our team will follow up shortly. We
            are fully insured, offer free estimates, and stand behind our work
            with a warranty-minded approach.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Card className="border-border bg-card">
            <CardContent className="p-5 sm:p-8">
              {submitted ? (
                <div className="rounded-3xl border border-success/30 bg-success-soft p-6">
                  <h3 className="text-2xl font-medium tracking-tight text-success">
                    Request received
                  </h3>
                  <p className="mt-3 text-base font-normal leading-7 text-success">
                    Thank you for contacting NuBrite Painting of Orlando. A
                    branded confirmation email has been sent, and our team will
                    follow up within 1 business day to review your project and
                    next steps.
                  </p>
                  {autoReplyFailed ? (
                    <p className="mt-3 text-sm font-normal leading-6 text-foreground">
                      Your request was saved successfully, but the confirmation
                      email could not be sent automatically. Please contact us
                      at {supportEmail} or {phoneDisplay}.
                    </p>
                  ) : null}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-normal text-foreground"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      onBlur={() => handleBlur("name")}
                      className="min-h-11 border-border bg-background text-foreground"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name ? (
                      <p
                        id="name-error"
                        className="text-sm font-normal text-destructive"
                      >
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-normal text-foreground"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      onBlur={() => handleBlur("phone")}
                      className="min-h-11 border-border bg-background text-foreground"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone ? (
                      <p
                        id="phone-error"
                        className="text-sm font-normal text-destructive"
                      >
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal text-foreground"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      onBlur={() => handleBlur("email")}
                      className="min-h-11 border-border bg-background text-foreground"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email ? (
                      <p
                        id="email-error"
                        className="text-sm font-normal text-destructive"
                      >
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="zipCode"
                      className="text-sm font-normal text-foreground"
                    >
                      ZIP
                    </label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          zipCode: e.target.value,
                        }))
                      }
                      onBlur={() => handleBlur("zipCode")}
                      className="min-h-11 border-border bg-background text-foreground"
                      aria-invalid={Boolean(errors.zipCode)}
                      aria-describedby={
                        errors.zipCode ? "zip-error" : undefined
                      }
                    />
                    {errors.zipCode ? (
                      <p
                        id="zip-error"
                        className="text-sm font-normal text-destructive"
                      >
                        {errors.zipCode}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="hidden">
                  <label
                    htmlFor="company"
                    className="text-sm font-normal text-foreground"
                  >
                    Company
                  </label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    tabIndex={-1}
                    autoComplete="off"
                    className="border-border bg-background text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="projectDetails"
                    className="text-sm font-normal text-foreground"
                  >
                    Project Details
                  </label>
                  <Textarea
                    id="projectDetails"
                    value={formData.projectDetails}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        projectDetails: e.target.value,
                      }))
                    }
                    onBlur={() => handleBlur("projectDetails")}
                    className="min-h-32 border-border bg-background text-foreground"
                    aria-invalid={Boolean(errors.projectDetails)}
                    aria-describedby={
                      errors.projectDetails ? "details-error" : undefined
                    }
                  />
                  {errors.projectDetails ? (
                    <p
                      id="details-error"
                      className="text-sm font-normal text-destructive"
                    >
                      {errors.projectDetails}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-3 rounded-2xl border border-border bg-muted px-4 py-4">
                    <Checkbox
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          consent: Boolean(checked),
                        }))
                      }
                      className="mt-0.5 border-border"
                      aria-invalid={Boolean(errors.consent)}
                    />
                    <span className="text-sm font-normal leading-6 text-foreground">
                      I agree to be contacted about my painting estimate
                      request.
                    </span>
                  </label>
                  {errors.consent ? (
                    <p className="text-sm font-normal text-destructive">
                      {errors.consent}
                    </p>
                  ) : null}
                </div>

                {submissionError ? (
                  <p className="text-sm font-normal text-destructive">
                    {submissionError}
                  </p>
                ) : error ? (
                  <p className="text-sm font-normal text-destructive">
                    We could not submit your request right now. Please call us
                    at {phoneDisplay}.
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="min-h-11 rounded-full bg-primary px-6 py-4 text-base font-normal text-primary-foreground transition-all duration-200 ease-in-out hover:scale-[1.01] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {isPending ? "Submitting..." : "Get a Free Estimate Today"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-border bg-card">
              <CardContent className="p-5 sm:p-8">
                <h3 className="text-xl font-medium tracking-tight text-card-foreground sm:text-2xl">
                  Orlando location & hours
                </h3>
                <p className="mt-4 text-base font-normal leading-7 text-muted-foreground">
                  Serving homeowners across Orlando and surrounding Central
                  Florida communities.
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-11 items-center gap-3 rounded-full bg-secondary px-5 py-4 text-base font-normal text-secondary-foreground transition-all duration-200 ease-in-out hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Phone size={32} weight="regular" />
                    <span className="text-secondary-foreground">
                      {phoneDisplay}
                    </span>
                  </a>
                  <p className="text-base font-normal text-foreground">
                    Monday to Friday: 8:00 AM - 6:00 PM
                  </p>
                  <p className="text-base font-normal text-foreground">
                    Saturday: 9:00 AM - 2:00 PM
                  </p>
                  <p className="text-base font-normal text-muted-foreground">
                    Sunday: Closed
                  </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-3xl border border-border">
                  <iframe
                    title="NuBrite Painting Orlando map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224845.38902914186!2d-81.45519749999999!3d28.483000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d8fecdbc77%3A0xac3b2063ca5bf9e!2sOrlando%2C%20FL!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="320"
                    loading="lazy"
                    className="w-full"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    style={{ border: 0 }}
                  />
                </div>

                <div className="mt-6">
                  <a
                    href="https://www.google.com/maps/place/Orlando,+FL/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-4 text-base font-normal text-card-foreground transition-all duration-200 ease-in-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <MapPin size={32} weight="regular" />
                    <span className="text-card-foreground">
                      Open in Google Maps
                    </span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Fully Insured", icon: ShieldCheck },
                { label: "Free Estimates", icon: ClipboardText },
                { label: "Warranty Note", icon: Sparkle },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-border bg-muted p-5"
                  >
                    <Icon size={32} weight="regular" className="text-primary" />
                    <p className="mt-4 text-base font-normal text-foreground">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SITE_URL = "https://www.nubritepainting.com/";

function QRCodeSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="qr" className="bg-gradient-surface py-8 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* QR code card */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-md">
              <QRCodeSVG
                value={SITE_URL}
                size={200}
                bgColor="#ffffff"
                fgColor="#111827"
                level="H"
                includeMargin={true}
                aria-label="QR code linking to NuBrite Painting website"
              />
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              Scan to visit nubritepainting.com
            </p>
          </div>

          {/* Text + actions */}
          <div className="flex max-w-lg flex-col">
            <p className="text-sm font-normal uppercase tracking-[0.12em] text-primary">
              Share &amp; Connect
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Share NuBrite Painting with a Scan
            </h2>
            <p className="mt-5 text-base font-normal leading-7 text-muted-foreground">
              Point your phone camera at the code to open our site instantly.
              Share it with a neighbor, print it on a flyer, or bookmark it for
              your next painting project in Orlando, FL.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-normal text-primary-foreground transition-all duration-200 ease-in-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <ArrowRight size={18} weight="regular" />
                Visit Website
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-normal text-foreground transition-all duration-200 ease-in-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {copied ? (
                  <>
                    <CheckCircle
                      size={18}
                      weight="regular"
                      className="text-success"
                    />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <ClipboardText size={18} weight="regular" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileQRFloat() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Floating button — visible only on mobile/tablet */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show QR code"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
      >
        {/* Simple QR icon */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke="white"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke="white"
            strokeWidth="2"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1"
            stroke="white"
            strokeWidth="2"
          />
          <rect x="5" y="5" width="3" height="3" fill="white" />
          <rect x="16" y="5" width="3" height="3" fill="white" />
          <rect x="5" y="16" width="3" height="3" fill="white" />
          <path
            d="M14 14h2v2h-2zM18 14h3v2h-3zM14 18h2v3h-2zM18 18h1v1h-1zM20 20h1v1h-1z"
            fill="white"
          />
        </svg>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="QR code"
        >
          <div
            className="relative flex flex-col items-center gap-5 rounded-3xl border border-border bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close QR code"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X size={18} weight="regular" />
            </button>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              NuBrite Painting
            </p>
            <div className="rounded-2xl border border-border bg-white p-4">
              <QRCodeSVG
                value={SITE_URL}
                size={200}
                bgColor="#ffffff"
                fgColor="#111827"
                level="H"
                aria-label="QR code linking to NuBrite Painting website"
              />
            </div>
            <p className="text-center text-sm font-normal text-muted-foreground">
              Scan to visit{" "}
              <strong className="text-foreground">nubritepainting.com</strong>
            </p>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-normal text-primary-foreground transition-all duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight size={16} weight="regular" />
              Open Website
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-footer py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <a
              href="/"
              className="inline-flex items-center rounded-full px-2 py-2 transition-all duration-200 ease-in-out hover:bg-footer-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
            >
              <img
                src="https://c.animaapp.com/mouf8r47O98IqE/img/uploaded-asset-1783300566123-0.png"
                alt="NuBrite Painting and Texture Designs logo"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </a>
            <a
              href={phoneHref}
              className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-secondary px-5 py-4 text-base font-normal text-secondary-foreground transition-all duration-200 ease-in-out hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
            >
              <Phone size={32} weight="regular" />
              <span className="text-secondary-foreground">{phoneDisplay}</span>
            </a>
            <p className="mt-6 max-w-md text-base font-normal leading-7 text-footer-foreground/80">
              Conversion-focused residential painting service for homeowners
              looking for reliable interior house painting in Orlando, FL.
            </p>
          </div>

          <div
            id="footer-links"
            className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
          >
            <FooterLinkGroup
              title="Quick Links"
              links={[
                "About Us",
                "Contact Us",
                "Residential",
                "Commercial",
                "Location",
              ]}
              icons={[House, Phone, PaintBrush, Buildings, MapPin]}
            />
            <FooterLinkGroup
              title="Legal"
              links={["Accessibility", "Privacy Policy", "Site Map"]}
              icons={[CheckCircle, ShieldCheck, List]}
            />
          </div>
        </div>

        <div className="mt-10 border-t border-footer-border pt-6">
          <p className="text-sm font-normal text-footer-foreground/70">
            Copyright {new Date().getFullYear()} NuBrite Painting of Orlando.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
  icons,
}: {
  title: string;
  links: string[];
  icons: Array<
    React.ComponentType<{
      size?: number;
      weight?: "regular";
      className?: string;
    }>
  >;
}) {
  return (
    <div>
      <h3 className="text-base font-medium tracking-tight text-footer-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((label, index) => {
          const Icon = icons[index];
          return (
            <li key={label}>
              <a
                href="/"
                className="inline-flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-normal text-footer-foreground/80 transition-all duration-200 ease-in-out hover:bg-footer-muted hover:text-footer-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
              >
                <Icon size={32} weight="regular" className="text-primary" />
                <span className="text-inherit">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
