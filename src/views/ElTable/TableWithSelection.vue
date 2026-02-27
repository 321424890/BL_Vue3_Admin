<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">带选择功能的表格</h1>
        <p class="page-description">基于 BasicTable 组件实现的带多选功能的表格，支持选择列和选择事件</p>
      </div>
    </div>

    <!-- 带选择功能的表格 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带选择功能的表格</h4>
          <p>点击表格左侧的复选框可以选择行，支持多选</p>
          <ElBasicTable
            :table-data="tableData"
            :columns="columns"
            :show-selection="true"
            :selection-type="'selection'"
            @selection-change="handleSelectionChange"
            border
            stripe
          />
          <div class="selection-result" v-if="selectedRows.length > 0">
            <p>已选择 {{ selectedRows.length }} 项：</p>
            <el-tag size="small" v-for="row in selectedRows" :key="row.id" class="mr-2 mb-2">
              {{ row.name }}
            </el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElBasicTable } from "crystalplus-ui"

const tableData = ref([
  { id: 1, name: "张三", age: 20, address: "北京市" },
  { id: 2, name: "李四", age: 25, address: "上海市" },
  { id: 3, name: "王五", age: 30, address: "广州市" },
  { id: 4, name: "赵六", age: 35, address: "深圳市" },
  { id: 5, name: "钱七", age: 40, address: "杭州市" }
])

const columns = ref([
  { prop: "name", label: "姓名", width: "120px" },
  { prop: "age", label: "年龄", width: "80px" },
  { prop: "address", label: "地址" }
])

const selectedRows = ref<any[]>([])

const handleSelectionChange = (selection: any[]) => {
  console.log("选中的行:", selection)
  selectedRows.value = selection
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
}

/* 选择结果样式 */
.selection-result {
  margin-top: 16px;
  padding: 12px;
  background-color: #f0f9ff;
  border: 1px solid #e6f7ff;
  border-radius: 4px;
}

.selection-result p {
  margin-bottom: 8px;
  font-weight: 500;
  color: #303133;
}

.mr-2 {
  margin-right: 8px;
}

.mb-2 {
  margin-bottom: 8px;
}
</style>
