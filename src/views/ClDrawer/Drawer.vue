<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalDrawer 增强版抽屉组件</h1>
        <p class="page-description">
          基于 Element Plus Drawer 组件二次封装，添加全屏/退出全屏功能，支持从不同方向打开，继承原组件的所有属性和事件
        </p>
      </div>
    </div>

    <!-- 基础使用示例 - 从右侧打开 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>从右侧打开抽屉</h4>
          <el-button type="primary" @click="drawerVisibleRight = true">打开右侧抽屉</el-button>
          <CrystalDrawer v-model="drawerVisibleRight" title="右侧抽屉" size="50%">
            <div class="drawer-content">
              <p>这是一个从右侧打开的增强版抽屉，支持全屏功能。</p>
              <p>点击右上角的全屏图标可以切换全屏状态。</p>
              <div class="demo-content-image">
                <el-image
                  src="https://img0.baidu.com/it/u=1458184935,3221340444&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                  fit="cover"
                  style="width: 100%; height: 200px; border-radius: 8px; margin-top: 20px"
                />
              </div>
            </div>
          </CrystalDrawer>
        </div>
      </el-col>
    </el-row>

    <!-- 从左侧打开抽屉 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>从左侧打开抽屉</h4>
          <el-button type="warning" @click="drawerVisibleLeft = true">打开左侧抽屉</el-button>
          <CrystalDrawer v-model="drawerVisibleLeft" title="左侧抽屉" direction="ltr" size="400px">
            <div class="drawer-content">
              <p>这个抽屉从左侧打开，同样支持全屏功能。</p>
              <el-menu :default-active="'1'" class="el-menu-vertical-demo">
                <el-menu-item index="1">
                  <el-icon><Management /></el-icon>
                  <span>菜单选项 1</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <el-icon><Document /></el-icon>
                  <span>菜单选项 2</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <el-icon><Setting /></el-icon>
                  <span>菜单选项 3</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon><Message /></el-icon>
                  <span>菜单选项 4</span>
                </el-menu-item>
              </el-menu>
            </div>
          </CrystalDrawer>
        </div>
      </el-col>
    </el-row>

    <!-- 从顶部打开抽屉 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>从顶部打开抽屉</h4>
          <el-button type="success" @click="drawerVisibleTop = true">打开顶部抽屉</el-button>
          <CrystalDrawer v-model="drawerVisibleTop" title="顶部抽屉" direction="ttb" size="300px">
            <div class="drawer-content">
              <p>这个抽屉从顶部打开，支持全屏功能。</p>
              <p>顶部抽屉常用于通知、消息提示等场景。</p>
              <div style="margin-top: 20px">
                <el-card shadow="hover" style="margin-bottom: 10px">
                  <template #header>
                    <div class="card-header">
                      <span>通知消息</span>
                      <el-button type="text" size="small">查看全部</el-button>
                    </div>
                  </template>
                  <div class="card-content">
                    <p>您有一条新的消息通知</p>
                    <p>系统将于明天进行维护升级</p>
                  </div>
                </el-card>
              </div>
            </div>
          </CrystalDrawer>
        </div>
      </el-col>
    </el-row>

    <!-- 带底部按钮的抽屉 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带底部按钮的抽屉</h4>
          <el-button type="info" @click="drawerVisibleWithFooter = true">打开带底部按钮的抽屉</el-button>
          <CrystalDrawer v-model="drawerVisibleWithFooter" title="带底部按钮的抽屉" width="500px">
            <div class="drawer-content">
              <p>这个抽屉带有自定义底部按钮，同时支持全屏功能。</p>
              <el-form label-position="top">
                <el-form-item label="姓名">
                  <el-input placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input placeholder="请输入邮箱" type="email" />
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input placeholder="请输入手机号码" />
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <span class="drawer-footer">
                <el-button @click="drawerVisibleWithFooter = false">取消</el-button>
                <el-button type="primary" @click="drawerVisibleWithFooter = false">确认</el-button>
              </span>
            </template>
          </CrystalDrawer>
        </div>
      </el-col>
    </el-row>

    <!-- 自定义头部的抽屉 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>自定义头部的抽屉</h4>
          <el-button type="danger" @click="drawerVisibleCustomHeader = true">打开自定义头部抽屉</el-button>
          <CrystalDrawer v-model="drawerVisibleCustomHeader" width="600px">
            <template #header>
              <div class="custom-header">
                <el-icon class="custom-header-icon"><Menu /></el-icon>
                <span class="custom-header-title">自定义头部抽屉</span>
                <el-button type="primary" size="small" @click="drawerVisibleCustomHeader = false">关闭</el-button>
              </div>
            </template>
            <div class="drawer-content">
              <p>这个抽屉使用了自定义的头部内容，支持全屏功能。</p>
              <p>可以根据需要完全自定义抽屉的头部样式和内容。</p>
              <div class="demo-content-image">
                <el-image
                  src="https://img0.baidu.com/it/u=1458184935,3221340444&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                  fit="cover"
                  style="width: 100%; height: 200px; border-radius: 8px; margin-top: 20px"
                />
              </div>
            </div>
          </CrystalDrawer>
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

    <!-- 组件方法表格 -->
    <div class="input-group">
      <h4>组件方法</h4>
      <BasicTable :columns="methodColumns" :table-data="methodData" border stripe />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { CrystalDrawer } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { Management, Document, Setting, Message, Menu } from "@element-plus/icons-vue"

// 抽屉状态
const drawerVisibleRight = ref(false)
const drawerVisibleLeft = ref(false)
const drawerVisibleTop = ref(false)
const drawerVisibleWithFooter = ref(false)
const drawerVisibleCustomHeader = ref(false)

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

// 方法表格列配置
const methodColumns = [
  { prop: "name", label: "方法名", width: 200 },
  { prop: "description", label: "说明", width: 300 },
  { prop: "params", label: "参数", width: 200 }
]

// 属性表格数据
const attributeData = [
  { name: "v-model", type: "boolean", default: "false", description: "抽屉显示状态" },
  { name: "title", type: "string", default: "''", description: "抽屉标题" },
  { name: "direction", type: "string", default: "'rtl'", description: "抽屉打开方向 (rtl/ltr/ttb/btt)" },
  { name: "size", type: "string/number", default: "'30%'", description: "抽屉尺寸" },
  { name: "with-header", type: "boolean", default: "true", description: "是否显示头部" },
  { name: "modal", type: "boolean", default: "true", description: "是否显示遮罩层" },
  { name: "modal-append-to-body", type: "boolean", default: "true", description: "遮罩层是否插入到 body 元素下" },
  { name: "append-to-body", type: "boolean", default: "false", description: "抽屉是否插入到 body 元素下" },
  { name: "lock-scroll", type: "boolean", default: "true", description: "是否锁定背景滚动" },
  { name: "custom-class", type: "string", default: "''", description: "自定义类名" },
  { name: "close-on-click-modal", type: "boolean", default: "true", description: "点击遮罩层是否关闭抽屉" },
  { name: "close-on-press-escape", type: "boolean", default: "true", description: "按下 ESC 键是否关闭抽屉" },
  { name: "show-close", type: "boolean", default: "true", description: "是否显示关闭按钮" },
  { name: "before-close", type: "function", default: "-", description: "关闭前的回调函数" }
]

// 事件表格数据
const eventData = [
  { name: "open", type: "Function", default: "-", description: "抽屉打开时触发" },
  { name: "opened", type: "Function", default: "-", description: "抽屉打开动画结束时触发" },
  { name: "close", type: "Function", default: "-", description: "抽屉关闭时触发" },
  { name: "closed", type: "Function", default: "-", description: "抽屉关闭动画结束时触发" },
  {
    name: "update:isFullscreen",
    type: "Function",
    default: "-",
    description: "全屏状态变化时触发，回调参数：isFullscreen: boolean"
  }
]

// 插槽表格数据
const slotData = [
  { name: "default", description: "抽屉内容" },
  { name: "header", description: "抽屉头部内容" },
  { name: "footer", description: "抽屉底部内容" }
]

// 方法表格数据
const methodData = [
  { name: "toggleFullscreen", description: "切换全屏状态", params: "-" },
  { name: "open", description: "打开抽屉", params: "-" },
  { name: "close", description: "关闭抽屉", params: "-" }
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

/* 抽屉内容样式 */
.drawer-content {
  padding: 16px 0;
}

.drawer-content p {
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
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* 卡片样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  padding: 10px 0;
}

.card-content p {
  margin: 5px 0;
  color: #606266;
}

/* 菜单样式 */
:deep(.el-menu-vertical-demo) {
  border-right: none;
}
</style>
