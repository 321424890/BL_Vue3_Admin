<template>
	<!-- 使用动态 component 渲染 ElInput 并自动转发所有属性、事件和插槽 -->
	<component :is="ElInput" v-bind="{ ...props, ...$attrs }" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
		<!-- 自动转发所有插槽 -->
		<template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]>
			<slot :name="slotName" />
		</template>
	</component>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { InputProps } from 'element-plus'

// 设置组件名称和属性继承选项
defineOptions({
	name: 'BLInput',
	inheritAttrs: false // 不自动绑定 $attrs 到根元素
})

// 继承 ElInput 的所有属性
const props = withDefaults(defineProps<InputProps>(), {
	modelValue: ''
})

// 定义事件，支持所有 ElInput 事件
const emit = defineEmits<{
	'update:modelValue': [value: string | number]
	[eventName: string]: [event: any]
}>()
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
