<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
- 2026-10-21: Moved FAQ content out of homepage/About flow in `src/App.tsx` by removing `<FaqAccordionSection />` from `/`, adding dedicated `/faq` route, and updating FAQ nav links to `/faq`.
- 2026-10-21: Fixed FAQ navigation reliability in `src/App.tsx`: desktop/mobile FAQ menu clicks now route-safe navigate to `/#faq`, hash scrolling now re-runs on location changes, and FAQ section has `scroll-mt-28` to avoid sticky-header overlap.
- 2026-10-21: Updated FAQ intro copy in `src/App.tsx` to remove non-user-facing internal phrasing and keep customer-facing messaging clean.
- 2026-10-21: Restored FAQ on the homepage in `src/App.tsx` with full question/answer content, photo-accented cards, and themed color treatment; re-added `<FaqAccordionSection />` to the `/` route render.
- 2026-10-21: Updated FAQ navigation behavior in `src/App.tsx` so the main-menu FAQ link uses `/#faq` and works reliably from non-home routes.
- 2026-10-21: Removed the FAQ block from the homepage/About flow in `src/App.tsx` by deleting `<FaqAccordionSection />` from `/` route rendering, while leaving other page structure untouched.
- 2026-10-21: Fixed the homepage hero CTA in `src/App.tsx` so “View Location & Hours” under the phone number now routes to `/contact` (full location/hours info) instead of the removed home `#contact` anchor.
- 2026-10-21: Restored the complete original Contact experience as a dedicated `/contact` route in `src/App.tsx`; the desktop/mobile Contact menu item now opens the full estimate form, location, hours, map, QR section, footer, and chat without placing Contact back inside About.
- 2026-10-21: Corrected the prior About-page cleanup by removing the homepage `<ContactMapSection />` render in `src/App.tsx`; the separate Contact & Location section no longer follows the About-page flow, while dedicated service/menu pages retain it.
- 2026-10-21: Removed the About-section “Full Contact Information” (contact/location/hours card) from `ServicesSections` in `src/App.tsx` so contact/location details are no longer shown inside the About page block.
- 2026-10-21: Removed the standalone `Our Process` section from the homepage flow in `src/App.tsx` (About-page context) and removed the `Process` nav link so navigation only points to active sections/pages.
- 2026-10-21: Restored the `Why Hire a Professional Orlando Painting Company?` block in `src/App.tsx` to a photo-forward, color-accented layout (three visual cards) to match the earlier original style presentation.
- 2026-10-21: Updated `ServicesSections` in `src/App.tsx` to remove the About-page service category blocks now that `/services` is the primary service navigation; added a full contact info panel (phone, email, location, hours) directly under the About wording and simplified related copy.
- 2026-10-21: Added a new `ServicesDropdown` and dedicated `/services` route in `src/App.tsx`; wired About/service menu links to route paths (`/residential-interior`, `/residential-exterior`, `/commercial`) instead of hash anchors for service sections, and corrected related service-link grammar copy.
- 2026-10-21: Completed plan step 4 in `src/App.tsx` by switching homepage `ServicesSections` category blocks (`#residential`, `#exterior`, `#commercial`) to `variant="summary"` while keeping CTAs to dedicated pages and anchor IDs intact.
- 2026-10-21: Wired dedicated service category routes in `src/App.tsx` for `/residential-interior`, `/residential-exterior`, and `/commercial` using `serviceCategoryPagePaths` + `ServiceCategoryRoutePage`; dropdown/footer service links now drill into these pages while homepage anchor navigation remains intact.
- 2026-10-21: Refactored service category content in `src/App.tsx` into reusable structured constants (`serviceCategoryContent`) and added shared `ServiceCategorySection` renderer supporting `full|summary` variants for reuse across home and future dedicated service routes.
- 2026-10-21: Updated `src/App.tsx` Interior Residential section (`#residential`) left-column copy beside the side photo with professional, space-filling descriptive text to eliminate empty visual area.
- 2026-10-21: Updated `src/App.tsx` service-card styling in About-page sections (`#residential`, `#exterior`, `#commercial`) to reduce top whitespace and add subtle tinted backgrounds/borders (`bg-primary-soft/40`, `border-primary/20`) for less dull presentation.
- 2026-10-21: Restored side photo in `src/App.tsx` for Commercial (`#commercial`) inside `ServicesSections` using the original commercial image placement pattern (text/content left, photo card right).
- 2026-10-21: Restored original side photos in `src/App.tsx` within `ServicesSections` for About, Interior Residential (`#residential`), and Exterior Residential (`#exterior`); removed redundant bottom photo card row to keep those images scoped to requested sections.
- 2026-10-20: Added customer auto-reply email flow in `src/App.tsx` after `LeadSubmission` create using FormSubmit AJAX endpoint (`https://formsubmit.co/ajax/nubriteinc@gmail.com`) with branded `_autoresponse`; success UI now confirms expected response window and contact details.
- 2026-10-20: Removed all `__ANIMA_DBG__` console logs from `src/App.tsx` (scroll/hash/menu/bootstrap diagnostics) per runtime debug cleanup.
- 2026-10-20: Reverted separate About page implementation in `src/App.tsx`: About nav now points back to `#about`, removed `/about` route and removed `AboutPageSection` so home `ServicesSections` is the single About source again.
- 2026-10-20: Added runtime diagnostics and startup hardening in `src/App.tsx` for intermittent preview stalls: `__ANIMA_DBG__` logs for bootstrap/route/hash flows, safer `scrollToHash()` guards, plus catch-all `*` route redirect to `/` to avoid blank unmatched paths.
- 2026-10-20: Fixed Sandpack blank-preview route mismatch by adding explicit `/index.html` handling in `src/App.tsx` via `<Navigate to="/" replace />` so BrowserRouter resolves the home page when the requested document path is `/index.html`.
- 2026-10-20: Fixed repeat TS compile blocker in `src/assistant/ChatWidget.tsx` by restoring missing knowledge imports (`COMPANY`, `HOURS`, `PRICING`, `INTERIOR_SERVICES`, `COMMERCIAL_SERVICES`, `PROCESS_STEPS`) referenced by `matchAnswer()`.
- 2026-10-20: Removed fully unused `buildContext()` and related unused knowledge imports in `src/assistant/ChatWidget.tsx` to satisfy strict `noUnusedLocals` and prevent Sandpack compile stalls.
- 2026-10-20: Fixed strict TypeScript `noUnusedLocals` blocker in `src/assistant/ChatWidget.tsx` by removing unused `CONTEXT` constant from `buildContext()` result assignment.
- 2026-10-20: Fixed another Sandpack timeout/stall risk in `src/App.tsx` by moving top-level `document` style injection (`hero-carousel-keyframes`) into `ensureHeroCarouselStyles()` called from `HeroPhotoCarousel` `useEffect`.
- 2026-10-20: Fixed Sandpack timeout blocker in `src/App.tsx` by removing unused `Briefcase` and `CoatHanger` icon imports and removing unnecessary `return` inside `catch` in `handleSubmit`.
- 2026-10-20: Added route split in `src/App.tsx` with `/` (home) and `/about` (dedicated about page section), plus `BrowserRouter` wrapper in `src/index.tsx`.
- 2026-10-20: Header About nav now points to `/about`, and contact/location CTAs that must work cross-page use `/#contact`.
- 2026-10-20: `src/App.tsx` now uses `ServicesSections` (renamed from `SeoContentSection`) with full-width flow; service buckets are visually separated using `rounded-3xl border bg-card p-5 sm:p-8` containers.
- 2026-10-20: Keep section IDs `#residential`, `#exterior`, `#commercial` stable because desktop/mobile nav anchors and dropdown quick links depend on them.
# File Content Goes Here
</coder>
