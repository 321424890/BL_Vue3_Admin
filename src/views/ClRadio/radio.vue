<template>
  <div class="datepicker-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalRadio 组件</h1>
      <p class="demo-description">
        基于 Element Plus ElRadio
        组件封装的增强版单选框，在保留原组件全部功能的基础上，增加了点亮点功能、自定义颜色样式和更丰富的样式控制选项
      </p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-grid">
          <!-- 示例1: 基础单选框 -->
          <div class="demo-card">
            <h4 class="card-title">基础单选框</h4>
            <p class="card-desc">最基础的单选框功能</p>
            <CrystalRadio v-model="checked1">默认单选框</CrystalRadio>
            <div class="value-display">选择状态: {{ checked1 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例2: 禁用状态 -->
          <div class="demo-card">
            <h4 class="card-title">禁用状态</h4>
            <p class="card-desc">禁用状态的单选框</p>
            <div>
              <CrystalRadio v-model="checked2" disabled>禁用的单选框</CrystalRadio>
              <CrystalRadio v-model="checked3" disabled>禁用且选中的单选框</CrystalRadio>
            </div>
            <div class="value-display">状态1: {{ checked2 ? "选中" : "未选中" }}, 状态2: {{ checked3 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例3: 边框样式 -->
          <div class="demo-card">
            <h4 class="card-title">边框样式</h4>
            <p class="card-desc">带边框的单选框</p>
            <CrystalRadio v-model="checked4" border>带边框单选框</CrystalRadio>
            <div class="value-display">选择状态: {{ checked4 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例4: 不同尺寸 -->
          <div class="demo-card">
            <h4 class="card-title">不同尺寸</h4>
            <p class="card-desc">支持多种尺寸的单选框</p>
            <div class="size-demo">
              <CrystalRadio v-model="checked5" size="large">大尺寸</CrystalRadio>
              <CrystalRadio v-model="checked6" size="default">默认尺寸</CrystalRadio>
              <CrystalRadio v-model="checked7" size="small">小尺寸</CrystalRadio>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">增强功能</h3>
        <div class="demo-grid">
          <!-- 示例5: 点亮点功能 -->
          <div class="demo-card">
            <h4 class="card-title">点亮点功能</h4>
            <p class="card-desc">启用点亮点效果</p>
            <CrystalRadio v-model="checked8" highlight>带点亮点的单选框</CrystalRadio>
            <div class="value-display">选择状态: {{ checked8 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例6: 自定义点亮点颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义点亮点颜色</h4>
            <p class="card-desc">设置点亮点的颜色</p>
            <CrystalRadio v-model="checked9" highlight highlight-color="#67c23a">绿色点亮点</CrystalRadio>
            <div class="value-display">选择状态: {{ checked9 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例7: 自定义单选框颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义单选框颜色</h4>
            <p class="card-desc">设置单选框的颜色</p>
            <CrystalRadio v-model="checked10" radio-color="#E6A23C">橙色单选框</CrystalRadio>
            <div class="value-display">选择状态: {{ checked10 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例8: 自定义边框颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义边框颜色</h4>
            <p class="card-desc">设置边框的颜色</p>
            <CrystalRadio v-model="checked11" border border-color="#409EFF">蓝色边框</CrystalRadio>
            <div class="value-display">选择状态: {{ checked11 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例9: 自定义字体颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义字体颜色</h4>
            <p class="card-desc">设置单选框文字的颜色</p>
            <CrystalRadio v-model="checked12" font-color="#F56C6C">红色文字</CrystalRadio>
            <div class="value-display">选择状态: {{ checked12 ? "选中" : "未选中" }}</div>
          </div>

          <!-- 示例10: 自定义悬停颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义悬停颜色</h4>
            <p class="card-desc">设置鼠标悬停的颜色</p>
            <CrystalRadio v-model="checked13" hover-color="#909399">灰色悬停效果</CrystalRadio>
            <div class="value-display">选择状态: {{ checked13 ? "选中" : "未选中" }}</div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">组合示例</h3>
        <div class="demo-grid">
          <!-- 示例11: 单选框组 -->
          <div class="demo-card">
            <h4 class="card-title">单选框组</h4>
            <p class="card-desc">多个单选框的组合使用</p>
            <el-radio-group v-model="radioGroup">
              <CrystalRadio label="选项1">选项1</CrystalRadio>
              <CrystalRadio label="选项2">选项2</CrystalRadio>
              <CrystalRadio label="选项3">选项3</CrystalRadio>
            </el-radio-group>
            <div class="value-display">选中的值: {{ radioGroup }}</div>
          </div>

          <!-- 示例12: 带点亮点的单选框组 -->
          <div class="demo-card">
            <h4 class="card-title">带点亮点的单选框组</h4>
            <p class="card-desc">与单选框组配合使用增强功能</p>
            <el-radio-group v-model="checkedValue">
              <CrystalRadio label="单选框1">单选框1</CrystalRadio>
              <CrystalRadio label="单选框2" highlight>单选框2 (带点亮点)</CrystalRadio>
              <CrystalRadio label="单选框3" radio-color="#E6A23C">单选框3 (自定义颜色)</CrystalRadio>
              <CrystalRadio label="单选框4" border border-color="#409EFF">单选框4 (自定义边框)</CrystalRadio>
            </el-radio-group>
            <div class="value-display">选择的值: {{ checkedValue }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalRadio 组件文档</h2>

      <div class="doc-section">
        <h3>支持的属性</h3>
        <BasicTable
          :table-data="propsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
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
          basic-height="200px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CrystalRadio } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 绑定值定义
const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
const checked7 = ref(false)
const checked8 = ref(false)
const checked9 = ref(false)
const checked10 = ref(false)
const checked11 = ref(false)
const checked12 = ref(false)
const checked13 = ref(false)
const radioGroup = ref("选项1")
const checkedValue = ref("单选框1")

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
    type: "boolean",
    default: "false",
    required: true,
    description: "绑定值，选中状态为true，未选中为false"
  },
  {
    prop: "modelValue",
    type: "boolean",
    default: "false",
    required: true,
    description: "绑定值的内部实现，与v-model同步"
  },
  {
    prop: "label",
    type: "string | number | boolean",
    default: "",
    required: false,
    description: "选中状态的值，用于radio-group中"
  },
  {
    prop: "border",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示边框"
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否禁用"
  },
  {
    prop: "size",
    type: "string",
    default: "default",
    required: false,
    description: "组件尺寸，可选值: large/default/small"
  },
  {
    prop: "name",
    type: "string",
    default: "",
    required: false,
    description: "原生name属性"
  },
  {
    prop: "true-label",
    type: "string | number | boolean",
    default: "true",
    required: false,
    description: "选中时的值"
  },
  {
    prop: "false-label",
    type: "string | number | boolean",
    default: "false",
    required: false,
    description: "未选中时的值"
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
