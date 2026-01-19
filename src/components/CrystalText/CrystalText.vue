<template>
  <el-text
    :tag="tag"
    :type="type"
    :size="size"
    :bold="bold"
    :italic="italic"
    :underline="underline"
    :delete="delete"
    :code="code"
    :copyable="{
      ...(props.copyable === true ? {} : props.copyable),
      onCopy: handleCopy
    }"
    :class="[
      'crystal-text',
      { 'crystal-text-gradient': gradient },
      { 'crystal-text-shadow': shadow },
      { 'crystal-text-hover': hoverEffect },
      { [`crystal-text-${type}`]: type },
      { 'crystal-text-copyable': props.copyable }
    ]"
    :style="textStyle"
  >
    <slot></slot>
  </el-text>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { ElText, ElMessage } from "element-plus"
import type { ElTextProps } from "element-plus"

interface CrystalTextProps extends /* @vue-ignore */ ElTextProps {
  // 渐变文字
  gradient?: boolean
  // 渐变起始颜色
  gradientFrom?: string
  // 渐变结束颜色
  gradientTo?: string
  // 文字阴影
  shadow?: boolean
  // 阴影颜色
  shadowColor?: string
  // 悬停效果
  hoverEffect?: boolean
  // 悬停颜色
  hoverColor?: string
  // 自定义字体
  fontFamily?: string
  // 行高
  lineHeight?: string
  // 字间距
  letterSpacing?: string
  // 词间距
  wordSpacing?: string
  // 文本装饰
  textDecoration?: string
  // 文本转换
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase"
  // 文本对齐
  textAlign?: "left" | "center" | "right" | "justify"
  // 文本溢出处理
  textOverflow?: "clip" | "ellipsis"
  // 最大宽度（用于文本溢出）
  maxWidth?: string
  // 字体粗细
  fontWeight?: string | number
  // 斜体
  fontStyle?: "normal" | "italic"
}

const props = withDefaults(defineProps<CrystalTextProps>(), {
  // 继承 el-text 的默认值
  tag: "span",
  type: "",
  size: "",
  bold: false,
  italic: false,
  underline: false,
  delete: false,
  code: false,
  copyable: false,
  // 自定义属性的默认值
  gradient: false,
  gradientFrom: "#1890ff",
  gradientTo: "#52c41a",
  shadow: false,
  shadowColor: "#888888",
  hoverEffect: false,
  hoverColor: "#1890ff",
  fontFamily: "",
  lineHeight: "",
  letterSpacing: "",
  wordSpacing: "",
  textDecoration: "",
  textTransform: "none",
  textAlign: "left",
  textOverflow: "clip",
  maxWidth: "",
  fontWeight: "",
  fontStyle: "normal"
})

// 计算文本样式
const textStyle = computed(() => {
  const style: Record<string, string | number> = {
    fontFamily: props.fontFamily || "inherit",
    lineHeight: props.lineHeight || "inherit",
    letterSpacing: props.letterSpacing || "inherit",
    wordSpacing: props.wordSpacing || "inherit",
    textDecoration: props.textDecoration || "inherit",
    textTransform: props.textTransform,
    textAlign: props.textAlign,
    maxWidth: props.maxWidth || "none",
    cursor: props.copyable ? "pointer" : "default"
  }

  // 渐变文字
  if (props.gradient) {
    style.background = `linear-gradient(45deg, ${props.gradientFrom}, ${props.gradientTo})`
    style["-webkit-background-clip"] = "text"
    style["-webkit-text-fill-color"] = "transparent"
    style["background-clip"] = "text"
  }

  // 文字阴影
  if (props.shadow) {
    style.textShadow = `2px 2px 4px ${props.shadowColor}`
  }

  // 文本溢出处理
  if (props.textOverflow === "ellipsis") {
    style.overflow = "hidden"
    style.textOverflow = "ellipsis"
    style.whiteSpace = "nowrap"
  }

  // 自定义字体粗细
  if (props.fontWeight) {
    style.fontWeight = props.fontWeight
  }

  // 自定义字体样式
  if (props.fontStyle) {
    style.fontStyle = props.fontStyle
  }

  return style
})

// 复制成功提示
const handleCopy = () => {
  ElMessage.success("复制成功")
}
</script>

<style scoped lang="scss">
.crystal-text {
  display: inline-block;
  transition: all 0.3s ease;

  // 悬停效果
  &.crystal-text-hover {
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: v-bind(hoverColor) !important;
    }
  }

  // 渐变文字样式增强
  &.crystal-text-gradient {
    display: inline-block;
  }

  // 文字阴影
  &.crystal-text-shadow {
    font-weight: 500;
  }

  // 不同类型文字的样式增强
  &.crystal-text-primary {
    &:hover {
      opacity: 0.8;
    }
  }

  &.crystal-text-success {
    &:hover {
      opacity: 0.8;
    }
  }

  &.crystal-text-warning {
    &:hover {
      opacity: 0.8;
    }
  }

  &.crystal-text-danger {
    &:hover {
      opacity: 0.8;
    }
  }

  &.crystal-text-info {
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
