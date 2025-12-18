// 图表数据类型
export interface ChartData {
	/** X轴数据 */
	xAxis?: string[] | number[]
	/** 系列数据 */
	series?: SeriesItem[]
	/** 其他自定义数据 */
	[key: string]: any
}

// 系列数据项
export interface SeriesItem {
	/** 系列名称 */
	name?: string
	/** 系列类型 */
	type?: 'bar' | 'line' | 'pie' | 'scatter' | 'map' | 'radar'
	/** 数据 */
	data?: any[]
	/** 配置项 */
	[key: string]: any
}

// 饼图数据项
export interface PieDataItem {
	/** 名称 */
	name: string
	/** 值 */
	value: number
	/** 配置项 */
	[key: string]: any
}

// 基础配置
export interface BasicConfig {
	/** 标题配置 */
	title?: {
		/** 主标题文本 */
		text?: string
		/** 副标题文本 */
		subtext?: string
		/** 水平位置 */
		left?: string | number
		/** 垂直位置 */
		top?: string | number
		/** 文本样式 */
		textStyle?: {
			/** 颜色 */
			color?: string
			/** 字体大小 */
			fontSize?: number
			/** 其他样式 */
			[key: string]: any
		}
		/** 其他配置 */
		[key: string]: any
	}

	/** 提示框配置 */
	tooltip?: {
		/** 触发类型 */
		trigger?: 'item' | 'axis'
		/** 格式化器 */
		formatter?: any
		/** 其他配置 */
		[key: string]: any
	}

	/** 图例配置 */
	legend?: {
		/** 图例数据 */
		data?: string[]
		/** 顶部位置 */
		top?: string | number
		/** 底部位置 */
		bottom?: string | number
		/** 左侧位置 */
		left?: string | number
		/** 右侧位置 */
		right?: string | number
		/** 布局方向 */
		orient?: 'horizontal' | 'vertical'
		/** 其他配置 */
		[key: string]: any
	}

	/** 其他配置 */
	[key: string]: any
}

// 组件属性
export interface BasicEchartsProps {
	/** 图表宽度 */
	width?: string
	/** 图表高度 */
	height?: string
	/** 业务数据 */
	data?: ChartData
	/** 基础配置 */
	config?: BasicConfig
	/** 图表类型 */
	chartType?: 'bar' | 'line' | 'pie' | 'scatter' | 'map' | 'radar'
	/** 是否加载中 */
	loading?: boolean
	/** 是否显示暂无数据 */
	noData?: boolean
	/** 自定义option（优先级最高） */
	customOption?: any
}

// 组件事件
export interface BasicEchartsEmits {
	/** 图表就绪事件 */
	(e: 'chart-ready', chartInstance: any): void
	/** 点击事件 */
	(e: 'click', params: any): void
	/** 图例选择事件 */
	(e: 'legendselectchanged', params: any): void
	/** 数据区域缩放事件 */
	(e: 'datazoom', params: any): void
}

// 组件暴露方法
export interface BasicEchartsExpose {
	/** 获取图表实例 */
	getChartInstance: () => any
	/** 手动更新图表 */
	update: () => void
	/** 手动调整大小 */
	resize: () => void
	/** 清空图表 */
	clear: () => void
}
