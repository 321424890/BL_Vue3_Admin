/**
 * 图表颜色配置常量
 * 提供统一的图表颜色方案，确保整个应用中图表视觉风格一致性
 */
export const CHART_COLORS = {
	/**
	 * 基础颜色序列
	 * 用于图表中的多系列数据展示，按照顺序循环使用
	 * 示例: 柱状图多系列、折线图多系列等
	 */
	base: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86452', '#6DC8EC', '#945FB9', '#FF9845', '#1E9493', '#FF99C3'],

	/**
	 * 渐变色配置
	 * 提供常用的线性渐变定义，用于图表元素填充
	 * 类型: linear - 线性渐变
	 * x, y, x2, y2 - 渐变起始和结束坐标 (0-1)
	 * colorStops - 颜色停靠点数组，定义渐变过程中的颜色变化
	 */
	gradient: {
		/** 蓝色渐变 - 从上到下 */
		blue: {
			type: 'linear',
			x: 0, // 渐变起始x坐标
			y: 0, // 渐变起始y坐标
			x2: 0, // 渐变结束x坐标
			y2: 1, // 渐变结束y坐标
			colorStops: [
				{ offset: 0, color: '#5B8FF9' }, // 起始颜色 (深蓝)
				{ offset: 1, color: '#CDDDFD' } // 结束颜色 (浅蓝)
			]
		},

		/** 绿色渐变 - 从上到下 */
		green: {
			type: 'linear',
			x: 0,
			y: 0,
			x2: 0,
			y2: 1,
			colorStops: [
				{ offset: 0, color: '#5AD8A6' }, // 起始颜色 (深绿)
				{ offset: 1, color: '#CDF3E4' } // 结束颜色 (浅绿)
			]
		},

		/** 橙色渐变 - 从上到下 */
		orange: {
			type: 'linear',
			x: 0,
			y: 0,
			x2: 0,
			y2: 1,
			colorStops: [
				{ offset: 0, color: '#FF9845' }, // 起始颜色 (深橙)
				{ offset: 1, color: '#FFE0C7' } // 结束颜色 (浅橙)
			]
		}
	}
}

// 使用示例:
// 1. 在series中使用基础颜色
// const series = {
//   name: '示例数据',
//   type: 'bar',
//   data: [10, 20, 30],
//   itemStyle: {
//     color: CHART_COLORS.base[0] // 使用第一个基础颜色
//   }
// }

// 2. 在series中使用渐变颜色
// const series = {
//   name: '示例数据',
//   type: 'bar',
//   data: [10, 20, 30],
//   itemStyle: {
//     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, CHART_COLORS.gradient.blue.colorStops)
//   }
// }

/**
 * 数据转换工具类
 * 提供将各种数据格式转换为ECharts所需数据格式的静态方法
 * 解决后端返回数据与ECharts图表数据格式不匹配的问题
 */
export class DataTransform {
	/**
	 * 将对象数组转换为ECharts系列数据格式
	 * 适用于饼图、雷达图等需要name-value结构的图表
	 *
	 * @param data 原始数据数组 - 包含需要转换的对象集合
	 * @param nameKey 名称字段名 - 用于提取数据项的名称
	 * @param valueKey 值字段名 - 用于提取数据项的数值
	 * @returns 转换后的系列数据数组 - 每个元素包含name和value属性
	 *
	 * @example
	 * // 原始数据
	 * const rawData = [
	 *   { category: '类别A', count: 100 },
	 *   { category: '类别B', count: 200 }
	 * ];
	 *
	 * // 转换为ECharts系列数据
	 * const seriesData = DataTransform.toSeriesData(rawData, 'category', 'count');
	 * // 结果: [{name: '类别A', value: 100}, {name: '类别B', value: 200}]
	 */
	static toSeriesData(data: any[], nameKey: string, valueKey: string): any[] {
		return data.map(item => ({
			name: item[nameKey], // 提取名称
			value: item[valueKey] // 提取数值
		}))
	}

	/**
	 * 将对象数组转换为饼图专用数据格式
	 * 饼图数据格式与通用系列数据格式相同，此处为语义化封装
	 *
	 * @param data 原始数据数组 - 包含需要转换的对象集合
	 * @param nameKey 名称字段名 - 用于提取饼图扇区的名称
	 * @param valueKey 值字段名 - 用于提取饼图扇区的数值
	 * @returns 饼图数据数组 - 每个元素包含name和value属性
	 *
	 * @example
	 * // 原始数据
	 * const rawData = [
	 *   { product: '产品A', sales: 1500 },
	 *   { product: '产品B', sales: 2500 }
	 * ];
	 *
	 * // 转换为饼图数据
	 * const pieData = DataTransform.toPieData(rawData, 'product', 'sales');
	 * // 结果: [{name: '产品A', value: 1500}, {name: '产品B', value: 2500}]
	 *
	 * // 在饼图中使用
	 * const option = {
	 *   series: [{
	 *     type: 'pie',
	 *     data: pieData
	 *   }]
	 * };
	 */
	static toPieData(data: any[], nameKey: string, valueKey: string): any[] {
		return this.toSeriesData(data, nameKey, valueKey)
	}

	/**
	 * 将对象数组转换为柱状图/折线图数据格式
	 * 生成包含xAxis和series的完整数据结构
	 *
	 * @param data 原始数据数组 - 包含完整的表格数据
	 * @param xKey X轴字段名 - 用作横坐标的字段
	 * @param yKeys Y轴字段名数组 - 用作多个系列数据的字段集合
	 * @returns 包含xAxis和series的对象 - 可直接用于ECharts配置
	 *
	 * @example
	 * // 原始数据
	 * const rawData = [
	 *   { month: '1月', sales: 100, profit: 30 },
	 *   { month: '2月', sales: 150, profit: 40 }
	 * ];
	 *
	 * // 转换为XY图表数据
	 * const chartData = DataTransform.toXYData(rawData, 'month', ['sales', 'profit']);
	 * // 结果:
	 * // {
	 * //   xAxis: ['1月', '2月'],
	 * //   series: [
	 * //     {
	 * //       name: 'sales',
	 * //       type: 'bar',
	 * //       data: [100, 150],
	 * //       itemStyle: { color: '#5B8FF9' }
	 * //     },
	 * //     {
	 * //       name: 'profit',
	 * //       type: 'bar',
	 * //       data: [30, 40],
	 * //       itemStyle: { color: '#5AD8A6' }
	 * //     }
	 * //   ]
	 * // }
	 *
	 * // 在图表中使用
	 * const option = {
	 *   xAxis: { type: 'category', data: chartData.xAxis },
	 *   yAxis: { type: 'value' },
	 *   series: chartData.series
	 * };
	 */
	static toXYData(data: any[], xKey: string, yKeys: string[]): any {
		// 提取X轴数据
		const xAxis = data.map(item => item[xKey])

		// 生成多个系列数据
		const series = yKeys.map((key, index) => ({
			name: key, // 系列名称
			type: 'bar', // 默认图表类型
			data: data.map(item => item[key]), // 系列数据
			itemStyle: {
				// 使用基础颜色数组，循环使用以避免颜色重复
				color: CHART_COLORS.base[index % CHART_COLORS.base.length]
			}
		}))

		return { xAxis, series }
	}

	/**
	 * 格式化数值为易读格式（添加万/亿单位）
	 * 适用于显示较大的数值，自动转换为万或亿单位
	 *
	 * @param value 需要格式化的数值
	 * @param precision 小数精度 - 默认为0位小数
	 * @returns 格式化后的数值字符串 - 包含适当的单位
	 *
	 * @example
	 * // 格式化不同大小的数值
	 * DataTransform.formatNumber(12345, 1);    // "1.2万"
	 * DataTransform.formatNumber(123456789, 2); // "1.23亿"
	 * DataTransform.formatNumber(123);       // "123"
	 *
	 * // 在图表配置中使用
	 * const option = {
	 *   tooltip: {
	 *     formatter: (params) => {
	 *       return params.name + ': ' + DataTransform.formatNumber(params.value, 2);
	 *     }
	 *   }
	 * };
	 */
	static formatNumber(value: number, precision = 0): string {
		// 大于等于1亿
		if (value >= 100000000) {
			return (value / 100000000).toFixed(precision) + '亿'
		}
		// 大于等于1万
		else if (value >= 10000) {
			return (value / 10000).toFixed(precision) + '万'
		}
		// 小于1万
		else {
			return value.toFixed(precision)
		}
	}

	/**
	 * 格式化数值为百分比格式
	 * 将小数（0-1）转换为百分比字符串
	 *
	 * @param value 需要格式化的数值（通常为0-1之间的小数）
	 * @param precision 小数精度 - 默认为2位小数
	 * @returns 格式化后的百分比字符串
	 *
	 * @example
	 * // 格式化百分比
	 * DataTransform.formatPercent(0.1234);  // "12.34%"
	 * DataTransform.formatPercent(0.5);     // "50.00%"
	 * DataTransform.formatPercent(1.25, 1); // "125.0%"
	 *
	 * // 在图表配置中使用
	 * const option = {
	 *   tooltip: {
	 *     formatter: (params) => {
	 *       return params.name + ': ' + DataTransform.formatPercent(params.value / 100, 1);
	 *     }
	 *   }
	 * };
	 */
	static formatPercent(value: number, precision = 2): string {
		// 先乘以100，保留指定小数位，再添加百分号
		return (value * 100).toFixed(precision) + '%'
	}
}

/**
 * 图表配置工具类
 * 提供ECharts常用配置项的默认值生成方法
 * 用于快速构建符合设计规范的图表配置
 */
export class ChartConfig {
	/**
	 * 获取默认的tooltip配置
	 * 提供统一风格的提示框配置
	 *
	 * @param trigger 触发类型 - 'item'(数据项触发) 或 'axis'(坐标轴触发)，默认为'axis'
	 * @returns tooltip配置对象 - 可直接用于ECharts的tooltip配置
	 *
	 * @example
	 * // 获取坐标轴触发的tooltip配置
	 * const axisTooltip = ChartConfig.getDefaultTooltip('axis');
	 *
	 * // 获取数据项触发的tooltip配置
	 * const itemTooltip = ChartConfig.getDefaultTooltip('item');
	 *
	 * // 在图表配置中使用
	 * const option = {
	 *   tooltip: ChartConfig.getDefaultTooltip('axis')
	 * };
	 */
	static getDefaultTooltip(trigger: 'item' | 'axis' = 'axis'): any {
		return {
			trigger, // 触发方式
			axisPointer: {
				type: 'cross', // 十字准星指示器
				label: {
					backgroundColor: '#6a7985' // 指示器标签背景色
				}
			},
			backgroundColor: 'rgba(0, 0, 0, 0.8)', // 提示框背景色
			textStyle: {
				color: '#fff' // 提示框文字颜色
			}
		}
	}

	/**
	 * 获取默认的图例配置
	 * 提供居中显示的图例配置
	 *
	 * @returns legend配置对象 - 可直接用于ECharts的legend配置
	 *
	 * @example
	 * // 获取默认图例配置
	 * const legend = ChartConfig.getDefaultLegend();
	 *
	 * // 自定义图例数据
	 * legend.data = ['系列1', '系列2', '系列3'];
	 *
	 * // 在图表配置中使用
	 * const option = {
	 *   legend: legend
	 * };
	 */
	static getDefaultLegend(): any {
		return {
			data: [], // 图例数据，需根据实际系列数据填充
			top: 10, // 图例距离顶部10px
			left: 'center', // 图例水平居中
			textStyle: {
				color: 'rgba(0, 0, 0, 0.65)' // 图例文字颜色
			}
		}
	}

	/**
	 * 获取默认的网格配置
	 * 为柱状图、折线图等配置合适的绘图区域边距
	 *
	 * @returns grid配置对象 - 可直接用于ECharts的grid配置
	 *
	 * @example
	 * // 获取默认网格配置
	 * const grid = ChartConfig.getDefaultGrid();
	 *
	 * // 在图表配置中使用
	 * const option = {
	 *   grid: grid
	 * };
	 */
	static getDefaultGrid(): any {
		return {
			left: '3%', // 左侧边距
			right: '4%', // 右侧边距
			bottom: '3%', // 底部边距
			containLabel: true // 包含坐标轴标签
		}
	}

	/**
	 * 获取默认的X轴配置
	 * 提供样式统一的分类轴配置
	 *
	 * @returns xAxis配置对象 - 可直接用于ECharts的xAxis配置
	 *
	 * @example
	 * // 获取默认X轴配置
	 * const xAxis = ChartConfig.getDefaultXAxis();
	 *
	 * // 设置X轴数据
	 * xAxis.data = ['1月', '2月', '3月'];
	 *
	 * // 在图表配置中使用
	 * const option = {
	 *   xAxis: xAxis
	 * };
	 */
	static getDefaultXAxis(): any {
		return {
			type: 'category', // 类别型坐标轴
			axisLabel: {
				color: 'rgba(0, 0, 0, 0.65)', // 标签颜色
				fontSize: 12 // 标签字号
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(0, 0, 0, 0.1)' // 轴线颜色
				}
			},
			axisTick: {
				show: false // 不显示刻度线
			},
			splitLine: {
				show: true, // 显示分割线
				lineStyle: {
					color: 'rgba(0, 0, 0, 0.05)', // 分割线颜色
					type: 'dashed' // 分割线类型：虚线
				}
			}
		}
	}

	/**
	 * 获取默认的Y轴配置
	 * 提供样式统一的数值轴配置
	 *
	 * @returns yAxis配置对象 - 可直接用于ECharts的yAxis配置
	 *
	 * @example
	 * // 获取默认Y轴配置
	 * const yAxis = ChartConfig.getDefaultYAxis();
	 *
	 * // 自定义Y轴名称
	 * yAxis.name = '数值';
	 *
	 * // 在图表配置中使用
	 * const option = {
	 *   yAxis: yAxis
	 * };
	 */
	static getDefaultYAxis(): any {
		return {
			type: 'value', // 数值型坐标轴
			axisLabel: {
				color: 'rgba(0, 0, 0, 0.45)', // 标签颜色 (稍浅)
				fontSize: 12 // 标签字号
			},
			axisLine: {
				show: false // 不显示轴线
			},
			axisTick: {
				show: false // 不显示刻度线
			},
			splitLine: {
				show: true, // 显示分割线
				lineStyle: {
					color: 'rgba(0, 0, 0, 0.05)', // 分割线颜色
					type: 'dashed' // 分割线类型：虚线
				}
			}
		}
	}

	/**
	 * 完整配置使用示例
	 * // 创建柱状图完整配置
	 * const option = {
	 *   tooltip: ChartConfig.getDefaultTooltip('axis'),
	 *   legend: ChartConfig.getDefaultLegend(),
	 *   grid: ChartConfig.getDefaultGrid(),
	 *   xAxis: {
	 *     ...ChartConfig.getDefaultXAxis(),
	 *     data: ['1月', '2月', '3月', '4月', '5月']
	 *   },
	 *   yAxis: ChartConfig.getDefaultYAxis(),
	 *   series: [{
	 *     name: '销量',
	 *     type: 'bar',
	 *     data: [100, 200, 300, 400, 500]
	 *   }]
	 * };
	 */
}

/**
 * 防抖函数
 * 用于限制函数在短时间内被频繁调用，避免性能问题
 * 常用于处理窗口调整、输入框输入、按钮点击等高频事件
 *
 * @template T 函数类型
 * @param func 需要防抖的原函数
 * @param wait 等待时间（毫秒）
 * @param immediate 是否立即执行 - true: 立即执行，false: 延迟执行
 * @returns 防抖处理后的函数
 *
 * @example
 * // 基础用法 - 延迟执行
 * const debouncedSearch = debounce((keyword) => {
 *   console.log('搜索:', keyword);
 *   // 执行搜索逻辑
 * }, 300);
 *
 * // 输入框搜索示例
 * // input.addEventListener('input', (e) => {
 * //   debouncedSearch(e.target.value);
 * // });
 *
 * @example
 * // 立即执行
 * const debouncedClick = debounce((id) => {
 *   console.log('点击:', id);
 *   // 执行点击逻辑
 * }, 300, true);
 *
 * @example
 * // 在图表组件中使用 - 窗口大小变化时调整图表大小
 * // const handleResize = debounce(() => {
 * //   chartInstance.resize();
 * // }, 200);
 * // window.addEventListener('resize', handleResize);
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number, immediate = false): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null // 定时器引用

	return function (...args: Parameters<T>) {
		const context = this // 保存函数调用上下文
		const later = function () {
			timeout = null // 清除定时器引用
			if (!immediate) func.apply(context, args) // 延迟执行
		}

		const callNow = immediate && !timeout // 是否需要立即执行
		if (timeout) clearTimeout(timeout) // 清除之前的定时器
		timeout = setTimeout(later, wait) // 设置新的定时器

		if (callNow) func.apply(context, args) // 立即执行
	}
}
