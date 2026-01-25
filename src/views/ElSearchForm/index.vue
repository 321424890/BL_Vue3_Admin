<template>
  <div class="elsearchform-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">ElSearchForm 动态搜索表单组件</h1>
      <p class="demo-description">基于 Element Plus 的动态搜索表单组件，支持多种表单控件类型，可通过配置快速生成搜索表单</p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <!-- 基础使用 -->
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-card">
          <h4 class="card-title">基本搜索表单</h4>
          <p class="card-desc">一个包含常见搜索控件的基础搜索表单示例</p>
          <ElSearchForm
            :query-config="basicQueryConfig"
            @search="handleBasicSearch"
            @reset="handleBasicReset"
          />
          <div class="form-result">
            <h5>搜索结果：</h5>
            <pre>{{ JSON.stringify(basicSearchResult, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- 高级使用 -->
      <div class="demo-section">
        <h3 class="section-title">高级使用</h3>
        <div class="demo-card">
          <h4 class="card-title">完整搜索表单</h4>
          <p class="card-desc">包含多种控件类型和事件处理的完整搜索表单示例</p>
          <ElSearchForm
            :query-config="advancedQueryConfig"
            @search="handleAdvancedSearch"
            @reset="handleAdvancedReset"
            @field-click="handleFieldClick"
            @field-change="handleFieldChange"
          />
          <div class="form-result">
            <h5>搜索结果：</h5>
            <pre>{{ JSON.stringify(advancedSearchResult, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- 远程搜索 -->
      <div class="demo-section">
        <h3 class="section-title">远程搜索</h3>
        <div class="demo-card">
          <h4 class="card-title">远程搜索示例</h4>
          <p class="card-desc">演示如何使用远程搜索功能</p>
          <ElSearchForm
            :query-config="remoteQueryConfig"
            @search="handleRemoteSearch"
            @reset="handleRemoteReset"
          />
          <div class="form-result">
            <h5>搜索结果：</h5>
            <pre>{{ JSON.stringify(remoteSearchResult, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>ElSearchForm 组件文档</h2>

      <!-- 属性表格 -->
      <div class="doc-section">
        <h3>组件属性</h3>
        <BasicTable
          :table-data="attributeData"
          :columns="attributeColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="120px"
        />
      </div>

      <!-- QueryItem 属性表格 -->
      <div class="doc-section">
        <h3>QueryItem 类型定义</h3>
        <BasicTable
          :table-data="queryItemData"
          :columns="queryItemColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="400px"
        />
      </div>

      <!-- 事件表格 -->
      <div class="doc-section">
        <h3>组件事件</h3>
        <BasicTable
          :table-data="eventData"
          :columns="eventColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
           basic-height="250px"
        />
      </div>

      <!-- 支持的控件类型表格 -->
      <div class="doc-section">
        <h3>支持的控件类型</h3>
        <BasicTable
          :table-data="controlTypeData"
          :columns="controlTypeColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
 basic-height="250px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { ElSearchForm } from "crystal-ui"

// 基础使用示例 - 完整配置示例
const basicQueryConfig = ref([
  {
    prop: "name",
    label: "姓名",
    type: "el-input",
    value: "", // 初始值
    width: "200px",
    required: true, // 是否必填
    disabled: false, // 是否禁用
    readonly: false, // 是否只读
    placeholder: "请输入姓名", // 占位符
    props: {
      placeholder: '请输入姓名',
      clearable: true, // 可清空
      maxlength: 20, // 最大长度
      showWordLimit: true, // 显示字数统计
    },
    rules: [ // 验证规则
      { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    onChange: (val) => { // 字段变化回调
      console.log("姓名变化:", val)
    }
  },
  {
    prop: "age",
    label: "年龄",
    type: "el-input-number",
    value: 18, // 初始值
    width: "200px",
    required: true, // 是否必填
    disabled: false, // 是否禁用
    props: {
      min: 0, // 最小值
      max: 150, // 最大值
      step: 1, // 步长
      placeholder: '请输入年龄',
      controlsPosition: 'right', // 控制按钮位置
      precision: 0 // 精度
    },
    rules: [
      { required: true, message: '请输入年龄', trigger: 'blur' },

    ],
    onChange: (val) => {
      console.log("年龄变化:", val)
    }
  },
  {
    prop: "gender",
    label: "性别",
    type: "el-select",
    value: "", // 初始值
    width: "150px",
    required: true, // 是否必填
    disabled: false, // 是否禁用
    placeholder: "请选择性别",
    props: {
      placeholder: '请选择性别',
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" }
      ],
      filterable: true, // 可搜索
      clearable: true, // 可清空
      multiple: false, // 是否多选
      collapseTags: false // 折叠标签
    },
    rules: [
      { required: true, message: "请选择性别", trigger: "blur" }
    ],
    onChange: (val) => {
      console.log("性别变化:", val)
    }
  },
  {
    prop: "status",
    label: "状态",
    type: "el-switch",
    value: true, // 初始值
    required: false, // 是否必填
    disabled: false, // 是否禁用
    props: {
      activeText: "启用", // 激活文本
      inactiveText: "禁用", // 非激活文本
      activeColor: "#13ce66", // 激活颜色
      inactiveColor: "#ff4949", // 非激活颜色
      inlinePrompt: true, // 文字显示在开关旁边
      size: "default" // 开关大小
    },
    onChange: (val) => {
      console.log("状态变化:", val)
    }
  },
  {
    prop: "createTime",
    label: "创建时间",
    type: "el-date-picker",
    value: "", // 初始值
    required: false, // 是否必填
    width: "250px",
    disabled: false, // 是否禁用
    placeholder: "请选择创建时间",
    props: {
      type: "daterange", // 日期范围选择
      rangeSeparator: "至",
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
      clearable: true,
      unlinkPanels: false, // 面板不联动
    //   disabledDate: (time: Date) => { // 禁用日期
    //     return time.getTime() > Date.now()
    //   }
    },
    onChange: (val) => {
      console.log("创建时间变化:", val)
    }
  },
  {
    prop: "birthDate",
    label: "出生日期",
    type: "el-date-picker",
    placeholder: "请选择出生日期",
    width: "200px",
    props: {
      placeholder: "请选择出生日期",
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD"
    }
  },
  {
    prop: "email",
    label: "邮箱",
    type: "el-input",
    value: "", // 初始值
    required: false, // 是否必填
    width: "250px",
    disabled: false, // 是否禁用
    readonly: false, // 是否只读
    placeholder: "请输入邮箱",
    props: {
      placeholder: '请输入邮箱',
      clearable: true,
      maxlength: 50,
      showWordLimit: true,
      autocomplete: "on"
    },
    rules: [
      { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    onChange: (val) => {
      console.log("邮箱变化:", val)
    }
  }
])

const basicSearchResult = ref({})

const handleBasicSearch = (params: any) => {
  console.log("基础搜索参数:", params)
  basicSearchResult.value = params
}

const handleBasicReset = (formData: any) => {
  console.log("基础重置后的表单数据:", formData)
  basicSearchResult.value = {}
}

// 高级使用示例
const advancedQueryConfig = ref([
  {
    prop: "name",
    label: "姓名",
    type: "el-input",
    placeholder: "请输入姓名",
      disabled: true, // 是否禁用
    width: "200px",
        props: {
      placeholder: '请输入姓名',
      clearable: true, // 可清空
    },
    rules: [ // 验证规则
      { required: false, message: '请输入姓名', trigger: 'blur' },
    ],
  },
 {
    prop: "gender",
    label: "性别",
    type: "el-select",
    value: "", // 初始值
    width: "150px",
    required: true, // 是否必填
    disabled: false, // 是否禁用
    placeholder: "请选择性别",
    props: {
      placeholder: '请选择性别',
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" }
      ],
      filterable: true, // 可搜索
      clearable: true, // 可清空
      multiple: false, // 是否多选
      collapseTags: false // 折叠标签
    },
    rules: [
      { required: true, message: "请选择性别", trigger: "blur" }
    ],
    onChange: (val) => {
      console.log("性别变化:", val)
    }
  },
  {
    prop: "birthDate",
    label: "出生日期",
    type: "el-date-picker",
    placeholder: "请选择出生日期",
    width: "200px",
    props: {
          placeholder: "请选择出生日期",
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
    },
  },
  {
    prop: "status",
    label: "状态",
    type: "el-select",
    placeholder: "请选择状态",
    props: {
         placeholder: "请选择状态",
      options: [
        { label: "启用", value: "active" },
        { label: "禁用", value: "inactive" },
        { label: "审核中", value: "pending" },
      ],
    },
  },
  {
    prop: "isVIP",
    label: "是否VIP",
    type: "el-switch",
    props: {
      activeText: "是",
      inactiveText: "否",
    },
  },
  {
    prop: "readonlyField",
    label: "只读字段",
    type: "el-input",
    value: "点击我查看详情",
    readonly: true,
    width: "200px",
  },
])

const advancedSearchResult = ref({})

const handleAdvancedSearch = (params: any) => {
  console.log("高级搜索参数:", params)
  advancedSearchResult.value = params
}

const handleAdvancedReset = (formData: any) => {
  console.log("高级重置后的表单数据:", formData)
  advancedSearchResult.value = {}
}

const handleFieldClick = (queryItem: any) => {
  console.log("字段点击:", queryItem)
  alert(`点击了只读字段：${queryItem.prop}`)
}

const handleFieldChange = (queryItem: any, val: any) => {
  console.log("字段变化:", queryItem.prop, val)
}

// 远程搜索示例
const remoteQueryConfig = ref([
  {
    prop: "user",
    label: "用户",
    type: "el-select",
    value: "",
    placeholder: "请输入用户名搜索",
    width: "250px",
    required: false,
    disabled: false,
    props: {
      options: [],
      loading: false,
      placeholder: "请输入用户名搜索",
      // 注意：remote和filterable属性必须配置在props对象中
      filterable: true,
      remote: true,
      // 必须设置remote-method属性来触发远程搜索
      remoteMethod: async (query: string) => {
        console.log("remoteMethod直接触发，搜索关键词:", query)
        // 模拟远程API请求
        remoteQueryConfig.value[0].props.loading = true
        
        // 模拟API返回结果
        const mockUsers = [
          { label: `用户${query}1`, value: `${query}1` },
          { label: `用户${query}2`, value: `${query}2` },
          { label: `用户${query}3`, value: `${query}3` },
          { label: `用户${query}4`, value: `${query}4` },
          { label: `用户${query}5`, value: `${query}5` },
        ]
        
        // 延迟返回结果，模拟网络请求
        setTimeout(() => {
          remoteQueryConfig.value[0].props.options = mockUsers
          remoteQueryConfig.value[0].props.loading = false
        }, 1000)
      }
    },
    onChange: (val) => {
      console.log("用户选择变化:", val)
    }
  },
  {
    prop: "keyword",
    label: "关键词",
    type: "el-input",
    placeholder: "请输入关键词",
    width: "200px",
    props: {
      placeholder: "请输入关键词",
      clearable: true
    }
  },
])

const remoteSearchResult = ref({})

const handleRemoteSearch = (params: any) => {
  console.log("远程搜索参数:", params)
  remoteSearchResult.value = params
}

const handleRemoteReset = (formData: any) => {
  console.log("远程重置后的表单数据:", formData)
  remoteSearchResult.value = {}
}

// 属性表格数据
const attributeData = [
  { 
    name: "queryConfig", 
    type: "Array<QueryItem>", 
    description: "搜索字段配置数组", 
    required: "是", 
    default: "[]" 
  }
]

// QueryItem 属性表格数据
const queryItemData = [
  { name: "prop", type: "string", description: "字段名", required: "是", default: "-" },
  { name: "label", type: "string", description: "字段标签", required: "是", default: "-" },
  { name: "type", type: "string", description: "字段类型", required: "是", default: "-" },
  { name: "value", type: "any", description: "初始值", required: "否", default: "undefined" },
  { name: "required", type: "boolean", description: "是否必填", required: "否", default: "false" },
  { name: "width", type: "string", description: "控件宽度", required: "否", default: "-" },
  { name: "disabled", type: "boolean", description: "是否禁用", required: "否", default: "false" },
  { name: "readonly", type: "boolean", description: "是否只读", required: "否", default: "false" },
  { name: "rules", type: "any[]", description: "验证规则", required: "否", default: "[]" },
  { name: "props", type: "Record<string, any>", description: "控件额外属性", required: "否", default: "{}" },
  { name: "onChange", type: "(val: any) => void", description: "字段值变化回调", required: "否", default: "-" },
  { name: "onRemoteSearch", type: "(query: string) => Promise<void>", description: "远程搜索回调（仅select类型）", required: "否", default: "-" }
]

// 事件表格数据
const eventData = [
  { 
    name: "search", 
    parameters: "params: Record<string, any>", 
    description: "搜索按钮点击事件，表单验证通过后触发" 
  },
  { 
    name: "reset", 
    parameters: "formData: Record<string, any>", 
    description: "重置按钮点击事件" 
  },
  { 
    name: "field-click", 
    parameters: "queryItem: QueryItem", 
    description: "只读字段点击事件" 
  },
  { 
    name: "field-change", 
    parameters: "queryItem: QueryItem, val: any", 
    description: "字段值变化事件" 
  }
]

// 支持的控件类型表格数据
const controlTypeData = [
  { 
    type: "el-input", 
    description: "文本输入框", 
    features: "支持清空、只读、点击事件" 
  },
  { 
    type: "el-select", 
    description: "下拉选择器", 
    features: "支持远程搜索、清空、过滤" 
  },
  { 
    type: "el-date-picker", 
    description: "日期选择器", 
    features: "支持日期格式化" 
  },
  { 
    type: "el-input-number", 
    description: "数字输入框", 
    features: "支持数字范围限制" 
  },
  { 
    type: "el-switch", 
    description: "开关组件", 
    features: "支持自定义文本" 
  }
]

// 属性表格列配置
const attributeColumns = [
  { prop: "name", label: "属性名", width: "200" },
  { prop: "type", label: "类型", width: "200" },
  { prop: "description", label: "说明" },
  { prop: "required", label: "必传", width: "80" },
  { prop: "default", label: "默认值", width: "150" }
]

// QueryItem 属性表格列配置
const queryItemColumns = [
  { prop: "name", label: "属性名", width: "150" },
  { prop: "type", label: "类型", width: "150" },
  { prop: "description", label: "说明" },
  { prop: "required", label: "必传", width: "80" },
  { prop: "default", label: "默认值", width: "150" }
]

// 事件表格列配置
const eventColumns = [
  { prop: "name", label: "事件名", width: "200" },
  { prop: "parameters", label: "回调参数", width: "300" },
  { prop: "description", label: "说明" }
]

// 支持的控件类型表格列配置
const controlTypeColumns = [
  { prop: "type", label: "类型", width: "200" },
  { prop: "description", label: "说明" },
  { prop: "features", label: "特性" }
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

.doc-section :deep(.el-table) {
  margin-top: 10px;
}
</style>