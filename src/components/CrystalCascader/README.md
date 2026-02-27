# CrystalCascader 级联选择器组件

## 组件简介

CrystalCascader 是基于 Element Plus ElCascader 组件封装的增强版级联选择器，提供了更好的自定义数据结构支持、自动清空搜索内容、完善的错误处理、自定义插槽、搜索文本高亮显示和自定义样式控制等功能，同时保留了原组件的所有核心功能。

## 特性亮点

### ✨ 增强功能

- **自动清空搜索内容**：当弹窗关闭时自动清除搜索框内容，提升用户体验
- **自定义数据结构支持**：支持自定义 `value`、`label`、`children` 字段名，灵活适配各种数据格式
- **完善的错误处理**：添加了全面的边界情况检查和错误捕获机制，确保组件稳定运行
- **精确的类型定义**：提供完整的 TypeScript 类型支持，开发更加安全便捷
- **自定义插槽**：支持自定义选项内容和已选标签的展示方式
- **搜索文本高亮显示**：当搜索时，自动高亮显示匹配的文本内容，**并且选中后高亮依然保持可见**
- **自定义样式控制**：提供丰富的样式控制选项，支持自定义颜色、边框、主题等
- **响应式设计**：组件在移动设备上可自动适应屏幕宽度

### 🎯 保留原组件所有功能

- 完整支持 Element Plus Cascader 组件的所有属性和事件
- 支持单选/多选模式
- 支持搜索过滤功能
- 支持自定义分隔符、占位符等

## 基本用法

```vue
<template>
  <CrystalCascader v-model="value" :options="options" placeholder="请选择" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const value = ref([])
const options = ref([
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致" },
          { value: "fankui", label: "反馈" },
          { value: "xiaolv", label: "效率" },
          { value: "kekong", label: "可控" }
        ]
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          { value: "cexiangdaohang", label: "侧向导航" },
          { value: "dingbudaohang", label: "顶部导航" }
        ]
      }
    ]
  },
  {
    value: "zujian",
    label: "组件",
    children: [
      {
        value: "basic",
        label: "基础组件",
        children: [
          { value: "layout", label: "布局" },
          { value: "color", label: "色彩" },
          { value: "typography", label: "排版" },
          { value: "icon", label: "图标" },
          { value: "button", label: "按钮" }
        ]
      }
    ]
  }
])
</script>
```

## 属性

### 基础属性

CrystalCascader 支持所有 ElementPlus ElCascader 的属性，同时增加了以下自定义属性：

| 属性                 | 类型      | 默认值    | 说明                                       |
| -------------------- | --------- | --------- | ------------------------------------------ |
| modelValue / v-model | any[]/any | []        | 绑定值                                     |
| options              | any[]     | []        | 选项数据源                                 |
| size                 | string    | 'default' | 尺寸，可选值为 'large', 'default', 'small' |
| disabled             | boolean   | false     | 是否禁用                                   |
| clearable            | boolean   | true      | 是否可清除                                 |
| showAllLevels        | boolean   | true      | 输入框中是否显示选中值的完整路径           |
| collapseTags         | boolean   | false     | 多选模式下是否折叠标签                     |
| separator            | string    | '/'       | 选项分隔符                                 |
| filterable           | boolean   | false     | 是否可搜索                                 |
| debounce             | number    | 300       | 搜索关键词输入的防抖延迟                   |
| placeholder          | string    | '请选择'  | 占位符                                     |
| checkStrictly        | boolean   | false     | 是否严格的遵循父子节点不互相关联           |
| multiple             | boolean   | false     | 是否多选                                   |

### 自定义数据结构属性

| 属性     | 类型   | 默认值     | 说明               |
| -------- | ------ | ---------- | ------------------ |
| value    | string | 'value'    | 自定义值字段名     |
| label    | string | 'label'    | 自定义标签字段名   |
| children | string | 'children' | 自定义子节点字段名 |

### 增强功能属性

| 属性              | 类型               | 默认值 | 说明                                    |
| ----------------- | ------------------ | ------ | --------------------------------------- |
| autoClearSearch   | boolean            | true   | 弹窗关闭时是否自动清除搜索内容          |
| teleport-to       | string/HTMLElement | 'body' | 指定弹出层挂载位置                      |
| teleported        | boolean            | true   | 是否使用 teleport                       |
| validateEvent     | boolean            | true   | 输入时是否触发表单的校验                |
| reserve-keyword   | boolean            | true   | 是否保留搜索关键字（新版本默认为 true） |
| automaticDropdown | boolean            | false  | 输入框聚焦时是否自动展开下拉菜单        |
| fitInputWidth     | boolean            | false  | 弹出层宽度是否与输入框保持一致          |
| multipleLimit     | number/null        | null   | 多选模式下用户最多可以选择的项目数      |

### 新增功能属性

| 属性                | 类型    | 默认值 | 说明                                             |
| ------------------- | ------- | ------ | ------------------------------------------------ |
| highlightSearchText | boolean | true   | 是否高亮显示搜索文本，**选中后高亮依然保持可见** |
| borderColor         | string  | ''     | 自定义边框颜色，设置后会覆盖默认样式             |
| backgroundColor     | string  | ''     | 自定义背景颜色                                   |
| textColor           | string  | ''     | 自定义文本颜色，设置后会覆盖默认样式             |
| placeholderColor    | string  | ''     | 自定义占位符颜色                                 |
| theme               | string  | ''     | 主题，可选值为 'light', 'dark', 'borderless'     |

## 事件

| 事件名            | 说明                  | 参数                          |
| ----------------- | --------------------- | ----------------------------- |
| update:modelValue | 绑定值变化时触发      | 选中的值                      |
| change            | 选中值变化时触发      | 选中的值                      |
| visible-change    | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| expand-change     | 展开/收起节点时触发   | 值数组，状态                  |
| remove-tag        | 移除标签时触发        | 移除的标签值                  |

## 插槽

| 插槽名  | 说明                     | 参数           |
| ------- | ------------------------ | -------------- |
| default | 自定义选项模板           | { node, data } |
| prefix  | 输入框前置内容           | -              |
| suffix  | 输入框后置内容           | -              |
| option  | 自定义选项内容（增强版） | { node, data } |
| tags    | 自定义已选标签展示       | { node, data } |

## 高级用法示例

### 自定义数据结构

```vue
<template>
  <CrystalCascader
    v-model="selectedValue"
    :options="customOptions"
    value="code"
    label="name"
    children="subItems"
    placeholder="使用自定义字段名"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const selectedValue = ref([])

const customOptions = ref([
  {
    code: "001",
    name: "产品类别",
    subItems: [
      { code: "00101", name: "电子产品" },
      { code: "00102", name: "生活用品" }
    ]
  },
  {
    code: "002",
    name: "服务类别",
    subItems: [
      { code: "00201", name: "在线服务" },
      { code: "00202", name: "实体服务" }
    ]
  }
])
</script>
```

### 多选模式

```vue
<template>
  <CrystalCascader
    v-model="selectedValues"
    :options="options"
    multiple
    collapse-tags
    :multiple-limit="3"
    placeholder="请选择多个选项"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const selectedValues = ref([])
const options = ref([
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致" },
          { value: "fankui", label: "反馈" },
          { value: "xiaolv", label: "效率" },
          { value: "kekong", label: "可控" }
        ]
      }
    ]
  },
  {
    value: "zujian",
    label: "组件",
    children: [
      {
        value: "basic",
        label: "基础组件"
      }
    ]
  }
])
</script>
```

### 自动清空搜索内容

```vue
<template>
  <CrystalCascader
    v-model="selectedValue"
    :options="options"
    filterable
    auto-clear-search
    placeholder="搜索后关闭弹窗会自动清空搜索内容"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const selectedValue = ref([])
const options = ref([
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致" },
          { value: "fankui", label: "反馈" },
          { value: "xiaolv", label: "效率" },
          { value: "kekong", label: "可控" }
        ]
      }
    ]
  }
])
</script>
```

### 自定义选项内容（使用 option 插槽）

```vue
<template>
  <CrystalCascader v-model="selectedValue" :options="options" placeholder="自定义选项内容">
    <template #option="{ node, data }">
      <div class="custom-option">
        <el-tag size="small" type="info" v-if="data.isHot">热门</el-tag>
        <span>{{ node.label }}</span>
        <el-icon v-if="data.icon"><component :is="data.icon" /></el-icon>
      </div>
    </template>
  </CrystalCascader>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"
import { Star, StarFilled } from "@element-plus/icons-vue"

const selectedValue = ref([])
const options = ref([
  {
    value: "option1",
    label: "选项1",
    isHot: true,
    icon: StarFilled
  },
  {
    value: "option2",
    label: "选项2",
    isHot: false,
    icon: Star
  }
])
</script>

<style scoped>
.custom-option {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

### 搜索文本高亮显示

```vue
<template>
  <CrystalCascader
    v-model="selectedValue"
    :options="options"
    filterable
    highlight-search-text
    placeholder="搜索文本将高亮显示（选中后高亮依然可见）"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const selectedValue = ref([])
const options = ref([
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致" },
          { value: "fankui", label: "反馈" },
          { value: "xiaolv", label: "效率" },
          { value: "kekong", label: "可控" }
        ]
      }
    ]
  }
])
</script>
```

### 自定义样式

```vue
<template>
  <div class="demo-container">
    <!-- 自定义颜色 -->
    <CrystalCascader
      v-model="value1"
      :options="options"
      border-color="#409EFF"
      background-color="#f0f9eb"
      text-color="#36cfc9"
      placeholder="自定义颜色"
    />

    <!-- 红色边框示例 -->
    <CrystalCascader v-model="valueRed" :options="options" border-color="red" placeholder="红色边框" />

    <!-- 绿色文字示例 -->
    <CrystalCascader v-model="valueGreenText" :options="options" text-color="#67c23a" placeholder="绿色文字" />

    <!-- 暗色主题 -->
    <CrystalCascader v-model="value2" :options="options" theme="dark" placeholder="暗色主题" />

    <!-- 无边框样式 -->
    <CrystalCascader v-model="value3" :options="options" theme="borderless" placeholder="无边框样式" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const value1 = ref([])
const valueRed = ref([])
const valueGreenText = ref([])
const value2 = ref([])
const value3 = ref([])
const options = ref([
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致" },
          { value: "fankui", label: "反馈" }
        ]
      }
    ]
  }
])
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
</style>
```

### 自定义已选标签（使用 tags 插槽）

```vue
<template>
  <CrystalCascader v-model="selectedValues" :options="options" multiple placeholder="自定义标签展示">
    <template #tags="{ node, data }">
      <div class="custom-tag">
        <el-avatar size="small" :src="data.avatar || ''"></el-avatar>
        <span>{{ node.label }}</span>
      </div>
    </template>
  </CrystalCascader>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const selectedValues = ref([])
const options = ref([
  {
    value: "user1",
    label: "张三",
    avatar: "https://example.com/avatar1.jpg"
  },
  {
    value: "user2",
    label: "李四",
    avatar: "https://example.com/avatar2.jpg"
  }
])
</script>

<style scoped>
.custom-tag {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
```

### 组合使用搜索高亮和自定义样式

```vue
<template>
  <CrystalCascader
    v-model="selectedValue"
    :options="options"
    filterable
    highlight-search-text
    border-color="#409EFF"
    text-color="#67c23a"
    placeholder="带样式的搜索高亮"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalCascader } from "crystalplus-ui"

const selectedValue = ref([])
const options = ref([
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则"
      },
      {
        value: "daohang",
        label: "导航"
      }
    ]
  }
])
</script>
```

## 兼容性说明

- 支持 Vue 3.0+ 和 Element Plus 2.0+
- 完全兼容 TypeScript
- 支持现代浏览器（Chrome, Firefox, Safari, Edge）
- 在移动设备上自动适配响应式布局

## FAQ

**Q: 如何处理异步加载的动态数据？**
A: 直接将获取的数据赋值给 `options` 属性即可，组件内部会自动处理数据格式和边界情况。

**Q: 自定义字段名后，搜索功能是否正常工作？**
A: 是的，组件内部会自动转换数据结构，确保搜索功能和高亮功能正常工作。

**Q: 组件是否有错误处理机制？**
A: 是的，组件添加了全面的错误处理和边界情况检查，可以安全处理无效数据、空数据等异常情况。

**Q: 自定义插槽和搜索高亮功能是否可以同时使用？**
A: 是的，这两个功能可以完美结合使用，通过 option 插槽自定义内容时，搜索高亮依然会正常工作。

**Q: 搜索高亮在选项选中后是否依然可见？**
A: 是的，组件专门优化了这一功能，确保即使在选中选项后，搜索关键词的高亮依然能够保持可见，提升用户体验。

**Q: 自定义颜色样式（如边框颜色、文字颜色）是否会覆盖默认样式？**
A: 是的，组件使用了增强的样式优先级处理，确保自定义颜色属性能够正确覆盖默认样式，无需额外的样式穿透处理。
