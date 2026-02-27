<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalTable 带选择功能表格示例</h1>
        <p class="page-description">基于 Element Plus 表格组件封装的增强型表格组件，提供了多选功能，允许用户选择多行数据</p>
      </div>
    </div>

    <!-- 带选择功能的表格示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带选择功能的表格</h4>
          <p>这是一个带选择功能的表格示例，展示了表格的多选功能，允许用户选择多行数据并执行批量操作。</p>
          <div class="tool-bar">
            <el-button type="primary" @click="handleBatchAction" :disabled="selectedRows.length === 0">
              批量操作 ({{ selectedRows.length }})
            </el-button>
            <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRows.length === 0">
              批量删除 ({{ selectedRows.length }})
            </el-button>
          </div>
          <CrystalTable
            :table-data="tableData"
            :columns="columns"
            :show-selection="true"
            :selection-type="'selection'"
            :show-pagination="true"
            :total="total"
            @selection-change="handleSelectionChange"
            @page-change="handlePageChange"
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
import { CrystalTable } from "crystalplus-ui"
import { ElMessage } from "element-plus"

// 表格数据
const tableData = ref([
  { id: 1, name: "张三", age: 20, address: "北京市朝阳区", email: "zhangsan@example.com" },
  { id: 2, name: "李四", age: 25, address: "上海市浦东新区", email: "lisi@example.com" },
  { id: 3, name: "王五", age: 30, address: "广州市天河区", email: "wangwu@example.com" },
  { id: 4, name: "赵六", age: 35, address: "深圳市南山区", email: "zhaoliu@example.com" },
  { id: 5, name: "孙七", age: 40, address: "杭州市西湖区", email: "sunqi@example.com" }
])

// 总数据量
const total = ref(100)

// 选中的行
const selectedRows = ref([])

// 表格列配置
const columns = ref([
  { prop: "id", label: "ID", width: "80", align: "center" },
  { prop: "name", label: "姓名", width: "120", align: "center" },
  { prop: "age", label: "年龄", width: "80", align: "center" },
  { prop: "address", label: "地址", minWidth: "150", align: "center" },
  { prop: "email", label: "邮箱", minWidth: "200", align: "center" }
])

// 选择变化事件
const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection
  console.log("选中的行:", selection)
}

// 批量操作按钮点击事件
const handleBatchAction = () => {
  if (selectedRows.value.length > 0) {
    const selectedIds = selectedRows.value.map(row => row.id)
    ElMessage.success(`批量操作：${selectedIds.join(", ")}`)
    console.log("批量操作:", selectedIds)
  }
}

// 批量删除按钮点击事件
const handleBatchDelete = () => {
  if (selectedRows.value.length > 0) {
    const selectedIds = selectedRows.value.map(row => row.id)
    ElMessage.warning(`批量删除：${selectedIds.join(", ")}`)
    console.log("批量删除:", selectedIds)
    // 在这里可以实现批量删除逻辑
  }
}

// 分页变化事件
const handlePageChange = (page: { pageNo: number; pageSize: number }) => {
  console.log("页码变化:", page)
  // 在这里可以根据页码和每页大小获取新的数据
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

/* 工具栏样式 */
.tool-bar {
  margin-bottom: 16px;
  display: flex;
  gap: 10px;
}
</style>
