// [note] Tiny helpers — I refuse to ship jQuery for four features.
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const cards = $$(".card");
const rows = $$(".menu-row");
const searchInput = $("#search");
const noResults = $("#no-results");
const catButtons = $$(".cat-btn");

let activeCat = "all"; // sidebar state lives in ONE variable — easy to reason about

const toggle = document.querySelector(".nav-toggle");
const drawer = document.querySelector(".mobile-drawer");
const backdrop = document.querySelector(".nav-backdrop");

function openMenu() {
  drawer.classList.add("open");
  backdrop.classList.add("show");
}

function closeMenu() {
  drawer.classList.remove("open");
  backdrop.classList.remove("show");
}

toggle.addEventListener("click", openMenu);
backdrop.addEventListener("click", closeMenu);

// close when clicking a link
document.querySelectorAll(".mobile-drawer a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* ── Filtering engine ────────────────────────────────────────────────
   One function applies BOTH the sidebar category and the search query,
   so the two features can never fight each other. */
function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const inCat =
      activeCat === "all"
        ? true
        : activeCat === "deals"
          ? card.dataset.deal === "1"
          : card.dataset.cat === activeCat;
    const inQuery = !q || card.dataset.name.includes(q);
    const show = inCat && inQuery;
    card.classList.toggle("is-hidden", !show);
    if (show) visible++;
  });

  // A row with zero visible cards should vanish, header and all.
  rows.forEach((row) =>
    row.classList.toggle(
      "is-hidden",
      !row.querySelector(".card:not(.is-hidden)"),
    ),
  );
  noResults.classList.toggle("is-hidden", visible !== 0);
}

/* ── Search (top-right window) ── */
searchInput.addEventListener("input", applyFilters);
$(".search").addEventListener("submit", (e) => e.preventDefault()); // no page reload wahala
$("#reset-search").addEventListener("click", () => {
  searchInput.value = "";
  setCategory("all");
  searchInput.focus();
});

/* ── Sidebar: the left panel that connects users to the cards ── */
function setCategory(cat) {
  activeCat = cat;
  catButtons.forEach((btn) =>
    btn.setAttribute("aria-pressed", String(btn.dataset.filter === cat)),
  );
  applyFilters();
}
catButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    setCategory(btn.dataset.filter);
    $("#menu").scrollIntoView({ behavior: "smooth", block: "start" });
  }),
);

/* Hero ghost button jumps straight into deal mode. */
$("[data-goto-deals]").addEventListener("click", () => setCategory("deals"));

/* ── Basket counter + toast feedback ────────────────────────────────
   Event delegation: one listener serves all sixteen "Add to basket"
   buttons — and any card we add tomorrow. */
let basketCount = 0;
const cartBtn = $(".cart");
const cartCount = $(".cart__count");
const toast = $("#toast");
let toastTimer, buttonTimer;

$(".rows").addEventListener("click", (e) => {
  const btn = e.target.closest(".btn--add");
  if (!btn) return;

  basketCount++;
  cartCount.textContent = basketCount;
  cartCount.classList.remove("is-hidden");
  cartBtn.setAttribute(
    "aria-label",
    `View basket, ${basketCount} item${basketCount === 1 ? "" : "s"}`,
  );

  // Toast: screen-reader friendly via aria-live on the element itself.
  toast.textContent = `${btn.dataset.dish} added to basket ✓`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);

  // Momentary button confirmation, then back to normal.
  btn.classList.add("is-added");
  btn.textContent = "Added ✓";
  clearTimeout(buttonTimer);
  buttonTimer = setTimeout(() => {
    $$(".btn--add.is-added").forEach((b) => {
      b.classList.remove("is-added");
      b.textContent = "Add to basket";
    });
  }, 1400);
});

/* ── Footer year: one less thing to forget every January ── */
$("#year").textContent = new Date().getFullYear();
