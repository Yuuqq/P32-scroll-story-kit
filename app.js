const steps = [...document.querySelectorAll(".step")];
const label = document.getElementById("bgLabel");

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      steps.forEach(s => s.classList.remove("active"));
      entry.target.classList.add("active");
      label.textContent = entry.target.dataset.scene || "";
    }
  });
}, { threshold: 0.55 });

steps.forEach(s => obs.observe(s));

// === PM Metrics Integration ===
(function() {
  try {
    if (!window.pmMetrics) return;
    // Auto mark task start on first meaningful interaction
    let taskStarted = false;
    document.addEventListener('click', function(e) {
      if (taskStarted) return;
      const btn = e.target.closest('button');
      if (btn) {
        taskStarted = true;
        window.pmMetrics.markTaskStart('scroll_story_task');
      }
    }, { once: false });
  } catch (_e) {}
})();
