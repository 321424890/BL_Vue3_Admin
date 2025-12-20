// import request from '@/utils/request'
import { AxiosPromise } from 'axios'

/**
 * 获取管理员列表
 * @data
 */
export function getAdminList(data: any): AxiosPromise {
	const orderTotal = 99
	const { page, size } = data
	let length = size
	const base = (page - 1) * size
	if (page * size > orderTotal) {
		length = orderTotal - base
	}
	const roles = [
		{
			name: '超级管理员',
			id: 0
		},
		{
			name: '管理员',
			id: 1
		},
		{
			name: '成员',
			id: 2
		}
	]
	return new Promise(resolve => {
		const res = {
			total: orderTotal,
			data: Array.from({ length: length }).map((_, _i) => {
				const i = base + _i
				return {
					id: `id_${i}`,
					google_key: Math.random() > 0.5 ? 1 : 0,
					username: `username_${i}`,
					add_time: '2020-09-09 05:20:50',
					describe: `describe_${i}`,
					status: [0, 1, 2][i % 3],
					phone: [15012341203, 18958586868, ''][i % 3],
					email: `demo${i}@com.cn`,
					// roles: [[1, 2], [0, 1, 2], [2]][i % 3],
					roles: [[roles[1], roles[2]], [roles[0], roles[1], roles[2]], [roles[2]]][i % 3]
				}
			})
		}
		setTimeout(() => {
			console.log('res', res)
			resolve(res)
		}, 1000)
	})
	// return request({
	// 	url: `/user/getlist`,
	// 	method: 'get',
	// 	params: data
	// })
}
export function queryEdit(data: any) {
	return new Promise(resolve => {
		// console.warn(data, 'data')
		setTimeout(() => {
			resolve({ data: true, code: 200 })
		}, 1000)
	})
}

/**
 * 新增接口调用
 * @param data 新增的数据对象
 */
export async function addDataApi(data: any): Promise<any> {
	try {
		const response = await fetch('/api/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		if (!response.ok) {
			throw new Error(`网络错误，状态码：${response.status}`)
		}
		const result = await response.json()
		// 模拟0.5秒延迟返回
		await new Promise(resolve => setTimeout(resolve, 500))
		return {
			code: 200,
			message: '新增成功',
			data: result
		}
	} catch (error) {
		console.error('新增接口调用失败:', error)
		throw error
	}
}

/**
 * 编辑接口调用
 * @param data 编辑的数据对象
 */
export async function editDataApi(data: any): Promise<any> {
	try {
		const response = await fetch('/api/edit', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		if (!response.ok) {
			throw new Error(`网络错误，状态码：${response.status}`)
		}
		const result = await response.json()
		// 模拟0.5秒延迟返回
		await new Promise(resolve => setTimeout(resolve, 500))
		return {
			code: 200,
			message: '编辑成功',
			data: result
		}
	} catch (error) {
		console.error('编辑接口调用失败:', error)
		throw error
	}
}

/**
 * 获取人员列表（模拟接口）
 * @returns Promise<{ total: number; data: Array<any> }>
 */
export function getUserList(params?: any): Promise<{ total: number; data: any[] }> {
	const data = [
		{
			orderNo: 'PO20240601001',
			supplierNo: 'SUP1001',
			contractType: '框架合同',
			purchaseGroup: '采购组A',
			currency: 'CNY',
			purchaseOrg: '采购组织1',
			creator: '张三',
			voucherDate: '2024-06-01',
			contractName: '办公用品采购合同',

			// 新增订单明细字段示例值
			orderLineNo: '0001',
			subject: '办公用品',
			project: '项目A',
			taxCode: 'TAX01',
			taxRate: '13%',
			materialNo: 'MAT1001',
			shortText: '笔记本',
			quantity: 100,
			unit: '个',
			netPrice: 10.5,

			glAccount: '4001',
			costCenter: 'CC1001'
		},
		{
			orderNo: 'PO20240601002',
			supplierNo: 'SUP1002',
			contractType: '采购合同',
			purchaseGroup: '采购组B',
			currency: 'USD',
			purchaseOrg: '采购组织2',
			creator: '李四',
			voucherDate: '2024-06-02',
			contractName: '电脑设备采购合同',

			orderLineNo: '0002',
			subject: '电脑设备',
			project: '项目B',
			taxCode: 'TAX02',
			taxRate: '17%',
			materialNo: 'MAT2002',
			shortText: '笔记本电脑',
			quantity: 50,
			unit: '台',
			netPrice: 5000,

			glAccount: '4002',
			costCenter: 'CC2002'
		},
		{
			orderNo: 'PO20240601003',
			supplierNo: 'SUP1003',
			contractType: '服务合同',
			purchaseGroup: '采购组C',
			currency: 'EUR',
			purchaseOrg: '采购组织3',
			creator: '王五',
			voucherDate: '2024-06-03',
			contractName: 'IT维护服务合同',

			orderLineNo: '0003',
			subject: 'IT服务',
			project: '项目C',
			taxCode: 'TAX03',
			taxRate: '0%',
			materialNo: 'MAT3003',
			shortText: '维护服务',
			quantity: 1,
			unit: '项',
			netPrice: 20000,

			glAccount: '4003',
			costCenter: 'CC3003'
		}
	]

	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				total: data.length,
				data
			})
		}, 500) // 模拟半秒延迟
	})
}
// 模拟字典数据
const dictData = {
	color: [
		{ label: '红色', value: 'red' },
		{ label: '绿色', value: 'green' },
		{ label: '蓝色', value: 'blue' }
	],
	status: [
		{ label: '启用', value: 'enabled' },
		{ label: '禁用', value: 'disabled' }
	],
	gender: [
		{ label: '男', value: 'male' },
		{ label: '女', value: 'female' },
		{ label: '未知', value: 'unknown' }
	]
}

// DictAPI 模拟接口
export function DictAPI(dictType: string): Promise<{ label: string; value: string }[]> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(dictData[dictType] || [])
		}, 300) // 模拟网络延迟300ms
	})
}
