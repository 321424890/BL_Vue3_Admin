import { TableDataItem, TableDatadeliveryinfo, ColumnsCreateRow, ContractOrderItem, ContractOrderDetailItem } from './types'

// 定义接口和类型的映射
export const apiMap = {
	procurement: {
		list: async (params: any, getList?: Function): Promise<TableDataItem[]> => {
			// if (typeof getList === 'function') {
			//   return await getList(params)
			// }
			return [
				{
					recordNo: 'PUR2024001',
					supplierCode: 'SUP001',
					supplierName: '上海钢铁贸易有限公司',
					factory: '上海工厂',
					materialCode: 'MAT001',
					materialName: '碳钢板材',
					netPriceQty: 100,
					netPriceUnit: '吨',
					priceQty: 100,
					priceUnit: '吨'
				}
			]
		}
	},
	deliveryinfo: {
		list: async (params: any): Promise<TableDatadeliveryinfo[]> => {
			return [
				{
					orderNo: '4900235668',
					orderLineNo: '10',
					projectNo: 'A-A278',
					projectName: '长春市城市轨道交通5号线一期工程通信系统设备集成项目',
					materialCode: 'M000004708041',
					materialDesc: '乘客紧急报警器',
					orderQty: 23333,
					unit: 'PC',
					measure: '0050-2900',
					industryStandard: 'EN 573-3',
					buyer: 'C78',
					inventoryLocation: '1001',
					logisticsGroup: 'C218',
					physicochemTest: '',
					workOrderNo: 'CJ3201904011A-7145',
					undeliveredQty: 1000,
					receivedQty: 20000,
					inTransitQty: 2333,
					shippedQty: 22333,
					execNo: 'A-A021-I-001-02-015',
					isSparePart: '否',
					receiveOrg: '重庆中车长客轨道车辆有限公司',
					requireDate: '2024-04-30',
					deliveryRecords: '送货单001,送货单002',
					buyerRemark: '请尽快发货'
				}
			]
		}
	},
	deliveryCreate: {
		list: async (params: any): Promise<ColumnsCreateRow[]> => {
			return [
				{
					ydjfApplyNo: 'YDJF20240601001',
					ydjfApplyLineNo: '001',
					orderNo: 'PO20240601001',
					orderLineNo: '10',
					projectNo: 'XM20240601',
					projectName: '高铁车辆采购',
					materialCode: 'MAT20240601',
					materialDesc: '高强度螺栓',
					orderQty: 1000,
					unit: '件',
					measure: '大',
					industryStandard: 'GB1234',
					buyer: '张三',
					inventoryLocation: 'A001',
					logisticsGroup: '后勤一组',
					physicochemTest: '合格',
					undeliveredQty: 500,
					currentShippedQty: 200,
					lieTai: '1列',
					unitConvert: '1:1',
					batchNo: 'BATCH20240601',
					supplierBatch: 'SUPBATCH001',
					batchValidDate: '2024-12-31',
					serialNo: 'SN20240601',
					singlePackNum: 10,
					packType: '纸箱',
					packUnit: '箱',
					rawMaterialConsume: 1200,
					wasteNum: 5,
					wasteMaterialNum: 2,
					envBatch: 'ENV20240601',
					outerPackWeight: 15.5,
					boxNo: 'BX001',
					requireDate: '2024-06-10',
					promiseDate: '2024-06-15',
					execNo: 'EXE20240601',
					hasSparePart: '否',
					sparePartInfo: '',
					remark: '紧急采购'
				}
			]
		}
	},
	contract: {
		list: async (params: any): Promise<ContractOrderItem[]> => {
			return [
				{
					orderNo: 'PO20240601001',
					supplierNo: 'SUP2024001',
					contractType: '框架合同',
					purchaseGroup: 'A01',
					currency: 'CNY',
					purchaseOrg: '采购一部',
					creator: '张三',
					voucherDate: '2024-06-01',
					contractName: '2024年度钢材采购合同'
				}
			]
		}
	},
	contractdetails: {
		list: async (params: any): Promise<ContractOrderDetailItem[]> => {
			return [
				{
					orderLineNo: '10',
					subject: '600100',
					project: 'PRJ20240601',
					taxCode: 'J1',
					taxRate: '13%',
					materialNo: 'MAT20240601',
					shortText: '高强度螺栓',
					quantity: 100,
					unit: '件',
					netPrice: 12.5,
					currency: 'CNY',
					glAccount: '500101',
					costCenter: 'CC1001',
					orderNo: 'PO20240601001'
				}
			]
		}
	}
}
