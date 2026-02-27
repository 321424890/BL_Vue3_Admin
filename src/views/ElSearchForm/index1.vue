<template>
  <div class="elsearchform-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">ElSearchForm 动态配置搜索字段示例</h1>
      <p class="demo-description">
        基于 Element Plus 的动态搜索表单组件，支持动态配置搜索字段，可通过配置面板选择显示哪些搜索字段
      </p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <!-- 动态配置搜索字段示例 -->
      <div class="demo-section">
        <h3 class="section-title">动态配置搜索字段</h3>
        <div class="demo-card">
          <h4 class="card-title">动态搜索表单</h4>
          <p class="card-desc">可通过"配置"按钮自定义显示哪些搜索字段</p>
          <ElSearchForm
            :query-config="dynamicQueryConfig"
            :Searchcolumns="searchColumns"
            @search="handleSearch"
            @reset="handleReset"
            @field-click="handleFieldClick"
            @field-change="handleFieldChange"
            @config-change="handleConfigChange"
          />

          <div class="form-result">
            <h5>搜索结果：</h5>
            <pre>{{ JSON.stringify(searchResult, null, 2) }}</pre>
          </div>

          <div class="config-info">
            <h5>当前配置：</h5>
            <div class="visible-fields">
              <span class="field-tag" v-for="field in currentVisibleFields" :key="field">
                {{ field }}
              </span>
              <span v-if="currentVisibleFields.length === 0" class="empty-config"> 默认显示所有字段 </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>动态配置搜索字段功能说明</h2>

      <div class="doc-section">
        <h3>功能特性</h3>
        <ul class="feature-list">
          <li>✅ 支持通过配置面板动态选择显示哪些搜索字段</li>
          <li>✅ 支持全选/取消全选所有字段</li>
          <li>✅ 配置保存后即时生效</li>
          <li>✅ 支持响应式布局</li>
          <li>✅ 支持展开收起功能</li>
        </ul>
      </div>

      <div class="doc-section">
        <h3>使用方法</h3>
        <ol class="usage-steps">
          <li>点击"配置"按钮打开配置面板</li>
          <li>在配置面板中选择需要显示的字段</li>
          <li>点击"保存"按钮保存配置</li>
          <li>搜索表单会根据配置显示相应的字段</li>
        </ol>
      </div>

      <div class="doc-section">
        <h3>配置说明</h3>
        <BasicTable
          :table-data="configData"
          :columns="configColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="300px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { ElSearchForm } from "crystalplus-ui"

// 当前可见字段配置
const currentVisibleFields = ref<string[]>([])

// 搜索结果
const searchResult = ref({})

const searchColumns = ref([
  { prop: "name", label: "姓名", sortable: false, align: "center" },
  { prop: "age", label: "年龄", sortable: false, align: "center", type: "el-input-number" },
  { prop: "gender", label: "性别", sortable: false, align: "center", type: "el-select" },
  { prop: "email", label: "邮箱", sortable: false, align: "center", type: "el-input" },
  { prop: "phone", label: "手机号", sortable: false, align: "center", type: "el-input" },
  { prop: "status", label: "状态", sortable: false, align: "center", type: "el-select" },
  { prop: "createTime", label: "创建时间", sortable: false, align: "center", type: "el-date-picker" },
  { prop: "endTime", label: "结束时间", sortable: false, align: "center", type: "el-date-picker" },
  {
    prop: "aaa",
    label: "测试",
    type: "el-select",
    placeholder: "请选择测试",
    options: [
      { label: "选项1", value: "option1" },
      { label: "选项2", value: "option2" },
      { label: "选项3", value: "option3" }
    ]
  }
])

// 动态查询配置
const dynamicQueryConfig = ref([
  {
    prop: "name",
    label: "姓名",
    type: "el-input",
    placeholder: "请输入姓名",
    width: "200px",
    props: {
      placeholder: "请输入姓名",
      clearable: true
    }
  },
  {
    prop: "age",
    label: "年龄",
    type: "el-input-number",
    width: "150px",
    props: {
      placeholder: "请输入年龄",
      min: 0,
      max: 150,
      step: 1
    }
  },
  {
    prop: "gender",
    label: "性别",
    type: "el-select",
    width: "120px",
    props: {
      placeholder: "请选择性别",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" }
      ]
    }
  },
  {
    prop: "email",
    label: "邮箱",
    type: "el-input",
    width: "250px",
    props: {
      placeholder: "请输入邮箱",
      clearable: true
    }
  },
  {
    prop: "phone",
    label: "手机号",
    type: "el-input",
    width: "200px",
    props: {
      placeholder: "请输入手机号",
      clearable: true
    }
  },
  {
    prop: "status",
    label: "状态",
    type: "el-select",
    width: "150px",
    props: {
      placeholder: "请选择状态",
      options: [
        { label: "启用", value: "active" },
        { label: "禁用", value: "inactive" },
        { label: "审核中", value: "pending" }
      ]
    }
  },
  {
    prop: "createTime",
    label: "创建时间",
    type: "el-date-picker",
    width: "200px",
    props: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
      placeholder: "请选择创建时间"
    }
  }
])

// 处理搜索事件
const handleSearch = (params: any) => {
  console.log("搜索参数:", params)
  searchResult.value = params
}

// 处理重置事件
const handleReset = (formData: any) => {
  console.log("重置后的表单数据:", formData)
  searchResult.value = {}
}

// 处理字段点击事件
const handleFieldClick = (queryItem: any) => {
  console.log("字段点击:", queryItem)
  alert(`点击了只读字段：${queryItem.label}`)
}

// 处理字段变化事件
const handleFieldChange = (queryItem: any, val: any) => {
  console.log("字段变化:", queryItem.label, val)
}

// 处理配置变化事件
const handleConfigChange = (config: any) => {
  console.log("配置变化:", config)
  // 将字段prop转换为字段label
  currentVisibleFields.value = config.visibleFields.map((prop: string) => {
    const field = dynamicQueryConfig.value.find(item => item.prop === prop)
    return field ? field.label : prop
  })
}

// 配置说明表格数据
const configData = [
  {
    property: "queryConfig",
    description: "搜索字段配置数组，优先级高于columns",
    type: "Array<QueryItem>",
    required: "否",
    default: "[]"
  },
  {
    property: "Searchcolumns",
    description: "表格表头数据，用于自动生成搜索字段配置",
    type: "Array<Column>",
    required: "否",
    default: "[]"
  },
  {
    property: "@search",
    description: "搜索按钮点击事件，表单验证通过后触发",
    type: "Function",
    required: "否",
    default: "-"
  },
  {
    property: "@reset",
    description: "重置按钮点击事件",
    type: "Function",
    required: "否",
    default: "-"
  },
  {
    property: "@field-click",
    description: "只读字段点击事件",
    type: "Function",
    required: "否",
    default: "-"
  },
  {
    property: "@field-change",
    description: "字段值变化事件",
    type: "Function",
    required: "否",
    default: "-"
  },
  {
    property: "@config-change",
    description: "配置变化事件",
    type: "Function",
    required: "否",
    default: "-"
  }
]

// 配置说明表格列配置
const configColumns = [
  { prop: "property", label: "属性名", width: "150" },
  { prop: "description", label: "说明" },
  { prop: "type", label: "类型", width: "150" },
  { prop: "required", label: "必传", width: "80" },
  { prop: "default", label: "默认值", width: "150" }
]
</script>

<style scoped>
.elsearchform-demo-container {
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

.demo-content {
  margin-bottom: 40px;
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
  margin-bottom: 20px;
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

.config-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
}

.config-info h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.visible-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.field-tag {
  display: inline-block;
  padding: 4px 12px;
  background-color: #409eff;
  color: white;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.empty-config {
  color: #909399;
  font-size: 12px;
  font-style: italic;
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

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
}

.feature-list li::before {
  content: "✅";
  position: absolute;
  left: 0;
  top: 8px;
}

.usage-steps {
  padding-left: 20px;
}

.usage-steps li {
  padding: 8px 0;
  line-height: 1.5;
}

.component-docs :deep(.el-table) {
  margin-top: 10px;
}
</style>
