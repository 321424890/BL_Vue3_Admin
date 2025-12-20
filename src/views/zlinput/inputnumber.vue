<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalInputNumber 组件</h1>
        <p class="page-description">
          基于 Element Plus CrystalInputNumber 封装的增强型数字输入组件，支持所有 CrystalInputNumber 属性和扩展功能
        </p>
      </div>
    </div>

    <div class="input-container">
      <div class="input-group">
        <h4>基本用法</h4>
        <CrystalInputNumber v-model="number1" :controls="false" placeholder="请输入数字" @change="handleChange" />
      </div>

      <div class="input-group">
        <h4>带范围限制</h4>
        <CrystalInputNumber v-model="number2" :min="1" :max="10" placeholder="1-10之间的数字" />
      </div>

      <div class="input-group">
        <h4>带步长</h4>
        <CrystalInputNumber v-model="number3" :step="0.5" placeholder="步长为0.5" />
      </div>

      <div class="input-group">
        <h4>不同尺寸</h4>
        <CrystalInputNumber v-model="number4" :min="0" :max="100" size="small" style="margin-right: 20px" />
        <CrystalInputNumber v-model="number5" :min="0" :max="100" size="default" style="margin-right: 20px" />
        <CrystalInputNumber v-model="number6" :min="0" :max="100" size="large" />
      </div>

      <div class="input-group">
        <h4>禁用状态</h4>
        <CrystalInputNumber v-model="number7" :min="0" :max="100" disabled />
      </div>

      <div class="input-group">
        <h4>只读状态</h4>
        <CrystalInputNumber v-model="number8" :min="0" :max="100" readonly />
      </div>

      <div class="input-group">
        <h4>无控制按钮</h4>
        <CrystalInputNumber v-model="number9" :min="0" :max="100" :controls="false" placeholder="只能手动输入" />
      </div>

      <div class="input-group">
        <h4>自定义范围提示</h4>
        <CrystalInputNumber
          v-model="number10"
          :min="0"
          :max="100"
          range-tip="数值必须在0-100之间"
          @range-exceed="handleRangeExceed"
        />
      </div>

      <div class="input-group">
        <h4>千分位分隔符</h4>
        <CrystalInputNumber v-model="number11" :min="0" :max="1000000" :precision="2" thousands />
      </div>

      <div class="input-group">
        <h4>绑定所有事件</h4>
        <CrystalInputNumber
          v-model="eventNumber"
          :min="0"
          :max="100"
          @input="handleAllEvents('input', $event)"
          @change="handleAllEvents('change', $event)"
          @focus="handleAllEvents('focus', $event)"
          @blur="handleAllEvents('blur', $event)"
          @increase="handleAllEvents('increase', $event)"
          @decrease="handleAllEvents('decrease', $event)"
          @range-exceed="handleAllEvents('range-exceed', $event)"
        />
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h3>CrystalInputNumber 组件文档</h3>

      <div class="doc-section">
        <h4>支持的属性</h4>
        <p>CrystalInputNumber 组件支持 Element Plus CrystalInputNumber 的所有属性：</p>
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
        <p>CrystalInputNumber 组件支持 Element Plus CrystalInputNumber 的所有事件：</p>
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
// import CrystalInputNumber from "@/components/CrystalInput/inputnumber/index.vue"
import { CrystalInputNumber } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 属性表格数据
const propsTableData = ref([
  { prop: "modelValue / v-model", type: "number", default: "0", description: "绑定值" },
  { prop: "min", type: "number", default: "-Infinity", description: "最小值" },
  { prop: "max", type: "number", default: "Infinity", description: "最大值" },
  { prop: "step", type: "number", default: "1", description: "步长" },
  { prop: "precision", type: "number", default: "-", description: "数值精度" },
  { prop: "size", type: "string", default: "default", description: "尺寸，可选值为 large, default, small" },
  { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
  { prop: "readonly", type: "boolean", default: "false", description: "是否只读" },
  { prop: "controls", type: "boolean", default: "true", description: "是否使用控制按钮" },
  { prop: "controls-position", type: "string", default: "-", description: "控制按钮位置，可选值为 right" },
  { prop: "rangeTip", type: "string", default: "''", description: "范围超出提示文本" },
  { prop: "thousands", type: "boolean", default: "false", description: "是否显示千分位分隔符" }
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
  { event: "input", description: "输入时触发", params: "value: number" },
  { event: "change", description: "值改变时触发", params: "value: number" },
  { event: "focus", description: "获得焦点时触发", params: "event: FocusEvent" },
  { event: "blur", description: "失去焦点时触发", params: "event: FocusEvent" },
  { event: "increase", description: "点击增加按钮时触发", params: "-" },
  { event: "decrease", description: "点击减少按钮时触发", params: "-" },
  { event: "range-exceed", description: "值超出范围时触发", params: 'value: number, direction: "min" | "max"' }
])

// 事件表格列配置
const eventsColumns = ref([
  { prop: "event", label: "事件名", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 },
  { prop: "params", label: "回调参数", width: 200 }
])

// 不同类型的输入值
const number1 = ref(0)
const number2 = ref(5)
const number3 = ref(0)
const number4 = ref(0)
const number5 = ref(0)
const number6 = ref(0)
const number7 = ref(5)
const number8 = ref(10)
const number9 = ref(0)
const number10 = ref(0)
const number11 = ref(123456.78)
const eventNumber = ref(0)

// 事件处理
function handleChange(value: number) {
  console.log("值改变了:", value)
}

// 处理范围超出事件
function handleRangeExceed(value: number, direction: "min" | "max") {
  console.log(`值 ${value} 超出了${direction === "min" ? "最小值" : "最大值"}限制`)
}

// 处理所有事件的函数
function handleAllEvents(eventName: string, params: any) {
  console.log(`事件 ${eventName} 触发了:`, params)
}
</script>

<style scoped lang="scss">
/* 你可以根据需要写样式 */
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

/* 调整为每行显示两个输入组，自然排列 */
.input-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 40px 0;
  width: 100%;
  padding: 0;
}

.input-group {
  width: calc(50% - 12px); /* 调整宽度以适应更好的间距 */
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

.input-group > .el-input {
  width: 100%;
  max-width: 350px;
}

.input-group > .el-input + .el-input {
  margin-top: 15px;
}

.el-input {
  margin-bottom: 10px;
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
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.6;
}

/* BasicTable 组件样式调整 */
.doc-section :deep(.table-container) {
  margin-bottom: 20px;
}

.doc-section :deep(.el-card) {
  border: 1px solid #ebeef5;
  box-shadow: none;
  margin-bottom: 0;
}

.doc-section :deep(.el-table) {
  width: 100%;
}

.doc-section :deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa;
  color: #303133;
  font-weight: 600;
}

.doc-section :deep(.el-table__body-wrapper tr:nth-child(even)) {
  background-color: #fafafa;
}

.doc-section :deep(.el-table__body-wrapper tr:hover) {
  background-color: #f5f7fa;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .input-group {
    width: 100%;
  }

  .doc-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
