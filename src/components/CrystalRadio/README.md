# CrystalRadio 组件

基于 Element Plus 的 ElRadio 组件封装，提供了增强的点亮点功能和自定义样式能力。

## 特性亮点

- 🌟 完整继承 Element Plus ElRadio 的所有功能
- ✨ 新增点亮点功能，可点击切换高亮状态
- 🎨 支持自定义单选框颜色、边框颜色、点亮点颜色、悬停颜色和字体颜色
- 📱 支持多种尺寸规格（large、default、small）
- 🎯 完善的类型定义，支持 TypeScript 开发

## 基本用法

```vue
<template>
  <div>
    <crystal-radio v-model="checked">默认单选框</crystal-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio } from "@crystalplus-ui/crystalplus-ui"

const checked = ref(false)
</script>
```

## 与CrystalRadioGroup一起使用

```vue
<template>
  <div>
    <crystal-radio-group v-model="radioValue">
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
      <crystal-radio label="option3">选项3</crystal-radio>
    </crystal-radio-group>
    <div>选择的值: {{ radioValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio, CrystalRadioGroup } from "@crystalplus-ui/crystalplus-ui"

const radioValue = ref("option1")
</script>
```

## 点亮点功能示例

```vue
<template>
  <div>
    <crystal-radio v-model="checked" highlight highlight-color="#67c23a"> 带点亮点的单选框 </crystal-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio } from "@crystalplus-ui/crystalplus-ui"

const checked = ref(false)
</script>
```

## 自定义颜色示例

```vue
<template>
  <div>
    <crystal-radio v-model="checked" radio-color="#f56c6c" border-color="#909399" hover-color="#e6a23c" font-color="#606266">
      自定义颜色的单选框
    </crystal-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio } from "@crystalplus-ui/crystalplus-ui"

const checked = ref(false)
</script>
```

## 带边框的单选框

```vue
<template>
  <div>
    <crystal-radio v-model="checked" border border-color="#409EFF"> 带边框的单选框 </crystal-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio } from "@crystalplus-ui/crystalplus-ui"

const checked = ref(false)
</script>
```

## 不同尺寸的单选框

```vue
<template>
  <div>
    <crystal-radio v-model="checked" size="large" border> 大号单选框 </crystal-radio>
    <crystal-radio v-model="checked" size="default" border> 默认尺寸单选框 </crystal-radio>
    <crystal-radio v-model="checked" size="small" border> 小号单选框 </crystal-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio } from "@crystalplus-ui/crystalplus-ui"

const checked = ref(false)
</script>
```

## 禁用状态的单选框

```vue
<template>
  <div>
    <crystal-radio v-model="checked" disabled> 禁用的单选框 </crystal-radio>
    <crystal-radio v-model="checked" disabled highlight> 禁用且带点亮点的单选框 </crystal-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio } from "@crystalplus-ui/crystalplus-ui"

const checked = ref(false)
</script>
```

## API

### 属性 (Props)

所有 Element Plus ElRadio 的属性都支持，详见 [Element Plus Radio 文档](https://element-plus.org/zh-CN/component/radio.html)。以下是 CrystalRadio 新增或有特殊说明的属性：

| 属性名          | 类型     | 默认值    | 说明                                         |
| --------------- | -------- | --------- | -------------------------------------------- |
| modelValue      | any      | false     | 绑定值，单个使用时表示是否选中               |
| label           | any      | true      | 单选框的值，单个使用时默认为 true            |
| highlight       | boolean  | false     | 是否启用点亮点功能                           |
| highlight-color | string   | #409EFF   | 点亮点颜色，支持十六进制、RGB或颜色名称      |
| radio-color     | string   | ''        | 单选框选中时的自定义颜色                     |
| border-color    | string   | ''        | 单选框边框的自定义颜色                       |
| hover-color     | string   | #409EFF   | 鼠标悬停时的颜色                             |
| font-color      | string   | ''        | 自定义字体颜色                               |
| fill-color      | string   | ''        | 单选框选中时的填充颜色                       |
| disabled        | boolean  | false     | 是否禁用单选框                               |
| border          | boolean  | false     | 是否显示边框                                 |
| size            | string   | 'default' | 尺寸，可选值为 'large'、'default' 或 'small' |
| name            | string   | -         | 原生 name 属性                               |
| true-label      | any      | -         | 选中时的值，优先级高于 label                 |
| false-label     | any      | -         | 未选中时的值，优先级高于 label               |
| before-change   | Function | -         | 切换前的回调函数                             |

### 事件 (Events)

| 事件名            | 参数       | 说明                 |
| ----------------- | ---------- | -------------------- |
| change            | value: any | 绑定值变化时触发     |
| update:modelValue | value: any | v-model 双向绑定事件 |

### 方法 (Methods)

| 方法名          | 参数 | 返回值 | 说明           |
| --------------- | ---- | ------ | -------------- |
| toggleHighlight | 无   | void   | 切换点亮点状态 |

## 兼容性说明

- 兼容 Vue 3.x 和 Element Plus 最新版本
- 支持现代浏览器（Chrome, Firefox, Safari, Edge）

## CSS 自定义属性

CrystalRadio 组件支持通过 CSS 自定义属性进行更深层次的样式定制：

```css
.crystal-radio-wrapper {
  /* 单选框颜色 */
  --crystal-radio-color: #409eff;
  /* 边框颜色 */
  --crystal-border-color: #dcdfe6;
  /* 点亮点颜色 */
  --crystal-highlight-color: #409eff;
  /* 悬停颜色 */
  --crystal-hover-color: #409eff;
}
```

## 故障排除

### 单选框无法选中

- 检查是否正确使用了 `v-model` 进行双向绑定
- 单个使用时，确保 `modelValue` 是响应式变量
- 多个单选框时，确保每个单选框都设置了唯一的 `label` 属性

### 点亮点功能不生效

- 确保已启用 `highlight` 属性
- 检查是否在禁用状态下尝试使用点亮点功能
- 验证 `highlight-color` 是否设置了有效的颜色值

### 自定义颜色不生效

- 确保使用了正确的属性名（如 `radio-color` 而非 `color`）
- 检查颜色值是否有效（十六进制、RGB 或颜色名称）
- 对于组内单选框，自定义颜色可能会被 RadioGroup 的设置覆盖

## FAQ

**Q: 点亮点功能如何工作？**
A: 启用点亮点功能后，点击单选框时会切换高亮状态，显示一个浅色的背景区域。可以通过 highlight-color 属性自定义高亮颜色。

**Q: 如何自定义字体颜色？**
A: 使用 font-color 属性可以设置单选框的标签文字颜色。

**Q: 点亮点颜色如何自定义？**
A: 通过 highlight-color 属性设置自定义的点亮点颜色值，支持十六进制、RGB或颜色名称。

**Q: 可以与 Element Plus 的其他组件一起使用吗？**
A: 完全可以，CrystalRadio 可以完美集成到 Element Plus 的单选框组或其他组件中使用。

**Q: 为什么单个单选框无法选中？**
A: 单个单选框时，默认的 label 值为 true，modelValue 为 false。点击后会将 modelValue 更新为 label 值（即 true）。确保你的 v-model 绑定的是一个响应式变量。

**Q: 如何获取单选框的选中状态？**
A: 通过 v-model 绑定的变量即可获取选中状态。单个使用时，变量值为 boolean 类型；在组内使用时，变量值为当前选中的 radio 的 label 值。

**Q: 点亮点功能和选中状态有什么区别？**
A: 点亮点功能是 CrystalRadio 新增的视觉增强功能，与单选框的选中状态无关。选中状态表示该选项被选中，而点亮点只是一个视觉标记。

**Q: 是否支持键盘操作？**
A: 是的，CrystalRadio 完全支持 Element Plus 提供的键盘操作功能，包括 Tab 键聚焦和空格键选择。

**Q: 如何在 TypeScript 中使用？**
A: CrystalRadio 提供了完善的类型定义，直接导入使用即可获得类型提示和检查。
