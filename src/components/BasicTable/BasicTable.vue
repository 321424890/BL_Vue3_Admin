<template>
	<div class="table-container">
		<div ref="searchRef">
			<search-component
				v-if="queryConfigStatus"
				ref="searchRefsss"
				:query-config="queryConfig"
				@search="handleSearch"
				@reset="handleReset"
				@field-click="onFieldClicks"
			/>
		</div>
		<el-card>
			<div class="toolLeftRight">
				<div class="tool-left">
					<slot name="toolLeft"></slot>
				</div>
				<div class="tool-right">
					<slot name="toolRight"></slot>
				</div>
			</div>
			<!-- tableMaxHeight -->
			<div class="table-scroll" :style="{ maxHeight: basicHeight ? basicHeight : tableMaxHeight + 'px' }">
				<el-table
					:data="tableData"
					:border="border"
					:stripe="stripe"
					:height="basicHeight ? basicHeight : dialog ? '250px' : tableMaxHeight"
					:highlight-current-row="singleSelect"
					:header-cell-style="{ background: '#fafafa' }"
					:fit="true"
					:show-summary="showSummary"
					:summary-method="summaryMethod"
					:row-key="!rowKeylod ? rowKey : ''"
					@selection-change="handleSelectionChange"
					@row-click="singleSelect ? handleSingleSelect : undefined"
				>
					<el-table-column
						v-if="showSelection && selectionType === 'selection'"
						type="selection"
						width="65"
						fixed="left"
						:reserve-selection="!rowKeylod ? true : false"
						align="center"
					/>
					<el-table-column v-if="singleSelect" label="" width="65" align="center">
						<template #default="{ row }">
							<el-radio :label="row.id" :model-value="selectedRow && selectedRow.id" @change="() => handleSingleSelect(row)">
								<span style="display: none"></span>
								&nbsp;
							</el-radio>
						</template>
					</el-table-column>
					<!-- 序号列 -->

					<el-table-column v-if="huhao" type="index" label="序号" width="55" align="center" />
					<!-- 表格列渲染 -->
					<TableColumn :columns="columns" :dict-converters="dictConverters">
						<template v-for="(column, index) in columns" :key="column.prop || index" #[column.prop]="scope">
							<slot :name="column.prop" :row="scope?.row" :row-index="scope?.rowIndex">
								{{ scope?.row?.[column.prop] }}
							</slot>
						</template>
					</TableColumn>
					<!-- 操作按钮列 -->
					<ActionButtons
						v-if="actions && actions.length > 0"
						:actions="actions || []"
						:action-label="actionLabel"
						:actionwidthnew="actionwidthnew"
						:table-data="tableData"
					/>
				</el-table>
			</div>
			<!-- 分页 -->
			<Pagination
				v-show="showPagination"
				v-model:page="querySize.pageNum"
				v-model:limit="querySize.pageSize"
				:total="totalDataCount"
				@pagination="getButterflyList"
			/>
		</el-card>
	</div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, onMounted, onBeforeUnmount, Ref, nextTick, watch } from 'vue'
import SearchComponent from './SearchComponent.vue'
import Pagination from '@/components/BasicTable/Pagination/index.vue'
import TableColumn from './components/TableColumn.vue'
import ActionButtons from './components/ActionButtons.vue'
import { useTable, UseTableProps, UseTableEmit } from './hook/useTable'
import { querySearch, QuerySearchProps, QuerySearchEmit } from './hook/querySearch'
import { useTableMaxHeight } from './hook/useTableMaxHeight'
// import righttoolbar from "./RightToolbar/index.vue";
import './hook/css/index.css'
import type { Column, QueryConfigItem, QuerySize } from './hook/types'
const props = withDefaults(
	defineProps<{
		tableData: any[]
		columns: Column[]
		border?: boolean
		total?: number
		dialog?: boolean
		tableStyle?: string
		showSelection?: boolean
		huhao?: boolean
		selectionType?: string
		rowKey?: string
		invoiceDetails?: string //控制特得最小高度
		height?: string
		searchHeight?: any
		actions?: any[]
		actionLabel?: string
		actionWidth?: string
		actionwidthnew?: string
		stripe?: boolean
		queryConfigStatus?: boolean
		basicHeight?: string
		showPagination?: boolean
		queryConfig?: QueryConfigItem[]
		querySize?: QuerySize
		singleSelect?: boolean
		selectedRow?: any
		showSummary?: boolean
		Loading?: boolean
		rowKeylod?: boolean
		summaryMethod?: any
		pnpmHeight?: boolean
		dictConverters?: Record<string, (value: any) => string>
	}>(),
	{
		huhao: true,
		dialog: false,
		rowKey: 'id',
		singleSelect: false,
		selectedRow: null,
		showSummary: false,
		querySize: {
			pageNum: 1,
			pageSize: 10
		},
		dictConverters: () => ({})
	}
)
const tableHeight = ref(600)
const searchRef = ref()
const searchRefsss = ref()
const emit = defineEmits<{
	(e: 'selection-change', val: any[]): void
	(e: 'page-change', page: { pageNo: number; pageSize: number }): void
	(e: 'single-select-change', val: any): void
	(e: 'field-click', val: any, formRef?: any): void
}>()
const { handleSelectionChange, getMaxButtonsRow } = useTable(props as UseTableProps, emit as unknown as UseTableEmit)
const { handleSearch, handleReset } = querySearch(props as QuerySearchProps, emit as unknown as QuerySearchEmit)
const totalDataCount = computed<number>(() => props.tableData.length)
const { tableMaxHeight } = useTableMaxHeight(searchRef, 250, props.invoiceDetails)
const getButterflyList = (page: { pageNo: number; pageSize: number }) => {
	emit('page-change', page)
}
const selectedRow = ref<any>(props.selectedRow)
watch(
	() => props.selectedRow,
	val => {
		selectedRow.value = val
	}
)
function handleSingleSelect(row: any) {
	console.log('row', row)
	selectedRow.value = row
	emit('single-select-change', row)
}
function onFieldClicks(e: any) {
	if (e.readonly === true) {
		emit('field-click', e, searchRefsss.value)
	}
}
onMounted(() => {})
</script>
<style scoped>
.el-radio__label {
	display: none !important;
}
</style>
