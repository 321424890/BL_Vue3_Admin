<template>
  <div class="crystal-switch-wrapper">
    <el-switch
      :model-value="props.modelValue"
      :disabled="props.disabled"
      :width="props.width"
      :active-text="props.activeText"
      :inactive-text="props.inactiveText"
      :active-value="props.activeValue"
      :inactive-value="props.inactiveValue"
      :name="props.name"
      :border="props.border"
      :before-change="props.beforeChange"
      @update:model-value="handleUpdateModelValue"
      @change="handleChange"
      v-bind="$attrs"
    >
      <template #active-icon>
        <slot name="active-icon"></slot>
      </template>
      <template #inactive-icon>
        <slot name="inactive-icon"></slot>
      </template>
    </el-switch>
  </div>
</template>

<script lang="ts" setup>
import { ElSwitch } from "element-plus"

interface Props {
  modelValue: boolean | any
  disabled?: boolean
  width?: number
  activeText?: string
  inactiveText?: string
  activeValue?: any
  inactiveValue?: any
  name?: string
  border?: boolean
  beforeChange?: (val: boolean) => boolean | Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  width: 40,
  border: false
})

const emit = defineEmits<{
  "update:model-value": [value: boolean | any]
  change: [value: boolean | any]
}>()

const handleUpdateModelValue = (val: boolean | any) => {
  emit("update:model-value", val)
}

const handleChange = (val: boolean | any) => {
  emit("change", val)
}
</script>

<style scoped>
.crystal-switch-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
}
</style>
