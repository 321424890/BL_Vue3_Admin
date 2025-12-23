<template>
  <div 
    class="crystal-radio-group-wrapper"
    :class="{
      'has-custom-color': !!props.fillColor || !!props.fill,
      'has-custom-text': !!props.textColor,
      'has-custom-border': !!props.borderColor
    }"
    :style="customStyle"
  >
    <el-radio-group
      :model-value="props.modelValue"
      :disabled="props.disabled"
      :size="props.size"
      :fill="props.fillColor"
      :text-color="props.textColor"
      :border="props.border"
      :name="props.name"
      :before-change="props.beforeChange"
      @change="handleChange"
    >
      <template #default>
        <slot></slot>
      </template>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, provide } from 'vue'
import { ElRadioGroup } from 'element-plus'

interface Props {
  modelValue: any
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
  fill?: string
  textColor?: string
  border?: boolean
  name?: string
  beforeChange?: (val: any) => boolean
  // 新增自定义属性
  fillColor?: string // 填充颜色
  borderColor?: string // 边框颜色
  highlight?: boolean // 是否启用点亮点功能
  highlightColor?: string // 点亮点颜色
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  size: 'default',
  fill: '#409EFF',
  textColor: '#606266',
  border: false,
  // 新增属性默认值
  fillColor: '',
  borderColor: '',
  highlight: false,
  highlightColor: '#409EFF'
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

// 提供给子组件的radioGroup配置
provide('radioGroup', {
  name: 'crystal-radio-group',
  modelValue: ref(props.modelValue),
  disabled: ref(props.disabled),
  size: ref(props.size),
  border: ref(props.border),
  fillColor: props.fillColor || props.fill,
  textColor: props.textColor,
  borderColor: props.borderColor,
  beforeChange: props.beforeChange
})

// 处理值变化事件
const handleChange = (val: any) => {
  emit('update:modelValue', val)
  emit('change', val)
}

// 自定义样式计算
const customStyle = computed(() => {
  const style: Record<string, string | number | undefined> = {};
  
  // 应用自定义颜色样式
  if (props.fillColor) {
    style['--crystal-fill-color'] = props.fillColor;
  }
  
  if (props.textColor) {
    style['--crystal-text-color'] = props.textColor;
  }
  
  if (props.borderColor) {
    style['--crystal-border-color'] = props.borderColor;
  }
  
  return style;
});

// 监听modelValue变化
watch(() => props.modelValue, (newVal) => {
  // 可以在这里添加额外的逻辑
})
</script>

<style scoped>
/* 基础样式 */
.crystal-radio-group-wrapper {
  --crystal-fill-color: #409EFF;
  --crystal-text-color: #606266;
  --crystal-border-color: #dcdfe6;
  
  display: inline-block;
  position: relative;
}

/* 自定义颜色样式 */
.has-custom-color {
  :deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: var(--crystal-fill-color);
    border-color: var(--crystal-fill-color);
  }
  
  :deep(.el-radio__input.is-checked + .el-radio__label) {
    color: var(--crystal-fill-color);
  }
}

.has-custom-text {
  :deep(.el-radio__label) {
    color: var(--crystal-text-color);
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

/* 边框样式 */
:deep(.el-radio--border) {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 15px;
  line-height: 32px;
  margin-right: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #409EFF;
  }
  
  &.is-checked {
    border-color: #409EFF;
    background-color: #ecf5ff;
  }
}

/* 不同尺寸的边框样式 */
:deep(.el-radio--large.el-radio--border) {
  padding: 0 19px;
  line-height: 36px;
}

:deep(.el-radio--small.el-radio--border) {
  padding: 0 11px;
  line-height: 24px;
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