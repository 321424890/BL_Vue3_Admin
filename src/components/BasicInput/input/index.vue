<template>
  <!-- 使用动态 component 渲染 ElInput 并自动转发所有属性、事件和插槽 -->
  <component
    :is="ElInput"
    v-bind="{ ...props, ...$attrs }"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :style="borderStyle"
  >
    <!-- 自动转发所有插槽 -->
    <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { ElInput } from "element-plus"
import type { InputProps } from "element-plus"

// 定义扩展的属性接口，继承 ElInput 的所有属性并添加自定义属性
interface CrystalInputProps extends InputProps {
  // 边框主题颜色，支持十六进制、RGB、RGBA 等 CSS 颜色格式
  borderThemeColor?: string
}

// 设置组件名称和属性继承选项
defineOptions({
  name: "CrystalInput",
  inheritAttrs: false // 不自动绑定 $attrs 到根元素
})

// 定义组件属性，支持所有 ElInput 属性并添加自定义属性
const props = withDefaults(defineProps<CrystalInputProps>(), {
  modelValue: "",
  borderThemeColor: undefined
})

// 定义事件，支持所有 ElInput 事件
const emit = defineEmits<{
  "update:modelValue": [value: string | number]
  [eventName: string]: [event: any]
}>()

// 计算动态样式，使用内联样式直接设置边框颜色
const borderStyle = computed(() => {
  if (!props.borderThemeColor) return {}

  return {
    // 不使用CSS变量，直接设置具体样式属性
    "--el-border-color": props.borderThemeColor,
    "--el-border-color-hover": props.borderThemeColor,
    "--el-border-color-focus": props.borderThemeColor,
    "--el-input-border-color": props.borderThemeColor,
    "--el-input-border-color-hover": props.borderThemeColor,
    "--el-input-border-color-focus": props.borderThemeColor,
    "--el-input-focus-border-color": props.borderThemeColor
  }
})
</script>

<style scoped>
/* 使用全局样式覆盖方式，确保最高优先级 */
:deep(.el-input__wrapper) {
  /* 基础状态 */
  border-color: v-bind("props.borderThemeColor") !important;
  box-shadow: 0 0 0 1px v-bind("props.borderThemeColor") inset !important;
  transition: none !important;
}

:deep(.el-input__wrapper:hover) {
  /* 悬停状态 */
  border-color: v-bind("props.borderThemeColor") !important;
  box-shadow: 0 0 0 1px v-bind("props.borderThemeColor") inset !important;
}

:deep(.el-input__wrapper.is-focus) {
  /* 聚焦状态 */
  border-color: v-bind("props.borderThemeColor") !important;
  box-shadow: 0 0 0 1px v-bind("props.borderThemeColor") inset !important;
}

/* 对于有前缀和后缀的输入框，使用更具体的选择器 */
:deep(.el-input--prefix .el-input__wrapper),
:deep(.el-input--suffix .el-input__wrapper),
:deep(.el-input-group__wrapper) {
  border-color: v-bind("props.borderThemeColor") !important;
}

:deep(.el-input--prefix .el-input__wrapper:hover),
:deep(.el-input--suffix .el-input__wrapper:hover),
:deep(.el-input-group__wrapper:hover) {
  border-color: v-bind("props.borderThemeColor") !important;
  box-shadow: 0 0 0 1px v-bind("props.borderThemeColor") inset !important;
}

:deep(.el-input--prefix .el-input__wrapper.is-focus),
:deep(.el-input--suffix .el-input__wrapper.is-focus),
:deep(.el-input-group__wrapper.is-focus) {
  border-color: v-bind("props.borderThemeColor") !important;
  box-shadow: 0 0 0 1px v-bind("props.borderThemeColor") inset !important;
}

/* 错误状态使用更高优先级确保默认样式 */
:deep(.el-input__wrapper.is-error) {
  border-color: var(--el-input-error-border-color) !important;
  box-shadow: 0 0 0 1px var(--el-input-error-border-color) inset !important;
}

:deep(.el-input--prefix .el-input__wrapper.is-error),
:deep(.el-input--suffix .el-input__wrapper.is-error) {
  border-color: var(--el-input-error-border-color) !important;
  box-shadow: 0 0 0 1px var(--el-input-error-border-color) inset !important;
}
</style>
