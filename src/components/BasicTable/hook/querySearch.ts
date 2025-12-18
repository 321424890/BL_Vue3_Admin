// querySearch.ts
import { ref, computed, ComputedRef } from 'vue';

// 查询项类型定义
export interface QueryItem {
  prop: string;
  value?: string;
}

// 组件 props 类型定义
export interface QuerySearchProps {
  tableData: Record<string, any>[];
  queryConfig: QueryItem[];
}

// emit 类型
export type QuerySearchEmit = (event: string, payload: any) => void;

/**
 * 查询和重置 Hook
 * @param props 组件 props
 * @param emit 事件触发函数
 * @returns 过滤后的数据、查询和重置方法
 */

export function querySearch(props: QuerySearchProps, emit: QuerySearchEmit): {
  filteredData: ComputedRef<Record<string, any>[]>;
  handleSearch: (queryConfig: QueryItem[]) => void;
  handleReset: (queryConfig: QueryItem[]) => void;
} {
  // 过滤后的数据
  const filteredData = computed(() => {
    return props.tableData.filter(item => {
      return props.queryConfig.every(queryItem => {
        if (!queryItem.value) return true; // 没有输入则跳过该条件
        return String(item[queryItem.prop]).includes(queryItem.value!);
      });
    });
  });

  /**
   * 查询方法，触发 search 事件
   */
  const handleSearch = (queryConfig: QueryItem[]): void => {
    emit('search', queryConfig);
  };

  /**
   * 重置方法，清空所有查询条件并触发 search 事件
   */
  const handleReset = (queryConfig: QueryItem[]): void => {
    props.queryConfig.forEach(queryItem => {
      queryItem.value = '';
    });
    emit('search', queryConfig);
  };

  return {
    filteredData,
    handleSearch,
    handleReset,
  };
}
