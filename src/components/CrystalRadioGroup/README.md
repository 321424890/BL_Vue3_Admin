# CrystalRadioGroup 组件

基于 Element Plus 的 ElRadioGroup 组件封装，提供了增强的自定义样式能力和更灵活的配置选项。

## 特性亮点

- 🌟 完整继承 Element Plus ElRadioGroup 的所有功能
- 🎨 支持自定义填充颜色、文本颜色和边框颜色
- 📱 支持多种尺寸规格（large、default、small）
- 🎯 完善的类型定义，支持 TypeScript 开发
- 🧩 与 CrystalRadio 组件完美配合使用

## 基本用法

```vue
<template>
  <div>
    <crystal-radio-group v-model="selectedValue">
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
      <crystal-radio label="option3">选项3</crystal-radio>
    </crystal-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalRadioGroup, CrystalRadio } from '@crystal-ui/crystal-ui'

const selectedValue = ref('option1')
</script>
```

## 自定义颜色示例

```vue
<template>
  <div>
    <crystal-radio-group 
      v-model="selectedValue"
      fill-color="#67c23a"
      text-color="#ffffff"
      border-color="#909399"
    >
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
      <crystal-radio label="option3">选项3</crystal-radio>
    </crystal-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalRadioGroup, CrystalRadio } from '@crystal-ui/crystal-ui'

const selectedValue = ref('option1')
</script>
```

## 边框模式示例

```vue
<template>
  <div>
    <crystal-radio-group 
      v-model="selectedValue"
      border
      size="large"
    >
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
      <crystal-radio label="option3">选项3</crystal-radio>
    </crystal-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalRadioGroup, CrystalRadio } from '@crystal-ui/crystal-ui'

const selectedValue = ref('option1')
</script>
```

## 不同尺寸示例

支持 `large`、`default` 和 `small` 三种尺寸规格。

```vue
<template>
  <div class="demo-size">
    <h4>Large 尺寸</h4>
    <crystal-radio-group v-model="selectedValue" size="large">
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
    </crystal-radio-group>

    <h4>Default 尺寸</h4>
    <crystal-radio-group v-model="selectedValue">
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
    </crystal-radio-group>

    <h4>Small 尺寸</h4>
    <crystal-radio-group v-model="selectedValue" size="small">
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
    </crystal-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalRadioGroup, CrystalRadio } from '@crystal-ui/crystal-ui'

const selectedValue = ref('option1')
</script>

<style scoped>
.demo-size h4 {
  margin: 20px 0 10px 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
```

## 禁用状态示例

可以禁用整个单选组或单个选项。

```vue
<template>
  <div>
    <h4>禁用整个单选组</h4>
    <crystal-radio-group v-model="selectedValue" disabled>
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
      <crystal-radio label="option3">选项3</crystal-radio>
    </crystal-radio-group>

    <h4>禁用单个选项</h4>
    <crystal-radio-group v-model="selectedValue">
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2" disabled>选项2（禁用）</crystal-radio>
      <crystal-radio label="option3">选项3</crystal-radio>
    </crystal-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalRadioGroup, CrystalRadio } from '@crystal-ui/crystal-ui'

const selectedValue = ref('option1')
</script>

<style scoped>
h4 {
  margin: 20px 0 10px 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
```

## 点亮点功能示例

启用点亮点功能，增强视觉效果。

```vue
<template>
  <div>
    <crystal-radio-group 
      v-model="selectedValue"
      highlight
      highlight-color="#67c23a"
    >
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
      <crystal-radio label="option3">选项3</crystal-radio>
    </crystal-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalRadioGroup, CrystalRadio } from '@crystal-ui/crystal-ui'

const selectedValue = ref('option1')
</script>
```

## 结合 v-model.number 使用

当需要处理数字类型的选中值时，可以使用 `v-model.number`。

```vue
<template>
  <div>
    <crystal-radio-group v-model.number="selectedNumber">
      <crystal-radio :label="1">数字1</crystal-radio>
      <crystal-radio :label="2">数字2</crystal-radio>
      <crystal-radio :label="3">数字3</crystal-radio>
    </crystal-radio-group>
    <div style="margin-top: 20px;">选中值: {{ selectedNumber }}, 类型: {{ typeof selectedNumber }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalRadioGroup, CrystalRadio } from '@crystal-ui/crystal-ui'

const selectedNumber = ref(1)
</script>
```

## API

### 属性 (Props)

CrystalRadioGroup 继承了 Element Plus ElRadioGroup 的所有属性，并添加了以下自定义属性：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue / v-model | any | undefined | 绑定值 |
| size | 'large' / 'default' / 'small' | 'default' | 尺寸 |
| disabled | boolean | false | 是否禁用 |
| textColor | string | '' | 选中状态的文本颜色 |
| fillColor | string | '' | 选中状态的填充颜色 |
| borderColor | string | '' | 边框颜色 |
| highlight | boolean | false | 是否启用点亮点功能 |
| highlightColor | string | #409EFF | 点亮点颜色 |
| name | string | '' | 原生 name 属性 |
| border | boolean | false | 是否显示边框 |
| beforeChange | Function | undefined | 变更前的钩子函数 |

**继承的 ElRadioGroup 属性**：

所有 Element Plus ElRadioGroup 的属性都支持，包括但不限于：
- `modelValue`：绑定值
- `size`：尺寸
- `disabled`：是否禁用
- `name`：原生 name 属性
- `border`：是否显示边框
- `beforeChange`：变更前的钩子函数

详见 [Element Plus RadioGroup 文档](https://element-plus.org/zh-CN/component/radio.html#radio-group-属性)。

### 事件 (Events)

| 事件名 | 说明 | 参数 |
|--------|------|------|
| change | 绑定值变化时触发 | value: any（选中的 Radio label 值） |
| update:modelValue | v-model 绑定值更新时触发 | value: any（选中的 Radio label 值） |

**继承的 ElRadioGroup 事件**：

所有 Element Plus ElRadioGroup 的事件都支持，包括但不限于：
- `change`：绑定值变化时触发

详见 [Element Plus RadioGroup 文档](https://element-plus.org/zh-CN/component/radio.html#radio-group-事件)。

### 方法 (Methods)

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| focus | 使第一个可用的单选框获得焦点 | - | - |
| blur | 使第一个可用的单选框失去焦点 | - | - |

**继承的 ElRadioGroup 方法**：

所有 Element Plus ElRadioGroup 的方法都支持，包括但不限于：
- `focus`：使第一个可用的单选框获得焦点
- `blur`：使第一个可用的单选框失去焦点

详见 [Element Plus RadioGroup 文档](https://element-plus.org/zh-CN/component/radio.html#radio-group-方法)。

### CSS 自定义属性

CrystalRadioGroup 支持通过 CSS 自定义属性来定制样式：

| 属性名 | 默认值 | 说明 |
|--------|--------|------|
| --crystal-radio-group-fill-color | #409EFF | 选中状态的填充颜色 |
| --crystal-radio-group-text-color | #ffffff | 选中状态的文本颜色 |
| --crystal-radio-group-border-color | #dcdfe6 | 边框颜色 |
| --crystal-radio-group-disabled-color | #c0c4cc | 禁用状态的颜色 |
| --crystal-radio-group-highlight-color | #409EFF | 点亮点颜色 |

**使用示例**：

```css
.custom-radio-group {
  --crystal-radio-group-fill-color: #67c23a;
  --crystal-radio-group-text-color: #ffffff;
  --crystal-radio-group-border-color: #c6e2b0;
}
```

```vue
<template>
  <crystal-radio-group 
    v-model="selectedValue" 
    class="custom-radio-group"
  >
    <crystal-radio label="option1">选项1</crystal-radio>
    <crystal-radio label="option2">选项2</crystal-radio>
  </crystal-radio-group>
</template>
```

## 兼容性说明

- 兼容 Vue 3.x 和 Element Plus 最新版本
- 支持现代浏览器（Chrome, Firefox, Safari, Edge）

## 故障排除

### 单选框无法选中

**问题**：点击单选框时，选中状态没有变化。

**可能原因**：
1. 没有正确绑定 `v-model` 或 `modelValue`
2. `v-model` 绑定的变量不是响应式的
3. 单选框的 `label` 值与 `modelValue` 类型不匹配

**解决方案**：
```vue
<!-- 正确用法 -->
<template>
  <crystal-radio-group v-model="selectedValue">
    <crystal-radio :label="1">选项1</crystal-radio> <!-- 数字类型 -->
    <crystal-radio :label="2">选项2</crystal-radio>
  </crystal-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref(1) // 使用 ref 创建响应式变量
</script>
```

### 自定义颜色不生效

**问题**：设置了 `fillColor` 或 `textColor` 属性，但颜色没有变化。

**可能原因**：
1. 颜色值格式不正确
2. 存在 CSS 样式覆盖
3. 没有正确传递属性到组件

**解决方案**：
```vue
<!-- 确保颜色值格式正确 -->
<crystal-radio-group 
  v-model="selectedValue"
  fill-color="#67c23a" <!-- 使用正确的颜色格式 -->
  text-color="#ffffff"
>
  <crystal-radio label="option1">选项1</crystal-radio>
</crystal-radio-group>
```

### 点亮点功能不显示

**问题**：设置了 `highlight` 属性为 `true`，但点亮点没有显示。

**可能原因**：
1. 没有安装或引入对应的样式文件
2. 自定义样式覆盖了点亮点样式

**解决方案**：
确保正确引入了组件的样式文件，并检查是否有样式冲突。

## FAQ

**Q: 如何与 CrystalRadio 组件配合使用？**
A: 直接将 CrystalRadio 组件作为 CrystalRadioGroup 的子组件即可，两者会自动进行状态同步和样式统一。

**Q: 可以自定义选中状态的颜色吗？**
A: 可以通过 fillColor 和 textColor 属性分别设置选中状态的填充颜色和文本颜色，也可以通过 CSS 自定义属性进行更灵活的样式定制。

**Q: 边框模式下可以自定义边框颜色吗？**
A: 可以通过 borderColor 属性设置边框颜色，也可以使用 CSS 自定义属性 --crystal-radio-group-border-color。

**Q: 如何获取当前选中的值？**
A: 通过 v-model 绑定的变量即可获取当前选中的值。
```vue
<template>
  <crystal-radio-group v-model="selectedValue">
    <crystal-radio label="option1">选项1</crystal-radio>
    <crystal-radio label="option2">选项2</crystal-radio>
  </crystal-radio-group>
  <div>当前选中: {{ selectedValue }}</div>
</template>
```

**Q: 如何禁用整个单选组或单个选项？**
A: 可以通过在 CrystalRadioGroup 上设置 disabled 属性禁用整个单选组，或在单个 CrystalRadio 上设置 disabled 属性禁用特定选项。

**Q: 如何自定义单选框的尺寸？**
A: 通过 size 属性设置，支持 large、default 和 small 三种尺寸。

**Q: 是否支持键盘导航？**
A: 是的，支持键盘导航，使用 Tab 键切换焦点，使用空格键选择选项。

**Q: 是否支持 TypeScript？**
A: 是的，组件提供了完整的 TypeScript 类型定义。

**Q: 如何使用 beforeChange 钩子函数？**
A: beforeChange 是一个变更前的钩子函数，返回 false 可以阻止变更。
```vue
<template>
  <crystal-radio-group 
    v-model="selectedValue"
    :before-change="handleBeforeChange"
  >
    <crystal-radio label="option1">选项1</crystal-radio>
    <crystal-radio label="option2">选项2</crystal-radio>
  </crystal-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref('option1')

const handleBeforeChange = (value: any) => {
  // 返回 false 阻止变更
  return value !== 'option2'
}
</script>
```

**Q: 如何在表单中使用？**
A: 可以与 Element Plus 的 Form 组件配合使用，支持表单验证。
```vue
<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="选择项" prop="selected">
      <crystal-radio-group v-model="form.selected">
        <crystal-radio label="option1">选项1</crystal-radio>
        <crystal-radio label="option2">选项2</crystal-radio>
      </crystal-radio-group>
    </el-form-item>
  </el-form>
</template>
```

**Q: 如何重置选中状态？**
A: 直接修改 v-model 绑定的变量即可重置选中状态。
```vue
<template>
  <div>
    <crystal-radio-group v-model="selectedValue">
      <crystal-radio label="option1">选项1</crystal-radio>
      <crystal-radio label="option2">选项2</crystal-radio>
    </crystal-radio-group>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref('option1')

const reset = () => {
  selectedValue.value = 'option1' // 重置为默认值
}
</script>
```