# P32 Spec - Scrollytelling 脚手架

## 1. Summary

- **Project ID**: P32
- **Project Name**: Scrollytelling 脚手架
- **Goal**: 基于 Intersection Observer 的滚动读图报道框架，可快速复用
- **User Persona**: 特稿编辑 / 数据记者

## 2. Scope

- **In scope**:
  - 基于 Intersection Observer 的滚动读图报道框架
  - 可快速复用
- **Out of scope**:
  - 后端代理或服务端逻辑
  - API Key 持久化存储

## 3. UX

- **Core workflow**: 用户输入 → 前端处理 → 结果展示
- **Inputs**: 段落内容 + 触发图表/图片
- **Outputs**: 滚动叙事页面
- **States**: empty (初始) / loading (处理中) / error (失败) / success (完成)

## 4. Functional Requirements

1. FR-1: 基于 Intersection Observer 的滚动读图报道框架
2. FR-2: 结果可视化展示
3. FR-3: 错误状态可见提示

## 5. Non-Functional Requirements

- **Performance**: 核心任务 3 分钟内完成
- **Accessibility**: 键盘导航、aria-label、焦点可见、WCAG AA 对比度
- **Privacy**: 本地处理优先，不默认上传数据
- **Browser support**: 现代 Chromium (Chrome 110+)

## 6. Dependencies

- **Libraries/CDNs**: Intersection Observer API
- **Local data**: 无

## 7. Risks & Mitigations

- **Risk**: 低端设备滚动性能
- **Mitigation**: 降级为静态布局

## 8. Acceptance Criteria

- [ ] 滚动步骤模块
- [ ] 场景高亮切换
- [ ] 移动端降级
- [ ] 纯静态页面可部署 GitHub Pages
- [ ] 移动端可用
- [ ] 隐私提示清晰可见
