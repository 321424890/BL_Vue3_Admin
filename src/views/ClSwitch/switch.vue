<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalSwitch 开关组件</h1>
        <p class="page-description">
          基于 Element Plus 的 el-switch
          组件封装的开关组件，提供了自定义颜色、文字描述、图标等增强功能，同时保持了原组件的所有基本功能由于组件内部使用了
          `v-bind="$attrs"`，因此支持 Element Plus Switch 组件的所有原生属性和功能：
        </p>
      </div>
    </div>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>基础开关</h4>
          <CrystalSwitch v-model="value1" />
          <div class="value-display">当前值: {{ value1 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带边框的开关</h4>
          <CrystalSwitch v-model="value2" border />
          <div class="value-display">当前值: {{ value2 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义颜色</h4>
          <CrystalSwitch
            v-model="value3"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
          <div class="value-display">当前值: {{ value3 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义宽度</h4>
          <CrystalSwitch v-model="value4" width="60" />
          <div class="value-display">当前值: {{ value4 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>带文字描述</h4>
          <CrystalSwitch v-model="value5" active-text="开启" inactive-text="关闭" />
          <div class="value-display">当前值: {{ value5 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义值</h4>
          <CrystalSwitch v-model="value6" active-value="on" inactive-value="off" />
          <div class="value-display">当前值: {{ value6 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>禁用状态</h4>
          <CrystalSwitch v-model="value7" disabled />
          <div class="value-display">当前值: {{ value7 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>切换前回调</h4>
          <CrystalSwitch v-model="value8" :before-change="beforeChange" />
          <div class="value-display">当前值: {{ value8 }}</div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义图标</h4>
          <CrystalSwitch :active-icon="Check" :inactive-icon="Close" v-model="value9">
            <!-- <template #active-icon>
              <el-icon><Check /></el-icon>
            </template>
            <template #inactive-icon>
              <el-icon><Close /></el-icon>
            </template> -->
          </CrystalSwitch>
          <div class="value-display">当前值: {{ value9 }}</div>
        </div>
      </el-col>
    </el-row>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h3>CrystalSwitch 组件文档</h3>

      <div class="doc-section">
        <h4>支持的属性</h4>
        <BasicTable
          :table-data="propsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="600px"
        />
      </div>

      <div class="doc-section">
        <h4>支持的事件</h4>
        <BasicTable
          :table-data="eventsTableData"
          :columns="eventsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalSwitch } from "crystalplus-ui"
import { ElIcon, ElMessage } from "element-plus"
import { Check, Close } from "@element-plus/icons-vue"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 基础使用
const value1 = ref(false)
const value2 = ref(false)

// 自定义颜色
const value3 = ref(false)
const value4 = ref(false)

// 带文字描述
const value5 = ref(false)
const value6 = ref("off")

// 交互控制
const value7 = ref(false)
const value8 = ref(false)

const beforeChange = () => {
  ElMessage.warning("切换前回调触发，将停止切换")
  return false
}

// 自定义图标
const value9 = ref(false)

// 属性表格配置
const propsColumns = [
  {
    prop: "prop",
    label: "属性名",
    width: 150
  },
  {
    prop: "type",
    label: "类型",
    width: 150
  },
  {
    prop: "default",
    label: "默认值",
    width: 100
  },
  {
    prop: "required",
    label: "是否必填",
    width: 100
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 属性表格数据
const propsTableData = [
  {
    prop: "modelValue / v-model",
    type: "boolean / string / number",
    default: "false",
    required: false,
    description: "绑定值"
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否禁用"
  },
  {
    prop: "loading",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示加载中"
  },
  {
    prop: "size",
    type: "string",
    default: "default",
    required: false,
    description: "开关尺寸，可选值：default / small / large"
  },
  {
    prop: "width",
    type: "string / number",
    default: "40",
    required: false,
    description: "开关宽度"
  },
  {
    prop: "inlinePrompt",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否将文字显示在开关内部"
  },
  {
    prop: "activeActionIcon",
    type: "string / Component",
    default: "—",
    required: false,
    description: "自定义激活状态的操作图标"
  },
  {
    prop: "inactiveActionIcon",
    type: "string / Component",
    default: "—",
    required: false,
    description: "自定义非激活状态的操作图标"
  },
  {
    prop: "activeIcon",
    type: "string / Component",
    default: "—",
    required: false,
    description: "自定义激活状态图标"
  },
  {
    prop: "inactiveIcon",
    type: "string / Component",
    default: "—",
    required: false,
    description: "自定义非激活状态图标"
  },
  {
    prop: "activeText",
    type: "string",
    default: "—",
    required: false,
    description: "自定义激活状态文本"
  },
  {
    prop: "inactiveText",
    type: "string",
    default: "—",
    required: false,
    description: "自定义非激活状态文本"
  },
  {
    prop: "activeValue",
    type: "boolean / string / number",
    default: "true",
    required: false,
    description: "激活时的值"
  },
  {
    prop: "inactiveValue",
    type: "boolean / string / number",
    default: "false",
    required: false,
    description: "非激活时的值"
  },
  {
    prop: "name",
    type: "string",
    default: "—",
    required: false,
    description: "原生 name 属性"
  },
  {
    prop: "validateEvent",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否触发表单验证"
  },
  {
    prop: "beforeChange",
    type: "function",
    default: "—",
    required: false,
    description: "切换前的回调函数，返回 false 或 Promise 则停止切换"
  },
  {
    prop: "id",
    type: "string",
    default: "—",
    required: false,
    description: "原生 id 属性"
  },
  {
    prop: "tabindex",
    type: "string / number",
    default: "—",
    required: false,
    description: "原生 tabindex 属性"
  },
  {
    prop: "ariaLabel",
    type: "string",
    default: "—",
    required: false,
    description: "ARIA 标签"
  }
]

// 事件表格配置
const eventsColumns = [
  {
    prop: "event",
    label: "事件名",
    width: 150
  },
  {
    prop: "params",
    label: "回调参数",
    width: 200
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 事件表格数据
const eventsTableData = [
  {
    event: "update:model-value",
    description: "值改变时触发",
    params: "value: boolean / any"
  },
  {
    event: "change",
    description: "开关状态变化时触发",
    params: "value: boolean / any"
  }
]
</script>

<style scoped>
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

/* 示例组样式 */
.input-group {
  width: 100%;
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

.value-display {
  margin-top: 20px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
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
