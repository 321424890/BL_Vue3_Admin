<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalTable 带单选功能表格示例</h1>
        <p class="page-description">基于 Element Plus 表格组件封装的增强型表格组件，提供了单选功能，允许用户选择单行数据</p>
      </div>
    </div>

    <!-- 带单选功能的表格示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带单选功能的表格</h4>
          <p>这是一个带单选功能的表格示例，展示了表格的单选功能，允许用户选择单行数据并查看详情。</p>
          <div class="selected-info" v-if="selectedRow">
            <p><strong>当前选中：</strong> {{ selectedRow.name }} (ID: {{ selectedRow.id }})</p>
            <el-button type="info" @click="handleViewDetail">查看详情</el-button>
          </div>
          <CrystalTable
            :table-data="tableData"
            :columns="columns"
            :single-select="true"
            :selected-row="selectedRow"
            @single-select-change="handleSingleSelectChange"
            border
            stripe
          />
        </div>
      </el-col>
    </el-row>

    <!-- 详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="用户详情" width="500px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ selectedRow?.id }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ selectedRow?.name }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ selectedRow?.age }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ selectedRow?.address }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ selectedRow?.email }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalTable } from "crystal-ui"
import { ElMessage } from "element-plus"

// 表格数据
const tableData = ref([
  { id: 1, name: "张三", age: 20, address: "北京市朝阳区", email: "zhangsan@example.com" },
  { id: 2, name: "李四", age: 25, address: "上海市浦东新区", email: "lisi@example.com" },
  { id: 3, name: "王五", age: 30, address: "广州市天河区", email: "wangwu@example.com" },
  { id: 4, name: "赵六", age: 35, address: "深圳市南山区", email: "zhaoliu@example.com" },
  { id: 5, name: "孙七", age: 40, address: "杭州市西湖区", email: "sunqi@example.com" }
])

// 选中的行
const selectedRow = ref(null)

// 详情对话框可见性
const detailDialogVisible = ref(false)

// 表格列配置
const columns = ref([
  { prop: "id", label: "ID", width: "80", align: "center" },
  { prop: "name", label: "姓名", width: "120", align: "center" },
  { prop: "age", label: "年龄", width: "80", align: "center" },
  { prop: "address", label: "地址", minWidth: "150", align: "center" },
  { prop: "email", label: "邮箱", minWidth: "200", align: "center" }
])

// 单选变化事件
const handleSingleSelectChange = (row: any) => {
  selectedRow.value = row
  ElMessage.success(`选中用户：${row.name}`)
  console.log("选中的行:", row)
}

// 查看详情按钮点击事件
const handleViewDetail = () => {
  if (selectedRow.value) {
    detailDialogVisible.value = true
  }
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

/* 选中信息样式 */
.selected-info {
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-info p {
  margin: 0;
  color: #303133;
}
</style>
