# ElSearchForm 动态搜索表单组件

## 1. 组件介绍

ElSearchForm 是一个基于 Element Plus 的动态搜索表单组件，支持多种表单控件类型，可通过配置快速生成搜索表单，减少重复开发工作。

### 主要特性

- ✅ 支持多种表单控件类型
- ✅ 动态配置，灵活扩展
- ✅ 自动表单验证
- ✅ 远程搜索支持
- ✅ 字段点击事件
- ✅ 展开收起功能
- ✅ 响应式设计

## 2. 组件属性

| 属性名      | 类型             | 说明                                   | 必传 | 默认值 |
| ----------- | ---------------- | -------------------------------------- | ---- | ------ |
| queryConfig | Array<QueryItem> | 搜索字段配置数组，优先级高于columns    | 否   | []     |
| columns     | Array<Column>    | 表格表头数据，用于自动生成搜索字段配置 | 否   | []     |

## 3. QueryItem 类型定义

```typescript
interface QueryItem {
  prop: string // 字段名
  label: string // 字段标签
  type: "el-input" | "el-select" | "el-date-picker" | "el-input-number" | "el-switch" // 字段类型
  value?: any // 初始值
  required?: boolean // 是否必填
  width?: string // 控件宽度
  disabled?: boolean // 是否禁用
  readonly?: boolean // 是否只读
  rules?: any[] // 验证规则
  props?: Record<string, any> // 控件额外属性
  onChange?: (val: any) => void // 字段值变化回调
  onRemoteSearch?: (query: string) => Promise<void> // 远程搜索回调（仅select类型）
}
```

### 3.1 Column 类型定义

```typescript
interface Column {
  prop: string // 字段名
  label: string // 字段标签
  type?: "el-input" | "el-select" | "el-date-picker" | "el-input-number" | "el-switch" // 搜索组件类型
  sortable?: boolean // 是否可排序
  align?: string // 对齐方式
  [key: string]: any // 其他属性
}
```

## 4. 组件事件

| 事件名       | 说明                                 | 回调参数                                                   |
| ------------ | ------------------------------------ | ---------------------------------------------------------- |
| search       | 搜索按钮点击事件，表单验证通过后触发 | params: Record<string, any> - 搜索参数对象                 |
| reset        | 重置按钮点击事件                     | formData: Record<string, any> - 重置后的表单数据           |
| field-click  | 只读字段点击事件                     | queryItem: QueryItem - 字段配置对象                        |
| field-change | 字段值变化事件                       | queryItem: QueryItem - 字段配置对象<br>val: any - 字段新值 |

## 5. 支持的控件类型

| 类型            | 说明       | 特性                     |
| --------------- | ---------- | ------------------------ |
| el-input        | 文本输入框 | 支持清空、只读、点击事件 |
| el-select       | 下拉选择器 | 支持远程搜索、清空、过滤 |
| el-date-picker  | 日期选择器 | 支持日期格式化           |
| el-input-number | 数字输入框 | 支持数字范围限制         |
| el-switch       | 开关组件   | 支持自定义文本           |

## 6. 基础用法

### 6.0 使用columns动态生成搜索字段

ElSearchForm 支持通过 `columns` 属性根据表格表头数据动态生成搜索字段配置，简化配置过程。

#### 6.0.1 基本使用

```vue
<template>
  <el-search-form :columns="columns" @search="handleSearch" @config-change="handleConfigChange" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ElSearchForm from "./index.vue"

// 表格表头数据
const columns = ref([
  { prop: "orderNo", label: "采购订单号", sortable: false, align: "center" },
  { prop: "supplierNo", label: "供应商号", sortable: false, align: "center" },
  { prop: "contractType", label: "合同类型", sortable: false, align: "center" },
  { prop: "purchaseGroup", label: "采购组", sortable: false, align: "center" },
  { prop: "currency", label: "币种", sortable: false, align: "center" }
])

const handleSearch = params => {
  console.log("搜索参数:", params)
}

const handleConfigChange = config => {
  console.log("配置变更:", config)
}
</script>
```

#### 6.0.2 动态配置搜索组件类型

通过 `columns` 中的 `type` 字段，可以动态配置搜索组件类型：

```vue
<template>
  <el-search-form :columns="columns" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ElSearchForm from "./index.vue"

const columns = ref([
  {
    prop: "orderNo",
    label: "采购订单号",
    sortable: false,
    align: "center",
    type: "el-input" // 文本输入框
  },
  {
    prop: "contractType",
    label: "合同类型",
    sortable: false,
    align: "center",
    type: "el-select" // 下拉选择器
  },
  {
    prop: "voucherDate",
    label: "凭证日期",
    sortable: false,
    align: "center",
    type: "el-date-picker" // 日期选择器
  },
  {
    prop: "amount",
    label: "金额",
    sortable: false,
    align: "center",
    type: "el-input-number" // 数字输入框
  },
  {
    prop: "status",
    label: "状态",
    sortable: false,
    align: "center",
    type: "el-switch" // 开关组件
  }
])

const handleSearch = params => {
  console.log("搜索参数:", params)
}
</script>
```

#### 6.0.3 queryConfig 与 columns 优先级

当同时提供 `queryConfig` 和 `columns` 时，**`queryConfig` 优先级更高**，会覆盖 `columns` 生成的配置：

```vue
<template>
  <el-search-form :columns="columns" :query-config="queryConfig" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ElSearchForm from "./index.vue"

const columns = ref([
  { prop: "name", label: "姓名", type: "el-input" },
  { prop: "age", label: "年龄", type: "el-input-number" },
  { prop: "gender", label: "性别", type: "el-select" }
])

// queryConfig 会覆盖 columns 生成的配置
const queryConfig = ref([
  {
    prop: "name",
    label: "姓名",
    type: "el-input",
    width: "250px", // 覆盖默认宽度
    props: {
      placeholder: "请输入姓名",
      clearable: true
    }
  }
  // 只配置了name字段，age和gender字段仍会从columns生成
])

const handleSearch = params => {
  console.log("搜索参数:", params)
}
</script>
```

### 6.1 基本搜索表单

```vue
<template>
  <el-search-form :query-config="queryConfig" @search="handleSearch" @reset="handleReset" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ElSearchForm from "./index.vue"

const queryConfig = ref([
  {
    prop: "name",
    label: "姓名",
    type: "el-input",
    width: "200px",
    props: {
      placeholder: "请输入姓名",
      clearable: true, // 可清空
      showWordLimit: false // 显示字数统计
    },
    required: false, // 是否必填
    disabled: false // 是否禁用
  },
  {
    prop: "age",
    label: "年龄",
    type: "el-input-number",
    width: "120px",
    props: {
      min: 0,
      max: 150,
      step: 1
    }
  },
  {
    prop: "gender",
    label: "性别",
    type: "el-select",
    width: "150px",
    props: {
      placeholder: "请选择性别",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" }
      ]
    }
  },
  {
    prop: "status",
    label: "状态",
    type: "el-switch",
    props: {
      activeText: "启用",
      inactiveText: "禁用"
    }
  }
])

const handleSearch = params => {
  console.log("搜索参数:", params)
  // 执行搜索逻辑，如调用API
}

const handleReset = formData => {
  console.log("重置后的表单数据:", formData)
  // 执行重置后的逻辑
}
</script>
```

### 6.2 表单验证规则

ElSearchForm 支持多种表单验证方式，满足不同场景需求：

#### 6.2.1 简单必填验证

```vue
<template>
  <el-search-form :query-config="queryConfig" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ElSearchForm from "./index.vue"

const queryConfig = ref([
  {
    prop: "keyword",
    label: "关键词",
    type: "el-input",
    width: "300px",
    props: {
      placeholder: "请输入关键词",
      clearable: true
    },
    required: true // 简单必填验证
  }
])

const handleSearch = params => {
  console.log("搜索参数:", params)
}
</script>
```

#### 6.2.2 自定义验证规则

````vue
<template>
  <el-searcs-form :query-config="queryConfig" @search={handleSearch" />
</temulate>

<script setup lang="ts">
import { ref } from "vue";
import ElSearchForm from "./indee

const queryConfig = ref([  options: [
        { label: "分类1", value: "1" },
        { lnbml类2", value: "2" },
        { la姓名l: "分类3", value: "3" },
      ],h: "20input",
    wid
    props: {
      },,输入姓名
      clearable: true,
    }
  },是否
    disabled: false, // 是否禁用
]); euleire[d:"true,bmessage:l"请输入采购信息记录号",u r}gger/ 自定义验证规则
  },

consprop:t"email",
 hadleSearch邮箱(p
    type:a"em-inpst",
    width =>250px{
    props:c{
onsol.ploc(ho"der搜索参请输入邮箱地址
    ppclearrbre: trms
;;
  }}rules:;[
blurrtr required: true,imessgg
  </</{stype:c"email",rmessage:i"请输入正确的邮箱地址"t trigger: "blur"
```#7. 高级用法

##

### 7

```vue`vue
<temalate
````

#### 6.2.3 验证规则优先级

- **自定义规则优先**：如果同时设置了 `required: true` 和 `rules` 属性，**自定义规则 `rules` 会优先执行**
- **默认规则兜底**：只有当没有提供 `rules` 但设置了 `required: true` 时，才会使用默认的必填验证规则>>
- **无规则不验证**：当既未提供自定义规则也未设置 required 时，不会添加任何验证规则

#### 6.2.4 支持的验证规则

| 规则类型  | 说明                         | 示例                                                                            |
| --------- | ---------------------------- | ------------------------------------------------------------------------------- | --- |
| required  | 是否必填                     | `{ required: true, message: '请输入内容', trigger: 'blur' }<                    |
| min       | 最小值（适用于数字和字符串） | `{ min: 6, message: '长度不能小于6个字符', trigger: 'blur' }`                   |
| max       | 最大值（适用于数字和字符串） | `{ max: 20, message: '长度不能大于20个字符', trigger: 'blur' }`                 |
| type      | 数据类型                     | `{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }`           |
| pattern   | 正则表达式                   | `{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }`  |
| validator | 自定义验证函数               | `{ validator: (rule, value, callback) => { /* 验证逻辑 */ }, trigger: 'blur' }` | o   |

e-ae
onRemoteSearch: async (query) => {
// 模拟远程API请求
queryConfig.value[0].props.loading = true;

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟API返回结果
      const mockUsers = [
        { label: `用户${query}1`, value: 1 },
        { label: `用户${query}2`, value: 2 },
        { label: `用户${query}3`, value: 3 },
        { label: `用户${query}4`, value: 4 },
        { label: `用户${query}5`, value: 5 },
      ];

      queryConfig.value[0].props.options = mockUsers;
      queryConfig.value[0].props.loading = false;
    },

},
]);

const handleSearch = (params) => {
console.log("搜索参数:", params);
};
</script>
},

},
]);

const handleSearch = (params) => {
console.log("搜索参数:", params);
};
</script>

` },
},
]);

const handleSearch = (params) => {
console.log("搜索参数:", params);
};
</script>

````

### 7.2 只读字段点击事件

```vue
<template>
  <el-search-form
    :query-config="queryConfig"
    @search="handleSearch"
    @field-click="handleFieldClick"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElSearchForm from "./index.vue";

const queryConfig = ref([
  {
    prop: "readonlyField",
    label: "只读字段",
    type: "el-input",
    value: "点击我查看详情",
    readonly: true, // 设置为只读
    width: "200px",
  },
  {
    prop: "normalField",
    label: "普通字段",
    type: "el-input",
    placeholder: "请输入内容",
    width: "200px",
  },
]);

const handleSearch = (params) => {
  console.log("搜索参数:", params);
};

const handleFieldClick = (queryItem) => {
  console.log("字段点击:", queryItem);
  // 执行点击逻辑，如打开弹窗、跳转到详情页等
  alert(`点击了只读字段：${queryItem.prop}，值为：${queryItem.value}`);
};
</script>
`};

const handleFieldClick = (queryItem) => {
  console.log("字段点击:", queryItem);
  // 执行点击逻辑，如打开弹窗、跳转到详情页等
  alert(`点击了只读字段：${queryItem.prop}，值为：${queryItem.value}`);
};
</script>
```

### 7.3 字段值变化回调

```vue
<template>
  <el-search-form
    :query-config="queryConfig"
    @search="handleSearch"
    @field-change="handleFieldChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElSearchForm from "./index.vue";

const queryConfig = ref([
  {
    prop: "keyword",
    label: "关键词",
    type: "el-input",
    placeholder: "请输入关键词",
    width: "300px",
    onChange: (val) => {
      console.log("关键词实时变化:", val);
      // 可以在这里执行实时搜索或其他逻辑
    },
  },
  {
    prop: "type",
    label: "类型",
    type: "el-select",
    placeholder: "请选择类型",
    props: {
      options: [
        { label: "类型1", value: "1" },
        { label: "类型2", value: "2" },
        { label: "类型3", value: "3" },
      ],
    },
    onChange: (val) => {
      console.log("类型变化:", val);
      // 可以根据类型变化动态调整其他字段
    },
  },
]);

const handleSearch = (params) => {
  console.log("搜索参数:", params);
};

const handleFieldChange = (queryItem, val) => {
  console.log("字段变化事件:", queryItem.prop, val);
};
</script>
```

### 7.4 日期选择器

```vue
<template>
  <el-search-form :query-config="queryConfig" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElSearchForm from "./index.vue";

const queryConfig = ref([
  {
    prop: "startDate",
    label: "开始日期",
    type: "el-date-picker",
    placeholder: "请选择开始日期",
    width: "200px",
    props: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
    },
  },
  {
    prop: "endDate",
    label: "结束日期",
    type: "el-date-picker",
    placeholder: "请选择结束日期",
    width: "200px",
    props: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
    },
  },
]);

const handleSearch = (params) => {
  console.log("搜索参数:", params);
  // params.startDate 和 params.endDate 将是格式化后的日期字符串
};
</script>
```

### 7.5 数字输入框

```vue
<template>
  <el-search-form :query-config="queryConfig" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElSearchForm from "./index.vue";

const queryConfig = ref([
  {
    prop: "minPrice",
    label: "最低价格",
    type: "el-input-number",
    width: "150px",
    props: {
      min: 0,
      max: 10000,
      step: 100,
      placeholder: "最低价格",
    },
  },
  {
    prop: "maxPrice",
    label: "最高价格",
    type: "el-input-number",
    width: "150px",
    props: {
      min: 0,
      max: 10000,
      step: 100,
      placeholder: "最高价格",
    },
  },
]);

const handleSearch = (params) => {
  console.log("搜索参数:", params);
};
</script>
```

## 8. 展开收起功能

当搜索字段数量超过4个时，组件会自动显示展开收起按钮，可以切换显示所有字段或只显示前4个字段。

```vue
<template>
  <el-search-form :query-config="queryConfig" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElSearchForm from "./index.vue";

// 定义6个搜索字段，超过4个会显示展开收起按钮
const queryConfig = ref([
  {
    prop: "field1",
    label: "字段1",
    type: "el-input",
    placeholder: "请输入字段1",
    width: "200px",
  },
  {
    prop: "field2",
    label: "字段2",
    type: "el-input",
    placeholder: "请输入字段2",
    width: "200px",
  },
  {
    prop: "field3",
    label: "字段3",
    type: "el-input",
    placeholder: "请输入字段3",
    width: "200px",
  },
  {
    prop: "field4",
    label: "字段4",
    type: "el-input",
    placeholder: "请输入字段4",
    width: "200px",
  },
  {
    prop: "field5",
    label: "字段5",
    type: "el-input",
    placeholder: "请输入字段5",
    width: "200px",
  },
  {
    prop: "field6",
    label: "字段6",
    type: "el-input",
    placeholder: "请输入字段6",
    width: "200px",
  },
]);

const handleSearch = (params) => {
  console.log("搜索参数:", params);
};
</script>
```

## 9. 完整示例

```vue
<template>
  <div class="container">
    <h3>ElSearchForm 完整示例</h3>
    <el-search-form
      :query-config="queryConfig"
      @search="handleSearch"
      @reset="handleReset"
      @field-click="handleFieldClick"
      @field-change="handleFieldChange"
    />

    <div class="result">
      <h4>搜索结果</h4>
      <pre>{{ searchResult }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElSearchForm from "./index.vue";

const searchResult = ref({});

const queryConfig = ref([
  {
    prop: "name",
    label: "姓名",
    type: "el-input",
    placeholder: "请输入姓名",
    width: "200px",
  },
  {
    prop: "gender",
    label: "性别",
    type: "el-select",
    placeholder: "请选择性别",
    props: {
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
  },
  {
    prop: "age",
    label: "年龄",
    type: "el-input-number",
    width: "120px",
    props: {
      min: 0,
      max: 150,
    },
  },
  {
    prop: "birthDate",
    label: "出生日期",
    type: "el-date-picker",
    placeholder: "请选择出生日期",
    width: "200px",
    props: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
    },
  },
  {
    prop: "status",
    label: "状态",
    type: "el-select",
    placeholder: "请选择状态",
    props: {
      options: [
        { label: "启用", value: "active" },
        { label: "禁用", value: "inactive" },
        { label: "审核中", value: "pending" },
      ],
    },
  },
  {
    prop: "isVIP",
    label: "是否VIP",
    type: "el-switch",
    props: {
      activeText: "是",
      inactiveText: "否",
    },
  },
  {
    prop: "readonlyField",
    label: "只读字段",
    type: "el-input",
    value: "点击查看详情",
    readonly: true,
    width: "200px",
  },
]);

const handleSearch = (params) => {
  console.log("搜索参数:", params);
  searchResult.value = params;
};

const handleReset = (formData) => {
  console.log("重置后的表单数据:", formData);
  searchResult.value = {};
};

const handleFieldClick = (queryItem) => {
  console.log("字段点击:", queryItem);
  alert(`点击了只读字段：${queryItem.prop}`);
};

const handleFieldChange = (queryItem, val) => {
  console.log("字段变化:", queryItem.prop, val);
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.result {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.result pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
```

## 10. 注意事项

1. **字段类型必须正确**：`type` 属性必须是支持的类型之一
2. **prop 必须唯一**：每个字段的 `prop` 属性必须唯一
3. **远程搜索注意事项**：
   - 远程搜索仅支持 `el-select` 类型
   - 需在 `onRemote
Search` 回调中管理 `loading` 状态
   - 需确保 `props.options` 是响应式的
4. **表单验证**：
   - 必填字段需设置 `required: true`
   - 可通过 `rules` 属性自定义验证规则
5. **展开收起功能**：
   - 当字段数量超过4个时自动显示展开收起按钮
   - 可通过修改组件源码调整显示数量阈值
6. **样式定制**：
   - 可通过 `width` 属性调整控件宽度
   - 可通过修改组件CSS样式定制整体外观

## 11. 浏览器兼容性

- ✅ Chrome (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ Edge (最新版本)

## 12. 更新日志

### v1.0.0
- 初始版本发布
- 支持多种表单控件类型
- 支持远程搜索
- 支持展开收起功能
- 支持表单验证

## 13. 贡献指南

如果您发现组件存在问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 10. 动态配置搜索参数

ElSearchForm 支持动态配置搜索字段，用户可以根据需要选择想要显示的搜索条件，提高表单的灵活性和易用性。

### 10.1 功能介绍

- 🎯 **可视化配置**：通过弹窗面板可视化配置显示字段
- 🔧 **灵活选择**：可以自由选择要显示或隐藏的搜索字段
- 💾 **配置保存**：支持配置保存和恢复
- 🎨 **响应式设计**：配置变更后表单自动刷新

### 10.2 使用方法

#### 10.2.1 基本使用

动态配置功能默认启用，只需点击表单右侧的「配置」按钮即可打开配置面板：

```vue
<template>
  <el-search-form
    :query-config="queryConfig"
    @search="handleSearch"
    @config-change="handleConfigChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ElSearchForm from './index.vue';

const queryConfig = ref([
  { prop: 'name', label: '姓名', type: 'el-input', ... },
  { prop: 'age', label: '年龄', type: 'el-input-number', ... },
  { prop: 'gender', label: '性别', type: 'el-select', ... },
  // 更多字段...
]);

const handleSearch = (params) => {
  console.log('搜索参数:', params);
};

const handleConfigChange = (config) => {
  console.log('配置变更:', config);
  // 可以保存配置到本地存储或服务器
  // localStorage.setItem('searchConfig', JSON.stringify(config));
};
</script>
```

#### 10.2.2 配置变更事件

组件提供了 `config-change` 事件，当用户保存配置时会触发，可以用来保存配置：

```javascript
// 事件参数格式
{
  visibleFields: ['name', 'age', 'gender'] // 可见字段列表
}
```

#### 10.2.3 初始化配置

如果需要从外部初始化可见字段，可以通过组件的 `v-model` 或 `props` 传递：

```vue
<template>
  <el-search-form
    :query-config="queryConfig"
    :visible-fields="visibleFields"
    @search="handleSearch"
    @config-change="updateVisibleFields"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ElSearchForm from './index.vue';

const visibleFields = ref<string[]>([]);

// 从本地存储恢复配置
onMounted(() => {
  const savedConfig = localStorage.getItem('searchConfig');
  if (savedConfig) {
    const config = JSON.parse(savedConfig);
    visibleFields.value = config.visibleFields;
  }
});

const updateVisibleFields = (config) => {
  visibleFields.value = config.visibleFields;
  localStorage.setItem('searchConfig', JSON.stringify(config));
};
</script>
```

### 10.3 配置面板说明

1. **字段列表**：显示所有可用的搜索字段
2. **复选框**：选择要显示的字段
3. **保存按钮**：保存配置并关闭面板
4. **取消按钮**：取消配置并关闭面板

### 10.4 注意事项

1. **默认行为**：如果没有配置可见字段，默认显示所有字段
2. **展开收起**：展开收起功能会考虑配置的可见字段
3. **配置保存**：组件不会自动保存配置，需要通过 `config-change` 事件自行处理
4. **动态更新**：当 `queryConfig` 变更时，配置会自动适应新的字段列表

## 11. 许可证

MIT License

---

**ElSearchForm 动态搜索表单组件** - 让搜索表单开发更简单、更高效！
````
