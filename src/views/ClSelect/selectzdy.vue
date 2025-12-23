<template>
  <div class="crystal-select-complete-demo">
    <div class="demo-header">
      <h1 class="page-title">CrystalSelect 组件</h1>
      <p class="page-description">基于 Element Plus 封装的增强型下拉选择组件，支持单选、多选、自定义选项、图标等功能</p>
    </div>

    <el-row :gutter="24">
      <!-- 1. 基础选择器 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="demo-card">
          <h3>基础选择</h3>
          <p class="demo-desc">标准的单选下拉选择器</p>
          <CrystalSelect
            v-model="basicValue"
            :options="basicOptions"
            placeholder="请选择"
            clearable
            style="width: 100%"
          ></CrystalSelect>
        </div>
      </el-col>

      <!-- 2. 带图标的选项 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="demo-card">
          <h3>图标支持</h3>
          <p class="demo-desc">选项前显示提示图标</p>
          <CrystalSelect
            v-model="iconValue"
            :options="iconOptions"
            placeholder="选择带图标的选项"
            style="width: 100%"
          ></CrystalSelect>
        </div>
      </el-col>

      <!-- 3. 多选模式 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="demo-card">
          <h3>多选功能</h3>
          <p class="demo-desc">可选择多个选项并以标签形式显示</p>
          <CrystalSelect
            v-model="multipleValue"
            :options="basicOptions"
            placeholder="可多选"
            multiple
            collapse-tags
            style="width: 100%"
          ></CrystalSelect>
        </div>
      </el-col>

      <!-- 4. 带描述的选项 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="demo-card">
          <h3>描述文本</h3>
          <p class="demo-desc">为选项添加详细描述信息</p>
          <CrystalSelect
            v-model="descValue"
            :options="descOptions"
            placeholder="选择带描述的选项"
            style="width: 100%"
          ></CrystalSelect>
        </div>
      </el-col>

      <!-- 5. 自定义选项内容 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="demo-card">
          <h3>自定义选项渲染</h3>
          <p class="demo-desc">使用插槽完全自定义选项外观</p>
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
      </el-col>
      <!-- 6. 空状态自定义 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="demo-card">
          <h3>空状态与加载状态</h3>
          <p class="demo-desc">自定义无数据时的显示内容</p>
          <CrystalSelect
            v-model="emptyValue"
            :options="emptyOptions"
            :loading="isLoading"
            loading-text="正在加载..."
            placeholder="暂无选项"
            style="width: 100%"
          >
            <template #empty>
              <div class="empty-content">
                <span class="empty-icon">📭</span>
                <span>暂无可用选项</span>
                <el-button size="small" @click="loadData">加载数据</el-button>
              </div>
            </template>
          </CrystalSelect>
        </div>
      </el-col>
      <!-- 7. 带颜色小圆的选项 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="demo-card">
          <h3>颜色小圆标记</h3>
          <p class="demo-desc">选项前显示带颜色的小圆标记</p>
          <CrystalSelect
            v-model="colorDotValue"
            :options="colorDotOptions"
            placeholder="选择带颜色小圆的选项"
            style="width: 100%"
          >
            <template #option="{ option }">
              <div class="color-dot-option">
                <div class="color-dot" :style="{ backgroundColor: option.color }"></div>
                <span>{{ option.label }}</span>
              </div>
            </template>
          </CrystalSelect>
        </div>
      </el-col>
    </el-row>

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
// import CrystalSelect from "@/components/CrystalSelect/index.vue"
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
// 图标支持选项
const iconOptions = [
  { label: "警告", value: "warning", prefixIcon: "el-icon-warning", iconColor: "#e6a23c" },
  { label: "文档", value: "document", prefixIcon: "el-icon-document", iconColor: "#409eff" },
  { label: "用户", value: "user", prefixIcon: "el-icon-user", iconColor: "#67c23a" },
  { label: "时钟", value: "timer", prefixIcon: "el-icon-timer", iconColor: "#909399" },
  { label: "成功", value: "success", prefixIcon: "el-icon-circle-check", iconColor: "#67c23a" },
  { label: "警告提示", value: "warning-brown", prefixIcon: "el-icon-circle-close", iconColor: "#9d6942" }
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
const emptyValue = ref("")
const emptyOptions = ref([])
const isLoading = ref(false)

// 模拟加载数据函数
const loadData = () => {
  isLoading.value = true
  setTimeout(() => {
    emptyOptions.value = [
      { label: "新加载的选项1", value: "new1" },
      { label: "新加载的选项2", value: "new2" }
    ]
    isLoading.value = false
  }, 1500)
}
</script>

<style scoped>
.crystal-select-complete-demo {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.page-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 10px;
  font-weight: 600;
}

.page-description {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.demo-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  width: 100%;
}

.demo-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.demo-card h3 {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 10px;
}

.demo-desc {
  color: #606266;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.4;
}

/* 自定义选项样式 */
.custom-option-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* 空状态样式 */
.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.empty-icon {
  font-size: 48px;
}

/* 颜色小圆样式 */
.color-dot-option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

/* 组件文档样式 */
.component-docs {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.component-docs h3 {
  font-size: 24px;
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.doc-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.doc-section h4 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 15px;
  font-weight: 600;
}

.doc-section p {
  color: #606266;
  margin-bottom: 20px;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .crystal-select-complete-demo {
    padding: 10px;
  }

  .demo-header {
    padding: 15px 10px;
  }

  .page-title {
    font-size: 24px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .demo-card {
    padding: 16px;
  }

  .component-docs {
    padding: 15px;
  }

  .doc-section {
    padding: 15px;
  }
}
</style>
