import { ref, computed, Ref } from 'vue'
export interface ActionControl {
	visible?: boolean | ((row: Record<string, any>) => boolean)
	disabled?: boolean | ((row: Record<string, any>) => boolean)
	action: (row: Record<string, any>) => void
	[key: string]: any
}
export interface UseTableProps {
	actions: ActionControl[]
}
export type UseTableEmit = (event: string, payload: any) => void
export function useTable(
	props: UseTableProps,
	emit: UseTableEmit
): {
	selection: Ref<any[]>
	handleSelectionChange: (newSelection: any[]) => void
	filteredControls: (row: Record<string, any>) => ActionControl[]
	processedActions: Ref<ActionControl[]>
	getMaxButtonsRow: (tableData: any[]) => { row: any; buttons: ActionControl[]; count: number }
	handleButtonClick: (row: any, control: any, index: number) => Promise<void>
	getButtonLoading: (buttonKey: string) => boolean
	generateButtonKey: (row: any, control: any, index: number) => string
} {
	const selection = ref<any[]>([])
	const processedActions = ref<ActionControl[]>([])
	const buttonLoadingStates = ref<Record<string, boolean>>({})
	const handleSelectionChange = (newSelection: any[]): void => {
		selection.value = newSelection
		console.log('获取到的选中数据', selection.value)
		emit('selection-change', newSelection)
	}
	const filteredControls = (row: Record<string, any>): ActionControl[] => {
		return props.actions
			.map(action => ({
				...action,
				visible: typeof action.visible === 'function' ? action.visible(row) : action.visible !== true,
				disabled: typeof action.disabled === 'function' ? action.disabled(row) : action.disabled === true
			}))
			.filter(action => action.visible)
	}
	const getMaxButtonsRow = (tableData: any[]): { row: any; buttons: ActionControl[]; count: number } => {
		if (!tableData || tableData.length === 0) {
			return { row: null, buttons: [], count: 0 }
		}
		let maxButtonsCount = 0
		let maxButtonsRow = null
		let maxButtonsArray: ActionControl[] = []
		tableData.forEach(row => {
			const visibleButtons = filteredControls(row)
			const buttonCount = visibleButtons.length
			if (buttonCount > maxButtonsCount) {
				maxButtonsCount = buttonCount
				maxButtonsRow = row
				maxButtonsArray = visibleButtons
			}
		})
		processedActions.value = maxButtonsArray
		return {
			row: maxButtonsRow,
			buttons: maxButtonsArray,
			count: maxButtonsCount
		}
	}
	const setButtonLoading = (buttonKey: string, loading: boolean) => {
		buttonLoadingStates.value[buttonKey] = loading
	}
	const getButtonLoading = (buttonKey: string) => {
		return buttonLoadingStates.value[buttonKey] || false
	}
	const generateButtonKey = (row: any, control: any, index: number) => {
		return `${row.id || index}_${control.label || 'button'}_${index}`
	}
	const handleButtonClick = async (row: any, control: any, index: number) => {
		const buttonKey = generateButtonKey(row, control, index)
		if (control.loading === 'true') {
			setButtonLoading(buttonKey, true)
		}
		try {
			await control.action(row)
		} finally {
			if (control.loading === 'true') {
				setButtonLoading(buttonKey, false)
			}
		}
	}
	return {
		selection,
		handleSelectionChange,
		filteredControls,
		processedActions,
		getMaxButtonsRow,
		handleButtonClick,
		getButtonLoading,
		generateButtonKey
	}
}
