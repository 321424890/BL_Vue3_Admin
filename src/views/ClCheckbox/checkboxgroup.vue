<template>
  <div class="datepicker-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalCheckboxGroup 组件示例</h1>
      <p class="demo-description">基于 Element Plus 扩展的复选框组组件，提供丰富的自定义样式和灵活的使用方式</p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <!-- 基础使用示例 -->
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-grid">
          <!-- 示例1: 使用 options 数组生成选项 -->
          <div class="demo-card">
            <h4 class="card-title">基础选项数组</h4>
            <p class="card-desc">通过 options 数组自动生成复选框组</p>
            <CrystalCheckboxGroup v-model="basicSelectedValues" :options="basicOptions" />
            <div class="value-display">选中的值: {{ basicSelectedValues }}</div>
          </div>

          <!-- 示例2: 使用插槽自定义选项 -->
          <div class="demo-card">
            <h4 class="card-title">自定义插槽内容</h4>
            <p class="card-desc">通过插槽方式自定义复选框内容</p>
            <CrystalCheckboxGroup v-model="slotSelectedValues">
              <el-checkbox label="Option A">选项 A (自定义标签)</el-checkbox>
              <el-checkbox label="Option B" disabled>选项 B (禁用)</el-checkbox>
              <el-checkbox label="Option C">选项 C (自定义标签)</el-checkbox>
            </CrystalCheckboxGroup>
            <div class="value-display">选中的值: {{ slotSelectedValues }}</div>
          </div>
        </div>
      </div>

      <!-- 自定义样式示例 -->
      <div class="demo-section">
        <h3 class="section-title">自定义样式</h3>
        <div class="demo-grid">
          <!-- 示例3: 自定义颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义颜色</h4>
            <p class="card-desc">设置复选框组的各种颜色属性</p>
            <CrystalCheckboxGroup
              v-model="colorSelectedValues"
              :options="colorOptions"
              checkbox-color="#67c23a"
              border-color="#dcdfe6"
              font-color="#303133"
            />
            <div class="value-display">选中的值: {{ colorSelectedValues }}</div>
          </div>

          <!-- 示例4: 边框样式 -->
          <div class="demo-card">
            <h4 class="card-title">边框样式</h4>
            <p class="card-desc">显示带有边框的复选框</p>
            <CrystalCheckboxGroup v-model="borderSelectedValues" :options="borderOptions" border size="small" />
            <div class="value-display">选中的值: {{ borderSelectedValues }}</div>
          </div>
        </div>
      </div>

      <!-- 高级功能示例 -->
      <div class="demo-section">
        <h3 class="section-title">高级功能</h3>
        <div class="demo-grid">
          <!-- 示例5: 选择限制 -->
          <div class="demo-card">
            <h4 class="card-title">选择限制</h4>
            <p class="card-desc">限制最少选择1项，最多选择2项</p>
            <CrystalCheckboxGroup v-model="limitSelectedValues" :options="limitOptions" :min="1" :max="2" />
            <div class="value-display">选中的值: {{ limitSelectedValues }}</div>
          </div>

          <!-- 示例6: 垂直排列 -->
          <div class="demo-card">
            <h4 class="card-title">垂直排列</h4>
            <p class="card-desc">选项垂直排列展示</p>
            <CrystalCheckboxGroup v-model="verticalSelectedValues" :options="verticalOptions" direction="vertical" />
            <div class="value-display">选中的值: {{ verticalSelectedValues }}</div>
          </div>
        </div>
      </div>

      <!-- 交互功能示例 -->
      <div class="demo-section">
        <h3 class="section-title">交互功能</h3>
        <div class="demo-grid">
          <!-- 示例7: 高亮效果 -->
          <div class="demo-card">
            <h4 class="card-title">高亮效果</h4>
            <p class="card-desc">启用高亮和自定义悬停颜色</p>
            <CrystalCheckboxGroup
              v-model="highlightSelectedValues"
              :options="highlightOptions"
              highlight
              highlight-color="#409eff"
              hover-color="#67c23a"
            />
            <div class="value-display">选中的值: {{ highlightSelectedValues }}</div>
          </div>

          <!-- 示例8: beforeChange 钩子 -->
          <div class="demo-card">
            <h4 class="card-title">beforeChange 钩子</h4>
            <p class="card-desc">使用钩子函数控制选择行为</p>
            <CrystalCheckboxGroup v-model="hookSelectedValues" :options="hookOptions" :before-change="handleBeforeChange" />
            <div class="value-display">选中的值: {{ hookSelectedValues }}</div>
            <div class="message-tip">提示: 最多只能选择2个选项</div>
          </div>
        </div>
      </div>

      <!-- 事件监听示例 -->
      <div class="demo-section">
        <h3 class="section-title">事件监听</h3>
        <div class="demo-grid">
          <!-- 示例9: 监听值变化 -->
          <div class="demo-card">
            <h4 class="card-title">值变化事件</h4>
            <p class="card-desc">监听 change 事件，展示选择统计</p>
            <CrystalCheckboxGroup v-model="eventSelectedValues" :options="eventOptions" @change="handleChange" />
            <div class="value-display">选中的值: {{ eventSelectedValues }}</div>
            <div class="change-info">{{ changeMessage }}</div>
          </div>

          <!-- 示例10: 组合使用 -->
          <div class="demo-card">
            <h4 class="card-title">组合功能</h4>
            <p class="card-desc">同时使用多种功能特性</p>
            <CrystalCheckboxGroup
              v-model="comboSelectedValues"
              :options="comboOptions"
              border
              size="large"
              checkbox-color="#e6a23c"
              font-color="#606266"
              highlight
              highlight-color="#f56c6c"
              @change="handleComboChange"
            />
            <div class="value-display">选中的值: {{ comboSelectedValues }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档区域 -->
    <div class="component-docs">
      <h2>CrystalCheckboxGroup 组件文档</h2>

      <div class="doc-section">
        <h3>支持的属性</h3>
        <BasicTable
          :table-data="propsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的事件</h3>
        <BasicTable
          :table-data="eventsTableData"
          :columns="eventsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="200px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import { CrystalCheckboxGroup } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 基础示例数据
const basicSelectedValues = ref(["Option 1", "Option 3"])
const basicOptions = [
  { label: "选项1", value: "Option 1" },
  { label: "选项2", value: "Option 2" },
  { label: "选项3", value: "Option 3", disabled: true }
]

// 插槽示例数据
const slotSelectedValues = ref(["Option A"])

// 自定义颜色示例数据
const colorSelectedValues = ref(["Color 1"])
const colorOptions = [
  { label: "绿色主题选项1", value: "Color 1" },
  { label: "绿色主题选项2", value: "Color 2" },
  { label: "绿色主题选项3", value: "Color 3" }
]

// 边框样式示例数据
const borderSelectedValues = ref(["Border 1"])
const borderOptions = [
  { label: "边框选项1", value: "Border 1" },
  { label: "边框选项2", value: "Border 2" },
  { label: "边框选项3", value: "Border 3" }
]

// 选择限制示例数据
const limitSelectedValues = ref(["Limit 1", "Limit 2"])
const limitOptions = [
  { label: "限制选项1", value: "Limit 1" },
  { label: "限制选项2", value: "Limit 2" },
  { label: "限制选项3", value: "Limit 3" },
  { label: "限制选项4", value: "Limit 4" }
]

// 垂直排列示例数据
const verticalSelectedValues = ref(["Vertical 1"])
const verticalOptions = [
  { label: "垂直选项1", value: "Vertical 1" },
  { label: "垂直选项2", value: "Vertical 2" },
  { label: "垂直选项3", value: "Vertical 3" },
  { label: "垂直选项4", value: "Vertical 4" }
]

// 高亮效果示例数据
const highlightSelectedValues = ref(["Highlight 1"])
const highlightOptions = [
  { label: "高亮选项1", value: "Highlight 1" },
  { label: "高亮选项2", value: "Highlight 2" },
  { label: "高亮选项3", value: "Highlight 3" }
]

// beforeChange 钩子示例数据
const hookSelectedValues = ref(["Hook 1"])
const hookOptions = [
  { label: "钩子选项1", value: "Hook 1" },
  { label: "钩子选项2", value: "Hook 2" },
  { label: "钩子选项3", value: "Hook 3" },
  { label: "钩子选项4", value: "Hook 4" }
]

// 事件监听示例数据
const eventSelectedValues = ref(["Event 1"])
const eventOptions = [
  { label: "事件选项1", value: "Event 1" },
  { label: "事件选项2", value: "Event 2" },
  { label: "事件选项3", value: "Event 3" }
]
const changeMessage = ref("等待选择变化...")

// 组合功能示例数据
const comboSelectedValues = ref(["Combo 1"])
const comboOptions = [
  { label: "组合选项1", value: "Combo 1" },
  { label: "组合选项2", value: "Combo 2" },
  { label: "组合选项3", value: "Combo 3" },
  { label: "组合选项4", value: "Combo 4", disabled: true }
]

// 钩子函数
const handleBeforeChange = (values: string[]) => {
  if (values.length > 2) {
    ElMessage.warning("最多只能选择2个选项")
    return false
  }
  return true
}

// 事件处理函数
const handleChange = (values: string[]) => {
  ElMessage.success(`已选择 ${values.length} 个选项`)
  changeMessage.value = `最近更新: 已选择 ${values.length} 个选项`
  console.log("Selected values:", values)
}

const handleComboChange = (values: string[]) => {
  console.log("Combo selection changed:", values)
}

// 属性表格配置
const propsColumns = [
  {
    prop: "prop",
    label: "属性名",
    width: 200
  },
  {
    prop: "type",
    label: "类型",
    width: 200
  },
  {
    prop: "default",
    label: "默认值",
    width: 120
  },
  {
    prop: "required",
    label: "是否必填",
    width: 100,
    align: "center"
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 300
  }
]

// 属性表格数据
const propsTableData = [
  {
    prop: "v-model",
    type: "Array",
    default: "[]",
    required: true,
    description: "选中值"
  },
  {
    prop: "modelValue",
    type: "Array",
    default: "[]",
    required: true,
    description: "绑定值的内部实现，与v-model同步"
  },
  {
    prop: "options",
    type: "Array",
    default: "[]",
    required: false,
    description: "选项数组"
  },
  {
    prop: "border",
    type: "Boolean",
    default: "false",
    required: false,
    description: "是否显示边框"
  },
  {
    prop: "size",
    type: "String",
    default: "medium",
    required: false,
    description: "组件尺寸，可选值: large/default/small/mini"
  },
  {
    prop: "direction",
    type: "String",
    default: "horizontal",
    required: false,
    description: "排列方向，可选值: horizontal/vertical"
  },
  {
    prop: "min",
    type: "Number",
    default: "0",
    required: false,
    description: "最少选中数量"
  },
  {
    prop: "max",
    type: "Number",
    default: "Infinity",
    required: false,
    description: "最多选中数量"
  },
  {
    prop: "disabled",
    type: "Boolean",
    default: "false",
    required: false,
    description: "是否禁用"
  },
  {
    prop: "checkbox-color",
    type: "String",
    default: "#409EFF",
    required: false,
    description: "复选框选中颜色"
  },
  {
    prop: "border-color",
    type: "String",
    default: "#DCDFE6",
    required: false,
    description: "边框颜色"
  },
  {
    prop: "font-color",
    type: "String",
    default: "#303133",
    required: false,
    description: "文字颜色"
  },
  {
    prop: "highlight",
    type: "Boolean",
    default: "false",
    required: false,
    description: "是否启用高亮效果"
  },
  {
    prop: "highlight-color",
    type: "String",
    default: "#ECF5FF",
    required: false,
    description: "高亮颜色"
  },
  {
    prop: "hover-color",
    type: "String",
    default: "#F5F7FA",
    required: false,
    description: "鼠标悬停时的颜色"
  },
  {
    prop: "before-change",
    type: "Function",
    default: "-",
    required: false,
    description: "变更前钩子"
  }
]

// 事件表格配置
const eventsColumns = [
  {
    prop: "name",
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
    name: "update:modelValue",
    params: "values: Array",
    description: "v-model绑定值变化时触发"
  },
  {
    name: "change",
    params: "values: Array",
    description: "当绑定值变化时触发的事件"
  }
]
</script>

<style scoped>
/* 与 datepickerpane.vue 保持一致的样式，但修改为全屏布局 */
.datepicker-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.demo-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 10px;
  font-weight: 600;
}

.demo-description {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.demo-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
  font-weight: 500;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.demo-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.demo-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 10px;
}

.card-desc {
  color: #606266;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.value-display {
  margin-top: 15px;
  padding: 10px;
  background-color: #f0f2f5;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  word-break: break-all;
}

.message-tip {
  margin-top: 10px;
  font-size: 12px;
  color: #909399;
}

.change-info {
  margin-top: 10px;
  font-size: 13px;
  color: #409eff;
  font-weight: 500;
}

/* 组件文档样式 */
.component-docs {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  margin-top: 30px;
}

.component-docs h2 {
  font-size: 22px;
  color: #303133;
  margin-bottom: 20px;
  font-weight: 600;
}

.component-docs h3 {
  font-size: 18px;
  color: #303133;
  margin: 25px 0 15px 0;
  font-weight: 500;
}

.doc-section {
  margin-bottom: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .datepicker-demo-container {
    padding: 10px;
  }

  .demo-header {
    padding: 15px 10px;
  }

  .demo-title {
    font-size: 24px;
  }

  .demo-section {
    padding: 16px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .demo-card {
    padding: 16px;
  }

  .section-title {
    font-size: 16px;
  }

  .component-docs {
    padding: 16px;
  }
}
</style>
