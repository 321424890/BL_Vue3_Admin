<template>
  <div class="editor-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalEditor 组件</h1>
      <p class="demo-description">基于 wangEditor 封装的增强型富文本编辑器组件，支持丰富的文本编辑功能</p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <el-row :gutter="24">
          <!-- 示例1: 基本用法 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="demo-card">
              <h4 class="card-title">基本用法</h4>
              <p class="card-desc">最基础的富文本编辑器功能</p>
              <CrystalEditor v-model="content1" height="300px" placeholder="请输入内容..." />
              <div class="value-display">
                <h5>编辑内容：</h5>
                <div v-html="content1" class="html-content"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">自定义高度</h3>
        <el-row :gutter="24">
          <!-- 示例2: 不同高度 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">小高度</h4>
              <p class="card-desc">高度为 200px 的编辑器</p>
              <CrystalEditor v-model="content2" height="200px" placeholder="请输入内容..." />
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">中等高度</h4>
              <p class="card-desc">高度为 300px 的编辑器</p>
              <CrystalEditor v-model="content3" height="300px" placeholder="请输入内容..." />
            </div>
          </el-col>

          <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">大高度</h4>
              <p class="card-desc">高度为 400px 的编辑器</p>
              <CrystalEditor v-model="content4" height="400px" placeholder="请输入内容..." />
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">禁用和只读</h3>
        <el-row :gutter="24">
          <!-- 示例3: 禁用状态 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div class="demo-card">
              <h4 class="card-title">禁用状态</h4>
              <p class="card-desc">禁用的富文本编辑器</p>
              <CrystalEditor v-model="content5" height="300px" :disabled="true" placeholder="此编辑器已禁用" />
            </div>
          </el-col>

          <!-- 示例4: 只读状态 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div class="demo-card">
              <h4 class="card-title">只读状态</h4>
              <p class="card-desc">只读的富文本编辑器</p>
              <CrystalEditor v-model="content6" height="300px" :read-only="true" placeholder="此编辑器为只读模式" />
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">自定义菜单</h3>
        <el-row :gutter="24">
          <!-- 示例5: 自定义菜单 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="demo-card">
              <h4 class="card-title">自定义菜单</h4>
              <p class="card-desc">只包含基础格式化功能的编辑器</p>
              <CrystalEditor v-model="content7" height="300px" :custom-menu="customMenu" placeholder="请输入内容..." />
              <div class="menu-list">
                <h5>自定义菜单列表：</h5>
                <div class="menu-items">
                  <span v-for="(item, index) in customMenu" :key="index" class="menu-item">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">事件监听</h3>
        <el-row :gutter="24">
          <!-- 示例6: 事件监听 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="demo-card">
              <h4 class="card-title">事件监听</h4>
              <p class="card-desc">监听编辑器的各种事件</p>
              <CrystalEditor
                v-model="content8"
                height="300px"
                placeholder="请输入内容..."
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
              />
              <div class="event-log">
                <h5>事件日志：</h5>
                <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                  {{ log }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">全屏编辑</h3>
        <el-row :gutter="24">
          <!-- 示例7: 全屏编辑 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="demo-card">
              <h4 class="card-title">全屏编辑</h4>
              <p class="card-desc">支持全屏编辑功能的编辑器</p>
              <CrystalEditor v-model="content9" height="300px" :show-full-screen="true" placeholder="请输入内容..." />
              <p class="fullscreen-tip">提示：点击编辑器右上角的全屏按钮可以进入全屏编辑模式</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalEditor 组件文档</h2>

      <div class="doc-section">
        <h3>支持的属性</h3>
        <BasicTable
          :table-data="attributeData"
          :columns="attributeColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="600px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的事件</h3>
        <BasicTable
          :table-data="eventData"
          :columns="eventColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="400px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { CrystalEditor } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 编辑器内容
const content1 = ref("")
const content2 = ref("")
const content3 = ref("")
const content4 = ref("")
const content5 = ref("<p>这是一段禁用状态下的内容</p>")
const content6 = ref("<p>这是一段只读状态下的内容</p>")
const content7 = ref("")
const content8 = ref("")
const content9 = ref("")

// 自定义菜单
const customMenu = [
  "bold",
  "italic",
  "underline",
  "strikeThrough", // 基础格式化
  "|", // 分隔线
  "head", // 标题
  "|",
  "list", // 列表
  "justify", // 对齐
  "|",
  "undo",
  "redo" // 撤销/重做
]

// 事件日志
const eventLogs = ref<string[]>([])

// 事件处理
const handleChange = (value: string) => {
  eventLogs.value.push(`change: 内容已更新`)
  ElMessage.success("内容已更新")
}

const handleFocus = (value: string) => {
  eventLogs.value.push("focus: 编辑器获得焦点")
}

const handleBlur = (value: string) => {
  eventLogs.value.push("blur: 编辑器失去焦点")
}

// 属性表格列配置
const attributeColumns = [
  { prop: "name", label: "属性名", width: "200" },
  { prop: "description", label: "说明" },
  { prop: "type", label: "类型", width: "150" },
  { prop: "default", label: "默认值", width: "150" }
]

// 属性表格数据
const attributeData = [
  { name: "modelValue / v-model", description: "编辑器内容，支持 v-model 双向绑定", type: "string", default: "''" },
  { name: "placeholder", description: "编辑器占位文本", type: "string", default: "请输入内容..." },
  { name: "height", description: "编辑器高度", type: "string \\| number", default: "300px" },
  { name: "minHeight", description: "编辑器最小高度", type: "string \\| number", default: "200px" },
  { name: "maxHeight", description: "编辑器最大高度", type: "string \\| number", default: "''" },
  { name: "disabled", description: "是否禁用编辑器", type: "boolean", default: "false" },
  { name: "readOnly", description: "是否只读模式", type: "boolean", default: "false" },
  { name: "showFullScreen", description: "是否显示全屏按钮", type: "boolean", default: "true" },
  { name: "showMenu", description: "是否显示菜单栏", type: "boolean", default: "true" },
  { name: "customMenu", description: "自定义菜单栏", type: "any[]", default: "undefined" },
  { name: "editorId", description: "编辑器容器的 ID，若不提供则自动生成", type: "string", default: "''" }
]

// 事件表格列配置
const eventColumns = [
  { prop: "name", label: "事件名", width: "200" },
  { prop: "description", label: "说明" },
  { prop: "parameters", label: "回调参数", width: "200" }
]

// 事件表格数据
const eventData = [
  { name: "update:modelValue", description: "编辑器内容变化时触发（用于 v-model 双向绑定）", parameters: "value: string" },
  { name: "change", description: "编辑器内容变化时触发", parameters: "value: string" },
  { name: "blur", description: "编辑器失去焦点时触发", parameters: "value: string" },
  { name: "focus", description: "编辑器获得焦点时触发", parameters: "value: string" }
]
</script>

<style scoped>
.editor-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.demo-header {
  margin-bottom: 30px;
  text-align: center;
}

.demo-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.demo-description {
  font-size: 16px;
  color: #666;
}

.demo-section {
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
}

.demo-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
  transition: all 0.3s;
}

.demo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.card-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.value-display {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
}

.value-display h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.html-content {
  min-height: 50px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  white-space: pre-wrap;
}

.menu-list {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
}

.menu-list h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.menu-item {
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
}

.event-log {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.log-item {
  margin: 5px 0;
  font-size: 12px;
  color: #606266;
  line-height: 1.4;
}

.fullscreen-tip {
  margin-top: 15px;
  padding: 10px;
  background-color: #ecf5ff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  font-size: 14px;
  color: #409eff;
}

.component-docs {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  margin-top: 40px;
}

.component-docs h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.component-docs h3 {
  font-size: 18px;
  color: #333;
  margin: 25px 0 15px 0;
  font-weight: 500;
}

.doc-section {
  margin-bottom: 30px;
}
</style>
