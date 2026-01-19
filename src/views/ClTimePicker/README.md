# CrystalTimePicker 组件

基于 Element Plus 的 `el-time-picker` 组件进行二次封装，继承了所有原属性和事件，并添加了优化功能。

## 基本用法

```vue
<template>
  <div>
    <h3>基础用法</h3>
    <CrystalTimePicker v-model="time1" />

    <h3>自定义图标</h3>
    <CrystalTimePicker v-model="time2" prefix-icon="Clock" />

    <h3>禁用清除和编辑</h3>
    <CrystalTimePicker v-model="time3" clearable="false" editable="false" />

    <h3>时间范围选择</h3>
    <CrystalTimePicker v-model="time4" is-range range-separator="至" />

    <h3>箭头控制时间</h3>
    <CrystalTimePicker v-model="time5" arrow-control />

    <h3>禁用状态</h3>
    <CrystalTimePicker v-model="time6" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CrystalTimePicker } from "@crystal-ui";

const time1 = ref("");
const time2 = ref("");
const time3 = ref("12:00:00");
const time4 = ref([]);
const time5 = ref("");
const time6 = ref("");
</script>
```

## API Attributes

| 属性名               | 说明                   | 类型                                                 | 默认值       |
| -------------------- | ---------------------- | ---------------------------------------------------- | ------------ |
| **基础属性**         |                        |                                                      |              |
| modelValue / v-model | 绑定值                 | string / number / [string / number, string / number] | undefined    |
| placeholder          | 占位符                 | string                                               | "请选择时间" |
| start                | 开始时间               | string                                               | "09:00"      |
| end                  | 结束时间               | string                                               | "18:00"      |
| step                 | 时间间隔，格式为 hh:mm | string                                               | "00:30"      |
| max-time             | 最大时间               | string                                               | undefined    |
| min-time             | 最小时间               | string                                               | undefined    |
| formatter            | 格式化函数             | Function                                             | undefined    |
| parser               | 解析函数               | Function                                             | undefined    |
| disabled             | 是否禁用               | boolean / string                                     | false        |
| editable             | 是否可编辑             | boolean / string                                     | true         |
| clearable            | 是否可清除             | boolean / string                                     | true         |
| size                 | 尺寸                   | "large" / "default" / "small"                        | "default"    |
| prefix-icon          | 前缀图标               | any                                                  | undefined    |
| suffix-icon          | 后缀图标               | any                                                  | undefined    |
| clear-icon           | 清除图标               | any                                                  | undefined    |
| validate-event       | 校验事件               | boolean                                              | true         |
| popper-class         | 弹出层类名             | string                                               | ""           |
| teleported           | 是否使用 teleport      | boolean                                              | true         |
| id                   | 原生属性               | string                                               | undefined    |
| name                 | 原生属性               | string                                               | undefined    |
| readonly             | 原生属性               | boolean                                              | false        |
| validate-trigger     | 校验触发方式           | string / array                                       | undefined    |
| is-range             | 是否为时间范围选择器   | boolean                                              | false        |
| arrow-control        | 是否使用箭头控制时间   | boolean                                              |
                               | false          |
| range-separator       | 范围分隔符                   | string                                | "-"            |
| start-placeholder     | 范围选择器开始时间占位符     | string                                | undefined      |
| end-placeholder       | 范围选择器结束时间占位符     | string                                | undefined      |
| **优化属性**          |                              |                                       |                |
| input-style           | 输入框样式                   | object                                | undefined      |
| placement             | 弹出层位置                   | string                                | "bottom-start" |
| strategy              | 定位策略                     | string                                | "absolute"     |
| fallback-strategy     | 回退策略                     | string                                | "flip"         |
| gpu-acceleration      | 是否启用 GPU 加速            | boolean                               | true           |
| persistent            | 点击外部是否关闭             | boolean                               | true           |
| auto-complete         | 原生自动完成属性             | string                                | "off"          |
| aria-label            | 无障碍标签                   | string                                | undefined      |
| tabindex              | 原生 tabindex 属性           | number                                | undefined      |
| auto-focus            | 自动聚焦                     | boolean                               | false          |
| maxlength             | 最大输入长度                 | number                                | undefined      |
| minlength             | 最小输入长度                 | number                                | undefined      |
| show-word-limit       | 是否显示字数统计             | boolean                               | false          |
| resize                | 调整大小                     | string                                | undefined      |
| autosize              | 自适应高度                   | boolean / object                      | undefined      |
| autocomplete          | 原生 autocomplete 属性       | string                                | "off"          |
| autocorrect           | 原生 autocorrect 属性        | string                                | "off"          |
| autocapitalize        | 原生 autocapitalize 属性     | string                                | "off"          |
| spellcheck            | 原生 spellcheck 属性         | boolean                               | false          |
| enterkeyhint          | 原生 enterkeyhint 属性       | string                                | undefined      |
| inputmode             | 原生 inputmode 属性          | string                                | undefined      |

## 事件

| 事件名            | 说明                  | 参数         |
| ----------------- | --------------------- | ------------ |
| update:modelValue | 绑定值变化时触发      | 新值         |
| change            | 选择时间时触发        | 新值         |
| blur              | 失去焦点时触发        | 事件对象     |
| focus             | 获得焦点时触发        | 事件对象     |
| clear             | 清除时间时触发        | -            |
| visible-change    | 下拉框显示/隐藏时触发 | 显示状态     |
| input             | 输入时触发            | 输入值       |
| keydown           | 按键按下时触发        | 键盘事件     |
| keyup             | 按键抬起时触发        | 键盘事件     |
| keypress          | 按键按下并释放时触发  | 键盘事件     |
| paste             | 粘贴时触发            | 粘贴事件     |
| copy              | 复制时触发            | 复制事件     |
| cut               | 剪切时触发            | 剪切事件     |
| compositionstart  | 开始输入中文时触发    | 事件对象     |
| compositionupdate | 中文输入过程中触发    | 事件对象     |
| compositionend    | 中文输入结束时触发    | 事件对象     |

## 优化功能

1. **统一图标处理**：支持字符串形式的图标名，自动转换为 Element Plus 图标组件
2. **布尔值处理优化**：支持字符串形式的布尔值（如 `clearable="false"`）
3. **继承所有原属性**：完整继承 `el-time-picker` 的所有属性和事件
4. **更好的类型支持**：完善的 TypeScript 类型定义
5. **优化的默认配置**：更合理的默认值设置
6. **更丰富的可配置性**：添加了更多原生 HTML 属性支持
7. **更好的无障碍支持**：添加了 `aria-label` 属性
8. **更灵活的下拉框配置**：支持多种定位和回退策略
9. **支持时间范围选择**：通过 `is-range` 属性轻松实现时间范围选择
10. **箭头控制时间**：通过 `arrow-control` 属性支持箭头按钮控制时间

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
import { Clock } from "@element-plus/icons-vue";
</script>
```

## 布尔值处理

组件支持字符串形式的布尔值，方便在模板中直接使用：

```vue
<!-- 正确的用法 -->
<CrystalTimePicker clearable="false" editable="false" />
<CrystalTimePicker disabled="true" />
<CrystalTimePicker is-range="true" />

<!-- 也支持布尔值 -->
<CrystalTimePicker :clearable="false" :editable="false" />
<CrystalTimePicker :disabled="true" />
<CrystalTimePicker :is-range="true" />
```

## 示例

### 基础用法

```vue
<CrystalTimePicker v-model="time" />
```

### 时间范围选择

```vue
<CrystalTimePicker v-model="timeRange" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
```

### 箭头控制时间

```vue
<CrystalTimePicker v-model="time" arrow-control />
```

### 自定义时间范围

```vue
<CrystalTimePicker
  v-model="time"
  start="08:00"
  end="22:00"
  step="00:15"
  placeholder="选择时间"
/>
```

### 禁用状态

```vue
<CrystalTimePicker v-model="time" disabled />
```

### 禁用清除和编辑

```vue
<CrystalTimePicker v-model="time" clearable="false" editable="false" />
```

### 尺寸

```vue
<CrystalTimePicker v-model="time" size="large" />
<CrystalTimePicker v-model="time" size="default" />
<CrystalTimePicker v-model="time" size="small" />
```

### 自定义样式

```vue
<CrystalTimePicker v-model="time" input-style="width: 200px" />
```

### 下拉框位置

```vue
<CrystalTimePicker v-model="time" placement="top-start" />
```

### 自定义图标

```vue
<CrystalTimePicker v-model="time" prefix-icon="Clock" suffix-icon="Calendar" />
```

## 继承说明

本组件完全继承了 Element Plus `el-time-picker` 组件的所有功能，包括属性、事件和方法。更多详细信息可以参考 [Element Plus 官方文档](https://element-plus.org/zh-CN/component/time-picker.html)。

## 注意事项

1. 组件默认集成了 Element Plus 的样式，无需额外引入
2. 使用前请确保已安装 Element Plus
3. 支持 Vue 3.0+ 版本
4. 组件使用了 TypeScript，提供完整的类型支持
5. 当使用时间范围选择时，绑定值为数组格式 `[startTime, endTime]`
6. 组件支持通过 `formatter` 和 `parser` 属性自定义时间格式
7. 组件支持通过 `max-time` 和 `min-time` 属性限制可选时间范围