# CrystalTree 组件使用文档

## 简介

CrystalTree 是基于 Element Plus 的 `el-tree-select` 组件封装的树选择器组件，提供了颜色自定义等增强功能，同时保持了原组件的所有基本功能。

## 基本用法

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="treeData"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CrystalTree } from 'crystal-ui'

const value = ref(null)

const treeData = [
  {
    label: '一级菜单',
    children: [
      {
        label: '二级菜单 1',
        children: [
          { label: '三级菜单 1-1' },
          { label: '三级菜单 1-2' }
        ]
      },
      {
        label: '二级菜单 2',
        children: [
          { label: '三级菜单 2-1' },
          { label: '三级菜单 2-2' }
        ]
      }
    ]
  }
]
</script>
```

## 属性

### 核心属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `modelValue` | `any` | `null` | 绑定值 |
| `data` | `any[]` | `[]` | 树结构数据 |
| `props` | `any` | `{ label: 'label', children: 'children' }` | 树节点配置 |
| `nodeKey` | `string \| number` | - | 树节点唯一标识 |

### 展开/折叠控制

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `defaultExpandAll` | `boolean` | `false` | 是否默认展开所有节点 |
| `defaultExpandLevel` | `number` | `1` | 默认展开的层级 |
| `expandOnClickNode` | `boolean` | `true` | 是否点击节点展开 |
| `accordion` | `boolean` | `false` | 是否手风琴模式（同一级别只能展开一个节点） |

### 选择相关

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `highlightCurrent` | `boolean` | `false` | 是否高亮当前选中节点 |
| `showCheckbox` | `boolean` | `false` | 是否显示复选框 |
| `checkStrictly` | `boolean` | `false` | 是否严格勾选（父子节点不关联） |

### 渲染控制

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `renderAfterExpand` | `boolean` | `false` | 是否展开后渲染子节点 |

### 样式相关

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `style` | `any` | `{ width: '240px' }` | 组件样式 |

### 自定义颜色属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `color` | `string` | `#409EFF` | 树节点默认颜色 |
| `selectedColor` | `string` | `#409EFF` | 选中节点颜色 |
| `hoverColor` | `string` | `#f5f7fa` | 鼠标悬停颜色 |
| `textColor` | `string` | `#303133` | 文本颜色 |
| `lineColor` | `string` | `#dcdfe6` | 连接线颜色 |
| `backgroundColor` | `string` | `transparent` | 背景颜色 |

## 事件

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| `update:modelValue` | 值改变时触发 | `value: any` |
| `visible-change` | 下拉面板显示/隐藏时触发 | `visible: boolean` |
| `remove-tag` | 删除选中标签时触发 | `value: any` |
| `clear` | 清空选中值时触发 | - |
| `check-change` | 节点勾选状态变化时触发 | `data: any, checked: boolean, indeterminate: boolean` |
| `check` | 节点勾选时触发 | `data: any, checked: boolean, indeterminate: boolean` |
| `node-click` | 节点点击时触发 | `data: any, node: any` |
| `node-expand` | 节点展开时触发 | `data: any, node: any` |
| `node-collapse` | 节点折叠时触发 | `data: any, node: any` |

## 插槽

| 插槽名 | 说明 |
|-------|------|
| `default` | 默认插槽 |
| `label` | 自定义标签内容 |
| `prefix` | 输入框前置内容 |
| `empty` | 空数据时的内容 |
| `node` | 自定义节点内容，包含 `data` 和 `node` 参数 |

## 高级用法

### 颜色自定义

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="treeData"
    color="#67C23A"
    selectedColor="#E6A23C"
    hoverColor="#F0F9EB"
    textColor="#303133"
    lineColor="#D4EDDA"
    backgroundColor="#FFFFFF"
  />
</template>
```

### 多选模式

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="treeData"
    show-checkbox
    check-strictly
    style="width: 100%"
    @check-change="handleCheckChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)

const handleCheckChange = (data, checked, indeterminate) => {
  console.log('Check change:', data, checked, indeterminate)
}

// treeData 定义同上
</script>
```

### 自定义数据结构

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="customTreeData"
    :props="customProps"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)

const customProps = {
  label: 'name',
  children: 'subMenu'
}

const customTreeData = [
  {
    name: '一级菜单',
    subMenu: [
      {
        name: '二级菜单 1'
      }
    ]
  }
]
</script>
```

### 自定义节点图标

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="treeDataWithIcons"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)

const treeDataWithIcons = [
  {
    label: '文件管理',
    icon: '📁',
    children: [
      {
        label: '图片',
        icon: '🖼️',
        children: [
          { label: '风景', icon: '🏞️' },
          { label: '人物', icon: '👥' }
        ]
      },
      {
        label: '文档',
        icon: '📄',
        children: [
          { label: 'Word', icon: '📝' },
          { label: 'Excel', icon: '📊' }
        ]
      }
    ]
  }
]
</script>
```

### 禁用节点

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="treeDataWithDisabled"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)

const treeDataWithDisabled = [
  {
    label: '可访问菜单',
    children: [
      {
        label: '启用的子菜单',
        children: [
          { label: '功能1' },
          { label: '功能2' }
        ]
      },
      {
        label: '禁用的子菜单',
        disabled: true,
        children: [
          { label: '功能3' },
          { label: '功能4' }
        ]
      }
    ]
  }
]
</script>
```

### 展开/折叠事件处理

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="treeData"
    @node-expand="handleNodeExpand"
    @node-collapse="handleNodeCollapse"
    @node-click="handleNodeClick"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)

const handleNodeExpand = (data, node) => {
  console.log('Node expanded:', data.label)
}

const handleNodeCollapse = (data, node) => {
  console.log('Node collapsed:', data.label)
}

const handleNodeClick = (data, node) => {
  console.log('Node clicked:', data.label)
}

// treeData 定义同上
</script>
```

### 自定义节点内容

```vue
<template>
  <crystal-tree
    v-model="value"
    :data="treeData"
  >
    <template #node="{ data }">
      <span class="custom-node-content">
        <el-tag v-if="data.tag" :type="data.tag.type" size="small">{{ data.tag.text }}</el-tag>
        {{ data.label }}
      </span>
    </template>
  </crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTag } from 'element-plus'

const value = ref(null)

const treeData = [
  {
    label: '一级菜单',
    tag: { type: 'primary', text: '热门' },
    children: [
      {
        label: '二级菜单 1',
        tag: { type: 'success', text: '推荐' }
      },
      {
        label: '二级菜单 2',
        tag: { type: 'warning', text: '新功能' }
      }
    ]
  }
]
</script>

<style scoped>
.custom-node-content {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
```

## 注意事项

1. 确保传入的 `data` 是符合树结构的数据，包含 `label`（或自定义的标签字段）和 `children`（或自定义的子节点字段）
2. 使用 `nodeKey` 可以提高组件性能，特别是在大数据量时
3. 自定义颜色时，建议同时设置 `color`、`selectedColor` 和 `hoverColor` 以获得更好的视觉效果
4. 多选模式下，建议设置 `style` 属性调整组件宽度
