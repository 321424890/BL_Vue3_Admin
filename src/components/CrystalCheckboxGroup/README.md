# CrystalCheckboxGroup 组件使用文档

## 组件介绍

`CrystalCheckboxGroup` 是一个基于 Element Plus 的 `el-checkbox-group` 扩展组件，提供了更丰富的自定义样式选项和灵活的使用方式。该组件支持水平/垂直排列、自定义颜色、边框样式，并提供了通过 `options` 数组自动生成选项或通过插槽自定义选项内容的能力。

## 引入方式

### 全局引入

```javascript
// 在 main.js 或 main.ts 中
import { createApp } from "vue"
import App from "./App.vue"
import CrystalUI from "crystalplus-ui"

const app = createApp(App)
app.use(CrystalUI)
app.mount("#app")
```

### 局部引入

```javascript
// 在需要使用的组件中
import { CrystalCheckboxGroup } from "crystalplus-ui"

export default {
  components: {
    CrystalCheckboxGroup
  }
}
```

## 基本用法

### 使用 options 数组生成选项

```vue
<template>
  <CrystalCheckboxGroup v-model="selectedValues" :options="options" />
</template>

<script setup>
import { ref } from "vue"

const selectedValues = ref(["Option 1", "Option 3"])
const options = [
  { label: "选项1", value: "Option 1" },
  { label: "选项2", value: "Option 2" },
  { label: "选项3", value: "Option 3", disabled: true }
]
</script>
```

### 使用插槽自定义选项

```vue
<template>
  <CrystalCheckboxGroup v-model="selectedValues">
    <el-checkbox label="Option A">选项 A</el-checkbox>
    <el-checkbox label="Option B">选项 B</el-checkbox>
    <el-checkbox label="Option C">选项 C</el-checkbox>
  </CrystalCheckboxGroup>
</template>

<script setup>
import { ref } from "vue"

const selectedValues = ref(["Option A"])
</script>
```

## 属性说明

| 属性名         | 类型     | 默认值       | 说明                                                 |
| -------------- | -------- | ------------ | ---------------------------------------------------- |
| modelValue     | Array    | []           | 绑定值                                               |
| size           | string   | 'default'    | 尺寸，可选值为 'large', 'default', 'small'           |
| disabled       | boolean  | false        | 是否禁用                                             |
| min            | number   | -            | 可被勾选的 checkbox 的最小数量                       |
| max            | number   | -            | 可被勾选的 checkbox 的最大数量                       |
| border         | boolean  | false        | 是否显示边框                                         |
| options        | Array    | []           | 选项数组，每个元素包含 label、value 和 disabled 属性 |
| direction      | string   | 'horizontal' | 选项排列方向，可选值为 'horizontal' 或 'vertical'    |
| beforeChange   | Function | -            | 变化前的钩子函数，返回 false 可以阻止选择变化        |
| checkboxColor  | string   | ''           | 复选框选中状态下的背景色                             |
| fillColor      | string   | ''           | 同 checkboxColor，优先级低于 checkboxColor           |
| borderColor    | string   | ''           | 边框颜色                                             |
| fontColor      | string   | ''           | 字体颜色                                             |
| textColor      | string   | ''           | 同 fontColor，优先级低于 fontColor                   |
| highlight      | boolean  | false        | 是否启用高亮效果                                     |
| highlightColor | string   | '#409EFF'    | 高亮颜色                                             |
| hoverColor     | string   | '#409EFF'    | 鼠标悬停颜色                                         |

## 事件说明

| 事件名            | 说明                   | 回调参数     |
| ----------------- | ---------------------- | ------------ |
| change            | 绑定值变化时触发的事件 | 选中的数组值 |
| update:modelValue | 绑定值更新事件         | 选中的数组值 |

## 高级用法示例

### 自定义样式

```vue
<template>
  <CrystalCheckboxGroup
    v-model="selectedValues"
    :options="options"
    checkbox-color="#67c23a"
    border-color="#dcdfe6"
    font-color="#303133"
    direction="vertical"
  />
</template>
```

### 限制选择数量

```vue
<template>
  <CrystalCheckboxGroup v-model="selectedValues" :options="options" :min="1" :max="2" />
</template>
```

### 监听值变化

```vue
<template>
  <CrystalCheckboxGroup v-model="selectedValues" :options="options" @change="handleChange" />
</template>

<script setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"

const selectedValues = ref([])
const options = [
  { label: "选项1", value: "Option 1" },
  { label: "选项2", value: "Option 2" },
  { label: "选项3", value: "Option 3" }
]

const handleChange = values => {
  ElMessage.success(`已选择 ${values.length} 个选项`)
  console.log("Selected values:", values)
}
</script>
```

### 使用 beforeChange 阻止选择

```vue
<template>
  <CrystalCheckboxGroup v-model="selectedValues" :options="options" :before-change="beforeChange" />
</template>

<script setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"

const selectedValues = ref([])
const options = [
  { label: "选项1", value: "Option 1" },
  { label: "选项2", value: "Option 2" },
  { label: "选项3", value: "Option 3" }
]

const beforeChange = values => {
  if (values.length > 2) {
    ElMessage.warning("最多只能选择2个选项")
    return false
  }
  return true
}
</script>
```

### 带有边框的样式

```vue
<template>
  <CrystalCheckboxGroup v-model="selectedValues" :options="options" border size="small" />
</template>
```

## 注意事项

1. 当同时设置 `options` 数组和插槽内容时，将优先使用插槽内容
2. 自定义颜色属性（checkboxColor、fillColor、borderColor、fontColor、textColor）会覆盖默认样式
3. 确保 `v-model` 绑定的是一个数组类型的数据
4. 当使用自定义样式时，为了获得最佳效果，建议同时设置相关的颜色属性

## 兼容性

该组件基于 Vue 3 和 Element Plus 构建，与这两个库的兼容性保持一致。请确保您的项目环境中已正确安装和配置了 Vue 3 和 Element Plus。
