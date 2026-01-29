<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalTable 带自定义列表格示例</h1>
        <p class="page-description">
          基于 Element Plus 表格组件封装的增强型表格组件，提供了自定义列功能，允许用户自定义列的显示内容
        </p>
      </div>
    </div>

    <!-- 带自定义列表格示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带自定义列表格</h4>
          <p>这是一个带自定义列表格示例，展示了表格的自定义列功能，允许用户通过插槽自定义列的显示内容。</p>
          <CrystalTable :table-data="tableData" :columns="columns" border stripe>
            <!-- 自定义姓名列 -->
            <template #name="{ row }">
              <div class="custom-name">
                <el-avatar :size="32" :src="getAvatarUrl(row.name)"></el-avatar>
                <span class="name-text">{{ row.name }}</span>
              </div>
            </template>

            <!-- 自定义年龄列 -->
            <template #age="{ row }">
              <el-tag :type="getAgeTagType(row.age)"> {{ row.age }}岁 </el-tag>
            </template>

            <!-- 自定义地址列 -->
            <template #address="{ row }">
              <el-tooltip :content="row.address" placement="top">
                <div class="custom-address">{{ row.address }}</div>
              </el-tooltip>
            </template>

            <!-- 自定义邮箱列 -->
            <template #email="{ row }">
              <el-link :href="`mailto:${row.email}`" target="_blank">{{ row.email }}</el-link>
            </template>

            <!-- 自定义状态列 -->
            <template #status="{ row }">
              <el-switch v-model="row.status" :disabled="true" />
            </template>
          </CrystalTable>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalTable } from "crystal-ui"

// 表格数据
const tableData = ref([
  { id: 1, name: "张三", age: 20, address: "北京市朝阳区", email: "zhangsan@example.com", status: true },
  { id: 2, name: "李四", age: 25, address: "上海市浦东新区", email: "lisi@example.com", status: true },
  { id: 3, name: "王五", age: 30, address: "广州市天河区", email: "wangwu@example.com", status: false },
  { id: 4, name: "赵六", age: 35, address: "深圳市南山区", email: "zhaoliu@example.com", status: true },
  { id: 5, name: "孙七", age: 40, address: "杭州市西湖区", email: "sunqi@example.com", status: false }
])

// 表格列配置
const columns = ref([
  { prop: "id", label: "ID", width: "80", align: "center" },
  { prop: "name", label: "姓名", width: "180", align: "center" },
  { prop: "age", label: "年龄", width: "100", align: "center" },
  { prop: "address", label: "地址", minWidth: "150", align: "center" },
  { prop: "email", label: "邮箱", minWidth: "200", align: "center" },
  { prop: "status", label: "状态", width: "100", align: "center" }
])

// 获取头像URL
const getAvatarUrl = (name: string) => {
  // 使用首字母作为头像
  const initial = name.charAt(0).toUpperCase()
  return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff`
}

// 获取年龄标签类型
const getAgeTagType = (age: number) => {
  if (age < 18) return "danger"
  if (age < 30) return "success"
  if (age < 40) return "warning"
  return "info"
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

/* 自定义姓名样式 */
.custom-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-text {
  font-weight: 500;
}

/* 自定义地址样式 */
.custom-address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style>
