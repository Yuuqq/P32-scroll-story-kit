# Code Review: P32-scroll-story-kit (第二轮审查 / Second Pass)

这份文档总结了对 `P32-scroll-story-kit` 仓库代码的最新审查结果。此仓库实现了一个纯前端、基于 IntersectionObserver 的轻量级滚动读图框架。之前的审查结果包含了一些错误和过度定级的项，现已修正并补充了之前遗漏的实质性缺陷。

---

## 🔴 CRITICAL (极高风险)
*未发现严重的安全性或架构缺陷。应用仅在本地执行，不包含后端密钥、危险的 DOM 注入等。*

---

## 🟠 HIGH (高风险)

### 1. Service Worker 缓存清除策略过于激进，可能误伤同源其他应用
- **文件:** `sw.js` (Lines 31-35)
- **影响:** 在 `activate` 事件中，代码执行了全量删除：`keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))`。如果该工具与其他（如 50 个新闻工具）部署在相同的 origin 下，这会无差别地清空同源上其他所有工具的缓存，造成大面积的离线失效和重复下载。
- **修复建议:** 确保删除时仅匹配该项目专有的前缀（例如 `k.startsWith("journalism-tool-")`），避免波及无辜。

### 2. Service Worker 预缓存清单 (CORE_ASSETS) 与实际使用不符
- **文件:** `sw.js` (Line 15), `index.html` (Line 56)
- **影响:** `sw.js` 中预缓存了 `../shared/dark-toggle.js`，但 `index.html` 实际加载的是 `../shared/releases/v2.6/loader.js` (且带有众多 modules)。这导致预缓存未击中真正需要的模块加载器，削弱了 PWA 离线能力。
- **修复建议:** 修正 `sw.js` 中的 `CORE_ASSETS`，使其与 `index.html` 实际引用的资源保持一致。

---

## 🟡 MEDIUM (中风险)

### 1. 业务打点 (PM Metrics) 逻辑与页面元素不匹配
- **文件:** `app.js` (Lines 62-67), `pm-metrics.js` (Line 4, Line 80)
- **影响:**
  1. `app.js` 中的 `markTaskStart` 逻辑只监听 `button` 的点击事件，但当前页面没有任何按钮（纯滚动浏览）。这导致任务开始事件永远不会触发。
  2. `app.js` 传递的任务名为 `'scroll_story_task'`，而 `pm-metrics.js` 默认的为 `'interactive_story_core_task'`，存在命名不一致。
- **修复建议:** 修改 `app.js`，改为在页面首次发生滚动 (scroll) 时触发打点；并统一定义 `task_name`。

### 2. 死代码 (Dead Code)：错误的编辑器注入逻辑
- **文件:** `app.js` (Lines 73-83)
- **影响:** 文件底部包含一个 IIFE，尝试在 `setTimeout(..., 600)` 后查找 `.editor` 或 `textarea` 元素并注入预设的 Markdown 内容。本页面完全没有这些元素，纯属冗余死代码。
- **修复建议:** 直接删除这段代码。

### 3. 可见性、规格 (SPEC) 与实现的差异
- **文件:** `SPEC.md`, `README.md`, `index.html`
- **影响:** SPEC 和 README 中的描述与实际呈现的页面（如功能目标、共享模块列举等）呈现出三个不同的状态，存在“文档过期或虚假宣传”的问题。
- **修复建议:** 同步并更新文档，使三者描述的功能特征保持一致。

---

## 🟢 LOW (低风险)

### 1. 无障碍性 (Accessibility) 缺陷
- **文件:** `index.html`, `styles.css`, `app.js`
- **影响:**
  1. `.skip-link` (跳转到主内容) 缺乏配套的 CSS 样式，导致其功能异常或常态下突兀显示。
  2. 进度条 (`#progressBar`) 缺乏 ARIA 属性（如 `role="progressbar"`, `aria-valuenow`）。
  3. 场景切换提示文本 (`#bgLabel`) 缺少 `aria-live`，屏幕阅读器无法在内容更新时自动朗读。
  4. 页脚处的 `#666` 文本在 `#0f1728` 深色背景下对比度不足，不符合 WCAG 规范。
- **修复建议:** 补充缺失的 `aria-*` 属性，添加 `.skip-link` 的焦点样式，调亮页脚文本颜色（例如改为 `#aaa`）。

### 2. 冗余的通用 CSS 类
- **文件:** `styles.css`
- **影响:** 文件中大约有 220 行来自工具箱通用的 CSS（包含动画、 `.mission-card`, `btn-primary` 等），而在本项目的 HTML 中并未使用。
- **修复建议:** 清理掉无用的样式，以减小体积并提高可维护性。

---

## 📝 备注: 之前版本审查中的误判 (已在此版本中修正)

*   **进度条“除零变 NaN”:** `app.js` 中的 `raw` 计算已经包含了 `scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0` 的保护逻辑，该问题不存在。
*   **缺少自动化测试 (Playwright):** 作为一个仅依赖 IntersectionObserver 的极简零依赖纯静态页面，要求加入 Playwright 等重型测试框架属于过度设计，不应标为 HIGH。
*   **Observer 内存泄漏:** 本项目不是 SPA (单页应用)，元素不会被动态销毁或重建，因此不手动 `disconnect()` 不会造成内存泄漏。
*   **外部依赖 404:** 目前 `yuuqq.github.io/shared/...` 返回 HTTP 200，并没有报 404 错误。
