<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">带自定义列的表格</h1>
        <p class="page-description">基于 BasicTable 组件实现的带自定义列功能的表格，支持使用插槽自定义列内容</p>
      </div>
    </div>

    <!-- 带自定义列的表格 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带自定义列的表格</h4>
          <p>使用插槽来自定义列的显示内容，如颜色、标签、按钮等</p>
          <ElBasicTable :table-data="tableData" :columns="columns" border stripe>
            <!-- 自定义姓名列 -->
            <template #name="{ row }">
              <span class="name-text">{{ row.name }}</span>
              <el-tag size="small" class="ml-2" :type="getTagType(row.age)">
                {{ row.age > 30 ? "成年人" : "年轻人" }}
              </el-tag>
            </template>

            <!-- 自定义年龄列 -->
            <template #age="{ row }">
              <el-progress
                :percentage="(row.age / 100) * 100"
                :stroke-width="8"
                :color="getProgressColor(row.age)"
                :show-text="false"
              />
              <span class="age-text ml-2">{{ row.age }}岁</span>
            </template>

            <!-- 自定义地址列 -->
            <template #address="{ row }">
              <el-button type="primary" size="small" @click="handleAddressClick(row)">
                {{ row.address }}
              </el-button>
            </template>
          </ElBasicTable>
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
  { prop: "name", label: "姓名", width: "200px" },
  { prop: "age", label: "年龄", width: "250px" },
  { prop: "address", label: "地址" }
])

// 根据年龄获取标签类型
const getTagType = (age: number) => {
  if (age < 25) return "success"
  if (age < 35) return "warning"
  return "danger"
}

// 根据年龄获取进度条颜色
const getProgressColor = (age: number) => {
  if (age < 25) return "#67c23a"
  if (age < 35) return "#e6a23c"
  return "#f56c6c"
}

// 处理地址点击事件
const handleAddressClick = (row: any) => {
  console.log("点击了地址:", row.address)
  // 这里可以添加具体的处理逻辑，如打开地图等
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

/* 自定义列样式 */
.name-text {
  font-weight: 500;
  color: #303133;
}

.age-text {
  font-weight: 500;
  color: #303133;
}

.ml-2 {
  margin-left: 8px;
}

/* 进度条容器样式 */
:deep(.el-progress) {
  display: inline-block;
  vertical-align: middle;
}
</style>
