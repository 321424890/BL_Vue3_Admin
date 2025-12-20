/** 表格列配置 */
export interface Column {
	prop: string
	label: string
	readonly?: boolean
	isEditing?: boolean
	sortable?: boolean
	width?: string | number
	minWidth?: string | number
	headerAlign?: string
	align?: string
	fixed?: string
}

/** 查询表单项配置 */
export interface QueryConfigItem {
	prop: string
	label: string
	type: string
	value?: any
	required?: boolean
	width?: string
	disabled?: boolean
	readonly?: boolean
	rules?: any
	props?: Record<string, any>
	onChange?: (val: any) => void
	onRemoteSearch?: (query: string) => Promise<void>
}

/** 分页参数 */
export interface QuerySize {
	pageNum: number
	pageSize: number
}

// 查询项类型
export interface QueryItem {
	prop: string
	label: string
	type: string
	value?: any
	required?: boolean
	width?: string
	disabled?: boolean
	readonly?: boolean
	rules?: any
	props?: Record<string, any>
	onChange?: (val: any) => void
	onRemoteSearch?: (query: string) => Promise<void>
}
