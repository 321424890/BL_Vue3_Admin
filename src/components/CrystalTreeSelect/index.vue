<template>
  <div 
    class="crystal-tree-wrapper"
    :id="`crystal-tree-${uniqueId}`"
    :class="{
      'has-custom-color': !!props.color || !!props.selectedColor || !!props.hoverColor || !!props.textColor || !!props.backgroundColor || !!props.borderColor || !!props.focusBorderColor || !!props.focusBoxShadow || !!props.selectedBorderColor || !!props.selectedBoxShadow,
      'has-custom-line': !!props.lineColor
    }"
  >
    <el-tree-select
      :model-value="props.modelValue"
      :data="props.data"
      :props="props.props"
      :node-key="props.nodeKey"
      :render-after-expand="props.renderAfterExpand"
      :show-checkbox="props.showCheckbox"
      :check-strictly="props.checkStrictly"
      :default-expand-all="props.defaultExpandAll"
      :default-expand-level="props.defaultExpandLevel"
      :accordion="props.accordion"
      :style="mergeStyles(props.style)"
      @update:model-value="(value: any) => emit('update:modelValue', value)"
      @visible-change="(visible: boolean) => emit('visible-change', visible)"
      @remove-tag="(value: any) => emit('remove-tag', value)"
      @clear="() => emit('clear')"
      @check-change="(data, checked, indeterminate) => emit('check-change', data, checked, indeterminate)"
      @check="(data, checked, indeterminate) => emit('check', data, checked, indeterminate)"
      @node-click="(data, node) => emit('node-click', data, node)"
      @node-expand="(data, node) => emit('node-expand', data, node)"
      @node-collapse="(data, node) => emit('node-collapse', data, node)"
    >
      <template #default="{ data, node }">
        <slot name="node" :data="data" :node="node">
          <span v-if="data.icon" class="custom-node-icon" :style="{ color: props.color }">{{ data.icon }}</span>
          <span :style="{ color: props.textColor }">{{ data[props.props?.label || 'label'] }}</span>
        </slot>
      </template>
    </el-tree-select>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

// 定义组件属性接口 - 基于el-tree-select
interface Props {
  // 核心数据属性
  data?: any[]
  props?: any
  nodeKey: string | number
  
  // 绑定值
  modelValue?: any | any[]
  
  // 渲染控制
  renderAfterExpand?: boolean
  
  // 展开/折叠控制
  defaultExpandAll?: boolean
  defaultExpandLevel?: number
  accordion?: boolean
  
  // 选择相关
  showCheckbox?: boolean
  checkStrictly?: boolean
  
  // 样式
  style?: any
  
  // 自定义颜色属性
  color?: string // 树节点默认颜色
  selectedColor?: string // 选中节点颜色
  hoverColor?: string // 鼠标悬停颜色
  textColor?: string // 文本颜色
  lineColor?: string // 连接线颜色
  backgroundColor?: string // 背景颜色
  borderColor?: string // 边框颜色
  boxShadow?: string // 阴影样式
  focusBorderColor?: string // 聚焦状态边框颜色
  focusBoxShadow?: string // 聚焦状态边框阴影
  selectedBorderColor?: string // 选中状态边框颜色
  selectedBoxShadow?: string // 选中状态边框阴影
}

// 定义组件事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'visible-change', visible: boolean): void
  (e: 'remove-tag', value: any): void
  (e: 'clear'): void
  (e: 'check-change', data: any, checked: boolean, indeterminate: boolean): void
  (e: 'check', data: any, checked: boolean, indeterminate: boolean): void
  (e: 'node-click', data: any, node: any): void
  (e: 'node-expand', data: any, node: any): void
  (e: 'node-collapse', data: any, node: any): void
}>()

// 定义组件属性默认值
/** 我需要修改hoverColor和selectedColor的默认值，确保下拉框的悬停和选中颜色自定义功能始终可用 **/
// 将默认值设置为蓝色
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  props: () => ({ label: 'label', children: 'children' }),
  nodeKey: 'id',
  renderAfterExpand: false,
  defaultExpandAll: false,
  defaultExpandLevel: 1,
  showCheckbox: false,
  checkStrictly: false,
  modelValue: '',
  style: () => ({ width: '240px' }),
  color: '',
  selectedColor: '#409EFF', // 设置默认蓝色选中颜色
  hoverColor: '#ecf5ff',   // 设置默认浅蓝色悬停背景
  textColor: '',
  lineColor: '',
  backgroundColor: '',
  borderColor: '',
  boxShadow: '',
  focusBorderColor: '',
  focusBoxShadow: '',
  selectedBorderColor: '',
  selectedBoxShadow: ''
})

// 生成唯一ID以确保样式隔离
const uniqueId = computed(() => {
  return Math.random().toString(36).substr(2, 9)
})

// 生成动态样式
const generateDynamicStyles = (): string => {
  let styles = ''
  const treeSelector = `#crystal-tree-${uniqueId.value}`
  
  // 背景色样式
  if (props.backgroundColor) {
    styles += `
      ${treeSelector} .el-tree-select__dropdown,
      ${treeSelector} .el-input__wrapper,
      ${treeSelector} .el-input__inner {
        background-color: ${props.backgroundColor} !important;
      }
    `
  }
  
  // 文本颜色样式
  if (props.textColor) {
    styles += `
      ${treeSelector} .el-input__inner {
        color: ${props.textColor} !important;
      }
      ${treeSelector} .el-tree-node__content {
        color: ${props.textColor} !important;
      }
    `
  }
  
  // 悬停颜色样式
  if (props.hoverColor) {
    styles += `
      ${treeSelector} .el-tree-node__content:hover {
        background-color: ${props.hoverColor} !important;
      }
    `
  }
  
  // 选中颜色样式
  if (props.selectedColor) {
    styles += `
      ${treeSelector} .el-tree-node.is-current > .el-tree-node__content,
      ${treeSelector} .el-tree-node.is-checked > .el-tree-node__content {
        color: ${props.selectedColor} !important;
      }
      ${treeSelector} .el-tag:hover {
        background-color: ${props.selectedColor} !important;
        border-color: ${props.selectedColor} !important;
      }
    `
  }
  
  // 默认颜色样式
  if (props.color) {
    styles += `
      ${treeSelector} .el-tag {
        background-color: ${props.color} !important;
        border-color: ${props.color} !important;
      }
      ${treeSelector} .el-icon,
      ${treeSelector} .el-tree-node__expand-icon {
        color: ${props.color} !important;
      }
      ${treeSelector} .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: ${props.color} !important;
        border-color: ${props.color} !important;
      }
      ${treeSelector} .el-checkbox__inner {
        border-color: ${props.color} !important;
      }
      ${treeSelector} .custom-node-icon {
        color: ${props.color} !important;
      }
    `
  }
  
  // 连接线颜色样式
  if (props.lineColor) {
    styles += `
      ${treeSelector} .el-tree-node__line {
        border-color: ${props.lineColor} !important;
        background-color: ${props.lineColor} !important;
      }
    `
  }
  
  // 边框颜色样式
  if (props.borderColor) {
    styles += `
      ${treeSelector} .el-input__wrapper,
      ${treeSelector} .el-tree-select__dropdown {
        border-color: ${props.borderColor} !important;
      }
      ${treeSelector} .el-input__wrapper.is-focus {
        box-shadow: 0 0 0 1px ${props.borderColor} inset !important;
      }
    `
  }
  
  // 聚焦状态边框颜色样式
  if (props.focusBorderColor) {
    styles += `
      ${treeSelector} .el-input__wrapper.is-focus {
        border-color: ${props.focusBorderColor} !important;
        box-shadow: 0 0 0 1px ${props.focusBorderColor} inset !important;
      }
    `
  }
  
  // 聚焦状态边框阴影样式
  if (props.focusBoxShadow) {
    styles += `
      ${treeSelector} .el-input__wrapper.is-focus {
        box-shadow: ${props.focusBoxShadow} !important;
      }
    `
  }
  
  // 选中状态边框颜色样式
  if (props.selectedBorderColor) {
    styles += `
      ${treeSelector} .el-input__wrapper.is-focus,
      ${treeSelector} .el-input__wrapper:hover {
        border-color: ${props.selectedBorderColor} !important;
      }
      ${treeSelector} .el-input__wrapper.is-focus {
        box-shadow: 0 0 0 1px ${props.selectedBorderColor} inset !important;
      }
    `
  }
  
  // 选中状态边框阴影样式
  if (props.selectedBoxShadow) {
    styles += `
      ${treeSelector} .el-input__wrapper.is-focus {
        box-shadow: ${props.selectedBoxShadow} !important;
      }
    `
  }

  // 阴影样式
  if (props.boxShadow) {
    styles += `
      ${treeSelector} .el-tree-select__dropdown {
        box-shadow: ${props.boxShadow} !important;
      }
    `
  }

  return styles
}

// 合并外部传入的样式和内部样式
const mergeStyles = (externalStyle: any): any => {
  const baseStyle: any = {}
  
  if (props.backgroundColor) {
    baseStyle.backgroundColor = props.backgroundColor
  }
  
  if (props.textColor) {
    baseStyle.color = props.textColor
  }
  
  if (props.borderColor) {
    baseStyle.borderColor = props.borderColor
  }
  
  if (props.boxShadow) {
    baseStyle.boxShadow = props.boxShadow
  }
  
  // 添加选中状态边框颜色和阴影的内联样式支持
  if (props.selectedBorderColor) {
    baseStyle.borderColor = props.selectedBorderColor
  }
  
  if (props.selectedBoxShadow) {
    baseStyle.boxShadow = props.selectedBoxShadow
  }

  return { ...baseStyle, ...externalStyle }
}

// 动态创建样式标签
let styleElement: HTMLStyleElement | null = null

onMounted(() => {
  // 如果有任何自定义颜色设置，则添加动态样式
  if (props.color || props.selectedColor || props.hoverColor || props.textColor || props.lineColor || props.backgroundColor || props.borderColor || props.boxShadow || props.focusBorderColor || props.focusBoxShadow || props.selectedBorderColor || props.selectedBoxShadow) {
    styleElement = document.createElement('style')
    styleElement.textContent = generateDynamicStyles()
    document.head.appendChild(styleElement)
  }
})

onUnmounted(() => {
  // 组件销毁时移除动态样式
  if (styleElement && document.head.contains(styleElement)) {
    document.head.removeChild(styleElement)
  }
})


</script>

<style scoped>
/* 基础样式 */
.crystal-tree-wrapper {
  width: 100%;
}

/* 基础树选择器样式 */
:deep(.el-tree-select) {
  width: 100%;
}

/* 自定义节点图标样式 */
.custom-node-icon {
  margin-right: 5px;
  font-size: 14px;
  vertical-align: middle;
}

/* 禁用节点样式 - 这些样式使用最高优先级 */
:deep(.el-tree-node.is-disabled > .el-tree-node__content) {
  color: #c0c4cc !important;
  cursor: not-allowed;
}

:deep(.el-tree-node.is-disabled > .el-tree-node__content:hover) {
  background-color: transparent !important;
}

/* 确保下拉树在z-index上有足够高的值 */
:deep(.el-tree-select__dropdown) {
  z-index: 2000 !important;
}
</style>