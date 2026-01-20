<template>
  <div class="formwrapper-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">ElFormWrapper 组件</h1>
      <p class="demo-description">基于 Element Plus 封装的动态表单组件，用于快速构建复杂的表单</p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <el-row :gutter="24">
          <!-- 示例1: 基础表单 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div class="demo-card">
              <h4 class="card-title">基础表单</h4>
              <p class="card-desc">一个包含常见表单控件的基础表单示例</p>
              <ElFormWrapper
                ref="formRef"
                :schema="formSchema"
                v-model="formData"
                :rules="formRules"
                label-width="150px"
                show-operation-slot
                @field-click="handleFieldClick"
                @field-change="handleFieldChange"
                @update:model-value="handleModelUpdate"
              >
                <template #operation="{ validate, reset }">
                  <el-button type="primary" @click="handleSubmit(validate)">提交</el-button>
                  <el-button @click="reset">重置</el-button>
                  <el-button @click="handleClear">清除验证</el-button>
                </template>
              </ElFormWrapper>

              <div class="form-result">
                <h5>表单数据：</h5>
                <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>ElFormWrapper 组件文档</h2>

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

      <div class="doc-section">
        <h3>支持的字段类型</h3>
        <BasicTable
          :table-data="fieldTypeData"
          :columns="fieldTypeColumns"
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
import { ElFormWrapper } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

const formRef = ref(null)

const formData = ref<Record<string, any>>({
  name: "",
  gender: "",
  readonlyField: ""
})

const formSchema = [
  {
    field: "name",
    label: "姓名",
    type: "input",
    required: true,

    // width: "500px",
    placeholder: "请输入姓名",
    maxlength: 20
  },
  {
    field: "gender",
    label: "性别",
    type: "select",
    required: true,
    options: [
      { label: "男", value: "male" },
      { label: "女", value: "female" }
    ]
  },
  {
    field: "readonlyField",
    label: "只读字段",
    type: "input",
    readonly: true,
    placeholder: "点击我触发事件"
  }
]
const formRules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 20, message: "姓名长度在 2 到 20 个字符", trigger: "blur" }
  ],
  email: [
    { required: true, message: "请选择性别", trigger: "blur" },
    { type: "gender", message: "请选择性别", trigger: "change" }
  ]
}
const handleSubmit = async (validate: any) => {
  const isValid = await validate()
  if (isValid) {
    ElMessage.success("表单验证通过")
    console.log("表单数据:", formData)
  } else {
    ElMessage.error("表单验证失败，请检查")
  }
}

const handleFieldClick = (field: string, event: any) => {
  console.log(`字段 ${field} 被点击:`, field, event)
}

const handleFieldChange = (field: string, value: any) => {
  console.log(`字段 ${field} 值变化:`, value)
  // 手动更新表单数据，确保响应式更新
  formData[field] = value
}

// 处理v-model更新事件，确保formData正确更新
// const handleModelUpdate = (newValue: Record<string, any>) => {
//   console.log("v-model更新:", newValue)
//   // 将新值合并到formData中，确保响应式更新
//   Object.assign(formData, newValue)
// }

const handleClear = () => {
  formRef.value?.clearValidate()
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
  { name: "schema", description: "表单字段配置数组", type: "FormField[]", default: "[]" },
  { name: "modelValue / v-model", description: "表单数据对象", type: "Record<string, any>", default: "{}" },
  { name: "rules", description: "表单验证规则", type: "Record<string, any[]>", default: "{}" },
  { name: "labelPosition", description: "标签对齐方式", type: "string", default: '"right"' },
  { name: "requireAsteriskPosition", description: "必填星号位置", type: "string", default: '"left"' },
  { name: "labelWidth", description: "标签宽度", type: "string / number", default: '"120px"' },
  { name: "labelSuffix", description: "标签后缀", type: "string", default: '""' },
  { name: "inline", description: "是否为行内表单", type: "boolean", default: "false" },
  { name: "inlineMessage", description: "是否为行内消息", type: "boolean", default: "false" },
  { name: "statusIcon", description: "是否显示状态图标", type: "boolean", default: "false" },
  { name: "showMessage", description: "是否显示校验信息", type: "boolean", default: "true" },
  { name: "validateOnRuleChange", description: "规则变化时是否重新校验", type: "boolean", default: "true" },
  { name: "hideRequiredAsterisk", description: "是否隐藏必填星号", type: "boolean", default: "false" },
  { name: "scrollToError", description: "校验失败时是否滚动到错误项", type: "boolean", default: "false" },
  { name: "scrollIntoViewOptions", description: "滚动选项", type: "object", default: "undefined" },
  { name: "size", description: "表单大小", type: "string", default: '"default"' },
  { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
  { name: "showOperationSlot", description: "是否显示操作按钮插槽", type: "boolean", default: "false" }
]

// 事件表格列配置
const eventColumns = [
  { prop: "name", label: "事件名", width: "200" },
  { prop: "parameters", label: "参数", width: "200" },
  { prop: "description", label: "说明" }
]

// 事件表格数据
const eventData = [
  { name: "validate", parameters: "prop: string, isValid: boolean, message: string", description: "表单验证事件" },
  { name: "reset", parameters: "-", description: "表单重置事件" },
  { name: "blur", parameters: "prop: string, event: Event", description: "表单失焦事件" },
  { name: "focus", parameters: "prop: string, event: Event", description: "表单聚焦事件" },
  { name: "update:modelValue", parameters: "value: Record<string, any>", description: "表单数据更新事件" },
  { name: "field-change", parameters: "field: string, value: any", description: "字段值变化事件" },
  { name: "field-blur", parameters: "field: string, event: any", description: "字段失焦事件" },
  { name: "field-focus", parameters: "field: string, event: any", description: "字段聚焦事件" },
  { name: "field-clear", parameters: "field: string", description: "字段清除事件" },
  { name: "field-click", parameters: "field: string, event: any", description: "字段点击事件（只读状态下触发）" },
  { name: "field-visible-change", parameters: "field: string, visible: boolean", description: "下拉框可见性变化事件" },
  { name: "field-remove-tag", parameters: "field: string, tag: any", description: "标签移除事件" },
  { name: "field-expand-change", parameters: "field: string, value: any", description: "展开/折叠变化事件" },
  { name: "field-check-change", parameters: "field: string, value: any", description: "选中状态变化事件" },
  { name: "field-node-click", parameters: "field: string, value: any", description: "节点点击事件" },
  { name: "field-node-contextmenu", parameters: "field: string, value: any", description: "节点右键菜单事件" },
  { name: "field-current-change", parameters: "field: string, value: any", description: "当前节点变化事件" }
]

// 字段类型表格列配置
const fieldTypeColumns = [
  { prop: "type", label: "类型", width: "150" },
  { prop: "description", label: "说明" },
  { prop: "component", label: "底层组件", width: "150" }
]

// 字段类型表格数据
const fieldTypeData = [
  { type: "input", description: "文本输入框", component: "el-input" },
  { type: "textarea", description: "文本域", component: "el-input" },
  { type: "number", description: "数字输入框", component: "el-input-number" },
  { type: "select", description: "下拉选择器", component: "el-select" },
  { type: "radio", description: "单选框组", component: "el-radio-group" },
  { type: "checkbox", description: "复选框组", component: "el-checkbox-group" },
  { type: "switch", description: "开关", component: "el-switch" },
  { type: "date", description: "日期选择器", component: "el-date-picker" },
  { type: "time", description: "时间选择器", component: "el-time-picker" },
  { type: "timeSelect", description: "时间选择", component: "el-time-select" },
  { type: "inputTag", description: "标签输入", component: "el-input" },
  { type: "treeSelect", description: "树形选择器", component: "el-select" },
  { type: "cascader", description: "级联选择器", component: "el-cascader" },
  { type: "tree", description: "树形控件", component: "el-tree" },
  { type: "calendar", description: "日历", component: "el-calendar" },
  { type: "slot", description: "自定义插槽", component: "-" }
]
</script>

<style scoped>
.formwrapper-demo-container {
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

.form-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
}

.form-result h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.form-result pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 13px;
  color: #606266;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
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
