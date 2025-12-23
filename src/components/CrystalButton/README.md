# CrystalButton 组件文档

## 概述

CrystalButton 是基于 Element Plus 的 ElButton 组件封装的按钮组件，继承了 ElButton 的所有属性、事件和插槽，并提供了额外的自定义功能。

## 基本用法

```vue
<template>
  <div>
    <crystal-button>默认按钮</crystal-button>
    <crystal-button type="primary">主要按钮</crystal-button>
    <crystal-button type="success">成功按钮</crystal-button>
    <crystal-button type="info">信息按钮</crystal-button>
    <crystal-button type="warning">警告按钮</crystal-button>
    <crystal-button type="danger">危险按钮</crystal-button>
  </div>
</template>

<script setup>
import { CrystalButton } from 'crystal-ui'
</script>
```

## 属性 (Props)

所有 Element Plus ElButton 的属性都支持，详见 [Element Plus Button 文档](https://element-plus.org/zh-CN/component/button.html)。

### 常用属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | string | default | 按钮类型，可选值：primary/success/warning/danger/info |
| size | string | default | 按钮尺寸，可选值：large/default/small |
| plain | boolean | false | 是否为朴素按钮 |
| round | boolean | false | 是否为圆角按钮 |
| circle | boolean | false | 是否为圆形按钮 |
| loading | boolean | false | 是否为加载中状态 |
| disabled | boolean | false | 是否禁用状态 |
| icon | string | - | 图标类名 |
| autofocus | boolean | false | 是否默认聚焦 |
| native-type | string | button | 原生 type 属性，可选值：button/submit/reset |

## 事件 (Events)

所有 Element Plus ElButton 的事件都支持，详见 [Element Plus Button 文档](https://element-plus.org/zh-CN/component/button.html)。

### 常用事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | event: MouseEvent | 点击按钮时触发 |
| focus | event: FocusEvent | 按钮获得焦点时触发 |
| blur | event: FocusEvent | 按钮失去焦点时触发 |

## 插槽 (Slots)

所有 Element Plus ElButton 的插槽都支持，详见 [Element Plus Button 文档](https://element-plus.org/zh-CN/component/button.html)。

### 默认插槽

```vue
<template>
  <crystal-button>
    <el-icon><Edit /></el-icon>
    编辑
  </crystal-button>
</template>
```

## 示例

### 不同尺寸的按钮

```vue
<template>
  <div>
    <crystal-button size="large">大型按钮</crystal-button>
    <crystal-button>默认按钮</crystal-button>
    <crystal-button size="small">小型按钮</crystal-button>
  </div>
</template>
```

### 带图标的按钮

```vue
<template>
  <div>
    <crystal-button type="primary" :icon="Search">搜索</crystal-button>
    <crystal-button type="primary">
      <el-icon><Edit /></el-icon>
      编辑
    </crystal-button>
    <crystal-button type="primary" circle :icon="Edit" />
  </div>
</template>

<script setup>
import { Search, Edit } from '@element-plus/icons-vue'
</script>
```

### 加载状态按钮

```vue
<template>
  <div>
    <crystal-button type="primary" :loading="true">加载中</crystal-button>
    <crystal-button type="primary" :loading="isLoading" @click="handleClick">
      {{ isLoading ? '加载中...' : '点击加载' }}
    </crystal-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

const handleClick = () => {
  isLoading.value = true
  // 模拟异步操作
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>
```

### 禁用状态按钮

```vue
<template>
  <div>
    <crystal-button disabled>禁用按钮</crystal-button>
    <crystal-button type="primary" :disabled="!canSubmit">提交</crystal-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const canSubmit = ref(false)
</script>
```

### 按钮组

```vue
<template>
  <div class="button-group">
    <crystal-button type="primary">左对齐</crystal-button>
    <crystal-button type="primary">居中</crystal-button>
    <crystal-button type="primary">右对齐</crystal-button>
  </div>
</template>

<style scoped>
.button-group .crystal-button {
  margin-left: 10px;
}
.button-group .crystal-button:first-child {
  margin-left: 0;
}
</style>
```

## 注意事项

1. CrystalButton 组件完全继承了 Element Plus ElButton 的所有功能
2. 使用前请确保已正确安装和引入 Element Plus
3. 如果需要使用图标，请额外安装 @element-plus/icons-vue 包
4. 组件会自动响应 Element Plus 主题变量的变化

## 类型定义

```typescript
// CrystalButton 组件继承 ElButton 的所有类型
import type { ButtonProps } from 'element-plus'

// 使用示例
const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'large',
  loading: false
}
```