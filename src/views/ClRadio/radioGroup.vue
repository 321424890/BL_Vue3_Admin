<template>
  <div class="datepicker-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalRadioGroup 组件</h1>
      <p class="demo-description">
        基于 Element Plus ElRadioGroup
        组件封装的增强版单选框组，在保留原组件全部功能的基础上，增加了点亮点功能、自定义颜色样式和更丰富的样式控制选项
      </p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-grid">
          <!-- 示例1: 基础单选框组 -->
          <div class="demo-card">
            <h4 class="card-title">基础单选框组</h4>
            <p class="card-desc">最基础的单选框组功能</p>
            <CrystalRadioGroup v-model="radioGroup1">
              <CrystalRadio label="选项1">选项1</CrystalRadio>
              <CrystalRadio label="选项2">选项2</CrystalRadio>
              <CrystalRadio label="选项3">选项3</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup1 }}</div>
          </div>

          <!-- 示例2: 垂直布局 -->
          <div class="demo-card">
            <h4 class="card-title">垂直布局</h4>
            <p class="card-desc">垂直排列的单选框组</p>
            <CrystalRadioGroup v-model="radioGroup2" direction="vertical">
              <CrystalRadio label="选项1">选项1</CrystalRadio>
              <CrystalRadio label="选项2">选项2</CrystalRadio>
              <CrystalRadio label="选项3">选项3</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup2 }}</div>
          </div>

          <!-- 示例3: 禁用状态 -->
          <div class="demo-card">
            <h4 class="card-title">禁用状态</h4>
            <p class="card-desc">禁用状态的单选框组</p>
            <CrystalRadioGroup v-model="radioGroup3">
              <CrystalRadio label="选项1" disabled>禁用的选项1</CrystalRadio>
              <CrystalRadio label="选项2">选项2</CrystalRadio>
              <CrystalRadio label="选项3">选项3</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup3 }}</div>
          </div>

          <!-- 示例4: 不同尺寸 -->
          <div class="demo-card">
            <h4 class="card-title">不同尺寸</h4>
            <p class="card-desc">支持多种尺寸的单选框组</p>
            <div class="size-demo">
              <CrystalRadioGroup v-model="radioGroup4" size="large">
                <CrystalRadio label="大尺寸">大尺寸</CrystalRadio>
                <CrystalRadio label="选项2">选项2</CrystalRadio>
              </CrystalRadioGroup>
              <CrystalRadioGroup v-model="radioGroup5" size="default">
                <CrystalRadio label="默认尺寸">默认尺寸</CrystalRadio>
                <CrystalRadio label="选项2">选项2</CrystalRadio>
              </CrystalRadioGroup>
              <CrystalRadioGroup v-model="radioGroup6" size="small">
                <CrystalRadio label="小尺寸">小尺寸</CrystalRadio>
                <CrystalRadio label="选项2">选项2</CrystalRadio>
              </CrystalRadioGroup>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">增强功能</h3>
        <div class="demo-grid">
          <!-- 示例5: 带点亮点的单选框组 -->
          <div class="demo-card">
            <h4 class="card-title">带点亮点的单选框组</h4>
            <p class="card-desc">启用点亮点效果</p>
            <CrystalRadioGroup v-model="radioGroup7">
              <CrystalRadio label="选项1" highlight>选项1 (带点亮点)</CrystalRadio>
              <CrystalRadio label="选项2" highlight>选项2 (带点亮点)</CrystalRadio>
              <CrystalRadio label="选项3">选项3 (普通)</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup7 }}</div>
          </div>

          <!-- 示例6: 自定义点亮点颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义点亮点颜色</h4>
            <p class="card-desc">设置点亮点的颜色</p>
            <CrystalRadioGroup v-model="radioGroup8">
              <CrystalRadio label="选项1" highlight highlight-color="#67c23a">绿色点亮点</CrystalRadio>
              <CrystalRadio label="选项2" highlight highlight-color="#F56C6C">红色点亮点</CrystalRadio>
              <CrystalRadio label="选项3" highlight highlight-color="#E6A23C">橙色点亮点</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup8 }}</div>
          </div>

          <!-- 示例7: 自定义单选框颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义单选框颜色</h4>
            <p class="card-desc">设置单选框的颜色</p>
            <CrystalRadioGroup v-model="radioGroup9">
              <CrystalRadio label="选项1" radio-color="#67c23a">绿色单选框</CrystalRadio>
              <CrystalRadio label="选项2" radio-color="#F56C6C">红色单选框</CrystalRadio>
              <CrystalRadio label="选项3" radio-color="#E6A23C">橙色单选框</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup9 }}</div>
          </div>

          <!-- 示例8: 自定义边框颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义边框颜色</h4>
            <p class="card-desc">设置边框的颜色</p>
            <CrystalRadioGroup v-model="radioGroup10">
              <CrystalRadio label="选项1" border border-color="#409EFF">蓝色边框</CrystalRadio>
              <CrystalRadio label="选项2" border border-color="#67c23a">绿色边框</CrystalRadio>
              <CrystalRadio label="选项3" border border-color="#F56C6C">红色边框</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup10 }}</div>
          </div>

          <!-- 示例9: 自定义字体颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义字体颜色</h4>
            <p class="card-desc">设置单选框文字的颜色</p>
            <CrystalRadioGroup v-model="radioGroup11">
              <CrystalRadio label="选项1" font-color="#409EFF">蓝色文字</CrystalRadio>
              <CrystalRadio label="选项2" font-color="#67c23a">绿色文字</CrystalRadio>
              <CrystalRadio label="选项3" font-color="#F56C6C">红色文字</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup11 }}</div>
          </div>

          <!-- 示例10: 自定义悬停颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义悬停颜色</h4>
            <p class="card-desc">设置鼠标悬停的颜色</p>
            <CrystalRadioGroup v-model="radioGroup12">
              <CrystalRadio label="选项1" hover-color="#409EFF">蓝色悬停</CrystalRadio>
              <CrystalRadio label="选项2" hover-color="#67c23a">绿色悬停</CrystalRadio>
              <CrystalRadio label="选项3" hover-color="#F56C6C">红色悬停</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup12 }}</div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">组合示例</h3>
        <div class="demo-grid">
          <!-- 示例11: 混合样式 -->
          <div class="demo-card">
            <h4 class="card-title">混合样式</h4>
            <p class="card-desc">多种增强功能组合使用</p>
            <CrystalRadioGroup v-model="radioGroup13">
              <CrystalRadio label="选项1" highlight highlight-color="#67c23a">绿色点亮点</CrystalRadio>
              <CrystalRadio label="选项2" radio-color="#E6A23C">橙色单选框</CrystalRadio>
              <CrystalRadio label="选项3" border border-color="#409EFF">蓝色边框</CrystalRadio>
              <CrystalRadio label="选项4" font-color="#F56C6C">红色文字</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup13 }}</div>
          </div>

          <!-- 示例12: 带边框的单选框组 -->
          <div class="demo-card">
            <h4 class="card-title">带边框的单选框组</h4>
            <p class="card-desc">所有单选框都带边框</p>
            <CrystalRadioGroup v-model="radioGroup14">
              <CrystalRadio label="选项1" border>选项1</CrystalRadio>
              <CrystalRadio label="选项2" border>选项2</CrystalRadio>
              <CrystalRadio label="选项3" border>选项3</CrystalRadio>
            </CrystalRadioGroup>
            <div class="value-display">选中的值: {{ radioGroup14 }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalRadioGroup 组件文档</h2>

      <div class="doc-section">
        <h3>支持的属性</h3>
        <BasicTable
          :table-data="propsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="600px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的事件</h3>
        <BasicTable
          :table-data="eventsTableData"
          :columns="eventsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio, CrystalRadioGroup } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 绑定值定义
const radioGroup1 = ref("选项1")
const radioGroup2 = ref("选项1")
const radioGroup3 = ref("选项2")
const radioGroup4 = ref("大尺寸")
const radioGroup5 = ref("默认尺寸")
const radioGroup6 = ref("小尺寸")
const radioGroup7 = ref("选项1")
const radioGroup8 = ref("选项1")
const radioGroup9 = ref("选项1")
const radioGroup10 = ref("选项1")
const radioGroup11 = ref("选项1")
const radioGroup12 = ref("选项1")
const radioGroup13 = ref("选项1")
const radioGroup14 = ref("选项1")

// 属性表格配置
const propsColumns = [
  {
    prop: "prop",
    label: "属性名",
    width: 200
  },
  {
    prop: "type",
    label: "类型",
    width: 200
  },
  {
    prop: "default",
    label: "默认值",
    width: 120
  },
  {
    prop: "required",
    label: "是否必填",
    width: 100,
    align: "center"
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 300
  }
]

// 属性表格数据
const propsTableData = [
  {
    prop: "v-model",
    type: "string | number | boolean",
    default: "",
    required: true,
    description: "绑定值"
  },
  {
    prop: "modelValue",
    type: "string | number | boolean",
    default: "",
    required: true,
    description: "绑定值的内部实现，与v-model同步"
  },
  {
    prop: "direction",
    type: "string",
    default: "horizontal",
    required: false,
    description: "排列方向，可选值: horizontal/vertical"
  },
  {
    prop: "size",
    type: "string",
    default: "default",
    required: false,
    description: "组件尺寸，可选值: large/default/small"
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否禁用"
  },
  {
    prop: "name",
    type: "string",
    default: "",
    required: false,
    description: "原生name属性"
  },
  {
    prop: "highlight",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否启用点亮点功能"
  },
  {
    prop: "highlight-color",
    type: "string",
    default: "#409EFF",
    required: false,
    description: "点亮点颜色"
  },
  {
    prop: "radio-color",
    type: "string",
    default: "",
    required: false,
    description: "单选框自定义颜色"
  },
  {
    prop: "border-color",
    type: "string",
    default: "",
    required: false,
    description: "边框自定义颜色"
  },
  {
    prop: "hover-color",
    type: "string",
    default: "#409EFF",
    required: false,
    description: "鼠标悬停颜色"
  },
  {
    prop: "font-color",
    type: "string",
    default: "",
    required: false,
    description: "自定义字体颜色"
  },
  {
    prop: "fill-color",
    type: "string",
    default: "",
    required: false,
    description: "填充颜色"
  }
]

// 事件表格配置
const eventsColumns = [
  {
    prop: "event",
    label: "事件名",
    width: 200
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 事件表格数据
const eventsTableData = [
  {
    event: "change",
    description: "绑定值变化时触发"
  },
  {
    event: "update:modelValue",
    description: "绑定值更新时触发"
  },
  {
    event: "highlight-change",
    description: "点亮点状态变化时触发"
  }
]
</script>

<style scoped>
/* 与 checkbox.vue 保持一致的样式，全屏布局 */
.datepicker-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.demo-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 10px;
  font-weight: 600;
}

.demo-description {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.demo-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
  font-weight: 500;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.demo-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.demo-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 10px;
}

.card-desc {
  color: #606266;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.value-display {
  margin-top: 15px;
  padding: 10px;
  background-color: #f0f2f5;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  word-break: break-all;
}

.size-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 组件文档样式 */
.component-docs {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  margin-top: 30px;
}

.component-docs h2 {
  font-size: 22px;
  color: #303133;
  margin-bottom: 20px;
  font-weight: 600;
}

.component-docs h3 {
  font-size: 18px;
  color: #303133;
  margin: 25px 0 15px 0;
  font-weight: 500;
}

.doc-section {
  margin-bottom: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .datepicker-demo-container {
    padding: 10px;
  }

  .demo-header {
    padding: 15px 10px;
  }

  .demo-title {
    font-size: 24px;
  }

  .demo-section {
    padding: 16px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .demo-card {
    padding: 16px;
  }

  .section-title {
    font-size: 16px;
  }

  .component-docs {
    padding: 16px;
  }
}
</style>
