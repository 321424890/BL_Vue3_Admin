<template>
  <div 
    class="crystal-checkbox-wrapper"
    :class="{
      'has-custom-color': !!props.checkboxColor || !!groupCheckboxColor,
      'has-custom-border': !!props.borderColor,
      'has-custom-font': !!props.fontColor || !!groupFontColor,
      'is-highlighted': isHighlighted
    }"
    :style="customStyle"
  >
    <el-checkbox
      :model-value="currentModelValue"
      :label="props.label"
      :true-label="props.trueLabel"
      :false-label="props.falseLabel"
      :disabled="isGroupDisabled"
      :border="currentBorder"
      :size="currentSize"
      :name="props.name"
      :indeterminate="props.indeterminate"
      :before-change="isGroup ? checkboxGroup?.beforeChange : props.beforeChange"
      @change="handleChange"
      @click="handleClick"
      :style="{ color: props.fontColor || groupFontColor }"
    >
      <template #default>
        <slot></slot>
      </template>
    </el-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, inject } from 'vue'
import { ElCheckbox } from 'element-plus'

interface Props {
  modelValue: boolean | any
  label?: any
  trueLabel?: any
  falseLabel?: any
  disabled?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  name?: string
  checked?: boolean
  indeterminate?: boolean
  beforeChange?: (val: boolean) => boolean
  min?: number
  max?: number
  controls?: string
  // 新增自定义属性
  highlight?: boolean // 是否启用点亮点功能
  highlightColor?: string // 点亮点颜色
  checkboxColor?: string // 复选框自定义颜色
  borderColor?: string // 边框自定义颜色
  hoverColor?: string // 鼠标悬停颜色
  fontColor?: string // 自定义字体颜色
  fillColor?: string // 填充颜色
}

interface CheckboxGroup {
  name: string
  modelValue: any
  disabled: any
  min?: any
  max?: any
  size: any
  border: any
  beforeChange?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  border: false,
  size: 'default',
  // 新增属性默认值
  highlight: false,
  highlightColor: '#409EFF',
  checkboxColor: '',
  borderColor: '',
  hoverColor: '#409EFF',
  fontColor: '',
  fillColor: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

// 注入父组件的checkboxGroup
const checkboxGroup = inject<CheckboxGroup>('checkboxGroup', undefined)

// 是否在checkboxGroup中
const isGroup = computed(() => checkboxGroup !== undefined)

// 组内的复选框颜色
const groupCheckboxColor = computed(() => {
  if (isGroup.value && checkboxGroup) {
    // 从group中获取填充颜色作为复选框颜色
    // @ts-ignore
    return checkboxGroup.fillColor
  }
  return ''
})

// 组内的字体颜色
const groupFontColor = computed(() => {
  if (isGroup.value && checkboxGroup) {
    // @ts-ignore
    return checkboxGroup.textColor
  }
  return ''
})

// 当前的边框状态
const currentBorder = computed(() => {
  return isGroup.value && checkboxGroup ? checkboxGroup.border.value : props.border
})

// 当前的尺寸
const currentSize = computed(() => {
  return isGroup.value && checkboxGroup ? checkboxGroup.size.value : props.size
})

// 当前是否禁用
const isGroupDisabled = computed(() => {
  return props.disabled || (isGroup.value && checkboxGroup ? checkboxGroup.disabled.value : false)
})

// 当前的值
const currentModelValue = computed(() => {
  return isGroup.value && checkboxGroup ? undefined : props.modelValue
})

// 点亮点状态管理
const isHighlighted = ref(props.highlight)

// 监听点亮点属性变化
watch(() => props.highlight, (newVal) => {
  isHighlighted.value = newVal
})

// 处理点击事件 - 实现点亮点功能
const handleClick = (event: MouseEvent) => {
  // 只有在启用点亮点功能且未禁用时才响应点击
  if (props.highlight && !isGroupDisabled.value) {
    // 切换点亮点状态
    isHighlighted.value = !isHighlighted.value
  }
}

// 处理值变化事件
const handleChange = (val: boolean) => {
  if (isGroup.value) {
    // 在组内时，通过inject的方式通知父组件
    // 具体的状态同步由checkboxGroup负责
  } else {
    // 不在组内时，正常更新值
    emit('update:modelValue', val)
  }
  emit('change', val)
}

// 自定义样式计算
const customStyle = computed(() => {
  const style: Record<string, string | number | undefined> = {};
  
  // 应用自定义颜色样式
  const finalCheckboxColor = props.checkboxColor || groupCheckboxColor.value || props.fillColor
  if (finalCheckboxColor) {
    style['--crystal-checkbox-color'] = finalCheckboxColor;
  }
  
  if (props.borderColor) {
    style['--crystal-border-color'] = props.borderColor;
  }
  
  if (props.highlightColor && isHighlighted.value) {
    // 直接设置点亮点背景色，避免CSS变量作用域问题
    style['--crystal-highlight-color'] = props.highlightColor;
    style.backgroundColor = `${props.highlightColor}10`; // 添加10%透明度
  }
  
  if (props.hoverColor) {
    style['--crystal-hover-color'] = props.hoverColor;
  }
  
  return style;
});

// 导出方法供父组件使用
defineExpose({
  toggleHighlight: () => {
    if (props.highlight && !isGroupDisabled.value) {
      isHighlighted.value = !isHighlighted.value;
    }
  }
})
</script>

<style scoped>
/* 基础样式 */
.crystal-checkbox-wrapper {
  --crystal-checkbox-color: #409EFF;
  --crystal-border-color: #dcdfe6;
  --crystal-highlight-color: #409EFF;
  --crystal-hover-color: #409EFF;
  
  display: inline-flex;
  align-items: center;
  position: relative;
}

/* 自定义颜色样式 */
.has-custom-color {
  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: var(--crystal-checkbox-color);
    border-color: var(--crystal-checkbox-color);
  }
  
  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    background-color: var(--crystal-checkbox-color);
    border-color: var(--crystal-checkbox-color);
  }
}

.has-custom-border {
  :deep(.el-checkbox__input .el-checkbox__inner) {
    border-color: var(--crystal-border-color);
  }
  
  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    border-color: var(--crystal-border-color);
  }
  
  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    border-color: var(--crystal-border-color);
  }
}

/* 自定义字体颜色 */
.has-custom-font {
  :deep(.el-checkbox__label) {
    color: inherit;
  }
}

/* 点亮点功能样式 - 修改为直接应用背景色而非伪元素 */
.is-highlighted {
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

/* 鼠标悬停效果 */
.crystal-checkbox-wrapper:not(.has-custom-color) {
  :deep(.el-checkbox__input:hover .el-checkbox__inner:not(:disabled)) {
    border-color: var(--crystal-hover-color);
  }
  
  :deep(.el-checkbox__input.is-checked:hover .el-checkbox__inner:not(:disabled)) {
    background-color: var(--crystal-hover-color);
    border-color: var(--crystal-hover-color);
  }
}

/* 不同尺寸的样式调整 */
:deep(.el-checkbox--large .el-checkbox__inner) {
  width: 18px;
  height: 18px;
}

:deep(.el-checkbox--small .el-checkbox__inner) {
  width: 14px;
  height: 14px;
}

/* 禁用状态样式 */
:deep(.el-checkbox__input.is-disabled) {
  .el-checkbox__inner {
    background-color: #f5f7fa !important;
    border-color: #dcdfe6 !important;
    color: #c0c4cc !important;
    cursor: not-allowed;
  }
  
  + .el-checkbox__label {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>