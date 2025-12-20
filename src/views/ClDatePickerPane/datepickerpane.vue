<template>
  <div class="datepicker-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalDatePickerPane 组件</h1>
      <p class="demo-description">基于 Element Plus 封装的日期选择面板组件，提供丰富的日期选择功能</p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-grid">
          <!-- 示例1: 基础日期选择 -->
          <div class="demo-card">
            <h4 class="card-title">默认日期选择</h4>
            <p class="card-desc">最基础的日期选择功能</p>
            <CrystalDatePickerPane
              v-model="dateValue1"
              :model-value="dateValue1"
              type="date"
              placeholder="选择日期"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ dateValue1 }}</div>
          </div>

          <!-- 示例2: 日期时间选择 -->
          <div class="demo-card">
            <h4 class="card-title">日期时间选择</h4>
            <p class="card-desc">同时选择日期和时间</p>
            <CrystalDatePickerPane v-model="dateValue2" type="datetime" placeholder="选择日期时间" style="width: 240px" />
            <div class="value-display">选择的值: {{ dateValue2 }}</div>
          </div>

          <!-- 示例3: 月份选择 -->
          <div class="demo-card">
            <h4 class="card-title">月份选择</h4>
            <p class="card-desc">仅选择月份</p>
            <CrystalDatePickerPane v-model="dateValue3" type="month" placeholder="选择月份" style="width: 240px" />
            <div class="value-display">选择的值: {{ dateValue3 }}</div>
          </div>

          <!-- 示例4: 年份选择 -->
          <div class="demo-card">
            <h4 class="card-title">年份选择</h4>
            <p class="card-desc">仅选择年份</p>
            <CrystalDatePickerPane v-model="dateValue4" type="year" placeholder="选择年份" style="width: 240px" />
            <div class="value-display">选择的值: {{ dateValue4 }}</div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">日期范围选择</h3>
        <div class="demo-grid">
          <!-- 示例5: 日期范围选择 -->
          <div class="demo-card">
            <h4 class="card-title">基础日期范围</h4>
            <p class="card-desc">选择开始日期和结束日期</p>
            <CrystalDatePickerPane
              v-model="dateRange1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 400px"
            />
            <div class="value-display">选择的范围: {{ dateRange1 ? dateRange1[0] + " 至 " + dateRange1[1] : "未选择" }}</div>
          </div>

          <!-- 示例6: 日期时间范围选择 -->
          <div class="demo-card">
            <h4 class="card-title">日期时间范围</h4>
            <p class="card-desc">选择开始日期时间和结束日期时间</p>
            <CrystalDatePickerPane
              v-model="dateRange2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期时间"
              end-placeholder="结束日期时间"
              style="width: 400px"
            />
            <div class="value-display">选择的范围: {{ dateRange2 ? dateRange2[0] + " 至 " + dateRange2[1] : "未选择" }}</div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">高级功能</h3>
        <div class="demo-grid">
          <!-- 示例7: 带快捷选项的日期选择 -->
          <div class="demo-card">
            <h4 class="card-title">快捷选项</h4>
            <p class="card-desc">提供预设的快捷日期选项</p>
            <CrystalDatePickerPane
              v-model="dateValue5"
              type="date"
              placeholder="选择日期"
              :shortcuts="shortcuts"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ dateValue5 }}</div>
          </div>

          <!-- 示例8: 禁用特定日期 -->
          <div class="demo-card">
            <h4 class="card-title">禁用日期</h4>
            <p class="card-desc">禁用今天之后的日期</p>
            <CrystalDatePickerPane
              v-model="dateValue6"
              type="date"
              placeholder="只能选择今天及之前"
              :disabled-date="disabledDate"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ dateValue6 }}</div>
          </div>

          <!-- 示例9: 不同尺寸 -->
          <div class="demo-card">
            <h4 class="card-title">不同尺寸</h4>
            <p class="card-desc">提供多种尺寸选择</p>
            <div class="size-demo">
              <CrystalDatePickerPane
                v-model="dateValue7"
                type="date"
                placeholder="小尺寸"
                size="small"
                style="width: 180px; margin-right: 10px"
              />
              <CrystalDatePickerPane
                v-model="dateValue8"
                type="date"
                placeholder="默认尺寸"
                style="width: 200px; margin-right: 10px"
              />
              <CrystalDatePickerPane v-model="dateValue9" type="date" placeholder="大尺寸" size="large" style="width: 220px" />
            </div>
          </div>

          <!-- 示例10: 自定义格式 -->
          <div class="demo-card">
            <h4 class="card-title">自定义格式</h4>
            <p class="card-desc">自定义日期显示格式</p>
            <CrystalDatePickerPane
              v-model="dateValue10"
              type="date"
              placeholder="自定义格式"
              format="YYYY年MM月DD日"
              value-format="YYYY-MM-DD"
              style="width: 240px"
            />
            <div class="value-display">显示值: {{ dateValue10Display }}</div>
            <div class="value-display">实际值: {{ dateValue10 }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalDatePickerPane 组件文档</h2>

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
import { ref, computed } from "vue"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { CrystalDatePickerPane } from "crystal-ui"
console.log("CrystalDatePickerPane", CrystalDatePickerPane)

// 绑定的值
const dateValue1 = ref("")
const dateValue2 = ref("")
const dateValue3 = ref("")
const dateValue4 = ref("")
const dateRange1 = ref<Array<string>>([])
const dateRange2 = ref<Array<string>>([])
const dateValue5 = ref("")
const dateValue6 = ref("")
const dateValue7 = ref("")
const dateValue8 = ref("")
const dateValue9 = ref("")
const dateValue10 = ref("")

// 计算属性: 自定义格式显示值
const dateValue10Display = computed(() => {
  if (!dateValue10.value) return ""
  const date = new Date(dateValue10.value)
  return `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, "0")}月${String(date.getDate()).padStart(2, "0")}日`
})

// 快捷选项配置
const shortcuts = [
  {
    text: "今天",
    value: new Date()
  },
  {
    text: "昨天",
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    }
  },
  {
    text: "一周前",
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      return date
    }
  },
  {
    text: "一个月前",
    value: () => {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      return date
    }
  }
]

// 禁用日期函数
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

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
    type: "Date | string | Array",
    default: "undefined",
    required: true,
    description: "绑定值，根据type属性类型不同可为单个日期或日期范围数组"
  },
  {
    prop: "modelValue",
    type: "Date | string | Array",
    default: "undefined",
    required: true,
    description: "绑定值的内部实现，与v-model同步"
  },
  {
    prop: "type",
    type: "string",
    default: "date",
    required: false,
    description: "日期选择器类型，可选值: date/datetime/year/month/daterange/datetimerange/monthrange"
  },
  {
    prop: "format",
    type: "string",
    default: "YYYY-MM-DD",
    required: false,
    description: "显示的日期格式"
  },
  {
    prop: "value-format",
    type: "string",
    default: "YYYY-MM-DD",
    required: false,
    description: "绑定值的日期格式"
  },
  {
    prop: "placeholder",
    type: "string",
    default: "",
    required: false,
    description: "非范围选择时的占位文本"
  },
  {
    prop: "start-placeholder",
    type: "string",
    default: "",
    required: false,
    description: "范围选择时开始日期的占位文本"
  },
  {
    prop: "end-placeholder",
    type: "string",
    default: "",
    required: false,
    description: "范围选择时结束日期的占位文本"
  },
  {
    prop: "range-separator",
    type: "string",
    default: "至",
    required: false,
    description: "范围选择时的分隔符"
  },
  {
    prop: "size",
    type: "string",
    default: "default",
    required: false,
    description: "组件尺寸，可选值: large/default/small/mini"
  },
  {
    prop: "disabled",
    type: "boolean",
    default: false,
    required: false,
    description: "是否禁用"
  },
  {
    prop: "clearable",
    type: "boolean",
    default: true,
    required: false,
    description: "是否显示清除按钮"
  },
  {
    prop: "readonly",
    type: "boolean",
    default: false,
    required: false,
    description: "是否为只读"
  },
  {
    prop: "editable",
    type: "boolean",
    default: true,
    required: false,
    description: "文本框是否可输入"
  },
  {
    prop: "shortcuts",
    type: "Array<{text: string, value: Date | Function | string | string[]}>",
    default: "[]",
    required: false,
    description: "快捷选项，配置快捷日期选择"
  },
  {
    prop: "disabled-date",
    type: "Function",
    default: "() => false",
    required: false,
    description: "禁用日期的函数，参数为当前日期，返回boolean值"
  },
  {
    prop: "disabled-time",
    type: "Function",
    default: "undefined",
    required: false,
    description: "禁用时间的函数，返回禁用的小时、分钟、秒数数组"
  },
  {
    prop: "cell-class-name",
    type: "Function | string",
    default: "",
    required: false,
    description: "单元格的自定义类名"
  },
  {
    prop: "popper-class",
    type: "string",
    default: "",
    required: false,
    description: "自定义浮层类名"
  },
  {
    prop: "unlink-panels",
    type: "boolean",
    default: false,
    required: false,
    description: "在范围选择器中取消两个日期面板之间的联动"
  },
  {
    prop: "default-time",
    type: "Array<string>",
    default: "['00:00:00', '23:59:59']",
    required: false,
    description: "范围选择时选中日期所使用的当日内具体时刻"
  },
  {
    prop: "teleported",
    type: "boolean",
    default: true,
    required: false,
    description: "是否将弹层放置于body"
  },
  {
    prop: "prefix-icon",
    type: "string",
    default: "Date",
    required: false,
    description: "自定义前缀图标"
  },
  {
    prop: "clear-icon",
    type: "string",
    default: "CloseBold",
    required: false,
    description: "自定义清除图标"
  },
  {
    prop: "validate-event",
    type: "boolean",
    default: true,
    required: false,
    description: "是否触发表单验证"
  },
  {
    prop: "persistent",
    type: "boolean",
    default: true,
    required: false,
    description: "点击外部元素时是否关闭弹出层"
  }
]

// 事件表格配置
const eventsColumns = [
  {
    prop: "name",
    label: "事件名",
    width: 150
  },
  {
    prop: "params",
    label: "回调参数",
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
    name: "update:modelValue",
    params: "value: Date | string | Array",
    description: "v-model绑定值变化时触发"
  },
  {
    name: "change",
    params: "value: Date | string | Array",
    description: "当绑定值变化时触发的事件"
  },
  {
    name: "blur",
    params: "event: FocusEvent",
    description: "当输入框失去焦点时触发"
  },
  {
    name: "focus",
    params: "event: FocusEvent",
    description: "当输入框获得焦点时触发"
  },
  {
    name: "calendar-change",
    params: "value: Date | string | Array",
    description: "当日期面板日期变化时触发"
  },
  {
    name: "panel-change",
    params: "date: Date, mode: string, view: string",
    description: "当日期面板改变时触发"
  },
  {
    name: "visible-change",
    params: "visibility: boolean",
    description: "当日期选择器的下拉框显示/隐藏时触发"
  },
  {
    name: "clear",
    params: "无",
    description: "点击清除按钮时触发"
  },
  {
    name: "keydown",
    params: "event: KeyboardEvent",
    description: "按下键盘按键时触发"
  }
]
</script>

<style scoped>
.datepicker-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.demo-header {
  margin-bottom: 30px;
  text-align: center;
}

.demo-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.demo-description {
  font-size: 16px;
  color: #666;
}

.demo-section {
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 20px;
}

.demo-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
  transition: all 0.3s;
}

.demo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.card-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.value-display {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  word-break: break-all;
}

.size-demo {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.component-docs {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.component-docs h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.component-docs h3 {
  font-size: 18px;
  color: #333;
  margin: 25px 0 15px 0;
  font-weight: 500;
}

.doc-section {
  margin-bottom: 30px;
}
</style>
