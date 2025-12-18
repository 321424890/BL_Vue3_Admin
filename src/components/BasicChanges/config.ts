import { ref } from "vue";
import type { QueryItem, Column } from "@/components/BasicTable/hook/types";

// 接口配置类型
export interface ApiConfig {
  name: string;
  title: string;
  queryConfig: any;
  columns: Column[];
  apiFunction: (params: any) => Promise<any>;
}
// 材料主数据配置
const materialConfig: ApiConfig = {
  name: "materialNames",
  title: "材料名称选择",
  queryConfig: ref<QueryItem[]>([
    {
      prop: "fname",
      label: "材料名称",
      type: "el-input",
      value: "",
      required: false,
      disabled: false,
      props: {
        placeholder: "请选择材料名称",
        readonly: false,
        maxlength: 50,
        clearable: false,
      },
      rules: [
        {
          required: true,
          message: "项材料名称为必填项",
          trigger: ["blur", "change"],
        },
      ],
    },
  ]),
  columns: [
    { prop: "fname", label: "材料名称", align: "center" },
    // { prop: 'materialNumber', label: '材料编码', align: 'center' },
    { prop: "unit", label: "单位", align: "center" },
    { prop: "ruleModel", label: "规格型号", align: "center" },
  ],
  apiFunction: (params: any) =>
    getMaterialList(params).then((res) => res.data),
};

export const configMap = new Map<string, ApiConfig>([
    ["materialNames", materialConfig],

  ]);
  export function getConfig(name: string): ApiConfig | undefined {
    return configMap.get(name);
  }
  export function addConfig(config: ApiConfig) {
    configMap.set(config.name, config);
  }
  // 获取所有配置名称
  export function getConfigNames(): string[] {
    return Array.from(configMap.keys());
  }