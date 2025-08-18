/* Local SEO Tools page handlers — capture-phase delegation (CSP-safe) */
(() => {
  function resultFor(form) {
    const sel = form.dataset.result;
    if (sel) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    if (form.id) {
      const el = document.getElementById(`${form.id}-result`);
      if (el) return el;
    }
    const div = document.createElement('div');
    div.setAttribute('role', 'status');
    div.setAttribute('aria-live', 'polite');
    div.className = 'mt-4 text-sm';
    form.insertAdjacentElement('afterend', div);
    return div;
  }

  const handlers = {
    faq(form, out) {
      const fd = new FormData(form);
      const q = (fd.get('question') || '').toString().trim();
      const a = (fd.get('answer') || '').toString().trim();
      if (!q || !a) {
        out.textContent = 'Enter both a question and an answer.';
        return;
      }
      const json = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [{ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }],
      };
      const pre = document.createElement('pre');
      pre.className = 'rounded-xl border border-gray-200 p-4 overflow-auto text-xs bg-white';
      pre.textContent = JSON.stringify(json, null, 2);
      out.replaceChildren(pre);
    },

    serp(form, out) {
      const fd = new FormData(form);
      const title = (fd.get('title') || '').toString().trim();
      const url = (fd.get('url') || 'www.example.com/your-page').toString().trim();
      const desc = (fd.get('description') || '').toString().trim();
      if (!title || !desc) {
        out.textContent = 'Title and description are required.';
        return;
      }
      const wrap = document.createElement('div');
      wrap.className = 'rounded-2xl border border-gray-200 p-4 shadow-sm bg-white';
      const t = document.createElement('div');
      t.className = 'text-[#1a0dab] text-lg';
      t.textContent = title;
      const u = document.createElement('div');
      u.className = 'text-[#006621] text-sm';
      u.textContent = url;
      const d = document.createElement('div');
      d.className = 'text-[#4a4a4a] text-sm mt-1';
      d.textContent = desc;
      wrap.append(t, u, d);
      out.replaceChildren(wrap);
    },

    utm(form, out) {
      const fd = new FormData(form);
      const base = (fd.get('url') || '').toString().trim();
      const params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
        .map((k) => [k, (fd.get(k) || '').toString().trim()])
        .filter(([, v]) => v);
      if (!base) {
        out.textContent = 'Enter a destination URL.';
        return;
      }
      try {
        const u = new URL(base);
        for (const [k, v] of params) u.searchParams.set(k, v);
        const box = document.createElement('div');
        box.className = 'rounded-xl border border-gray-200 p-3 bg-white text-sm break-all';
        box.textContent = u.toString();
        out.replaceChildren(box);
      } catch {
        out.textContent = 'Invalid URL.';
      }
    },

    lbschema(form, out) {
      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const phone = (fd.get('telephone') || '').toString().trim();
      const street = (fd.get('streetAddress') || '').toString().trim();
      const city = (fd.get('addressLocality') || '').toString().trim();
      const region = (fd.get('addressRegion') || '').toString().trim();
      const postal = (fd.get('postalCode') || '').toString().trim();
      const url = (fd.get('url') || '').toString().trim();

      if (!name || !phone || !street || !city || !region || !postal) {
        out.textContent = 'Fill in required business/address fields.';
        return;
      }

      const json = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name,
        telephone: phone,
        url,
        address: {
          '@type': 'PostalAddress',
          streetAddress: street,
          addressLocality: city,
          addressRegion: region,
          postalCode: postal,
        },
      };
      const pre = document.createElement('pre');
      pre.className = 'rounded-xl border border-gray-200 p-4 overflow-auto text-xs bg-white';
      pre.textContent = JSON.stringify(json, null, 2);
      out.replaceChildren(pre);
    },

    map(form, out) {
      const fd = new FormData(form);
      const q = (fd.get('q') || fd.get('query') || '').toString().trim();
      if (!q) {
        out.textContent = 'Enter an address or place.';
        return;
      }
      const src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('title', `Map of ${q}`);
      iframe.setAttribute('loading', 'lazy');
      iframe.className = 'w-full h-64 rounded-2xl border border-gray-200';
      iframe.src = src;
      out.replaceChildren(iframe);
    },

    keywords(form, out) {
      const fd = new FormData(form);
      const seed = (fd.get('seed') || '').toString().trim();
      if (!seed) {
        out.textContent = 'Enter a seed keyword.';
        return;
      }
      const ideas = [
        `${seed} near me`,
        `${seed} in Jupiter FL`,
        `${seed} affordable`,
        `${seed} same-day`,
        `${seed} eco-friendly`,
      ];
      const ul = document.createElement('ul');
      ul.className = 'mt-2 grid gap-2 sm:grid-cols-2';
      ideas.forEach((k) => {
        const li = document.createElement('li');
        li.className = 'rounded-xl border border-gray-200 px-3 py-2 shadow-sm bg-white';
        li.textContent = k;
        ul.appendChild(li);
      });
      out.replaceChildren(ul);
    },
  };

  function resolveHandler(form) {
    // Prefer explicit data-tool
    const key = form.dataset.tool;
    if (key && handlers[key]) return handlers[key];

    // Fallback by known IDs
    const id = form.id || '';
    if (/^faq-/.test(id)) return handlers.faq;
    if (/^serp-/.test(id)) return handlers.serp;
    if (/^utm-/.test(id)) return handlers.utm;
    if (/^local-business-schema-/.test(id)) return handlers.lbschema;
    if (/^maps-embed-/.test(id)) return handlers.map;
    if (/^keyword-ideas-/.test(id)) return handlers.keywords;

    return null;
  }

  // Capture-phase delegation: one listener for all tools
  document.addEventListener(
    'submit',
    (e) => {
      const form = e.target && e.target.closest ? e.target.closest('form') : null;
      if (!form) return;
      const handler = resolveHandler(form);
      if (!handler) return;
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const out = resultFor(form);
      handler(form, out);
    },
    true // capture
  );
})();
