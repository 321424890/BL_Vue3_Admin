import { ElMessage } from 'element-plus'
// 不需要 import 'element-plus/es/components/message2/style/css'
export function handlemasterdataDeatils(row: any, router: any) {
	try {
		if (row.orderNo) {
			router.push({ name: 'contractdetails' })
		} else {
			ElMessage.warning('请选择采购订单号！')
		}
	} catch (e) {
		ElMessage.error('操作异常，请刷新页面重试！')
	}
}
