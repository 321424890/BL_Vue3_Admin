<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalAlert 增强版警告组件</h1>
        <p class="page-description">基于 Element Plus Alert 组件二次封装，继承原组件的所有属性和事件</p>
      </div>
    </div>

    <!-- 基础使用示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>基础警告</h4>
          <CrystalAlert title="成功提示" type="success" />
        </div>
      </el-col>
    </el-row>

    <!-- 带描述的警告 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带描述的警告</h4>
          <CrystalAlert title="警告提示" type="warning">
            <template #default>
              <div>这是一条带描述信息的警告，包含更多详细内容。</div>
            </template>
          </CrystalAlert>
        </div>
      </el-col>
    </el-row>

    <!-- 可关闭的警告 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>可关闭的警告</h4>
          <CrystalAlert title="错误提示" type="error" :closable="true" @close="handleClose" />
        </div>
      </el-col>
    </el-row>

    <!-- 带有图标的警告 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带有图标和背景色的警告</h4>
          <CrystalAlert title="信息提示" type="info" :show-icon="true" effect="dark" />
        </div>
      </el-col>
    </el-row>

    <!-- 组件属性表格 -->
    <div class="input-group">
      <h4>组件属性</h4>
      <BasicTable :columns="columns" :table-data="attributeData" border stripe />
    </div>

    <!-- 组件事件表格 -->
    <div class="input-group">
      <h4>组件事件</h4>
      <BasicTable :columns="columns" :table-data="eventData" border stripe />
    </div>

    <!-- 组件插槽表格 -->
    <div class="input-group">
      <h4>组件插槽</h4>
      <BasicTable :columns="slotColumns" :table-data="slotData" border stripe />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalAlert } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 关闭事件处理
const handleClose = () => {
  console.log("Alert closed")
}

// 表格列配置
const columns = [
  { prop: "name", label: "属性名", width: 200 },
  { prop: "type", label: "类型", width: 200 },
  { prop: "default", label: "默认值", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 }
]

// 插槽表格列配置
const slotColumns = [
  { prop: "name", label: "插槽名", width: 200 },
  { prop: "description", label: "说明", minWidth: 500 }
]

// 属性表格数据
const attributeData = [
  { name: "title", type: "string", default: "''", description: "警告标题" },
  { name: "type", type: "string", default: "'info'", description: "警告类型，可选值：success, warning, info, error" },
  { name: "closable", type: "boolean", default: "false", description: "是否可关闭" },
  { name: "close-text", type: "string", default: "''", description: "关闭按钮文本" },
  { name: "show-icon", type: "boolean", default: "false", description: "是否显示图标" },
  { name: "effect", type: "string", default: "'light'", description: "主题样式，可选值：light, dark" },
  { name: "center", type: "boolean", default: "false", description: "是否居中显示" },
  { name: "description", type: "string", default: "''", description: "警告描述" },
  { name: "icon", type: "string", default: "''", description: "自定义图标" }
]

// 事件表格数据
const eventData = [{ name: "close", type: "Function", default: "-", description: "关闭警告时触发" }]

// 插槽表格数据
const slotData = [
  { name: "default", description: "警告描述" },
  { name: "title", description: "警告标题" },
  { name: "close", description: "关闭按钮" }
]
</script>

<style scoped>
.pageWrap {
  padding: 20px;
}

/* 页面头部样式 */
.page-header {
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.page-title {
  color: #303133;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page-description {
  color: #606266;
  font-size: 14px;
  margin: 0;
}

/* 示例组样式 */
.input-group {
  margin-bottom: 20px;
  padding: 16px;
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.input-group h4 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

/* 弹窗内容样式 */
.dialog-content {
  padding: 16px 0;
}

.dialog-content p {
  margin: 8px 0;
  line-height: 1.5;
}
</style>
