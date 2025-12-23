<template>
  <div 
    class="crystal-radio-wrapper"
    :class="{
      'has-custom-color': !!props.radioColor || !!groupRadioColor.value,
      'has-custom-border': !!props.borderColor,
      'has-custom-font': !!props.fontColor || !!groupFontColor.value,
      'is-highlighted': isHighlighted
    }"
    :style="customStyle"
  >
    <el-radio
      v-model="currentModelValue"
      :label="props.label"
      :true-label="props.trueLabel"
      :false-label="props.falseLabel"
      :disabled="isGroupDisabled"
      :border="currentBorder"
      :size="currentSize"
      :name="props.name"
      :before-change="isGroup ? radioGroup?.beforeChange : props.beforeChange"
      @change="handleChange"
      @click="handleClick"
    >
      <slot></slot>
    </el-radio>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, inject } from 'vue'
import type { Ref } from 'vue'
import { ElRadio } from 'element-plus'

interface Props {
  modelValue: any
  label?: any
  trueLabel?: any
  falseLabel?: any
  disabled?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  name?: string
  checked?: boolean
  beforeChange?: (val: any) => boolean
  // 新增自定义属性
  highlight?: boolean // 是否启用点亮点功能
  highlightColor?: string // 点亮点颜色
  radioColor?: string // 单选框自定义颜色
  borderColor?: string // 边框自定义颜色
  hoverColor?: string // 鼠标悬停颜色
  fontColor?: string // 自定义字体颜色
  fillColor?: string // 填充颜色
}

interface RadioGroup {
  name: string
  modelValue: Ref<any>
  disabled: Ref<boolean>
  size: Ref<'large' | 'default' | 'small'>
  border: Ref<boolean>
  fillColor: string
  textColor: string
  beforeChange?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: true,
  disabled: false,
  border: false,
  size: 'default',
  // 新增属性默认值
  highlight: false,
  highlightColor: '#409EFF',
  radioColor: '',
  borderColor: '',
  hoverColor: '#409EFF',
  fontColor: '',
  fillColor: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

// 注入父组件的radioGroup
const radioGroup = inject<RadioGroup | undefined>('radioGroup', undefined)

// 是否在radioGroup中
const isGroup = computed(() => radioGroup !== undefined)

// 组内的单选框颜色
const groupRadioColor = computed(() => {
  if (isGroup.value && radioGroup) {
    // 从group中获取填充颜色作为单选框颜色
    // @ts-ignore
    return radioGroup.fillColor
  }
  return ''
})

// 组内的字体颜色
const groupFontColor = computed(() => {
  if (isGroup.value && radioGroup) {
    // @ts-ignore
    return radioGroup.textColor
  }
  return ''
})

// 组内的边框颜色
const groupBorderColor = computed(() => {
  if (isGroup.value && radioGroup) {
    // @ts-ignore
    return radioGroup.borderColor
  }
  return ''
})

// 当前的边框状态
const currentBorder = computed(() => {
  return isGroup.value && radioGroup ? radioGroup.border.value : props.border
})

// 当前的尺寸
const currentSize = computed(() => {
  return isGroup.value && radioGroup ? radioGroup.size.value : props.size
})

// 当前是否禁用
const isGroupDisabled = computed(() => {
  return props.disabled || (isGroup.value && radioGroup ? radioGroup.disabled.value : false)
})

// 当前的值 - 使用响应式变量存储
const currentModelValue = ref(props.modelValue)

// 监听 props.modelValue 的变化
watch(() => props.modelValue, (newVal) => {
  currentModelValue.value = newVal
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
const handleChange = (val: any) => {
  if (!isGroup.value) {
    emit('update:modelValue', val)
  }
  emit('change', val)
}

// 自定义样式计算
const customStyle = computed(() => {
  const style: Record<string, string | number | undefined> = {};
  
  // 应用自定义颜色样式 - 优先使用组件自身的radioColor
  const finalRadioColor = props.radioColor || props.fillColor || groupRadioColor.value
  if (finalRadioColor) {
    style['--crystal-radio-color'] = finalRadioColor;
  }
  
  // 应用自定义字体颜色
  const finalFontColor = props.fontColor || groupFontColor.value
  if (finalFontColor) {
    style['--crystal-font-color'] = finalFontColor;
  }
  
  // 应用自定义边框颜色，优先使用组内的边框颜色
  const finalBorderColor = props.borderColor || groupBorderColor.value
  if (finalBorderColor) {
    style['--crystal-border-color'] = finalBorderColor;
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
.crystal-radio-wrapper {
  --crystal-radio-color: #409EFF;
  --crystal-font-color: #606266;
  --crystal-border-color: #dcdfe6;
  --crystal-highlight-color: #409EFF;
  --crystal-hover-color: #409EFF;
  
  display: inline-flex;
  align-items: center;
  position: relative;
}

/* 自定义颜色样式 */
.has-custom-color {
  :deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: var(--crystal-radio-color) !important;
    border-color: var(--crystal-radio-color) !important;
  }
}

.has-custom-border {
  :deep(.el-radio__input .el-radio__inner) {
    border-color: var(--crystal-border-color);
  }
  
  :deep(.el-radio__input.is-checked .el-radio__inner) {
    border-color: var(--crystal-border-color);
  }
}

/* 自定义字体颜色 */
.has-custom-font {
  :deep(.el-radio__label) {
    color: var(--crystal-font-color) !important;
  }
}

/* 点亮点功能样式 - 修改为直接应用背景色而非伪元素 */
.is-highlighted {
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

/* 鼠标悬停效果 */
.crystal-radio-wrapper {
  :deep(.el-radio__input:hover .el-radio__inner:not(:disabled)) {
    border-color: var(--crystal-hover-color);
  }
  
  /* 只有在没有自定义颜色时才改变选中状态的悬停颜色 */
  &:not(.has-custom-color) :deep(.el-radio__input.is-checked:hover .el-radio__inner:not(:disabled)) {
    background-color: var(--crystal-hover-color);
    border-color: var(--crystal-hover-color);
  }
}

/* 不同尺寸的样式调整 */
:deep(.el-radio--large .el-radio__inner) {
  width: 18px;
  height: 18px;
}

:deep(.el-radio--small .el-radio__inner) {
  width: 14px;
  height: 14px;
}

/* 禁用状态样式 */
:deep(.el-radio__input.is-disabled) {
  .el-radio__inner {
    background-color: #f5f7fa !important;
    border-color: #dcdfe6 !important;
    color: #c0c4cc !important;
    cursor: not-allowed;
  }
  
  + .el-radio__label {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>