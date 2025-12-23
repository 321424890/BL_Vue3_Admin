<template>
  <div 
    class="crystal-checkbox-group-wrapper"
    :class="{
      'has-custom-color': !!props.checkboxColor || !!props.fillColor,
      'has-custom-border': !!props.borderColor,
      'has-custom-font': !!props.fontColor || !!props.textColor,
      'is-horizontal': props.direction === 'horizontal'
    }"
    :style="customStyle"
  >
    <el-checkbox-group
      :model-value="props.modelValue"
      :size="props.size"
      :disabled="props.disabled"
      :min="props.min"
      :max="props.max"
      @change="handleChange"
      :style="{ display: props.direction === 'vertical' ? 'block' : 'inline-block' }"
    >
      <!-- 自定义选项插槽 -->
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <!-- 自动渲染选项 -->
      <template v-else-if="props.options && props.options.length > 0">
        <div 
          v-for="option in props.options" 
          :key="option.value || option.label"
          :style="{ display: props.direction === 'vertical' ? 'block' : 'inline-block', marginRight: props.direction === 'horizontal' ? '12px' : '0' }"
        >
          <el-checkbox
            :label="option.value || option.label"
            :disabled="props.disabled || option.disabled"
            :border="props.border"
            :style="{ color: props.fontColor || props.textColor }"
          >
            {{ option.label || option.value }}
          </el-checkbox>
        </div>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from 'vue'
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'

interface CheckboxOption {
  label: string
  value: any
  disabled?: boolean
}

interface Props {
  modelValue: any[]
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  min?: number
  max?: number
  border?: boolean
  options?: CheckboxOption[]
  direction?: 'horizontal' | 'vertical'
  beforeChange?: (val: any[]) => boolean
  // 自定义属性
  checkboxColor?: string
  fillColor?: string
  borderColor?: string
  fontColor?: string
  textColor?: string
  highlight?: boolean
  highlightColor?: string
  hoverColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  size: 'default',
  disabled: false,
  border: false,
  direction: 'horizontal',
  checkboxColor: '',
  fillColor: '',
  borderColor: '',
  fontColor: '',
  textColor: '',
  highlight: false,
  highlightColor: '#409EFF',
  hoverColor: '#409EFF'
})

const emit = defineEmits<{
  'update:modelValue': [value: any[]]
  'change': [value: any[]]
}>()

// 提供给子组件的上下文
provide('checkboxGroup', {
  name: 'CrystalCheckboxGroup',
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  min: props.min,
  max: props.max,
  size: computed(() => props.size),
  border: computed(() => props.border),
  fillColor: props.fillColor,
  textColor: props.textColor,
  beforeChange: props.beforeChange
})

// 自定义样式计算
const customStyle = computed(() => {
  const style: Record<string, string | number | undefined> = {};
  
  // 应用自定义颜色样式
  const finalCheckboxColor = props.checkboxColor || props.fillColor
  if (finalCheckboxColor) {
    style['--crystal-checkbox-color'] = finalCheckboxColor;
  }
  
  if (props.borderColor) {
    style['--crystal-border-color'] = props.borderColor;
  }
  
  if (props.fontColor || props.textColor) {
    style['--crystal-text-color'] = props.fontColor || props.textColor;
  }
  
  if (props.hoverColor) {
    style['--crystal-hover-color'] = props.hoverColor;
  }
  
  return style;
});

// 处理值变化事件
const handleChange = (val: any[]) => {
  // 调用beforeChange钩子
  if (props.beforeChange) {
    if (!props.beforeChange(val)) {
      return
    }
  }
  
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
/* 基础样式 */
.crystal-checkbox-group-wrapper {
  --crystal-checkbox-color: #409EFF;
  --crystal-border-color: #dcdfe6;
  --crystal-text-color: #303133;
  --crystal-hover-color: #409EFF;
  
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.is-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
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
    color: var(--crystal-text-color);
  }
}

/* 鼠标悬停效果 */
.crystal-checkbox-group-wrapper:not(.has-custom-color) {
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
