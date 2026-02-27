<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalText 组件</h1>
        <p class="page-description">基于 Element Plus 封装的增强型文本组件，支持渐变文字、阴影、悬停效果等功能</p>
      </div>
    </div>

    <!-- 基础文本和样式 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>基础文本</h4>
          <CrystalText>普通文本内容</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>代码块文本</h4>
          <CrystalText code>const message = 'Hello World';</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>粗体文本</h4>
          <CrystalText font-weight="600">粗体文本内容</CrystalText>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>斜体文本</h4>
          <CrystalText font-style="italic">斜体文本内容</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>下划线文本</h4>
          <CrystalText text-decoration="underline">下划线文本内容</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>删除线文本</h4>
          <CrystalText text-decoration="line-through">删除线文本内容</CrystalText>
        </div>
      </el-col>
    </el-row>

    <!-- 类型文本 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>主要文本</h4>
          <CrystalText type="primary">主要文本内容</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>成功文本</h4>
          <CrystalText type="success">成功文本内容</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>警告文本</h4>
          <CrystalText type="warning">警告文本内容</CrystalText>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>危险文本</h4>
          <CrystalText type="danger">危险文本内容</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>信息文本</h4>
          <CrystalText type="info">信息文本内容</CrystalText>
        </div>
      </el-col>
    </el-row>

    <!-- 渐变文本 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>基础渐变</h4>
          <CrystalText gradient>基础渐变文字</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>自定义渐变</h4>
          <CrystalText gradient gradient-from="#ff6b6b" gradient-to="#4ecdc4"> 自定义渐变文字 </CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>渐变加粗</h4>
          <CrystalText gradient gradient-from="#ff6b6b" gradient-to="#4ecdc4" bold>渐变加粗文字</CrystalText>
        </div>
      </el-col>
    </el-row>

    <!-- 阴影文本 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>基础阴影</h4>
          <CrystalText shadow>基础阴影文字</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>自定义阴影</h4>
          <CrystalText shadow shadow-color="#ff6b6b">自定义阴影文字</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>阴影渐变</h4>
          <CrystalText shadow gradient gradient-from="#ff6b6b" gradient-to="#4ecdc4">阴影渐变文字</CrystalText>
        </div>
      </el-col>
    </el-row>

    <!-- 悬停效果 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>基础悬停</h4>
          <CrystalText hover-effect>鼠标悬停变色</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>自定义悬停颜色</h4>
          <CrystalText hover-effect hover-color="#ff6b6b">自定义悬停颜色</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>悬停阴影</h4>
          <CrystalText hover-effect hover-color="#ff6b6b" shadow>悬停阴影效果</CrystalText>
        </div>
      </el-col>
    </el-row>

    <!-- 文本大小 -->

    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>自定义字体</h4>
          <CrystalText font-family="'Arial', sans-serif" letter-spacing="2px">自定义字体和字间距</CrystalText>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <div class="input-group">
          <h4>行高和词间距</h4>
          <CrystalText line-height="2" word-spacing="5px">自定义行高和词间距</CrystalText>
        </div>
      </el-col>
    </el-row>

    <!-- 文本对齐 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>文本对齐</h4>
          <div style="width: 100%">
            <div style="width: 100%; text-align: left; margin-bottom: 10px">
              <CrystalText>左对齐文本</CrystalText>
            </div>
            <div style="width: 100%; text-align: center; margin-bottom: 10px">
              <CrystalText>居中对齐文本</CrystalText>
            </div>
            <div style="width: 100%; text-align: right">
              <CrystalText>右对齐文本</CrystalText>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 文本转换 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>文本转换</h4>
          <CrystalText text-transform="uppercase">uppercase</CrystalText>
          <br />
          <CrystalText text-transform="lowercase">LOWERCASE</CrystalText>
          <br />
          <CrystalText text-transform="capitalize">capitalize text</CrystalText>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>文本装饰</h4>
          <CrystalText text-decoration="overline">上划线文本</CrystalText>
          <br />
          <CrystalText text-decoration="line-through">删除线文本</CrystalText>
          <br />
          <CrystalText text-decoration="underline">下划线文本</CrystalText>
        </div>
      </el-col>
    </el-row>
    <!-- 文本溢出 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="input-group">
          <h4>文本溢出</h4>
          <CrystalText text-overflow="ellipsis" max-width="200px">
            这是一段很长的文本，用于测试文本溢出效果，当文本超出容器宽度时会显示省略号
          </CrystalText>
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

<script setup>
import { ref } from "vue"
// import { CrystalText } from "@/components/CrystalText"
import { CrystalText } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 响应式数据
const textValue = ref("")

// 表格列配置
const columns = [
  { prop: "name", label: "属性名", width: 200 },
  { prop: "type", label: "类型", width: 200 },
  { prop: "default", label: "默认值", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 }
]

// 表格数据
const tableData = [
  { name: "tag", type: "string", default: "'span'", description: "文本包裹标签" },
  { name: "type", type: "string", default: "''", description: "文本类型，可选值：primary、success、warning、danger、info" },
  { name: "size", type: "string", default: "''", description: "文本大小，可选值：xs、sm、base、lg" },
  { name: "font-weight", type: "string", default: "bold", description: "字体粗细，可选值：normal、bold" },
  { name: "font-style", type: "string", default: "italic", description: "是否斜体" },
  { name: "text-decoration", type: "string", default: "''", description: "文本装饰，可选值：underline、line-through" },
  { name: "text-decoration", type: "string", default: "line-through", description: "是否删除线" },
  { name: "code", type: "boolean", default: "false", description: "是否代码块样式" },
  { name: "copyable", type: "boolean", default: "false", description: "是否可复制" },
  { name: "gradient", type: "boolean", default: "false", description: "是否启用渐变文字效果" },
  { name: "gradientFrom", type: "string", default: "'#1890ff'", description: "渐变起始颜色" },
  { name: "gradientTo", type: "string", default: "'#52c41a'", description: "渐变结束颜色" },
  { name: "shadow", type: "boolean", default: "false", description: "是否启用文字阴影" },
  { name: "shadowColor", type: "string", default: "'#888888'", description: "阴影颜色" },
  { name: "hoverEffect", type: "boolean", default: "false", description: "是否启用悬停效果" },
  { name: "hoverColor", type: "string", default: "'#1890ff'", description: "悬停时的文本颜色" },
  { name: "fontFamily", type: "string", default: "''", description: "自定义字体" },
  { name: "lineHeight", type: "string", default: "''", description: "行高" },
  { name: "letterSpacing", type: "string", default: "''", description: "字间距" },
  { name: "wordSpacing", type: "string", default: "''", description: "词间距" },
  { name: "textDecoration", type: "string", default: "''", description: "文本装饰" },
  {
    name: "textTransform",
    type: "string",
    default: "'none'",
    description: "文本转换，可选值：none、capitalize、uppercase、lowercase"
  },
  { name: "textAlign", type: "string", default: "'left'", description: "文本对齐，可选值：left、center、right、justify" },
  { name: "textOverflow", type: "string", default: "'clip'", description: "文本溢出处理方式，可选值：clip、ellipsis" },
  { name: "maxWidth", type: "string", default: "''", description: "文本最大宽度（配合 ellipsis 使用）" }
]
</script>

<style scoped>
.pageWrap {
  padding: 20px;
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

/* 文本样式 */
.crystal-text {
  font-size: 16px;
  line-height: 1.5;
}
</style>
