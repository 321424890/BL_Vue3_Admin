# CrystalIcon

基于 Element Plus 图标组件的二次封装，提供更丰富的功能和更好的用户体验。

## 功能特性

- ✅ 支持 Element Plus 所有图标
- ✅ 自定义内容支持
- ✅ 图标动画效果（旋转、脉冲、弹跳）
- ✅ 图标颜色渐变
- ✅ 响应式设计

## 安装

```bash
npm install crystalplus-ui
```

## 基本用法

```vue
<template>
  <!-- 使用 Element Plus 图标 -->
  <crystal-icon icon="edit" size="24" color="#1890ff" />

  <!-- 使用自定义内容 -->
  <crystal-icon size="32">
    <div class="custom-icon">🎉</div>
  </crystal-icon>
</template>

<script setup>
import { CrystalIcon } from "crystalplus-ui"
</script>
```

## 属性说明

| 属性名       | 类型          | 默认值    | 说明                                                          |
| ------------ | ------------- | --------- | ------------------------------------------------------------- |
| icon         | string        | -         | Element Plus 图标名称，例如：`edit`、`delete`、`search`       |
| size         | number/string | 'default' | 图标大小，例如：`24`、`32`、`large`                           |
| color        | string        | '#333'    | 图标颜色                                                      |
| animate      | boolean       | false     | 是否启用动画效果                                              |
| animateType  | string        | 'rotate'  | 动画类型：`rotate`（旋转）、`pulse`（脉冲）、`bounce`（弹跳） |
| gradient     | boolean       | false     | 是否启用颜色渐变                                              |
| gradientFrom | string        | '#1890ff' | 渐变起始颜色                                                  |
| gradientTo   | string        | '#52c41a' | 渐变结束颜色                                                  |

## 动画效果

### 旋转动画

```vue
<crystal-icon icon="loading" animate animateType="rotate" />
```

### 脉冲动画

```vue
<crystal-icon icon="warning" animate animateType="pulse" color="#faad14" />
```

### 弹跳动画

```vue
<crystal-icon icon="success" animate animateType="bounce" color="#52c41a" />
```

## 颜色渐变

```vue
<!-- 默认渐变色 -->
<crystal-icon icon="star" gradient size="32" />

<!-- 自定义渐变色 -->
<crystal-icon icon="heart" gradient gradient-from="#ff4d4f" gradient-to="#ff7a45" size="32" />
```

## 自定义内容

```vue
<crystal-icon size="48">
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" stroke="#1890ff" stroke-width="2" />
    <text x="50" y="55" font-size="24" text-anchor="middle" fill="#1890ff">自定义</text>
  </svg>
</crystal-icon>
```

## 组合使用

```vue
<crystal-icon icon="rocket" size="48" animate animate-type="bounce" gradient gradient-from="#ff4d4f" gradient-to="#722ed1" />
```

## 事件

支持 Element Plus ElIcon 组件的所有事件。

## 注意事项

1. 当同时使用 `icon` 属性和插槽内容时，优先显示 `icon` 属性指定的图标
2. 动画效果可能会影响性能，建议在必要时使用
3. 颜色渐变效果在某些浏览器中可能需要添加前缀

## 浏览器支持

支持所有现代浏览器，包括：

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 版本

1.0.0
