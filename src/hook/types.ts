// 定义弹窗表单配置项的类型
export interface FormConfigItem {
	prop: string
	label: string
	type: string
	required?: boolean
	readonly?: boolean
	props?: Record<string, any>
}

// 采购信息记录同步表格数据项的类型
export interface TableDataItem {
	recordNo: string // 采购信息记录号
	supplierCode: string // 供应商编码
	supplierName: string // 供应商名称
	factory: string // 工厂
	materialCode: string // 物料编码
	materialName: string // 物料名称
	netPriceQty: number // 净价单位的数量（订单单位）
	netPriceUnit: string // 净价单位的单位（订单单位）
	priceQty: number // 价格单位的数量（基本计量单位）
	priceUnit: string // 价格单位的单位（基本计量单位）
}

// 送货信息维护-明细表格数据项的类型
export interface TableDatadeliveryinfo {
	orderNo: string
	orderLineNo: string
	projectNo: string
	projectName: string
	materialCode: string
	materialDesc: string
	orderQty: number
	unit: string
	measure: string
	industryStandard: string
	buyer: string
	inventoryLocation: string
	logisticsGroup: string
	physicochemTest: string
	workOrderNo: string
	undeliveredQty: number
	receivedQty: number
	inTransitQty: number
	shippedQty: number
	execNo: string
	isSparePart: string
	receiveOrg: string
	requireDate: string
	deliveryRecords: string
	buyerRemark: string
}
// 送货单创建-明细表格数据项的类型
export interface ColumnsCreateRow {
	ydjfApplyNo: string
	ydjfApplyLineNo: string
	orderNo: string
	orderLineNo: string
	projectNo: string
	projectName: string
	materialCode: string
	materialDesc: string
	orderQty: number
	unit: string
	measure: string
	industryStandard: string
	buyer: string
	inventoryLocation: string
	logisticsGroup: string
	physicochemTest: string
	undeliveredQty: number
	currentShippedQty: number
	lieTai: string
	unitConvert: string
	batchNo: string
	supplierBatch: string
	batchValidDate: string
	serialNo: string
	singlePackNum: number
	packType: string
	packUnit: string
	rawMaterialConsume: number
	wasteNum: number
	wasteMaterialNum: number
	envBatch: string
	outerPackWeight: number
	boxNo: string
	requireDate: string
	promiseDate: string
	execNo: string
	hasSparePart: string
	sparePartInfo: string
	remark: string
}
// 合同管理-采购订单表格数据项的类型
export interface ContractOrderItem {
	orderNo: string // 采购订单号
	supplierNo: string // 供应商号
	contractType: string // 合同类型
	purchaseGroup: string // 采购组
	currency: string // 币种
	purchaseOrg: string // 采购组织
	creator: string // 创建人
	voucherDate: string // 凭证日期
	contractName: string // 合同名称
}

// 合同管理--采购订单列表详情表格数据项的类型
export interface ContractOrderDetailItem {
	orderLineNo: string // 订单行号
	subject: string // 科目
	project: string // 项目
	taxCode: string // 税码
	taxRate: string // 税率
	materialNo: string // 物料号
	shortText: string // 短文本
	quantity: number // 数量
	unit: string // 单位
	netPrice: number // 净价
	currency: string // 币种
	glAccount: string // 总账科目
	costCenter: string // 成本中心
	orderNo: string // 订单号
}
