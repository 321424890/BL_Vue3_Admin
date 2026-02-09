<template>
  <div class="form-group-demo">
    <h1>CrystalFormGroup 组件示例</h1>

    <CrystalFormGroup :form-groups="formGroups" :table-config="tableConfig" v-model="formData" :show-operation="true">
      <!-- 表格操作插槽 -->
      <template #table-operation="{ row }">
        <el-button type="text" size="small" @click="handleDelete(row)"> Delete </el-button>
      </template>

      <!-- 表单操作按钮插槽 -->
      <template #operation="{ validate, reset }">
        <el-button type="primary" @click="handleSubmit(validate)"> 提交 </el-button>
        <el-button @click="reset"> 重置 </el-button>
      </template>
    </CrystalFormGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import { CrystalFormGroup } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 表单数据
const formData = reactive({
  // 仓库管理
  warehouseName: "",
  warehouseAddress: "",
  warehouseManager: "",
  approver: "",
  effectiveDate: "",
  warehouseType: "",

  // 任务管理
  taskName: "",
  taskDescription: "",
  executor: "",
  responsiblePerson: "",
  deadline: "",
  taskType: ""
})

// 表单组配置

const formGroups = ref([
  {
    title: "仓库管理",
    rows: [
      {
        fields: [
          {
            field: "warehouseName",
            label: "仓库名",
            type: "input",
            required: true,
            placeholder: "请输入仓库名称",
            span: 8
          },
          {
            field: "warehouseAddress",
            label: "仓库地址",
            type: "input",
            required: true,
            placeholder: "请输入仓库地址",
            span: 8
          },
          {
            field: "warehouseManager",
            label: "仓库管理",
            type: "select",
            required: true,
            filterable: true, // 可搜索
            clearable: true, // 可清空
            placeholder: "请选择管理员",
            options: [
              { label: "管理员1", value: "manager1" },
              { label: "管理员2", value: "manager2" },
              { label: "管理员3", value: "manager3" }
            ],
            span: 8
          }
        ]
      },
      {
        fields: [
          {
            field: "approver",
            label: "审批人",
            type: "select",
            placeholder: "请选择审批人",
            filterable: true, // 可搜索
            clearable: true, // 可清空
            options: [
              { label: "审批人1", value: "approver1" },
              { label: "审批人2", value: "approver2" },
              { label: "审批人3", value: "approver3" }
            ],
            span: 8
          },
          {
            field: "birthday",
            label: "生效日期",
            type: "date",
            placeholder: "请选择时间",
            span: 8
          },
          {
            field: "warehouseType",
            label: "仓库类型",
            type: "select",
            placeholder: "请选择仓库类型",
            filterable: true, // 可搜索
            clearable: true, // 可清空
            options: [
              { label: "普通仓库", value: "normal" },
              { label: "冷链仓库", value: "cold" },
              { label: "危险品仓库", value: "dangerous" }
            ],
            span: 8
          }
        ]
      }
    ]
  },
  {
    title: "任务管理",
    rows: [
      {
        fields: [
          {
            field: "taskName",
            label: "任务名",
            type: "input",
            required: true,
            placeholder: "请输入任务名称",
            cols: 8
          },
          {
            field: "taskDescription",
            label: "任务描述",
            type: "input",
            required: true,
            placeholder: "请输入任务描述",
            cols: 8
          },
          {
            field: "executor",
            label: "执行人",
            type: "select",
            required: true,
            placeholder: "请选择执行人",
            filterable: true, // 可搜索
            clearable: true, // 可清空
            options: [
              { label: "执行人1", value: "executor1" },
              { label: "执行人2", value: "executor2" },
              { label: "执行人3", value: "executor3" }
            ],
            span: 8
          }
        ]
      },
      {
        fields: [
          {
            field: "responsiblePerson",
            label: "负责人",
            type: "select",
            placeholder: "请选择负责人",
            filterable: true, // 可搜索
            clearable: true, // 可清空
            options: [
              { label: "负责人1", value: "resp1" },
              { label: "负责人2", value: "resp2" },
              { label: "负责人3", value: "resp3" }
            ],
            cols: 8
          },
          {
            field: "effectiveTime",
            label: "提醒时间",
            type: "date",
            placeholder: "请选择时间",
            cols: 8
          },
          {
            field: "taskType",
            label: "任务类型",
            type: "select",
            placeholder: "请选择任务类型",
            filterable: true, // 可搜索
            clearable: true, // 可清空
            options: [
              { label: "日常任务", value: "daily" },
              { label: "紧急任务", value: "urgent" },
              { label: "周期性任务", value: "periodic" }
            ],
            cols: 8
          }
        ]
      }
    ]
  }
])

// 表格配置
const tableConfig = {
  data: [
    {
      name: "员工1",
      employeeId: "001",
      department: "行政部",
      operation: ""
    },
    {
      name: "员工2",
      employeeId: "002",
      department: "技术部",
      operation: ""
    },
    {
      name: "员工3",
      employeeId: "003",
      department: "财务部",
      operation: ""
    }
  ],
  columns: [
    {
      prop: "name",
      label: "成员姓名"
    },
    {
      prop: "employeeId",
      label: "工号"
    },
    {
      prop: "department",
      label: "所属部门"
    },
    {
      prop: "operation",
      label: "操作",
      width: "80"
    }
  ],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 3
  },
  basicHeight: "200px"
}

// 提交表单
const handleSubmit = async (validate: () => Promise<boolean>) => {
  const isValid = await validate()
  if (isValid) {
    // 处理表单提交逻辑
    ElMessage.success("表单提交成功")
    console.log("Form Data:", formData)
  }
}

// 删除表格行
const handleDelete = (row: any) => {
  ElMessage.success(`删除员工: ${row.name}`)
  console.log("Delete row:", row)
}
</script>

<style scoped>
.form-group-demo {
  padding: 20px;
  width: 100%;
  background-color: #ffffff;
  min-height: 100vh;
}

.form-group-demo h1 {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 30px;
  text-align: center;
}
</style>
