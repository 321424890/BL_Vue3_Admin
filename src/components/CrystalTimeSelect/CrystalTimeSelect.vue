<template>
  <el-time-select
    v-model="modelValue"
    :placeholder="placeholder"
    :start="start"
    :end="end"
    :step="step"
    :max-time="maxTime"
    :min-time="minTime"
    :formatter="formatter"
    :parser="parser"
    :disabled="processedDisabled"
    :editable="processedEditable"
    :clearable="processedClearable"
    :size="size"
    :prefix-icon="processedPrefixIcon"
    :suffix-icon="processedSuffixIcon"
    :clear-icon="processedClearIcon"
    :validate-event="validateEvent"
    :popper-class="popperClass"
    :teleported="teleported"
    :id="id"
    :name="name"
    :readonly="readonly"
    :validate-trigger="validateTrigger"
    :show-arrow="showArrow"
    :hours="hours"
    :minutes="minutes"
    :seconds="seconds"
    :hide-disabled-options="hideDisabledOptions"
    :fit-input-width="fitInputWidth"
    :input-style="inputStyle"
    :tag="tag"
    :value-key="valueKey"
    :placement="placement"
    :strategy="strategy"
    :fallback-strategy="fallbackStrategy"
    :gpu-acceleration="gpuAcceleration"
    :persistent="persistent"
    :auto-complete="autoComplete"
    :aria-label="ariaLabel"
    :tabindex="tabindex"
    :auto-focus="autoFocus"
    :maxlength="maxlength"
    :minlength="minlength"
    :show-word-limit="showWordLimit"
    :resize="resize"
    :autosize="autosize"
    :autocomplete="autocomplete"
    :autocorrect="autocorrect"
    :autocapitalize="autocapitalize"
    :spellcheck="spellcheck"
    :enterkeyhint="enterkeyhint"
    :inputmode="inputmode"
    :show-trigger="showTrigger"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
    @clear="handleClear"
    @visible-change="handleVisibleChange"
    @remove-tag="handleRemoveTag"
    @input="handleInput"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
    @keypress="handleKeypress"
    @paste="handlePaste"
    @copy="handleCopy"
    @cut="handleCut"
    @compositionstart="handleCompositionStart"
    @compositionupdate="handleCompositionUpdate"
    @compositionend="handleCompositionEnd"
  ></el-time-select>
</template>

<script setup lang="ts">
import { ElTimeSelect } from "element-plus";
import { computed } from "vue";
// 导入工具函数，使用统一的图标处理逻辑
import { stringToIcon } from "../../utils";

// 定义组件属性，继承所有 el-time-select 属性并添加自定义属性
const props = withDefaults(
  defineProps<{
    // 基础属性
    modelValue?: string;
    placeholder?: string;
    start?: string;
    end?: string;
    step?: string;
    maxTime?: string;
    minTime?: string;
    formatter?: (value: string) => string;
    parser?: (value: string) => string;
    disabled?: boolean | string;
    editable?: boolean | string;
    clearable?: boolean | string;
    size?: "large" | "default" | "small";
    prefixIcon?: any;
    suffixIcon?: any;
    clearIcon?: any;
    validateEvent?: boolean;
    popperClass?: string;
    teleported?: boolean;
    id?: string;
    name?: string;
    readonly?: boolean;
    validateTrigger?: any;
    showArrow?: boolean;
    hours?: number[];
    minutes?: number[];
    seconds?: number[];

    // 自定义优化属性
    showTrigger?: boolean;
    hideDisabledOptions?: boolean;
    fitInputWidth?: boolean;
    inputStyle?: any;
    tag?: any;
    valueKey?: string;
    placement?: string;
    strategy?: string;
    fallbackStrategy?: string;
    gpuAcceleration?: boolean;
    persistent?: boolean;
    autoComplete?: string;
    ariaLabel?: string;
    tabindex?: number;
    autoFocus?: boolean;
    maxlength?: number;
    minlength?: number;
    showWordLimit?: boolean;
    resize?: string;
    autosize?: any;
    autocomplete?: string;
    autocorrect?: string;
    autocapitalize?: string;
    spellcheck?: boolean;
    enterkeyhint?: string;
    inputmode?: string;
  }>(),
  {
    // 保持与 Element Plus 默认值一致
    placeholder: "请选择时间",
    start: "09:00",
    end: "18:00",
    step: "00:30",
    maxTime: undefined,
    minTime: undefined,
    formatter: undefined,
    parser: undefined,
    disabled: false,
    editable: true,
    clearable: true,
    size: "default",
    prefixIcon: undefined,
    suffixIcon: undefined,
    clearIcon: undefined,
    validateEvent: true,
    popperClass: "",
    teleported: true,
    id: undefined,
    name: undefined,
    readonly: false,
    validateTrigger: undefined,
    showArrow: true,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    // 自定义属性默认值
    showTrigger: true,
    hideDisabledOptions: false,
    fitInputWidth: false,
    inputStyle: undefined,
    tag: "div",
    valueKey: "value",
    placement: "bottom-start",
    strategy: "absolute",
    fallbackStrategy: "flip",
    gpuAcceleration: true,
    persistent: true,
    autoComplete: "off",
    ariaLabel: undefined,
    tabindex: undefined,
    autoFocus: false,
    maxlength: undefined,
    minlength: undefined,
    showWordLimit: false,
    resize: undefined,
    autosize: undefined,
    autocomplete: "off",
    autocorrect: "off",
    autocapitalize: "off",
    spellcheck: false,
    enterkeyhint: undefined,
    inputmode: undefined,
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
  "remove-tag",
  "input",
  "keydown",
  "keyup",
  "keypress",
  "paste",
  "copy",
  "cut",
  "compositionstart",
  "compositionupdate",
  "compositionend",
]);

// 处理布尔值（支持字符串形式的 "false"）
const toBoolean = (value: boolean | string): boolean => {
  if (typeof value === "string") {
    return value.toLowerCase() !== "false";
  }
  return !!value;
};

// 计算处理后的属性
const processedDisabled = computed(() => toBoolean(props.disabled));
const processedEditable = computed(() => toBoolean(props.editable));
const processedClearable = computed(() => toBoolean(props.clearable));

// 计算处理后的图标 - 使用统一的工具函数转换字符串图标名为组件实例
const processedPrefixIcon = computed(() => stringToIcon(props.prefixIcon));
const processedSuffixIcon = computed(() => stringToIcon(props.suffixIcon));
const processedClearIcon = computed(() => stringToIcon(props.clearIcon));

// 处理双向绑定
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// 事件处理函数
const handleChange = (value: string) => emit("change", value);
const handleBlur = (event: FocusEvent) => emit("blur", event);
const handleFocus = (event: FocusEvent) => emit("focus", event);
const handleClear = () => emit("clear");
const handleVisibleChange = (visible: boolean) =>
  emit("visible-change", visible);
const handleRemoveTag = (tag: any) => emit("remove-tag", tag);
const handleInput = (value: string) => emit("input", value);
const handleKeydown = (event: KeyboardEvent) => emit("keydown", event);
const handleKeyup = (event: KeyboardEvent) => emit("keyup", event);
const handleKeypress = (event: KeyboardEvent) => emit("keypress", event);
const handlePaste = (event: ClipboardEvent) => emit("paste", event);
const handleCopy = (event: ClipboardEvent) => emit("copy", event);
const handleCut = (event: ClipboardEvent) => emit("cut", event);
const handleCompositionStart = (event: CompositionEvent) =>
  emit("compositionstart", event);
const handleCompositionUpdate = (event: CompositionEvent) =>
  emit("compositionupdate", event);
const handleCompositionEnd = (event: CompositionEvent) =>
  emit("compositionend", event);
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
