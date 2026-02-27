<template>
  <div class="cascader-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalCascader 组件</h1>
      <p class="demo-description">
        基于 Element Plus ElCascader 组件封装的增强版级联选择器，提供更好的自定义数据结构支持、自动清空搜索内容等功能
      </p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <!-- 基础使用示例 -->
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <div class="demo-grid">
          <!-- 示例1: 基础级联选择 -->
          <div class="demo-card">
            <h4 class="card-title">默认级联选择</h4>
            <p class="card-desc">最基础的级联数据选择功能</p>
            <CrystalCascader v-model="cascadeValue1" :options="options" placeholder="请选择" style="width: 240px" />
            <div class="value-display">选择的值: {{ cascadeValue1 ? cascadeValue1.join(", ") : "未选择" }}</div>
          </div>

          <!-- 示例2: 多选模式 -->
          <div class="demo-card">
            <h4 class="card-title">多选级联</h4>
            <p class="card-desc">支持同时选择多个选项</p>
            <CrystalCascader
              v-model="cascadeValue2"
              :options="options"
              multiple
              collapse-tags
              placeholder="请选择"
              style="width: 240px"
            />
            <div class="value-display">
              选择的值: {{ cascadeValue2 ? cascadeValue2.map(v => v.join(", ")).join(" | ") : "未选择" }}
            </div>
          </div>

          <!-- 示例3: 只显示最后一级 -->
          <div class="demo-card">
            <h4 class="card-title">只显示最后一级</h4>
            <p class="card-desc">输入框中只显示选择路径的最后一级</p>
            <CrystalCascader
              v-model="cascadeValue3"
              :options="options"
              :props="{ emitPath: false }"
              placeholder="请选择"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue3 || "未选择" }}</div>
          </div>

          <!-- 示例4: 自定义分隔符 -->
          <div class="demo-card">
            <h4 class="card-title">自定义分隔符</h4>
            <p class="card-desc">自定义显示的分隔符</p>
            <CrystalCascader
              v-model="cascadeValue4"
              :options="options"
              separator=" > "
              placeholder="请选择"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue4 ? cascadeValue4.join(" > ") : "未选择" }}</div>
          </div>
        </div>
      </div>

      <!-- 增强功能示例 -->
      <div class="demo-section">
        <h3 class="section-title">增强功能</h3>
        <div class="demo-grid">
          <!-- 示例5: 自定义数据结构 -->
          <div class="demo-card">
            <h4 class="card-title">自定义数据结构</h4>
            <p class="card-desc">支持自定义字段名的数据结构</p>
            <CrystalCascader
              v-model="cascadeValue5"
              :options="customOptions"
              value="code"
              label="name"
              children="subItems"
              placeholder="使用自定义字段名"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue5 ? cascadeValue5.join(", ") : "未选择" }}</div>
          </div>

          <!-- 示例6: 自动清空搜索 -->
          <div class="demo-card">
            <h4 class="card-title">自动清空搜索</h4>
            <p class="card-desc">弹窗关闭时自动清除搜索内容</p>
            <CrystalCascader
              v-model="cascadeValue6"
              :options="options"
              filterable
              auto-clear-search
              placeholder="搜索后关闭弹窗会自动清空搜索内容"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue6 ? cascadeValue6.join(", ") : "未选择" }}</div>
          </div>

          <!-- 示例7: 多选数量限制 -->
          <div class="demo-card">
            <h4 class="card-title">多选数量限制</h4>
            <p class="card-desc">限制最多可以选择的项目数量</p>
            <CrystalCascader
              v-model="cascadeValue7"
              :options="options"
              multiple
              collapse-tags
              :multiple-limit="3"
              placeholder="最多选择3项"
              style="width: 240px"
            />
            <div class="value-display">
              选择的值: {{ cascadeValue7 ? cascadeValue7.map(v => v.join(", ")).join(" | ") : "未选择" }}
            </div>
          </div>

          <!-- 示例8: 严格模式 -->
          <div class="demo-card">
            <h4 class="card-title">父子节点严格模式</h4>
            <p class="card-desc">启用checkStrictly属性，父子节点互不关联</p>
            <CrystalCascader
              v-model="cascadeValue8"
              :options="options"
              multiple
              :props="{ checkStrictly: true }"
              placeholder="父子节点互不关联"
              style="width: 240px"
            />
            <div class="value-display">
              选择的值: {{ cascadeValue8 ? cascadeValue8.map(v => v.join(", ")).join(" | ") : "未选择" }}
            </div>
          </div>

          <!-- 示例10: 禁用选项 -->
          <div class="demo-card">
            <h4 class="card-title">禁用特定选项</h4>
            <p class="card-desc">演示如何禁用某些选项</p>
            <CrystalCascader
              v-model="cascadeValue10"
              :options="disabledOptions"
              placeholder="部分选项被禁用"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue10 ? cascadeValue10.join(", ") : "未选择" }}</div>
          </div>

          <!-- 示例11: 搜索文本高亮 -->
          <!-- <div class="demo-card">
            <h4 class="card-title">搜索文本高亮</h4>
            <p class="card-desc">搜索时自动高亮显示匹配的文本内容</p>
            <CrystalCascader
              v-model="cascadeValue11"
              :options="options"
              filterable
              :reserve-keyword="true"
              highlight-search-text
              placeholder="搜索文本将高亮显示"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue11 ? cascadeValue11.join(", ") : "未选择" }}</div>
          </div> -->

          <!-- 示例12: 自定义选项内容 -->
          <div class="demo-card">
            <h4 class="card-title">自定义选项内容</h4>
            <p class="card-desc">使用option插槽自定义选项内容</p>
            <CrystalCascader
              v-model="cascadeValue12"
              :options="optionsWithIcons"
              placeholder="自定义选项内容"
              style="width: 240px"
            >
              <template #option="{ node, data }">
                <div class="custom-option">
                  <el-tag size="small" type="info" v-if="data.isHot">热门</el-tag>
                  <span>{{ node.label }}</span>
                </div>
              </template>
            </CrystalCascader>
            <div class="value-display">选择的值: {{ cascadeValue12 ? cascadeValue12.join(", ") : "未选择" }}</div>
          </div>
        </div>
      </div>

      <!-- 主题与样式示例 -->
      <div class="demo-section">
        <h3 class="section-title">主题与样式</h3>
        <div class="demo-grid">
          <!-- 示例13: 自定义颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义颜色</h4>
            <p class="card-desc">自定义边框、背景和文本颜色</p>
            <CrystalCascader
              v-model="cascadeValue13"
              :options="options"
              background-color="#f0f9eb"
              text-color="#36cfc9"
              placeholder="自定义颜色"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue13 ? cascadeValue13.join(", ") : "未选择" }}</div>
          </div>

          <!-- 示例14: 自定义边框颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义边框颜色</h4>
            <p class="card-desc">设置组件的边框颜色</p>
            <CrystalCascader
              v-model="cascadeValue14"
              :options="options"
              border-color="red"
              placeholder="红色边框"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue14 ? cascadeValue14.join(", ") : "未选择" }}</div>
          </div>

          <!-- 示例15: 自定义文字颜色 -->
          <div class="demo-card">
            <h4 class="card-title">自定义文字颜色</h4>
            <p class="card-desc">设置输入框中文本的颜色</p>
            <CrystalCascader
              v-model="cascadeValue15"
              :options="options"
              text-color="#67c23a"
              placeholder="绿色文字"
              style="width: 240px"
            />
            <div class="value-display">选择的值: {{ cascadeValue15 ? cascadeValue15.join(", ") : "未选择" }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalCascader 组件文档</h2>

      <div class="doc-section">
        <h3>基础属性</h3>
        <BasicTable
          :table-data="basicPropsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="400px"
        />
      </div>

      <div class="doc-section">
        <h3>自定义数据结构属性</h3>
        <BasicTable
          :table-data="customPropsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="200px"
        />
      </div>

      <div class="doc-section">
        <h3>增强功能属性</h3>
        <BasicTable
          :table-data="enhancedPropsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="350px"
        />
      </div>

      <div class="doc-section">
        <h3>主题样式属性</h3>
        <BasicTable
          :table-data="stylePropsTableData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="300px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的事件</h3>
        <BasicTable
          :table-data="eventsTableData"
          :columns="eventsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="300px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的插槽</h3>
        <BasicTable
          :table-data="slotsTableData"
          :columns="slotsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="200px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { CrystalCascader } from "crystalplus-ui"

// 基础级联数据
const options = ref([
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致性" },
          { value: "fankui", label: "反馈" },
          { value: "xiaolv", label: "效率" },
          { value: "kekong", label: "可控" }
        ]
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          { value: "cexiang", label: "侧向导航" },
          { value: "dingbu", label: "顶部导航" }
        ]
      }
    ]
  },
  {
    value: "zujian",
    label: "组件",
    children: [
      {
        value: "basic",
        label: "基础组件",
        children: [
          { value: "button", label: "按钮" },
          { value: "link", label: "链接" }
        ]
      },
      {
        value: "navigation",
        label: "导航组件",
        children: [
          { value: "menu", label: "菜单" },
          { value: "tabs", label: "标签页" }
        ]
      }
    ]
  },
  {
    value: "ziyuan",
    label: "资源",
    children: [
      { value: "axure", label: "Axure Components" },
      { value: "sketch", label: "Sketch Templates" },
      { value: "jiaohu", label: "组件交互文档" }
    ]
  }
])

// 自定义结构的数据
const customOptions = ref([
  {
    code: "001",
    name: "产品类别",
    subItems: [
      { code: "00101", name: "电子产品" },
      { code: "00102", name: "生活用品" }
    ]
  },
  {
    code: "002",
    name: "服务类别",
    subItems: [
      { code: "00201", name: "在线服务" },
      { code: "00202", name: "实体服务" }
    ]
  }
])

// 包含禁用选项的数据
const disabledOptions = ref([
  {
    value: "disabled-zhinan",
    label: "指南",
    disabled: true,
    children: [
      {
        value: "disabled-yizhi",
        label: "一致性",
        children: [{ value: "disabled-detail1", label: "细节1" }]
      }
    ]
  },
  {
    value: "disabled-zujian",
    label: "组件",
    children: [
      {
        value: "disabled-button",
        label: "按钮",
        disabled: true
      },
      {
        value: "disabled-menu",
        label: "菜单",
        children: [{ value: "disabled-menu1", label: "菜单1" }]
      }
    ]
  }
])

// 带图标和热门标记的数据
const optionsWithIcons = ref([
  {
    value: "zhinan",
    label: "指南",
    isHot: true,
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致性", isHot: true },
          { value: "fankui", label: "反馈" },
          { value: "xiaolv", label: "效率" },
          { value: "kekong", label: "可控" }
        ]
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          { value: "cexiang", label: "侧向导航" },
          { value: "dingbu", label: "顶部导航" }
        ]
      }
    ]
  },
  {
    value: "zujian",
    label: "组件",
    isHot: true,
    children: [
      {
        value: "basic",
        label: "基础组件",
        children: [
          { value: "button", label: "按钮" },
          { value: "link", label: "链接" }
        ]
      }
    ]
  }
])

// 各示例的绑定值
const cascadeValue1 = ref([])
const cascadeValue2 = ref([])
const cascadeValue3 = ref("")
const cascadeValue4 = ref([])
const cascadeValue5 = ref([])
const cascadeValue6 = ref([])
const cascadeValue7 = ref([])
const cascadeValue8 = ref([])
const cascadeValue9 = ref([])
const cascadeValue10 = ref([])
const cascadeValue11 = ref([])
const cascadeValue12 = ref([])
const cascadeValue13 = ref([])
const cascadeValue14 = ref([])
const cascadeValue15 = ref([])
const cascadeValue16 = ref([])

// 属性表格配置
const propsColumns = [
  {
    prop: "prop",
    label: "属性名",
    width: 200
  },
  {
    prop: "type",
    label: "类型",
    width: 200
  },
  {
    prop: "default",
    label: "默认值",
    width: 120
  },
  {
    prop: "required",
    label: "是否必填",
    width: 100,
    align: "center"
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 300
  }
]

// 事件表格配置
const eventsColumns = [
  {
    prop: "name",
    label: "事件名",
    width: 150
  },
  {
    prop: "params",
    label: "回调参数",
    width: 200
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 插槽表格配置
const slotsColumns = [
  {
    prop: "name",
    label: "插槽名",
    width: 150
  },
  {
    prop: "params",
    label: "参数",
    width: 200
  },
  {
    prop: "description",
    label: "说明",
    minWidth: 400
  }
]

// 基础属性表格数据
const basicPropsTableData = [
  {
    prop: "v-model",
    type: "Array | string",
    default: "[]",
    required: true,
    description: "绑定值"
  },
  {
    prop: "modelValue",
    type: "Array | string",
    default: "[]",
    required: true,
    description: "绑定值的内部实现，与v-model同步"
  },
  {
    prop: "options",
    type: "Array",
    default: "[]",
    required: true,
    description: "选项数据源"
  },
  {
    prop: "size",
    type: "string",
    default: "'default'",
    required: false,
    description: "尺寸，可选值为 'large', 'default', 'small'"
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否禁用"
  },
  {
    prop: "clearable",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否可清除"
  },
  {
    prop: "showAllLevels",
    type: "boolean",
    default: "true",
    required: false,
    description: "输入框中是否显示选中值的完整路径"
  },
  {
    prop: "collapseTags",
    type: "boolean",
    default: "false",
    required: false,
    description: "多选模式下是否折叠标签"
  },
  {
    prop: "separator",
    type: "string",
    default: "'/'",
    required: false,
    description: "选项分隔符"
  },
  {
    prop: "filterable",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否可搜索"
  },
  {
    prop: "debounce",
    type: "number",
    default: "300",
    required: false,
    description: "搜索关键词输入的防抖延迟"
  },
  {
    prop: "placeholder",
    type: "string",
    default: "'请选择'",
    required: false,
    description: "占位符"
  },
  {
    prop: "checkStrictly",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否严格的遵循父子节点不互相关联"
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否多选"
  }
]

// 自定义数据结构属性表格数据
const customPropsTableData = [
  {
    prop: "value",
    type: "string",
    default: "'value'",
    required: false,
    description: "自定义值字段名"
  },
  {
    prop: "label",
    type: "string",
    default: "'label'",
    required: false,
    description: "自定义标签字段名"
  },
  {
    prop: "children",
    type: "string",
    default: "'children'",
    required: false,
    description: "自定义子节点字段名"
  }
]

// 增强功能属性表格数据
const enhancedPropsTableData = [
  {
    prop: "autoClearSearch",
    type: "boolean",
    default: "true",
    required: false,
    description: "弹窗关闭时是否自动清除搜索内容"
  },
  {
    prop: "teleport-to",
    type: "string/HTMLElement",
    default: "'body'",
    required: false,
    description: "指定弹出层挂载位置"
  },
  {
    prop: "teleported",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否使用 teleport"
  },
  {
    prop: "validateEvent",
    type: "boolean",
    default: "true",
    required: false,
    description: "输入时是否触发表单的校验"
  },
  {
    prop: "reserve-keyword",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否保留搜索关键字（新版本默认为 true）"
  },
  {
    prop: "automaticDropdown",
    type: "boolean",
    default: "false",
    required: false,
    description: "输入框聚焦时是否自动展开下拉菜单"
  },
  {
    prop: "fitInputWidth",
    type: "boolean",
    default: "false",
    required: false,
    description: "弹出层宽度是否与输入框保持一致"
  },
  {
    prop: "multipleLimit",
    type: "number/null",
    default: "null",
    required: false,
    description: "多选模式下用户最多可以选择的项目数"
  }
]

// 主题样式属性表格数据
const stylePropsTableData = [
  {
    prop: "highlightSearchText",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否高亮显示搜索文本，选中后高亮依然保持可见"
  },
  {
    prop: "borderColor",
    type: "string",
    default: "''",
    required: false,
    description: "自定义边框颜色"
  },
  {
    prop: "backgroundColor",
    type: "string",
    default: "''",
    required: false,
    description: "自定义背景颜色"
  },
  {
    prop: "textColor",
    type: "string",
    default: "''",
    required: false,
    description: "自定义文本颜色"
  },
  {
    prop: "placeholderColor",
    type: "string",
    default: "''",
    required: false,
    description: "自定义占位符颜色"
  },
  {
    prop: "theme",
    type: "string",
    default: "''",
    required: false,
    description: "主题，可选值为 'light', 'dark', 'borderless'"
  }
]

// 事件表格数据
const eventsTableData = [
  {
    name: "update:modelValue",
    params: "value: Array | string",
    description: "绑定值变化时触发"
  },
  {
    name: "change",
    params: "value: Array | string",
    description: "选中值变化时触发"
  },
  {
    name: "visible-change",
    params: "value: boolean",
    description: "下拉框出现/隐藏时触发"
  },
  {
    name: "expand-change",
    params: "value: Array, expanded: boolean",
    description: "展开/收起节点时触发"
  },
  {
    name: "remove-tag",
    params: "value: Array | string",
    description: "移除标签时触发"
  }
]

// 插槽表格数据
const slotsTableData = [
  {
    name: "default",
    params: "{ node, data }",
    description: "自定义选项模板"
  },
  {
    name: "prefix",
    params: "-",
    description: "输入框前置内容"
  },
  {
    name: "suffix",
    params: "-",
    description: "输入框后置内容"
  },
  {
    name: "option",
    params: "{ node, data }",
    description: "自定义选项内容（增强版）"
  },
  {
    name: "tags",
    params: "{ node, data }",
    description: "自定义已选标签展示"
  }
]
</script>

<style scoped>
.cascader-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.demo-header {
  margin-bottom: 30px;
  text-align: center;
}

.demo-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.demo-description {
  font-size: 16px;
  color: #666;
}

.demo-section {
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.demo-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
  transition: all 0.3s;
}

.demo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.card-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.value-display {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  word-break: break-all;
}

.custom-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.component-docs {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.component-docs h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.component-docs h3 {
  font-size: 18px;
  color: #333;
  margin: 25px 0 15px 0;
  font-weight: 500;
}

.doc-section {
  margin-bottom: 30px;
}
</style>
