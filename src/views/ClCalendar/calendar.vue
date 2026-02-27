<template>
  <div class="datepicker-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalCalendar 组件</h1>
      <p class="demo-description">
        基于 Element Plus 的 el-calendar 组件封装的日历组件，提供了选中高亮、可编辑等增强功能，同时保持了原组件的所有基本功能
      </p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-grid">
          <!-- 示例1: 基础日历 -->
          <div class="demo-card">
            <h4 class="card-title">基础日历</h4>
            <p class="card-desc">最基础的日历功能</p>
            <CrystalCalendar v-model="selectedDate" />
            <div class="value-display">选中日期: {{ selectedDate }}</div>
          </div>

          <!-- 示例2: 带边框的日历 -->
          <div class="demo-card">
            <h4 class="card-title">带边框的日历</h4>
            <p class="card-desc">显示边框的日历组件</p>
            <CrystalCalendar v-model="selectedDate2" :show-borders="true" />
            <div class="value-display">选中日期: {{ selectedDate2 }}</div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">选中高亮</h3>
        <div class="demo-grid">
          <!-- 示例3: 自定义选中颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义选中颜色</h4>
            <p class="card-desc">设置选中日期的颜色</p>
            <CrystalCalendar
              v-model="selectedDate3"
              :selected-dates="selectedDates"
              :selected-color="'#67C23A'"
              :hover-color="'red'"
            />
            <div class="value-display">选中日期: {{ selectedDate3 }}</div>
          </div>

          <!-- 示例4: 多日期选中 -->
          <div class="demo-card">
            <h4 class="card-title">多日期选中</h4>
            <p class="card-desc">同时选中多个日期</p>
            <CrystalCalendar v-model="selectedDate4" :selected-dates="multipleSelectedDates" :selected-color="'#F56C6C'" />
            <div class="value-display">选中日期数组: {{ multipleSelectedDates }}</div>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">自定义日期单元格</h3>
        <div class="demo-grid">
          <!-- 示例6: 自定义日期单元格 -->
          <div class="demo-card">
            <h4 class="card-title">自定义日期单元格</h4>
            <p class="card-desc">自定义日期单元格的显示内容</p>
            <CrystalCalendar v-model="selectedDate6">
              <template #带date-cell="{ data }">
                <div class="custom-date-cell">
                  <span>{{ data.day.split("-").slice(2).join("-") }}</span>
                  <el-tag v-if="isHoliday(data.day)" size="mini" type="danger">休</el-tag>
                  <el-tag v-if="isWorkday(data.day)" size="mini" type="success">班</el-tag>
                </div>
              </template>
            </CrystalCalendar>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="section-title">交互控制</h3>
        <div class="demo-grid">
          <!-- 示例7: 禁用日期 -->
          <div class="demo-card">
            <h4 class="card-title">禁用日期</h4>
            <p class="card-desc">禁用过去的日期</p>
            <CrystalCalendar v-model="selectedDate7" :disabled-date="disabledDate" />
          </div>

          <!-- 示例8: 只读模式 -->
          <div class="demo-card">
            <h4 class="card-title">只读模式</h4>
            <p class="card-desc">日历组件只读，不可选择</p>
            <CrystalCalendar v-model="selectedDate8" :readonly="true" />
          </div>
        </div>
      </div>
      <div class="demo-section">
        <h3 class="section-title">任务管理</h3>
        <div class="demo-grid">
          <!-- 示例9: 任务管理日历 -->
          <div class="demo-card">
            <h4 class="card-title">任务管理</h4>

            <CrystalCalendar v-model="selectedDate9" :selected-dates="taskSelectedDates" :selected-color="'#409EFF'">
              <template #date-cell="{ data }">
                <div class="custom-date-cell">
                  <span>{{ data.day.split("-").slice(2).join("-") }}</span>
                  <div class="task-list" v-if="tasks[data.day]">
                    <div
                      v-for="task in tasks[data.day]"
                      :key="task.id"
                      class="task-item"
                      @click="handleTaskClick(task, data.day)"
                    >
                      <span class="task-title">{{ task.title }}</span>
                      <span class="task-time">{{ task.startTime }} - {{ task.endTime }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </CrystalCalendar>
            <div class="value-display">选中日期: {{ selectedDay }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalCalendar 组件文档</h2>

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
import { ref, reactive } from "vue"
import { CrystalCalendar } from "crystalplus-ui"
import { ElTag, ElMessage, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton } from "element-plus"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 基础使用
const selectedDate = ref(new Date())
const selectedDate2 = ref(new Date())

// 选中高亮
const selectedDate3 = ref(new Date())
const selectedDates = ref(["2025-12-29", "2025-12-30", "2025-12-31"])

const selectedDate4 = ref(new Date())
const multipleSelectedDates = ref(["2025-12-10", "2025-12-15", "2025-12-20"])

// 可编辑模式
const selectedDate5 = ref(new Date())
const lastEditedDay = ref("")
const lastEditedContent = ref("")

const handleDayEdit = (day: string, content: string) => {
  console.log("编辑的日期:", day, "内容:", content)
  lastEditedDay.value = day
  lastEditedContent.value = content
}

// 自定义日期单元格
const selectedDate6 = ref(new Date())

// 模拟节假日数据
const holidays = ["2025-12-25", "2025-12-31", "2026-01-01"]
const workdays = ["2025-12-27", "2025-12-28"]

const isHoliday = (day: string) => {
  return holidays.includes(day)
}

const isWorkday = (day: string) => {
  return workdays.includes(day)
}

// 交互控制
const selectedDate7 = ref(new Date())

const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 8.64e7 // 禁用过去的日期
}

const selectedDate8 = ref(new Date())

// 任务管理
const selectedDate9 = ref(new Date())
const selectedDay = ref<string>("")
const taskSelectedDates = ref<string[]>([])
const dialogVisible = ref(false)

// 任务数据结构
interface Task {
  id: string
  title: string
  startTime: string
  endTime: string
  type: string
}

// 任务数据：按日期分组的任务列表
const tasks = reactive<Record<string, Task[]>>({
  "2025-12-23": [
    {
      id: "1",
      title: "项目会议",
      startTime: "09:00",
      endTime: "10:30",
      type: "work"
    }
  ],
  "2025-12-24": [
    {
      id: "2",
      title: "健身",
      startTime: "18:00",
      endTime: "19:00",
      type: "life"
    }
  ]
})

// 新任务表单
const newTask = reactive({
  title: "",
  startTime: "",
  endTime: "",
  type: "work"
})

// 处理日期点击
const handleDayClick = (day: string) => {
  selectedDay.value = day
  taskSelectedDates.value = [day]
}

// 打开任务弹窗
const openTaskDialog = () => {
  if (!selectedDate9.value) {
    ElMessage.warning("请先选择一个日期")
    return
  }
  dialogVisible.value = true
}

// 添加任务
const addTask = () => {
  if (!newTask.title.trim()) {
    ElMessage.warning("请输入任务标题")
    return
  }

  //   if (selectedDate9.value) {
  //     ElMessage.warning("请先选择一个日期")
  //     return
  //   }

  const taskId = Date.now().toString()
  const newTaskItem = {
    id: taskId,
    ...newTask
  }

  // 将任务添加到对应日期的任务列表中
  if (!tasks[selectedDay.value]) {
    tasks[selectedDay.value] = []
  }
  tasks[selectedDay.value].push(newTaskItem)

  // 重置表单
  Object.assign(newTask, { title: "", startTime: "", endTime: "", type: "work" })

  dialogVisible.value = false
  ElMessage.success("任务添加成功")
}

// 处理任务点击
const handleTaskClick = (task: Task, day: string) => {
  console.log("点击的任务:", task, "日期:", day)
  // 可以在这里打开任务详情
}

// 处理弹窗关闭
const handleClose = () => {
  dialogVisible.value = false
}

// 表格配置
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
    type: "Date | Date[] | string | string[] | null",
    default: "new Date()",
    required: true,
    description: "绑定值"
  },
  {
    prop: "type",
    type: "string",
    default: "date",
    required: false,
    description: "日期类型"
  },
  {
    prop: "format",
    type: "string",
    default: "YYYY-MM-DD",
    required: false,
    description: "日期格式"
  },
  {
    prop: "range-separator",
    type: "string",
    default: "-",
    required: false,
    description: "范围分隔符"
  },
  {
    prop: "start-placeholder",
    type: "string",
    default: "''",
    required: false,
    description: "范围选择器开始日期占位符"
  },
  {
    prop: "end-placeholder",
    type: "string",
    default: "''",
    required: false,
    description: "范围选择器结束日期占位符"
  },
  {
    prop: "first-day-of-week",
    type: "number",
    default: "1",
    required: false,
    description: "一周的第一天（1-7）"
  },
  {
    prop: "show-week-numbers",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示周数"
  },
  {
    prop: "show-borders",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示边框"
  },
  {
    prop: "size",
    type: "string",
    default: "default",
    required: false,
    description: "组件尺寸"
  },
  {
    prop: "border",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示边框"
  },
  {
    prop: "disabled-date",
    type: "(time: Date) => boolean",
    default: "-",
    required: false,
    description: "禁用日期函数"
  },
  {
    prop: "readonly",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否只读"
  },
  {
    prop: "clearable",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否可清空"
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否禁用"
  },
  {
    prop: "allow-input",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否允许手动输入"
  },
  {
    prop: "validate-event",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否触发验证"
  },
  {
    prop: "autofocus",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否自动聚焦"
  },
  {
    prop: "placeholder",
    type: "string",
    default: "''",
    required: false,
    description: "占位符文本"
  },
  {
    prop: "selection-mode",
    type: "string",
    default: "-",
    required: false,
    description: "选择模式"
  },
  {
    prop: "selected-dates",
    type: "Date[] | string[]",
    default: "[]",
    required: false,
    description: "选中的日期数组"
  },
  {
    prop: "tasks",
    type: "Record<string, Task[]>",
    default: "{}",
    required: false,
    description: "按日期分组的任务列表"
  },
  {
    prop: "color",
    type: "string",
    default: "''",
    required: false,
    description: "默认颜色"
  },
  {
    prop: "selected-color",
    type: "string",
    default: "#409EFF",
    required: false,
    description: "选中日期颜色"
  },
  {
    prop: "hover-color",
    type: "string",
    default: "#ECF5FF",
    required: false,
    description: "鼠标悬停颜色"
  },
  {
    prop: "text-color",
    type: "string",
    default: "''",
    required: false,
    description: "文本颜色"
  },
  {
    prop: "cell-class-name",
    type: "string | ((date: Date) => string)",
    default: "-",
    required: false,
    description: "单元格类名"
  },
  {
    prop: "popper-class",
    type: "string",
    default: "''",
    required: false,
    description: "弹出框类名"
  },
  {
    prop: "teleported",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否使用 teleport"
  },
  {
    prop: "input-size",
    type: "string",
    default: "-",
    required: false,
    description: "输入框尺寸"
  },
  {
    prop: "editable",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否可编辑"
  }
]

// 事件表格配置
const eventsColumns = [
  {
    prop: "event",
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
    event: "update:modelValue",
    description: "值改变时触发",
    params: "value: Date | Date[] | string | string[] | null"
  },
  {
    event: "change",
    description: "值改变时触发",
    params: "value: Date | Date[] | string | string[] | null"
  },
  {
    event: "blur",
    description: "失去焦点时触发",
    params: "event: FocusEvent"
  },
  {
    event: "focus",
    description: "获得焦点时触发",
    params: "event: FocusEvent"
  },
  {
    event: "calendar-change",
    description: "日历视图改变时触发",
    params: "value: Date | Date[] | string | string[] | null"
  },
  {
    event: "panel-change",
    description: "面板改变时触发",
    params: "date: Date, mode: string"
  },
  {
    event: "day-click",
    description: "日期点击时触发",
    params: "day: string"
  },
  {
    event: "task-click",
    description: "任务点击时触发",
    params: "task: Task, day: string"
  },
  {
    event: "task-edit",
    description: "任务编辑时触发",
    params: "task: Task, day: string"
  },
  {
    event: "task-delete",
    description: "任务删除时触发",
    params: "task: Task, day: string"
  },
  {
    event: "day-edit",
    description: "编辑日期内容时触发",
    params: "day: string, content: string"
  }
]
</script>

<style scoped>
.demo-header {
  margin-bottom: 40px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.demo-title {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.demo-description {
  margin: 0;
  font-size: 14px;
  color: #606266;
}

.demo-content {
  margin-bottom: 40px;
}

.demo-section {
  margin-bottom: 40px;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-card {
  padding: 20px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.card-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.card-desc {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #606266;
}

.value-display {
  margin-top: 20px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}

.custom-date-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
}

.custom-date-cell span {
  margin-bottom: 4px;
}

.task-list {
  width: 100%;
  margin-top: 4px;
}

.task-item {
  width: 100%;
  padding: 2px 4px;
  margin-bottom: 2px;
  background: #ecf5ff;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
}

.task-title {
  display: block;
  font-weight: 500;
}

.task-time {
  display: block;
  font-size: 10px;
  color: #606266;
}
</style>
