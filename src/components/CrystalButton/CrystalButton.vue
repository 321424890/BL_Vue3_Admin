<template>
  <el-button
    :type="type"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :plain="plain"
    :round="round"
    :circle="circle"
    :icon="icon"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { computed } from 'vue'

interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  loading?: boolean
  plain?: boolean
  round?: boolean
  circle?: boolean
  icon?: string
  autofocus?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  plain: false,
  round: false,
  circle: false,
  autofocus: false,
  nativeType: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

// Add name for the component
defineOptions({
  name: 'CrystalButton'
})
</script>

<style scoped>
/* Add custom styles here if needed */
</style>