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

const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
});

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


// === hint to start editing ===
(function() {
  setTimeout(function() {
    var editor = document.querySelector('.editor') || document.querySelector('textarea');
    if (editor && editor.tagName === 'TEXTAREA' && !editor.value.trim()) {
      editor.value = '# 数据新闻：污染与健康\n\n## 第一章：问题浮现\n\n2023年冬季，某市PM2.5浓度连续30天超标...\n\n## 第二章：数据追踪\n\n通过对比环保局公开数据与卫星影像，我们发现...\n\n## 第三章：影响调查\n\n当地呼吸科门诊量同比增长47%...';
      editor.dispatchEvent(new Event('input', {bubbles:true}));
    }
  }, 600);
})();
