<template>
	<el-table-column
	  v-for="column in columns"
	  :key="column.prop"
	  :prop="column.prop"
	  :label="column.label"
	  :sortable="column.sortable"
	  :isEditing="column.isEditing"
	  :width="column.width"
	  :fixed="column.fixed"
	  :header-align="column.headerAlign"
	  :align="column.align"
	  :show-overflow-tooltip="true"
	>
	  <template #default="{ row, $index }">
		<el-tooltip
		  :content="getTooltipContent(row, column.prop, column)"
		  placement="top"
		  :show-after="200"
		  :hide-after="0"
		  :disabled="!isContentOverflow(row, column.prop)"
		>
		  <div
			class="cell-content"
			style="
			  overflow: hidden;
			  text-overflow: ellipsis;
			  white-space: nowrap;
			  width: 100%;
			"
			ref="cellRef"
		  >
			<slot :name="column.prop" :row="row" :rowIndex="$index">
			  {{ row[column.prop] }}
			</slot>
		  </div>
		</el-tooltip>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import { defineProps, defineSlots } from 'vue'
import type { Column } from '../hook/types'
interface Props {
	columns: Column[]
	dictConverters?: Record<string, (value: any) => string>
}
const props = withDefaults(defineProps<Props>(), {
	dictConverters: () => ({})
})
console.log('标题租金',props.columns)
defineSlots<{
	[key: string]: any
}>()
function getTooltipContent(row: any, prop: string, column: any): string {
	const value = row[prop]
	if (value === undefined || value === null || value === '') {
		return ''
	}
	if (typeof value === 'object' && value !== null) {
		return ''
	}
	const converter = props.dictConverters?.[prop]
	if (converter && typeof converter === 'function') {
		const convertedValue = converter(value)
		return convertedValue !== undefined && convertedValue !== null ? String(convertedValue) : String(value)
	}
	return String(value)
}
function isContentOverflow(row: any, prop: string): boolean {
	const value = row[prop]
	if (value === undefined || value === null || value === '') {
		return false
	}
	if (typeof value === 'object' && value !== null) {
		return false
	}
	const converter = props.dictConverters?.[prop]
	let text: string
	if (converter && typeof converter === 'function') {
		const convertedValue = converter(value)
		text = convertedValue !== undefined && convertedValue !== null ? String(convertedValue) : String(value)
	} else {
		text = String(value)
	}
	return text.length > 12
}
</script>
<style scoped>
.cell-content {
	overflow: hidden !important;
	text-overflow: ellipsis !important;
	white-space: nowrap !important;
	width: 100% !important;
	display: block !important;
}
:deep(.cell-content) {
	overflow: hidden !important;
	text-overflow: ellipsis !important;
	white-space: nowrap !important;
	width: 100% !important;
	display: block !important;
}
:deep(.cell-content *) {
	overflow: hidden !important;
	text-overflow: ellipsis !important;
	white-space: nowrap !important;
}
</style>
