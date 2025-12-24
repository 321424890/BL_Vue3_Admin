<template>
  <div>
    <div id="printArea" class="flex-column-page-wrap pageWrap">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">CrystalTreeSelect 高级案例</h1>
          <p class="page-description">基于 Element Plus 封装的增强型树组件，提供丰富的自定义样式能力</p>
        </div>
      </div>

      <!-- 高级使用案例 -->
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>自定义节点插槽</h4>
            <CrystalTreeSelect
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              v-model="slotValue"
              @node-click="handleNodeClick"
            >
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <el-icon>
                    <Document />
                  </el-icon>
                  <span>{{ node.label }}</span>
                  <div class="node-actions">
                    <el-button type="primary" size="small" @click.stop="() => handleEdit(data)"> 编辑 </el-button>
                    <el-button type="danger" size="small" @click.stop="() => handleDelete(data)"> 删除 </el-button>
                  </div>
                </span>
              </template>
            </CrystalTreeSelect>
            <p>选中的值: {{ slotValue }}</p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>懒加载树</h4>
            <CrystalTreeSelect
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :lazy="true"
              :load="loadNode"
              default-expand-all
              v-model="lazyValue"
            ></CrystalTreeSelect>
            <p>选中的值: {{ lazyValue }}</p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top: 24px">
        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>可拖拽树</h4>
            <CrystalTreeSelectSelect
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :draggable="true"
              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              v-model="dragValue"
            ></CrystalTreeSelectSelect>
            <p>选中的值: {{ dragValue }}</p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>自定义连接线样式</h4>
            <CrystalTreeSelect
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :line-style="{ 'border-width': '2px', 'border-color': '#67c23a', 'border-style': 'dashed' }"
              v-model="lineStyleValue"
            ></CrystalTreeSelect>
            <p>选中的值: {{ lineStyleValue }}</p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top: 24px">
        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>异步加载数据</h4>
            <CrystalTreeSelect
              :data="asyncTreeData"
              :props="defaultProps"
              node-key="id"
              v-model="asyncValue"
              @node-click="handleNodeClick"
            ></CrystalTreeSelect>
            <p>选中的值: {{ asyncValue }}</p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>自定义节点高度</h4>
            <CrystalTreeSelect
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :node-height="50"
              v-model="heightValue"
            ></CrystalTreeSelect>
            <p>选中的值: {{ heightValue }}</p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top: 24px">
        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>带搜索功能的树</h4>
            <div style="margin-bottom: 12px">
              <el-input
                v-model="searchText"
                placeholder="输入关键词搜索"
                prefix-icon="Search"
                size="small"
                @input="handleSearch"
              />
            </div>
            <CrystalTreeSelect
              :data="filteredTreeData"
              :props="defaultProps"
              node-key="id"
              v-model="searchValue"
              @node-click="handleNodeClick"
            ></CrystalTreeSelect>
            <p>选中的值: {{ searchValue }}</p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="12">
          <div class="input-group">
            <h4>自定义节点展开/折叠图标</h4>
            <CrystalTreeSelect
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :expand-icon="'Plus'"
              :collapse-icon="'Minus'"
              v-model="iconValue"
            ></CrystalTreeSelect>
            <p>选中的值: {{ iconValue }}</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h3>CrystalTreeSelect 高级属性文档</h3>

      <div class="doc-section">
        <h4>高级属性</h4>
        <BasicTable
          :table-data="advancedPropsTableData"
          :columns="propsColumns"
          basic-height="400px"
          :border="true"
          :stripe="true"
          :show-pagination="false"
        />
      </div>

      <div class="doc-section">
        <h4>高级事件</h4>
        <BasicTable
          :table-data="advancedEventsTableData"
          :columns="eventsColumns"
          basic-height="300px"
          :border="true"
          :stripe="true"
          :show-pagination="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { CrystalTreeSelect } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { Document, Plus, Minus } from "@element-plus/icons-vue"

// 树数据
const treeData = ref([
  {
    id: 1,
    label: "一级节点A",
    children: [
      {
        id: 2,
        label: "二级节点A-1"
      },
      {
        id: 3,
        label: "二级节点A-2",
        children: [
          {
            id: 4,
            label: "三级节点A-2-1"
          },
          {
            id: 5,
            label: "三级节点A-2-2"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    label: "一级节点B",
    children: [
      {
        id: 7,
        label: "二级节点B-1"
      },
      {
        id: 8,
        label: "二级节点B-2"
      }
    ]
  }
])

// 异步加载数据
const asyncTreeData = ref([])

// 默认属性
const defaultProps = ref({
  children: "children",
  label: "label"
})

// 响应式变量
const slotValue = ref(null)
const lazyValue = ref(null)
const dragValue = ref(null)
const lineStyleValue = ref(null)
const asyncValue = ref(null)
const heightValue = ref(null)
const searchValue = ref(null)
const iconValue = ref(null)

// 搜索文本
const searchText = ref("")

// 过滤后的树数据
const filteredTreeData = computed(() => {
  if (!searchText.value) return treeData.value
  return filterTree(treeData.value, searchText.value)
})

// 过滤树节点
const filterTree = (data: any[], keyword: string) => {
  return data
    .map(node => {
      const newNode = { ...node }
      if (newNode.children) {
        newNode.children = filterTree(newNode.children, keyword)
      }
      return newNode
    })
    .filter(node => node.label.includes(keyword) || (node.children && node.children.length > 0))
}

// 节点点击事件
const handleNodeClick = (data: any) => {
  console.log("节点点击", data)
}

// 编辑节点
const handleEdit = (data: any) => {
  console.log("编辑节点", data)
}

// 删除节点
const handleDelete = (data: any) => {
  console.log("删除节点", data)
}

// 懒加载节点
const loadNode = (node: any, resolve: any) => {
  if (node.level === 0) {
    return resolve([
      { id: 1, label: "一级节点" },
      { id: 2, label: "一级节点" }
    ])
  }
  if (node.level > 1) {
    return resolve([])
  }
  setTimeout(() => {
    resolve([
      { id: node.id * 10 + 1, label: `二级节点 ${node.id}-1` },
      { id: node.id * 10 + 2, label: `二级节点 ${node.id}-2` }
    ])
  }, 1000)
}

// 拖拽事件
const handleDragStart = (node: any, ev: any) => {
  console.log("拖拽开始", node, ev)
}

const handleDragEnter = (draggingNode: any, dropNode: any, ev: any) => {
  console.log("拖拽进入", draggingNode, dropNode, ev)
}

const handleDragLeave = (draggingNode: any, dropNode: any, ev: any) => {
  console.log("拖拽离开", draggingNode, dropNode, ev)
}

const handleDragOver = (draggingNode: any, dropNode: any, ev: any) => {
  console.log("拖拽中", draggingNode, dropNode, ev)
}

const handleDragEnd = (draggingNode: any, dropNode: any, dropType: any, ev: any) => {
  console.log("拖拽结束", draggingNode, dropNode, dropType, ev)
}

const handleDrop = (draggingNode: any, dropNode: any, dropType: any, ev: any) => {
  console.log("放置节点", draggingNode, dropNode, dropType, ev)
}

// 搜索事件
const handleSearch = () => {
  console.log("搜索", searchText.value)
}

// 异步加载数据
const loadAsyncData = () => {
  setTimeout(() => {
    asyncTreeData.value = [
      {
        id: 1,
        label: "异步加载节点A",
        children: [
          {
            id: 2,
            label: "异步加载节点A-1"
          }
        ]
      }
    ]
  }, 1000)
}

// 属性表格列
const propsColumns = ref([
  { label: "属性", prop: "prop", width: "150" },
  { label: "描述", prop: "description" },
  { label: "类型", prop: "type", width: "100" },
  { label: "默认值", prop: "default", width: "200" }
])

// 事件表格列
const eventsColumns = ref([
  { label: "事件", prop: "event", width: "150" },
  { label: "描述", prop: "description" },
  { label: "参数", prop: "parameters" }
])

// 高级属性表格数据
const advancedPropsTableData = ref([
  { prop: "lazy", description: "是否懒加载子节点", type: "Boolean", default: "false" },
  { prop: "load", description: "加载子节点数据的方法", type: "Function", default: "-" },
  { prop: "draggable", description: "是否可拖拽", type: "Boolean", default: "false" },
  { prop: "line-style", description: "自定义连接线样式", type: "Object", default: "{}" },
  { prop: "node-height", description: "自定义节点高度", type: "Number", default: "32" },
  { prop: "expand-icon", description: "自定义展开图标", type: "String", default: "FolderOpened" },
  { prop: "collapse-icon", description: "自定义折叠图标", type: "String", default: "Folder" },
  { prop: "allow-drop", description: "拖拽时判断目标节点是否允许放置", type: "Function", default: "-" },
  { prop: "allow-drag", description: "拖拽时判断节点是否允许拖拽", type: "Function", default: "-" }
])

// 高级事件表格数据
const advancedEventsTableData = ref([
  { event: "node-drag-start", description: "节点开始拖拽时触发", parameters: "node: 节点数据, ev: 事件对象" },
  {
    event: "node-drag-enter",
    description: "拖拽进入其他节点时触发",
    parameters: "draggingNode: 拖拽节点, dropNode: 目标节点, ev: 事件对象"
  },
  {
    event: "node-drag-leave",
    description: "拖拽离开其他节点时触发",
    parameters: "draggingNode: 拖拽节点, dropNode: 目标节点, ev: 事件对象"
  },
  {
    event: "node-drag-over",
    description: "拖拽经过其他节点时触发",
    parameters: "draggingNode: 拖拽节点, dropNode: 目标节点, ev: 事件对象"
  },
  {
    event: "node-drag-end",
    description: "拖拽结束时触发",
    parameters: "draggingNode: 拖拽节点, dropNode: 目标节点, dropType: 放置类型, ev: 事件对象"
  },
  {
    event: "node-drop",
    description: "拖拽放置时触发",
    parameters: "draggingNode: 拖拽节点, dropNode: 目标节点, dropType: 放置类型, ev: 事件对象"
  },
  { event: "load", description: "懒加载时触发", parameters: "node: 节点数据, resolve: 加载完成回调" }
])

// 初始化异步数据
loadAsyncData()
</script>

<style scoped>
.pageWrap {
  padding: 20px;
}

/* 页面头部样式 */
.page-header {
  padding: 30px 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: #303133;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page-description {
  color: #606266;
  font-size: 16px;
  margin: 0;
}

/* 示例组样式 */
.input-group {
  width: 100%;
  margin-bottom: 0;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.input-group:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #e6f7ff;
}

.input-group h4 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #e6f7ff;
  position: relative;
  text-align: left;
}

.input-group h4::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #1890ff;
  border-radius: 2px;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.node-actions {
  display: flex;
  gap: 8px;
}
</style>
