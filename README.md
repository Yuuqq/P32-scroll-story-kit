# P32 Scrollytelling 脚手架

> 基于 Intersection Observer 的滚动叙事示例工程：滚动驱动场景切换与阅读进度条，改几个标签就变成你自己的滚动读图报道。

[![Live Demo](https://img.shields.io/badge/Live-Demo-c7491f?style=for-the-badge)](https://yuuqq.github.io/P32-scroll-story-kit/)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-4ade80?style=for-the-badge)](#)

## 🚀 在线体验

**[https://yuuqq.github.io/P32-scroll-story-kit/](https://yuuqq.github.io/P32-scroll-story-kit/)**

支持安装为 PWA 应用，离线使用。

## 🎓 教学使用说明

> 本工具是《新闻传播AI应用教程》（中国人民大学出版社）配套在线实验平台工具，属于**篇Ⅲ 实操篇 · 第11章 多媒体与沉浸式新闻**（教材 Tier 2 实验工具）。教材命名："Scrollytelling 脚手架"。

**学习目标**：理解滚动叙事"固定图形区＋滚动文本步进"的页面结构，能用脚手架把一组数据事实改造成场景随滚动切换的滚动报道页面。

**核心术语**：滚动叙事（Scrollytelling）、读图报道、数据新闻（Data Journalism）

**适合对象**：新闻传播专业学生 / 数据新闻初学者 / 特稿编辑

**课前准备**：浏览器打开页面即可体验内置示例；改造成自己的作品需用任意文本编辑器修改 `index.html` 中的 `step` 区块（纯前端，离线可用）。

**课堂流程建议（40 分钟，符合教材"单工具课堂可完成"标准）**
1. **演示导入**（8 分钟）：教师滚动内置"气候变化"示例，让学生观察三个机制：滚动到每段文字时左侧图形区的场景标签如何切换（Intersection Observer 触发）、顶部阅读进度条如何增长、每一步只讲一个数据事实。
2. **上手实操**（20 分钟）：学生按四步把示例改成新选题（如"本校食堂浪费调查"）：① 确定叙事线，把报道拆成 4-5 个"一步一事实"的段落；② 逐个替换 `article.step` 的标题、正文与 `data-scene` 场景标签；③ 保存刷新，检查场景切换时机是否与文字对齐；④ 同位互相滚动对方页面，标出"文字与图形不同步"的位置并修正。
3. **小组讨论**（8 分钟）：滚动叙事让读者"按作者的节奏看数据"，这与交互可视化"读者主动探索"相比谁在掌控叙事？什么题材适合滚动叙事、什么题材不适合？
4. **总结**（4 分钟）：好的滚动叙事先写叙事线再做视觉——每滚动一步只让读者吸收一个事实。

**课后作业**：将课程作业或公开数据中的一组事实（至少 4 个数据点）做成一页滚动叙事作品，提交 HTML 文件并附 200 字"叙事线设计说明"。

**评价建议**：实操完成度 40% · 分析深度 40% · 反思质量 20%

> 🔒 本工具所有数据仅在浏览器本地处理，课堂与机房环境可放心使用（支持离线）。

## ✨ 功能特性

- 🌗 暗色/亮色模式一键切换
- 🔍 `Ctrl+K` 跨工具搜索跳转
- 📱 PWA 离线支持（可安装到桌面/手机）
- ♿ 完整无障碍标签（aria-label）
- 🔒 所有数据仅在浏览器本地处理

## 🛠️ 技术栈

- 纯 HTML + CSS + JavaScript（零依赖框架）
- CSS 变量设计令牌系统
- Service Worker 缓存策略

## 📦 共享模块

- `design-tokens.css` — 统一设计令牌与暗色模式
- `dark-toggle.js` — 🌗 暗色/亮色模式切换
- `cmd-palette.js` — 🔍 Ctrl+K 命令面板
- `toast.js` — 🔔 Toast 通知系统
- `onboarding.js` — 🎯 首次访问引导
- `sw.js` — 📱 PWA Service Worker
- `pm-metrics.js` — 📊 使用量遥测

## 📄 许可

本项目为新闻素养教学工具，仅供学习与研究使用。

---

*本项目是 [新闻素养工具箱](https://yuuqq.github.io/journalism-toolbox/) 的第 32 号工具。*
