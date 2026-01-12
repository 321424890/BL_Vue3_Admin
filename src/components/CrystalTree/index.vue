<template>
  <div class="crystal-tree-wrapper">
    <el-tree
      :model-value="props.modelValue"
      v-bind="$attrs"
      @update:model-value="handleUpdateModelValue"
    >
      <template #default="scope">
        <slot :scope="scope"></slot>
      </template>
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #default-expand-icon="scope">
        <slot name="default-expand-icon" :scope="scope"></slot>
      </template>
      <template #default-collapse-icon="scope">
        <slot name="default-collapse-icon" :scope="scope"></slot>
      </template>
      <template #default-node-icon="scope">
        <slot name="default-node-icon" :scope="scope"></slot>
      </template>
      <template #default-leaf-icon="scope">
        <slot name="default-leaf-icon" :scope="scope"></slot>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'

interface Props {
  modelValue?: Array<string | number> | string | number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

const emit = defineEmits<{
  'update:model-value': [value: Array<string | number> | string | number]
}>()

const handleUpdateModelValue = (val: Array<string | number> | string | number) => {
  emit('update:model-value', val)
}
</script>

<style scoped>
.crystal-tree-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
}
</style>