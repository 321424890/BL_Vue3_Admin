<template>
  <el-date-picker
    :model-value="modelValue"
    :type="type"
    :format="format"
    :range-separator="rangeSeparator"
    :default-value="defaultValue"
    :disabled-date="disabledDate"
    :cell-class-name="cellClassName"
    :teleported="teleported"
    :popper-class="popperClass"
    :placement="placement"
    :append-to-body="appendToBody"
    :destroy-on-close="destroyOnClose"
    :unlink-panels="unlinkPanels"
    :first-day-of-week="firstDayOfWeek"
    :picker-options="pickerOptions"
    :shortcuts="shortcuts"
    :size="size"
    :border="border"
    :readonly="readonly"
    :clearable="clearable"
    :validate-event="validateEvent"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :editable="editable"
    :disabled="disabled"
    :allow-input="allowInput"
    :input-size="inputSize"
    :unlink-pickers="unlinkPickers"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :selection-mode="selectionMode"
    :show-week-numbers="showWeekNumbers"
    :show-borders="showBorders"
    @update:model-value="handleUpdateModelValue"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
    @calendar-change="handleCalendarChange"
    @panel-change="handlePanelChange"
    @visible-change="handleVisibleChange"
  >
    <slot />
  </el-date-picker>
</template>

<script setup lang="ts">
import { ElDatePicker } from "element-plus"
import type { DatePickerProps } from "element-plus"
import type { PropType } from "vue"

// 定义组件属性
const props = withDefaults(
  defineProps<{
    modelValue: Date | Date[] | string | string[] | number | number[] | null | undefined
    type?: DatePickerProps["type"]
    format?: string
    rangeSeparator?: string
    defaultValue?: Date | Date[] | string | string[] | number | number[]
    disabledDate?: (time: Date) => boolean
    cellClassName?: string | ((date: Date) => string)
    teleported?: boolean
    popperClass?: string
    placement?: string
    appendToBody?: boolean
    destroyOnClose?: boolean
    unlinkPanels?: boolean
    firstDayOfWeek?: number
    pickerOptions?: Record<string, any>
    shortcuts?: DatePickerProps["shortcuts"]
    size?: DatePickerProps["size"]
    border?: boolean
    readonly?: boolean
    clearable?: boolean
    validateEvent?: boolean
    autofocus?: boolean
    placeholder?: string
    editable?: boolean
    disabled?: boolean
    allowInput?: boolean
    inputSize?: DatePickerProps["inputSize"]
    unlinkPickers?: boolean
    startPlaceholder?: string
    endPlaceholder?: string
    selectionMode?: string
    showWeekNumbers?: boolean
    showBorders?: boolean
  }>(),
  {
    type: "date",
    format: "YYYY-MM-DD",
    rangeSeparator: "-",
    teleported: true,
    appendToBody: true,
    firstDayOfWeek: 1,
    border: false,
    readonly: false,
    clearable: true,
    validateEvent: true,
    autofocus: false,
    editable: true,
    disabled: false,
    allowInput: false,
    showWeekNumbers: false,
    showBorders: false
  }
)

// 定义事件
const emit = defineEmits<{
  "update:modelValue": [value: Date | Date[] | string | string[] | number | number[] | null | undefined]
  change: [value: Date | Date[] | string | string[] | number | number[] | null | undefined]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  "calendar-change": [value: Date | Date[] | string | string[] | number | number[] | null | undefined]
  "panel-change": [date: Date, mode: string]
  "visible-change": [visible: boolean]
}>()

// 处理 modelValue 更新
const handleUpdateModelValue = (value: any) => {
  emit("update:modelValue", value)
}

// 处理 change 事件
const handleChange = (value: any) => {
  emit("change", value)
}

// 处理 blur 事件
const handleBlur = (event: FocusEvent) => {
  emit("blur", event)
}

// 处理 focus 事件
const handleFocus = (event: FocusEvent) => {
  emit("focus", event)
}

// 处理 calendar-change 事件
const handleCalendarChange = (value: any) => {
  emit("calendar-change", value)
}

// 处理 panel-change 事件
const handlePanelChange = (date: Date, mode: string) => {
  emit("panel-change", date, mode)
}

// 处理 visible-change 事件
const handleVisibleChange = (visible: boolean) => {
  emit("visible-change", visible)
}
</script>

<style scoped>
/* 可添加自定义样式 */
</style>
