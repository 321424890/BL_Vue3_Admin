<template>
  <div class="crystal-select-complete-demo">
    <div class="demo-header">
      <h2>CrystalSelect 完整功能演示</h2>
      <p>一个干净、无错误的CrystalSelect组件使用示例集</p>
    </div>

    <div class="demo-grid">
      <!-- 1. 基础选择器 -->
      <div class="demo-card">
        <h3>基础选择</h3>
        <p class="demo-desc">标准的单选下拉选择器</p>
        <CrystalSelect
          v-model="basicValue"
          :options="basicOptions"
          placeholder="请选择"
          clearable
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <!-- 2. 带图标的选项 -->
      <div class="demo-card">
        <h3>图标支持</h3>
        <p class="demo-desc">选项前显示提示图标</p>
        <CrystalSelect
          v-model="iconValue"
          :options="iconOptions"
          placeholder="选择带图标的选项"
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <!-- 3. 多选模式 -->
      <div class="demo-card">
        <h3>多选功能</h3>
        <p class="demo-desc">可选择多个选项并以标签形式显示</p>
        <CrystalSelect
          v-model="multipleValue"
          :options="basicOptions"
          placeholder="可多选"
          multiple
          collapse-tags
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <!-- 4. 带描述的选项 -->
      <div class="demo-card">
        <h3>描述文本</h3>
        <p class="demo-desc">为选项添加详细描述信息</p>
        <CrystalSelect
          v-model="descValue"
          :options="descOptions"
          placeholder="选择带描述的选项"
          style="width: 100%"
        ></CrystalSelect>
      </div>

      <!-- 5. 自定义选项内容 -->
      <div class="demo-card">
        <h3>自定义选项渲染</h3>
        <p class="demo-desc">使用插槽完全自定义选项外观</p>
        <CrystalSelect v-model="customValue" :options="customOptions" placeholder="选择用户" style="width: 100%">
          <template #option="{ option }">
            <div class="custom-option-content">
              <div class="custom-avatar">{{ option?.name?.charAt(0) || "?" }}</div>
              <div class="custom-info">
                <div class="custom-name">{{ option?.name || "" }}</div>
                <div class="custom-meta">{{ option?.role || "" }}</div>
              </div>
            </div>
          </template>
        </CrystalSelect>
      </div>
      <!-- 6. 空状态自定义 -->
      <div class="demo-card">
        <h3>空状态与加载状态</h3>
        <p class="demo-desc">自定义无数据时的显示内容</p>
        <CrystalSelect
          v-model="emptyValue"
          :options="emptyOptions"
          :loading="isLoading"
          loading-text="正在加载..."
          placeholder="暂无选项"
          style="width: 100%"
        >
          <template #empty>
            <div class="empty-content">
              <span class="empty-icon">📭</span>
              <span>暂无可用选项</span>
              <el-button size="small" @click="loadData">加载数据</el-button>
            </div>
          </template>
        </CrystalSelect>
      </div>
      <!-- 7. 带颜色小圆的选项 -->
      <div class="demo-card">
        <h3>颜色小圆标记</h3>
        <p class="demo-desc">选项前显示带颜色的小圆标记</p>
        <CrystalSelect v-model="colorDotValue" :options="colorDotOptions" placeholder="选择带颜色小圆的选项" style="width: 100%">
          <template #option="{ option }">
            <div class="color-dot-option">
              <div class="color-dot" :style="{ backgroundColor: option.color }"></div>
              <span>{{ option.label }}</span>
            </div>
          </template>
        </CrystalSelect>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// import CrystalSelect from "@/components/CrystalSelect/index.vue"
import { CrystalSelect } from "crystal-ui"
// import "crystal-ui/index.css"
// 基础选项数据
const basicOptions = [
  { label: "选项一", value: "opt1" },
  { label: "选项二", value: "opt2" },
  { label: "选项三", value: "opt3" },
  { label: "禁用选项", value: "opt4", disabled: true },
  { label: "选项五", value: "opt5" }
]

// 带图标选项数据
// 图标支持选项
const iconOptions = [
  { label: "警告", value: "warning", prefixIcon: "el-icon-warning", iconColor: "#e6a23c" },
  { label: "文档", value: "document", prefixIcon: "el-icon-document", iconColor: "#409eff" },
  { label: "用户", value: "user", prefixIcon: "el-icon-user", iconColor: "#67c23a" },
  { label: "时钟", value: "timer", prefixIcon: "el-icon-timer", iconColor: "#909399" },
  { label: "成功", value: "success", prefixIcon: "el-icon-circle-check", iconColor: "#67c23a" },
  { label: "警告提示", value: "warning-brown", prefixIcon: "el-icon-circle-close", iconColor: "#9d6942" }
]

// 带描述选项数据
const descOptions = [
  { label: "基础版", value: "basic", description: "适合个人使用" },
  { label: "专业版", value: "pro", description: "适合团队协作" },
  { label: "企业版", value: "enterprise", description: "适合大型组织" }
]

// 自定义用户数据
const customOptions = [
  { name: "张三", role: "产品经理", value: "user1" },
  { name: "李四", role: "UI设计师", value: "user2" },
  { name: "王五", role: "前端开发", value: "user3" },
  { name: "赵六", role: "后端开发", value: "user4" }
]

// 带颜色小圆选项数据
const colorDotOptions = [
  { label: "成功状态", value: "success", color: "#67c23a" },
  { label: "警告状态", value: "warning", color: "#e6a23c" },
  { label: "危险状态", value: "danger", color: "#f56c6c" },
  { label: "信息状态", value: "info", color: "#409eff" },
  { label: "次要状态", value: "secondary", color: "#909399" },
  { label: "褐色状态", value: "brown", color: "#9d6942" }
]

// 响应式状态数据
const colorDotValue = ref("")
const basicValue = ref("")
const iconValue = ref("")
const multipleValue = ref<string[]>([])
const descValue = ref("")
const customValue = ref("")
const emptyValue = ref("")
const emptyOptions = ref([])
const isLoading = ref(false)

// 模拟加载数据函数
const loadData = () => {
  isLoading.value = true
  setTimeout(() => {
    emptyOptions.value = [
      { label: "新加载的选项1", value: "new1" },
      { label: "新加载的选项2", value: "new2" }
    ]
    isLoading.value = false
  }, 1500)
}
</script>

<style scoped>
.crystal-select-complete-demo {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
}

.demo-header h2 {
  color: #303133;
  margin-bottom: 10px;
  font-size: 24px;
}

.demo-header p {
  color: #606266;
  margin: 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.demo-card {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.demo-card h3 {
  color: #303133;
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 16px;
}

.demo-desc {
  color: #909399;
  font-size: 13px;
  margin-bottom: 15px;
  line-height: 1.4;
}

/* 自定义选项样式 */
.custom-option-content {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.custom-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: 500;
}

.custom-info {
  flex: 1;
}

.custom-name {
  font-weight: 500;
  color: #303133;
}

.custom-meta {
  font-size: 12px;
  color: #909399;
}

/* 空状态样式 */
.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  color: #909399;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.empty-content span {
  margin-bottom: 10px;
}

/* 颜色小圆样式 */
.color-dot-option {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}
</style>
