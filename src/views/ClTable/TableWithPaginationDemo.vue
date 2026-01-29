<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalTable 带分页表格示例</h1>
        <p class="page-description">基于 Element Plus 表格组件封装的增强型表格组件，提供了分页功能，支持页码和每页大小的调整</p>
      </div>
    </div>

    <!-- 带分页的表格示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带分页的表格</h4>
          <p>这是一个带分页的表格示例，展示了表格的分页功能，支持页码和每页大小的调整，并显示总数据量。</p>
          <CrystalTable
            :table-data="tableData"
            :columns="columns"
            :show-pagination="true"
            :total="total"
            :query-size="querySize"
            @page-change="handlePageChange"
            border
            stripe
          />
          <div class="page-info">
            <p><strong>当前页码：</strong> {{ querySize.pageNum }}</p>
            <p><strong>每页大小：</strong> {{ querySize.pageSize }}</p>
            <p><strong>总数据量：</strong> {{ total }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { CrystalTable } from "crystal-ui"
import { ElMessage } from "element-plus"

// 模拟总数据量
const total = ref(100)

// 分页参数
const querySize = ref({
  pageNum: 1,
  pageSize: 10
})

// 表格数据（根据分页参数模拟）
const tableData = computed(() => {
  const startIndex = (querySize.value.pageNum - 1) * querySize.value.pageSize
  const endIndex = startIndex + querySize.value.pageSize
  return Array.from({ length: Math.min(querySize.value.pageSize, total.value - startIndex) }, (_, index) => {
    const id = startIndex + index + 1
    return {
      id,
      name: `用户${id}`,
      age: 20 + Math.floor(Math.random() * 30),
      address: `地址${id}`,
      email: `user${id}@example.com`
    }
  })
})

// 表格列配置
const columns = ref([
  { prop: "id", label: "ID", width: "80", align: "center" },
  { prop: "name", label: "姓名", width: "120", align: "center" },
  { prop: "age", label: "年龄", width: "80", align: "center" },
  { prop: "address", label: "地址", minWidth: "150", align: "center" },
  { prop: "email", label: "邮箱", minWidth: "200", align: "center" }
])

// 分页变化事件
const handlePageChange = (page: { pageNo: number; pageSize: number }) => {
  querySize.value = page
  ElMessage.success(`页码变化：第 ${page.pageNo} 页，每页 ${page.pageSize} 条`)
  console.log("页码变化:", page)
  // 在这里可以根据页码和每页大小从服务器获取新的数据
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

/* 分页信息样式 */
.page-info {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  display: flex;
  gap: 20px;
}

.page-info p {
  margin: 0;
  color: #303133;
}
</style>
