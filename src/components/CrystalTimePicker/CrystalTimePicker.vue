<template>
  <el-time-picker
    v-model="localModelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :size="size"
    :prefix-icon="resolvedPrefixIcon"
    :suffix-icon="resolvedSuffixIcon"
    :clear-icon="resolvedClearIcon"
    :is-range="isRange"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :arrow-control="arrowControl"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
    @clear="handleClear"
    @visible-change="handleVisibleChange"
    @input="handleInput"
  ></el-time-picker>
</template>

<script setup lang="ts">
import { ElTimePicker } from "element-plus";
import { computed, ref, watch } from "vue";
import { stringToIcon } from "../../utils";

// 定义组件属性，支持range选择
const props = withDefaults(
  defineProps<{
    // 基础属性
    modelValue?: string | number | (string | number | Date)[];
    placeholder?: string;
    disabled?: boolean;
    editable?: boolean;
    clearable?: boolean;
    size?: "large" | "default" | "small";
    prefixIcon?: any;
    suffixIcon?: any;
    clearIcon?: any;
    // range相关属性
    isRange?: boolean;
    rangeSeparator?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    arrowControl?: boolean;
  }>(),
  {
    // 保持与 Element Plus 默认值一致
    placeholder: "请选择时间",
    disabled: false,
    editable: true,
    clearable: true,
    size: "default",
    prefixIcon: undefined,
    suffixIcon: undefined,
    clearIcon: undefined,
    isRange: false,
    rangeSeparator: "-",
    startPlaceholder: undefined,
    endPlaceholder: undefined,
    arrowControl: false,
  },
);

// 定义事件
const emit = defineEmits([
  "update:modelValue",
  "change",
  "blur",
  "focus",
  "clear",
  "visible-change",
  "input",
]);

// 本地模型值，避免直接修改props
const localModelValue = ref(props.modelValue);

// 监听props变化，更新本地模型值
watch(() => props.modelValue, (newValue) => {
  localModelValue.value = newValue;
});

// 监听本地模型值变化，通知父组件
watch(localModelValue, (newValue) => {
  emit("update:modelValue", newValue);
});

// 解析图标
const resolvedPrefixIcon = computed(() => stringToIcon(props.prefixIcon));
const resolvedSuffixIcon = computed(() => stringToIcon(props.suffixIcon));
const resolvedClearIcon = computed(() => stringToIcon(props.clearIcon));

// 事件处理函数
const handleChange = (value: any) => emit("change", value);
const handleBlur = (event: FocusEvent) => emit("blur", event);
const handleFocus = (event: FocusEvent) => emit("focus", event);
const handleClear = () => emit("clear");
const handleVisibleChange = (visible: boolean) => emit("visible-change", visible);
const handleInput = (value: any) => emit("input", value);
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>