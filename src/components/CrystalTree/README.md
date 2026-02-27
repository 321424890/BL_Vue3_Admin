# CrystalTree 树形控件

基于 Element Plus Tree 组件的二次封装，完全继承原组件所有功能，支持属性、事件和插槽的自动转发。

## 基础用法

```vue
<template>
  <crystal-tree v-model="defaultExpandedKeys" :data="data" node-key="id" @node-click="handleNodeClick">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
    </template>
  </crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalTree } from "crystalplus-ui"

const defaultExpandedKeys = ref(["1"])

const data = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      {
        id: "1-1",
        label: "二级 1-1",
        children: [
          { id: "1-1-1", label: "三级 1-1-1" },
          { id: "1-1-2", label: "三级 1-1-2" }
        ]
      },
      { id: "1-2", label: "二级 1-2" }
    ]
  },
  { id: "2", label: "一级 2" }
])

const handleNodeClick = (data: any, node: any) => {
  console.log(data, node)
}
</script>
```

## 可选择

```vue
<template>
  <crystal-tree v-model="checkedKeys" :data="data" show-checkbox node-key="id" default-expand-all></crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalTree } from "crystalplus-ui"

const checkedKeys = ref(["1-1"])

const data = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      { id: "1-1", label: "二级 1-1" },
      { id: "1-2", label: "二级 1-2" }
    ]
  },
  { id: "2", label: "一级 2" }
])
</script>
```

## 自定义节点内容

```vue
<template>
  <crystal-tree :data="data" node-key="id">
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ data.label }}</span>
        <el-button size="mini" @click="() => append(data)"> Append </el-button>
        <el-button size="mini" type="danger" @click="() => remove(node, data)"> Delete </el-button>
      </span>
    </template>
  </crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { CrystalTree } from "crystalplus-ui"

const data = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      { id: "1-1", label: "二级 1-1" },
      { id: "1-2", label: "二级 1-2" }
    ]
  }
])

const append = (data: any) => {
  const newChild = {
    id: `${data.id}-${Date.now()}`,
    label: `New Node ${Date.now()}`
  }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  ElMessage.success("Node added successfully")
}

const remove = (node: any, data: any) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d: any) => d.id === data.id)
  children.splice(index, 1)
  ElMessage.success("Node deleted successfully")
}
</script>
```

## 懒加载

```vue
<template>
  <crystal-tree :data="data" lazy :load="loadNode" node-key="id" default-expand-all></crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalTree } from "crystalplus-ui"

const data = ref([
  {
    id: "1",
    label: "一级 1",
    hasChildren: true
  }
])

const loadNode = (node: any, resolve: any) => {
  if (node.level === 0) {
    return resolve([
      {
        id: "1",
        label: "一级 1",
        hasChildren: true
      }
    ])
  }
  if (node.level > 2) {
    return resolve([])
  }

  const hasChildren = node.level === 1
  setTimeout(() => {
    const nodes = Array.from({ length: 3 }, (_, i) => ({
      id: `${node.data.id}-${i + 1}`,
      label: `第${node.level + 1}级 ${node.data.id}-${i + 1}`,
      hasChildren
    }))
    resolve(nodes)
  }, 500)
}
</script>
```

## 拖拽节点

```vue
<template>
  <crystal-tree
    v-model="defaultExpandedKeys"
    :data="data"
    node-key="id"
    draggable
    :allow-drag="allowDrag"
    :allow-drop="allowDrop"
    @node-drag-start="handleDragStart"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  ></crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalTree } from "crystalplus-ui"

const defaultExpandedKeys = ref(["1"])

const data = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      { id: "1-1", label: "二级 1-1" },
      { id: "1-2", label: "二级 1-2" }
    ]
  },
  { id: "2", label: "一级 2" }
])

const allowDrag = (node: any) => {
  return node.data.label !== "一级 2"
}

const allowDrop = (draggingNode: any, dropNode: any, type: string) => {
  return type !== "inner"
}

const handleDragStart = (draggingNode: any) => {
  console.log("Drag start:", draggingNode)
}

const handleDragOver = (draggingNode: any, dropNode: any, dropType: string) => {
  console.log("Drag over:", draggingNode, dropNode, dropType)
}

const handleDragEnd = (draggingNode: any, dropNode: any, dropType: string, event: Event) => {
  console.log("Drag end:", draggingNode, dropNode, dropType, event)
}

const handleDrop = (draggingNode: any, dropNode: any, dropType: string, event: Event) => {
  console.log("Drop:", draggingNode, dropNode, dropType, event)
}
</script>
```

## 禁用状态

```vue
<template>
  <crystal-tree :data="data" node-key="id" default-expand-all></crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalTree } from "crystalplus-ui"

const data = ref([
  {
    id: "1",
    label: "一级 1",
    disabled: true,
    children: [
      { id: "1-1", label: "二级 1-1" },
      { id: "1-2", label: "二级 1-2" }
    ]
  },
  { id: "2", label: "一级 2" }
])
</script>
```

## 筛选功能

```vue
<template>
  <div class="filter-tree">
    <el-input v-model="filterText" placeholder="输入关键字进行筛选" style="margin-bottom: 20px" />
    <crystal-tree :data="data" node-key="id" ref="tree" default-expand-all></crystal-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { CrystalTree } from "crystalplus-ui"

const filterText = ref("")
const tree = ref(null)

const data = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      { id: "1-1", label: "二级 1-1" },
      { id: "1-2", label: "二级 1-2" }
    ]
  },
  { id: "2", label: "一级 2" }
])

watch(filterText, value => {
  tree.value?.filter(value)
})
</script>
```

## 属性

CrystalTree 继承了 Element Plus Tree 组件的所有属性，以下是常用属性列表：

| 参数                     | 说明                                                                                                          | 类型                                       | 可选值 | 默认值                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------ | -------------------------------------------------------------------------------- |
| data                     | 展示数据                                                                                                      | array                                      | —      | —                                                                                |
| node-key                 | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                                          | string / number                            | —      | —                                                                                |
| props                    | 配置选项，具体看下表                                                                                          | object                                     | —      | { label: 'label', children: 'children', disabled: 'disabled', isLeaf: 'isLeaf' } |
| render-after-expand      | 是否在第一次展开某个树节点后才渲染其子节点                                                                    | boolean                                    | —      | true                                                                             |
| load                     | 加载子树数据的方法，仅当 lazy 属性为true时生效                                                                | function(node, resolve)                    | —      | —                                                                                |
| lazy                     | 是否懒加载子节点，需与 load 方法结合使用                                                                      | boolean                                    | —      | false                                                                            |
| show-checkbox            | 是否显示 checkbox                                                                                             | boolean                                    | —      | false                                                                            |
| check-strictly           | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false                                        | boolean                                    | —      | false                                                                            |
| default-expanded-keys    | 默认展开的节点的 key 的数组                                                                                   | array                                      | —      | —                                                                                |
| default-checked-keys     | 默认勾选的节点的 key 的数组                                                                                   | array                                      | —      | —                                                                                |
| current-node-key         | 当前选中的节点                                                                                                | string / number                            | —      | —                                                                                |
| default-current-node-key | 默认当前选中的节点                                                                                            | string / number                            | —      | —                                                                                |
| expand-on-click-node     | 是否在点击节点的时候展开或者收缩节点，默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | boolean                                    | —      | true                                                                             |
| check-on-click-node      | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点                                | boolean                                    | —      | false                                                                            |
| auto-expand-parent       | 是否在展开某个节点后，自动展开其父节点                                                                        | boolean                                    | —      | true                                                                             |
| default-expand-all       | 是否默认展开所有节点                                                                                          | boolean                                    | —      | false                                                                            |
| highlight-current        | 是否高亮当前选中节点，默认值是 false                                                                          | boolean                                    | —      | false                                                                            |
| indent                   | 相邻级节点间的水平缩进，单位为像素                                                                            | number                                     | —      | 16                                                                               |
| icon                     | 自定义树节点的图标                                                                                            | Component / Function                       | —      | —                                                                                |
| lazy                     | 是否懒加载子节点，需与 load 方法结合使用                                                                      | boolean                                    | —      | false                                                                            |
| draggable                | 是否可拖拽（节点拖拽，目前仅支持在节点本身及其子节点内进行拖拽）                                              | boolean                                    | —      | false                                                                            |
| allow-drag               | 拖拽时判定节点能否被拖拽的函数                                                                                | function(node)                             | —      | —                                                                                |
| allow-drop               | 拖拽时判定目标节点能否成为拖动目标的函数                                                                      | function(draggingNode, dropNode, dropType) | —      | —                                                                                |
| accordion                | 是否每次只打开一个同级树节点展开                                                                              | boolean                                    | —      | false                                                                            |
| filter-node-method       | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏               | function(value, data, node)                | —      | —                                                                                |
| sort-method              | 对树节点进行排序时执行的方法，返回一个数字，小于 0 则 a 在 b 前，大于 0 则 a 在 b 后                          | function(a, b)                             | —      | —                                                                                |
| sort-by                  | 按照哪个属性进行排序，值为属性名                                                                              | function(a, b)                             | —      | —                                                                                |
| current-node-key         | 当前选中的节点                                                                                                | string / number                            | —      | —                                                                                |
| empty-text               | 内容为空的时候展示的文本                                                                                      | string                                     | —      | 暂无数据                                                                         |
| props.label              | 指定节点标签为节点对象的某个属性值                                                                            | string, function(data, node)               | —      | label                                                                            |
| props.children           | 指定子树为节点对象的某个属性值                                                                                | string                                     | —      | children                                                                         |
| props.disabled           | 指定节点选择框是否禁用为节点对象的某个属性值                                                                  | string, function(data, node)               | —      | disabled                                                                         |
| props.isLeaf             | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效                                                      | string, function(data, node)               | —      | isLeaf                                                                           |
| props.class              | 自定义节点类名                                                                                                | string, function(data, node)               | —      | —                                                                                |
| props.title              | 自定义节点标题                                                                                                | string, function(data, node)               | —      | —                                                                                |

## 事件

CrystalTree 继承了 Element Plus Tree 组件的所有事件：

| 事件名称            | 说明                         | 回调参数                                                                                                                             |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| node-click          | 节点被点击时的回调           | data: 树节点的数据, node: 对应节点的 Node, event: Event                                                                              |
| node-contextmenu    | 节点被鼠标右键点击时的回调   | data: 树节点的数据, node: 对应节点的 Node, event: Event                                                                              |
| check               | 当复选框被点击的时候触发     | data: 树节点的数据, node: 对应节点的 Node, checked: 节点本身是否被选中                                                               |
| check-change        | 节点选中状态发生变化时的回调 | data: 树节点的数据, checked: 节点本身是否被选中, indeterminate: 节点的父节点是否处于半选中状态                                       |
| node-expand         | 节点被展开时触发的事件       | data: 树节点的数据, node: 对应节点的 Node                                                                                            |
| node-collapse       | 节点被折叠时触发的事件       | data: 树节点的数据, node: 对应节点的 Node                                                                                            |
| node-drag-start     | 节点开始拖拽时触发           | node: 被拖拽节点对应的 Node, event: Event                                                                                            |
| node-drag-enter     | 拖拽进入其他节点时触发       | draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽进入的节点对应的 Node, event: Event                                               |
| node-drag-leave     | 拖拽离开某个节点时触发       | draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽离开的节点对应的 Node, event: Event                                               |
| node-drag-over      | 在节点内拖拽时触发           | draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽覆盖的节点对应的 Node, event: Event                                               |
| node-drag-end       | 拖拽结束时触发               | draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽进入的节点对应的 Node, dropType: 拖拽的类型（before, after, inner）, event: Event |
| node-drop           | 拖拽成功完成时触发           | draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽进入的节点对应的 Node, dropType: 拖拽的类型（before, after, inner）, event: Event |
| current-change      | 当前选中节点变化时触发的事件 | data: 当前节点的数据, node: 当前节点的 Node                                                                                          |
| node-mouse-enter    | 当鼠标进入节点时触发         | data: 树节点的数据, node: 对应节点的 Node, event: Event                                                                              |
| node-mouse-leave    | 当鼠标离开节点时触发         | data: 树节点的数据, node: 对应节点的 Node, event: Event                                                                              |
| node-expand-start   | 节点展开动画开始前触发       | node: 被展开节点对应的 Node                                                                                                          |
| node-expand-end     | 节点展开动画结束后触发       | node: 被展开节点对应的 Node                                                                                                          |
| node-collapse-start | 节点折叠动画开始前触发       | node: 被折叠节点对应的 Node                                                                                                          |
| node-collapse-end   | 节点折叠动画结束后触发       | node: 被折叠节点对应的 Node                                                                                                          |

## 方法

通过 ref 可以获取到 Tree 实例并调用实例方法：

| 方法名              | 说明                                                       | 参数                                                                            |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| filter              | 过滤节点                                                   | value: 过滤节点的关键字                                                         |
| updateKeyChildren   | 通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性 | key: 要更新的节点的 key, data: 新的子节点数据                                   |
| append              | 为节点追加子节点                                           | parentNode: 父节点的 Node, data: 要追加的子节点的数据                           |
| remove              | 删除节点                                                   | data: 要删除的节点的数据                                                        |
| insertBefore        | 在指定节点前插入节点                                       | data: 要插入的节点的数据, refNode: 参考节点的数据                               |
| insertAfter         | 在指定节点后插入节点                                       | data: 要插入的节点的数据, refNode: 参考节点的数据                               |
| getCheckedNodes     | 获取所有被选中的节点                                       | leafOnly: 是否只是叶子节点, includeHalfChecked: 是否包含半选中节点              |
| getCheckedKeys      | 获取所有被选中的节点的 key                                 | leafOnly: 是否只是叶子节点, includeHalfChecked: 是否包含半选中节点              |
| getHalfCheckedNodes | 获取所有半选中的节点                                       | —                                                                               |
| getHalfCheckedKeys  | 获取所有半选中的节点的 key                                 | —                                                                               |
| setCheckedNodes     | 设置选中的节点                                             | nodes: 要被选中的节点的数组                                                     |
| setCheckedKeys      | 设置选中的节点的 key                                       | keys: 要被选中的节点的 key 的数组, leafOnly: 是否只是叶子节点                   |
| setChecked          | 通过 key / data 设置某个节点的勾选状态                     | key/data: 要设置的节点的 key 或者 data, checked: 勾选状态, deep: 是否设置子节点 |
| getCurrentNode      | 获取当前选中的节点                                         | —                                                                               |
| getCurrentKey       | 获取当前选中的节点的 key                                   | —                                                                               |
| setCurrentNode      | 设置当前选中的节点                                         | node: 要被选中的节点                                                            |
| setCurrentKey       | 设置当前选中的节点的 key                                   | key: 要被选中的节点的 key                                                       |
| getNode             | 根据 data 或者 key 获取 Tree 组件中的 node                 | data/key: 要获取 node 的 data 或者 key                                          |
| remove              | 删除节点                                                   | data: 要删除的节点的数据                                                        |
| expandAll           | 展开所有节点                                               | —                                                                               |
| collapseAll         | 折叠所有节点                                               | —                                                                               |
| filterNode          | 过滤节点（内部方法）                                       | value: 过滤节点的关键字                                                         |

## 插槽

| 插槽名称              | 说明               | 作用域         |
| --------------------- | ------------------ | -------------- |
| default               | 自定义树节点的内容 | { node, data } |
| header                | 树的头部内容       | —              |
| default-expand-icon   | 自定义展开图标     | { node, data } |
| default-collapse-icon | 自定义折叠图标     | { node, data } |
| default-node-icon     | 自定义节点图标     | { node, data } |
| default-leaf-icon     | 自定义叶子节点图标 | { node, data } |

## 访问原生组件

可以通过 `v-bind="$attrs"` 自动转发所有原生属性，同时支持通过 ref 访问原生组件实例：

```vue
<template>
  <crystal-tree
    ref="treeRef"
    v-model="defaultExpandedKeys"
    :data="data"
    node-key="id"
    :style="{ '--el-tree-node-indent': '20px' }"
  ></crystal-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalTree } from "crystalplus-ui"

const treeRef = ref(null)
const defaultExpandedKeys = ref(["1"])

// 访问原生方法
const getCheckedNodes = () => {
  return treeRef.value?.getCheckedNodes()
}
</script>
```

## 自定义样式

可以通过 CSS 变量或直接设置 style 属性来自定义样式：

```vue
<template>
  <crystal-tree
    :data="data"
    node-key="id"
    style="
      --el-tree-node-indent: 24px;
      --el-tree-node-hover-bg-color: #f5f7fa;
      --el-tree-text-color: #303133;
    "
  ></crystal-tree>
</template>
```

## 无障碍支持

```vue
<template>
  <crystal-tree :data="data" node-key="id" aria-label="树状导航菜单"></crystal-tree>
</template>
```

## 完整示例

```vue
<template>
  <div class="crystal-tree-demo">
    <h2>CrystalTree 完整示例</h2>
    <el-input v-model="filterText" placeholder="筛选节点" style="margin-bottom: 20px" />
    <crystal-tree
      ref="tree"
      v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys"
      :data="data"
      node-key="id"
      show-checkbox
      check-strictly
      highlight-current
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    >
      <template #default="{ node, data }">
        <span>
          <el-tag v-if="data.tag" size="small" type="info">{{ data.tag }}</el-tag>
          {{ data.label }}
        </span>
      </template>
      <template #header>
        <div style="padding: 10px; background: #f5f7fa; border-radius: 4px; margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="expandAll">展开全部</el-button>
          <el-button size="small" @click="collapseAll">折叠全部</el-button>
          <el-button type="success" size="small" @click="getCheckedNodes">获取选中节点</el-button>
        </div>
      </template>
    </crystal-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import { ElMessage } from "element-plus"
import { CrystalTree } from "crystalplus-ui"

const tree = ref(null)
const filterText = ref("")
const checkedKeys = ref(["1-1"])
const expandedKeys = ref(["1"])

const data = ref([
  {
    id: "1",
    label: "一级 1",
    tag: "new",
    children: [
      {
        id: "1-1",
        label: "二级 1-1",
        children: [
          { id: "1-1-1", label: "三级 1-1-1" },
          { id: "1-1-2", label: "三级 1-1-2" }
        ]
      },
      {
        id: "1-2",
        label: "二级 1-2",
        children: [{ id: "1-2-1", label: "三级 1-2-1" }]
      }
    ]
  },
  {
    id: "2",
    label: "一级 2",
    children: [
      { id: "2-1", label: "二级 2-1" },
      { id: "2-2", label: "二级 2-2" }
    ]
  }
])

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const handleNodeClick = (data, node) => {
  ElMessage.info(`点击了节点: ${data.label}`)
}

const handleCheckChange = (data, checked, indeterminate) => {
  ElMessage.success(`节点 ${data.label} 状态变化: 选中=${checked}, 半选中=${indeterminate}`)
}

const expandAll = () => {
  tree.value?.expandAll()
}

const collapseAll = () => {
  tree.value?.collapseAll()
}

const getCheckedNodes = () => {
  const nodes = tree.value?.getCheckedNodes()
  ElMessage.success(`选中的节点数量: ${nodes?.length || 0}`)
  console.log("选中的节点:", nodes)
}
</script>

<style scoped>
.crystal-tree-demo {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. 所有 Element Plus Tree 组件的属性、事件和方法都可以直接使用
2. 通过 `v-model` 可以双向绑定 `checkedKeys`、`expandedKeys`、`currentNodeKey` 等属性
3. 自定义图标和节点内容可以通过插槽实现
4. 懒加载和拖拽功能完全支持
5. 无障碍属性（如 `aria-label`）可以通过 `v-bind="$attrs"` 自动转发

## 浏览器支持

与 Element Plus 保持一致，支持所有现代浏览器。

## 版本兼容性

- Vue 3.2+
- Element Plus 2.3+

## 贡献

如果您发现任何问题或有改进建议，请随时提交 Issue 或 Pull Request。

## 许可证

MIT License
