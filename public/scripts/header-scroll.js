(() => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const header = document.querySelector("header.site-header");
  const spacer = document.getElementById("header-spacer");
  if (!header || !spacer) return;

  const setHeaderHeight = () => {
    const h = Math.max(72, Math.round(header.getBoundingClientRect().height));
    document.documentElement.style.setProperty("--header-h", `${h}px`);
    spacer.style.height = `var(--header-h, ${h}px)`;
  };

  const applyShrink = () => {
    const shouldShrink = window.scrollY > 8;
    header.classList.toggle("is-shrunk", shouldShrink);
  };

  setHeaderHeight();
  applyShrink();

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      applyShrink();
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  let resizeRAF;
  const onResize = () => {
    if (resizeRAF) cancelAnimationFrame(resizeRAF);
    resizeRAF = requestAnimationFrame(() => {
      setHeaderHeight();
      applyShrink();
    });
  };
  window.addEventListener("resize", onResize);
})();
