<template>
    <el-dialog
      :title="currentConfig?.title || props.title"
      v-model="props.visible"
      width="65%"
      @close="handleCancel"
      append-to-body
    >
      <div class="flex-column-page-wrap pageWrap">
        <div v-loading="loading">
          <basic-table
            :tableData="tableData"
            :columns="currentConfig?.columns || []"
            :border="true"
            :stripe="true"
            :dialog="true"
            :showPagination="true"
            :overflowhidden="false"
            :queryConfig="currentConfig?.queryConfig?.value || []"
            :queryConfigStatus="true"
            :querySize="querySize"
            :singleSelect="true"
            :total="total"
            :selectedRow="selectedRow"
            @single-select-change="handData"
            height="500"
            :searchfigs="searchfig"
      
            @search="handleSearch"
            @page-change="handlePageChange"
          >
          <template #toolRight></template>
        </basic-table>
      </div>
    </div>
    <template #footer>
      <span style="padding: 10px" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import BasicTable from "@/components/BasicTable/BasicTable.vue";
import { useRouter, useRoute } from "vue-router";
import { useCrud } from "@/hook/useTableOperations";
import { getConfig } from "./config";

const props = defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, default: "数据选择" },
  name: { type: String, default: "projectName" },
  projectCode: { type: Object, default: "" },
  bukrs: { type: Object, default: "" },
  fnumber: { type: String, default: "" },
  getList: { type: Function, default: () => {return Promise.resolve({ data: [] })}},
});
const emit = defineEmits(["update:visible", "confirm", "cancel"]);

const { query } = useRoute();
const router = useRouter();
const searchfig = ref();
const selectedRow = ref(null);
const selectedRownew = ref();
const bukrs = ref();
// 获取当前配置
const currentConfig = computed(() => {
  return getConfig(props.name);
});
function changeobj(e: any) {
  bukrs.value = e;
}

const url = {
	listApi: props.getList, // 列表接口

}

const {
	tableData,
	dialogVisible,
	loading,
	querySize,
	formData,
	drawerTitle,

	selectionData, //选中的项
	openAdd,
	openEdit,
	listData, //调用列表接口
	submitForm,
	handleDelete,
	handleSelection,
	handleSearch,
	handlePageChange
} = useCrud<any>([],url as any);
function handleCancel() {
  emit("cancel");
  emit("update:visible", false);
}
function handData(e: any) {
  selectedRownew.value = e;
}
function handleConfirm() {
  emit("confirm", selectedRownew.value);
  emit("update:visible", false);
}
defineExpose({
  changeobj,
});
onMounted(async () => {
  // bukrs.value = props.bukrs;
  console.log("props", props);
});
</script>
<style lang="css" scoped>
:deep(.el-dialog__body) {
  color: var(--el-text-color-regular);
  font-size: var(--el-dialog-content-font-size);
  padding-right: 0px !important;
}
</style>