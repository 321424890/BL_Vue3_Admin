# CrystalCalendar 组件使用文档

## 简介

CrystalCalendar 是基于 Element Plus 的 `el-calendar` 组件封装的日历组件，提供了选中高亮、可编辑等增强功能，同时保持了原组件的所有基本功能。

## 基本用法

```vue
<template>
  <CrystalCalendar v-model="selectedDate" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalCalendar } from "crystalplus-ui"

const selectedDate = ref(new Date())
</script>
```

## 属性

### 核心属性

| 属性名             | 类型     | 默认值       | 说明                     |
| ------------------ | -------- | ------------ | ------------------------ | -------- | ----- | ------------ | ------ |
| `modelValue`       | `Date    | Date[]       | string                   | string[] | null` | `new Date()` | 绑定值 |
| `type`             | `string` | `date`       | 日期类型                 |
| `format`           | `string` | `YYYY-MM-DD` | 日期格式                 |
| `rangeSeparator`   | `string` | `-`          | 范围分隔符               |
| `startPlaceholder` | `string` | `''`         | 范围选择器开始日期占位符 |
| `endPlaceholder`   | `string` | `''`         | 范围选择器结束日期占位符 |

### 渲染控制

| 属性名            | 类型      | 默认值    | 说明                |
| ----------------- | --------- | --------- | ------------------- |
| `firstDayOfWeek`  | `number`  | `1`       | 一周的第一天（1-7） |
| `showWeekNumbers` | `boolean` | `false`   | 是否显示周数        |
| `showBorders`     | `boolean` | `false`   | 是否显示边框        |
| `size`            | `string`  | `default` | 组件尺寸            |
| `border`          | `boolean` | `false`   | 是否显示边框        |

### 交互控制

| 属性名         | 类型                      | 默认值  | 说明             |
| -------------- | ------------------------- | ------- | ---------------- |
| `disabledDate` | `(time: Date) => boolean` | `-`     | 禁用日期函数     |
| `readonly`     | `boolean`                 | `false` | 是否只读         |
| `clearable`    | `boolean`                 | `true`  | 是否可清空       |
| `disabled`     | `boolean`                 | `false` | 是否禁用         |
| `allowInput`   | `boolean`                 | `false` | 是否允许手动输入 |

### 验证与自动聚焦

| 属性名          | 类型      | 默认值  | 说明         |
| --------------- | --------- | ------- | ------------ |
| `validateEvent` | `boolean` | `true`  | 是否触发验证 |
| `autofocus`     | `boolean` | `false` | 是否自动聚焦 |

### 占位符

| 属性名        | 类型     | 默认值 | 说明       |
| ------------- | -------- | ------ | ---------- |
| `placeholder` | `string` | `''`   | 占位符文本 |

### 选择模式

| 属性名          | 类型     | 默认值 | 说明     |
| --------------- | -------- | ------ | -------- |
| `selectionMode` | `string` | `-`    | 选择模式 |

### 自定义功能属性

| 属性名          | 类型                     | 默认值    | 说明                 |
| --------------- | ------------------------ | --------- | -------------------- | -------------- |
| `selectedDates` | `Date[]                  | string[]` | `[]`                 | 选中的日期数组 |
| `tasks`         | `Record<string, Task[]>` | `{}`      | 按日期分组的任务列表 |

#### Task 类型定义

```typescript
interface Task {
  id: string // 任务唯一标识
  title: string // 任务标题
  type?: string // 任务类型（可选，用于颜色编码）
  status?: string // 任务状态（可选）
  location?: string // 任务位置（可选）
  assignee?: string // 任务负责人（可选）
  time?: [string, string] // 任务时间段（可选，格式：['开始时间', '结束时间']）
  [key: string]: any // 其他自定义属性
}
```

### 任务列表样式特点

1. **超出内容自动隐藏**：当任务列表过多时，会自动限制高度并添加垂直滚动条，确保任务列表不会超出日历单元格的高度
2. **鼠标悬停显示完整内容**：任务标题默认自动截断，鼠标悬停时会显示完整的任务标题
3. **自定义滚动条**：使用了美化的滚动条样式，提升用户体验
4. **固定颜色**：任务项背景色固定为绿色（#67C23A），简化视觉效果
5. **响应式设计**：任务列表会根据日历单元格的大小自动调整布局

### 任务列表滚动功能

任务列表实现了智能滚动功能：

- 最大高度限制：任务列表最大高度为日历单元格高度减去日期数字区域
- 自动滚动：超出最大高度时自动出现垂直滚动条
- 滚动条美化：自定义了滚动条样式，与整体设计风格保持一致
- 操作友好：滚动条宽度仅为3px，不影响任务内容的显示

### 自定义颜色属性

| 属性名          | 类型     | 默认值    | 说明         |
| --------------- | -------- | --------- | ------------ |
| `color`         | `string` | `''`      | 默认颜色     |
| `selectedColor` | `string` | `#409EFF` | 选中日期颜色 |
| `hoverColor`    | `string` | `#ecf5ff` | 鼠标悬停颜色 |
| `textColor`     | `string` | `''`      | 文本颜色     |

### 其他属性

| 属性名          | 类型      | 默认值                    | 说明              |
| --------------- | --------- | ------------------------- | ----------------- | ---------- |
| `cellClassName` | `string   | ((date: Date) => string)` | `-`               | 单元格类名 |
| `popperClass`   | `string`  | `''`                      | 弹出框类名        |
| `teleported`    | `boolean` | `true`                    | 是否使用 teleport |
| `inputSize`     | `string`  | `-`                       | 输入框尺寸        |

## 事件

| 事件名              | 说明               | 回调参数                   |
| ------------------- | ------------------ | -------------------------- | ------ | ------ | -------- | ----- |
| `update:modelValue` | 值改变时触发       | `value: Date               | Date[] | string | string[] | null` |
| `change`            | 值改变时触发       | `value: Date               | Date[] | string | string[] | null` |
| `blur`              | 失去焦点时触发     | `event: FocusEvent`        |
| `focus`             | 获得焦点时触发     | `event: FocusEvent`        |
| `calendar-change`   | 日历视图改变时触发 | `value: Date               | Date[] | string | string[] | null` |
| `panel-change`      | 面板改变时触发     | `date: Date, mode: string` |
| `day-click`         | 日期点击时触发     | `day: string`              |
| `task-click`        | 任务点击时触发     | `task: Task, day: string`  |
| `task-edit`         | 任务编辑时触发     | `task: Task, day: string`  |
| `task-delete`       | 任务删除时触发     | `task: Task, day: string`  |

## 插槽

| 插槽名      | 说明             | 参数                                              |
| ----------- | ---------------- | ------------------------------------------------- |
| `default`   | 默认插槽         | -                                                 |
| `date-cell` | 自定义日期单元格 | `data: { day: string, date: Date, type: string }` |

## 高级用法

### 选中高亮

```vue
<template>
  <CrystalCalendar v-model="selectedDate" :selected-dates="selectedDates" :selected-color="'#67C23A'" :hover-color="'#F0F9EB'" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalCalendar } from "crystalplus-ui"

const selectedDate = ref(new Date())
const selectedDates = ref(["2025-12-23", "2025-12-25", "2025-12-31"])
</script>
```

### 选中日期样式说明

1. **完整单元格填充**：修复了选中日期颜色仅显示为小点的问题，现在选中颜色会完全铺满整个日历单元格
2. **绝对定位实现**：通过CSS绝对定位技术，确保选中背景色从单元格的左上角延伸到右下角
3. **无间隙显示**：选中状态的背景色与单元格边缘完全贴合，没有任何间隙
4. **z-index管理**：通过合理的z-index设置，确保选中效果不会遮挡日期数字和任务列表
5. **过渡动画**：添加了平滑的过渡动画效果，提升用户体验

### 选中样式实现原理

```css
/* 确保el-calendar-day是相对定位的容器 */
:deep(.el-calendar-day) {
  position: relative;
  height: 100%;
  width: 100%;
  display: block;
}

/* 确保日历单元格完全填满父容器 */
:deep(.el-calendar-table .el-calendar-day) {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  display: block;
}

/* 选中状态样式 - 利用绝对定位的cell实现颜色铺满 */
:deep(.el-calendar-day .crystal-calendar-cell-selected) {
  background-color: v-bind('props.selectedColor || "#409EFF"');
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 0;
  z-index: 1;
}
```

通过以上CSS实现，确保了选中的日期背景色能够完全覆盖整个日历单元格，提供了清晰的视觉反馈。

### 任务列表功能

```vue
<template>
  <div>
    <CrystalCalendar
      v-model="selectedDate"
      :tasks="tasks"
      :selected-dates="Object.keys(tasks)"
      @task-click="handleTaskClick"
      @task-edit="handleTaskEdit"
      @task-delete="handleTaskDelete"
      @day-click="handleDayClick"
    />

    <!-- 父组件的任务添加表单 -->
    <el-card v-if="selectedDay" class="task-form-card">
      <template #header>
        <div class="card-header">
          <span>为 {{ selectedDay }} 添加任务</span>
        </div>
      </template>
      <el-form :model="newTask" label-width="80px">
        <el-form-item label="任务标题">
          <el-input v-model="newTask.title" placeholder="请输入任务标题" />
        </el-form-item>
        <el-form-item label="任务类型">
          <el-select v-model="newTask.type" placeholder="请选择任务类型">
            <el-option label="浇水" value="water" />
            <el-option label="喂食" value="feed" />
            <el-option label="清洁" value="clean" />
            <el-option label="健康检查" value="health" />
            <el-option label="训练" value="training" />
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="newTask.location" placeholder="请输入位置" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="newTask.assignee" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="时间">
          <el-time-picker
            v-model="newTask.time"
            placeholder="选择时间段"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTask">添加任务</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { CrystalCalendar } from 'crystalplus-ui'
import { ElMessage } from 'element-plus'

const selectedDate = ref(new Date())
const selectedDay = ref<string>('')

// 获取当前年份
const currentYear = new Date().getFullYear()

// 任务数据结构：按日期分组的任务列表
const tasks = reactive<Record<string, Task[]>>({
  `${currentYear}-12-23`: [
    {
      id: '1',
      title: '给猫咪喂食',
      type: 'feed',
      location: '宠物房',
      assignee: '张三',
      time: ['09:00', '10:00']
    },
    {
      id: '2',
      title: '猫咪健康检查',
      type: 'health',
      location: '宠物医院',
      assignee: '李四',
      time: ['14:00', '16:00']
    }
  ],
  `${currentYear}-12-24`: [
    {
      id: '3',
      title: '清洁猫砂盆',
      type: 'clean',
      location: '宠物房',
      assignee: '王五',
      time: ['11:00', '12:00']
    }
  ]
})

// 新任务表单
const newTask = reactive({
  title: '',
  type: 'feed',
  location: '',
  assignee: '',
  time: ['', '']
})

// 处理日期点击
const handleDayClick = (day: string) => {
  selectedDay.value = day
}

// 添加任务
const addTask = () => {
  if (!newTask.title.trim()) {
    ElMessage.warning('请输入任务标题')
    return
  }

  if (!selectedDay.value) {
    ElMessage.warning('请先选择一个日期')
    return
  }

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
  Object.assign(newTask, { title: '', type: 'feed', location: '', assignee: '', time: ['', ''] })

  ElMessage.success('任务添加成功')
}

// 处理任务点击
const handleTaskClick = (task: Task, day: string) => {
  console.log('点击的任务:', task, '日期:', day)
  // 可以在这里打开任务详情
}

// 处理任务编辑
const handleTaskEdit = (task: Task, day: string) => {
  console.log('编辑任务:', task, '日期:', day)
  // 可以在这里打开任务编辑表单
}

// 处理任务删除
const handleTaskDelete = (task: Task, day: string) => {
  console.log('删除任务:', task, '日期:', day)
  // 确认删除后，从tasks中移除
  const dayTasks = tasks[day]
  if (dayTasks) {
    const index = dayTasks.findIndex(t => t.id === task.id)
    if (index !== -1) {
      dayTasks.splice(index, 1)
      ElMessage.success('任务已删除')
    }
  }
}
</script>

<style scoped>
.task-form-card {
  margin-top: 20px;
  max-width: 600px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

### @day-click 事件使用说明

**重要修复说明**：修复了点击日历单元格无响应的问题，现在 `@day-click` 事件可以正常触发。

`@day-click` 事件是组件与父组件通信的核心机制，它可以：

1. **获取用户选中的日期**：当用户点击日历中的某个日期时，该事件会将点击的日期字符串（格式：YYYY-MM-DD）传递给父组件
2. **自动填充任务日期**：父组件可以将获取到的日期作为新增任务的默认日期，提升用户体验
3. **实现日期选中高亮**：可以根据点击的日期来高亮显示对应的日期单元格
4. **支持批量操作**：可以结合其他功能实现批量添加/编辑任务等操作
5. **切换任务显示**：根据选中的日期切换显示对应的任务列表

#### 事件触发机制

修复后的 `@day-click` 事件通过以下方式确保正常触发：

1. **双重事件绑定**：同时在 Element Plus 的 `el-calendar` 组件和自定义的日期单元格上绑定点击事件
2. **事件穿透处理**：解决了自定义单元格遮挡默认点击区域导致事件无法触发的问题
3. **参数标准化**：始终返回统一格式的日期字符串（YYYY-MM-DD），确保父组件能够正确处理
4. **日志输出**：添加了调试日志，便于开发和问题定位

#### 父组件弹窗模式下的使用示例

```vue
<template>
  <div>
    <CrystalCalendar
      :tasks="tasks"
      @day-click="handleDayClick"
      @task-click="handleTaskClick"
      @task-edit="handleTaskEdit"
      @task-delete="handleTaskDelete"
    />

    <!-- 父组件的添加任务按钮 -->
    <el-button type="primary" @click="openAddTaskModal"> 添加任务 </el-button>

    <!-- 父组件的任务弹窗 -->
    <el-dialog v-model="taskModalVisible" :title="isEditing ? '编辑任务' : '添加任务'" width="500px">
      <el-form :model="currentTask" label-width="80px">
        <el-form-item label="日期">
          <el-date-picker
            v-model="currentTask.date"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
          />
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="currentTask.title" placeholder="请输入任务标题" />
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="currentTask.type" placeholder="请选择任务类型">
            <el-option label="浇水" value="water" />
            <el-option label="喂食" value="feed" />
            <el-option label="清洁" value="clean" />
            <el-option label="健康检查" value="health" />
            <el-option label="训练" value="training" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="taskModalVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTask">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { CrystalCalendar } from "crystalplus-ui"
import { ElMessage } from "element-plus"

// 任务数据
const tasks = reactive<Record<string, Task[]>>({})

// 选中的日期
const selectedDate = ref<string>("")

// 任务弹窗
const taskModalVisible = ref(false)
const isEditing = ref(false)
const currentTask = reactive({
  id: "",
  date: "",
  title: "",
  type: ""
})

// 处理日期点击 - 核心功能
const handleDayClick = (day: string) => {
  selectedDate.value = day
  // 可以在这里添加选中日期的高亮效果
}

// 打开添加任务弹窗
const openAddTaskModal = () => {
  isEditing.value = false

  // 如果用户之前选中了日期，自动填充到弹窗中
  if (selectedDate.value) {
    currentTask.date = selectedDate.value
  } else {
    // 如果没有选中日期，使用今天的日期
    currentTask.date = new Date().toISOString().split("T")[0]
  }

  // 重置表单
  Object.assign(currentTask, {
    id: "",
    title: "",
    type: ""
  })

  taskModalVisible.value = true
}

// 打开编辑任务弹窗
const handleTaskEdit = (task: Task, day: string) => {
  isEditing.value = true
  Object.assign(currentTask, {
    ...task,
    date: day
  })
  taskModalVisible.value = true
}

// 保存任务
const saveTask = () => {
  if (!currentTask.title.trim()) {
    ElMessage.warning("请输入任务标题")
    return
  }

  if (isEditing.value) {
    // 编辑任务逻辑
    const dayTasks = tasks[currentTask.date] || []
    const index = dayTasks.findIndex(task => task.id === currentTask.id)
    if (index !== -1) {
      dayTasks[index] = { ...currentTask }
    }
  } else {
    // 添加新任务逻辑
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...currentTask
    }

    if (!tasks[currentTask.date]) {
      tasks[currentTask.date] = []
    }
    tasks[currentTask.date].push(newTask)
  }

  taskModalVisible.value = false
  ElMessage.success("任务保存成功")
}

// 其他事件处理函数
const handleTaskClick = (task: Task, day: string) => {
  console.log("点击的任务:", task, "日期:", day)
}

const handleTaskDelete = (task: Task, day: string) => {
  console.log("删除任务:", task, "日期:", day)
  const dayTasks = tasks[day] || []
  const index = dayTasks.findIndex(t => t.id === task.id)
  if (index !== -1) {
    dayTasks.splice(index, 1)
    ElMessage.success("任务已删除")
  }
}
</script>
```

在这个示例中，`@day-click` 事件的作用是：

1. 用户点击日历中的某个日期，`handleDayClick` 函数将选中的日期存储在 `selectedDate` 中
2. 当用户点击"添加任务"按钮时，如果有选中的日期，会自动填充到弹窗的日期字段中
3. 这样用户可以先选择日期，再点击添加任务按钮，无需再次选择日期，提升了用户体验
4. 如果用户没有选中日期，会默认使用今天的日期，确保表单的可用性

### 自定义日期单元格

```vue
<template>
  <CrystalCalendar v-model="selectedDate">
    <template #date-cell="{ data }">
      <div class="custom-date-cell">
        <span>{{ data.day.split("-").slice(2).join("-") }}</span>
        <el-tag v-if="isHoliday(data.day)" size="mini" type="danger">休</el-tag>
        <el-tag v-if="isWorkday(data.day)" size="mini" type="success">班</el-tag>
      </div>
    </template>
  </CrystalCalendar>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalCalendar } from "crystalplus-ui"
import { ElTag } from "element-plus"

const selectedDate = ref(new Date())

// 模拟节假日数据
const holidays = ["2025-12-25", "2025-12-31", "2026-01-01"]
const workdays = ["2025-12-27", "2025-12-28"]

const isHoliday = (day: string) => {
  return holidays.includes(day)
}

const isWorkday = (day: string) => {
  return workdays.includes(day)
}
</script>

<style scoped>
.custom-date-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
</style>
```

### 禁用日期

```vue
<template>
  <CrystalCalendar v-model="selectedDate" :disabled-date="disabledDate" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalCalendar } from "crystalplus-ui"

const selectedDate = ref(new Date())

const disabledDate = (time: Date) => {
  // 禁用过去的日期
  return time.getTime() < Date.now() - 8.64e6
}
</script>
```

### 自定义样式

```vue
<template>
  <CrystalCalendar
    v-model="selectedDate"
    :color="'#E6A23C'"
    :selected-color="'#F56C6C'"
    :hover-color="'#FEF0F0'"
    :text-color="'#606266'"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalCalendar } from "crystalplus-ui"

const selectedDate = ref(new Date())
</script>
```

### 事件处理

```vue
<template>
  <CrystalCalendar
    v-model="selectedDate"
    @day-click="handleDayClick"
    @calendar-change="handleCalendarChange"
    @panel-change="handlePanelChange"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalCalendar } from "crystalplus-ui"

const selectedDate = ref(new Date())

const handleDayClick = (day: string) => {
  console.log("点击的日期:", day)
}

const handleCalendarChange = (value: any) => {
  console.log("日历视图改变:", value)
}

const handlePanelChange = (date: Date, mode: string) => {
  console.log("面板改变:", date, mode)
}
</script>
```

### 显示周数

```vue
<template>
  <CrystalCalendar v-model="selectedDate" :show-week-numbers="true" :show-borders="true" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { CrystalCalendar } from "crystalplus-ui"

const selectedDate = ref(new Date())
</script>
```

### 全屏显示

CrystalCalendar 组件支持全屏显示，组件内部已经实现了全屏布局的样式，只需要将组件放置在一个全屏容器中即可：

```vue
<template>
  <div style="width: 100vw; height: 100vh; margin: 0; padding: 0;">
    <CrystalCalendar v-model="selectedDate" :tasks="tasks" @day-click="handleDayClick" @task-click="handleTaskClick" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { CrystalCalendar } from "crystalplus-ui"

const selectedDate = ref(new Date())
const selectedDay = ref<string>("")

// 任务数据结构：按日期分组的任务列表
const tasks = reactive<Record<string, Task[]>>({
  "2025-12-23": [
    { id: "1", title: "给猫咪喂食", type: "feed" },
    { id: "2", title: "猫咪健康检查", type: "health" }
  ]
})

// 处理日期点击
const handleDayClick = (day: string) => {
  selectedDay.value = day
}

// 处理任务点击
const handleTaskClick = (task: Task, day: string) => {
  console.log("点击的任务:", task, "日期:", day)
}
</script>

<style>
/* 确保根元素也铺满全屏 */
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
```

## 注意事项

1. 确保传入的 `selectedDates` 数组中的日期格式与 `format` 属性一致
2. `tasks` 属性需要是按日期字符串（格式与 `format` 一致）分组的任务列表
3. 任务类型（`type`）会影响任务项的颜色，目前支持：water（绿色）、feed（橙色）、clean（蓝色）、health（红色）、training（灰色）
4. 任务项已简化，不再显示时间信息和操作按钮，只展示任务标题
5. 自定义颜色时，建议同时设置 `selectedColor` 和 `hoverColor` 以获得更好的视觉效果
6. 使用 `disabledDate` 函数时，注意返回值为 `true` 时表示日期被禁用
7. 自定义日期单元格时，注意保持单元格的结构清晰，避免影响日历的正常布局
8. 插槽名称使用 `date-cell` 而不是 `dateCell`，与 Element Plus 规范保持一致
9. **点击事件修复**：确保使用修复后的版本，`@day-click` 事件现在可以正常触发
10. **选中样式**：选中日期的背景色现在会完全铺满整个单元格，不再是一个小点
11. **任务列表滚动**：任务列表过多时会自动显示滚动条，不会超出日历单元格高度
12. **任务表单字段**：新增了 `location`、`assignee` 和 `time` 字段，可根据需求使用

## 最新修复内容

1. **修复点击无响应问题**：解决了点击日历单元格无反应、控制台无日志输出的问题
2. **修复选中样式问题**：选中日期的背景色现在会完全铺满整个日历单元格
3. **修复任务列表显示问题**：任务列表过多时会自动添加滚动条，确保不超出日历单元格
4. **优化事件参数**：`@day-click` 事件始终返回标准化的日期字符串（YYYY-MM-DD）
5. **增强组件稳定性**：通过双重事件绑定确保点击事件的可靠性

## 组件更新日志

### 版本 1.0.0

**修复内容**：

- 修复了 `@day-click` 事件不触发的问题
- 修复了选中日期颜色仅显示为小点的样式问题
- 修复了任务列表超出日历单元格的问题

**新增功能**：

- 任务列表自动滚动功能
- 任务标题悬停显示完整内容
- 选中日期完整填充样式
- 新增任务表单字段（位置、负责人、时间）

**优化内容**：

- 优化了组件性能
- 增强了事件处理的稳定性
- 美化了任务列表的滚动条样式
- 提高了组件的可维护性
