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

CrystalSwitch 支持 Element Plus Switch 组件的**所有原生属性**，以下是常用属性列表：

| 参数                 | 类型          | 默认值 | 说明                                               |
| -------------------- | ------------- | ------ | -------------------------------------------------- |
| modelValue / v-model | boolean / any | false  | 绑定值                                             |
| disabled             | boolean       | false  | 是否禁用                                           |
| width                | number        | 40     | 开关宽度                                           |
| activeText           | string        | —      | 自定义激活状态文本                                 |
| inactiveText         | string        | —      | 自定义 inactive 状态文本                           |
| activeValue          | any           | true   | 激活时的值                                         |
| inactiveValue        | any           | false  | 非激活时的值                                       |
| name                 | string        | —      | 原生 name 属性                                     |
| border               | boolean       | false  | 是否显示边框                                       |
| beforeChange         | function      | —      | 切换前的回调函数，返回 false 或 Promise 则停止切换 |
| aria-label           | string        | —      | 等价于原生 input aria-label 属性（A11y）           |

### 已废弃属性（仍支持）

Element Plus 2.3+ 推荐使用 CSS 变量来自定义样式，以下属性已被标记为废弃但仍可使用：

| 参数           | 类型   | 默认值 | 说明                                                                |
| -------------- | ------ | ------ | ------------------------------------------------------------------- |
| active-color   | string | ''     | 当在 on 状态时的背景颜色（推荐使用 CSS var `--el-switch-on-color`） |
| inactive-color | string | ''     | off 状态时的背景颜色（推荐使用 CSS var `--el-switch-off-color`）    |
| border-color   | string | ''     | 开关的边框颜色（推荐使用 CSS var `--el-switch-border-color`）       |
| label          | string | —      | 等价于原生 input aria-label 属性（已废弃，推荐使用 `aria-label`）   |

### 其他属性

所有 Element Plus Switch 组件的原生属性（如 `validate-event`、`loading` 等）均可通过 `v-bind="$attrs"` 自动支持。

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

Element Plus 2.3+ 推荐使用 CSS 变量来自定义开关颜色，支持以下变量：

| CSS 变量                   | 说明               |
| -------------------------- | ------------------ |
| `--el-switch-on-color`     | 激活时的背景颜色   |
| `--el-switch-off-color`    | 非激活时的背景颜色 |
| `--el-switch-border-color` | 开关的边框颜色     |

#### 单个组件自定义

```vue
<template>
  <CrystalSwitch
    v-model="value"
    style="
      --el-switch-on-color: #13ce66;
      --el-switch-off-color: #ff4949;
      --el-switch-border-color: #dcdfe6;
    "
  />
</template>
```

#### 全局自定义

在全局 CSS 文件中设置：

```css
:root {
  --el-switch-on-color: #13ce66;
  --el-switch-off-color: #ff4949;
  --el-switch-border-color: #dcdfe6;
}
```

然后所有的 CrystalSwitch 组件都会应用这些全局样式：

```vue
<template>
  <CrystalSwitch v-model="value" />
</template>
```

### 使用原生属性

由于组件内部使用了 `v-bind="$attrs"`，因此支持 Element Plus Switch 组件的所有原生属性和功能：

```vue
<template>
  <CrystalSwitch v-model="value" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
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

### 自定义值

可以通过 `activeValue` 和 `inactiveValue` 属性自定义开关的值：

```vue
<template>
  <div>
    <CrystalSwitch v-model="value" active-value="on" inactive-value="off" />
    <span>当前值: {{ value }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"

const value = ref("off")
</script>
```

### 自定义宽度

通过 `width` 属性自定义开关的宽度：

```vue
<template>
  <CrystalSwitch v-model="value" width="60" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"

const value = ref(false)
</script>
```

### 使用 beforeChange 回调

可以通过 `beforeChange` 属性在切换前进行验证：

```vue
<template>
  <CrystalSwitch v-model="value" :before-change="handleBeforeChange" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"

const value = ref(false)

const handleBeforeChange = (val: boolean) => {
  // 模拟异步验证
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val !== true) // 不允许切换到 true 状态
    }, 1000)
  })
}
</script>
```

### 使用 aria-label（无障碍支持）

为开关添加无障碍标签：

```vue
<template>
  <CrystalSwitch v-model="value" aria-label="启用通知" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"

const value = ref(false)
</script>
```

### 使用已废弃的颜色属性（不推荐）

虽然不推荐使用，但仍然支持已废弃的颜色属性：

```vue
<template>
  <CrystalSwitch v-model="value" active-color="#13ce66" inactive-color="#ff4949" border-color="#dcdfe6" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"

const value = ref(false)
</script>
```

### 组合使用多个属性

```vue
<template>
  <CrystalSwitch
    v-model="value"
    width="80"
    active-text="开启"
    inactive-text="关闭"
    disabled="false"
    style="
      --el-switch-on-color: #13ce66;
      --el-switch-off-color: #ff4949;
    "
    aria-label="电源开关"
  >
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
