<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalButton 组件</h1>
        <p class="page-description">基于 Element Plus 封装的增强型按钮组件，支持渐变、阴影、涟漪、玻璃态等多种视觉效果</p>
      </div>
    </div>

    <!-- 基础按钮类型 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>默认按钮</h4>
          <CrystalButton :loading="loading">默认按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>主要按钮</h4>
          <CrystalButton type="primary">主要按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>成功按钮</h4>
          <CrystalButton type="success">成功按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>警告按钮</h4>
          <CrystalButton type="warning">警告按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>危险按钮</h4>
          <CrystalButton type="danger">危险按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>信息按钮</h4>
          <CrystalButton type="info">信息按钮</CrystalButton>
        </div>
      </el-col>
    </el-row>

    <!-- 按钮尺寸 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>大型按钮</h4>
          <CrystalButton size="large" type="primary">大型按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>默认尺寸</h4>
          <CrystalButton type="primary">默认尺寸</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>小型按钮</h4>
          <CrystalButton size="small" type="primary">小型按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>禁用状态</h4>
          <CrystalButton disabled type="primary">禁用按钮</CrystalButton>
        </div>
      </el-col>
    </el-row>

    <!-- 按钮状态 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>朴素按钮</h4>
          <CrystalButton plain type="primary">朴素按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>圆角按钮</h4>
          <CrystalButton round type="primary">圆角按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>圆形按钮</h4>
          <CrystalButton circle type="primary" icon="Search" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>加载状态</h4>
          <CrystalButton loading type="primary">加载中</CrystalButton>
        </div>
      </el-col>
    </el-row>

    <!-- 渐变按钮和圆角控制 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>基础渐变效果</h4>
          <CrystalButton gradient>渐变按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>自定义渐变颜色</h4>
          <CrystalButton gradient gradient-from="#ff6b6b" gradient-to="#4ecdc4">自定义渐变</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>渐变+Element Plus类型</h4>
          <CrystalButton gradient gradient-from="#ff9a9e" gradient-to="#fad0c4" type="primary">渐变主要按钮</CrystalButton>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>基础圆角</h4>
          <CrystalButton border-radius="8px">圆角按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>椭圆圆角</h4>
          <CrystalButton border-radius="10px 30px">椭圆圆角</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>渐变+自定义圆角</h4>
          <CrystalButton gradient border-radius="16px">渐变圆角按钮</CrystalButton>
        </div>
      </el-col>
    </el-row>

    <!-- 结合Element Plus原生属性 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>渐变+尺寸</h4>
          <CrystalButton gradient size="large">大尺寸渐变按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>渐变+朴素样式</h4>
          <CrystalButton gradient plain type="success">朴素渐变按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>渐变+图标</h4>
          <CrystalButton gradient icon="Search">搜索</CrystalButton>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>禁用渐变按钮</h4>
          <CrystalButton gradient disabled>禁用渐变按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>与Element Plus round属性结合</h4>
          <CrystalButton gradient round>渐变圆形按钮</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>点击事件</h4>
          <CrystalButton type="primary" @click="handleClick">点击我</CrystalButton>
        </div>
      </el-col>
    </el-row>

    <!-- 点击和回车事件 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>点击和回车事件</h4>
          <CrystalButton type="primary" @click="handleAction" @keyup.enter="handleAction" tabindex="0">
            点击或回车触发
          </CrystalButton>
          <p style="margin-top: 10px; color: #666; font-size: 14px">提示：点击按钮或按Tab键使按钮获得焦点后按回车键</p>
        </div>
      </el-col>
    </el-row>

    <!-- 图标按钮和加载状态 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>图标按钮</h4>
          <CrystalButton icon="Search">搜索</CrystalButton>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>圆形图标按钮</h4>
          <CrystalButton circle icon="Search" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>加载中按钮</h4>
          <CrystalButton :loading="loading" type="primary">加载中</CrystalButton>
          <el-button @click="loading = !loading" style="margin-left: 10px">切换加载状态</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 多个异步按钮示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>多个异步按钮示例</h4>
          <p style="margin-bottom: 16px; color: #666; font-size: 14px">
            演示多个按钮独立的异步加载状态管理，每个按钮都有自己的loading状态，互不影响
          </p>
          <div class="flex gap-4">
            <CrystalButton type="primary" :auto-loading="true" @async-click="(event, done) => handleAsyncOperation(1000, done)">
              异步操作 1s
            </CrystalButton>
            <CrystalButton type="success" :auto-loading="true" @async-click="(event, done) => handleAsyncOperation(2000, done)">
              异步操作 2s
            </CrystalButton>
            <CrystalButton type="warning" :auto-loading="true" @async-click="(event, done) => handleAsyncOperation(3000, done)">
              异步操作 3s
            </CrystalButton>
            <CrystalButton type="danger" :auto-loading="true" @async-click="(event, done) => handleAsyncOperation(1500, done)">
              异步操作 1.5s
            </CrystalButton>
            <CrystalButton type="info" :auto-loading="true" @async-click="(event, done) => handleAsyncOperation(2500, done)">
              异步操作 2.5s
            </CrystalButton>
          </div>
          <div style="margin-top: 16px; color: #666; font-size: 14px">
            <p>点击任意按钮，观察其独立的loading状态</p>
            <p>每个按钮的loading状态都是独立管理的，不会相互影响</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 点击节流示例 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>点击节流示例</h4>
          <p style="margin-bottom: 16px; color: #666; font-size: 14px">
            演示按钮的点击节流功能，防止用户在短时间内重复点击按钮，导致多次触发相同的操作
          </p>
          <div class="flex gap-4">
            <CrystalButton type="primary" :throttle="1000" @click="handleThrottleClick(1000)"> 1秒节流 </CrystalButton>
            <CrystalButton type="success" :throttle="2000" @click="handleThrottleClick(2000)"> 2秒节流 </CrystalButton>
            <CrystalButton type="warning" :throttle="3000" @click="handleThrottleClick(3000)"> 3秒节流 </CrystalButton>
            <CrystalButton
              type="danger"
              :auto-loading="true"
              :throttle="2000"
              @async-click="(event, done) => handleAsyncThrottleClick(2000, done)"
            >
              异步操作 + 2秒节流
            </CrystalButton>
          </div>
          <div style="margin-top: 16px; color: #666; font-size: 14px">
            <p>快速点击任意按钮，观察节流效果</p>
            <p>节流时间内重复点击不会触发多次操作</p>
            <p>异步操作按钮同时展示了loading状态管理和节流功能的结合使用</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 带图标的按钮和按钮组 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <div class="input-group">
          <h4>带图标的按钮</h4>
          <CrystalButton type="primary" icon="Edit">编辑</CrystalButton>
          <CrystalButton type="primary" icon="Edit" circle />
          <CrystalButton type="success" icon="Edit" circle />
          <CrystalButton type="success" icon="Check" circle />
          <CrystalButton type="info" icon="Message" circle />
          <CrystalButton type="warning" icon="Star" circle />
          <CrystalButton type="danger" icon="Search" circle />
        </div>
      </el-col>
    </el-row>

    <!-- 属性表格 -->
    <div class="input-group">
      <h4>组件属性</h4>
      <BasicTable :columns="columns" :table-data="tableData" border stripe />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// import { CrystalButton } from "@/components/CrystalButton"
import { CrystalButton } from "crystalplus-ui"

import BasicTable from "@/components/BasicTable/BasicTable.vue"
// import { ArrowRight } from "@element-plus/icons-vue"

// 表格列配置
const columns = [
  { prop: "name", label: "属性名", width: 200 },
  { prop: "type", label: "类型", width: 200 },
  { prop: "default", label: "默认值", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 }
]
const loading = ref(false)
// 表格数据
const tableData = [
  {
    name: "type",
    type: "string",
    default: "'default'",
    description: "按钮类型，可选值：primary、success、warning、danger、info、default"
  },
  { name: "size", type: "string", default: "'default'", description: "按钮尺寸，可选值：large、default、small" },
  { name: "plain", type: "boolean", default: "false", description: "是否为朴素按钮" },
  { name: "round", type: "boolean", default: "false", description: "是否为圆角按钮" },
  { name: "circle", type: "boolean", default: "false", description: "是否为圆形按钮" },
  { name: "loading", type: "boolean", default: "false", description: "是否加载中状态" },
  { name: "disabled", type: "boolean", default: "false", description: "是否禁用状态" },
  { name: "icon", type: "string", default: "''", description: "按钮图标" },
  { name: "autofocus", type: "boolean", default: "false", description: "是否自动获取焦点" },
  { name: "native-type", type: "string", default: "'button'", description: "原生 type 属性，可选值：button、submit、reset" },
  { name: "auto-insert-space", type: "boolean", default: "false", description: "自动在文本和图标之间插入空格" },
  { name: "tag", type: "string", default: "'button'", description: "自定义元素标签" },
  { name: "gradient", type: "boolean", default: "false", description: "是否启用芝加哥渐变效果" },
  { name: "gradientFrom", type: "string", default: "'#1890ff'", description: "渐变起始颜色" },
  { name: "gradientTo", type: "string", default: "'#52c41a'", description: "渐变结束颜色" },
  { name: "borderRadius", type: "string", default: "''", description: "自定义圆角（如：'8px'、'10px 20px'）" },
  { name: "autoLoading", type: "boolean", default: "false", description: "是否启用内置异步操作 loading 状态管理" },
  {
    name: "asyncClick",
    type: "function",
    default: "-",
    description: "当启用 autoLoading 时的异步点击事件，接收 (event, done) 参数"
  },
  {
    name: "throttle",
    type: "number",
    default: "0",
    description: "点击节流时间（毫秒），0 表示不启用节流"
  }
]

// 点击事件处理函数
const handleClick = () => {
  console.log("按钮被点击了！")
  alert("按钮被点击了！")
}

// 通用事件处理函数
const handleAction = () => {
  console.log("按钮被触发了！")
  alert("按钮被触发了！")
}

// 处理异步操作
const handleAsyncOperation = async (delay: number, done: () => void) => {
  console.log(`开始异步操作，延迟 ${delay}ms`)
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, delay))
    console.log(`异步操作完成，延迟 ${delay}ms`)
    // 可以在这里添加操作完成后的逻辑
  } catch (error) {
    console.error(`异步操作失败，延迟 ${delay}ms`, error)
  } finally {
    // 不管成功失败，都关闭loading状态
    done()
  }
}

// 处理节流点击事件
const handleThrottleClick = (milliseconds?: number) => {
  const seconds = milliseconds ? milliseconds / 1000 : 0
  console.log(`${new Date().toLocaleTimeString()}: 触发点击事件，节流时间 ${seconds}秒`)
}

// 处理异步节流点击事件
const handleAsyncThrottleClick = async (delay: number, done: () => void) => {
  console.log(`${new Date().toLocaleTimeString()}: 开始异步节流操作，延迟 ${delay}ms`)
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, delay))
    console.log(`${new Date().toLocaleTimeString()}: 异步节流操作完成，延迟 ${delay}ms`)
    // 可以在这里添加操作完成后的逻辑
  } catch (error) {
    console.error(`${new Date().toLocaleTimeString()}: 异步节流操作失败，延迟 ${delay}ms`, error)
  } finally {
    // 不管成功失败，都关闭loading状态
    done()
  }
}
</script>

<style scoped>
.pageWrap {
  padding: 20px;
}
:deep(.el-button.is-circle) {
  border-radius: 50%;
  padding: 8px;
  width: 32px;
  /* display: flex; */
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

/* 页面头部样式 */
.page-header {
  padding: 30px 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: #303133;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page-description {
  color: #606266;
  font-size: 16px;
  margin: 0;
}

/* 示例组样式 */
.input-group {
  width: 100%;
  margin-bottom: 24px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.input-group:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #e6f7ff;
}

.input-group h4 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.gap-4 {
  gap: 16px;
}
</style>
