<template>
  <el-button
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="iconComponent"
    :autofocus="autofocus"
    :native-type="nativeType"
    :auto-insert-space="autoInsertSpace"
    :tag="tag"
    :style="buttonStyle"
    @click="$emit('click', $event)"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus"
import type { ButtonProps } from "element-plus"
import { computed, h } from "vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

// 明确定义属性接口，确保类型支持
const props = withDefaults(
  defineProps<
    Omit<ButtonProps, "icon"> & {
      icon?: string | any
      gradient?: boolean
      gradientFrom?: string
      gradientTo?: string
      borderRadius?: string
    }
  >(),
  {
    // 保持与Element Plus默认值一致
    type: "default",
    size: "default",
    plain: false,
    round: false,
    circle: false,
    loading: false,
    disabled: false,
    icon: undefined,
    autofocus: false,
    nativeType: "button",
    autoInsertSpace: false,
    tag: "button",
    gradient: false,
    gradientFrom: "#1890ff",
    gradientTo: "#52c41a",
    borderRadius: ""
  }
)

// 处理图标
const iconComponent = computed(() => {
  if (!props.icon) return undefined

  // 如果是组件直接返回
  if (typeof props.icon !== "string") return props.icon

  // 如果是字符串，从Element Plus图标中查找
  const Icon = ElementPlusIconsVue[props.icon as keyof typeof ElementPlusIconsVue]
  return Icon ? h(Icon) : undefined
})

// 计算按钮样式
const buttonStyle = computed(() => {
  const style: any = {}

  // 渐变效果
  if (props.gradient) {
    style.background = `linear-gradient(135deg, ${props.gradientFrom}, ${props.gradientTo})`
    style.border = "none"
    style.color = "#fff"
  }

  // 圆角
  if (props.borderRadius) {
    style.borderRadius = props.borderRadius
  }

  return style
})

// 透传所有事件
const emit = defineEmits(["click", "mousedown", "mouseup", "mouseenter", "mouseleave"])
</script>
