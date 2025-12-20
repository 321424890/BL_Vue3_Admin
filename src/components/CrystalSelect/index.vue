<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
    ref="selectRef"
    :filterable="filterable"
    :filter-method="filterMethod"
    :placeholder="placeholder"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :clearable="clearable"
    @update:model-value="handleUpdateModelValue"
    @change="handleChange"
    @clear="handleClear"
    @visible-change="handleVisibleChange"
    @remove-tag="handleRemoveTag"
    @blur="handleBlur"
    @focus="handleFocus"
    @query-change="handleQueryChange"
    @current-change="handleCurrentChange"
  >
    <template v-if="options && options.length > 0">
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label || option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        <!-- 自定义图标和内容的插槽 -->
        <template #default>
          <!-- 用户自定义的option内容插槽 -->
          <slot name="option" :option="option">
            <div class="crystal-select-option-content">
              <!-- 前置图标 -->
              <div v-if="getOptionIcon(option, 'prefix')" class="option-icon prefix-icon">
                <el-icon>
                  <component
                    :is="getOptionIconComponent(option, 'prefix')"
                    v-if="isElementPlusIcon(getOptionIcon(option, 'prefix'))"
                  />
                  <IconifyIcon :icon="getOptionIcon(option, 'prefix')" v-else :style="getOptionIconStyle(option, 'prefix')" />
                </el-icon>
              </div>
              <!-- 选项标签文本 -->
              <div class="option-label">{{ option.label || option.value }}</div>
              <!-- 选项描述文本 -->
              <div v-if="getOptionDescription(option)" class="option-description">
                {{ getOptionDescription(option) }}
              </div>
              <!-- 后置图标 -->
              <div v-if="getOptionIcon(option, 'suffix')" class="option-icon suffix-icon">
                <el-icon>
                  <component
                    :is="getOptionIconComponent(option, 'suffix')"
                    v-if="isElementPlusIcon(getOptionIcon(option, 'suffix'))"
                  />
                  <IconifyIcon :icon="getOptionIcon(option, 'suffix')" v-else :style="getOptionIconStyle(option, 'suffix')" />
                </el-icon>
              </div>
              <!-- 选项操作按钮 -->
              <div v-if="getOptionActions(option).length > 0" class="option-actions">
                <button
                  v-for="action in getOptionActions(option)"
                  :key="action.name || Math.random()"
                  class="option-action-btn"
                  :class="['action-' + (action.name || 'unknown'), { 'action-disabled': action.disabled }]"
                  @click.stop="handleOptionAction(action, option)"
                >
                  <el-icon v-if="action.icon && isElementPlusIcon(action.icon)">
                    <component :is="getActionIconComponent(action.icon)" />
                  </el-icon>
                  <IconifyIcon v-else-if="action.icon" :icon="action.icon" />
                  <span v-if="action.label">{{ action.label }}</span>
                </button>
              </div>
            </div>
          </slot>
        </template>
      </el-option>

      <!-- 加载更多指示器 -->
      <div v-if="loading" class="crystal-select-loading">
        <el-icon>
          <Loading />
        </el-icon>
        <span class="loading-text">{{ loadingText || "加载中..." }}</span>
      </div>
    </template>

    <!-- 保留默认插槽以便用户自定义选项 -->
    <slot></slot>

    <!-- 自定义前缀和后缀插槽 -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append"></slot>
    </template>
    <template v-if="$slots.empty" #empty>
      <slot name="empty"></slot>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, nextTick, watch } from "vue"
import { ElSelect, ElOption, ElIcon } from "element-plus"
import type { SelectProps as ElSelectProps } from "element-plus"
// 导入Element Plus图标组件
import { CircleCheck, Warning, Document, User, Timer, Loading } from "@element-plus/icons-vue"
// 导入Iconify相关组件
import { Icon as IconifyIcon } from "@iconify/vue"
import * as ElementPlusIcons from "@iconify-icons/ep"

defineOptions({
  name: "CrystalSelect",
  inheritAttrs: false
})

// 定义操作按钮类型
interface OptionAction {
  name: string
  icon?: string
  label?: string
  disabled?: boolean
}

// 定义选项类型
interface CustomOption {
  label?: string
  value: any
  disabled?: boolean
  icon?: string
  prefixIcon?: string
  suffixIcon?: string
  description?: string
  actions?: OptionAction[]
}

// 定义组件属性
interface Props {
  modelValue?: any
  options?: any[]
  optionIcons?: Record<string | number, string>
  optionActions?: Record<string | number, OptionAction[]>
  loading?: boolean
  loadingText?: string
  enableInfiniteScroll?: boolean
  scrollThreshold?: number
  filterable?: boolean
  filterMethod?: (value: string, option: any) => boolean
  placeholder?: string
  multiple?: boolean
  collapseTags?: boolean
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  optionIcons: () => ({}),
  optionActions: () => ({}),
  loading: false,
  loadingText: "加载中...",
  enableInfiniteScroll: false,
  scrollThreshold: 80,
  filterable: false,
  filterMethod: (value: string, option: any) => {
    // 默认筛选方法：搜索选项的label和description字段
    const label = option?.label || ""
    const description = option?.description || ""
    return (
      String(label).toLowerCase().includes(value.toLowerCase()) || String(description).toLowerCase().includes(value.toLowerCase())
    )
  },
  placeholder: "",
  multiple: false,
  collapseTags: false,
  clearable: false
})

const emit = defineEmits<{
  "update:model-value": [value: any]
  change: [value: any]
  clear: []
  "visible-change": [visible: boolean]
  "remove-tag": [value: any]
  "query-change": [query: string]
  "current-change": [currentVal: any]
  focus: [evt: FocusEvent]
  blur: [evt: FocusEvent]
  scroll: [evt: Event]
  "option-action": [actionName: string, option: any]
  "load-more": []
}>()

// 内部value状态
const value = computed({
  get: () => props.modelValue,
  set: newValue => {
    emit("update:model-value", newValue)
  }
})

// 下拉框DOM引用
const selectRef = ref<InstanceType<typeof ElSelect> | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
// 防抖动计时器
const debounceTimer = ref<number | null>(null)
// 是否已触发加载更多
const isLoadingMore = ref(false)

// 创建图标注册表
const IconRegistry: Record<string, any> = {
  "el-icon-warning": Warning,
  "el-icon-document": Document,
  "el-icon-user": User,
  "el-icon-timer": Timer,
  "el-icon-circle-check": CircleCheck,
  "ep:warning": Warning,
  "ep:document": Document,
  "ep:user": User,
  "ep:timer": Timer,
  "ep:circle-check": CircleCheck,
  warning: Warning,
  document: Document,
  user: User,
  timer: Timer,
  "circle-check": CircleCheck,
  // 直接映射Element Plus图标组件名称
  Warning,
  Document,
  User,
  Timer,
  CircleCheck,
  Loading
}

// 判断是否为Element Plus图标
const isElementPlusIcon = (iconName: string): boolean => {
  return iconName && (IconRegistry[iconName] || iconName.startsWith("el-icon-") || iconName.startsWith("ep:"))
}

// 获取选项图标名称映射
const getOptionIcon = (option: any, position: "prefix" | "suffix" = "prefix"): string | null => {
  if (!option) return null

  // 从选项对象中获取图标
  let iconName = ""
  if (position === "prefix") {
    if (option.prefixIcon) iconName = option.prefixIcon
    else if (option.icon) iconName = option.icon
    else if (props.optionIcons && props.optionIcons[option.value]) iconName = props.optionIcons[option.value]
  } else if (position === "suffix") {
    if (option.suffixIcon) iconName = option.suffixIcon
  }

  return iconName || null
}

// 获取选项图标组件
const getOptionIconComponent = (option: any, position: "prefix" | "suffix" = "prefix"): any => {
  const iconName = getOptionIcon(option, position)
  if (!iconName) return null

  // 从图标注册表中查找组件
  if (IconRegistry[iconName]) {
    return IconRegistry[iconName]
  }

  // 处理el-icon-前缀
  if (iconName.startsWith("el-icon-")) {
    const key = iconName.replace("el-icon-", "")
    return IconRegistry[key] || IconRegistry[`el-icon-${key}`] || IconRegistry[`ep:${key}`]
  }

  // 处理ep:前缀
  if (iconName.startsWith("ep:")) {
    const key = iconName.replace("ep:", "")
    return IconRegistry[key] || IconRegistry[`el-icon-${key}`] || IconRegistry[`ep:${key}`]
  }

  return null
}

// 获取操作按钮图标组件
const getActionIconComponent = (iconName: string): any => {
  if (!iconName) return null

  // 从图标注册表中查找组件
  if (IconRegistry[iconName]) {
    return IconRegistry[iconName]
  }

  // 处理el-icon-前缀
  if (iconName.startsWith("el-icon-")) {
    const key = iconName.replace("el-icon-", "")
    return IconRegistry[key] || IconRegistry[`el-icon-${key}`] || IconRegistry[`ep:${key}`]
  }

  // 处理ep:前缀
  if (iconName.startsWith("ep:")) {
    const key = iconName.replace("ep:", "")
    return IconRegistry[key] || IconRegistry[`el-icon-${key}`] || IconRegistry[`ep:${key}`]
  }

  return null
}

// 获取选项图标样式
const getOptionIconStyle = (option: any, position: "prefix" | "suffix" = "prefix"): Record<string, string> => {
  // 初始化样式对象
  const style: Record<string, string> = {}

  // 根据位置获取对应的颜色属性
  let color = ""
  if (position === "prefix") {
    // 前缀图标优先使用prefixIconColor，其次是通用iconColor
    color = option.prefixIconColor || option.iconColor
  } else if (position === "suffix") {
    // 后缀图标优先使用suffixIconColor，其次是通用iconColor
    color = option.suffixIconColor || option.iconColor
  }

  // 如果有颜色值，添加到样式对象
  if (color) {
    style.color = color
  }

  return style
}

// 获取选项描述
const getOptionDescription = (option: any): string => {
  if (!option) return ""
  return option.description || ""
}

// 获取选项操作按钮
const getOptionActions = (option: any): OptionAction[] => {
  if (!option) return []
  if (option.actions && option.actions.length > 0) return option.actions
  if (props.optionActions && props.optionActions[option.value] && props.optionActions[option.value].length > 0) {
    return props.optionActions[option.value]
  }
  return []
}

// 处理选项操作按钮点击
const handleOptionAction = (action: OptionAction, option: any): void => {
  if (!action || action.disabled) return
  emit("option-action", action.name, option)
}

// 触底检测 - 添加防抖动处理
const handleScroll = (evt: Event): void => {
  emit("scroll", evt)

  // 如果禁用无限滚动、正在加载中或已经在触发加载更多，则不触发
  if (!props.enableInfiniteScroll || props.loading || isLoadingMore.value) {
    return
  }

  // 清除之前的计时器
  if (debounceTimer.value !== null) {
    clearTimeout(debounceTimer.value)
  }

  // 添加新的计时器（防抖动）
  debounceTimer.value = window.setTimeout(() => {
    const target = evt.target as HTMLElement
    if (!target) return

    const scrollTop = target.scrollTop || 0
    const scrollHeight = target.scrollHeight || 0
    const clientHeight = target.clientHeight || 0

    // 边界情况处理：防止除以零
    if (scrollHeight <= 0 || clientHeight <= 0) return

    // 计算滚动百分比
    const scrollPercentage = ((scrollTop + clientHeight) / scrollHeight) * 100

    // 当滚动超过阈值时，触发加载更多
    if (scrollPercentage >= props.scrollThreshold) {
      isLoadingMore.value = true
      emit("load-more")

      // 重置加载状态，以便下次可以再次触发
      setTimeout(() => {
        isLoadingMore.value = false
      }, 100)
    }
  }, 100)
}

// 初始化下拉框滚动监听
const initScrollListener = (): void => {
  if (!props.enableInfiniteScroll) return

  nextTick(() => {
    if (selectRef.value) {
      // 获取下拉框的下拉面板元素
      const dropdownEl = selectRef.value.$el?.querySelector(".el-select-dropdown__wrap")
      if (dropdownEl) {
        dropdownRef.value = dropdownEl as HTMLElement
        dropdownRef.value.addEventListener("scroll", handleScroll, { passive: true })
      }
    }
  })
}

// 移除滚动监听
const removeScrollListener = (): void => {
  if (debounceTimer.value !== null) {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = null
  }

  if (dropdownRef.value) {
    dropdownRef.value.removeEventListener("scroll", handleScroll, { passive: true })
    dropdownRef.value = null
  }
}

// 处理下拉框显示状态变化
const handleVisibleChange = (visible: boolean): void => {
  emit("visible-change", visible)

  if (visible) {
    // 当下拉框显示时，初始化滚动监听
    initScrollListener()
  } else {
    // 当下拉框隐藏时，移除滚动监听
    removeScrollListener()
    // 重置加载更多状态
    isLoadingMore.value = false
  }
}

// 监听loading状态变化，重置加载状态
watch(
  () => props.loading,
  newVal => {
    if (!newVal) {
      isLoadingMore.value = false
    }
  }
)

// 事件处理方法
const handleUpdateModelValue = (val: any): void => {
  emit("update:model-value", val)
}

const handleChange = (val: any): void => {
  emit("change", val)
}

const handleClear = (): void => {
  emit("clear")
}

const handleRemoveTag = (val: any): void => {
  emit("remove-tag", val)
}

const handleQueryChange = (query: string): void => {
  // 添加防抖动处理，避免频繁触发
  if (debounceTimer.value !== null) {
    clearTimeout(debounceTimer.value)
  }

  debounceTimer.value = window.setTimeout(() => {
    emit("query-change", query)
  }, 300) // 300ms防抖动延迟
}

const handleCurrentChange = (currentVal: any): void => {
  emit("current-change", currentVal)
}

const handleFocus = (evt: FocusEvent): void => {
  emit("focus", evt)
}

const handleBlur = (evt: FocusEvent): void => {
  emit("blur", evt)
}

// 组件卸载时清理事件监听和计时器
onUnmounted(() => {
  removeScrollListener()
  if (debounceTimer.value !== null) {
    clearTimeout(debounceTimer.value)
  }
})
</script>

<style scoped>
.crystal-select-option-content {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: relative;
}

.option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 确保El-icon正确显示 */
.option-icon :deep(.el-icon) {
  font-size: 14px;
}

/* 为Iconify图标设置样式 */
.option-icon :deep(.iconify) {
  font-size: 14px;
}

.prefix-icon {
  margin-right: 6px;
}

.suffix-icon {
  margin-left: 6px;
}

.option-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.option-description {
  font-size: 12px;
  color: var(--el-text-color-secondary, #909399);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.option-actions {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.option-action-btn {
  padding: 2px 6px;
  font-size: 12px;
  border: none;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 2px;
}

.option-action-btn:hover:not(.action-disabled) {
  background-color: var(--el-fill-color-hover, #f0f0f0);
}

.option-action-btn.action-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 为操作按钮中的图标设置样式 */
.option-action-btn :deep(.el-icon),
.option-action-btn :deep(.iconify) {
  font-size: 12px;
}

/* 加载更多样式 */
.crystal-select-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  color: var(--el-text-color-secondary, #909399);
  font-size: 12px;
}

.crystal-select-loading .el-icon {
  margin-right: 6px;
}

.loading-text {
  white-space: nowrap;
}
</style>
