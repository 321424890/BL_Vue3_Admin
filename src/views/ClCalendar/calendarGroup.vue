<template>
  <div class="flex-column-page-wrap pageWrap">
    <div class="demo-header">
      <h1 class="demo-title">CrystalCalendar 组件</h1>
      <p class="demo-description">
        基于 Element Plus 的 el-calendar 组件封装的日历组件，提供了选中高亮、可编辑等增强功能，同时保持了原组件的所有基本功能
      </p>
    </div>
    <div class="schedule-container">
      <div class="schedule-header"></div>

      <div class="schedule-content">
        <div class="calendar-view">
          <CrystalCalendar v-model="selectedDate" :tasks="tasks" @day-click="handleDayClick" />
          <div class="value-display">选中日期: {{ selectedDate }}</div>
        </div>

        <div class="schedule-sidebar">
          <div class="selected-day-info" v-if="selectedDay">
            <h4>{{ selectedDay.date }}</h4>
            <div class="day-tasks-list">
              <div class="task-item" v-for="task in selectedDay.tasks" :key="task.id">
                <div class="task-header">
                  <span class="task-type">{{ task.type }}</span>
                  <span class="task-status" :class="task.status">{{ task.status }}</span>
                </div>
                <div class="task-details">
                  <div class="task-location">{{ task.location }}</div>
                  <div class="task-assignee">负责人: {{ task.assignee }}</div>
                  <div class="task-time">{{ task.time }}</div>
                </div>
                <div class="task-actions" style="margin-top: 4px">
                  <el-button size="small" type="primary" @click="editTask(task)">修改</el-button>
                  <el-button size="small" type="danger" @click="deleteTask(task)">删除</el-button>
                </div>
              </div>
            </div>
            <el-button type="primary" @click="openAddTaskDrawer">添加任务</el-button>
          </div>
          <div class="no-selection" v-else>
            <p>请选择一个日期查看详细任务</p>
          </div>
        </div>
      </div>
      <el-drawer v-model="addTaskDrawerVisible" :title="drawerMode === 'edit' ? '修改养护任务' : '添加养护任务'" size="400px">
        <el-form :model="addTaskForm" :rules="addTaskRules" ref="addTaskFormRef" label-width="80px">
          <el-form-item label="任务类型" prop="type">
            <el-select v-model="addTaskForm.type" placeholder="请选择任务类型">
              <el-option label="浇水" value="浇水" />
              <el-option label="修剪" value="修剪" />
              <el-option label="施肥" value="施肥" />
              <el-option label="除草" value="除草" />
            </el-select>
          </el-form-item>
          <el-form-item label="位置" prop="location">
            <el-input v-model="addTaskForm.location" placeholder="请输入位置" />
          </el-form-item>
          <el-form-item label="负责人" prop="assignee">
            <el-input v-model="addTaskForm.assignee" placeholder="请输入负责人" />
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-time-picker
              v-model="addTaskForm.time"
              placeholder="选择时间段"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="addTaskForm.desc" type="textarea" placeholder="请输入描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="addTaskDrawerVisible = false">取消</el-button>
          <el-button type="primary" @click="drawerMode === 'edit' ? submitEditTask() : submitAddTask()">确定</el-button>
        </template>
      </el-drawer>
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

<script setup lang="tsx" name="MaintenanceSchedule">
import { ref, computed, onMounted, reactive, watch } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { CrystalCalendar } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

const currentDate = ref(new Date())
const selectedDay = ref<any | null>(null)
const weekdays = ["日", "一", "二", "三", "四", "五", "六"]
// 基础使用
const selectedDate = ref()
// 模拟任务数据
const scheduleData = ref([
  {
    id: 1,
    date: "2024-01-15",
    type: "浇水",
    location: "中央公园",
    assignee: "张三",
    time: "09:00-11:00",
    status: "进行中",
    desc: ""
  },
  {
    id: 2,
    date: "2024-01-15",
    type: "修剪",
    location: "滨江绿道",
    assignee: "李四",
    time: "14:00-16:00",
    status: "待开始",
    desc: ""
  },
  {
    id: 3,
    date: "2024-01-17",
    type: "施肥",
    location: "阳光小区绿地",
    assignee: "王五",
    time: "08:00-10:00",
    status: "已完成",
    desc: ""
  }
])

// 将任务数据转换为 CrystalCalendar 需要的格式
const tasks = computed(() => {
  const result: Record<string, any[]> = {}
  scheduleData.value.forEach(task => {
    if (!result[task.date]) {
      result[task.date] = []
    }
    result[task.date].push({
      ...task,
      id: task.id.toString(), // 确保 id 是字符串类型
      title: task.type // 使用 type 作为 title
    })
  })
  return result
})

const addTaskDrawerVisible = ref(false)
const drawerMode = ref<"add" | "edit">("add")
const editTaskId = ref<number | null>(null)
const addTaskForm = reactive({
  type: "",
  location: "",
  assignee: "",
  time: "",
  desc: ""
})
const addTaskFormRef = ref()
const addTaskRules = {
  type: [{ required: true, message: "请选择任务类型", trigger: "change" }],
  location: [{ required: true, message: "请输入位置", trigger: "blur" }],
  assignee: [{ required: true, message: "请输入负责人", trigger: "blur" }],
  time: [{ required: true, message: "请选择时间", trigger: "change" }]
}

const currentMonthYear = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth() + 1
  return `${year}年${month}月`
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const today = new Date()

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const dayNumber = date.getDate()
    const currentMonth = date.getMonth() === month
    const isToday = date.toDateString() === today.toDateString()

    // 获取当天的任务
    const dateString = date.toISOString().split("T")[0]
    const tasks = scheduleData.value.filter(task => task.date === dateString)

    days.push({
      date: dateString,
      dayNumber,
      currentMonth,
      isToday,
      tasks
    })
  }

  return days
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDay = (day: any) => {
  selectedDay.value = day
}

const addSchedule = () => {
  ElMessage({
    message: "新增计划功能开发中",
    type: "info"
  })
}

const refreshSchedule = () => {
  ElMessage({
    message: "计划已刷新",
    type: "success"
  })
}

// 处理日历日期点击事件
const handleDayClick = (day: string) => {
  selectedDate.value = new Date(day)
  console.log(selectedDate.value)
  // 根据点击的日期字符串找到对应的day对象
  const clickedDay = calendarDays.value.find(d => d.date === day)
  if (clickedDay) {
    selectedDay.value = clickedDay
  }
}

// 监听selectedDate的变化，确保currentDate的月份与selectedDate的月份一致
watch(
  selectedDate,
  newDate => {
    if (newDate) {
      currentDate.value = new Date(newDate.getFullYear(), newDate.getMonth(), 1)
    }
  },
  { deep: true }
)

const openAddTaskDrawer = () => {
  if (!selectedDay.value) {
    ElMessage.warning("请先选择日期")
    return
  }
  Object.assign(addTaskForm, { type: "", location: "", assignee: "", time: "", desc: "" })
  drawerMode.value = "add"
  addTaskDrawerVisible.value = true
}

const editTask = (task: any) => {
  Object.assign(addTaskForm, task)
  drawerMode.value = "edit"
  editTaskId.value = task.id
  addTaskDrawerVisible.value = true
}

const submitEditTask = () => {
  addTaskFormRef.value.validate((valid: boolean) => {
    if (!valid || !selectedDay.value || editTaskId.value === null) return
    const idx = scheduleData.value.findIndex(t => t.id === editTaskId.value)
    if (idx !== -1) {
      scheduleData.value[idx] = {
        ...scheduleData.value[idx],
        ...addTaskForm,
        id: editTaskId.value,
        date: selectedDay.value.date
      }
      addTaskDrawerVisible.value = false
      ElMessage.success("任务修改成功")
      const day = calendarDays.value.find(day => day.date === selectedDay.value!.date)
      selectedDay.value = null
      if (day) selectedDay.value = day
    }
  })
}

const deleteTask = (task: any) => {
  ElMessageBox.confirm("确定要删除该任务吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    scheduleData.value = scheduleData.value.filter(t => t.id !== task.id)
    ElMessage.success("任务已删除")
    const day = calendarDays.value.find(day => day.date === selectedDay.value!.date)
    selectedDay.value = null
    if (day) selectedDay.value = day
  })
}

const submitAddTask = () => {
  addTaskFormRef.value.validate((valid: boolean) => {
    if (!valid || !selectedDay.value) return
    const newId = scheduleData.value.length ? Math.max(...scheduleData.value.map(t => t.id)) + 1 : 1
    scheduleData.value.push({
      id: newId,
      date: selectedDay.value.date,
      type: addTaskForm.type,
      location: addTaskForm.location,
      assignee: addTaskForm.assignee,
      time: Array.isArray(addTaskForm.time) ? addTaskForm.time.join("-") : addTaskForm.time,
      status: "待开始",
      desc: addTaskForm.desc
    })
    addTaskDrawerVisible.value = false
    ElMessage.success("任务添加成功")
    const day = calendarDays.value.find(day => day.date === selectedDay.value!.date)
    selectedDay.value = null
    if (day) selectedDay.value = day
  })
}

const addTaskToDay = openAddTaskDrawer

onMounted(() => {
  // 初始化选中今天
  const today = new Date()
  const todayString = today.toISOString().split("T")[0]
  const todayDay = calendarDays.value.find(day => day.date === todayString)
  if (todayDay) selectedDay.value = todayDay
})

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

<style scoped lang="scss">
.demo-header {
  //   margin-bottom: 40px;
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

.schedule-container {
  padding: 20px;
  height: 100%;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h3 {
    margin: 0;
  }

  .schedule-controls {
    display: flex;
    gap: 10px;
  }
}

.schedule-content {
  display: flex;
  gap: 20px;
  height: calc(100vh - 200px);
}

.calendar-view {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h4 {
    margin: 0;
    font-size: 18px;
  }
}

.calendar-grid {
  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 10px;

    .weekday {
      text-align: center;
      font-weight: bold;
      padding: 10px;
      color: #666;
    }
  }

  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;

    .calendar-day {
      aspect-ratio: 1;
      border: 1px solid #eee;
      padding: 5px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #f5f7fa;
      }

      &.other-month {
        color: #ccc;
      }

      &.has-tasks {
        background-color: #f0f9ff;
        border-color: #67c23a;
      }

      &.today {
        background-color: #67c23a;
        color: white;
      }

      .day-number {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .day-tasks {
        .task-indicator {
          font-size: 10px;
          background: #67c23a;
          color: white;
          padding: 2px 4px;
          border-radius: 2px;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .more-tasks {
          font-size: 10px;
          color: #999;
          text-align: center;
        }
      }
    }
  }
}

.schedule-sidebar {
  width: 300px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .selected-day-info {
    h4 {
      margin: 0 0 20px 0;
      color: #333;
    }

    .day-tasks-list {
      margin-bottom: 20px;
      max-height: calc(100vh - 350px); /* 设置最大高度 */
      overflow-y: auto; /* 添加垂直滚动 */
      padding-right: 5px; /* 避免滚动条遮挡内容 */

      /* 自定义滚动条样式 */
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      .task-item {
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .task-type {
            font-weight: bold;
            color: #333;
          }

          .task-status {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;

            &.进行中 {
              background-color: #f0f9ff;
              color: #409eff;
            }

            &.待开始 {
              background-color: #fef7e0;
              color: #e6a23c;
            }

            &.已完成 {
              background-color: #f0f9ff;
              color: #67c23a;
            }
          }
        }

        .task-details {
          font-size: 12px;
          color: #666;

          div {
            margin-bottom: 4px;
          }
        }
      }
    }
  }

  .no-selection {
    text-align: center;
    color: #999;
    padding: 40px 0;
  }
}
</style>
