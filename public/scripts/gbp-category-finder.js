/* GBP Category Finder — capture-phase delegation (CSP-safe, no globals) */
(() => {
  if (typeof window !== "undefined") {
    console.log("[GBP] module loaded on", location.pathname);
  }

  const ATTR = "data-gbp-cat";

  function getResultEl(form) {
    const sel = form.dataset.result;
    if (sel) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    if (form.id) {
      const el = document.getElementById(`${form.id}-result`);
      if (el) return el;
    }
    const div = document.createElement("div");
    div.setAttribute("role", "status");
    div.setAttribute("aria-live", "polite");
    div.className = "mt-4 text-sm";
    form.insertAdjacentElement("afterend", div);
    return div;
  }

  function fallbackCategories(term) {
    const t = String(term || "").trim();
    if (!t) return [];
    const lower = t.toLowerCase();
    return [
      `${lower} service`,
      `${lower} company`,
      `${lower} contractor`,
      `${lower} repair`,
      `${lower} installation`,
      `best ${lower}`,
      `${lower} near me`,
    ];
  }

  async function handleSubmit(form, e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const out = getResultEl(form);
    const fd = new FormData(form);
    const term = (
      fd.get("query") ||
      fd.get("category") ||
      fd.get("q") ||
      (form.querySelector("input,textarea")?.value ?? "")
    )
      .toString()
      .trim();

    if (!term) {
      out.textContent = "Please enter a category term.";
      return;
    }

    const btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.setAttribute("data-loading", "true");
    }

    try {
      let items = [];

      try {
        // Same-origin API (works with `vercel dev`)
        const res = await fetch(`/api/places?mode=gbp-categories&q=${encodeURIComponent(term)}`, {
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          items = Array.isArray(data?.categories) ? data.categories : [];
        }
      } catch {
        // ignore network error; we’ll use fallback below
      }

      if (!items.length) {
        items = fallbackCategories(term);
      }

      if (!items.length) {
        out.textContent = "No matching categories found.";
        return;
      }

      const ul = document.createElement("ul");
      ul.className = "mt-2 space-y-2";
      for (const cat of items.slice(0, 12)) {
        const li = document.createElement("li");
        li.className = "rounded-xl border border-gray-200 px-3 py-2 shadow-sm bg-white";
        li.textContent = typeof cat === "string" ? cat : (cat?.name ?? "");
        ul.appendChild(li);
      }
      out.replaceChildren(ul);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.removeAttribute("data-loading");
      }
    }
  }

  // Capture-phase submit listener:
  // NEW: match EITHER form[data-gbp-cat] OR #gbp-cat-form so we always intercept
  document.addEventListener(
    "submit",
    (e) => {
      const form = e.target && e.target.closest ? e.target.closest("form") : null;
      if (!form || !form.matches(`form[${ATTR}], #gbp-cat-form`)) return;
      handleSubmit(form, e);
    },
    true // capture
  );
})();
