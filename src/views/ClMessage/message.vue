<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalMessage 增强版消息提示组件</h1>
        <p class="page-description">基于 Element Plus Message 组件二次封装，继承原组件的所有属性和事件</p>
      </div>
    </div>

    <!-- 基础使用示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>基础消息</h4>
          <el-button type="primary" @click="showMessage('success')">成功消息</el-button>
          <el-button type="warning" @click="showMessage('warning')">警告消息</el-button>
          <el-button type="info" @click="showMessage('info')">信息消息</el-button>
          <el-button type="danger" @click="showMessage('error')">错误消息</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 带描述的消息 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带描述的消息</h4>
          <el-button type="primary" @click="showMessageWithDesc">带描述的消息</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 自定义时长的消息 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>自定义时长的消息</h4>
          <el-button type="primary" @click="showMessageWithDuration">5秒后关闭的消息</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 自定义位置的消息 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>自定义位置的消息</h4>
          <el-button type="primary" @click="showMessage('success', 'top-right')">右上角</el-button>
          <el-button type="success" @click="showMessage('success', 'top-left')">左上角</el-button>
          <el-button type="warning" @click="showMessage('success', 'bottom-right')">右下角</el-button>
          <el-button type="info" @click="showMessage('success', 'bottom-left')">左下角</el-button>
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
import { CrystalMessage } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 显示消息
const showMessage = (type: string, position: string = "top-right") => {
  CrystalMessage({
    message: `这是一条${type === "success" ? "成功" : type === "warning" ? "警告" : type === "info" ? "信息" : "错误"}消息`,
    type: type as any,
    position: position
  })
}

// 显示带描述的消息
const showMessageWithDesc = () => {
  CrystalMessage({
    message: "这是一条带详细描述的消息，包含更多信息内容。",
    type: "success",
    position: "top-right"
  })
}

// 显示自定义时长的消息
const showMessageWithDuration = () => {
  CrystalMessage({
    message: "这是一条5秒后关闭的消息",
    type: "success",
    duration: 5000,
    position: "top-right"
  })
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
  { name: "message", type: "string", default: "''", description: "消息内容" },
  { name: "type", type: "string", default: "'info'", description: "消息类型，可选值：success, warning, info, error" },
  { name: "duration", type: "number", default: "3000", description: "显示时长，单位毫秒" },
  { name: "show-close", type: "boolean", default: "false", description: "是否显示关闭按钮" },
  {
    name: "position",
    type: "string",
    default: "'top-right'",
    description: "消息位置，可选值：top-right, top-left, bottom-right, bottom-left"
  },
  { name: "offset", type: "number", default: "0", description: "偏移量" },
  { name: "z-index", type: "number", default: "0", description: "z-index 值" },
  { name: "append-to", type: "string", default: "''", description: "挂载节点" }
]

// 事件表格数据
const eventData = [
  { name: "close", type: "Function", default: "-", description: "关闭消息时触发" },
  { name: "click", type: "Function", default: "-", description: "点击消息时触发" }
]

// 插槽表格数据
const slotData = [{ name: "default", description: "消息内容" }]
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
