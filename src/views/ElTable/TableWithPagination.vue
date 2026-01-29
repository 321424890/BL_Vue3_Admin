<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">带分页的表格</h1>
        <p class="page-description">基于 BasicTable 组件实现的带分页功能的表格，支持分页控制和页码变化事件</p>
      </div>
    </div>

    <!-- 带分页的表格 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带分页的表格</h4>
          <p>使用分页组件来控制表格数据的显示，支持页码和每页大小的调整</p>
          <ElBasicTable
            :table-data="paginatedData"
            :columns="columns"
            :show-pagination="true"
            :total="total"
            @page-change="handlePageChange"
            border
            stripe
          />
          <div class="pagination-info" style="margin-top: 12px; text-align: right">
            <p>当前页码：{{ currentPage }}，每页大小：{{ pageSize }}，总数据量：{{ total }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { ElBasicTable } from "crystal-ui"

// 模拟总数据
const totalData = ref([
  { id: 1, name: "张三", age: 20, address: "北京市" },
  { id: 2, name: "李四", age: 25, address: "上海市" },
  { id: 3, name: "王五", age: 30, address: "广州市" },
  { id: 4, name: "赵六", age: 35, address: "深圳市" },
  { id: 5, name: "钱七", age: 40, address: "杭州市" },
  { id: 6, name: "孙八", age: 45, address: "南京市" },
  { id: 7, name: "周九", age: 50, address: "武汉市" },
  { id: 8, name: "吴十", age: 55, address: "成都市" },
  { id: 9, name: "郑十一", age: 60, address: "重庆市" },
  { id: 10, name: "王十二", age: 65, address: "西安市" },
  { id: 11, name: "冯十三", age: 70, address: "天津市" },
  { id: 12, name: "陈十四", age: 75, address: "苏州市" }
])

const columns = ref([
  { prop: "name", label: "姓名", width: "120px" },
  { prop: "age", label: "年龄", width: "80px" },
  { prop: "address", label: "地址" }
])

const total = ref(totalData.value.length)
const currentPage = ref(1)
const pageSize = ref(5)

// 计算当前页的数据
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return totalData.value.slice(startIndex, endIndex)
})

// 处理分页变化
const handlePageChange = (page: { pageNo: number; pageSize: number }) => {
  console.log("页码变化:", page)
  currentPage.value = page.pageNo
  pageSize.value = page.pageSize
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

/* 分页信息样式 */
.pagination-info {
  color: #606266;
  font-size: 14px;
}

.pagination-info p {
  margin: 0;
}
</style>
