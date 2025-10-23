(() => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.location.hash !== "#book") return;
  const tryScroll = () => {
    const el =
      document.getElementById("book") ||
      document.querySelector(".calendly-inline-widget") ||
      document.querySelector("[data-calendly]");
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "start", behavior: "smooth" });
      return true;
    }
    return false;
  };
  if (!tryScroll()) {
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      if (tryScroll() || n > 20) clearInterval(t);
    }, 150);
  }
})();
