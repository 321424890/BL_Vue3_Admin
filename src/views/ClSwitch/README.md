# CrystalSwitch 开关组件

基于 Element Plus 的 Switch 开关组件的二次封装，继承了原组件的所有功能。

## 基本用法

```vue
<template>
  <CrystalSwitch v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"

const value = ref(false)
</script>
```

## Props

| 参数                 | 类型          | 默认值  | 说明                                               |
| -------------------- | ------------- | ------- | -------------------------------------------------- |
| modelValue / v-model | boolean / any | false   | 绑定值                                             |
| disabled             | boolean       | false   | 是否禁用                                           |
| width                | number        | 40      | 开关宽度                                           |
| activeIcon           | any           | —       | 自定义激活状态图标                                 |
| inactiveIcon         | any           | —       | 自定义 inactive 状态图标                           |
| activeText           | string        | —       | 自定义激活状态文本                                 |
| inactiveText         | string        | —       | 自定义 inactive 状态文本                           |
| activeValue          | any           | true    | 激活时的值                                         |
| inactiveValue        | any           | false   | 非激活时的值                                       |
| activeColor          | string        | #409EFF | 激活时的背景色                                     |
| inactiveColor        | string        | #C0C4CC | 非激活时的背景色                                   |
| name                 | string        | —       | 原生 name 属性                                     |
| border               | boolean       | false   | 是否显示边框                                       |
| beforeChange         | function      | —       | 切换前的回调函数，返回 false 或 Promise 则停止切换 |

## Events

| 事件名             | 说明               | 参数             |
| ------------------ | ------------------ | ---------------- |
| update:model-value | 绑定值变化时触发   | 最新的绑定值     |
| change             | 开关状态变化时触发 | 最新的开关状态值 |

## Slots

| 名称          | 说明                     |
| ------------- | ------------------------ |
| active-icon   | 自定义激活状态图标       |
| inactive-icon | 自定义 inactive 状态图标 |

## 示例

### 自定义颜色

```vue
<template>
  <CrystalSwitch v-model="value" active-color="#13ce66" inactive-color="#ff4949" />
</template>
```

### 带文字描述

```vue
<template>
  <CrystalSwitch v-model="value" active-text="开启" inactive-text="关闭" />
</template>
```

### 禁用状态

```vue
<template>
  <CrystalSwitch v-model="value" disabled />
</template>
```

### 自定义图标

```vue
<template>
  <CrystalSwitch v-model="value">
    <template #active-icon>
      <el-icon><Check /></el-icon>
    </template>
    <template #inactive-icon>
      <el-icon><Close /></el-icon>
    </template>
  </CrystalSwitch>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"
import { Check, Close } from "@element-plus/icons-vue"

const value = ref(false)
</script>
```
