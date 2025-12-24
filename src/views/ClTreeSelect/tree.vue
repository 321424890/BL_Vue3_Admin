<template>
  <div class="tree-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalTree 组件</h1>
      <p class="demo-description">
        基于 Element Plus Tree 组件的二次封装，完全继承原组件所有功能，支持属性、事件和插槽的自动转发。
      </p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-grid">
          <!-- 示例1: 基础树形结构 -->
          <div class="demo-card">
            <h4 class="card-title">基础树形结构</h4>
            <p class="card-desc">最基础的树形结构展示</p>
            <CrystalTree v-model="defaultExpandedKeys" :data="data" node-key="id" @node-click="handleNodeClick">
              <template #default="{ node, data }">
                <span>{{ data?.label }}</span>
              </template>
            </CrystalTree>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">可选择</h3>
        <div class="demo-grid">
          <!-- 示例2: 带复选框的树形结构 -->
          <div class="demo-card">
            <h4 class="card-title">带复选框的树形结构</h4>
            <p class="card-desc">支持节点选择功能</p>
            <CrystalTree v-model="checkedKeys" :data="data" show-checkbox node-key="id" default-expand-all></CrystalTree>
            <div class="value-display">选中的节点: {{ checkedKeys }}</div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">自定义节点内容</h3>
        <div class="demo-grid">
          <!-- 示例3: 自定义节点内容 -->
          <div class="demo-card">
            <h4 class="card-title">自定义节点内容</h4>
            <p class="card-desc">自定义节点显示内容和操作按钮</p>
            <CrystalTree :data="customData" node-key="id">
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <span>{{ data?.label }}</span>
                  <el-button size="mini" @click="() => append(data)"> Append </el-button>
                  <el-button size="mini" type="danger" @click="() => remove(node, data)"> Delete </el-button>
                </span>
              </template>
            </CrystalTree>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">懒加载</h3>
        <div class="demo-grid">
          <!-- 示例4: 懒加载树形结构 -->
          <div class="demo-card">
            <h4 class="card-title">懒加载树形结构</h4>
            <p class="card-desc">动态加载子节点数据</p>
            <CrystalTree :data="lazyData" lazy :load="loadNode" node-key="id" default-expand-all></CrystalTree>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">拖拽节点</h3>
        <div class="demo-grid">
          <!-- 示例5: 可拖拽的树形结构 -->
          <div class="demo-card">
            <h4 class="card-title">可拖拽的树形结构</h4>
            <p class="card-desc">支持节点拖拽功能</p>
            <CrystalTree
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
            ></CrystalTree>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">筛选功能</h3>
        <div class="demo-grid">
          <!-- 示例6: 带筛选功能的树形结构 -->
          <div class="demo-card">
            <h4 class="card-title">带筛选功能的树形结构</h4>
            <p class="card-desc">支持节点筛选功能</p>
            <el-input v-model="filterText" placeholder="输入关键字进行筛选" style="margin-bottom: 20px" />
            <CrystalTree :data="data" node-key="id" ref="tree" default-expand-all></CrystalTree>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalTree 组件文档</h2>

      <div class="doc-section">
        <h3>支持的属性</h3>
        <BasicTable
          :table-data="propsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="600px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的事件</h3>
        <BasicTable
          :table-data="eventsTableData"
          :columns="eventsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的方法</h3>
        <BasicTable
          :table-data="methodsTableData"
          :columns="methodsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的插槽</h3>
        <BasicTable
          :table-data="slotsTableData"
          :columns="slotsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="200px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { ElMessage } from "element-plus"
import { CrystalTree } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 基础使用
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
  ElMessage.info(`点击了节点: ${data?.label || "未知节点"}`)
}

// 可选择
const checkedKeys = ref(["1-1"])

// 自定义节点内容
const customData = ref([
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

// 懒加载
const lazyData = ref([
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

// 拖拽节点
const allowDrag = (node: any) => {
  return node.data?.label !== "一级 2"
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

// 筛选功能
const filterText = ref("")
const tree = ref(null)

watch(filterText, value => {
  tree.value?.filter(value)
})

// 属性表格配置
const propsColumns = [
  {
    prop: "prop",
    label: "属性名",
    width: 150
  },
  {
    prop: "type",
    label: "类型",
    width: 150
  },
  {
    prop: "default",
    label: "默认值",
    width: 100
  },
  {
    prop: "required",
    label: "是否必填",
    width: 100
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 属性表格数据
const propsTableData = [
  {
    prop: "data",
    type: "array",
    default: "—",
    required: true,
    description: "展示数据"
  },
  {
    prop: "node-key",
    type: "string / number",
    default: "—",
    required: true,
    description: "每个树节点用来作为唯一标识的属性，整棵树应该是唯一的"
  },
  {
    prop: "props",
    type: "object",
    default: "{ label: 'label', children: 'children', disabled: 'disabled', isLeaf: 'isLeaf' }",
    required: false,
    description: "配置选项"
  },
  {
    prop: "render-after-expand",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否在第一次展开某个树节点后才渲染其子节点"
  },
  {
    prop: "load",
    type: "function(node, resolve)",
    default: "—",
    required: false,
    description: "加载子树数据的方法，仅当 lazy 属性为true时生效"
  },
  {
    prop: "lazy",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否懒加载子节点，需与 load 方法结合使用"
  },
  {
    prop: "show-checkbox",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示 checkbox"
  },
  {
    prop: "check-strictly",
    type: "boolean",
    default: "false",
    required: false,
    description: "在显示复选框的情况下，是否严格的遵循父子不互相关联的做法"
  },
  {
    prop: "default-expanded-keys",
    type: "array",
    default: "—",
    required: false,
    description: "默认展开的节点的 key 的数组"
  },
  {
    prop: "default-checked-keys",
    type: "array",
    default: "—",
    required: false,
    description: "默认勾选的节点的 key 的数组"
  },
  {
    prop: "current-node-key",
    type: "string / number",
    default: "—",
    required: false,
    description: "当前选中的节点"
  },
  {
    prop: "default-current-node-key",
    type: "string / number",
    default: "—",
    required: false,
    description: "默认当前选中的节点"
  },
  {
    prop: "expand-on-click-node",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否在点击节点的时候展开或者收缩节点"
  },
  {
    prop: "check-on-click-node",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否在点击节点的时候选中节点"
  },
  {
    prop: "auto-expand-parent",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否在展开某个节点后，自动展开其父节点"
  },
  {
    prop: "default-expand-all",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否默认展开所有节点"
  },
  {
    prop: "highlight-current",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否高亮当前选中节点"
  },
  {
    prop: "indent",
    type: "number",
    default: "16",
    required: false,
    description: "相邻级节点间的水平缩进，单位为像素"
  },
  {
    prop: "icon",
    type: "Component / Function",
    default: "—",
    required: false,
    description: "自定义树节点的图标"
  },
  {
    prop: "draggable",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否可拖拽"
  },
  {
    prop: "allow-drag",
    type: "function(node)",
    default: "—",
    required: false,
    description: "拖拽时判定节点能否被拖拽的函数"
  },
  {
    prop: "allow-drop",
    type: "function(draggingNode, dropNode, dropType)",
    default: "—",
    required: false,
    description: "拖拽时判定目标节点能否成为拖动目标的函数"
  },
  {
    prop: "accordion",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否每次只打开一个同级树节点展开"
  },
  {
    prop: "filter-node-method",
    type: "function(value, data, node)",
    default: "—",
    required: false,
    description: "对树节点进行筛选时执行的方法"
  },
  {
    prop: "sort-method",
    type: "function(a, b)",
    default: "—",
    required: false,
    description: "对树节点进行排序时执行的方法"
  },
  {
    prop: "sort-by",
    type: "function(a, b)",
    default: "—",
    required: false,
    description: "按照哪个属性进行排序，值为属性名"
  },
  {
    prop: "empty-text",
    type: "string",
    default: "暂无数据",
    required: false,
    description: "内容为空的时候展示的文本"
  }
]

// 事件表格配置
const eventsColumns = [
  {
    prop: "event",
    label: "事件名",
    width: 150
  },
  {
    prop: "params",
    label: "回调参数",
    width: 200
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 事件表格数据
const eventsTableData = [
  {
    event: "node-click",
    params: "data: 树节点的数据, node: 对应节点的 Node, event: Event",
    description: "节点被点击时的回调"
  },
  {
    event: "node-contextmenu",
    params: "data: 树节点的数据, node: 对应节点的 Node, event: Event",
    description: "节点被鼠标右键点击时的回调"
  },
  {
    event: "check",
    params: "data: 树节点的数据, node: 对应节点的 Node, checked: 节点本身是否被选中",
    description: "当复选框被点击的时候触发"
  },
  {
    event: "check-change",
    params: "data: 树节点的数据, checked: 节点本身是否被选中, indeterminate: 节点的父节点是否处于半选中状态",
    description: "节点选中状态发生变化时的回调"
  },
  {
    event: "node-expand",
    params: "data: 树节点的数据, node: 对应节点的 Node",
    description: "节点被展开时触发的事件"
  },
  {
    event: "node-collapse",
    params: "data: 树节点的数据, node: 对应节点的 Node",
    description: "节点被折叠时触发的事件"
  },
  {
    event: "node-drag-start",
    params: "node: 被拖拽节点对应的 Node, event: Event",
    description: "节点开始拖拽时触发"
  },
  {
    event: "node-drag-enter",
    params: "draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽进入的节点对应的 Node, event: Event",
    description: "拖拽进入其他节点时触发"
  },
  {
    event: "node-drag-leave",
    params: "draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽离开的节点对应的 Node, event: Event",
    description: "拖拽离开某个节点时触发"
  },
  {
    event: "node-drag-over",
    params: "draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽覆盖的节点对应的 Node, event: Event",
    description: "在节点内拖拽时触发"
  },
  {
    event: "node-drag-end",
    params:
      "draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽进入的节点对应的 Node, dropType: 拖拽的类型（before, after, inner）, event: Event",
    description: "拖拽结束时触发"
  },
  {
    event: "node-drop",
    params:
      "draggingNode: 被拖拽节点对应的 Node, dropNode: 拖拽进入的节点对应的 Node, dropType: 拖拽的类型（before, after, inner）, event: Event",
    description: "拖拽成功完成时触发"
  },
  {
    event: "current-change",
    params: "data: 当前节点的数据, node: 当前节点的 Node",
    description: "当前选中节点变化时触发的事件"
  },
  {
    event: "node-mouse-enter",
    params: "data: 树节点的数据, node: 对应节点的 Node, event: Event",
    description: "当鼠标进入节点时触发"
  },
  {
    event: "node-mouse-leave",
    params: "data: 树节点的数据, node: 对应节点的 Node, event: Event",
    description: "当鼠标离开节点时触发"
  }
]

// 方法表格配置
const methodsColumns = [
  {
    prop: "method",
    label: "方法名",
    width: 150
  },
  {
    prop: "params",
    label: "参数",
    width: 200
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 方法表格数据
const methodsTableData = [
  {
    method: "filter",
    params: "value: 过滤节点的关键字",
    description: "过滤节点"
  },
  {
    method: "updateKeyChildren",
    params: "key: 要更新的节点的 key, data: 新的子节点数据",
    description: "通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性"
  },
  {
    method: "append",
    params: "parentNode: 父节点的 Node, data: 要追加的子节点的数据",
    description: "为节点追加子节点"
  },
  {
    method: "remove",
    params: "data: 要删除的节点的数据",
    description: "删除节点"
  },
  {
    method: "insertBefore",
    params: "data: 要插入的节点的数据, refNode: 参考节点的数据",
    description: "在指定节点前插入节点"
  },
  {
    method: "insertAfter",
    params: "data: 要插入的节点的数据, refNode: 参考节点的数据",
    description: "在指定节点后插入节点"
  },
  {
    method: "getCheckedNodes",
    params: "leafOnly: 是否只是叶子节点, includeHalfChecked: 是否包含半选中节点",
    description: "获取所有被选中的节点"
  },
  {
    method: "getCheckedKeys",
    params: "leafOnly: 是否只是叶子节点, includeHalfChecked: 是否包含半选中节点",
    description: "获取所有被选中的节点的 key"
  },
  {
    method: "getHalfCheckedNodes",
    params: "—",
    description: "获取所有半选中的节点"
  },
  {
    method: "getHalfCheckedKeys",
    params: "—",
    description: "获取所有半选中的节点的 key"
  },
  {
    method: "setCheckedNodes",
    params: "nodes: 要被选中的节点的数组",
    description: "设置选中的节点"
  },
  {
    method: "setCheckedKeys",
    params: "keys: 要被选中的节点的 key 的数组, leafOnly: 是否只是叶子节点",
    description: "设置选中的节点的 key"
  },
  {
    method: "setChecked",
    params: "key/data: 要设置的节点的 key 或者 data, checked: 勾选状态, deep: 是否设置子节点",
    description: "通过 key / data 设置某个节点的勾选状态"
  },
  {
    method: "getCurrentNode",
    params: "—",
    description: "获取当前选中的节点"
  },
  {
    method: "getCurrentKey",
    params: "—",
    description: "获取当前选中的节点的 key"
  },
  {
    method: "setCurrentNode",
    params: "node: 要被选中的节点",
    description: "设置当前选中的节点"
  },
  {
    method: "setCurrentKey",
    params: "key: 要被选中的节点的 key",
    description: "设置当前选中的节点的 key"
  },
  {
    method: "getNode",
    params: "data/key: 要获取 node 的 data 或者 key",
    description: "根据 data 或者 key 获取 Tree 组件中的 node"
  },
  {
    method: "expandAll",
    params: "—",
    description: "展开所有节点"
  },
  {
    method: "collapseAll",
    params: "—",
    description: "折叠所有节点"
  }
]

// 插槽表格配置
const slotsColumns = [
  {
    prop: "slot",
    label: "插槽名",
    width: 150
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  },
  {
    prop: "scope",
    label: "作用域",
    width: 200
  }
]

// 插槽表格数据
const slotsTableData = [
  {
    slot: "default",
    description: "自定义树节点的内容",
    scope: "{ node, data }"
  },
  {
    slot: "header",
    description: "树的头部内容",
    scope: "—"
  },
  {
    slot: "default-expand-icon",
    description: "自定义展开图标",
    scope: "{ node, data }"
  },
  {
    slot: "default-collapse-icon",
    description: "自定义折叠图标",
    scope: "{ node, data }"
  },
  {
    slot: "default-node-icon",
    description: "自定义节点图标",
    scope: "{ node, data }"
  },
  {
    slot: "default-leaf-icon",
    description: "自定义叶子节点图标",
    scope: "{ node, data }"
  }
]
</script>

<style scoped>
.tree-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.demo-header {
  margin-bottom: 40px;
  text-align: center;
}

.demo-title {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 16px;
}

.demo-description {
  font-size: 16px;
  color: #606266;
  line-height: 1.8;
}

.demo-content {
  margin-bottom: 40px;
}

.demo-section {
  margin-bottom: 40px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 24px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.demo-card {
  background-color: #fafafa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.6;
}

.value-display {
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
  font-family: monospace;
}

.component-docs {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.component-docs h2 {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 24px;
  text-align: center;
}

.doc-section {
  margin-bottom: 32px;
}

.doc-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
