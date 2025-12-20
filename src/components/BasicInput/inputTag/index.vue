<template>
  <!-- 使用动态 component 渲染 ElInput 并自动转发所有属性、事件和插槽 -->
  <component
    :is="ElInput"
    v-bind="{ ...$attrs, ...elInputProps }"
    :model-value="inputValue"
    @update:model-value="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @input="handleInput"
    @clear="handleClear"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
  >
    <!-- 自动转发所有插槽 -->
    <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </component>

  <div v-if="tags && tags.length > 0" class="crystal-input-tag__tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="index"
      :closable="!disabled"
      :disable-transitions="false"
      @close="handleCloseTag(tag, index)"
    >
      {{ tag }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { ElInput, ElTag } from "element-plus"

// 设置组件名称和属性继承选项
defineOptions({
  name: "CrystalInputTag",
  inheritAttrs: false // 不自动绑定 $attrs 到根元素
})

interface Props {
  // 基本属性
  modelValue?: string[]
  placeholder?: string
  disabled?: boolean
  size?: "large" | "default" | "small"
  clearable?: boolean
  readonly?: boolean
  type?: string
  rows?: number
  autosize?: boolean | { minRows?: number; maxRows?: number }
  autocomplete?: string
  name?: string
  maxlength?: string | number
  minlength?: string | number
  showWordLimit?: boolean
  prefixIcon?: string
  suffixIcon?: string
  resize?: "none" | "both" | "horizontal" | "vertical"
  autofocus?: boolean
  form?: string
  label?: string
  tabindex?: string | number
  validateEvent?: boolean
  inputStyle?: object

  // 自定义属性：限制最多可以添加的标签数量
  maxTags?: number
  // 自定义属性：标签验证函数，返回 true 表示验证通过，返回 false 表示验证失败
  tagValidator?: (tag: string) => boolean
  // 自定义属性：添加标签的分隔符，默认为逗号或回车
  tagSeparator?: string | RegExp
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  placeholder: "",
  disabled: false,
  size: "default",
  clearable: false,
  readonly: false,
  type: "text",
  rows: 2,
  autocomplete: "off",
  resize: "vertical",
  validateEvent: true,
  maxTags: undefined,
  tagValidator: undefined,
  tagSeparator: ","
})

const emit = defineEmits<{
  "update:modelValue": [value: string[]]
  change: [value: string[]]
  input: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  "remove-tag": [tag: string, index: number]
  "tag-limit-exceed": [value: string[]]
  "tag-validate-fail": [tag: string]
  [eventName: string]: any[]
}>()

// 内部输入值
const inputValue = ref("")
// 标签列表
const tags = ref<string[]>([...(props.modelValue || [])])

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== tags.value) {
      tags.value = [...(newValue || [])]
    }
  }
)

// 构建传递给 ElInput 的属性
const elInputProps = computed(() => {
  const result: any = {}

  // 传递除了自定义属性之外的所有属性
  Object.keys(props).forEach(key => {
    if (
      key !== "modelValue" &&
      key !== "maxTags" &&
      key !== "tagValidator" &&
      key !== "tagSeparator" &&
      props[key as keyof Props] !== undefined
    ) {
      result[key] = props[key as keyof Props]
    }
  })

  return result
})

// 处理输入
const handleInput = (value: string) => {
  inputValue.value = value
  emit("input", value)

  // 检查是否包含分隔符
  const separator = props.tagSeparator
  if (separator && value) {
    // 确保分隔符是字符串
    const sepStr = typeof separator === "string" ? separator : ","
    if (value.includes(sepStr)) {
      // 分割输入值
      const newTags = value.split(sepStr).filter(tag => tag.trim())

      // 添加标签
      addTags(newTags)
    }
  }
}

// 处理按键事件
const handleKeydown = (event: any) => {
  // 回车键添加标签
  if (event.key === "Enter" && inputValue.value.trim()) {
    event.preventDefault()
    addTags([inputValue.value.trim()])
  }

  emit("keydown", event)
}

// 添加标签
const addTags = (newTags: string[]) => {
  if (props.disabled) return

  const validTags: string[] = []

  for (const tag of newTags) {
    const trimmedTag = tag.trim()
    if (!trimmedTag) continue

    // 验证标签
    if (props.tagValidator && !props.tagValidator(trimmedTag)) {
      emit("tag-validate-fail", trimmedTag)
      continue
    }

    // 检查是否已存在
    if (tags.value.includes(trimmedTag)) continue

    validTags.push(trimmedTag)
  }

  // 检查标签数量限制
  if (props.maxTags !== undefined) {
    const availableSlots = props.maxTags - tags.value.length
    if (availableSlots <= 0) {
      emit("tag-limit-exceed", tags.value)
      return
    }

    // 如果超出限制，只添加部分标签
    if (validTags.length > availableSlots) {
      validTags.splice(availableSlots)
      emit("tag-limit-exceed", [...tags.value, ...validTags])
    }
  }

  // 更新标签列表
  const updatedTags = [...tags.value, ...validTags]
  tags.value = updatedTags
  inputValue.value = ""

  // 触发事件
  emit("update:modelValue", updatedTags)
  emit("change", updatedTags)
}

// 关闭标签
const handleCloseTag = (tag: string, index: number) => {
  if (props.disabled) return

  const updatedTags = tags.value.filter((_, i) => i !== index)
  tags.value = updatedTags

  // 触发事件
  emit("remove-tag", tag, index)
  emit("update:modelValue", updatedTags)
  emit("change", updatedTags)
}

// 其他事件处理
const handleBlur = (event: FocusEvent) => {
  // 失焦时如果有输入内容，尝试添加为标签
  if (inputValue.value.trim()) {
    addTags([inputValue.value.trim()])
  }
  emit("blur", event)
}

const handleFocus = (event: FocusEvent) => {
  emit("focus", event)
}

const handleChange = (value: string) => {
  emit("change", value)
}

const handleClear = () => {
  inputValue.value = ""
  tags.value = []
  emit("update:modelValue", [])
  emit("change", [])
  emit("clear")
}

const handleKeyup = (event: KeyboardEvent) => {
  emit("keyup", event)
}
</script>

<style scoped>
.crystal-input-tag__tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.crystal-input-tag__tags .el-tag {
  margin: 0;
}
</style>
