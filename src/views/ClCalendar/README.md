# CrystalCalendar 组件使用文档

## 简介

CrystalCalendar 是基于 Element Plus 的 `el-calendar` 组件封装的日历组件，提供了选中高亮、可编辑等增强功能，同时保持了原组件的所有基本功能。

## 基本用法

```vue
<template>
  <CrystalCalendar
    v-model="selectedDate"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CrystalCalendar } from 'crystal-ui'

const selectedDate = ref(new Date())
</script>
```

## 属性

### 核心属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `modelValue` | `Date | Date[] | string | string[] | null` | `new Date()` | 绑定值 |
| `type` | `string` | `date` | 日期类型 |
| `format` | `string` | `YYYY-MM-DD` | 日期格式 |
| `rangeSeparator` | `string` | `-` | 范围分隔符 |
| `startPlaceholder` | `string` | `''` | 范围选择器开始日期占位符 |
| `endPlaceholder` | `string` | `''` | 范围选择器结束日期占位符 |

### 渲染控制

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `firstDayOfWeek` | `number` | `1` | 一周的第一天（1-7） |
| `showWeekNumbers` | `boolean` | `false` | 是否显示周数 |
| `showBorders` | `boolean` | `false` | 是否显示边框 |
| `size` | `string` | `default` | 组件尺寸 |
| `border` | `boolean` | `false` | 是否显示边框 |

### 交互控制

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `disabledDate` | `(time: Date) => boolean` | `-` | 禁用日期函数 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `clearable` | `boolean` | `true` | 是否可清空 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `allowInput` | `boolean` | `false` | 是否允许手动输入 |

### 验证与自动聚焦

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `validateEvent` | `boolean` | `true` | 是否触发验证 |
| `autofocus` | `boolean` | `false` | 是否自动聚焦 |

### 占位符

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `placeholder` | `string` | `''` | 占位符文本 |

### 选择模式

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `selectionMode` | `string` | `-` | 选择模式 |

### 自定义功能属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `selectedDates` | `Date[] | string[]` | `[]` | 选中的日期数组 |
| `tasks` | `Record<string, Task[]>` | `{}` | 按日期分组的任务列表 |

#### Task 类型定义

```typescript
interface Task {
  id: string;           // 任务唯一标识
  title: string;        // 任务标题
  startTime?: string;   // 开始时间（可选）
  endTime?: string;     // 结束时间（可选）
  type?: string;        // 任务类型（可选，用于颜色编码）
  status?: string;      // 任务状态（可选）
  [key: string]: any;   // 其他自定义属性
}
```

### 自定义颜色属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `color` | `string` | `''` | 默认颜色 |
| `selectedColor` | `string` | `#409EFF` | 选中日期颜色 |
| `hoverColor` | `string` | `#ecf5ff` | 鼠标悬停颜色 |
| `textColor` | `string` | `''` | 文本颜色 |

### 其他属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `cellClassName` | `string | ((date: Date) => string)` | `-` | 单元格类名 |
| `popperClass` | `string` | `''` | 弹出框类名 |
| `teleported` | `boolean` | `true` | 是否使用 teleport |
| `inputSize` | `string` | `-` | 输入框尺寸 |

## 事件

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| `update:modelValue` | 值改变时触发 | `value: Date | Date[] | string | string[] | null` |
| `change` | 值改变时触发 | `value: Date | Date[] | string | string[] | null` |
| `blur` | 失去焦点时触发 | `event: FocusEvent` |
| `focus` | 获得焦点时触发 | `event: FocusEvent` |
| `calendar-change` | 日历视图改变时触发 | `value: Date | Date[] | string | string[] | null` |
| `panel-change` | 面板改变时触发 | `date: Date, mode: string` |
| `day-click` | 日期点击时触发 | `day: string` |
| `task-click` | 任务点击时触发 | `task: Task, day: string` |
| `task-edit` | 任务编辑时触发 | `task: Task, day: string` |
| `task-delete` | 任务删除时触发 | `task: Task, day: string` |

## 插槽

| 插槽名 | 说明 | 参数 |
|-------|------|------|
| `default` | 默认插槽 | - |
| `date-cell` | 自定义日期单元格 | `data: { day: string, date: Date, type: string }` |

## 高级用法

### 选中高亮

```vue
<template>
  <CrystalCalendar
    v-model="selectedDate"
    :selected-dates="selectedDates"
    :selected-color="'#67C23A'"
    :hover-color="'#F0F9EB'"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CrystalCalendar } from 'crystal-ui'

const selectedDate = ref(new Date())
const selectedDates = ref(['2025-12-23', '2025-12-25', '2025-12-31'])
</script>
```

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
        <el-form-item label="开始时间">
          <el-input v-model="newTask.startTime" placeholder="例如：09:00" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="newTask.endTime" placeholder="例如：10:30" />
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
        <el-form-item>
          <el-button type="primary" @click="addTask">添加任务</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { CrystalCalendar } from 'crystal-ui'
import { ElMessage } from 'element-plus'

const selectedDate = ref(new Date())
const selectedDay = ref<string>('')

// 任务数据结构：按日期分组的任务列表
const tasks = reactive<Record<string, Task[]>>({
  '2025-12-23': [
    {
      id: '1',
      title: '给猫咪喂食',
      startTime: '08:00',
      endTime: '08:30',
      type: 'feed'
    },
    {
      id: '2',
      title: '猫咪健康检查',
      startTime: '14:00',
      endTime: '15:00',
      type: 'health'
    }
  ],
  '2025-12-24': [
    {
      id: '3',
      title: '清洁猫砂盆',
      startTime: '10:00',
      endTime: '10:30',
      type: 'clean'
    }
  ]
})

// 新任务表单
const newTask = reactive({
  title: '',
  startTime: '',
  endTime: '',
  type: 'feed'
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
  Object.assign(newTask, { title: '', startTime: '', endTime: '', type: 'feed' })
  
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
.task-form-card { margin-top: 20px; max-width: 600px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
```

### @day-click 事件的必要性

在父组件管理任务的模式下，`@day-click` 事件仍然非常有用，它可以：

1. **获取用户选中的日期**：当用户点击日历中的某个日期时，该事件会将点击的日期字符串传递给父组件
2. **自动填充任务日期**：父组件可以将获取到的日期作为新增任务的默认日期，提升用户体验
3. **实现日期选中高亮**：可以根据点击的日期来高亮显示对应的日期单元格
4. **支持批量操作**：可以结合其他功能实现批量添加/编辑任务等操作

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
    <el-button type="primary" @click="openAddTaskModal">
      添加任务
    </el-button>
    
    <!-- 父组件的任务弹窗 -->
    <el-dialog
      v-model="taskModalVisible"
      :title="isEditing ? '编辑任务' : '添加任务'"
      width="500px"
    >
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
import { ref, reactive } from 'vue'
import { CrystalCalendar } from 'crystal-ui'
import { ElMessage } from 'element-plus'

// 任务数据
const tasks = reactive<Record<string, Task[]>>({})

// 选中的日期
const selectedDate = ref<string>('')

// 任务弹窗
const taskModalVisible = ref(false)
const isEditing = ref(false)
const currentTask = reactive({
  id: '',
  date: '',
  title: '',
  type: ''
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
    currentTask.date = new Date().toISOString().split('T')[0]
  }
  
  // 重置表单
  Object.assign(currentTask, {
    id: '',
    title: '',
    type: ''
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
    ElMessage.warning('请输入任务标题')
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
  ElMessage.success('任务保存成功')
}

// 其他事件处理函数
const handleTaskClick = (task: Task, day: string) => {
  console.log('点击的任务:', task, '日期:', day)
}

const handleTaskDelete = (task: Task, day: string) => {
  console.log('删除任务:', task, '日期:', day)
  const dayTasks = tasks[day] || []
  const index = dayTasks.findIndex(t => t.id === task.id)
  if (index !== -1) {
    dayTasks.splice(index, 1)
    ElMessage.success('任务已删除')
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
  <CrystalCalendar
    v-model="selectedDate"
  >
    <template #date-cell="{ data }">
      <div class="custom-date-cell">
        <span>{{ data.day.split('-').slice(2).join('-') }}</span>
        <el-tag v-if="isHoliday(data.day)" size="mini" type="danger">休</el-tag>
        <el-tag v-if="isWorkday(data.day)" size="mini" type="success">班</el-tag>
      </div>
    </template>
  </CrystalCalendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CrystalCalendar } from 'crystal-ui'
import { ElTag } from 'element-plus'

const selectedDate = ref(new Date())

// 模拟节假日数据
const holidays = ['2025-12-25', '2025-12-31', '2026-01-01']
const workdays = ['2025-12-27', '2025-12-28']

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
  <CrystalCalendar
    v-model="selectedDate"
    :disabled-date="disabledDate"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CrystalCalendar } from 'crystal-ui'

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
import { ref } from 'vue'
import { CrystalCalendar } from 'crystal-ui'

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
import { ref } from 'vue'
import { CrystalCalendar } from 'crystal-ui'

const selectedDate = ref(new Date())

const handleDayClick = (day: string) => {
  console.log('点击的日期:', day)
}

const handleCalendarChange = (value: any) => {
  console.log('日历视图改变:', value)
}

const handlePanelChange = (date: Date, mode: string) => {
  console.log('面板改变:', date, mode)
}
</script>
```

### 显示周数

```vue
<template>
  <CrystalCalendar
    v-model="selectedDate"
    :show-week-numbers="true"
    :show-borders="true"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CrystalCalendar } from 'crystal-ui'

const selectedDate = ref(new Date())
</script>
```

## 注意事项

1. 确保传入的 `selectedDates` 数组中的日期格式与 `format` 属性一致
2. `tasks` 属性需要是按日期字符串（格式与 `format` 一致）分组的任务列表
3. 任务类型（`type`）会影响任务项的颜色，目前支持：water（绿色）、feed（橙色）、clean（蓝色）、health（红色）、training（灰色）
4. 自定义颜色时，建议同时设置 `selectedColor` 和 `hoverColor` 以获得更好的视觉效果
5. 使用 `disabledDate` 函数时，注意返回值为 `true` 时表示日期被禁用
6. 自定义日期单元格时，注意保持单元格的结构清晰，避免影响日历的正常布局
7. 插槽名称使用 `date-cell` 而不是 `dateCell`，与 Element Plus 规范保持一致