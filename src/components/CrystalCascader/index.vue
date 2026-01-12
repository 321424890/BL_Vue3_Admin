<template>
  <div 
    class="crystal-cascader-wrapper"
    :class="{
      'crystal-cascader-borderless': !props.border,
      [`crystal-cascader-${props.effect}`]: true,
      // 根据是否有自定义颜色添加对应的类名
      'has-custom-border': !!props.borderColor,
      'has-custom-text': !!props.textColor
    }"
    :style="customStyle"
  >
    <el-cascader
      ref="cascaderRef"
      v-model="internalValue"
      :options="processedOptions"
      :props="mergedProps"
      :size="size"
      :disabled="disabled"
      :clearable="clearable"
      :show-all-levels="showAllLevels"
      :collapse-tags="collapseTags"
      :separator="separator"
      :filterable="filterable"
      :debounce="debounce"
      :placeholder="placeholder"
      :popper-append-to-body="popperAppendToBody"
      :teleported="teleported"
      :validate-event="validateEvent"
      :multiple-limit="multipleLimit"
      :reserve-keyword="reserveKeyword"
      :popper-class="[popperClass, highlightSearchText ? 'crystal-cascader-popper-highlight' : '']"
      :before-filter="handleBeforeFilter"
      :automatic-dropdown="automaticDropdown"
      :fit-input-width="fitInputWidth"
      @change="handleChange"
      @visible-change="handleVisibleChange"
      @expand-change="handleExpandChange"
      @remove-tag="handleRemoveTag"
    >
      <!-- 自定义选项插槽 -->
      <template v-slot:default="{ node, data }">
        <slot name="option" :node="node" :data="data">
          <span v-if="props.highlightSearchText && searchText && data.__highlightedLabel" v-html="data.__highlightedLabel"></span>
          <span v-else>{{ data[props.label] }}</span>
        </slot>
      </template>
      
      <!-- 自定义标签插槽 -->
      <template v-slot:tags="{ node, data }">
        <slot name="tags" :node="node" :data="data">
          <span v-if="props.highlightSearchText && searchText && data.__highlightedLabel" v-html="data.__highlightedLabel"></span>
          <span v-else>{{ data[props.label] }}</span>
        </slot>
      </template>
      
      <!-- 前缀插槽 -->
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      
      <!-- 后缀插槽 -->
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
    </el-cascader>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { ElCascader } from 'element-plus'

interface Props {
  modelValue: any
  options: any[]
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  clearable?: boolean
  showAllLevels?: boolean
  collapseTags?: boolean
  separator?: string
  filterable?: boolean
  debounce?: number
  placeholder?: string
  popperAppendToBody?: boolean
  checkStrictly?: boolean
  teleportTo?: string | HTMLElement
  autoClearSearch?: boolean
  useCustomFilter?: boolean
  // 原组件属性
  teleported?: boolean
  validateEvent?: boolean
  multipleLimit?: number | null
  reserveKeyword?: boolean
  popperClass?: string
  beforeFilter?: () => boolean
  automaticDropdown?: boolean
  fitInputWidth?: boolean
  // 自定义属性
  value?: string
  label?: string
  children?: string
  // 基础属性
  effect?: string
  border?: boolean
  width?: string | number
  // 新增属性：搜索高亮
  highlightSearchText?: boolean
  // 新增样式属性
  borderColor?: string
  backgroundColor?: string
  textColor?: string
  placeholderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  disabled: false,
  clearable: true,
  showAllLevels: true,
  collapseTags: false,
  separator: '/',
  filterable: false,
  debounce: 300,
  placeholder: '请选择',
  popperAppendToBody: true,
  checkStrictly: false,
  teleportTo: 'body',
  autoClearSearch: true,
  useCustomFilter: false,
  // 原组件属性默认值
  teleported: true,
  validateEvent: true,
  multipleLimit: null,
  reserveKeyword: true, // 修改为true以保留搜索关键字
  popperClass: '',
  beforeFilter: undefined,
  automaticDropdown: false,
  fitInputWidth: false,
  // 自定义属性默认值
  value: 'value',
  label: 'label',
  children: 'children',
  effect: 'light',
  border: true,
  width: undefined,
  // 新增属性默认值
  highlightSearchText: true, // 默认为true，启用搜索高亮
  borderColor: undefined,
  backgroundColor: undefined,
  textColor: undefined,
  placeholderColor: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
  'visibleChange': [visible: boolean]
  'expandChange': [value: any]
  'remove-tag': [value: any]
}>()

const cascaderRef = ref<InstanceType<typeof ElCascader>>()
// 记录搜索文本
const searchText = ref('')
// 记录当前高亮状态的文本，确保在选择后也能保持高亮
const currentHighlightText = ref('')

// 内部值管理
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

// 监听modelValue变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    emit('change', newValue)
  }
}, { deep: true })

// 处理搜索文本变化
const handleBeforeFilter = (value: string) => {
  searchText.value = value
  // 保存当前高亮文本，用于后续选中项的高亮显示
  if (props.highlightSearchText && value) {
    currentHighlightText.value = value
  }
  if (props.beforeFilter) {
    return props.beforeFilter()
  }
  return true
}

// 高亮处理函数
const highlightText = (text: string, keyword: string) => {
  if (!keyword) return text
  
  // 使用正则表达式匹配关键字，支持大小写不敏感搜索
  const regex = new RegExp(`(${keyword})`, 'gi')
  const parts = text.split(regex)
  
  // 如果没有匹配项，直接返回原始文本
  if (parts.length === 1) return text
  
  // 构建包含高亮标签的文本
  let result = ''
  parts.forEach((part, index) => {
    // 奇数索引位置为匹配到的关键字
    if (index % 2 === 1) {
      result += `<span class="search-highlight">${part}</span>`
    } else {
      result += part
    }
  })
  
  return result
}

// 处理options数据
const processedOptions = computed(() => {
  // 确保options是数组格式
  if (!Array.isArray(props.options)) {
    console.warn('CrystalCascader: options prop must be an array')
    return []
  }
  
  // 深拷贝options数组以避免修改原始数据
  const processedOptions = JSON.parse(JSON.stringify(props.options))
  
  // 获取用于高亮的关键字，优先使用searchText，如果没有则使用currentHighlightText
  const highlightKeyword = searchText.value || currentHighlightText.value
  
  // 递归处理每个选项
  const processOptions = (options: any[]) => {
    options.forEach(option => {
      // 如果启用了搜索高亮功能且有搜索文本或当前高亮文本，添加高亮处理
      if (props.highlightSearchText && highlightKeyword) {
        const labelText = option[props.label] || ''
        // 保存高亮版本的标签文本到专用属性
        option.__highlightedLabel = highlightText(labelText.toString(), highlightKeyword)
      } else {
        // 清除可能存在的高亮标记
        delete option.__highlightedLabel
      }
      
      // 递归处理子选项
      if (option[props.children] && Array.isArray(option[props.children])) {
        processOptions(option[props.children])
      }
    })
  }
  
  processOptions(processedOptions)
  return processedOptions
})

// 合并组件props配置
const mergedProps = computed(() => {
  return {
    value: props.value,
    label: props.label,
    children: props.children,
    checkStrictly: props.checkStrictly,
    expandTrigger: 'click',
    emitPath: true,
    multiple: props.multipleLimit !== null,
    lazy: false
  }
})

// 事件处理函数
const handleChange = (value: any) => {
  emit('change', value)
  // 保留搜索文本和高亮状态
  // 使用setTimeout确保在DOM更新后执行
  nextTick(() => {
    // 确保即使在选择后，高亮状态也能保持
    if (props.highlightSearchText && searchText.value) {
      currentHighlightText.value = searchText.value
    }
  })
}

const handleVisibleChange = (visible: boolean) => {
  emit('visibleChange', visible)
  
  // 如果设置为不自动清除搜索内容，则保留搜索文本
  if (!props.autoClearSearch) return
  
  // 只有当下拉框关闭且没有选中值时才清除搜索
  if (!visible && !internalValue.value && cascaderRef.value) {
    nextTick(() => {
      try {
        // @ts-ignore
        const input = cascaderRef.value?.$el?.querySelector('.el-cascader__search-input')
        if (input) {
          // @ts-ignore
          input.value = ''
          searchText.value = ''
          // 清除当前高亮文本
          if (!internalValue.value) {
            currentHighlightText.value = ''
          }
        }
      } catch (error) {
        console.warn('Failed to clear search input:', error)
      }
    })
  }
}

const handleExpandChange = (value: any) => {
  emit('expandChange', value)
}

const handleRemoveTag = (value: any) => {
  // 移除标签时触发change事件
  emit('change', internalValue.value)
  emit('remove-tag', value)
}

// 导出方法供父组件使用
defineExpose({
  focus: () => {
    cascaderRef.value?.focus()
  },
  blur: () => {
    cascaderRef.value?.blur()
  },
  handleClose: () => {
    cascaderRef.value?.handleClose()
  }
})

// 自定义样式计算
const customStyle = computed(() => {
  const style: Record<string, string | number | undefined> = {};
  
  // 应用宽度样式
  if (props.width) {
    style.width = props.width;
  }
  
  // 直接应用颜色样式，而不仅仅是CSS变量
  if (props.borderColor) {
    style['--crystal-border-color'] = props.borderColor;
    style.borderColor = props.borderColor; // 直接应用边框颜色
  }
  
  if (props.backgroundColor) {
    style['--crystal-bg-color'] = props.backgroundColor;
    style.backgroundColor = props.backgroundColor;
  }
  
  if (props.textColor) {
    style['--crystal-text-color'] = props.textColor;
    style.color = props.textColor; // 直接应用文本颜色
  }
  
  if (props.placeholderColor) {
    style['--crystal-placeholder-color'] = props.placeholderColor;
  }
  
  return style;
});
</script>

<style scoped>
/* 确保样式定义在最前面，提高优先级 */
/* 自定义颜色基础样式 - 使用CSS变量覆盖 */
.crystal-cascader-wrapper {
  /* 先定义自定义颜色变量 */
  --crystal-border-color: var(--crystal-border-color, #409EFF);
  --crystal-text-color: var(--crystal-text-color, inherit);
  --crystal-bg-color: var(--crystal-bg-color, transparent);
  --crystal-placeholder-color: var(--crystal-placeholder-color, currentColor);
}

/* 增强组件容器样式优先级 */
.crystal-cascader-wrapper {
  width: 100%;
  min-width: 200px;
  position: relative;
}

/* 确保级联选择器正常显示 */
:deep(.el-cascader) {
  width: 100%;
  --el-input-border-color: var(--crystal-border-color, var(--el-input-border-color));
  --el-text-color-primary: var(--crystal-text-color, var(--el-text-color-primary));
  --el-text-color-regular: var(--crystal-text-color, var(--el-text-color-regular));
}

/* 直接应用样式到元素 */
:deep(.el-cascader__input) {
  color: var(--crystal-text-color, inherit) !important;
  border-color: var(--crystal-border-color, currentColor) !important;
}

:deep(.el-input__wrapper) {
  --el-input-border-color: var(--crystal-border-color, var(--el-input-border-color)) !important;
  --el-input-text-color: var(--crystal-text-color, var(--el-input-text-color)) !important;
}

:deep(.el-input__inner) {
  color: var(--crystal-text-color, inherit) !important;
  border-color: var(--crystal-border-color, currentColor) !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--crystal-border-color, #409EFF) inset !important;
  border-color: var(--crystal-border-color, #409EFF) !important;
}

/* 自定义颜色样式增强 - 增强优先级确保样式生效 */
.has-custom-border {
  /* 直接设置CSS变量，确保全局生效 */
  --el-input-border-color: var(--crystal-border-color) !important;
  --el-border-color: var(--crystal-border-color) !important;
  
  :deep(.el-cascader) {
    /* 深层穿透样式 */
    &.el-cascader {
      --el-input-border-color: var(--crystal-border-color) !important;
    }
    
    .el-input {
      --el-input-border-color: var(--crystal-border-color) !important;
    }
    
    .el-input__wrapper {
      --el-input-border-color: var(--crystal-border-color) !important;
      border-color: var(--crystal-border-color) !important;
      box-shadow: 0 0 0 1px var(--crystal-border-color) inset !important;
      
      &.is-focus {
        border-color: var(--crystal-border-color) !important;
        box-shadow: 0 0 0 1px var(--crystal-border-color) inset !important;
      }
    }
    
    .el-input__inner {
      border-color: var(--crystal-border-color) !important;
    }
    
    .el-cascader__input {
      border-color: var(--crystal-border-color) !important;
      
      &.is-focus {
        border-color: var(--crystal-border-color) !important;
      }
    }
  }
}

/* 有自定义文本颜色的情况 - 增强优先级 */
.has-custom-text {
  /* 直接设置CSS变量，确保全局生效 */
  --el-text-color-primary: var(--crystal-text-color) !important;
  --el-text-color-regular: var(--crystal-text-color) !important;
  
  :deep(.el-cascader) {
    /* 深层穿透样式 */
    &.el-cascader {
      --el-text-color-primary: var(--crystal-text-color) !important;
    }
    
    .el-input {
      --el-input-text-color: var(--crystal-text-color) !important;
    }
    
    .el-input__wrapper {
      --el-input-text-color: var(--crystal-text-color) !important;
    }
    
    .el-input__inner {
      color: var(--crystal-text-color) !important;
    }
    
    .el-cascader__input {
      color: var(--crystal-text-color) !important;
    }
    
    .el-cascader__search-input {
      color: var(--crystal-text-color) !important;
    }
    
    .el-cascader__search-input::placeholder {
      color: var(--crystal-text-color) !important;
    }
  }
}

/* 直接应用到最外层元素，提高优先级 */
.crystal-cascader-wrapper.has-custom-border {
  :deep(.el-cascader__input.is-focus),
  :deep(.el-input__wrapper.is-focus) {
    border-color: var(--crystal-border-color) !important;
    box-shadow: 0 0 0 1px var(--crystal-border-color) inset !important;
  }
  
  :deep(.el-input__inner) {
    border-color: var(--crystal-border-color) !important;
  }
}

.crystal-cascader-wrapper.has-custom-text {
  :deep(.el-cascader__input),
  :deep(.el-input__inner),
  :deep(.el-cascader__search-input) {
    color: var(--crystal-text-color) !important;
  }
}

:deep(.el-cascader__input) {
  color: var(--crystal-text-color, inherit);
  background-color: var(--crystal-bg-color, transparent);
  border-color: var(--crystal-border-color, currentColor);
}

:deep(.el-cascader__input::placeholder) {
  color: var(--crystal-placeholder-color, currentColor);
}

:deep(.el-input__wrapper) {
  background-color: var(--crystal-bg-color, transparent);
}

/* 响应式样式调整 */
@media (max-width: 768px) {
  .crystal-cascader-wrapper {
    width: 100% !important;
  }
}

/* 标签中高亮文本样式 - 确保选中后高亮依然可见 */
:deep(.el-tag) {
  .search-highlight {
    color: var(--el-color-primary);
    font-weight: 600;
    background-color: rgba(64, 158, 255, 0.1);
    border-radius: 2px;
    padding: 0 2px;
    display: inline;
  }
}

:deep(.el-cascader__tags) {
  .search-highlight {
    color: var(--el-color-primary);
    font-weight: 600;
    background-color: rgba(64, 158, 255, 0.1);
    border-radius: 2px;
    padding: 0 2px;
    display: inline;
  }
}</style>
