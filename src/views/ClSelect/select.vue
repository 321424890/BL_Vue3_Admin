<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalSelect 组件</h1>
        <p class="page-description">基于 Element Plus 封装的增强型下拉选择组件，支持单选、多选、自定义选项、图标等功能</p>
      </div>
    </div>

    <div class="input-container">
      <div class="input-group">
        <h4>基础单选</h4>
        <CrystalSelect
          v-model="basicValue"
          :options="basicOptions"
          placeholder="请选择"
          clearable
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <div class="input-group">
        <h4>多选功能</h4>
        <CrystalSelect
          v-model="multipleValue"
          :options="basicOptions"
          placeholder="可多选"
          multiple
          collapse-tags
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <div class="input-group">
        <h4>图标支持</h4>
        <CrystalSelect
          v-model="iconValue"
          :options="iconOptions"
          placeholder="选择带图标的选项"
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <div class="input-group">
        <h4>带描述文本</h4>
        <CrystalSelect
          v-model="descValue"
          :options="descOptions"
          placeholder="选择带描述的选项"
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <div class="input-group">
        <h4>禁用状态</h4>
        <CrystalSelect
          v-model="disabledValue"
          :options="basicOptions"
          placeholder="禁用状态"
          disabled
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <div class="input-group">
        <h4>加载状态</h4>
        <CrystalSelect
          v-model="loadingValue"
          :options="[]"
          :loading="true"
          loading-text="正在加载..."
          placeholder="加载中"
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <div class="input-group">
        <h4>自定义选项渲染</h4>
        <CrystalSelect v-model="customValue" :options="customOptions" placeholder="选择用户" style="width: 100%">
          <template #option="{ option }">
            <div class="custom-option-content">
              <div class="custom-avatar">{{ option?.name?.charAt(0) || "?" }}</div>
              <div class="custom-info">
                <div class="custom-name">{{ option?.name || "" }}</div>
                <div class="custom-meta">{{ option?.role || "" }}</div>
              </div>
            </div>
          </template>
        </CrystalSelect>
      </div>

      <div class="input-group">
        <h4>颜色小圆标记</h4>
        <CrystalSelect v-model="colorDotValue" :options="colorDotOptions" placeholder="选择带颜色小圆的选项" style="width: 100%">
          <template #option="{ option }">
            <div class="color-dot-option" display="flex">
              <div class="color-dot" :style="{ backgroundColor: option.color }"></div>
              <span>{{ option.label }}</span>
            </div>
          </template>
        </CrystalSelect>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h3>CrystalSelect 组件文档</h3>

      <div class="doc-section">
        <h4>支持的属性</h4>
        <p>CrystalSelect 组件支持以下属性：</p>
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
        <p>CrystalSelect 组件支持以下事件：</p>
        <BasicTable
          :table-data="eventsTableData"
          :columns="eventsColumns"
          basic-height="300px"
          :border="true"
          :stripe="true"
          :show-pagination="false"
        />
      </div>

      <div class="doc-section">
        <h4>支持的方法</h4>
        <p>CrystalSelect 组件支持以下方法：</p>
        <BasicTable
          :table-data="methodsTableData"
          :columns="methodsColumns"
          basic-height="200px"
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
import { CrystalSelect } from "crystal-ui"
// import "crystal-ui/index.css"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 基础选项数据
const basicOptions = [
  { label: "选项一", value: "opt1" },
  { label: "选项二", value: "opt2" },
  { label: "选项三", value: "opt3" },
  { label: "禁用选项", value: "opt4", disabled: true },
  { label: "选项五", value: "opt5" }
]

// 带图标选项数据
const iconOptions = [
  { label: "警告", value: "warning", prefixIcon: "el-icon-warning", iconColor: "#e6a23c" },
  { label: "文档", value: "document", prefixIcon: "el-icon-document", iconColor: "#409eff" },
  { label: "用户", value: "user", prefixIcon: "el-icon-user", iconColor: "#67c23a" },
  { label: "时钟", value: "timer", prefixIcon: "el-icon-timer", iconColor: "#909399" },
  { label: "成功", value: "success", prefixIcon: "el-icon-circle-check", iconColor: "#67c23a" }
]

// 带描述选项数据
const descOptions = [
  { label: "基础版", value: "basic", description: "适合个人使用" },
  { label: "专业版", value: "pro", description: "适合团队协作" },
  { label: "企业版", value: "enterprise", description: "适合大型组织" }
]

// 自定义用户数据
const customOptions = [
  { name: "张三", role: "产品经理", value: "user1" },
  { name: "李四", role: "UI设计师", value: "user2" },
  { name: "王五", role: "前端开发", value: "user3" },
  { name: "赵六", role: "后端开发", value: "user4" }
]

// 带颜色小圆选项数据
const colorDotOptions = [
  { label: "成功状态", value: "success", color: "#67c23a" },
  { label: "警告状态", value: "warning", color: "#e6a23c" },
  { label: "危险状态", value: "danger", color: "#f56c6c" },
  { label: "信息状态", value: "info", color: "#409eff" },
  { label: "次要状态", value: "secondary", color: "#909399" },
  { label: "褐色状态", value: "brown", color: "#9d6942" }
]

// 响应式状态数据
const basicValue = ref("")
const multipleValue = ref<string[]>([])
const iconValue = ref("")
const descValue = ref("")
const disabledValue = ref("")
const loadingValue = ref("")
const customValue = ref("")
const colorDotValue = ref("")

// 属性表格数据
const propsTableData = ref([
  { prop: "modelValue / v-model", type: "string/array", default: "''", description: "绑定值" },
  { prop: "options", type: "array", default: "[]", description: "选项列表" },
  { prop: "placeholder", type: "string", default: "'请选择'", description: "占位文本" },
  { prop: "multiple", type: "boolean", default: "false", description: "是否多选" },
  { prop: "clearable", type: "boolean", default: "false", description: "是否可清除" },
  { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
  { prop: "loading", type: "boolean", default: "false", description: "是否加载中" },
  { prop: "loading-text", type: "string", default: "'加载中'", description: "加载文本" },
  { prop: "size", type: "string", default: "'default'", description: "尺寸，可选值为 large, default, small" },
  { prop: "collapse-tags", type: "boolean", default: "false", description: "多选时是否折叠标签" },
  { prop: "filterable", type: "boolean", default: "false", description: "是否可搜索" },
  { prop: "remote", type: "boolean", default: "false", description: "是否为远程搜索" },
  { prop: "remote-method", type: "Function", default: "-", description: "远程搜索方法" },
  { prop: "multiple-limit", type: "number", default: "0", description: "多选时最多选择的数量" },
  { prop: "no-data-text", type: "string", default: "'无数据'", description: "无数据时的文本" },
  { prop: "no-match-text", type: "string", default: "'无匹配数据'", description: "搜索无匹配时的文本" }
])

// 属性表格列配置
const propsColumns = ref([
  { prop: "prop", label: "属性名", width: 200 },
  { prop: "type", label: "类型", width: 200 },
  { prop: "default", label: "默认值", width: 120 },
  { prop: "description", label: "说明", minWidth: 300 }
])

// 事件表格数据
const eventsTableData = ref([
  { event: "change", description: "选中值发生变化时触发", params: "value: string|array" },
  { event: "visible-change", description: "下拉框出现/隐藏时触发", params: "visible: boolean" },
  { event: "remove-tag", description: "多选模式下移除标签时触发", params: "tag: object" },
  { event: "clear", description: "可清空模式下点击清空按钮时触发", params: "-" },
  { event: "blur", description: "失去焦点时触发", params: "event: FocusEvent" },
  { event: "focus", description: "获得焦点时触发", params: "event: FocusEvent" }
])

// 事件表格列配置
const eventsColumns = ref([
  { prop: "event", label: "事件名", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 },
  { prop: "params", label: "回调参数", width: 200 }
])

// 方法表格数据
const methodsTableData = ref([
  { method: "focus", description: "使选择器获得焦点", params: "-" },
  { method: "blur", description: "使选择器失去焦点", params: "-" },
  { method: "clear", description: "清空选择器的值", params: "-" },
  { method: "filter", description: "手动过滤选项", params: "query: string" }
])

// 方法表格列配置
const methodsColumns = ref([
  { prop: "method", label: "方法名", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 },
  { prop: "params", label: "参数", width: 200 }
])
</script>

<style scoped lang="scss">
/* 页面布局样式 */
.flex-column-page-wrap {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.pageWrap {
  background-color: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 40px);
}

/* 页面标题 */
h3 {
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
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

/* 示例容器 */
.input-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 40px 0;
  width: 100%;
  padding: 0;
}

/* 示例组样式 */
.input-group {
  width: calc(50% - 12px);
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

/* 自定义选项样式 */
.custom-option-content {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.custom-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: -35px;
  font-weight: 500;
}

.custom-info {
  flex: 1;
}

.custom-name {
  font-weight: 500;
  color: #303133;
}

.custom-meta {
  font-size: 12px;
  color: #909399;
}

:deep(.custom-meta) {
  font-size: 12px;
  color: #909399;
}

.color-dot-option {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

/* 组件文档样式 */
.component-docs {
  margin: 40px 0;
  width: 100%;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.doc-section {
  margin-bottom: 30px;
}

.doc-section h4 {
  color: #606266;
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.doc-section p {
  color: #909399;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
