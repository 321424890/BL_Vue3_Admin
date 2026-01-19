# CrystalTimeSelect 时间选择器

基于 Element Plus 的 `el-time-select` 组件进行二次封装，继承了原组件的所有属性和事件，并添加了一些优化功能。

## 基本用法

```vue
<template>
  <CrystalTimeSelect v-model="time" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalTimeSelect } from '@/components/CrystalTimeSelect'

const time = ref('')
</script>
```

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
|-------|------|------|--------|
| modelValue / v-model | 绑定值 | string | — |
| placeholder | 占位符 | string | 请选择时间 |
| start | 开始时间 | string | 09:00 |
| end | 结束时间 | string | 18:00 |
| step | 间隔时间 | string | 00:30 |
| maxTime | 最大时间 | string | — |
| minTime | 最小时间 | string | — |
| formatter | 时间格式化函数 | (value: string) => string | — |
| parser | 时间解析函数 | (value: string) => string | — |
| disabled | 是否禁用 | boolean | false |
| editable | 文本框是否可输入 | boolean | true |
| clearable | 是否显示清除按钮 | boolean | true |
| size | 尺寸 | enum | default |
| prefix-icon | 自定义前缀图标 | string / Component | — |
| suffix-icon | 自定义后缀图标 | string / Component | — |
| clear-icon | 自定义清除图标 | string / Component | — |
| validate-event | 输入时是否触发表单验证 | boolean | true |
| popper-class | 自定义浮层类名 | string | — |
| teleported | 是否使用 teleport | boolean | true |
| id | 原生 id | string | — |
| name | 原生 name | string | — |
| readonly | 原生 readonly 属性 | boolean | false |
| validate-trigger | 验证触发方式 | string / array | — |
| show-arrow | 是否显示下拉箭头 | boolean | true |
| hours | 小时选项 | array | — |
| minutes | 分钟选项 | array | — |
| seconds | 秒选项 | array | — |
| show-trigger | 是否显示触发按钮 | boolean | true |
| hide-disabled-options | 是否隐藏禁用的选项 | boolean | false |
| fit-input-width | 下拉菜单是否适配输入框宽度 | boolean | false |
| input-style | 输入框样式 | object | — |
| tag | 自定义标签 | string | — |
| value-key | 选项值的 key | string | value |
| placement | 下拉框的位置 | string | bottom-start |
| strategy | 定位策略 | string | absolute |
| fallback-strategy | 回退策略 | string | flip |
| gpu-acceleration | 是否启用 GPU 加速 | boolean | true |
| persistent | 下拉框是否保持打开状态 | boolean | true |
| auto-complete | 原生 auto-complete 属性 | string | off |
| aria-label | 无障碍标签 | string | — |
| tabindex | 原生 tabindex 属性 | number | — |
| auto-focus | 是否自动聚焦 | boolean | false |
| maxlength | 最大输入长度 | number | — |
| minlength | 最小输入长度 | number | — |
| show-word-limit | 是否显示字数统计 | boolean | false |
| resize | 文本框是否可调整大小 | string | — |
| autosize | 自适应内容高度 | boolean / object | — |
| autocomplete | 原生 autocomplete 属性 | string | off |
| autocorrect | 原生 autocorrect 属性 | string | off |
| autocapitalize | 原生 autocapitalize 属性 | string | off |
| spellcheck | 原生 spellcheck 属性 | boolean | false |
| enterkeyhint | 原生 enterkeyhint 属性 | string | — |
| inputmode | 原生 inputmode 属性 | string | — |

### Events

| 事件名 | 说明 | 回调参数 |
|-------|------|--------|
| update:modelValue | 绑定值变化时触发 | value: string |
| change | 值改变时触发 | value: string |
| blur | 失去焦点时触发 | event: FocusEvent |
| focus | 获得焦点时触发 | event: FocusEvent |
| clear | 点击清除按钮时触发 | — |
| visible-change | 下拉框显示/隐藏时触发 | visible: boolean |
| remove-tag | 移除标签时触发 | tag: any |
| input | 输入时触发 | value: string |
| keydown | 按下按键时触发 | event: KeyboardEvent |
| keyup | 松开按键时触发 | event: KeyboardEvent |
| keypress | 按键按下时触发 | event: KeyboardEvent |
| paste | 粘贴时触发 | event: ClipboardEvent |
| copy | 复制时触发 | event: ClipboardEvent |
| cut | 剪切时触发 | event: ClipboardEvent |
| compositionstart | 开始输入中文时触发 | event: CompositionEvent |
| compositionupdate | 中文输入中触发 | event: CompositionEvent |
| compositionend | 中文输入结束时触发 | event: CompositionEvent |

## 优化功能

1. **更丰富的可配置性**：添加了更多原生 HTML 属性支持，如 `autofocus`、`maxlength` 等
2. **更好的无障碍支持**：添加了 `aria-label` 属性
3. **更灵活的下拉框配置**：支持 `placement`、`strategy`、`fallback-strategy` 等配置
4. **优化的选项显示**：支持 `hide-disabled-options` 隐藏禁用选项
5. **更适配的下拉框**：支持 `fit-input-width` 适配输入框宽度

## 示例

### 基本用法

```vue
<CrystalTimeSelect v-model="time" />
```

### 自定义时间范围

```vue
<CrystalTimeSelect
  v-model="time"
  start="08:00"
  end="22:00"
  step="00:15"
  placeholder="选择时间"
/>
```

### 禁用状态

```vue
<CrystalTimeSelect v-model="time" disabled />
```

### 清除按钮

```vue
<CrystalTimeSelect v-model="time" clearable />
```

### 尺寸

```vue
<CrystalTimeSelect v-model="time" size="large" />
<CrystalTimeSelect v-model="time" size="default" />
<CrystalTimeSelect v-model="time" size="small" />
```

### 自定义样式

```vue
<CrystalTimeSelect
  v-model="time"
  input-style="width: 200px"
/>
```

### 下拉框位置

```vue
<CrystalTimeSelect
  v-model="time"
  placement="top-start"
/>
```

## 继承说明

本组件完全继承了 Element Plus `el-time-select` 组件的所有功能，包括属性、事件和方法。更多详细信息可以参考 [Element Plus 官方文档](https://element-plus.org/zh-CN/component/time-select.html)。
