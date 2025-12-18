<template>
	<el-table-column
		v-if="actions && actions.length > 0"
		:label="actionLabel"
		:width="actionwidthnew ? actionwidthnew : actionWidths"
		header-align="center"
		align="center"
		fixed="right"
	>
		<template #default="scope">
			<div class="action-buttons">
				<template v-for="(control, idx) in filteredControls(scope.row)" :key="idx">
					<!-- 只有图标没有文字的按钮，使用 tooltip -->
					<el-tooltip
						v-if="control.icon && !control.label && control.tooltip"
						class="item"
						effect="dark"
						:content="typeof control.tooltip === 'function' ? control.tooltip(scope.row) : control.tooltip"
						placement="top"
					>
						<el-button
							:type="control.type || 'primary'"
							:size="control.size || 'small'"
							:loading="getButtonLoading(generateButtonKey(scope.row, control, idx))"
							:disabled="typeof control.disabled === 'function' ? control.disabled(scope.row) : control.disabled"
							:icon="control.icon"
							@click="handleButtonClick(scope.row, control)"
						/>
					</el-tooltip>
					<!-- 有文字的按钮（可能有图标也可能没有） -->
					<el-button
						v-else
						:type="control.type || 'primary'"
						:size="control.size || 'small'"
						:loading="getButtonLoading(generateButtonKey(scope.row, control, idx))"
						:disabled="typeof control.disabled === 'function' ? control.disabled(scope.row) : control.disabled"
						:icon="control.icon"
						@click="handleButtonClick(scope.row, control)"
					>
						{{ typeof control.label === 'function' ? control.label(scope.row) : control.label }}
					</el-button>
				</template>
			</div>
		</template>
	</el-table-column>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTable, UseTableProps, UseTableEmit } from '../hook/useTable'
import type { ActionControl } from '../hook/useTable'

interface Props {
	actions?: ActionControl[]
	actionLabel?: string
	actionwidthnew?: string
	tableData: any[]
}
const props = withDefaults(defineProps<Props>(), {
	actionLabel: '操作'
})
const { filteredControls, getMaxButtonsRow, handleButtonClick, getButtonLoading, generateButtonKey } = useTable(
	{ actions: props.actions || [] } as UseTableProps,
	{} as UseTableEmit
)
const actionWidths = computed(() => {
	const padding = 20
	const buttonMargin = 8
	const maxButtonsData = getMaxButtonsRow(props.tableData)
	const visibleButtons = maxButtonsData.buttons
	const totalWidth =
		visibleButtons?.reduce((total: any, btn: any, index: number) => {
			const textWidth = (btn.label || '').length * 28
			const btnWidth = textWidth + 15
			return total + btnWidth + (index < visibleButtons.length - 1 ? buttonMargin : 0)
		}, 0) || 0
	const aoowudth = totalWidth + padding <= 20 ? 80 : totalWidth + padding
	return aoowudth + 'px'
})
</script>
<style scoped>
.action-buttons {
	display: flex;
	gap: 8px;
	justify-content: center;
	align-items: center;
}
</style>
