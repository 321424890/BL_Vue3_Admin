<template>
  <div class="comprehensive-demo">
    <h2>CrystalTable 综合案例</h2>
    <h3>包含：增删改查、多种搜索条件、多选功能、可编辑字段、自定义样式字段</h3>

    <CrystalTable
      :table-data="tableData"
      :columns="columns"
      :border="true"
      :stripe="true"
      :show-selection="true"
      :show-pagination="true"
      :total="total"
      :query-config-status="true"
      :query-config="queryConfig"
      :actions="actions"
      :query-size="querySize"
      @search="handleSearch"
      @reset="handleReset"
      @page-change="handlePageChange"
      @selection-change="handleSelectionChange"
    >
      <!-- 新增按钮插槽 -->
      <template #toolLeft>
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRows.length === 0">
          <el-icon><Delete /></el-icon>
          批量删除
        </el-button>
      </template>

      <!-- 自定义样式字段 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
          {{ row.status === "active" ? "启用" : "禁用" }}
        </el-tag>
      </template>
    </CrystalTable>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="formData.age" :min="0" :max="150" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.gender" placeholder="请选择性别">
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formData.status" active-value="active" inactive-value="inactive" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formData.createTime"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择创建时间"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="用户详情" width="500px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="姓名">{{ selectedRow?.name }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ selectedRow?.age }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ selectedRow?.gender === "male" ? "男" : "女" }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ selectedRow?.status === "active" ? "启用" : "禁用" }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ selectedRow?.createTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { CrystalTable } from "crystalplus-ui"
import { Plus, Delete, Edit, View } from "@element-plus/icons-vue"

// 表格数据
const tableData = ref([
  { id: 1, name: "张三", age: 20, gender: "male", status: "active", createTime: "2023-01-01" },
  { id: 2, name: "李四", age: 25, gender: "female", status: "active", createTime: "2023-01-02" },
  { id: 3, name: "王五", age: 30, gender: "male", status: "inactive", createTime: "2023-01-03" },
  { id: 4, name: "赵六", age: 35, gender: "female", status: "active", createTime: "2023-01-04" },
  { id: 5, name: "钱七", age: 40, gender: "male", status: "inactive", createTime: "2023-01-05" }
])

// 总数据量
const total = ref(100)

// 分页参数
const querySize = ref({
  pageNum: 1,
  pageSize: 10
})

// 选中的行
const selectedRows = ref([])
const selectedRow = ref(null)

// 对话框状态
const dialogVisible = ref(false)
const detailDialogVisible = ref(false)
const dialogTitle = ref("新增用户")

// 表单数据
const formData = ref({
  id: null,
  name: "",
  age: 0,
  gender: "male",
  status: "active",
  createTime: ""
})

// 表格列配置
const columns = ref([
  { prop: "name", label: "姓名" },
  { prop: "age", label: "年龄", isEditing: true },
  { prop: "gender", label: "性别" },
  { prop: "status", label: "状态" },
  { prop: "createTime", label: "创建时间" }
])

// 搜索配置（5个不同类型的搜索条件）
const queryConfig = ref([
  {
    type: "el-input",
    prop: "name",
    label: "姓名",
    props: {
      placeholder: "请输入姓名",
      clearable: true,
      showWordLimit: true
    },
    width: "220px"
  },
  {
    type: "el-input-number",
    prop: "age",
    label: "年龄",
    props: {
      min: 0,
      max: 150,
      step: 1
    },
    width: "150px"
  },
  {
    type: "el-select",
    prop: "gender",
    label: "性别",
    props: {
      placeholder: "请选择性别",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" }
      ],
      clearable: true
    },
    width: "150px"
  },
  {
    type: "el-select",
    prop: "status",
    label: "状态",
    props: {
      placeholder: "请选择状态",
      options: [
        { label: "启用", value: "active" },
        { label: "禁用", value: "inactive" }
      ],
      clearable: true
    },
    width: "150px"
  },
  {
    type: "el-date-picker",
    prop: "createTime",
    label: "创建时间",
    props: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
      placeholder: "请选择创建时间"
    },
    width: "200px"
  }
])

// 操作按钮配置
const actions = ref([
  {
    label: "编辑",
    type: "primary",
    size: "small",
    icon: Edit,
    handle: row => handleEdit(row)
  },
  {
    label: "详情",
    type: "info",
    size: "small",
    icon: View,
    handle: row => handleView(row)
  },
  {
    label: "删除",
    type: "danger",
    size: "small",
    icon: Delete,
    handle: row => handleDelete(row)
  }
])

// 处理搜索
const handleSearch = params => {
  console.log("搜索参数:", params)
  // 模拟搜索逻辑
  setTimeout(() => {
    console.log("搜索完成")
  }, 500)
}

// 处理重置
const handleReset = formData => {
  console.log("重置后的表单数据:", formData)
  // 模拟重置逻辑
}

// 处理分页变化
const handlePageChange = page => {
  console.log("页码变化:", page)
  querySize.value = page
  // 模拟分页加载数据
}

// 处理选择变化
const handleSelectionChange = selection => {
  selectedRows.value = selection
  console.log("选中的行:", selection)
}

// 处理新增
const handleAdd = () => {
  dialogTitle.value = "新增用户"
  formData.value = {
    id: null,
    name: "",
    age: 0,
    gender: "male",
    status: "active",
    createTime: new Date().toISOString().split("T")[0]
  }
  dialogVisible.value = true
}

// 处理编辑
const handleEdit = row => {
  dialogTitle.value = "编辑用户"
  formData.value = { ...row }
  dialogVisible.value = true
}

// 处理查看详情
const handleView = row => {
  selectedRow.value = row
  detailDialogVisible.value = true
}

// 处理删除
const handleDelete = row => {
  ElMessageBox.confirm("确定要删除该用户吗？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      // 模拟删除逻辑
      const index = tableData.value.findIndex(item => item.id === row.id)
      if (index !== -1) {
        tableData.value.splice(index, 1)
        ElMessage.success("删除成功")
      }
    })
    .catch(() => {
      // 取消删除
    })
}

// 处理批量删除
const handleBatchDelete = () => {
  ElMessageBox.confirm(`确定要删除选中的 ${selectedRows.value.length} 个用户吗？`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      // 模拟批量删除逻辑
      const ids = selectedRows.value.map(row => row.id)
      tableData.value = tableData.value.filter(item => !ids.includes(item.id))
      selectedRows.value = []
      ElMessage.success("批量删除成功")
    })
    .catch(() => {
      // 取消删除
    })
}

// 处理保存
const handleSave = () => {
  if (formData.value.id) {
    // 编辑
    const index = tableData.value.findIndex(item => item.id === formData.value.id)
    if (index !== -1) {
      tableData.value[index] = { ...formData.value }
      ElMessage.success("编辑成功")
    }
  } else {
    // 新增
    const newId = Math.max(...tableData.value.map(item => item.id)) + 1
    const newUser = {
      ...formData.value,
      id: newId
    }
    tableData.value.unshift(newUser)
    ElMessage.success("新增成功")
  }
  dialogVisible.value = false
}

// 导入需要的组件
import { ElMessage, ElMessageBox } from "element-plus"
</script>

<style scoped>
.comprehensive-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #303133;
  margin-bottom: 10px;
}

h3 {
  color: #606266;
  margin-bottom: 30px;
  font-weight: normal;
}
</style>
