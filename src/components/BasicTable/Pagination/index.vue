<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { scrollTo } from "../hook/scroll-to";
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  total: number;
  page?: number;
  limit?: number;
  pageSizes?: number[];
  pagerCount?: number;
  layout?: string;
  background?: boolean;
  autoScroll?: boolean;
  hidden?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:page", val: number): void;
  (e: "update:limit", val: number): void;
  (e: "pagination", params: { pageNum: number; pageSize: number }): void;
}>();

// 当前页
const currentPage = computed<number>({
  get() {
    return props.page ?? 1;
  },
  set(val: number) {
    emit("update:page", val);
  },
});
// 每页条数
const pageSize = computed<number>({
  get() {
    return props.limit ?? 20;
  },
  set(val: number) {
    emit("update:limit", val);
  },
});

/**
 * 页码/条数变化时触发
 */
function handleSizeChange(val: number): void {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1;
  }
  emit("pagination", { pageNum: currentPage.value, pageSize: val });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
/**
 * 页码变化时触发
 */
function handleCurrentChange(val: number): void {
  emit("pagination", { pageNum: val, pageSize: pageSize.value });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 16px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
