<template>
  <div 
    class="crystal-calendar-wrapper"
    :id="`crystal-calendar-${uniqueId}`"
    :class="{
      'has-custom-color': !!props.color || !!props.selectedColor || !!props.hoverColor || !!props.textColor
    }"
  >
    <el-calendar
      :model-value="props.modelValue"
      :first-day-of-week="props.firstDayOfWeek"
      :range-separator="props.rangeSeparator"
      :start-placeholder="props.startPlaceholder"
      :end-placeholder="props.endPlaceholder"
      :format="props.format"
      :disabled-date="props.disabledDate"
      :cell-class-name="cellClassName"
      :popper-class="props.popperClass"
      :teleported="props.teleported"
      :show-week-numbers="props.showWeekNumbers"
      :show-borders="props.showBorders"
      :size="props.size"
      :border="props.border"
      :readonly="props.readonly"
      :clearable="props.clearable"
      :validate-event="props.validateEvent"
      :autofocus="props.autofocus"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :allow-input="props.allowInput"
      :input-size="props.inputSize"
      :selection-mode="props.selectionMode"
      @update:model-value="handleUpdateModelValue"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @calendar-change="handleCalendarChange"
      @panel-change="handlePanelChange"
      @day-click="handleDayClick"
    >
      <template #date-cell="{ data }">
        <div 
          class="crystal-calendar-cell"
          :class="{
            'crystal-calendar-cell-selected': isDateSelected(data.day),
            'crystal-calendar-cell-with-tasks': props.tasks && props.tasks[data.day] && props.tasks[data.day].length > 0
          }"
          @click="handleDayClick(new Date(data.day))"
        >
          <slot name="date-cell" :data="data">
            <span class="crystal-calendar-day-number">{{ data.day.split('-').slice(2).join('-') }}</span>
          </slot>
          
          <!-- 任务列表 -->
          <div v-if="props.tasks && props.tasks[data.day] && props.tasks[data.day].length > 0" class="crystal-calendar-tasks">
            <div 
              v-for="task in props.tasks[data.day]" 
              :key="task.id"
              class="crystal-calendar-task-item"
              @click="handleTaskClick(task, data.day)"
            >
              <div class="crystal-calendar-task-title">{{ task.title }}</div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import type { CalendarProps } from 'element-plus'

// 定义任务类型接口
interface Task {
  id: string
  title: string
  startTime?: string
  endTime?: string
  type?: string
  status?: string
  [key: string]: any
}

// 定义组件属性接口
interface Props {
  // 核心数据属性
  modelValue?: Date | Date[] | string | string[] | null
  type?: CalendarProps['type']
  format?: string
  rangeSeparator?: string
  startPlaceholder?: string
  endPlaceholder?: string
  firstDayOfWeek?: number
  disabledDate?: (time: Date) => boolean
  cellClassName?: string | ((date: Date) => string)
  popperClass?: string
  teleported?: boolean
  showWeekNumbers?: boolean
  showBorders?: boolean
  size?: CalendarProps['size']
  border?: boolean
  readonly?: boolean
  clearable?: boolean
  validateEvent?: boolean
  autofocus?: boolean
  placeholder?: string
  disabled?: boolean
  allowInput?: boolean
  inputSize?: CalendarProps['inputSize']
  selectionMode?: string
  
  // 自定义功能属性
  selectedDates?: Date[] | string[] // 选中的日期
  selectedColor?: string // 选中日期颜色
  hoverColor?: string // 鼠标悬停颜色
  color?: string // 默认颜色
  textColor?: string // 文本颜色
  tasks?: Record<string, Task[]> // 按日期分组的任务列表
}

// 定义组件事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | Date[] | string | string[] | null): void
  (e: 'change', value: Date | Date[] | string | string[] | null): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'calendar-change', value: Date | Date[] | string | string[] | null): void
  (e: 'panel-change', date: Date, mode: string): void
  (e: 'day-click', day: string): void
  (e: 'task-click', task: Task, day: string): void
  (e: 'task-edit', task: Task, day: string): void
  (e: 'task-delete', task: Task, day: string): void
}>()

// 定义组件属性默认值
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => new Date(),
  type: 'date',
  format: 'YYYY-MM-DD',
  rangeSeparator: '-',
  startPlaceholder: '',
  endPlaceholder: '',
  firstDayOfWeek: 1,
  showWeekNumbers: false,
  showBorders: false,
  size: 'default',
  border: false,
  readonly: false,
  clearable: true,
  validateEvent: true,
  autofocus: false,
  placeholder: '',
  disabled: false,
  allowInput: false,
  selectedDates: () => [],
  selectedColor: '#409EFF', // 默认蓝色选中颜色
  hoverColor: '#ecf5ff',   // 默认浅蓝色悬停背景
  color: '',
  textColor: '',
  tasks: () => ({})
})

// 生成唯一ID以确保样式隔离
const uniqueId = computed(() => {
  return Math.random().toString(36).substr(2, 9)
})



// 检查日期是否选中
const isDateSelected = (date: string): boolean => {
  if (!props.selectedDates || props.selectedDates.length === 0) return false
  
  const targetDate = new Date(date)
  return props.selectedDates.some(selectedDate => {
    const selected = new Date(selectedDate)
    return (
      selected.getFullYear() === targetDate.getFullYear() &&
      selected.getMonth() === targetDate.getMonth() &&
      selected.getDate() === targetDate.getDate()
    )
  })
}

// 检查日期是否禁用
const isDateDisabled = (date: string): boolean => {
  if (!props.disabledDate) return false
  return props.disabledDate(new Date(date))
}

// 处理日期点击
const handleDayClick = (day: Date) => {
  const dayString = day.toISOString().split('T')[0]
  console.log('点击日期:', dayString)
  emit('day-click', dayString)
}



// 处理任务点击
const handleTaskClick = (task: Task, day: string) => {
  emit('task-click', task, day)
}

// 处理任务编辑
const handleTaskEdit = (task: Task, day: string) => {
  emit('task-edit', task, day)
}

// 处理任务删除
const handleTaskDelete = (task: Task, day: string) => {
  emit('task-delete', task, day)
}

// 根据任务类型获取颜色
const getTaskColor = (taskType?: string): string => {
  const colorMap: Record<string, string> = {
    'water': '#67C23A', // 浇水 - 绿色
    'feed': '#E6A23C',  // 喂食 - 橙色
    'clean': '#409EFF', // 清洁 - 蓝色
    'health': '#F56C6C', // 健康检查 - 红色
    'training': '#909399' // 训练 - 灰色
  }
  return colorMap[taskType || ''] || '#67C23A'
}

// 自定义单元格类名
const cellClassName = (date: Date): string => {
  const dateStr = date.toISOString().split('T')[0]
  let className = ''
  
  if (props.cellClassName) {
    if (typeof props.cellClassName === 'function') {
      className += ' ' + props.cellClassName(date)
    } else {
      className += ' ' + props.cellClassName
    }
  }
  
  return className
}

// 处理 modelValue 更新
const handleUpdateModelValue = (value: any) => {
  emit('update:modelValue', value)
}

// 处理 change 事件
const handleChange = (value: any) => {
  emit('change', value)
}

// 处理 blur 事件
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 处理 focus 事件
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// 处理 calendar-change 事件
const handleCalendarChange = (value: any) => {
  emit('calendar-change', value)
}

// 处理 panel-change 事件
const handlePanelChange = (date: Date, mode: string) => {
  emit('panel-change', date, mode)
}
</script>

<style scoped>
/* 基础样式 */
.crystal-calendar-wrapper {
  width: 100%;
  position: relative;
}

/* 日历单元格样式 */
:deep(.el-calendar__body) {
  padding: 10px;
}


/* 修复单元格显示为点的问题 */
:deep(.el-calendar-day) {
  display: block;
  height: auto;
  min-height: 120px;
}

.crystal-calendar-cell {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 0;
  transition: all 0.3s ease;
  display: block;
  z-index: 1;
}

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

/* 修复表格单元格的高度和宽度 */
:deep(.el-calendar-table tr td) {
  position: relative;
  height: auto;
  min-height: 120px;
  vertical-align: top;
  padding: 0;
  margin: 0;
}

/* 确保表格行和表格本身填满空间 */
:deep(.el-calendar-table tr) {
  height: 100%;
}

:deep(.el-calendar-table) {
  width: 100%;
  height: 100%;
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

/* 确保选中状态下的任务列表颜色 */
:deep(.el-calendar-day .crystal-calendar-cell-selected .crystal-calendar-task-item) {
  color: white;
}

/* 悬停状态样式 */
:deep(.el-calendar-day:hover .crystal-calendar-cell) {
  background-color: v-bind('props.hoverColor || "#ecf5ff"');
}

:deep(.el-calendar-day:hover .crystal-calendar-cell-selected) {
  opacity: 0.9;
}



/* 日期数字样式 */
.crystal-calendar-day-number {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
}

/* 任务列表样式 */
.crystal-calendar-tasks {
  margin-top: 5px;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  padding: 0;
  max-height: calc(100% - 30px); /* 限制任务列表高度，确保在日历单元格内 */
  overflow-y: auto; /* 添加垂直滚动 */
  overflow-x: hidden;
  box-sizing: border-box;
}

/* 自定义滚动条样式 */
.crystal-calendar-tasks::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.crystal-calendar-tasks::-webkit-scrollbar-track {
  background: transparent;
}

.crystal-calendar-tasks::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
}

.crystal-calendar-tasks::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

/* 任务项样式 */
.crystal-calendar-task-item {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #67C23A; /* 固定为绿色 */
  display: block;
  margin-bottom: 2px;
}

.crystal-calendar-task-item:hover {
  opacity: 0.9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  white-space: normal;
  word-wrap: break-word;
  text-overflow: clip;
  z-index: 10;
}

/* 任务标题样式 */
.crystal-calendar-task-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
}

/* 鼠标悬停时任务标题完整显示 */
.crystal-calendar-task-item:hover .crystal-calendar-task-title {
  white-space: normal;
  word-wrap: break-word;
  text-overflow: clip;
}

/* 有任务的单元格样式 */
.crystal-calendar-cell-with-tasks {
  min-height: 100px;
}

/* 修复添加padding导致的样式问题 */
:deep(.el-calendar-table .el-calendar-day) {
  position: relative;
  box-sizing: border-box;
}

/* 自定义颜色样式 */
.has-custom-color :deep(.el-calendar__header-title) {
  color: v-bind('props.textColor || "inherit"');
}

.has-custom-color :deep(.el-calendar__body) {
  color: v-bind('props.textColor || "inherit"');
}

/* 禁用状态样式 */
:deep(.el-calendar-day.is-disabled .crystal-calendar-cell) {
  color: #c0c4cc;
  cursor: not-allowed;
}

:deep(.el-calendar-day.is-disabled:hover .crystal-calendar-cell) {
  background-color: transparent;
}

/* 尺寸样式 */
:deep(.el-calendar--small .el-calendar__body) {
  font-size: 12px;
}

:deep(.el-calendar--large .el-calendar__body) {
  font-size: 16px;
}

/* 边框样式 */
:deep(.el-calendar--bordered) {
  border-color: v-bind('props.color || "#dcdfe6"');
}
</style>