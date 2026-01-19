# CrystalButton 组件使用文档

## 简介

`CrystalButton` 是一个基于 Element Plus `el-button` 的增强型封装组件，它完全继承了 `el-button` 的所有属性、事件和功能，并增加了渐变效果和自定义圆角功能。

### 核心特性

- ✅ **完全继承 Element Plus `el-button` 的所有属性**
- ✅ **完全继承 Element Plus `el-button` 的所有事件**
- ✅ **保持与 Element Plus 样式完全一致**
- ✅ **支持 Element Plus 主题定制**
- ✅ **支持渐变背景效果**
- ✅ **支持自定义圆角**
- ✅ **支持图标字符串直接传递**

## 快速开始

### 基本用法

```vue
<template>
  <div>
    <!-- 基础按钮 -->
    <CrystalButton>默认按钮</CrystalButton>
    
    <!-- 带类型的按钮 -->
    <CrystalButton type="primary">主要按钮</CrystalButton>
    <CrystalButton type="success">成功按钮</CrystalButton>
    <CrystalButton type="warning">警告按钮</CrystalButton>
    <CrystalButton type="danger">危险按钮</CrystalButton>
    <CrystalButton type="info">信息按钮</CrystalButton>
  </div>
</template>

<script setup lang="ts">
import { CrystalButton } from '@/components/CrystalButton'
</script>
```

### 安装与注册

```ts
// 全局注册
import { createApp } from 'vue'
import CrystalUI from 'crystal-ui'
import 'crystal-ui/dist/index.css'

const app = createApp(App)
app.use(CrystalUI)

// 按需引入
import { CrystalButton } from 'crystal-ui'
import 'crystal-ui/dist/index.css'

export default {
  components: {
    CrystalButton
  }
}
```

## 属性说明

`CrystalButton` 完全继承了 Element Plus `el-button` 的所有属性，并增加了以下增强属性：

### 增强属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| gradient | boolean | false | 是否启用渐变背景 |
| gradientFrom | string | #1890ff | 渐变起始颜色 |
| gradientTo | string | #52c41a | 渐变结束颜色 |
| borderRadius | string |  | 自定义圆角大小（如 "4px", "8px", "50%"） |
| icon | string |  | 图标名称（支持 Element Plus 所有图标，直接传递字符串即可） |

### 常用属性示例

```vue
<!-- 基础按钮 -->
<CrystalButton>默认按钮</CrystalButton>
<CrystalButton type="primary">主要按钮</CrystalButton>

<!-- 渐变按钮 -->
<CrystalButton gradient type="primary">渐变按钮</CrystalButton>
<CrystalButton gradient gradientFrom="#ff0000" gradientTo="#0000ff">自定义渐变</CrystalButton>

<!-- 圆角按钮 -->
<CrystalButton borderRadius="8px" type="primary">圆角按钮</CrystalButton>
<CrystalButton borderRadius="50%" type="success">圆形按钮</CrystalButton>

<!-- 图标按钮 -->
<CrystalButton icon="Search">搜索</CrystalButton>
<CrystalButton type="primary" icon="Edit">编辑</CrystalButton>
<CrystalButton circle icon="Search" />

<!-- 按钮状态 -->
<CrystalButton disabled>禁用按钮</CrystalButton>
<CrystalButton loading>加载中</CrystalButton>
<CrystalButton plain>朴素按钮</CrystalButton>
<CrystalButton round>圆角按钮</CrystalButton>
```

## 事件说明

`CrystalButton` 完全继承了 Element Plus `el-button` 的所有事件，并支持以下常用事件：

### 常用事件

| 事件名 | 说明 |
| --- | --- |
| click | 点击按钮时触发 |
| mousedown | 鼠标按下时触发 |
| mouseup | 鼠标松开时触发 |
| mouseenter | 鼠标进入按钮时触发 |
| mouseleave | 鼠标离开按钮时触发 |

### 常用事件示例

```vue
<template>
  <CrystalButton 
    @click="handleClick" 
    @mouseenter="handleMouseEnter"
    type="primary"
  >
    点击我
  </CrystalButton>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('按钮被点击了！')
}

const handleMouseEnter = () => {
  console.log('鼠标进入按钮')
}
</script>
```

## 浏览器兼容性

与 Element Plus 保持一致：

| 浏览器 | 版本要求 | 支持状态 |
|-------|---------|---------|
| Chrome | ≥ 60 | ✅ |
| Firefox | ≥ 55 | ✅ |
| Safari | ≥ 12 | ✅ |
| Edge | ≥ 79 | ✅ |
| IE | - | ❌（不支持） |

## 注意事项

1. **与 Element Plus 保持一致**：
   - 组件完全继承 Element Plus `el-button` 的所有功能
   - 样式、属性、事件与 Element Plus 官方文档完全一致

2. **主题定制**：
   - 支持通过 Element Plus 的主题系统进行样式定制
   - 请参考 [Element Plus 主题定制文档](https://element-plus.org/zh-CN/guide/theming.html)

## 版本说明

### v1.1.0
- ✨ 新增渐变背景功能
- ✨ 新增自定义圆角功能
- ✨ 支持图标字符串直接传递
- 🐛 修复点击事件透传问题
- 📝 更新文档说明

### v1.0.0
- ✨ 基于 Element Plus `el-button` 封装
- ✨ 完全继承 `el-button` 的所有属性和事件
- ✨ 保持与 Element Plus 样式一致性

## 更新日志

### v1.0.0 (2026-01-13)
- 首次发布
- 实现核心功能
- 完善文档和示例

## 贡献指南

如果您有任何建议或发现了 bug，欢迎提交 Issue 或 Pull Request。

## 许可证

MIT License