<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalDialog 增强版弹窗组件</h1>
        <p class="page-description">
          基于 Element Plus Dialog 组件二次封装，添加全屏/退出全屏和最小化功能，继承原组件的所有属性和事件
        </p>
      </div>
    </div>

    <!-- 基础使用示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>基础弹窗</h4>
          <el-button type="primary" @click="dialogVisible = true">打开基础弹窗</el-button>
          <CrystalDialog v-model="dialogVisible" title="基础弹窗" width="800px">
            <div class="dialog-content">
              <p>这是一个基础的增强版弹窗，支持全屏和最小化功能。</p>
              <p>点击右上角的全屏图标可以切换全屏状态。</p>
              <p>点击右上角的最小化图标可以最小化弹窗。</p>
            </div>
          </CrystalDialog>
        </div>
      </el-col>
    </el-row>

    <!-- 带底部按钮的弹窗 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带底部按钮的弹窗</h4>
          <el-button type="success" @click="dialogVisibleWithFooter = true">打开带底部按钮的弹窗</el-button>
          <CrystalDialog v-model="dialogVisibleWithFooter" title="带底部按钮的弹窗" width="500px">
            <div class="dialog-content">
              <p>这个弹窗带有自定义底部按钮，同时支持全屏和最小化功能。</p>
              <el-form label-position="top">
                <el-form-item label="姓名">
                  <el-input placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input placeholder="请输入邮箱" type="email" />
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisibleWithFooter = false">取消</el-button>
                <el-button type="primary" @click="dialogVisibleWithFooter = false">确认</el-button>
              </span>
            </template>
          </CrystalDialog>
        </div>
      </el-col>
    </el-row>

    <!-- 居中显示弹窗 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>居中显示弹窗</h4>
          <el-button type="warning" @click="dialogVisibleCenter = true">打开居中弹窗</el-button>
          <CrystalDialog v-model="dialogVisibleCenter" title="居中弹窗" width="600px" center>
            <div class="dialog-content">
              <p>这个弹窗是居中显示的，同样支持全屏和最小化功能。</p>
              <div class="demo-content-image">
                <el-image
                  src="https://img0.baidu.com/it/u=1458184935,3221340444&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                  fit="cover"
                  style="width: 100%; height: 200px; border-radius: 8px"
                />
              </div>
            </div>
          </CrystalDialog>
        </div>
      </el-col>
    </el-row>

    <!-- 自定义头部弹窗 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>自定义头部弹窗</h4>
          <el-button type="info" @click="dialogVisibleCustomHeader = true">打开自定义头部弹窗</el-button>
          <CrystalDialog v-model="dialogVisibleCustomHeader" width="600px">
            <template #header>
              <div class="custom-header">
                <el-icon class="custom-header-icon"><MessageBox /></el-icon>
                <span class="custom-header-title">自定义头部弹窗</span>
              </div>
            </template>
            <div class="dialog-content">
              <p>这个弹窗使用了自定义的头部内容，支持全屏和最小化功能。</p>
              <p>可以根据需要完全自定义弹窗的头部样式和内容。</p>
            </div>
          </CrystalDialog>
        </div>
      </el-col>
    </el-row>

    <!-- 可拖拽弹窗 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>可拖拽弹窗</h4>
          <el-button type="primary" @click="dialogVisibleDraggable = true">打开可拖拽弹窗</el-button>
          <CrystalDialog v-model="dialogVisibleDraggable" title="可拖拽弹窗" width="600px" draggable>
            <div class="dialog-content">
              <p>这个弹窗是可拖拽的，支持全屏和最小化功能。</p>
              <p>可以通过拖动弹窗头部来改变弹窗位置。</p>
              <p>点击右上角的全屏图标可以切换全屏状态。</p>
              <p>点击右上角的最小化图标可以最小化弹窗。</p>
            </div>
          </CrystalDialog>
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
import { CrystalDialog } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { MessageBox } from "@element-plus/icons-vue"

// 弹窗状态
const dialogVisible = ref(false)
const dialogVisibleWithFooter = ref(false)
const dialogVisibleCenter = ref(false)
const dialogVisibleCustomHeader = ref(false)
const dialogVisibleDraggable = ref(false)

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
  { name: "v-model", type: "boolean", default: "false", description: "弹窗显示状态" },
  { name: "title", type: "string", default: "''", description: "弹窗标题" },
  { name: "width", type: "string/number", default: "'50%'", description: "弹窗宽度" },
  { name: "fullscreen", type: "boolean", default: "false", description: "是否全屏显示" },
  { name: "top", type: "string", default: "'15vh'", description: "弹窗距离顶部的距离" },
  { name: "modal", type: "boolean", default: "true", description: "是否显示遮罩层" },
  { name: "modal-append-to-body", type: "boolean", default: "true", description: "遮罩层是否插入到 body 元素下" },
  { name: "append-to-body", type: "boolean", default: "false", description: "弹窗是否插入到 body 元素下" },
  { name: "lock-scroll", type: "boolean", default: "true", description: "是否锁定背景滚动" },
  { name: "custom-class", type: "string", default: "''", description: "自定义类名" },
  { name: "close-on-click-modal", type: "boolean", default: "true", description: "点击遮罩层是否关闭弹窗" },
  { name: "close-on-press-escape", type: "boolean", default: "true", description: "按下 ESC 键是否关闭弹窗" },
  { name: "show-close", type: "boolean", default: "true", description: "是否显示关闭按钮" },
  { name: "center", type: "boolean", default: "false", description: "是否居中显示" },
  { name: "destroy-on-close", type: "boolean", default: "false", description: "关闭时是否销毁弹窗内容" }
]

// 事件表格数据
const eventData = [
  { name: "open", type: "Function", default: "-", description: "弹窗打开时触发" },
  { name: "opened", type: "Function", default: "-", description: "弹窗打开动画结束时触发" },
  { name: "close", type: "Function", default: "-", description: "弹窗关闭时触发" },
  { name: "closed", type: "Function", default: "-", description: "弹窗关闭动画结束时触发" },
  {
    name: "update:isFullscreen",
    type: "Function",
    default: "-",
    description: "全屏状态变化时触发，回调参数：isFullscreen: boolean"
  }
]

// 插槽表格数据
const slotData = [
  { name: "default", description: "弹窗内容" },
  { name: "header", description: "弹窗头部内容" },
  { name: "footer", description: "弹窗底部内容" }
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

/* 自定义头部样式 */
.custom-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-header-icon {
  color: #409eff;
  font-size: 18px;
}

.custom-header-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

/* 示例内容图片 */
.demo-content-image {
  margin-top: 16px;
}

/* 底部按钮样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
