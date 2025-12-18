<template>
	<el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
		<el-row :gutter="20">
			<template v-for="item in formConfig" :key="item.prop">
				<el-col :xs="24" :sm="12" :md="12">
					<el-form-item :label="item.label" :prop="item.prop" :required="item.required">
						<!-- 使用 BLInput 组件 -->
						<BLInput
							v-if="item.type === 'bl-input'"
							v-model="formData[item.prop]"
							v-bind="item.props"
							:readonly="item.readonly === true"
							:disabled="item.disabled"
							clearable
							@click="item.readonly === true ? handleFieldClick(item) : null"
							@change="val => handleFieldChange(item, val)"
						/>
					</el-form-item>
				</el-col>
			</template>
		</el-row>
	</el-form>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import BLInput from '../BasicInput/input/index.vue'

// 定义表单配置项类型
interface FormConfigItem {
	prop: string
	label: string
	required?: boolean
	type: string
	readonly?: boolean
	rules?: any[]
	props?: Record<string, any>
	[prop: string]: any
}

// 定义 props 的类型
interface Props {
	formData: Record<string, any>
	formConfig: FormConfigItem[]
	rules?: FormRules
}

const props = withDefaults(defineProps<Props>(), {
	formData: () => ({}),
	rules: () => ({})
})

const emit = defineEmits<{
	'update:formData': [value: Record<string, any>]
	'field-change': [item: FormConfigItem, value: any]
	'field-click': [item: FormConfigItem]
}>()

const formRef = ref<FormInstance>()

// 直接解构响应式引用
const { formData } = toRefs(props)

// 合并表单规则：将 formConfig 中的规则与外部传入的 rules 合并
const rules = computed<FormRules>(() => {
	const mergedRules: FormRules = { ...props.rules }

	// 从 formConfig 中提取规则
	props.formConfig.forEach(item => {
		if (item.rules && item.prop) {
			// 如果外部已有相同字段的规则，则合并
			if (mergedRules[item.prop]) {
				mergedRules[item.prop] = [...mergedRules[item.prop], ...item.rules]
			} else {
				mergedRules[item.prop] = item.rules
			}
		}
	})

	return mergedRules
})

// 处理字段变化，支持联动
const handleFieldChange = (item: FormConfigItem, val: any) => {
	formData.value[item.prop] = val
	emit('update:formData', formData.value)
	emit('field-change', item, val)
}

const handleFieldClick = (item: FormConfigItem, _event?: Event) => {
	emit('field-click', item)
}

// 验证表单
const validate = async (): Promise<boolean> => {
	if (!formRef.value) return false
	return await formRef.value.validate()
}

// 重置表单
const resetFields = () => {
	if (formRef.value) {
		formRef.value.resetFields()
	}
}

// 暴露方法
defineExpose({
	formRef,
	validate,
	resetFields
})
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
