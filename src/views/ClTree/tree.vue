<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalTree 组件</h1>
        <p class="page-description">基于 Element Plus 封装的增强型树组件，提供丰富的自定义样式能力</p>
      </div>
    </div>

    <!-- 基础使用案例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>基础树结构</h4>
          <CrystalTree :data="treeData" v-model="baseValue"></CrystalTree>
          <p>选中的值: {{ baseValue }}</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>基础鼠标聚焦自定义边框颜</h4>
          <CrystalTree :data="treeData" :border-color="'#F56C6C'" v-model="baseValue"></CrystalTree>
          <p>选中的值: {{ baseValue }}</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义颜色</h4>
          <CrystalTree
            :data="treeData"
            v-model="colorValue"
            :color="'yellow'"
            :selected-color="'red'"
            :hover-color="'pink'"
            :text-color="'909399'"
            :line-color="'red'"
          ></CrystalTree>
          <p>选中的值: {{ colorValue }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top: 24px">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义背景色</h4>
          <CrystalTree :data="treeData" v-model="bgValue" :background-color="'red'"></CrystalTree>
          <p>选中的值: {{ bgValue }}</p>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义连接线颜色</h4>
          <CrystalTree :data="treeData" v-model="lineValue" :line-color="'#909399'"></CrystalTree>
          <p>选中的值: {{ lineValue }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top: 24px">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带复选框的树</h4>
          <CrystalTree :data="treeData" v-model="checkboxValue" show-checkbox @check-change="handleCheckChange"></CrystalTree>
          <p>选中的值: {{ checkboxValue }}</p>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>可展开/折叠的树</h4>
          <CrystalTree :data="treeData" v-model="expandValue" default-expand-all></CrystalTree>
          <p>选中的值: {{ expandValue }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top: 24px">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义节点图标</h4>
          <CrystalTree
            :data="treeDataWithIcons"
            v-model="iconValue"
            node-key="label"
            :selected-color="'#409eff'"
            :hover-color="'#f5f7fa'"
          ></CrystalTree>
          <p>选中的值: {{ iconValue }}</p>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>禁用节点</h4>
          <CrystalTree :data="treeDataWithDisabled" v-model="disabledValue" node-key="label"></CrystalTree>
          <p>选中的值: {{ disabledValue }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top: 24px">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义节点内容</h4>
          <CrystalTree :data="treeDataWithTags" v-model="customValue" node-key="label">
            <template #node="{ data }">
              <span class="custom-node-content">
                <el-tag v-if="data.tag" :type="data.tag.type" size="small">{{ data.tag.text }}</el-tag>
                {{ data.label }}
              </span>
            </template>
          </CrystalTree>
          <p>选中的值: {{ customValue }}</p>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>事件处理</h4>
          <CrystalTree
            :data="treeData"
            v-model="eventValue"
            @node-expand="handleNodeExpand"
            @node-collapse="handleNodeCollapse"
            @node-click="handleNodeClick"
          ></CrystalTree>
          <p>选中的值: {{ eventValue }}</p>
        </div>
      </el-col>
    </el-row>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h3>CrystalTree 组件文档</h3>

      <div class="doc-section">
        <h4>支持的属性</h4>
        <BasicTable
          :table-data="propsTableData"
          :columns="propsColumns"
          basic-height="400px"
          :border="true"
          :stripe="true"
          :show-pagination="false"
        />
      </div>

      <div class="doc-section">
        <h4>支持的事件</h4>
        <BasicTable
          :table-data="eventsTableData"
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
import { ref } from "vue"
import { CrystalTree } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

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

// 带禁用节点的树数据
const treeDataWithDisabled = ref([
  {
    label: "可访问菜单",
    children: [
      {
        label: "启用的子菜单",
        children: [{ label: "功能1" }, { label: "功能2" }]
      },
      {
        label: "禁用的子菜单",
        disabled: true,
        children: [{ label: "功能3" }, { label: "功能4" }]
      }
    ]
  }
])

// 带图标的树数据
const treeDataWithIcons = ref([
  {
    label: "文件管理",
    icon: "📁",
    children: [
      {
        label: "图片",
        icon: "🖼️",
        children: [
          { label: "风景", icon: "🏞️" },
          { label: "人物", icon: "👥" }
        ]
      },
      {
        label: "文档",
        icon: "📄",
        children: [
          { label: "Word", icon: "📝" },
          { label: "Excel", icon: "📊" }
        ]
      }
    ]
  }
])

// 带标签的树数据
const treeDataWithTags = ref([
  {
    label: "一级菜单",
    tag: { type: "primary", text: "热门" },
    children: [
      {
        label: "二级菜单 1",
        tag: { type: "success", text: "推荐" }
      },
      {
        label: "二级菜单 2",
        tag: { type: "warning", text: "新功能" }
      }
    ]
  }
])

// 响应式变量
const iconValue = ref(null)
const disabledValue = ref(null)
const customValue = ref(null)
const eventValue = ref(null)
const baseValue = ref(null)
const colorValue = ref(null)
const bgValue = ref(null)
const lineValue = ref(null)
const checkboxValue = ref(null)
const expandValue = ref(null)

// 默认属性
const defaultProps = ref({
  children: "children",
  label: "label"
})

// 节点点击事件
const handleNodeClick = (data: any, node: any) => {
  console.log("Node clicked:", data.label)
}

// 复选框变化事件
const handleCheckChange = (data: any, checked: boolean, indeterminate: boolean) => {
  console.log("复选框变化", data, checked, indeterminate)
}

// 节点展开事件
const handleNodeExpand = (data: any, node: any) => {
  console.log("Node expanded:", data.label)
}

// 节点折叠事件
const handleNodeCollapse = (data: any, node: any) => {
  console.log("Node collapsed:", data.label)
}

// 属性表格数据
const propsTableData = ref([
  { prop: "data", description: "树节点数据", type: "Array", default: "[]" },
  { prop: "props", description: "配置选项", type: "Object", default: "{ children: 'children', label: 'label' }" },
  { prop: "node-key", description: "节点唯一标识", type: "String", default: "id" },
  { prop: "color", description: "节点颜色", type: "String", default: "#409eff" },
  { prop: "selected-color", description: "选中节点颜色", type: "String", default: "#409eff" },
  { prop: "hover-color", description: "鼠标悬停节点颜色", type: "String", default: "#f5f7fa" },
  { prop: "text-color", description: "节点文本颜色", type: "String", default: "#606266" },
  { prop: "line-color", description: "连接线颜色", type: "String", default: "#d9d9d9" },
  { prop: "background-color", description: "节点背景色", type: "String", default: "#ffffff" },
  { prop: "border-color", description: "边框颜色", type: "String", default: "#dcdfe6" },
  { prop: "focus-border-color", description: "聚焦时边框颜色", type: "String", default: "#409eff" },
  { prop: "hover-border-color", description: "鼠标悬停时边框颜色", type: "String", default: "#67c23a" },
  { prop: "box-shadow", description: "阴影效果", type: "String", default: "none" },
  { prop: "show-checkbox", description: "是否显示复选框", type: "Boolean", default: "false" },
  { prop: "default-expand-all", description: "是否默认展开所有节点", type: "Boolean", default: "false" },
  { prop: "icon", description: "自定义节点图标", type: "String", default: "Folder" },
  { prop: "leaf-icon", description: "自定义叶子节点图标", type: "String", default: "Document" }
])

// 属性表格列
const propsColumns = ref([
  { label: "属性", prop: "prop", width: "150" },
  { label: "描述", prop: "description" },
  { label: "类型", prop: "type", width: "100" },
  { label: "默认值", prop: "default", width: "200" }
])

// 事件表格数据
const eventsTableData = ref([
  { event: "node-click", description: "节点点击事件", parameters: "data: 节点数据" },
  {
    event: "check-change",
    description: "复选框变化事件",
    parameters: "data: 节点数据, checked: 是否选中, indeterminate: 是否半选"
  },
  { event: "expand-change", description: "展开/折叠事件", parameters: "data: 节点数据, expanded: 是否展开" }
])

// 事件表格列
const eventsColumns = ref([
  { label: "事件", prop: "event", width: "150" },
  { label: "描述", prop: "description" },
  { label: "参数", prop: "parameters" }
])
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

.component-docs {
  margin-top: 48px;
}

.component-docs h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
}

.doc-section {
  margin-bottom: 36px;
}

.doc-section h4 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 16px 0;
}

.custom-node-content {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
