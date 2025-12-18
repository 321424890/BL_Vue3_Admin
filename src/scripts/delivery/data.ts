import { ref, reactive, watch } from 'vue'
import type { QueryItem, Column, QueryConfigItem } from "@/components/BasicTable/hook/types";

// 数据文件

export function dataCrud() {
    // 送货单信息维护表头基础
    const columns = ref<Column[]>([
        { prop: 'orderNo', label: '采购订单号', width: '160px', align: 'center' },
        { prop: 'orderLineNo', label: '采购订单行号', width: '120px', align: 'center' },
        { prop: 'projectNo', label: '项目号', width: '120px', align: 'center' },
        { prop: 'projectName', label: '项目名称', width: '260px', align: 'center' },
        { prop: 'materialCode', label: '物料编码', width: '160px', align: 'center' },
        { prop: 'materialDesc', label: '物料描述', width: '180px', align: 'center' },
        { prop: 'orderQty', label: '采购订单数量', width: '140px', align: 'center' },
        { prop: 'unit', label: '单位', width: '80px', align: 'center' },
        { prop: 'measure', label: '大小量纲', width: '120px', align: 'center' },
        { prop: 'industryStandard', label: '行业标准', width: '120px', align: 'center' },
        { prop: 'buyer', label: '采购员', width: '100px', align: 'center' },
        { prop: 'inventoryLocation', label: '库存地点', width: '100px', align: 'center' },
        { prop: 'logisticsGroup', label: '后勤处理组', width: '120px', align: 'center' },
        { prop: 'physicochemTest', label: '理化检验', width: '100px', align: 'center' },
        { prop: 'workOrderNo', label: '工作交单号', width: '180px', align: 'center' },
        { prop: 'undeliveredQty', label: '采购未交付数量', width: '140px', align: 'center' },
        { prop: 'receivedQty', label: '已接收数量', width: '120px', align: 'center' },
        { prop: 'inTransitQty', label: '在途数量', width: '120px', align: 'center' },
        { prop: 'shippedQty', label: '已发运', width: '100px', align: 'center' },
        { prop: 'execNo', label: '执行编号', width: '180px', align: 'center' },
        { prop: 'isSparePart', label: '是否更换备件', width: '120px', align: 'center' },
        { prop: 'receiveOrg', label: '收货组织', width: '200px', align: 'center' },
        { prop: 'requireDate', label: '需求日期', width: '120px', align: 'center' },
        { prop: 'deliveryRecords', label: '送货记录', width: '120px', align: 'center' },
        { prop: 'buyerRemark', label: '采购方备注', width: '200px', align: 'center' }
    ])
    // 搜索条件信息
    const queryConfig = ref<QueryItem[]>([
        {
            type: 'el-select',
            prop: 'buyer',
            label: '采购员',
            props: {
                placeholder: '请选择采购员',
                clearable: true,
                filterable: true,
                options: [
                    { label: '张三', value: 'zhangsan' },
                    { label: '李四', value: 'lisi' },
                    { label: '王五', value: 'wangwu' }
                ]
            },
            value: '',
            width: '200px',
            required: false
        },
        {
            type: 'el-input',
            prop: 'orderNo',
            label: '采购订单号',
            props: {
                placeholder: '请输入采购订单号',
                clearable: true,
                maxlength: 10
            },
            value: '',
            width: '200px',
            required: false
        },
        {
            type: 'el-input',
            prop: 'materialCode',
            label: '物料编码',
            props: {
                placeholder: '请输入物料编码',
                clearable: true,
                maxlength: 18
            },
            value: '',
            width: '200px',
            required: false
        },
        {
            type: 'el-select',
            prop: 'receiveOrg',
            label: '收货组织',
            props: {
                placeholder: '请选择收货组织',
                clearable: true,
                filterable: true,
                options: [
                    { label: '组织A', value: 'orgA' },
                    { label: '组织B', value: 'orgB' },
                    { label: '组织C', value: 'orgC' }
                ]
            },
            value: '',
            width: '200px',
            required: false
        },
        {
            type: 'el-date-picker',
            prop: 'requireDate',
            label: '需求日期',
            props: {
                placeholder: '请选择需求日期',
                type: 'date',
                clearable: true,
                valueFormat: 'YYYY-MM-DD'
            },
            value: '',
            width: '200px',
            required: false
        },
        {
            type: 'el-input',
            prop: 'measure',
            label: '大小量纲',
            props: {
                placeholder: '请输入大小量纲',
                clearable: true,
                maxlength: 32
            },
            value: '',
            width: '200px',
            required: false
        },
        {
            type: 'el-input',
            prop: 'inventoryLocation',
            label: '库存地点',
            props: {
                placeholder: '请输入库存地点',
                clearable: true,
                maxlength: 4
            },
            value: '',
            width: '200px',
            required: false
        },
        {
            type: 'el-input',
            prop: 'logisticsGroup',
            label: '后勤处理组',
            props: {
                placeholder: '请输入后勤处理组',
                clearable: true,
                maxlength: 4
            },
            value: '',
            width: '200px',
            required: false
        }
    ])

    const queryConfigcreate: QueryItem[] = [
        {
            prop: 'deliveryNo',
            label: '送货单号',
            type: 'el-input',
            value: '',
            disabled: true,
            required: true,
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
            required: true,
            width: '200px',

            props: {
                placeholder: '',
                maxlength: 10,
                clearable: false
            }
        },
        {
            prop: 'status',
            label: '状态',
            type: 'el-input',
            disabled: true,
            value: '',
            required: true,
            width: '200px',

            props: {
                placeholder: '',
                maxlength: 15,
                clearable: false
            }
        },
        {
            prop: 'receiveOrg',
            label: '收货组织',
            type: 'el-input',
            disabled: true,
            value: '',
            required: true,
            width: '200px',

            props: {
                placeholder: '',
                maxlength: 4,
                clearable: false
            }
        },
        {
            prop: 'deliveryType',
            label: '送货单类型',
            type: 'el-input',
            value: '',
            required: true,
            width: '200px',
            disabled: true,
            props: {
                placeholder: '',
                maxlength: 15,
                clearable: false
            }
        },
        {
            prop: 'shipDate',
            label: '发货日期',
            type: 'el-date-picker',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请选择发货日期',
                type: 'date',
                clearable: true,
                valueFormat: 'YYYY-MM-DD',
                defaultValue: new Date()
            }
        },
        {
            prop: 'shipToLocation',
            label: '收货地点',
            type: 'el-input',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请输入收货地点',
                maxlength: 20,
                clearable: true
            }
        },
        {
            prop: 'expectedDate',
            label: '预计到货日期',
            type: 'el-date-picker',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请选择预计到货日期',
                type: 'date',
                clearable: true,
                valueFormat: 'YYYY-MM-DD'
            }
        },
        {
            prop: 'transportAssess',
            label: '运输方式',
            type: 'el-select',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请选择运输方式',
                clearable: true,
                options: [
                    { label: '汽运', value: 'truck' },
                    { label: '空运', value: 'air' },
                    { label: '铁路', value: 'rail' },
                    { label: '船运', value: 'ship' }
                ]
            }
        },
        {
            prop: 'ydTag',
            label: '是否异地交付',
            type: 'el-select',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请选择',
                clearable: true,
                options: [
                    { label: '是', value: 'Y' },
                    { label: '否', value: 'N' }
                ]
            }
        },
        {
            prop: 'selfMention',
            label: '是否运务自提',
            type: 'el-select',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请选择',
                clearable: true,
                options: [
                    { label: '是', value: 'Y' },
                    { label: '否', value: 'N' }
                ]
            }
        },
        {
            prop: 'arriveBoxNumber',
            label: '到货件数',
            type: 'el-input-number',
            value: null,
            required: true,
            width: '200px',
            props: {
                placeholder: '请输入到货件数',
                min: 0
            }
        },
        {
            prop: 'supplierContact',
            label: '供应商联系人',
            type: 'el-input',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请输入供应商联系人',
                maxlength: 20,
                clearable: true
            }
        },
        {
            prop: 'supplierContactMobile',
            label: '联系电话',
            type: 'el-input',
            value: '',
            required: true,
            width: '200px',
            props: {
                placeholder: '请输入联系电话',
                maxlength: 20,
                clearable: true
            }
        }
    ];
    // 送货单创建表头基础
    const columnscreate: Column[] = [
        { prop: 'ydjfApplyNo', label: '异地交付申请号', width: '160px', align: 'center' },
        { prop: 'ydjfApplyLineNo', label: '异地交付申请行号', width: '170px', align: 'center' },
        { prop: 'orderNo', label: '采购订单号', width: '160px', align: 'center' },
        { prop: 'orderLineNo', label: '采购订单行号', width: '120px', align: 'center' },
        { prop: 'projectNo', label: '项目号', width: '120px', align: 'center' },
        { prop: 'projectName', label: '项目名称', width: '260px', align: 'center' },
        { prop: 'materialCode', label: '物料编码', width: '160px', align: 'center' },
        { prop: 'materialDesc', label: '物料描述', width: '180px', align: 'center' },
        { prop: 'orderQty', label: '采购订单数量', width: '140px', align: 'center' },
        { prop: 'unit', label: '单位', width: '80px', align: 'center' },
        { prop: 'measure', label: '大小量纲', width: '120px', align: 'center' },
        { prop: 'industryStandard', label: '行业标准', width: '120px', align: 'center' },
        { prop: 'buyer', label: '采购员', width: '100px', align: 'center' },
        { prop: 'inventoryLocation', label: '库存地点', width: '100px', align: 'center' },
        { prop: 'logisticsGroup', label: '后勤处理组', width: '120px', align: 'center' },
        { prop: 'physicochemTest', label: '理化检验', width: '100px', align: 'center' },
        { prop: 'undeliveredQty', label: '采购未交付数量', width: '140px', align: 'center' },
        { prop: 'currentShippedQty', label: '本次发运数量', width: '120px', align: 'center' },
        { prop: 'lieTai', label: '列/台', width: '100px', align: 'center' },
        { prop: 'unitConvert', label: '单位转换', width: '120px', align: 'center' },
        { prop: 'batchNo', label: '批次号', width: '120px', align: 'center' },
        { prop: 'supplierBatch', label: '供应商批次', width: '120px', align: 'center' },
        { prop: 'batchValidDate', label: '批次有效期', width: '120px', align: 'center' },
        { prop: 'serialNo', label: '序列号', width: '120px', align: 'center' },
        { prop: 'singlePackNum', label: '单包装数', width: '120px', align: 'center' },
        { prop: 'packType', label: '包装形式', width: '120px', align: 'center' },
        { prop: 'packUnit', label: '包装单位', width: '120px', align: 'center' },
        { prop: 'rawMaterialConsume', label: '原材料消耗数', width: '140px', align: 'center' },
        { prop: 'wasteNum', label: '废品数', width: '100px', align: 'center' },
        { prop: 'wasteMaterialNum', label: '废料数', width: '100px', align: 'center' },
        { prop: 'envBatch', label: '环保批次', width: '120px', align: 'center' },
        { prop: 'outerPackWeight', label: '外包装重量', width: '120px', align: 'center' },
        { prop: 'boxNo', label: '箱号', width: '100px', align: 'center' },
        { prop: 'requireDate', label: '需求日期', width: '120px', align: 'center' },
        { prop: 'promiseDate', label: '承诺日期', width: '120px', align: 'center' },
        { prop: 'execNo', label: '执行编号', width: '180px', align: 'center' },
        { prop: 'hasSparePart', label: '是否包含备件', width: '120px', align: 'center' },
        { prop: 'sparePartInfo', label: '备件信息', width: '200px', align: 'center' },
        { prop: 'remark', label: '备注', width: '200px', align: 'center' }
    ];
    function onchangeon(val) {
        console.log('选中', val)
        // 这里写你的删除逻辑
    }

    return {
        columns,
        queryConfig,
        queryConfigcreate,
        columnscreate,
        onchangeon,
    }
}


