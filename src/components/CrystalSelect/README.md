# CrystalSelect 下拉选择器组件

基于 Element Plus 的 ElSelect 和 ElOption 组件封装，提供了更加便捷的选项配置方式，同时扩展了自定义图标、操作按钮和触底更新等功能。

## 特性

- **内置选项支持**：通过 `options` 属性直接配置选项，无需手动添加 `el-option` 标签
- **多种数据格式**：支持字符串数组和对象数组两种选项数据格式
- **自定义图标**：支持为每个选项添加前置和后置图标，兼容 Element Plus 和 Iconify 图标
- **操作按钮**：支持为选项添加自定义操作按钮
- **触底更新**：支持下拉框滚动到底部时自动触发加载更多功能
- **完整功能继承**：完全继承 Element Plus Select 组件的所有功能和属性
- **灵活的自定义**：支持通过插槽自定义选项内容
- **强大的交互**：支持多选、搜索、远程搜索、标签折叠等功能
- **统一图标处理**：优化了图标处理逻辑，确保 Element Plus 和 Iconify 图标都能正确显示

## 基本用法

### 字符串数组选项

```vue
<template>
  <crystal-select v-model="selectedValue" :options="['选项1', '选项2', '选项3']" placeholder="请选择..." clearable />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const selectedValue = ref("")
</script>
```

### 对象数组选项

```vue
<template>
  <crystal-select v-model="selectedCity" :options="cities" placeholder="选择城市..." clearable />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const selectedCity = ref("")
const cities = ref([
  { label: "北京", value: "beijing" },
  { label: "上海", value: "shanghai" },
  { label: "广州", value: "guangzhou", disabled: true },
  { label: "深圳", value: "shenzhen" }
])
</script>
```

## 高级用法

### 多选

```vue
<template>
  <crystal-select
    v-model="selectedCities"
    :options="cities"
    multiple
    placeholder="请选择城市..."
    collapse-tags
    collapse-tags-tooltip
  />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const selectedCities = ref([])
const cities = ref([
  { label: "北京", value: "beijing" },
  { label: "上海", value: "shanghai" },
  { label: "广州", value: "guangzhou" },
  { label: "深圳", value: "shenzhen" },
  { label: "杭州", value: "hangzhou" },
  { label: "成都", value: "chengdu" }
])
</script>
```

### 可搜索

```vue
<template>
  <crystal-select
    v-model="searchValue"
    :options="options"
    filterable
    remote
    :remote-method="remoteMethod"
    loading-text="搜索中..."
    no-match-text="未找到匹配项"
    placeholder="搜索选项..."
  />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const searchValue = ref("")
const options = ref([])

// 模拟远程搜索
const remoteMethod = query => {
  if (query) {
    // 模拟异步搜索
    setTimeout(() => {
      options.value = [
        { label: `${query}-选项1`, value: `${query}-1` },
        { label: `${query}-选项2`, value: `${query}-2` },
        { label: `${query}-选项3`, value: `${query}-3` }
      ]
    }, 500)
  } else {
    options.value = []
  }
}
</script>
```

### 自定义图标（更新版）

```vue
<template>
  <crystal-select v-model="iconValue" :options="iconOptions" placeholder="带图标选项" clearable />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const iconValue = ref("")
const iconOptions = ref([
  // 使用Element Plus图标
  { label: "用户", value: "user", icon: "User" },
  { label: "主页", value: "home", prefixIcon: "House" },
  { label: "设置", value: "settings", suffixIcon: "Setting" },
  // 使用Iconify图标
  { label: "邮件", value: "mail", icon: "ep:message" },
  { label: "电话", value: "phone", prefixIcon: "ep:phone" },
  { label: "文档", value: "doc", suffixIcon: "ep:document" }
])
</script>
```

### 选项操作按钮

```vue
<template>
  <crystal-select
    v-model="actionValue"
    :options="actionOptions"
    placeholder="带操作按钮的选项"
    clearable
    @option-action="handleOptionAction"
  />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const actionValue = ref("")
const actionOptions = ref([
  {
    label: "选项1",
    value: "1",
    actions: [
      { name: "edit", icon: "Edit", label: "编辑" },
      { name: "delete", icon: "Delete", label: "删除" }
    ]
  },
  {
    label: "选项2",
    value: "2",
    actions: [{ name: "view", icon: "View", label: "查看", disabled: true }]
  }
])

// 处理选项操作
const handleOptionAction = (actionName, option) => {
  console.log(`执行操作: ${actionName}，选项:`, option)
  // 根据不同操作执行相应逻辑
  switch (actionName) {
    case "edit":
      console.log("编辑选项", option)
      break
    case "delete":
      console.log("删除选项", option)
      break
    case "view":
      console.log("查看选项", option)
      break
  }
}
</script>
```

### 触底更新（无限滚动）

```vue
<template>
  <crystal-select
    v-model="infiniteValue"
    :options="infiniteOptions"
    placeholder="无限滚动加载"
    clearable
    :loading="loading"
    :loading-text="loadingText"
    :enable-infinite-scroll="true"
    :scroll-threshold="80"
    @load-more="handleLoadMore"
  />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const infiniteValue = ref("")
const infiniteOptions = ref([])
const loading = ref(false)
const loadingText = ref("加载中...")
let page = 1
const pageSize = 10

// 初始化数据
const initData = () => {
  for (let i = 1; i <= 20; i++) {
    infiniteOptions.value.push({
      label: `选项 ${i}`,
      value: i.toString()
    })
  }
}

initData()

// 处理加载更多
const handleLoadMore = () => {
  if (loading.value) return

  loading.value = true

  // 模拟异步加载
  setTimeout(() => {
    const startIdx = page * pageSize + 1
    const endIdx = startIdx + pageSize - 1

    for (let i = startIdx; i <= endIdx; i++) {
      infiniteOptions.value.push({
        label: `选项 ${i}`,
        value: i.toString()
      })
    }

    page++
    loading.value = false

    // 模拟没有更多数据的情况
    if (page >= 10) {
      loadingText.value = "没有更多数据了"
    }
  }, 1000)
}
</script>
```

### 带描述信息的选项

```vue
<template>
  <crystal-select v-model="descValue" :options="descOptions" placeholder="带描述信息的选项" clearable />
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"

const descValue = ref("")
const descOptions = ref([
  {
    label: "选项1",
    value: "1",
    description: "这是选项1的详细描述信息"
  },
  {
    label: "选项2",
    value: "2",
    description: "这是选项2的详细描述信息，提供更多上下文",
    icon: "InfoFilled"
  }
])
</script>
```

### 自定义选项内容（插槽）

```vue
<template>
  <crystal-select v-model="customValue" placeholder="自定义选项内容">
    <template #option="{ option }">
      <div class="custom-option-content">
        <div class="custom-icon">
          <el-icon><StarFilled /></el-icon>
        </div>
        <div class="custom-info">
          <div class="custom-label">{{ option.label }}</div>
          <div class="custom-desc">自定义描述信息</div>
        </div>
        <div class="custom-badge">推荐</div>
      </div>
    </template>
    <el-option label="自定义选项1" value="custom1"></el-option>
    <el-option label="自定义选项2" value="custom2"></el-option>
    <el-option label="自定义选项3" value="custom3"></el-option>
  </crystal-select>
</template>

<script setup>
import { ref } from "vue"
import { CrystalSelect } from "crystalplus-ui"
import { StarFilled } from "@element-plus/icons-vue"

const customValue = ref("")
</script>

<style scoped>
.custom-option-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.custom-icon {
  margin-right: 8px;
  color: #409eff;
}

.custom-info {
  flex: 1;
}

.custom-label {
  font-weight: 500;
}

.custom-desc {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
}

.custom-badge {
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}
</style>
```

## Props

CrystalSelect 组件扩展了以下自定义 props：

| 属性名               | 类型                                       | 默认值      | 说明                               |
| -------------------- | ------------------------------------------ | ----------- | ---------------------------------- |
| options              | `Array<CustomOption \| string \| number>`  | []          | 选项数据，支持字符串数组或对象数组 |
| optionIcons          | `Record<string \| number, string>`         | {}          | 用于批量自定义每个选项的图标       |
| optionActions        | `Record<string \| number, OptionAction[]>` | {}          | 用于批量自定义每个选项的操作按钮   |
| loading              | boolean                                    | false       | 是否显示加载状态                   |
| loadingText          | string                                     | '加载中...' | 加载状态显示的文本                 |
| loadingIcon          | string                                     | 'Loading'   | 加载状态显示的图标                 |
| scrollThreshold      | number                                     | 80          | 触底触发加载更多的阈值百分比       |
| enableInfiniteScroll | boolean                                    | false       | 是否启用无限滚动触底更新           |

### 继承的 Element Plus Select 主要 props

以下是一些常用的 Element Plus Select 组件的 props：

| 属性名               | 类型     | 默认值    | 说明                                 |
| -------------------- | -------- | --------- | ------------------------------------ |
| modelValue / v-model | any      | —         | 绑定值                               |
| multiple             | boolean  | false     | 是否多选                             |
| disabled             | boolean  | false     | 是否禁用                             |
| clearable            | boolean  | false     | 是否可清空                           |
| collapseTags         | boolean  | false     | 多选时是否将选中值按文字的形式展示   |
| filterable           | boolean  | false     | 是否可搜索                           |
| remote               | boolean  | false     | 是否为远程搜索                       |
| remoteMethod         | function | —         | 远程搜索方法                         |
| placeholder          | string   | '请选择'  | 占位符                               |
| size                 | string   | 'default' | 尺寸，可选值为 large、default、small |

## Events

CrystalSelect 组件扩展了以下自定义事件：

| 事件名        | 说明                   | 参数                            |
| ------------- | ---------------------- | ------------------------------- |
| option-action | 选项操作按钮点击时触发 | actionName: string, option: any |
| load-more     | 触底加载更多时触发     | —                               |
| scroll        | 下拉框滚动时触发       | event: Event                    |

### 继承的 Element Plus Select 事件

| 事件名             | 说明                               | 参数                          |
| ------------------ | ---------------------------------- | ----------------------------- |
| update:model-value | 绑定值变化时触发                   | 新的绑定值                    |
| change             | 选中值发生变化时触发               | 选中的值                      |
| visible-change     | 下拉框出现/隐藏时触发              | 出现则为 true，隐藏则为 false |
| remove-tag         | 多选模式下移除tag时触发            | 移除的tag值                   |
| clear              | 可清空模式下用户点击清空按钮时触发 | —                             |
| blur               | 当选择器的输入框失去焦点时触发     | event                         |
| focus              | 当选择器的输入框获得焦点时触发     | event                         |
| query-change       | 搜索词变化时触发                   | query: string                 |
| current-change     | 当前选中值变化时触发               | currentVal: any               |

## 插槽

### option 插槽

用于自定义选项内容：

```vue
<crystal-select v-model="value" :options="options">
  <template #option="{ option }">
    <div>{{ option.label }} - 自定义内容</div>
  </template>
</crystal-select>
```

### 其他插槽

CrystalSelect 组件还支持 Element Plus Select 组件的所有插槽：

| 插槽名  | 说明           |
| ------- | -------------- |
| prefix  | 组件头部内容   |
| empty   | 无选项时的内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

## 类型定义

### CustomOption 类型

```typescript
interface CustomOption {
  label?: string // 选项标签
  value: any // 选项值
  disabled?: boolean // 是否禁用
  icon?: string // 图标类名
  prefixIcon?: string // 前置图标类名
  suffixIcon?: string // 后置图标类名
  description?: string // 描述信息
  actions?: OptionAction[] // 操作按钮数组
}
```

### OptionAction 类型

```typescript
interface OptionAction {
  name: string // 操作名称
  icon?: string // 图标类名
  label?: string // 显示文本
  disabled?: boolean // 是否禁用
}
```

## 兼容性

CrystalSelect 组件基于 Vue 3 和 Element Plus 开发，需要确保项目环境符合以下要求：

- Vue 3.x
- Element Plus
- TypeScript 4.x+（推荐使用）

## 注意事项

1. **优先级**：当同时提供 `options` 属性和默认插槽时，会优先使用默认插槽中的选项
2. **数据格式**：
   - 字符串数组格式时，每个字符串会同时作为选项的 label 和 value
   - 对象数组格式时，每个对象必须包含 value 字段
3. **性能考虑**：对于大量数据（超过 1000 条），建议使用远程搜索或分页加载
4. **图标支持**：
   - 支持 Element Plus 原生图标（如 'User', 'Setting' 等）
   - 支持 Iconify 图标格式（如 'ep:message', 'ep:setting' 等）
   - 组件会自动检测并正确渲染不同类型的图标
5. **操作按钮**：点击操作按钮不会触发选项选中，需自行处理相关逻辑
6. **触底更新**：使用无限滚动功能时，注意合理设置 `scrollThreshold` 值

## 示例代码

完整的示例代码可以参考项目中的示例应用。
