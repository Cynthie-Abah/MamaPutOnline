# MamaPutOnline — Vibe-Engineering Prompt Log

**ENSG AI Class · Assignment 1** · Cynthia Abah · July 2026
Files: `index.html` (single-file page: HTML + CSS + vanilla JS) · `PROMPTS.md` (this log)

---

## Vibe engineering vs. vibe coding — my working definition

**Vibe coding** is typing "make me a food website" and accepting whatever falls out.
**Vibe engineering** is running the AI like a junior developer on my team: every prompt
carries a _scope_ ("build only the header"), _constraints_ (exact hex codes, sticky
behaviour, accessibility targets), _acceptance criteria_ I can test, and a _review pass_
where I push back before moving on. One section per prompt, verified before the next.
The condensed version of each prompt is also embedded as a comment banner above its
section inside `index.html`, so the code and the log can be graded side by side.

---

## Prompt P0 — Project brief, persona & design tokens

> "You're my front-end pair for a class assignment. Product: **MamaPutOnline**, an online
> takeaway for cooked Nigerian meals (soups: egusi, ewedu, ora, edikaikong, okazi, ogbono,
> okro; plus jollof rice, fried rice, porridge yam, porridge beans, fried plantain, abacha,
> nkwobi, fried chicken, kpomo). Before any code, give me a design plan in my persona:
> I'm a Nigerian full-stack engineer — warm buka-diner energy,
> Requirements to honour: dark-red menu bar (blue is allowed
> elsewhere), sticky header AND sticky footer, prices in Naira with discounts.
> Deliver: (1) a named 6-colour palette pulled from the food itself, not a generic
> template; (2) a display/body font pair with hand-painted Nigerian-signboard character;
> (3) one signature element the page will be remembered by; (4) a comment style that
> sounds like me. Single offline-capable HTML file — no Tailwind CDN, no frameworks."

**Why engineered this way:** locking tokens first means every later prompt inherits the
same palette and voice — no drift between sections.
**Accepted output:** Palm-Oil Red `#8C1E2B` · Egusi Gold `#F2A93B` · Ugu Green `#2F6D3D` ·
Midnight Ogene navy `#12203F` · Pounded-Yam White `#FFF8EE` · Palm-Kernel Ink `#2A1710`;
type = **Alfa Slab One** (display) + **Epilogue** (body); signature = animated steaming
clay pot in SVG + gold _ankara ric-rac_ zigzag trims on header/footer; comments tagged
`[note]`.
**Iteration note:** first proposal used a cream + terracotta look I've seen on too many
AI pages. I rejected it and asked for colours named after actual ingredients. Better.

---

## Prompt P1 — Sticky menu bar (logo · nav · search)

> "Build ONLY the header. (a) Inline-SVG logo — gold medallion with a dark steaming pot —
> pinned to the **top-left corner**, wordmark 'MamaPutOnline' in Alfa Slab. (b) A
> **dark-red** menu bar with exactly these sub-titles: _Products, Services, Customer
> Service, Contact Us_ — gold underline on hover. (c) A **search window at the very
> top-right corner** with a magnifier icon, restyled on focus. (d) A basket button with
> a count badge between nav and search. Constraints: `position: sticky; top: 0`;
> white-on-red must pass WCAG AA; visible gold focus rings; below 980px the nav drops to
> a scrollable second row. Add a thin navy announcement bar ABOVE the header that scrolls
> away (only the red bar sticks). Do not touch any other section."

**Acceptance criteria:** bar stays pinned while scrolling ✔ · search is the right-most
element ✔ · keyboard Tab shows a visible ring on every control ✔ · nothing overlaps at
375px width ✔.
**Iteration note:** v1's focus ring was the browser default blue — invisible on red.
Re-prompted for a 3px Egusi-Gold ring with 2px offset, applied globally.

---

## Prompt P2 — Hero (the invite)

> "Directly under the sticky bar, build a full-width hero, `min-height: 62vh` (brief asks
> ≥30% — we over-deliver), split into **two vertical halves** with CSS grid
> (1.05fr / 0.95fr). LEFT: eyebrow chip 'Mama don cook · Lagos & Enugu'; an Alfa Slab H1
> in large print that invites people **not to miss** buying — 'Steaming Naija soups,
> sharp-sharp delivery.' with a gold highlight; support line ending 'no miss your own!';
> primary CTA **'Order now — chop well 🍲'** scrolling to #menu; ghost CTA 'See today's
> deals' that pre-selects the deals filter; small trust row clearly marked as sample
> data. RIGHT: display the picture of egusi on an adire-dot medallion, steam animated with staggered CSS keyframes, plus a
> rotated gold '-20% today' sticker. Wire an `onload` hook so a real photo at
> `/img/hero-egusi.jpg` (1600×1200, ≤250 KB, `object-fit: cover` for correct aspect
> ratio and pixel density) takes over automatically the moment the file exists."

**Acceptance criteria:** ≥30% viewport height ✔ (62vh) · 100% breadth ✔ · two halves ✔ ·
bold large-print invite ✔ · CTA present ✔ · steam pauses under
`prefers-reduced-motion` ✔.
**Iteration note:** The build displayed SVG instead of the downloaded image, so instead I switched up the prompt to make the SVG the default if the image is unavailable.

---

## Prompt P3 — Services ribbon

> "Between hero and menu, add a slim `#services` strip so the 'Services' nav link lands
> somewhere real: four white cards — 45-minute dispatch, party trays & bulk orders,
> weekly meal plans, frozen soup packs waybilled nationwide. Font Awesome icon, bold title, one
> muted line each. Give every anchored section `scroll-margin-top` so the sticky bar
> never covers headings."

**Acceptance criteria:** clicking _Services_ scrolls with the heading fully visible below
the sticky bar ✔ · cards wrap 4→2→1 across breakpoints ✔.

---

## Prompt P4 — Main layout: left side panel ↔ product grid

> "Main section = CSS grid `[250px sidebar | fluid content]`, max-width 1440px. LEFT SIDE
> PANEL (sticky below the header): heading 'Our Menu' and six buttons that connect users
> to the cards — **All dishes · Signature soups · Soups & delicacies · Rice & porridge ·
> Sides & grills · 🔥 Today's deals** — each showing its item count; the active button
> fills palm-oil red with `aria-pressed="true"`. Clicking filters the grid AND
> smooth-scrolls to `#menu`. Under the buttons, a gold promo card advertising the
> swallow corner (eba/semo/fufu from ₦800). Below 980px the panel becomes a horizontal
> chip row. RIGHT: four `menu-row` sections, each `data-row` keyed to a filter."

**Acceptance criteria:** panel sticks while the grid scrolls ✔ · every button filters
correctly ✔ · deals view shows only discounted cards and hides empty rows ✔.

---

## Prompt P5 — Product card component + full price table

> "Design ONE card component, then instantiate 16 (four rows × four cards — brief needs
> ≥3 rows of ≥4). Contract per card: `data-name` (lower-case search keywords incl. local
> synonyms like _dodo_, _ponmo_, _asaro_, _oha_), `data-cat`, `data-deal`. Anatomy:
> 4:3 media slot with a category gradient + emoji 'plate' as the shipped default and a
> lazy `<img src="/img/….jpg">` whose `onload` fades the photo in over the
> fallback; discount/status badge top-left; **bold product name**; quantity line; price
> row = big **₦ current price** + struck-through old price; full-width 'Add to basket'
> button. Use exactly this table and VERIFY every discount computes as
> `new = old × (1 − rate)` before writing markup:
>
> | Row | Dish                   | Quantity                         | Was    | Now    | Deal        |
> | --- | ---------------------- | -------------------------------- | ------ | ------ | ----------- | --- |
> | 1   | Egusi Soup             | 1-litre bowl · serves 3–4        | ₦8,000 | ₦6,800 | −15%        |
> | 1   | Ogbono Soup            | 1-litre bowl · serves 3–4        | ₦7,500 | ₦6,000 | −20%        |
> | 1   | Edikaikong Soup        | 1-litre bowl · serves 3–4        | ₦9,000 | ₦7,650 | −15%        |
> | 1   | Okazi Soup             | 1-litre bowl · serves 3–4        | ₦9,000 | ₦8,100 | −10%        |
> | 2   | Ewedu Soup             | 500 ml cup · serves 2            | ₦3,000 | ₦2,550 | −15%        |
> | 2   | Ora (Oha) Soup         | 1-litre bowl · serves 3–4        | ₦9,500 | ₦7,600 | −20%        |
> | 2   | Okro Soup              | 1-litre bowl · serves 3–4        | ₦7,000 | ₦5,950 | −15%        |
> | 2   | Nkwobi                 | medium wooden bowl · serves 2    | ₦8,500 | ₦7,650 | −10%        |
> | 3   | Jollof Rice            | 1 full plate · 350 g             | ₦4,500 | ₦3,600 | −20%        |
> | 3   | Fried Rice             | 1 full plate · 350 g             | ₦4,500 | ₦3,825 | −15%        |
> | 3   | Porridge Yam           | 1 plate · serves 1–2             | ₦4,000 | ₦3,400 | −15%        |
> | 3   | Porridge Beans         | 1 plate · serves 1–2             | —      | ₦3,500 | CHEF'S PICK |
> | 4   | Fried Plantain (Dodo)  | 1 pack · 10 slices               | ₦2,000 | ₦1,700 | −15%        |
> | 4   | Abacha (African Salad) | 1 large plate · with ugba & fish | ₦3,500 | ₦3,150 | −10%        |
> | 4   | Fried Chicken          | 2 laps · crispy fried            | ₦5,000 | ₦4,250 | −15%        |
> | 4   | Kpomo (Peppered)       | 6 pieces                         | —      | ₦2,000 | NEW         | "   |

---

## Prompt P6 — Customer Service + Contact section

> "Two white cards above the footer: (1) **Customer Service** — hours 8 AM–9 PM daily,
> hotline, WhatsApp link, our promise 'if your soup lands cold we replace am — no story',
> refunds within 24 h; (2) **Contact Us** (`id='contact'`) — Ogui Road
> Enugu kitchen addresses, email, order cut-off time. These are the anchor targets for
> the last two menu links, since the sticky footer itself stays slim."

**Acceptance criteria:** _Customer Service_ and _Contact Us_ nav links land correctly ✔ ·
tel:, mailto: and wa.me links are real, tappable schemes ✔.

---

## Prompt P7 — Sticky footer with all social links

> "Slim sticky footer (`position: sticky; bottom: 0`, under ~64px) in **deep navy** — the
> brief's 'blue' — with the gold ric-rac trim mirrored from the header, teeth pointing up.
> Left: © line with auto-updating year + my credit. Right: six circular icon links —
> Instagram, Facebook, X, WhatsApp, TikTok, YouTube — as inline SVGs with real
> `aria-label`s, gold hover fill, plus 'Back to top ↑'. It must never bury content: give
> the last sections extra bottom padding."

**Acceptance criteria:** footer visible during the entire scroll ✔ · settles naturally at
document end ✔ · every icon reachable and labelled by keyboard/screen reader ✔.

---

## Prompt P8 — Interactivity (vanilla JS)

> "Wire the page with ~100 commented lines of dependency-free JS that runs from a
> double-clicked file: (1) live search on the top-right input filtering cards by
> `data-name`, hiding rows that empty out, with a friendly pidgin empty-state and a
> 'Show all dishes' reset; (2) `setCategory()` powering the sidebar and the hero deals
> button — one `applyFilters()` so search and category can never fight; (3) basket
> counter with `aria-label` updates, momentary 'Added ✓' button state, and an
> `aria-live` toast parked above the sticky footer; (4) auto footer year. Use event
> delegation so one listener serves all sixteen buttons."

**Acceptance criteria:** typing "egusi" isolates one card ✔ · "soup" shows all soups ✔ ·
deals + search combine correctly ✔ · toast announced by screen readers ✔.

---

## Prompt P9 — QA & polish pass

> "Before we submit: audit contrast (white on `#8C1E2B`, gold on navy), confirm sticky
> offsets with `scroll-margin-top`, verify 4-cards-per-row locks in at ≥1160px and
> degrades 4→2 gracefully, kill all animation and smooth-scroll under
> `prefers-reduced-motion`, run an HTML tag-balance check and `node --check` on the
> extracted script, and sweep the comments so every section opens with its condensed
> prompt banner. Report results, fix what fails."

**Result:** HTML balance ✔ · JS syntax ✔ · white-on-red ≈ 8.9:1, cream-on-navy ≈ 12:1
(both AA/AAA) ✔ · reduced-motion honoured ✔ · 7 prompt banners embedded ✔.

---

## Appendix A — Image list

| Filename             | Dish           | Suggested search                   |
| -------------------- | -------------- | ---------------------------------- |
| `hero-egusi.jpg`     | Hero pot       | "egusi soup nigerian pot steaming" |
| `egusi.jpg`          | Egusi Soup     | "egusi soup"                       |
| `ogbono.jpg`         | Ogbono Soup    | "ogbono soup"                      |
| `edikaikong.jpg`     | Edikaikong     | "edikang ikong soup"               |
| `okazi.jpg`          | Okazi Soup     | "okazi / afang soup"               |
| `ewedu.jpg`          | Ewedu Soup     | "ewedu soup"                       |
| `ora-oha.jpg`        | Ora (Oha) Soup | "oha soup"                         |
| `okro.jpg`           | Okro Soup      | "nigerian okra soup"               |
| `nkwobi.jpg`         | Nkwobi         | "nkwobi"                           |
| `jollof.jpg`         | Jollof Rice    | "nigerian party jollof rice"       |
| `fried-rice.jpg`     | Fried Rice     | "nigerian fried rice"              |
| `porridge-yam.jpg`   | Porridge Yam   | "yam porridge asaro"               |
| `porridge-beans.jpg` | Porridge Beans | "nigerian beans porridge ewa"      |
| `plantain.jpg`       | Fried Plantain | "fried plantain dodo"              |
| `abacha.jpg`         | Abacha         | "abacha african salad"             |
| `fried-chicken.jpg`  | Fried Chicken  | "nigerian fried chicken"           |
| `kpomo.jpg`          | Kpomo          | "peppered ponmo"                   |

## Appendix B — Requirement traceability

| Brief requirement                                                      | Where it lives                                  |
| ---------------------------------------------------------------------- | ----------------------------------------------- |
| Logo top-left                                                          | `.brand`, Section 1                             |
| Dark-red menu bar: Products / Services / Customer Service / Contact Us | `.site-head`, Section 1                         |
| Search window at very top-right                                        | `.search`, Section 1 (live filter)              |
| Hero ≥30% height, 100% width, two halves, image + bold invite + CTA    | `.hero`, Section 2 (62vh)                       |
| Left side panel connecting to product cards                            | `.sidebar`, Section 4                           |
| ≥3 rows × ≥4 cards; bold name, quantity, ₦ price, discounts            | 4 rows × 4 cards, Sections 4                    |
| Footer with all social links                                           | `.site-foot`, Section 6                         |
| Sticky menu AND sticky footer                                          | `position: sticky` top/bottom                   |
| HTML + CSS (+ optional Tailwind)                                       | Hand-rolled CSS design system                   |
| Comments, persona, prompts displayed per section                       | `[K-note]` comments + prompt banners + this log |
