import { ElMessage } from 'element-plus';
// 不需要 import 'element-plus/es/components/message2/style/css'
export function handleCreate(selectionData: any, router: any) {
  try {
    const selected = selectionData.value;
    if (Array.isArray(selected) && selected.length > 0) {
      router.push({ name: "deliveryCreate" });
    } else {
      ElMessage.warning("请至少选择一条数据数据！");
    }
  } catch (e) {
    ElMessage.error("操作异常，请刷新页面重试！");
  }
}
export function handleCreateinfo(router: any) {
  router.push({ name: "deliveryinfo" });
}


