import { ref, onMounted, onBeforeUnmount, Ref, nextTick } from 'vue'

/**
 * 获取表格最大高度的 Hook
 * @param searchRef 搜索区域的ref
 * @param otherHeight 其他区域高度（如分页、顶部栏等），默认100
 * @returns { tableMaxHeight } 响应式表格最大高度
 */
export function useTableMaxHeight(
	searchRef?: Ref<HTMLElement | undefined>,
	otherHeight = 250,
	invoiceDetails?: string
): { tableMaxHeight: Ref<number> } {
	const tableMaxHeight = ref<number>(0)

	const calculateMaxHeight = (): void => {
		const windowHeight: number = window.innerHeight
		let mainHeight = searchRef?.value?.offsetHeight || 0
		if (mainHeight === 0) {
			mainHeight = 0
		}
		let searchBoxHeight = 0
		if (mainHeight == 0) {
			searchBoxHeight = mainHeight + 0
		} else if (mainHeight <= 70) {
			searchBoxHeight = mainHeight + 40
		} else if (mainHeight === 80) {
			searchBoxHeight = mainHeight + 20
		} else if (mainHeight === 120) {
			searchBoxHeight = mainHeight + 50
		} else if (mainHeight === 130 || mainHeight === 180) {
			searchBoxHeight = mainHeight + 40
		} else if (mainHeight === 170) {
			searchBoxHeight = mainHeight + 20
		} else if (mainHeight === 230) {
			searchBoxHeight = mainHeight + 60
		} else if (mainHeight === 220) {
			searchBoxHeight = mainHeight + 20
		} else if (mainHeight === 250) {
			searchBoxHeight = mainHeight + 20
		} else if (mainHeight >= 270) {
			searchBoxHeight = mainHeight + 20
		} else {
			searchBoxHeight = mainHeight || 250
		}
		const newheigtt = windowHeight - searchBoxHeight - otherHeight
		tableMaxHeight.value = invoiceDetails === 'invoiceDetails' ? 250 : newheigtt
		// 调试输出
		// console.log('newheigtt', newheigtt);
		// console.log('mainHeight', mainHeight);
		// console.log('searchBoxHeight', searchBoxHeight);
		// console.log('tableMaxHeight', tableMaxHeight.value);
	}
	onMounted(() => {
		nextTick(() => {
			calculateMaxHeight()
			window.addEventListener('resize', calculateMaxHeight)
		})
	})
	onBeforeUnmount(() => {
		window.removeEventListener('resize', calculateMaxHeight)
	})
	return {
		tableMaxHeight
	}
}
