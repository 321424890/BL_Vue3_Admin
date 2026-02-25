# 样式文档

## 样式系统概述

本项目采用现代化的样式管理方案，使用 SCSS 预处理器和 CSS 变量实现主题定制和样式复用。样式系统主要由以下部分组成：

- **全局样式**：定义基础样式和重置样式
- **主题变量**：使用 CSS 变量实现主题定制
- **组件样式**：集成 Element Plus 和 vxe-table 的样式
- **暗黑模式**：支持亮色和暗色两种主题模式

## 样式文件结构

```
src/styles/
├── element/           # Element Plus 主题样式
│   ├── dark.scss      # 暗黑模式样式
│   └── index.scss     # 主题样式入口
├── index.scss         # 样式主入口
├── mixin.scss         # SCSS 混合器
├── namespace.scss     # 命名空间定义
├── reset.scss         # 重置样式
└── var.scss           # 全局变量定义
```

## 样式主入口

样式主入口文件 `src/styles/index.scss` 负责导入和组织所有样式：

```scss
// 导入暗黑模式
@use "element-plus/theme-chalk/src/dark/css-vars.scss" as *;

// 全局样式
@use "var.scss";

.el-table .cell {
  box-sizing: border-box;
  line-height: 23px;
  overflow: hidden;
  overflow-wrap: break-word;
  padding: 0 12px;
  text-overflow: ellipsis;
  white-space: normal;
  display: flex;
  align-items: center;
}
```

## 全局变量

全局变量定义在 `src/styles/var.scss` 文件中，使用 CSS 变量实现主题定制：

### 主题颜色变量

| 变量名               | 说明           | 默认值    |
| -------------------- | -------------- | --------- |
| `--theme-color`      | 主题主色       | `#3a6ee8` |
| `--theme-text-color` | 主题文本色     | `#252525` |
| `--theme-bg-color`   | 主题背景色     | `#f5f7f9` |
| `--theme-div-color`  | 主题卡片背景色 | `#ffffff` |
| `--theme-bg-black-1` | 主题黑色       | `#000000` |

### 左侧菜单变量

| 变量名                                 | 说明                   | 默认值                    |
| -------------------------------------- | ---------------------- | ------------------------- |
| `--left-menu-max-width`                | 左侧菜单最大宽度       | `200px`                   |
| `--left-menu-min-width`                | 左侧菜单最小宽度       | `64px`                    |
| `--left-menu-bg-color`                 | 左侧菜单背景色         | `#001529`                 |
| `--left-menu-bg-light-color`           | 左侧菜单亮色背景       | `#0f2438`                 |
| `--left-menu-bg-active-color`          | 左侧菜单激活背景色     | `var(--el-color-primary)` |
| `--left-menu-text-color`               | 左侧菜单文本色         | `#bfcbd9`                 |
| `--left-menu-text-active-color`        | 左侧菜单激活文本色     | `#ffffff`                 |
| `--left-menu-collapse-bg-active-color` | 左侧菜单折叠激活背景色 | `var(--el-color-primary)` |

### Logo 变量

| 变量名                   | 说明            | 默认值                               |
| ------------------------ | --------------- | ------------------------------------ |
| `--logo-bg-color`        | Logo 背景色     | `var(--left-menu-bg-color)`          |
| `--logo-bg-active-color` | Logo 激活背景色 | `var(--left-menu-bg-light-color)`    |
| `--logo-text-color`      | Logo 文本色     | `var(--left-menu-text-active-color)` |
| `--logo-active-color`    | Logo 激活颜色   | `var(--left-menu-text-color)`        |

### 字体大小变量

| 变量名                    | 说明         | 默认值 |
| ------------------------- | ------------ | ------ |
| `--text-normal-size`      | 正常字体大小 | `16px` |
| `--text-small-size`       | 小字体大小   | `12px` |
| `--text-useful-size`      | 常用字体大小 | `14px` |
| `--text-middle-size`      | 中等字体大小 | `20px` |
| `--text-large-size`       | 大字体大小   | `24px` |
| `--text-super-large-size` | 超大字体大小 | `32px` |

### 布局尺寸变量

| 变量名                       | 说明       | 默认值 |
| ---------------------------- | ---------- | ------ |
| `--header-global-height`     | 头部高度   | `50px` |
| `--tags-view-global-height`  | 标签页高度 | `32px` |
| `--pagination-global-height` | 分页高度   | `50px` |

### 其他变量

| 变量名            | 说明       | 默认值    |
| ----------------- | ---------- | --------- |
| `--divider-color` | 分割线颜色 | `#dbdcdd` |

## 暗黑模式

本项目支持完整的暗黑模式，通过 `html.dark` 选择器定义暗黑模式下的样式：

### 暗黑模式变量

暗黑模式为 vxe-table 提供了完整的变量覆盖：

| 变量名                                     | 说明             | 暗黑模式值              |
| ------------------------------------------ | ---------------- | ----------------------- |
| `--vxe-font-color`                         | 字体颜色         | `#98989e`               |
| `--vxe-primary-color`                      | 主色             | `var(--theme-color)`    |
| `--vxe-table-header-background-color`      | 表格表头背景色   | `#28282a`               |
| `--vxe-table-body-background-color`        | 表格主体背景色   | `#151518`               |
| `--vxe-table-row-striped-background-color` | 表格条纹行背景色 | `#2c3e50`               |
| `--vxe-input-background-color`             | 输入框背景色     | `var(--theme-bg-color)` |
| `--vxe-form-background-color`              | 表单背景色       | `var(--theme-bg-color)` |

## 样式使用规范

### 1. 组件样式

在组件中使用样式时，建议使用 SCSS 语法，并遵循以下规范：

```vue
<template>
  <div class="custom-component">
    <!-- 组件内容 -->
  </div>
</template>

<style scoped lang="scss">
.custom-component {
  // 使用全局变量
  color: var(--theme-text-color);
  background-color: var(--theme-bg-color);

  // 嵌套选择器
  .inner-element {
    font-size: var(--text-useful-size);
    margin: 10px;
  }

  // 响应式设计
  @media (max-width: 768px) {
    padding: 10px;
  }
}
</style>
```

### 2. 主题定制

如需修改主题颜色，只需修改 `var.scss` 文件中的 CSS 变量：

```scss
:root {
  // 修改主题主色
  --theme-color: #1890ff;
  // 修改其他变量...
}
```

### 3. 暗黑模式切换

项目通过修改 HTML 元素的 `class` 来切换暗黑模式：

```javascript
// 切换到暗黑模式
document.documentElement.classList.add("dark")

// 切换到亮色模式
document.documentElement.classList.remove("dark")
```

## 样式工具类

### 1. 布局工具类

| 类名           | 说明     |
| -------------- | -------- |
| `flex`         | 弹性布局 |
| `flex-center`  | 居中对齐 |
| `flex-between` | 两端对齐 |
| `flex-column`  | 垂直布局 |

### 2. 间距工具类

| 类名  | 说明        |
| ----- | ----------- |
| `m-1` | 外边距 4px  |
| `m-2` | 外边距 8px  |
| `m-3` | 外边距 12px |
| `m-4` | 外边距 16px |
| `p-1` | 内边距 4px  |
| `p-2` | 内边距 8px  |
| `p-3` | 内边距 12px |
| `p-4` | 内边距 16px |

### 3. 文本工具类

| 类名          | 说明     |
| ------------- | -------- |
| `text-center` | 文本居中 |
| `text-left`   | 文本     |
左对齐 |
| `text-right` | 文本右对齐 |
| `text-bold` | 文本加粗 |
| `text-muted` | 文本弱化 |

## 常见样式问题与解决方案

### 1. 样式冲突

**问题**：组件样式与全局样式冲突

**解决方案**：
- 使用 `scoped` 属性隔离组件样式
- 使用 BEM 命名规范避免样式冲突
- 合理使用 CSS 优先级

### 2. 暗黑模式不生效

**问题**：部分组件在暗黑模式下样式不正确

**解决方案**：
- 确保组件样式使用了 CSS 变量
- 检查是否正确添加了 `html.dark` 选择器
- 为自定义组件添加暗黑模式样式

### 3. 响应式设计问题

**问题**：页面在不同设备上显示异常

**解决方案**：
- 使用媒体查询适配不同屏幕尺寸
- 使用弹性布局和网格布局
- 避免使用固定宽度和高度

### 4. 性能优化

**问题**：样式加载缓慢

**解决方案**：
- 合理组织样式文件，避免重复导入
- 使用 CSS 变量减少样式冗余
- 优化选择器性能，避免深层次嵌套

## 样式最佳实践

1. **使用 CSS 变量**：优先使用 CSS 变量定义颜色、尺寸等，便于主题定制
2. **组件样式隔离**：使用 `scoped` 属性或 BEM 命名规范隔离组件样式
3. **响应式设计**：使用媒体查询和弹性布局实现响应式设计
4. **性能优化**：避免过度使用嵌套选择器，优化样式加载性能
5. **代码规范**：遵循 SCSS 代码规范，保持代码整洁可维护
6. **暗黑模式支持**：为所有自定义组件提供暗黑模式样式
7. **样式复用**：使用混合器和工具类提高样式复用率

## 总结

本项目的样式系统具有以下特点：

1. **现代化**：使用 SCSS 预处理器和 CSS 变量实现现代化样式管理
2. **可定制**：通过 CSS 变量实现主题定制，支持一键切换
3. **响应式**：适配不同屏幕尺寸，提供良好的用户体验
4. **性能优化**：合理组织样式文件，减少样式冗余
5. **代码规范**：遵循统一的样式规范，提高代码可维护性

通过合理使用样式系统，可以构建出美观、一致、易维护的用户界面。