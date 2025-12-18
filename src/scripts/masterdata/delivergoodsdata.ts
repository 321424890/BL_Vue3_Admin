import { ref, reactive, watch } from 'vue'
import type { QueryItem, Column, QueryConfigItem } from '@/components/BasicTable/hook/types'

// 数据文件

export function dataCrud() {
	// 采购信息记录表格基础
	const columns = ref<Column[]>([
		{ prop: 'orderNo', label: '采购订单号', sortable: false, align: 'center' },
		{ prop: 'supplierNo', label: '供应商号', sortable: false, align: 'center' },
		{ prop: 'contractType', label: '合同类型', sortable: false, align: 'center' },
		{ prop: 'purchaseGroup', label: '采购组', sortable: false, align: 'center' },
		{ prop: 'currency', label: '币种', sortable: false, align: 'center' },
		{ prop: 'purchaseOrg', label: '采购组织', sortable: false, align: 'center' },
		{ prop: 'creator', label: '创建人', sortable: false, align: 'center' },
		{ prop: 'voucherDate', label: '凭证日期', sortable: false, align: 'center' },
		{ prop: 'contractName', label: '合同名称', sortable: false, align: 'center' }
	])
	const columns1 = ref<Column[]>([
		{ prop: 'orderNo', label: '采购订单号1', sortable: false, align: 'center' },
		{ prop: 'supplierNo', label: '供应商号1', sortable: false, align: 'center' },
		{ prop: 'contractType', label: '合同类型1', sortable: false, align: 'center' },
		{ prop: 'purchaseGroup', label: '采购组1', sortable: false, align: 'center' },
		{ prop: 'currency', label: '币种1', sortable: false, align: 'center' },
		{ prop: 'purchaseOrg', label: '采购组织1', sortable: false, align: 'center' },
		{ prop: 'creator', label: '创建人1', sortable: false, align: 'center' },
		{ prop: 'voucherDate', label: '凭证日期1', sortable: false, align: 'center' },
		{ prop: 'contractName', label: '合同名称1', sortable: false, align: 'center' }
	])
	// 采购信息记录搜索条件信息
	const queryConfig = ref<QueryItem[]>([
		{
			type: 'el-select',
			prop: 'color111',
			label: '颜色',
			props: {
				placeholder: '请选择颜色',
				options: []
			}
		},
		{
			type: 'el-input', //类型
			prop: 'name', //字段名
			label: '采购信息记录号', //显示文字
			props: {
				placeholder: '请输入采购信息记录号',
				clearable: true, // 可清空
				// maxlength: 20, // 最大长度
				showWordLimit: true // 显示字数统计
			},
			value: '', //默认值
			width: '220px',
			required: false, // 是否必填
			disabled: false, // 是否禁用
			rules: [{ required: true, message: '请输入采购信息记录号', trigger: 'blur' }] // 验证规则
		},
		{
			type: 'el-input', //类型
			prop: 'name1', //字段名
			label: '物料编码', //显示文字
			props: {
				placeholder: '请输入物料编码',
				clearable: true, // 可清空
				// maxlength: 20, // 最大长度
				showWordLimit: true // 显示字数统计
			},
			value: '', //默认值
			width: '200px',
			required: false, // 是否必填
			disabled: false, // 是否禁用
			rules: [{ required: true, message: '请输入物料编码', trigger: 'blur' }] // 验证规则
		},
		{
			type: 'el-input', //类型
			prop: 'name2', //字段名
			label: '供应商编码', //显示文字
			props: {
				placeholder: '请输入供应商编码',
				clearable: true, // 可清空
				// maxlength: 20, // 最大长度
				showWordLimit: true // 显示字数统计
			},
			value: '', //默认值
			width: '200px',
			required: false, // 是否必填
			disabled: false, // 是否禁用
			rules: [{ required: true, message: '请输入供应商编码', trigger: 'blur' }] // 验证规则
		}
	])
	const queryConfig1 = ref<QueryItem[]>([
		{
			type: 'el-select',
			prop: 'color111',
			label: '颜色',
			props: {
				placeholder: '请选择颜色',
				options: []
			}
		},
		{
			type: 'el-input', //类型
			prop: 'name', //字段名
			label: '采购信息记录号', //显示文字
			props: {
				placeholder: '请输入采购信息记录号',
				clearable: true, // 可清空
				// maxlength: 20, // 最大长度
				showWordLimit: true // 显示字数统计
			},
			value: '', //默认值
			width: '220px',
			readonly:true,
			required: false, // 是否必填
			disabled: false, // 是否禁用
			rules: [{ required: true, message: '请输入采购信息记录号', trigger: 'blur' }] // 验证规则
		},
		
	])
	const queryContract = ref<QueryItem[]>([
		{
			type: 'el-input',
			prop: 'orderNo',
			label: '采购订单号',
			props: {
				placeholder: '请输入采购订单号',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入采购订单号', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'supplierNo',
			label: '供应商号',
			props: {
				placeholder: '请输入供应商号',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入供应商号', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'contractType',
			label: '合同类型',
			props: {
				placeholder: '请输入合同类型',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入合同类型', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'purchaseGroup',
			label: '采购组',
			props: {
				placeholder: '请输入采购组',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入采购组', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'currency',
			label: '币种',
			props: {
				placeholder: '请输入币种',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入币种', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'purchaseOrg',
			label: '采购组织',
			props: {
				placeholder: '请输入采购组织',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入采购组织', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'creator',
			label: '创建人',
			props: {
				placeholder: '请输入创建人',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入创建人', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'voucherDate',
			label: '凭证日期',
			props: {
				placeholder: '请输入凭证日期',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入凭证日期', trigger: 'blur' }]
		},
		{
			type: 'el-input',
			prop: 'contractName',
			label: '合同名称',
			props: {
				placeholder: '请输入合同名称',
				clearable: true,
				showWordLimit: true
			},
			value: '',
			width: '220px',
			required: false,
			disabled: false,
			rules: [{ required: false, message: '请输入合同名称', trigger: 'blur' }]
		}
		// 在表单配置中使用
		// {
		// 	prop: 'images',
		// 	label: '产品图片',
		// 	type: 'el-upload-image',
		// 	props: {
		// 		limit: 9,
		// 		maxSize: 5, // MB
		// 		tip: '支持 JPG、PNG 格式，单张不超过 5MB'
		// 	}
		// },

		// {
		// 	prop: 'attachments',
		// 	label: '相关附件',
		// 	type: 'el-upload-file',
		// 	props: {
		// 		limit: 10,
		// 		accept: '.pdf,.doc,.docx',
		// 		maxSize: 10,
		// 		drag: true, // 启用拖拽
		// 		tip: '支持 PDF、Word 文档，单个文件不超过 10MB'
		// 	}
		// }
	])

	// 合同管理-采购订单列表详情抬头
	const queryConfigcreate: QueryItem[] = [
		{
			prop: 'deliveryNo',
			label: '采购订单号',
			type: 'el-input',
			value: '',
			disabled: true,
			required: false,
			width: '200px',

			props: {
				placeholder: '',
				maxlength: 14,
				clearable: false
			}
		},
		{
			prop: 'supplierNo',
			label: '供应商号',
			type: 'el-input',
			disabled: true,
			value: '',
			required: false,
			width: '200px',

			props: {
				placeholder: '',
				maxlength: 10,
				clearable: false
			}
		},

		{
			prop: 'shipDate',
			label: '凭证日期',
			type: 'el-date-picker',
			value: '',
			required: false,
			disabled: true,
			width: '200px',
			props: {
				placeholder: '',
				type: 'date',
				clearable: true,
				valueFormat: 'YYYY-MM-DD',
				defaultValue: new Date()
			}
		}
	]

	function onchangeon(val: any) {
		console.log('选中', val)
		// 这里写你的删除逻辑
	}

	return {
		columns,
		queryConfig,
		queryContract,
		queryConfigcreate,
		columns1,
		queryConfig1,
		onchangeon
	}
}
