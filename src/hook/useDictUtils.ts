import { ref, Ref } from 'vue'

import type { QueryItem } from '@/components/BasicTable/hook/types'
/**
 * 字典数据接口
 */
export interface DictData {
	dictCode: string
	dictName: string
	dictType: string
	items: any[]
	remark: string
}

/**
 * 字典注册函数 - 根据字典名称和属性名的对应关系自动赋值
 * @param dictNames 字典编码数组（如：['problem_type','roomStatus']）
 * @param propNames 属性名称数组（如：['age','houseStatus']）
 * @param queryConfig 查询配置数组
 * @returns 更新后的查询配置
 */
export function dictionaryRegistration(dictNames: string[], propNames: string[], queryConfig: QueryItem[], dictApi: any) {
	// 遍历每个字典名称和对应的属性名称

	dictNames.forEach(async (dictCode, index) => {
		const propName = propNames[index] // 获取对应的属性名

		try {
			// 获取字典数据
			const response = await dictApi(dictCode)

			const dictData = response
			console.log('dictData:', dictData)
			console.log('dictCode:', dictCode)

			if (dictData) {
				const dictItems = dictData || []
				// 将字典值放入对应的选项字段
				const targetItem = queryConfig.find((item: QueryItem) => item.prop === propName)

				if (targetItem) {
					// 确保props存在
					if (!targetItem.props) {
						targetItem.props = {}
					}

					// 转换字典数据格式为下拉框需要的格式
					const options = dictItems.map((item: any) => ({
						label: item.name || item.label || item.itemName,
						value: item.value || item.id || item.itemCode
					}))

					// 将字典选项设置到props中
					targetItem.props.options = options
					console.log(`成功为 ${propName} 设置字典选项:`, options)
				} else {
					console.log(`未找到属性名为 ${propName} 的查询项`)
				}
			} else {
				console.log(`未找到字典编码为 ${dictCode} 的字典`)
			}
		} catch (error) {
			console.log(`获取字典 ${dictCode} 失败:`, error)
		}
	})

	return queryConfig
}

/**
 * 获取接口选项
 */
async function getApiOptions(apiFunction: (params?: any) => Promise<any>, params?: any): Promise<any[]> {
	try {
		const response = await apiFunction(params)
		const data = response.data?.data || response.data || []
		return data.map((item: any) => ({
			label: item.name || item.label || item.itemName || item.title,
			value: item.value || item.id || item.itemCode || item.code
		}))
	} catch (error) {
		console.error('获取接口选项失败:', error)
		return []
	}
}

/**
 * 接口选项注册函数 - 根据接口函数和属性名的对应关系自动赋值
 * @param apiFunctions 接口函数数组
 * @param propNames 属性名称数组
 * @param queryConfig 查询配置数组
 * @param paramsArray 参数数组（可选）
 * @returns 更新后的查询配置
 */
export function apiOptionsRegistration(
	apiFunctions: ((params?: any) => Promise<any>)[],
	propNames: string[],
	queryConfig: QueryItem[],
	paramsArray?: any[]
) {
	// 遍历每个接口函数和对应的属性名称
	apiFunctions.forEach(async (apiFunction, index) => {
		const propName = propNames[index] // 获取对应的属性名
		const params = paramsArray?.[index] // 获取对应的参数

		try {
			// 获取接口选项
			const options = await getApiOptions(apiFunction, params)

			// 将接口选项放入对应的选项字段
			const targetItem = queryConfig.find((item: QueryItem) => item.prop === propName)

			if (targetItem) {
				// 确保props存在
				if (!targetItem.props) {
					targetItem.props = {}
				}

				// 将接口选项设置到props中
				targetItem.props.options = options
				console.log(`成功为 ${propName} 设置接口选项:`, options)
			} else {
				console.log(`未找到属性名为 ${propName} 的查询项`)
			}
		} catch (error) {
			console.log(`获取接口选项 ${propName} 失败:`, error)
		}
	})

	return queryConfig
}
