<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalModal 增强版模态框组件</h1>
        <p class="page-description">基于 Element Plus Modal 组件二次封装，继承原组件的所有属性和事件</p>
      </div>
    </div>

    <!-- 基础使用示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>基础模态框</h4>
          <el-button type="primary" @click="modalVisible = true">打开基础模态框</el-button>
          <CrystalModal v-model="modalVisible" title="基础模态框">
            <div class="modal-content">
              <p>这是一个基础的增强版模态框，继承了原组件的所有属性和事件。</p>
              <p>可以根据需要自定义内容和样式。</p>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="modalVisible = false">取消</el-button>
                <el-button type="primary" @click="modalVisible = false">确认</el-button>
              </span>
            </template>
          </CrystalModal>
        </div>
      </el-col>
    </el-row>

    <!-- 带底部按钮的模态框 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带底部按钮的模态框</h4>
          <el-button type="success" @click="modalVisibleWithFooter = true">打开带底部按钮的模态框</el-button>
          <CrystalModal v-model="modalVisibleWithFooter" title="带底部按钮的模态框" width="600px">
            <div class="modal-content">
              <p>这个模态框带有自定义底部按钮。</p>
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
                <el-button @click="modalVisibleWithFooter = false">取消</el-button>
                <el-button type="primary" @click="modalVisibleWithFooter = false">确认</el-button>
              </span>
            </template>
          </CrystalModal>
        </div>
      </el-col>
    </el-row>

    <!-- 居中显示模态框 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>居中显示模态框</h4>
          <el-button type="warning" @click="modalVisibleCenter = true">打开居中模态框</el-button>
          <CrystalModal v-model="modalVisibleCenter" title="居中模态框" width="600px" center>
            <div class="modal-content">
              <p>这个模态框是居中显示的。</p>
              <div class="demo-content-image">
                <el-image
                  src="https://img0.baidu.com/it/u=1458184935,3221340444&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                  fit="cover"
                  style="width: 100%; height: 200px; border-radius: 8px"
                />
              </div>
            </div>
          </CrystalModal>
        </div>
      </el-col>
    </el-row>

    <!-- 自定义头部模态框 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>自定义头部模态框</h4>
          <el-button type="info" @click="modalVisibleCustomHeader = true">打开自定义头部模态框</el-button>
          <CrystalModal v-model="modalVisibleCustomHeader" width="600px">
            <template #header>
              <div class="custom-header">
                <el-icon class="custom-header-icon"><MessageBox /></el-icon>
                <span class="custom-header-title">自定义头部模态框</span>
              </div>
            </template>
            <div class="modal-content">
              <p>这个模态框使用了自定义的头部内容。</p>
              <p>可以根据需要完全自定义模态框的头部样式和内容。</p>
            </div>
          </CrystalModal>
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
import { CrystalModal } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { MessageBox } from "@element-plus/icons-vue"

// 模态框状态
const modalVisible = ref(false)
const modalVisibleWithFooter = ref(false)
const modalVisibleCenter = ref(false)
const modalVisibleCustomHeader = ref(false)

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
  { name: "v-model", type: "boolean", default: "false", description: "模态框显示状态" },
  { name: "title", type: "string", default: "''", description: "模态框标题" },
  { name: "width", type: "string/number", default: "'50%'", description: "模态框宽度" },
  { name: "fullscreen", type: "boolean", default: "false", description: "是否全屏显示" },
  { name: "top", type: "string", default: "'15vh'", description: "模态框距离顶部的距离" },
  { name: "modal", type: "boolean", default: "true", description: "是否显示遮罩层" },
  { name: "modal-append-to-body", type: "boolean", default: "true", description: "遮罩层是否插入到 body 元素下" },
  { name: "append-to-body", type: "boolean", default: "false", description: "模态框是否插入到 body 元素下" },
  { name: "lock-scroll", type: "boolean", default: "true", description: "是否锁定背景滚动" },
  { name: "custom-class", type: "string", default: "''", description: "自定义类名" },
  { name: "close-on-click-modal", type: "boolean", default: "true", description: "点击遮罩层是否关闭模态框" },
  { name: "close-on-press-escape", type: "boolean", default: "true", description: "按下 ESC 键是否关闭模态框" },
  { name: "show-close", type: "boolean", default: "true", description: "是否显示关闭按钮" },
  { name: "center", type: "boolean", default: "false", description: "是否居中显示" },
  { name: "destroy-on-close", type: "boolean", default: "false", description: "关闭时是否销毁模态框内容" }
]

// 事件表格数据
const eventData = [
  { name: "open", type: "Function", default: "-", description: "模态框打开时触发" },
  { name: "opened", type: "Function", default: "-", description: "模态框打开动画结束时触发" },
  { name: "close", type: "Function", default: "-", description: "模态框关闭时触发" },
  { name: "closed", type: "Function", default: "-", description: "模态框关闭动画结束时触发" }
]

// 插槽表格数据
const slotData = [
  { name: "default", description: "模态框内容" },
  { name: "header", description: "模态框头部内容" },
  { name: "footer", description: "模态框底部内容" }
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

/* 模态框内容样式 */
.modal-content {
  padding: 16px 0;
}

.modal-content p {
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
