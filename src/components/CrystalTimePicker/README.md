# CrystalTimePicker 组件

基于 Element Plus 的 `el-time-picker` 组件进行二次封装，提供稳定的时间选择功能，支持时间范围选择和自定义图标。

## 基本用法

```vue
<template>
  <div>
    <h3>基础用法</h3>
    <CrystalTimePicker v-model="time1" />

    <h3>自定义前缀图标</h3>
    <CrystalTimePicker v-model="time2" prefix-icon="Clock" />

    <h3>自定义后缀图标</h3>
    <CrystalTimePicker v-model="time3" suffix-icon="Calendar" />

    <h3>自定义清除图标</h3>
    <CrystalTimePicker v-model="time4" clearable prefix-icon="Clock" clear-icon="Delete" />

    <h3>不同尺寸</h3>
    <div style="display: flex; gap: 10px;">
      <CrystalTimePicker v-model="time5" size="large" />
      <CrystalTimePicker v-model="time6" size="default" />
      <CrystalTimePicker v-model="time7" size="small" />
    </div>

    <h3>禁用清除和编辑</h3>
    <CrystalTimePicker v-model="time8" :clearable="false" :editable="false" />

    <h3>禁用状态</h3>
    <CrystalTimePicker v-model="time9" disabled />

    <h3>时间范围选择</h3>
    <CrystalTimePicker
      v-model="timeRange"
      is-range
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    />

    <h3>箭头控制时间</h3>
    <CrystalTimePicker v-model="time10" arrow-control />

    <h3>使用Date对象</h3>
    <CrystalTimePicker
      v-model="dateRange"
      is-range
      range-separator="To"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalTimePicker } from "@crystalplus-ui"

const time1 = ref("")
const time2 = ref("")
const time3 = ref("")
const time4 = ref("")
const time5 = ref("")
const time6 = ref("")
const time7 = ref("")
const time8 = ref("12:00:00")
const time9 = ref("")
const time10 = ref("")
const timeRange = ref(["09:00:00", "18:00:00"])
const dateRange = ref([new Date(), new Date()])
</script>
```

## API Attributes

| 属性名                 | 说明                     | 类型                          | 默认值       |
| ---------------------- | ------------------------ | ----------------------------- | ------------ | ------- | --------- |
| **基础属性**           |                          |                               |              |
| `modelValue / v-model` | 绑定值                   | string / number / (string     | number       | Date)[] | undefined |
| `placeholder`          | 占位符                   | string                        | "请选择时间" |
| `disabled`             | 是否禁用                 | boolean                       | false        |
| `editable`             | 是否可编辑               | boolean                       | true         |
| `clearable`            | 是否可清除               | boolean                       | true         |
| `size`                 | 尺寸                     | "large" / "default" / "small" | "default"    |
| `prefix-icon`          | 前缀图标                 | any                           | undefined    |
| `suffix-icon`          | 后缀图标                 | any                           | undefined    |
| `clear-icon`           | 清除图标                 | any                           | undefined    |
| **range相关属性**      |                          |                               |              |
| `is-range`             | 是否为时间范围选择器     | boolean                       | false        |
| `range-separator`      | 范围分隔符               | string                        | "-"          |
| `start-placeholder`    | 范围选择器开始时间占位符 | string                        | undefined    |
| `end-placeholder`      | 范围选择器结束时间占位符 | string                        | undefined    |
| `arrow-control`        | 是否使用箭头控制时间     | boolean                       | false        |

## 事件

| 事件名              | 说明                  | 参数     |
| ------------------- | --------------------- | -------- |
| `update:modelValue` | 绑定值变化时触发      | 新值     |
| `change`            | 选择时间时触发        | 新值     |
| `blur`              | 失去焦点时触发        | 事件对象 |
| `focus`             | 获得焦点时触发        | 事件对象 |
| `clear`             | 清除时间时触发        | -        |
| `visible-change`    | 下拉框显示/隐藏时触发 | 显示状态 |
| `input`             | 输入时触发            | 输入值   |

## 优化功能

1. **统一图标处理**：支持字符串形式的图标名，自动转换为 Element Plus 图标组件
2. **支持多种数据类型**：支持string、number和Date对象作为绑定值
3. **稳定的range支持**：修复了range模式下的"Cannot read properties of undefined (reading 'hour')"错误

## 图标处理

组件支持多种图标使用方式：

```vue
<!-- 字符串形式（推荐） -->
<CrystalTimePicker prefix-icon="Clock" />
<CrystalTimePicker prefix-icon="search" />
<CrystalTimePicker prefix-icon="calendar" />

<!-- 组件形式 -->
<template>
  <CrystalTimePicker :prefix-icon="Clock" />
</template>

<script setup lang="ts">
import { Clock } from "@element-plus/icons-vue"
</script>
```

## 示例

### 基础用法

```vue
<CrystalTimePicker v-model="time" />
```

### 自定义图标

```vue
<!-- 自定义前缀图标 -->
<CrystalTimePicker v-model="time" prefix-icon="Clock" />

<!-- 自定义后缀图标 -->
<CrystalTimePicker v-model="time" suffix-icon="Calendar" />

<!-- 自定义清除图标 -->
<CrystalTimePicker v-model="time" clearable clear-icon="Delete" />

<!-- 同时自定义多个图标 -->
<CrystalTimePicker v-model="time" prefix-icon="Clock" suffix-icon="Calendar" clearable clear-icon="Delete" />
```

### 不同尺寸

```vue
<div style="display: flex; gap: 10px;">
  <CrystalTimePicker v-model="time1" size="large" />
  <CrystalTimePicker v-model="time2" size="default" />
  <CrystalTimePicker v-model="time3" size="small" />
</div>
```

### 禁用状态

```vue
<!-- 禁用整个组件 -->
<CrystalTimePicker v-model="time" disabled />

<!-- 禁用清除和编辑 -->
<CrystalTimePicker v-model="time" :clearable="false" :editable="false" />
```

### 时间范围选择

```vue
<!-- 基础时间范围选择 -->
<CrystalTimePicker v-model="timeRange" is-range />

<!-- 自定义分隔符和占位符 -->
<CrystalTimePicker v-model="timeRange" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />

<!-- 使用Date对象 -->
<CrystalTimePicker v-model="dateRange" is-range range-separator="To" start-placeholder="Start time" end-placeholder="End time" />
```

### 箭头控制时间

```vue
<CrystalTimePicker v-model="time" arrow-control />
```

## 继承说明

本组件基于 Element Plus `el-time-picker` 组件封装，提供稳定的时间选择功能，支持时间范围选择和自定义图标。更多详细信息可以参考 [Element Plus 官方文档](https://element-plus.org/zh-CN/component/time-picker.html)。

## 注意事项

1. 组件默认集成了 Element Plus 的样式，无需额外引入
2. 使用前请确保已安装 Element Plus
3. 支持 Vue 3.0+ 版本
4. 组件使用了 TypeScript，提供完整的类型支持
5. 当使用时间范围选择时，绑定值为数组格式 `[startTime, endTime]`
6. 支持使用 Date 对象作为绑定值，特别适合与后端 API 交互时使用
