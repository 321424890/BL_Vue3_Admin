<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">ElBasicTable 带搜索功能的表格示例</h1>
        <p class="page-description">基于 Element Plus 表格组件封装的增强型表格组件，提供了搜索功能，包括搜索表单和搜索按钮</p>
      </div>
    </div>

    <!-- 带搜索功能的表格示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带搜索功能的表格</h4>
          <p>这是一个带搜索功能的表格示例，展示了表格的搜索功能，包括搜索表单和搜索按钮。</p>
          <ElBasicTable
            :table-data="tableData"
            :columns="columns"
            :query-config-status="true"
            :query-config="queryConfig"
            @search="handleSearch"
            @reset="handleReset"
            border
            stripe
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElBasicTable } from "crystalplus-ui"
import { ElMessage } from "element-plus"

// 表格数据
const tableData = ref([
  { id: 1, name: "张三", age: 20, address: "北京市朝阳区", email: "zhangsan@example.com" },
  { id: 2, name: "李四", age: 25, address: "上海市浦东新区", email: "lisi@example.com" },
  { id: 3, name: "王五", age: 30, address: "广州市天河区", email: "wangwu@example.com" },
  { id: 4, name: "赵六", age: 35, address: "深圳市南山区", email: "zhaoliu@example.com" },
  { id: 5, name: "孙七", age: 40, address: "杭州市西湖区", email: "sunqi@example.com" }
])

// 表格列配置
const columns = ref([
  { prop: "id", label: "ID", width: "80", align: "center" },
  { prop: "name", label: "姓名", width: "120", align: "center" },
  { prop: "age", label: "年龄", width: "80", align: "center" },
  { prop: "address", label: "地址", minWidth: "150", align: "center" },
  { prop: "email", label: "邮箱", minWidth: "200", align: "center" }
])

// 搜索配置
const queryConfig = ref([
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
      placeholder: "请输入姓名",
      clearable: true, // 可清空
      maxlength: 20, // 最大长度
      showWordLimit: true // 显示字数统计
    },
    rules: [
      // 验证规则
      { required: true, message: "请输入姓名", trigger: "blur" }
    ],
    onChange: val => {
      // 字段变化回调
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
      placeholder: "请输入年龄",
      controlsPosition: "right", // 控制按钮位置
      precision: 0 // 精度
    },
    rules: [{ required: true, message: "请输入年龄", trigger: "blur" }],
    onChange: val => {
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
      placeholder: "请选择性别",
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
    rules: [{ required: true, message: "请选择性别", trigger: "blur" }],
    onChange: val => {
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
    onChange: val => {
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
      unlinkPanels: false // 面板不联动
      //   disabledDate: (time: Date) => { // 禁用日期
      //     return time.getTime() > Date.now()
      //   }
    },
    onChange: val => {
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
      placeholder: "请输入邮箱",
      clearable: true,
      maxlength: 50,
      showWordLimit: true,
      autocomplete: "on"
    },
    rules: [{ type: "email", message: "请输入有效的邮箱地址", trigger: "blur" }],
    onChange: val => {
      console.log("邮箱变化:", val)
    }
  }
])

// 搜索按钮点击事件
const handleSearch = (params: any) => {
  ElMessage.success(`搜索参数：${JSON.stringify(params)}`)
  console.log("搜索参数:", params)
  // 在这里可以根据搜索参数筛选数据
}

// 重置按钮点击事件
const handleReset = () => {
  ElMessage.info("重置搜索")
  console.log("重置搜索")
  // 在这里可以重置搜索条件
}
</script>

<style scoped>
.pageWrap {
  padding: 20px;
}

/* 页面头部样式 */
.page-header {
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.page-title {
  color: #303133;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page-description {
  color: #606266;
  font-size: 14px;
  margin: 0;
}

/* 示例组样式 */
.input-group {
  margin-bottom: 20px;
  padding: 16px;
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.input-group h4 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.input-group p {
  margin-bottom: 16px;
  color: #606266;
  line-height: 1.5;
}
</style>
