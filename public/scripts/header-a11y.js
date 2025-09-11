(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const header = document.querySelector('header.site-header');
  if (!header) return;

  const triggers = [...header.querySelectorAll("li.group > button[aria-haspopup='true']")];
  if (!triggers.length) return;

  const submenu = (btn) => btn.closest('li.group')?.querySelector('.submenu') || null;
  const focusables = (root) =>
    root
      ? [...root.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(
          (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
        )
      : [];

  let openBtn = null;

  const setExpanded = (btn, exp) => {
    btn.setAttribute('aria-expanded', exp ? 'true' : 'false');
    if (exp) {
      openBtn = btn;
      const m = submenu(btn);
      if (m) {
        if (!m.id) m.id = 'submenu-' + Math.random().toString(36).slice(2);
        btn.setAttribute('aria-controls', m.id);
      }
    } else if (openBtn === btn) {
      openBtn = null;
    }
  };

  const closeAll = () => triggers.forEach((b) => setExpanded(b, false));

  document.addEventListener('click', (e) => {
    if (!openBtn) return;
    const li = openBtn.closest('li.group');
    if (!li || !li.contains(e.target)) closeAll();
  });

  triggers.forEach((btn) => {
    const li = btn.closest('li.group');
    if (!li) return;

    setExpanded(btn, false);

    li.addEventListener('mouseenter', () => setExpanded(btn, true));
    li.addEventListener('mouseleave', () => setExpanded(btn, false));

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const exp = btn.getAttribute('aria-expanded') === 'true';
      setExpanded(btn, !exp);
      if (!exp) {
        const m = submenu(btn);
        const items = focusables(m);
        if (items.length) items[0].focus();
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setExpanded(btn, true);
        const m = submenu(btn);
        const items = focusables(m);
        if (items.length) items[0].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setExpanded(btn, false);
        btn.focus();
      }
    });

    const m = submenu(btn);
    if (!m) return;

    m.addEventListener('keydown', (e) => {
      const items = focusables(m);
      if (!items.length) return;
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(i + 1 + items.length) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(i - 1 + items.length) % items.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setExpanded(btn, false);
        btn.focus();
      }
    });

    m.addEventListener('focusout', () => {
      setTimeout(() => {
        const li2 = btn.closest('li.group');
        if (li2 && !li2.contains(document.activeElement)) setExpanded(btn, false);
      }, 0);
    });
  });
})();
