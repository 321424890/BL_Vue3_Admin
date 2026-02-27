<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalInput 组件</h1>
        <p class="page-description">基于 Element Plus CrystalInput 封装的增强型输入组件，支持所有 CrystalInput 属性和扩展功能</p>
      </div>
    </div>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>基本用法</h4>
          <CrystalInput v-model="text1" placeholder="请输入内容" @input="handleInput" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带前缀图标</h4>
          <CrystalInput v-model="text2" placeholder="搜索" :prefix-icon="Search" clearable @focus="handleFocus"> </CrystalInput>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带后缀图标</h4>
          <CrystalInput v-model="text3" :suffix-icon="Calendar" placeholder="请输入内容"> </CrystalInput>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>不同尺寸</h4>
          <CrystalInput v-model="text4" placeholder="小尺寸" size="small" style="margin-right: 20px" />
          <CrystalInput v-model="text5" placeholder="中尺寸" size="default" style="margin-right: 20px" />
          <BLInpCrystalInputut v-model="text6" placeholder="大尺寸" size="large" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>禁用状态</h4>
          <CrystalInput v-model="text7" placeholder="禁用输入" disabled />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>只读状态</h4>
          <CrystalInput v-model="text8" placeholder="只读输入" readonly value="这是只读内容" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带清空按钮</h4>
          <CrystalInput v-model="text9" placeholder="可清空内容" clearable />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>显示字数统计</h4>
          <CrystalInput v-model="text10" placeholder="请输入内容" show-word-limit maxlength="50" type="textarea" rows="3" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>密码框</h4>
          <CrystalInput v-model="text11" placeholder="请输入密码" show-password />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带前置内容</h4>
          <CrystalInput v-model="text12" placeholder="请输入内容">
            <template #prepend>https://</template>
          </CrystalInput>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带后置内容</h4>
          <CrystalInput v-model="text13" placeholder="请输入端口号">
            <template #append>端口</template>
          </CrystalInput>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>数字输入</h4>
          <CrystalInput v-model="text14" placeholder="请输入数字" type="number" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>绑定所有事件</h4>
          <CrystalInput
            v-model="eventText"
            placeholder="请输入内容"
            @input="handleAllEvents('input', $event)"
            @change="handleAllEvents('change', $event)"
            @focus="handleAllEvents('focus', $event)"
            @blur="handleAllEvents('blur', $event)"
            @clear="handleAllEvents('clear', $event)"
            @keyup.enter="handleAllEvents('keyup.enter', $event)"
            @click="handleClick"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义边框颜色和阴影效果</h4>
          <div class="flex flex-wrap gap-4">
            <div>
              <p style="margin-bottom: 8px; font-size: 14px; color: #606266">默认蓝色</p>
              <CrystalInput v-model="borderColor1" placeholder="默认蓝色边框" />
            </div>
            <div>
              <p style="margin-bottom: 8px; font-size: 14px; color: #606266">红色</p>
              <CrystalInput v-model="borderColor2" placeholder="红色边框" border-theme-color="#ff4d4f" />
            </div>
            <div>
              <p style="margin-bottom: 8px; font-size: 14px; color: #606266">绿色</p>
              <CrystalInput v-model="borderColor3" placeholder="绿色边框" border-theme-color="#389e0d" />
            </div>
            <div>
              <p style="margin-bottom: 8px; font-size: 14px; color: #606266">橙色</p>
              <CrystalInput v-model="borderColor4" placeholder="橙色边框" border-theme-color="#faad14" />
            </div>
          </div>
          <p style="margin-top: 16px; font-size: 14px; color: #606266">
            提示：鼠标经过输入框时会显示阴影效果，点击输入框获得焦点时阴影效果会更加明显
          </p>
        </div>
      </el-col>
    </el-row>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h3>CrystalInput 组件文档</h3>

      <div class="doc-section">
        <h4>支持的属性</h4>
        <p>CrystalInput 组件支持 Element Plus ElInput 的所有属性：</p>
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
        <p>CrystalInput 组件支持 Element Plus ElInput 的所有事件：</p>
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
        <h4>支持的插槽</h4>
        <BasicTable
          :table-data="slotsTableData"
          :columns="slotsColumns"
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
// import CrystalInput from "@/components/BasicInput/input/index.vue"
import { CrystalInput, CrystalIcon } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { Calendar, Search } from "@element-plus/icons-vue"
// 属性表格数据
const propsTableData = ref([
  { prop: "modelValue / v-model", type: "string / number / boolean", default: "''", description: "绑定值" },
  { prop: "placeholder", type: "string", default: "''", description: "占位符" },
  { prop: "type", type: "string", default: "'text'", description: "输入框类型" },
  { prop: "size", type: "string", default: "default", description: "输入框尺寸" },
  { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
  { prop: "readonly", type: "boolean", default: "false", description: "是否只读" },
  { prop: "clearable", type: "boolean", default: "false", description: "是否可清空" },
  { prop: "maxlength", type: "number", default: "-", description: "最大输入长度" },
  { prop: "minlength", type: "number", default: "-", description: "最小输入长度" },
  { prop: "show-word-limit", type: "boolean", default: "false", description: "是否显示字数统计" },
  { prop: "show-password", type: "boolean", default: "false", description: "是否显示密码切换按钮" },
  { prop: "prefix-icon", type: "string / Component", default: "-", description: "前缀图标" },
  { prop: "suffix-icon", type: "string / Component", default: "-", description: "后缀图标" },
  {
    prop: "border-theme-color",
    type: "string",
    default: "'#409eff'",
    description: "自定义边框颜色，同时影响鼠标经过和聚焦时的阴影效果"
  }
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
  { event: "input", description: "输入时触发", params: "value: string / number" },
  { event: "change", description: "失去焦点或按下回车时触发", params: "value: string / number" },
  { event: "focus", description: "获得焦点时触发", params: "event: FocusEvent" },
  { event: "blur", description: "失去焦点时触发", params: "event: FocusEvent" },
  { event: "clear", description: "点击清空按钮时触发", params: "-" },
  { event: "keyup.enter", description: "按下回车键时触发", params: "event: KeyboardEvent" },
  { event: "click", description: "点击输入框时触发", params: "event: MouseEvent" }
])

// 事件表格列配置
const eventsColumns = ref([
  { prop: "event", label: "事件名", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 },
  { prop: "params", label: "回调参数", width: 200 }
])

// 插槽表格数据
const slotsTableData = ref([
  { slot: "prefix", description: "输入框头部内容" },
  { slot: "suffix", description: "输入框尾部内容" },
  { slot: "prepend", description: "输入框前置内容" },
  { slot: "append", description: "输入框后置内容" }
])

// 插槽表格列配置
const slotsColumns = ref([
  { prop: "slot", label: "插槽名", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 }
])
function handleInput(value: string | number) {
  console.log("输入值:", value)
}
// 不同类型的输入值
const text1 = ref("")
const text2 = ref("")
const text3 = ref("")
const text4 = ref("")
const text5 = ref("")
const text6 = ref("")
const text7 = ref("")
const text8 = ref("这是只读内容")
const text9 = ref("可清空的内容")
const text10 = ref("")
const text11 = ref("")
const text12 = ref("")
const text13 = ref("")
const text14 = ref("")
const eventText = ref("")
const borderColor1 = ref("")
const borderColor2 = ref("")
const borderColor3 = ref("")
const borderColor4 = ref("")

// 事件处理
function handleFocus() {
  console.log("输入框获得焦点了")
}

// 处理所有事件的函数
function handleAllEvents(eventName: string, params: any) {
  console.log(`事件 ${eventName} 触发了:`, params)
}

// 点击事件处理函数
function handleClick() {
  console.log("输入框被点击了")
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

/* 现代row布局实现 */
.el-row {
  margin: 40px 0;
  width: 100%;
}

.input-group {
  margin-bottom: 24px;
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

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-4 {
  gap: 16px;
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
