# CrystalCheckbox 组件

基于 Element Plus 的 ElCheckbox 组件封装，提供了增强的点亮点功能和自定义样式能力。

## 特性亮点

- 🌟 完整继承 Element Plus ElCheckbox 的所有功能
- ✨ 新增点亮点功能，可点击切换高亮状态
- 🎨 支持自定义复选框颜色、边框颜色、点亮点颜色、悬停颜色和字体颜色
- 📱 支持多种尺寸规格（large、default、small）
- 🎯 完善的类型定义，支持 TypeScript 开发

## 基本用法

```vue
<template>
  <div>
    <crystal-checkbox v-model="checked">默认复选框</crystal-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalCheckbox } from '@crystal-ui/crystal-ui'

const checked = ref(false)
</script>
```

## 点亮点功能示例

```vue
<template>
  <div>
    <crystal-checkbox 
      v-model="checked" 
      highlight
      highlight-color="#67c23a"
    >
      带点亮点的复选框
    </crystal-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalCheckbox } from '@crystal-ui/crystal-ui'

const checked = ref(false)
</script>
```

## 自定义颜色示例

```vue
<template>
  <div>
    <crystal-checkbox 
      v-model="checked1" 
      checkbox-color="#e6a23c"
      font-color="#e6a23c"
    >
      橙色复选框
    </crystal-checkbox>
    
    <crystal-checkbox 
      v-model="checked2" 
      checkbox-color="#67c23a"
      border-color="#67c23a"
      font-color="#67c23a"
      highlight
      highlight-color="#67c23a"
    >
      绿色复选框带点亮点
    </crystal-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalCheckbox } from '@crystal-ui/crystal-ui'

const checked1 = ref(false)
const checked2 = ref(false)
</script>
```

## 组合功能示例

```vue
<template>
  <div>
    <crystal-checkbox 
      v-model="checked" 
      :border="true" 
      size="large"
      highlight
      checkbox-color="#f56c6c"
      border-color="#f56c6c"
      highlight-color="#f56c6c"
      hover-color="#f78989"
      font-color="#f56c6c"
    >
      大尺寸带边框的红色复选框
    </crystal-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystalCheckbox } from '@crystal-ui/crystal-ui'

const checked = ref(false)
</script>
```

## 与复选框组配合使用

```vue
<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <crystal-checkbox 
        v-for="item in options" 
        :key="item.value" 
        :label="item.value"
        :highlight="true"
        :highlight-color="getHighlightColor(item.value)"
        :font-color="getFontColor(item.value)"
      >
        {{ item.label }}
      </crystal-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElCheckboxGroup } from 'element-plus'
import { CrystalCheckbox } from '@crystal-ui/crystal-ui'

const checkList = ref<string[]>([])
const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' }
]

const getHighlightColor = (value: string) => {
  const colors = {
    option1: '#409EFF',
    option2: '#67c23a',
    option3: '#e6a23c'
  }
  return colors[value as keyof typeof colors] || '#409EFF'
}

const getFontColor = (value: string) => {
  const colors = {
    option1: '#409EFF',
    option2: '#67c23a',
    option3: '#e6a23c'
  }
  return colors[value as keyof typeof colors] || '#409EFF'
}
</script>
```

## 属性

| 属性名 | 说明 | 类型 | 默认值 | 可选值 |
|-------|-----|------|-------|-------|
| model-value / v-model | 绑定值 | boolean | false | true/false |
| label | 选中时的值 | string/number/boolean/object | - | - |
| true-label | 选中时的值 | string/number | - | - |
| false-label | 未选中时的值 | string/number | - | - |
| disabled | 禁用状态 | boolean | false | true/false |
| border | 是否显示边框 | boolean | false | true/false |
| size | 尺寸 | string | 'default' | 'large'/'default'/'small' |
| name | 原生 name 属性 | string | - | - |
| checked | 当前是否勾选 | boolean | false | true/false |
| indeterminate | 是否为 indeterminate 状态 | boolean | false | true/false |
| before-change | 点击前的钩子函数 | (val: boolean) => boolean | - | - |
| min | 选中项数量最小值 | number | - | - |
| max | 选中项数量最大值 | number | - | - |
| controls | 与原生 input 元素绑定的 id | string | - | - |
| highlight | 是否启用点亮点功能 | boolean | false | true/false |
| highlight-color | 点亮点颜色 | string | '#409EFF' | 有效的颜色值 |
| checkbox-color | 复选框自定义颜色 | string | '' | 有效的颜色值 |
| border-color | 边框自定义颜色 | string | '' | 有效的颜色值 |
| hover-color | 鼠标悬停颜色 | string | '#409EFF' | 有效的颜色值 |
| font-color | 自定义字体颜色 | string | '' | 有效的颜色值 |

## 事件

| 事件名 | 说明 | 回调参数 |
|-------|-----|--------|
| update:model-value | 绑定值变化时触发 | value: boolean |
| change | 绑定值变化时触发 | value: boolean |

## 方法

| 方法名 | 说明 | 参数 | 返回值 |
|-------|-----|------|-------|
| toggle | 切换选中状态 | 无 | void |
| toggleHighlight | 切换点亮点状态 | 无 | void |

## 兼容性说明

- 兼容 Vue 3.x 和 Element Plus 最新版本
- 支持现代浏览器（Chrome, Firefox, Safari, Edge）

## FAQ

**Q: 点亮点功能如何工作？**
A: 启用点亮点功能后，点击复选框时会切换高亮状态，显示一个浅色的背景区域。可以通过 highlight-color 属性自定义高亮颜色。

**Q: 如何自定义字体颜色？**
A: 使用 font-color 属性可以设置复选框的标签文字颜色。

**Q: 点亮点颜色如何自定义？**
A: 通过 highlight-color 属性设置自定义的点亮点颜色值，支持十六进制、RGB或颜色名称。

**Q: 可以与 Element Plus 的其他组件一起使用吗？**
A: 完全可以，CrystalCheckbox 可以完美集成到 Element Plus 的复选框组或其他组件中使用。