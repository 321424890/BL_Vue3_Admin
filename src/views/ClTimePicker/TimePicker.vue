<template>
  <div class="timepicker-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalTimePicker 组件</h1>
      <p class="demo-description">基于 Element Plus 封装的增强型时间选择器组件，支持更多配置和优化功能</p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <el-row :gutter="24">
          <!-- 示例1: 基础用法 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">基础用法</h4>
              <p class="card-desc">最基础的时间选择功能</p>
              <CrystalTimePicker v-model="time1" />
              <div class="value-display">选择的值: {{ time1 }}</div>
            </div>
          </el-col>

          <!-- 示例2: 自定义前缀图标 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">自定义前缀图标</h4>
              <p class="card-desc">自定义时间选择器的前缀图标</p>
              <CrystalTimePicker v-model="time2" prefix-icon="Clock" />
              <div class="value-display">选择的值: {{ time2 }}</div>
            </div>
          </el-col>

          <!-- 示例3: 禁用状态 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">禁用状态</h4>
              <p class="card-desc">禁用时间选择器</p>
              <CrystalTimePicker v-model="time3" disabled />
              <div class="value-display">选择的值: {{ time3 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">高级功能</h3>
        <el-row :gutter="24">
          <!-- 示例4: 不同尺寸 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">不同尺寸</h4>
              <p class="card-desc">支持大、中、小三种尺寸</p>
              <div class="size-demo">
                <CrystalTimePicker v-model="time4" size="large" style="margin-right: 10px" />
                <CrystalTimePicker v-model="time5" size="default" style="margin-right: 10px" />
                <CrystalTimePicker v-model="time6" size="small" />
              </div>
              <div class="value-display">选择的值: {{ time4 }} / {{ time5 }} / {{ time6 }}</div>
            </div>
          </el-col>

          <!-- 示例5: 自定义后缀图标 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">自定义后缀图标</h4>
              <p class="card-desc">自定义时间选择器的后缀图标</p>
              <CrystalTimePicker v-model="time7" suffix-icon="Calendar" />
              <div class="value-display">选择的值: {{ time7 }}</div>
            </div>
          </el-col>

          <!-- 示例6: 自定义清除图标 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">自定义清除图标</h4>
              <p class="card-desc">自定义时间选择器的清除图标</p>
              <CrystalTimePicker v-model="time8" clearable prefix-icon="Clock" clear-icon="Delete" />
              <div class="value-display">选择的值: {{ time8 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">特殊配置</h3>
        <el-row :gutter="24">
          <!-- 示例7: 禁用清除和编辑 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">禁用清除和编辑</h4>
              <p class="card-desc">禁用清除按钮和输入框编辑</p>
              <CrystalTimePicker v-model="time9" :clearable="false" :editable="false" />
              <div class="value-display">选择的值: {{ time9 }}</div>
            </div>
          </el-col>

          <!-- 示例8: 时间范围选择 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">时间范围选择</h4>
              <p class="card-desc">选择开始和结束时间</p>
              <CrystalTimePicker
                v-model="value7777"
                is-range
                range-separator="To"
                start-placeholder="Start time"
                end-placeholder="End time"
              />
              <div class="value-display">选择的值: {{ value7777 }}</div>
            </div>
          </el-col>

          <!-- 示例9: 箭头控制时间 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">箭头控制时间</h4>
              <p class="card-desc">使用箭头控制时间选择</p>
              <CrystalTimePicker v-model="time10" arrow-control />
              <div class="value-display">选择的值: {{ time10 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">事件监听</h3>
        <el-row :gutter="24">
          <!-- 示例10: 事件监听 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="demo-card">
              <h4 class="card-title">事件监听</h4>
              <p class="card-desc">监听组件的各种事件</p>
              <CrystalTimePicker
                v-model="time11"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
                @clear="handleClear"
                @visible-change="handleVisibleChange"
                @input="handleInput"
              />
              <div class="value-display">选择的值: {{ time11 }}</div>
              <div class="event-log">
                <h5>事件日志</h5>
                <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                  {{ log }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalTimePicker 组件文档</h2>

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
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import { CrystalTimePicker } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
const value7777 = ref<[Date, Date]>([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])

const time1 = ref("")
const time2 = ref("")
const time3 = ref("")
const time4 = ref("")
const time5 = ref("")
const time6 = ref("")
const time7 = ref("")
const time8 = ref(new Date(2016, 9, 10, 18, 30))
const time9 = ref("")
const time10 = ref("")
const time11 = ref("")

const eventLogs = ref<string[]>([])
// 撒旦撒
// 事件处理
const handleChange = (value: any) => {
  eventLogs.value.push(`change: ${value}`)
  ElMessage.success(`选择时间：${value}`)
}

const handleFocus = (event: FocusEvent) => {
  eventLogs.value.push("focus: 获得焦点")
}

const handleBlur = (event: FocusEvent) => {
  eventLogs.value.push("blur: 失去焦点")
}

const handleClear = () => {
  eventLogs.value.push("clear: 清除时间")
  ElMessage.info("清除时间")
}

const handleVisibleChange = (visible: boolean) => {
  eventLogs.value.push(`visible-change: ${visible ? "显示" : "隐藏"}`)
}

const handleInput = (value: string) => {
  eventLogs.value.push(`input: ${value}`)
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
  {
    name: "modelValue / v-model",
    description: "绑定值",
    type: "string / number / [string / number, string / number]",
    default: "undefined"
  },
  {
    name: "placeholder",
    description: "占位符",
    type: "string",
    default: "请选择时间"
  },
  {
    name: "disabled",
    description: "是否禁用",
    type: "boolean / string",
    default: "false"
  },
  {
    name: "editable",
    description: "是否可编辑",
    type: "boolean / string",
    default: "true"
  },
  {
    name: "clearable",
    description: "是否可清除",
    type: "boolean / string",
    default: "true"
  },
  {
    name: "size",
    description: "尺寸",
    type: '"large" / "default" / "small"',
    default: '"default"'
  },
  {
    name: "prefix-icon",
    description: "前缀图标",
    type: "any",
    default: "undefined"
  },
  {
    name: "suffix-icon",
    description: "后缀图标",
    type: "any",
    default: "undefined"
  },
  {
    name: "clear-icon",
    description: "清除图标",
    type: "any",
    default: "undefined"
  },
  {
    name: "validate-event",
    description: "校验事件",
    type: "boolean",
    default: "true"
  },
  {
    name: "popper-class",
    description: "弹出层类名",
    type: "string",
    default: '""'
  },
  {
    name: "teleported",
    description: "是否使用 teleport",
    type: "boolean",
    default: "true"
  },
  {
    name: "id",
    description: "原生属性",
    type: "string",
    default: "undefined"
  },
  {
    name: "name",
    description: "原生属性",
    type: "string",
    default: "undefined"
  },
  {
    name: "readonly",
    description: "是否只读",
    type: "boolean",
    default: "false"
  },
  {
    name: "validate-trigger",
    description: "校验触发方式",
    type: "string / array",
    default: "undefined"
  },
  {
    name: "is-range",
    description: "是否为时间范围选择器",
    type: "boolean",
    default: "false"
  },
  {
    name: "arrow-control",
    description: "是否使用箭头控制时间",
    type: "boolean",
    default: "false"
  },
  {
    name: "range-separator",
    description: "范围分隔符",
    type: "string",
    default: '"-"'
  },
  {
    name: "start-placeholder",
    description: "范围选择器开始时间占位符",
    type: "string",
    default: "undefined"
  },
  {
    name: "end-placeholder",
    description: "范围选择器结束时间占位符",
    type: "string",
    default: "undefined"
  },
  {
    name: "tabindex",
    description: "原生 tabindex 属性",
    type: "number",
    default: "undefined"
  },
  {
    name: "autocomplete",
    description: "原生 autocomplete 属性",
    type: "string",
    default: '"off"'
  },
  {
    name: "autofocus",
    description: "自动聚焦",
    type: "boolean",
    default: "false"
  }
]

// 事件表格列配置
const eventColumns = [
  { prop: "name", label: "事件名", width: "200" },
  { prop: "description", label: "说明" },
  { prop: "parameters", label: "回调参数", width: "200" }
]

// 事件表格数据
const eventData = [
  {
    name: "update:modelValue",
    description: "绑定值变化时触发",
    parameters: "新值"
  },
  { name: "change", description: "选择时间时触发", parameters: "新值" },
  { name: "blur", description: "失去焦点时触发", parameters: "事件对象" },
  { name: "focus", description: "获得焦点时触发", parameters: "事件对象" },
  { name: "clear", description: "清除时间时触发", parameters: "-" },
  {
    name: "visible-change",
    description: "下拉框显示/隐藏时触发",
    parameters: "显示状态"
  },
  { name: "input", description: "输入时触发", parameters: "输入值" },
  { name: "keydown", description: "按键按下时触发", parameters: "键盘事件" },
  { name: "keyup", description: "按键抬起时触发", parameters: "键盘事件" },
  {
    name: "keypress",
    description: "按键按下并释放时触发",
    parameters: "键盘事件"
  },
  { name: "paste", description: "粘贴时触发", parameters: "粘贴事件" },
  { name: "copy", description: "复制时触发", parameters: "复制事件" },
  { name: "cut", description: "剪切时触发", parameters: "剪切事件" },
  {
    name: "compositionstart",
    description: "开始输入中文时触发",
    parameters: "事件对象"
  },
  {
    name: "compositionupdate",
    description: "中文输入过程中触发",
    parameters: "事件对象"
  },
  {
    name: "compositionend",
    description: "中文输入结束时触发",
    parameters: "事件对象"
  }
]
</script>

<style scoped>
.timepicker-demo-container {
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

.size-demo {
  display: flex;
  align-items: center;
}

.value-display {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  word-break: break-all;
}

.event-log {
  margin-top: 15px;
  padding: 12px;
  background-color: #f0f2f5;
  border-radius: 4px;
  max-height: 150px;
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

.component-docs {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
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
