<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">带单选功能的表格</h1>
        <p class="page-description">基于 BasicTable 组件实现的带单选功能的表格，支持单选模式和单选事件</p>
      </div>
    </div>

    <!-- 带单选功能的表格 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带单选功能的表格</h4>
          <p>点击表格左侧的单选框或直接点击行可以选择单行数据</p>
          <ElBasicTable
            :table-data="tableData"
            :columns="columns"
            :single-select="true"
            :selected-row="selectedRow"
            @single-select-change="handleSingleSelectChange"
            border
            stripe
          />
          <div class="selection-result" v-if="selectedRow">
            <p>当前选中项：</p>
            <el-card shadow="hover" class="mt-2">
              <div class="selected-info">
                <p><span class="label">姓名：</span>{{ selectedRow.name }}</p>
                <p><span class="label">年龄：</span>{{ selectedRow.age }}</p>
                <p><span class="label">地址：</span>{{ selectedRow.address }}</p>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElBasicTable } from "crystal-ui"

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

const selectedRow = ref(null)

const handleSingleSelectChange = (row: any) => {
  console.log("选中的行:", row)
  selectedRow.value = row
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

.mt-2 {
  margin-top: 8px;
}

/* 选中信息样式 */
.selected-info {
  line-height: 1.6;
}

.label {
  font-weight: 500;
  color: #303133;
  margin-right: 8px;
}
</style>
