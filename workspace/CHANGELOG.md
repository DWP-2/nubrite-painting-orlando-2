<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
## 2026-10-21
- Moved FAQ content from homepage/About flow to a dedicated FAQ route in `src/App.tsx` by removing `<FaqAccordionSection />` from `/` and adding `/faq`
- Updated FAQ navigation target in `src/App.tsx` from `/#faq` to `/faq` so the FAQ menu opens the dedicated FAQ page
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Fixed FAQ navigation flow in `src/App.tsx`: FAQ menu click now uses route-safe navigation on desktop/mobile and hash scrolling re-runs on route/hash changes via `useLocation`
- Added `scroll-mt-28` on FAQ section in `src/App.tsx` to prevent sticky-header overlap when jumping to `#faq`
- Updated FAQ intro paragraph in `src/App.tsx` to clean customer-facing wording
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Restored FAQ section in `src/App.tsx` on the homepage with full FAQ content, original-style photo accents, and color treatment via `FaqAccordionSection`
- Reconnected FAQ in the main navigation by changing FAQ href to `/#faq` and using route-safe link behavior in header menu
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Removed FAQ section from homepage/About-only flow in `src/App.tsx` by deleting `<FaqAccordionSection />` from `/` route render
- Cleaned FAQ-only logic in `src/App.tsx` (removed FAQ query/schema usage and accordion component import) to keep compile clean
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Fixed homepage hero CTA in `src/App.tsx` so “View Location & Hours” now links to `/contact` instead of `#contact`
- Ensures the button under the phone number opens the full location and hours details correctly
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Restored a dedicated `/contact` page in `src/App.tsx` using the complete existing contact form, location details, business hours, map, QR section, footer, and chat
- Updated the shared Contact menu item in `src/App.tsx` from the removed homepage anchor to `/contact`, covering desktop and mobile navigation
- Kept Contact separate from the homepage About section as previously requested
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Corrected the About-page cleanup in `src/App.tsx` by removing the homepage `<ContactMapSection />` render that still displayed “Contact & Location”
- Kept `ContactMapSection` on dedicated service/menu pages; only the homepage/About flow was changed
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Removed the About-page contact/location card from `ServicesSections` in `src/App.tsx` (deleted “Full Contact Information” block under About copy)
- Scope kept targeted to About section only; contact/location content in the dedicated contact section remains unchanged
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Removed the `Our Process` section from the homepage/About flow in `src/App.tsx` by deleting `<ProcessSteps />` render and the `ProcessSteps` component definition
- Removed the `Process` nav item from `navItems` in `src/App.tsx` so header/mobile navigation no longer links to a removed section
- Cleaned related unused code in `src/App.tsx` (`processSteps` constant and `Swatches` icon import) to keep strict TypeScript compile-safe

## 2026-10-21
- Restored the “Why Hire a Professional Orlando Painting Company?” section styling in `src/App.tsx` to a photo-based, color-accented layout
- Replaced the plain text-only block with three visual benefit cards (prep, finish quality, and safer completion) to match the prior presentation style
- Confirmed no `__ANIMA_DBG__` logs remain in `src` before applying this update

## 2026-10-21
- Updated About section in `src/App.tsx` to remove the three service category blocks (Residential/Exterior/Commercial) so services are centralized in the main Services menu
- Added a full contact info panel directly under the About wording in `src/App.tsx` (phone, email, location, and business hours)
- Revised About closing paragraph in `src/App.tsx` to contact-focused copy and removed service-menu cross-links from that block

## 2026-10-21
- Added dedicated services menu page route (`/services`) in `src/App.tsx` with category cards linking to service pages
- Added desktop/mobile `Services` dropdown menu in `src/App.tsx` and connected it to About-page service groups
- Replaced service-section hash href usage with route-based links (`/residential-interior`, `/residential-exterior`, `/commercial`) and updated related copy grammar
- Updated workspace memory in `workspace/CODER.md`

## 2026-10-21
- Implemented plan step 4 in `src/App.tsx`: homepage service category blocks now render with `variant="summary"` for concise scan-first sections
- Kept in-page anchors (`#residential`, `#exterior`, `#commercial`) intact while preserving existing drill-down CTAs to dedicated routes
- Updated workspace memory in `workspace/CODER.md` and retired the split-services todo in `workspace/TODO.md` as completed

## 2026-10-21
- Implemented plan step 3 in `src/App.tsx`: added route wiring for `/residential-interior`, `/residential-exterior`, and `/commercial` via shared `serviceCategoryPagePaths`
- Added `ServiceCategoryRoutePage` and wired dropdown/footer service links to dedicated pages while preserving homepage anchor links (`#residential`, `#exterior`, `#commercial`)
- Updated reusable `ServiceCategorySection` with CTA override props so home can link to detail pages and dedicated pages can keep quote-focused CTA to `/#contact`
- Updated workspace memory in `workspace/CODER.md`; task progress recorded for service-page split routing phase

## 2026-10-21
- Refactored service-category source content in `src/App.tsx` into reusable structured constants (`serviceCategoryContent`) for Interior Residential, Exterior Residential, and Commercial
- Added reusable `ServiceCategorySection` component in `src/App.tsx` with `full|summary` rendering mode, reusable CTA text source, and shared card/detail mapping
- Replaced duplicated category JSX in `ServicesSections` with `ServiceCategorySection` calls while preserving current full-home layout
- Pattern note: this completes plan step 1 groundwork for dedicated category routes and condensed home summaries

## 2026-10-21
- Updated `src/App.tsx` in About `#residential` section to remove empty space next to the side photo by adding professional supporting copy under the heading
- Improved text quality/tone for Interior Residential content to read more polished and service-focused
- Pattern note: kept existing layout and image placement intact; targeted content-only enhancement in left column

## 2026-10-21
- Reduced extra spacing under section headings in `src/App.tsx` for `#residential`, `#exterior`, and `#commercial` by tightening service grid top margin (`mt-4` -> `mt-3`)
- Refreshed service list card styling in those same sections with subtle color treatment (`border-primary/20`, `bg-primary-soft/40`, hover tint) to avoid dull all-white blocks
- Updated card padding to feel tighter on mobile while preserving desktop readability (`p-4 sm:p-5`)
- Updated workspace memory in `workspace/CODER.md`
- Pattern note: reused existing theme tokens/classes only; no new assets or routes introduced

## 2026-10-21
- Restored side photo in `src/App.tsx` for Commercial Painting Services section (`#commercial`) on the About page layout
- Restored original photos to side placement in `src/App.tsx` for About, Interior Residential, and Exterior Residential sections inside `ServicesSections`
- Removed now-redundant bottom two photo cards from the About area so those images only appear in the requested sections
- Pattern note: existing image URLs were reused from the current codebase, no new assets introduced

## 2026-10-20
- Added branded auto-reply confirmation email flow in `src/App.tsx` after quote submission using FormSubmit AJAX and `_autoresponse` content with response-time/contact details
- Updated contact form success/error state handling in `src/App.tsx` to show auto-reply status without losing saved lead submissions
- Removed all `__ANIMA_DBG__` runtime debug logs from `src/App.tsx` (bootstrap/route/hash/menu)
- Updated task/memory tracking in `workspace/TODO.md` and `workspace/CODER.md`
- Pattern note: keep submission side-effects non-blocking after `LeadSubmission` persistence

## 2026-10-20
- Reverted separate About page split in `src/App.tsx` to restore original single-page behavior before `/about` existed
- Changed About nav back to in-page anchor (`#about`), removed `/about` route, and removed unused `AboutPageSection` component
- Kept home-page About content in `ServicesSections` as the sole About source (no duplicate/about standalone page)
- Repeat-pattern scope checked for `/about` route usage in `src/App.tsx`; all clear matches reverted
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Added startup hardening + diagnostics in `src/App.tsx` for intermittent Sandpack stalls: `__ANIMA_DBG__` logs on app bootstrap, route change, hash handling, and mobile menu interactions
- Hardened `scrollToHash()` with invalid-hash guard, selector error handling, and missing-target logging to avoid silent startup-side failures
- Added React Router catch-all route (`* -> /`) so unmatched paths do not render blank preview states
- Repeat-pattern scope: routing/startup navigation paths in `src/App.tsx`; no additional files required
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Fixed blank preview at `/index.html` by adding explicit React Router handling in `src/App.tsx` (`/index.html` now redirects to `/` using `Navigate`)
- Root cause pattern: BrowserRouter pathname mismatch in Sandpack when requested document path is `/index.html`, causing no matching route and empty render
- Repeat-pattern check completed for route declarations in `src/*.tsx`; only `src/App.tsx` required this fix
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Fixed preview compile blocker in `src/assistant/ChatWidget.tsx`: restored missing imports used by `matchAnswer()` (`COMPANY`, `HOURS`, `PRICING`, `INTERIOR_SERVICES`, `COMMERCIAL_SERVICES`, `PROCESS_STEPS`)
- Repeat-pattern check run for unresolved identifiers tied to `from "./knowledge"` usage; only `ChatWidget.tsx` matched
- This addresses TS symbol resolution failures that can cause Sandpack preview timeout/stall before render
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Fixed repeat strict TS timeout pattern in `src/assistant/ChatWidget.tsx`: removed unused `buildContext()` helper and now-unused knowledge imports (`COMPANY`, `HOURS`, `TRUST`, `PRICING`, `PROCESS_STEPS`, `INTERIOR_SERVICES`, `COMMERCIAL_SERVICES`)
- Pattern search executed for `buildContext(` in `src/*.tsx`; only one clear match existed and was fixed
- No runtime UI behavior change; this is compile hygiene to keep Sandpack preview from stalling under `noUnusedLocals`
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Fixed strict TS blocker causing preview stalls: removed unused `CONTEXT` constant in `src/assistant/ChatWidget.tsx` under `noUnusedLocals` rules
- Repeat-pattern check run for similar unused-context signatures; only `ChatWidget.tsx` had `buildContext()` assigned but never used
- No runtime behavior changes; only compile hygiene for Sandpack/Vite stability
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Fixed Sandpack preview stall risk in `src/App.tsx` by replacing module-scope `document` style injection with `ensureHeroCarouselStyles()` runtime init in `HeroPhotoCarousel`
- Pattern check for similar timeout signature (`document` usage at module scope) in `src/*.tsx`; only hero keyframes block matched
- Preserved existing carousel animations and behavior while making initialization browser-safe
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Fixed preview timeout blocker in `src/App.tsx` by removing unused icon imports (`Briefcase`, `CoatHanger`) that fail strict TypeScript with `noUnusedLocals`
- Removed unnecessary `return` inside `catch` in `ContactMapSection.handleSubmit` to avoid lint/TS strict friction in Sandpack
- Pattern check completed for repeated unused icon signatures in `src/*.tsx`; only this file had matches
- Updated workspace memory: `workspace/CODER.md`

## 2026-10-20
- Added route separation in `src/App.tsx`: homepage remains at `/` and new dedicated About page is available at `/about`
- Updated `src/index.tsx` to wrap app with `BrowserRouter` for route-based page separation
- Updated cross-page navigation in `src/App.tsx` (About nav and contact/location links) so header/footer links work between `/` and `/about`
- Updated workspace memory files: `workspace/CODER.md` and `workspace/TODO.md` (completed about-page route task)

## 2026-10-20
- Updated `src/App.tsx`: separated service content into distinct visual areas for Interior, Exterior Residential, and Commercial to reduce crowding
- Converted main services/about layout to full-width flow (removed narrow 2-column service squeeze) and increased section separation
- Added bordered card containers per service area with dedicated spacing/padding for cleaner scan on desktop and mobile
- Kept anchor IDs (`#residential`, `#exterior`, `#commercial`) unchanged so existing nav links still scroll correctly

## 2026-09-20 (mobile-friendly — REAL fix applied)
- Previous "mobile cleanup" used `...` placeholders and never actually changed files — this is the real commit
- All section horizontal padding: `px-3 sm:px-6 lg:px-8` across every section and the header
- Hero: `py-8 sm:py-14 lg:py-24`, h1 `text-2xl sm:text-4xl lg:text-5xl`, trust badges compact on mobile, carousel stays hidden on mobile
- Mobile nav: replaced NavigationMenu nesting with flat `<a>` links, added `max-h-[80vh] overflow-y-auto` scroll, tighter padding
- Process steps: `gap-3 sm:gap-4 lg:gap-6`, card `rounded-2xl p-4 sm:rounded-3xl sm:p-6`
- All section headings: `text-xl sm:text-3xl lg:text-4xl` (was `text-2xl` everywhere which clipped on 360px)
- `index.css`: added `-webkit-text-size-adjust`, `img/iframe/svg max-width:100%`, `width:100%` on body

## 2026-09-20 (SEO final cleanup)
- Shortened title tag to under 60 chars: "NuBrite Painting | Orlando Painters – Free Estimates" (`index.html`)
- Switched favicon + apple-touch-icon from external CDN URL to local `/favicon.png`; updated `site.webmanifest` icons to `/favicon.png`
- Added `perplexitybot` meta crawl tag and `Perplexitybot` + `PerplexityBot` entries in `robots.txt` (case variants both covered)
- Added sitemap + crawl policy footer block to `public/llms.txt`

## 2026-09-20
- SEO upgrade: added `keywords`, geo meta tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`), and `max-snippet/-image-preview` robots directive to `index.html`
- Expanded LocalBusiness JSON-LD: added `priceRange`, `paymentAccepted`, `geo` coordinates, `hasOfferCatalog` with 4 service offers, `sameAs` social links, `areaServed` with 7 Orlando-area cities
- Added new Service JSON-LD schema block for Google rich results; expanded BreadcrumbList to 5 items
- Updated `public/sitemap.xml`: bumped dates to 2026-09-20, raised service section priorities to 0.9, contact to 1.0 (weekly), added XSD schema declaration
- Updated `public/robots.txt`: added GPTBot, AhrefsBot, SemrushBot allows; added `Host` directive and `Crawl-delay` per bot
- Removed login/logout button from desktop nav, mobile nav, and footer (`src/App.tsx`); removed `useAuth` import

## 2026-09-19 (AI Chat Widget)
- Created `src/assistant/knowledge.ts` — full NuBrite knowledge base: company info, hours, all services, pricing policy, FAQ, trust signals, escalation rules, and assistant persona
- Created `src/assistant/ChatWidget.tsx` — floating chat button (bottom-left), opens 340px panel with quick replies, typing indicator, markdown-lite bold/newline rendering
- Rule-based `matchAnswer()` engine covers ~15 intent patterns; falls back to escalation CTA with phone number
- Imported `ChatWidget` into `App.tsx`; placed after `<SiteFooter />`
- No external API required — entirely self-contained, zero network cost

## 2026-09-19 (QR code v2)
- Moved `QRCodeSection` to bottom of page (after `ContactMapSection`) for better discoverability; added `id="qr"` and `includeMargin={true}` for cleaner rendering
- Added `MobileQRFloat` component: fixed bottom-right floating button on mobile/tablet that opens a full modal with a 200px QR code
- `MobileQRFloat` hidden on `lg:` and above (desktop already has the full section); uses same `SITE_URL` constant
- Both render `QRCodeSVG` inline SVG — works on published site, iOS Safari, Android Chrome with no image loading issues

## 2026-09-19 (SEO)
- Full SEO pass: rewrote `index.html` with title, description, canonical, og:*, twitter:*, robots, googlebot, bingbot meta tags
- Added JSON-LD LocalBusiness + BreadcrumbList schemas inline in `index.html`; removed duplicate schema injection from `setSeoMetadata()` (still runs for dynamic FAQ schema)
- Created `public/site.webmanifest`, `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`
- Generated NuBrite favicon/apple-touch-icon (`generated-image-1789855735668.png`); referenced via CDN URL in `<link rel="icon">` and `<link rel="apple-touch-icon">`
- All img tags in `App.tsx` already have descriptive alt text; semantic structure (header/main/footer/nav) already in place

## 2026-09-19 (latest)
- Removed `CompletedProjectsGallery` component, `galleryProjects` array, `galleryTags`, and its `<CompletedProjectsGallery />` usage from `App()` (`src/App.tsx`) — gallery section fully gone
- Removed `TestimonialsDropdown` from desktop nav, mobile nav testimonials block, and `CtaTestimonialSection` from the page entirely (`src/App.tsx`)
- Removed `useQuery("Testimonial")` call and all testimonial-related props from `App()` component
- FAQ nav item no longer uses `React.Fragment` wrapper — simplified back to a plain `NavigationMenuItem`
- Previous: replaced `MoreDropdown` with `TestimonialsDropdown`; now fully removed per user request
- Built `CompletedProjectsGallery` section (`id="gallery"`) with 9-photo filterable grid (All / Residential Interior / Residential Exterior / Commercial tabs)
- Gallery placed on page between `SeoContentSection` and `CtaTestimonialSection`; `#testimonials` anchor was already present on `CtaTestimonialSection`

## 2026-09-19 (prev)
## 2026-09-19 (prev)
- Updated Saturday hours from "Closed" to "9:00 AM - 2:00 PM" in `ContactMapSection` (`src/App.tsx`)
- Replaced broken `maps.google.com/maps?output=embed` iframe with valid Google Maps Embed API URL (`google.com/maps/embed?pb=...`) for Orlando, FL; "Open Location Map" link updated to direct Google Maps place URL

## 2026-09-19
- Moved `#commercial` section in `SeoContentSection` (`src/App.tsx`) to appear after `#exterior` (Exterior Residential Painting) instead of before it; order is now: Interior → Exterior → Commercial

## 2026-09-19
- Removed photos from `#commercial` section in `SeoContentSection` (`src/App.tsx`) — commercial service cards now text-only (label + description), matching the interior section style; dropdown menu untouched

## 2026-09-19
- Removed "Your Local Neighborhood Painting Company" eyebrow `<p>` tag from `HeroSection` in `src/App.tsx` — hero now starts directly with the `<h1>` NuBrite Painting heading

## 2026-09-19
- Replaced blurry BMP yellow house (`uploaded-asset-1782342176900-0.bmp`) in `exteriorServices[0]` with sharp AI-generated photo (`generated-image-1789840076722.png`) — "Full Exterior House Repaint" card in Residential → Exterior dropdown now shows a clean, focused yellow house

## 2026-09-19
- Removed `Warehouse & Industrial Painting` entry from `commercialServices` array and `commercialNavLinks` in `src/App.tsx` — Commercial dropdown now shows 5 services
- Gave `Office & Retail Refresh` its own dedicated photo (`generated-image-1789838627823.png`) — bright open-plan office + retail storefront, no longer sharing the Commercial Interior image

## 2026-09-19
- Restored full `#commercial` section in `SeoContentSection` (`src/App.tsx`) — 6 service cards (Interior, Exterior, Boom Lift, Scissor Lift, Warehouse, Office & Retail) with photos, descriptions, and modal detail panels
- Added `commercialServices: ServiceDetail[]` array with process steps for all 6 commercial services
- Commercial nav link `href: "#commercial"` now scrolls to the restored section correctly

## 2026-09-19
- Updated hero eyebrow text in `HeroSection` (`src/App.tsx`): "Your Neighborhood Local Painting Company" → "Your Local Neighborhood Painting Company"
- Removed yellow house BMP (`uploaded-asset-1782342176900-0.bmp`) from `heroCarouselPhotos` in `src/App.tsx`; carousel now has 5 slides

## 2026-09-19 (prev)
- Fixed React `key` spread anti-pattern warning in `HeroPhotoCarousel` (`src/App.tsx`): computed `imgKey` variable used directly instead of `{...(isActive ? { key: ... } : {})}`

## 2026-09-18 (latest)
- Replaced all "men painting" carousel photos in `heroCarouselPhotos` with modern vibrant finished interior/exterior images: new luxury navy interior AI photo, finished living room, crown molding room, kitchen, yellow house exterior, suburban exterior (`src/App.tsx`)

## 2026-09-18
- Updated hero subtitle in `HeroSection` (`src/App.tsx`): replaced long service list with "Residential & Commercial Painting. Trusted by Orlando homeowners and businesses alike."

## 2026-09-18 (prev)
- Rebuilt `HeroPhotoCarousel` flash+zoom effect using CSS `@keyframes` injected into `<head>`: `carouselFlash` (white burst 0→0.85→0 over 420ms), `carouselZoomIn` (scale 1.13→1 + fade-in over 550ms), `carouselZoomOut` (scale 1→0.94 + fade-out over 380ms); re-triggered via React `key` prop on each transition — previous inline-style approach wasn't visually firing

## 2026-09-18
- Replaced Hispanic painter carousel photo (`generated-image-1789755024777.png`) with new professional image: clean white uniform, no paint on face, sharp focus, rolling paint on modern interior wall (`generated-image-1789756415579.png`) in `heroCarouselPhotos` (`src/App.tsx`)

## 2026-09-18
- Removed 3 non-painting Unsplash photos from `heroCarouselPhotos` in `src/App.tsx`: staircase stock photo, generic real estate interior, and unclear "diverse crew" shot
- Carousel trimmed from 9 to 6 slides — all remaining photos are confirmed painting-related (AI painters, finished painted rooms, exterior repaint)

## 2026-09-18 (prev)
## 2026-09-18 (prev)
- Added `ServiceDetailModal` component — clicking any interior/exterior service card on the homepage now opens a modal with photo, description, "How It Works" process steps, and "Get a Free Quote" CTA (`src/App.tsx`)
- Added `interiorLabelMap`, `exteriorLabelMap`, `interiorPageCards`, `exteriorPageCards` to map plain-text cards to `ServiceDetail` objects
- `SeoContentSection` converted from static `<div>` cards to interactive `<button>` cards that set `activeModal` state; backdrop click + Escape key close the modal
- Body scroll locked while modal is open; all 12 services (6 interior + 6 exterior) are wired up

## 2026-09-18
- Added `ServiceDetailPanel` component — clicking any service card in the Residential dropdown now opens an inline detail panel with photo, 6-step "How It Works" process, and a "Get a Free Quote" CTA (`src/App.tsx`)
- Added `process: string[]` field to `ServiceDetail` type; populated all 12 services (6 interior + 6 exterior) with customer-friendly process steps
- Service cards changed from `<a>` to `<button>` that sets `selectedService` state; back arrow returns to grid; quick-links also open detail panel if service matches
- Dropdown panel width unchanged at 780px; tab switching resets selected service

## 2026-09-18
- Restored hero background to `ai_1.png` (painter in white uniform painting residential interior)
- Replaced static 2-photo hero grid with `HeroPhotoCarousel` component — 7 photos rotate every 3.8s with crossfade + dot indicators (`src/App.tsx`)
- Carousel includes: ai_3, ai_1, finished living room (generated-image-1789751265621), kitchen, crown molding room, yellow house exterior, surface prep
- Updated "Commercial Exterior" card image to AI-generated professional painter in white uniform on commercial building facade (`generated-image-1789750846309.png`) (`src/App.tsx`)

## 2026-09-18
- Updated "Boom Lift High-Reach" card image in Commercial section to AI-generated vibrant boom lift / high-reach painter photo (`generated-image-1789750133257.png`); replaced generic Unsplash construction photo (`src/App.tsx`)

## 2026-09-18
- Restored hero photo grid to original 2-photo layout (`ai_3.png` + `ai_1.png`); removed commercial interior AI photo and Unsplash boom lift photo added in previous session (`src/App.tsx`)

## 2026-09-18
- Added "Commercial" nav item to desktop + mobile nav in `navItems` array (`src/App.tsx`)
- Added hero subtitle wording: "Residential & Commercial Painting — Interior, Exterior, High-Reach Boom Lift & Scissor Lift Services"
- Added third hero image slot (commercial interior AI photo) to hero photo grid
- Added full `#commercial` section in `SeoContentSection` with 6-photo grid (commercial interior, boom lift, scissor lift, exterior, warehouse, office) and 6 service cards
- Footer Quick Links confirmed: "Location" (singular), no "Franchising" or "Strategic Partnerships" present; fixed breadcrumb schema "Locations" → "Location" (`src/App.tsx`)

## 2026-09-18
- Updated "Caulking, Patching & Priming" card image to AI-generated vibrant residential caulking/patching/priming collage; updated description to include "Residential" (`src/App.tsx`)
- Updated "Garage Door & Fence" card image in `exteriorServices` (src/App.tsx) to AI-generated vibrant garage door + fence painting collage
- Updated "Pressure Washing & Surface Prep" card image in `exteriorServices` (src/App.tsx) to AI-generated vibrant pressure washing + surface prep collage

## 2026-09-17
- Updated "Color Consultations" card image in `interiorServices` (src/App.tsx) to AI-generated vibrant color consultation scene with swatch fan deck
- Updated "Closets, Stairwells & Entries" card image in `interiorServices` (src/App.tsx) to AI-generated vibrant collage of closet, stairwell, and entryway
- Updated "Kitchen & Bathroom" card image in `interiorServices` (src/App.tsx) to AI-generated vibrant kitchen+bathroom painting photo
- Updated "Trim, Baseboard & Crown Molding" card image in `interiorServices` (src/App.tsx) to AI-generated vibrant interior photo showing crown molding, trim, and baseboards
- Updated "Wall & Ceiling Painting" card image in `interiorServices` (src/App.tsx) to user-uploaded couple-with-paint-swatches photo

## 2026-08-20
- Added `interiorNavLinks` + `exteriorNavLinks` arrays to `src/App.tsx` with all 6 services each
- `ResidentialDropdown` now shows a two-column layout: photo cards left + named quick-link list right (per tab)
- Mobile nav expanded: Interior sub-items (6) + Exterior sub-items (6) all listed under "Residential" with section headers
- Desktop dropdown width increased to 780px to accommodate the new link column

## 2026-08-20
- Fixed auth gating bug in `UtilityHeader` (`src/App.tsx`): Login/Logout now hidden while auth state is `undefined` (loading), preventing "Logout" from leaking into public header on page load
- Added 6th process step "Ongoing Warranty Support" to `processSteps` array in `src/App.tsx` — Process section now shows all 6 steps matching the section title
- Fixed broken Trim/Baseboard photo in `interiorServices`: replaced `photo-1581578731548` with `photo-1562259949`
- All 6 interior service photos confirmed working and title-matched

## 2026-07-06
- Replaced header and footer text-based logo with uploaded NuBrite Painting and Texture Designs logo image in `src/App.tsx`
- Footer logo uses `brightness-0 invert` filter to render white on the dark footer background

## 2026-06-25
- Updated the "Front Door & Shutters" image in the Residential Exterior dropdown to the user-provided photo of a navy blue front door with white shutters
- Updated the "Trim, Fascia, Soffit & Eaves" image in the Residential dropdown menu to use the user-provided image of painters working on a roofline
- Updated the "Full Exterior House Repaint" image in the Residential dropdown menu to use the user-provided image of a large yellow house

## 2026-05-26
- Removed "Work for NuBrite Painting" and "Franchising" from `utilityLinks` array in `src/App.tsx` — affects both desktop utility bar and mobile nav drawer

## 2026-05-26
- Fixed `ProcessSteps` invisible bug: changed `IntersectionObserver` threshold to `0` + added 400ms fallback reveal in `src/App.tsx`
- Fixed all 12 service card images: added `auto=format&fit=crop` params + corrected trim/garage door wrong-subject photos
- FAQ answers confirmed present in DB (field name `answer` is correct) — answers display correctly when accordion opens
- Interior images: wall roller, trim brush, kitchen, stairway, empty listing room, color swatches
- Exterior images: full repaint ladder, roofline fascia, bold front door, garage door, pressure washing, caulk patching

## 2026-05-07
- Fixed Google Maps iframe in `src/App.tsx` — replaced broken `v1/place?key=YOUR_API_KEY` URL with no-key `maps.google.com/maps?q=Orlando,FL&output=embed` URL
</changelog>
