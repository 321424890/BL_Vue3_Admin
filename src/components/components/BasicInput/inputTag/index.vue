<template>
	<!-- 使用动态 component 渲染 ElInputTag 并自动转发所有属性、事件和插槽 -->
	<component
		:is="ElInputTag"
		v-bind="{ ...$attrs, ...elInputTagProps }"
		:model-value="modelValue"
		@update:model-value="handleUpdateModelValue"
		@change="handleChange"
		@input="$emit('input', $event)"
		@focus="$emit('focus', $event)"
		@blur="$emit('blur', $event)"
		@clear="$emit('clear', $event)"
		@remove-tag="handleRemoveTag"
		@close="handleClose"
	>
		<!-- 自动转发所有插槽 -->
		<template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]>
			<slot :name="slotName" />
		</template>
	</component>
</template>

<script setup lang="ts">
import { ElInputTag } from 'element-plus'
import type { InputTagProps } from 'element-plus'
import { computed, watch } from 'vue'

// 设置组件名称和属性继承选项
defineOptions({
	name: 'BLInputTag',
	inheritAttrs: false // 不自动绑定 $attrs 到根元素
})

// 定义扩展属性，使用 Partial<InputTagProps> 使所有属性可选
interface ExtendProps extends Partial<InputTagProps> {
	// 自定义属性：限制最多可以添加的标签数量
	maxTags?: number
	// 自定义属性：标签验证函数，返回 true 表示验证通过，返回 false 表示验证失败
	tagValidator?: (tag: string) => boolean
	// 确保 modelValue 是可选的
	modelValue?: string[]
}

// 定义组件属性，只包含自定义属性和需要直接处理的属性
const props = withDefaults(defineProps<ExtendProps>(), {
	// 自定义属性默认值
	maxTags: undefined,
	tagValidator: undefined
})

// 定义事件，支持所有 ElInputTag 事件
const emit = defineEmits<{
	'update:modelValue': [value: string[] | undefined]
	change: [value: string[] | undefined]
	input: [value: string]
	focus: [event: FocusEvent]
	blur: [event: FocusEvent]
	clear: [event: FocusEvent]
	'remove-tag': [tag: string]
	close: [event: FocusEvent]
	// 自定义事件：标签数量超出限制时触发
	'tag-limit-exceed': [value: string[] | undefined]
	// 自定义事件：标签验证失败时触发
	'tag-validate-fail': [tag: string]

	[eventName: string]: [event: any]
}>()

// 处理值更新
const handleUpdateModelValue = (value: string[] | undefined) => {
	// 检查标签数量是否超出限制
	checkTagLimit(value)
	emit('update:modelValue', value)
}

// 处理值变化
const handleChange = (value: string[] | undefined) => {
	emit('change', value)
}

// 处理标签移除事件
const handleRemoveTag = (tag: string) => {
	emit('remove-tag', tag)
}

// 处理关闭事件
const handleClose = (event: FocusEvent) => {
	emit('close', event)
}

// 检查标签数量是否超出限制
const checkTagLimit = (value: string[] | undefined) => {
	if (props.maxTags !== undefined && value && value.length > props.maxTags) {
		emit('tag-limit-exceed', value)
		console.warn(`标签数量超出限制（最多${props.maxTags}个）`)
	}
}

// 监听值变化
watch(
	() => props.modelValue,
	newValue => {
		checkTagLimit(newValue)
	}
)

// 构建传递给 ElInputTag 的属性
const elInputTagProps = computed(() => {
	const result: Partial<InputTagProps> = {}

	// 传递除了自定义属性之外的所有属性
	Object.keys(props).forEach(key => {
		if (key !== 'maxTags' && key !== 'tagValidator' && props[key as keyof ExtendProps] !== undefined) {
			result[key as keyof InputTagProps] = props[key as keyof ExtendProps] as any
		}
	})

	// 如果设置了 tagValidator，则覆盖原始的 validate-input 函数
	if (props.tagValidator) {
		result['validate-input'] = props.tagValidator
	}

	return result
})
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
