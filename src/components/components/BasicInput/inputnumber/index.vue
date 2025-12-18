<template>
	<!-- 使用动态 component 渲染 ElInputNumber 并自动转发所有属性、事件和插槽 -->
	<component
		:is="ElInputNumber"
		v-bind="{ ...$attrs, ...elInputNumberProps }"
		:model-value="modelValue"
		@update:model-value="handleUpdateModelValue"
		@change="handleChange"
		@focus="$emit('focus', $event)"
		@blur="$emit('blur', $event)"
		@input="$emit('input', $event)"
		@increase="$emit('increase', $event)"
		@decrease="$emit('decrease', $event)"
	>
		<!-- 自动转发所有插槽 -->
		<template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]>
			<slot :name="slotName" />
		</template>
	</component>
</template>

<script setup lang="ts">
import { ElInputNumber } from 'element-plus'
import type { InputNumberProps } from 'element-plus'
import { watch, computed } from 'vue'

// 设置组件名称和属性继承选项
defineOptions({
	name: 'BLInputNumber',
	inheritAttrs: false // 不自动绑定 $attrs 到根元素
})

// 定义扩展属性，使用 Partial<InputNumberProps> 使所有属性可选
interface ExtendProps extends Partial<InputNumberProps> {
	// 自定义属性：限制输入范围的最小值和最大值的提示文本
	rangeTip?: string
	// 自定义属性：是否显示千分位分隔符
	thousands?: boolean
	// 确保 modelValue 是可选的
	modelValue?: number
}

// 定义组件属性，只包含自定义属性和需要直接处理的属性
const props = withDefaults(defineProps<ExtendProps>(), {
	// 自定义属性默认值
	rangeTip: '',
	thousands: false,
	// 设置 controls 默认值为 true，确保加减号按钮默认显示
	controls: true
})

// 定义事件，支持所有 ElInputNumber 事件
const emit = defineEmits<{
	'update:modelValue': [value: number | undefined]
	change: [value: number | undefined]
	blur: [event: FocusEvent]
	focus: [event: FocusEvent]
	input: [value: number | undefined]
	increase: [event: any]
	decrease: [event: any]
	// 自定义事件：值超出范围时触发
	'range-exceed': [event: [value: any, direction: 'min' | 'max']]

	[eventName: string]: [event: any]
}>()

// 处理值更新
const handleUpdateModelValue = (value: number | undefined) => {
	// 检查值是否在范围内
	if (value !== undefined) {
		checkRange(value)
	}
	emit('update:modelValue', value)
}

// 处理值变化
const handleChange = (value: number | undefined) => {
	emit('change', value)
}

// 检查值是否在范围内
const checkRange = (value: number) => {
	if (props.min !== undefined && value < props.min) {
		emit('range-exceed', [value, 'min'])
		if (props.rangeTip) {
			console.warn(props.rangeTip)
		}
	} else if (props.max !== undefined && value > props.max) {
		emit('range-exceed', [value, 'max'])
		if (props.rangeTip) {
			console.warn(props.rangeTip)
		}
	}
}

// 监听值变化
watch(
	() => props.modelValue,
	newValue => {
		if (newValue !== undefined) {
			checkRange(newValue)
		}
	}
)

// 千分位格式化函数
const thousandsFormatter = (value: number): string => {
	if (value === null || value === undefined) return ''
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 千分位解析函数
const thousandsParser = (value: string): number => {
	if (!value) return 0
	return Number(value.replace(/,/g, ''))
}

// 构建传递给 ElInputNumber 的属性
const elInputNumberProps = computed(() => {
	const result: Partial<InputNumberProps> = {}

	// 传递除了自定义属性之外的所有属性
	Object.keys(props).forEach(key => {
		if (key !== 'rangeTip' && key !== 'thousands' && props[key as keyof ExtendProps] !== undefined) {
			result[key as keyof InputNumberProps] = props[key as keyof ExtendProps] as any
		}
	})

	// 如果设置了 thousands，则使用千分位格式化
	if (props.thousands) {
		// 如果用户提供了自定义 formatter 和 parser，则优先使用
		if (!result.formatter) result.formatter = thousandsFormatter
		if (!result.parser) result.parser = thousandsParser
	}

	return result
})
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
