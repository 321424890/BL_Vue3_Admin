import { ref, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
export function useCrud<T = any>(
	actionButtons: any,
	url: {
		listApi: (params: any) => Promise<T[] | { data: T[] } | any>
		addDataApi?: (data: any) => Promise<any>
		editDataApi?: (data: any) => Promise<any>
	}
) {
	// export function useCrud<T = any>(actionButtons: any, url: any, TableDataItem: any) {
	console.log('url', url)
	const tableData = ref<T[]>([])
	const dialogVisible = ref(false) //控制弹窗显示隐藏
	const loading = ref(false) //控制列表显示隐藏loading
	const currentAction = ref('') // 'add' 或 'edit'
	const drawerTitle = ref('') //新增弹窗title
	const selectionData = ref<any>([])
	// 搜索参数
	const searchF = ref<any>({})
	// 分页参数
	const querySize = ref<any>({
		pageSize: 10,
		pageNum: 1
	})
	// 表单数据，改成ref包裹对象
	const formData = ref<any>({})

	// 调用列表接口
	async function listData(params: any) {
		loading.value = true
		try {
			// const data = await (apiMap as any)[url.type].list(params, url.getList)
			const data = await url.listApi(params) // 这里 data 的类型就是 T[]
			console.log('data', data)
			// 确保 tableData.value 始终是数组
			if (data && typeof data === 'object') {
				// 如果返回的数据有 data 属性，使用 data.data；否则直接使用 data
				const result = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []
				tableData.value = result
			} else {
				tableData.value = []
			}
			console.log('tableData.value:', tableData.value)
			loading.value = false
		} catch (error) {
			console.error('获取数据失败:', error)
			tableData.value = [] // 出错时设置为空数组
			loading.value = false
		}
	}

	// 打开新增弹窗
	function openAdd() {
		console.log('新增数据')
		currentAction.value = 'add'
		drawerTitle.value = '新增'
		formData.value = {} // 清空表单
		dialogVisible.value = true
	}

	// 打开编辑/弹窗，传入当前行数据
	function openEdit(row: any, val: string) {
		dialogVisible.value = true
		formData.value = { ...row } // 赋值表单，整体替换对象
		drawerTitle.value = val === 'details' ? '详情' : '编辑'
		currentAction.value = val === 'details' ? 'details' : 'edit'
		console.log('编辑弹窗', formData.value)
	}

	// 提交保存（新增或编辑）

	async function submitForm(data: any) {
		console.log('参数:', data)
		try {
			let res
			if (currentAction.value === 'add' && url.addDataApi) {
				// 新增接口
				res = await url.addDataApi(data)
				console.log('新增结果:', res)
				ElMessage.success(res?.message || '新增成功')
			} else if (currentAction.value === 'edit' && url.editDataApi) {
				// 编辑接口
				res = await url.editDataApi(data)

				ElMessage.success(res?.message || '编辑成功')
			}
			dialogVisible.value = false
		} catch (error) {
			ElMessage.error('提交失败，请稍后重试')
		}
	}

	// 删除
	function handleDelete(row: any) {
		ElMessageBox.confirm('确定删除本条数据吗？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			console.log('删除行:', row)
		})
	}

	// 选中
	const handleSelection = (selection: any) => {
		selectionData.value = selection
		console.log('选中的项:', selection)
	}

	// 统一的请求参数对象;
	const getRequestParams = () => {
		return {
			...querySize.value,
			...searchF.value
		}
	}

	// 搜索查询
	const handleSearch = (e: any) => {
		searchF.value = e
		// 重置分页参数到第一页
		querySize.value = {
			pageSize: 10,
			pageNum: 1
		}
		listData(getRequestParams())
		console.log('查询参数',getRequestParams())
	}

	// 分页
	const handlePageChange = (e: any) => {
		querySize.value = e
		listData(getRequestParams())
	}

	// 动态计算操作列自适应宽度
	// const actionWidth = computed(() => {
	// 	const padding = 20 // 操作列额外留白
	// 	const buttonMargin = 8 // 按钮之间的间距
	// 	// 过滤掉不可见按钮
	// 	const visibleButtons = actionButtons.value.filter((btn: { visible: boolean }) => btn.visible !== false)
	// 	// 计算所有按钮宽度总和
	// 	const totalWidth = visibleButtons.reduce((total: number, btn: { label: string | any[] }, index: number) => {
	// 		// 估算文字宽度
	// 		const textWidth = btn.label.length * 34
	// 		// 按钮宽度 = 文字宽度 + 按钮左右内边距（假设20px）
	// 		const btnWidth = textWidth + 20
	// 		// 累加按钮宽度和按钮间距（最后一个按钮不加间距）
	// 		return total + btnWidth + (index < visibleButtons.length - 1 ? buttonMargin : 0)
	// 	}, 0)

	// 	return totalWidth + padding + 'px'
	// })

	// 默认首次进入更新接口数据
	listData(getRequestParams())

	return {
		dialogVisible,
		drawerTitle,
		formData,
		currentAction,
		selectionData,
		searchF,
		querySize,
		loading,
		// actionWidth,
		tableData,
		listData,
		openAdd,
		openEdit,
		submitForm,
		handleDelete,
		handleSelection,
		handleSearch,
		handlePageChange,
		getRequestParams
	}
}
