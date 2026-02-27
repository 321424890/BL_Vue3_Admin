<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalTable 带可编辑行的表格示例</h1>
        <p class="page-description">
          基于 Element Plus 表格组件封装的增强型表格组件，提供了可编辑行功能，允许用户直接在表格中编辑数据
        </p>
      </div>
    </div>

    <!-- 带可编辑行的表格示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>带可编辑行的表格</h4>
          <p>这是一个带可编辑行的表格示例，展示了表格的可编辑行功能，允许用户直接在表格中编辑数据。</p>
          <CrystalTable :table-data="tableData" :columns="columns" border stripe>
            <!-- 自定义可编辑列 -->
            <template #name="{ row }">
              <el-input v-model="row.name" size="small" />
            </template>
            <template #age="{ row }">
              <el-input v-model.number="row.age" size="small" />
            </template>
            <template #address="{ row }">
              <el-input v-model="row.address" size="small" />
            </template>
            <template #email="{ row }">
              <el-input v-model="row.email" size="small" />
            </template>
          </CrystalTable>
          <div class="action-bar">
            <el-button type="primary" @click="handleSave">保存修改</el-button>
          </div>
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

// 表格列配置
const columns = ref([
  { prop: "id", label: "ID", width: "80", align: "center" },
  { prop: "name", label: "姓名", width: "120", align: "center" },
  { prop: "age", label: "年龄", width: "80", align: "center" },
  { prop: "address", label: "地址", minWidth: "150", align: "center" },
  { prop: "email", label: "邮箱", minWidth: "200", align: "center" }
])

// 保存修改按钮点击事件
const handleSave = () => {
  ElMessage.success("保存修改成功")
  console.log("保存修改:", tableData.value)
  // 在这里可以将修改后的数据保存到服务器
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

/* 操作栏样式 */
.action-bar {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 输入框样式 */
:deep(.el-input__wrapper) {
  box-shadow: none;
}
</style>
