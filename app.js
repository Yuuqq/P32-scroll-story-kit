const steps = [...document.querySelectorAll(".step")];
const label = document.getElementById("bgLabel");
const progressBar = document.getElementById("progressBar");

function activate(step) {
  if (step.classList.contains("active")) return;
  steps.forEach(s => s.classList.remove("active"));
  step.classList.add("active");
  if (label) label.textContent = step.dataset.scene || "";
}

// Initial active state — show first scene immediately so users without
// JS-driven scroll yet (or with reduced motion) still see content state.
if (steps.length) activate(steps[0]);

if (typeof IntersectionObserver !== "undefined") {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activate(entry.target);
    });
  }, { threshold: 0.55 });
  steps.forEach(s => obs.observe(s));
} else {
  // Fallback: detect active step by viewport center on every scroll (rAF-throttled)
  let pending = false;
  const onScrollFallback = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      const center = window.innerHeight * 0.45;
      let best = null, bestDist = Infinity;
      for (const s of steps) {
        const r = s.getBoundingClientRect();
        const stepCenter = (r.top + r.bottom) / 2;
        const d = Math.abs(stepCenter - center);
        if (d < bestDist) { bestDist = d; best = s; }
      }
      if (best) activate(best);
    });
  };
  window.addEventListener("scroll", onScrollFallback, { passive: true });
  onScrollFallback();
}

window.addEventListener("scroll", () => {
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  // Clamp to handle iOS overscroll bounce (negative scrollY or > scrollTotal)
  const raw = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
  const pct = Math.max(0, Math.min(100, raw));
  if (progressBar) {
    progressBar.style.width = `${pct}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(pct));
  }
}, { passive: true });

// === PM Metrics Integration ===
(function() {
  try {
    if (!window.pmMetrics) return;
    // Auto mark task start on first meaningful interaction (scroll)
    let taskStarted = false;
    document.addEventListener('scroll', function() {
      if (taskStarted) return;
      taskStarted = true;
      window.pmMetrics.markTaskStart('interactive_story_core_task');
    }, { once: true, passive: true });
  } catch (_e) {}
})();
