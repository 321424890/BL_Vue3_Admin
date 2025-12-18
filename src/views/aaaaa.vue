<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">BLInputTag 组件</h1>
        <p class="page-description">基于 Element Plus ElInputTag 封装的增强型标签输入组件，支持所有 ElInputTag 属性和扩展功能</p>
      </div>
    </div>

    <div class="input-container">
      <div class="input-group">
        <h4>基本用法</h4>
        <BLInputTag v-model="tags1" placeholder="请输入标签" />
      </div>

      <div class="input-group">
        <h4>禁用状态</h4>
        <BLInputTag v-model="tags2" placeholder="请输入标签" disabled />
      </div>

      <div class="input-group">
        <h4>只读状态</h4>
        <BLInputTag v-model="tags3" placeholder="请输入标签" readonly />
      </div>

      <div class="input-group">
        <h4>可清空</h4>
        <BLInputTag v-model="tags4" placeholder="请输入标签" clearable />
      </div>

      <div class="input-group">
        <h4>限制标签数量</h4>
        <BLInputTag v-model="tags5" placeholder="最多3个标签" :max-tags="3" @tag-limit-exceed="handleTagLimitExceed" />
      </div>

      <div class="input-group">
        <h4>自定义验证</h4>
        <BLInputTag v-model="tags6" placeholder="标签长度至少2个字符" :tag-validator="validateTag" />
      </div>

      <div class="input-group">
        <h4>不同尺寸</h4>
        <BLInputTag v-model="tags7" placeholder="小尺寸" size="small" style="margin-right: 20px" />
        <BLInputTag v-model="tags8" placeholder="默认尺寸" size="default" style="margin-right: 20px" />
        <BLInputTag v-model="tags9" placeholder="大尺寸" size="large" />
      </div>

      <div class="input-group">
        <h4>绑定所有事件</h4>
        <BLInputTag
          v-model="tags10"
          placeholder="绑定所有事件"
          @input="handleAllEvents('input', $event)"
          @change="handleAllEvents('change', $event)"
          @focus="handleAllEvents('focus', $event)"
          @blur="handleAllEvents('blur', $event)"
          @clear="handleAllEvents('clear', $event)"
          @remove-tag="handleAllEvents('remove-tag', $event)"
          @close="handleAllEvents('close', $event)"
          @tag-limit-exceed="handleAllEvents('tag-limit-exceed', $event)"
        />
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h3>BLInputTag 组件文档</h3>

      <div class="doc-section">
        <h4>支持的属性</h4>
        <p>BLInputTag 组件支持 Element Plus ElInputTag 的所有属性：</p>
        <BasicTable
          :table-data="propsTableData"
          :columns="propsColumns"
          basic-height="400px"
          :border="true"
          :stripe="true"
          :show-pagination="false"
        />
      </div>

      <div class="doc-section">
        <h4>支持的事件</h4>
        <p>BLInputTag 组件支持 Element Plus ElInputTag 的所有事件：</p>
        <BasicTable
          :table-data="eventsTableData"
          :columns="eventsColumns"
          basic-height="300px"
          :border="true"
          :stripe="true"
          :show-pagination="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BLInputTag from "@/components/BasicInput/inputTag/index.vue"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 属性表格数据
const propsTableData = ref([
  { prop: "modelValue / v-model", type: "string[]", default: "[]", description: "绑定值" },
  { prop: "placeholder", type: "string", default: "-", description: "输入框占位符" },
  { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
  { prop: "readonly", type: "boolean", default: "false", description: "是否只读" },
  { prop: "clearable", type: "boolean", default: "false", description: "是否可清空" },
  { prop: "size", type: "string", default: "default", description: "尺寸，可选值为 large, default, small" },
  { prop: "validate-event", type: "boolean", default: "true", description: "输入时是否触发表单验证" },
  { prop: "maxTags", type: "number", default: "-", description: "限制最多可以添加的标签数量" },
  {
    prop: "tagValidator",
    type: "function",
    default: "-",
    description: "标签验证函数，返回 true 表示验证通过，返回 false 表示验证失败"
  }
])

// 属性表格列配置
const propsColumns = ref([
  { prop: "prop", label: "属性名", width: 200 },
  { prop: "type", label: "类型", width: 200 },
  { prop: "default", label: "默认值", width: 120 },
  { prop: "description", label: "说明", minWidth: 300 }
])

// 事件表格数据
const eventsTableData = ref([
  { event: "input", description: "输入时触发", params: "value: string" },
  { event: "change", description: "值改变时触发", params: "value: string[]" },
  { event: "focus", description: "获得焦点时触发", params: "event: FocusEvent" },
  { event: "blur", description: "失去焦点时触发", params: "event: FocusEvent" },
  { event: "clear", description: "点击清空按钮时触发", params: "event: FocusEvent" },
  { event: "remove-tag", description: "移除标签时触发", params: "tag: string" },
  { event: "close", description: "点击标签关闭按钮时触发", params: "event: FocusEvent" },
  { event: "tag-limit-exceed", description: "标签数量超出限制时触发", params: "value: string[]" },
  { event: "tag-validate-fail", description: "标签验证失败时触发", params: "tag: string" }
])

// 事件表格列配置
const eventsColumns = ref([
  { prop: "event", label: "事件名", width: 150 },
  { prop: "description", label: "说明", minWidth: 300 },
  { prop: "params", label: "回调参数", width: 200 }
])

// 不同类型的输入值
const tags1 = ref<string[]>([])
const tags2 = ref<string[]>(["标签1", "标签2", "标签3"])
const tags3 = ref<string[]>(["标签1", "标签2"])
const tags4 = ref<string[]>(["标签1", "标签2", "标签3"])
const tags5 = ref<string[]>([])
const tags6 = ref<string[]>([])
const tags7 = ref<string[]>([])
const tags8 = ref<string[]>([])
const tags9 = ref<string[]>([])
const tags10 = ref<string[]>([])

// 标签验证函数
const validateTag = (tag: string): boolean => {
  if (tag.length < 2) {
    console.warn("标签长度至少2个字符")
    return false
  }
  return true
}

// 处理标签数量超出限制事件
const handleTagLimitExceed = (value: string[] | undefined) => {
  console.log("标签数量超出限制:", value)
}

// 处理所有事件的函数
const handleAllEvents = (eventName: string, params: any) => {
  console.log(`事件 ${eventName} 触发了:`, params)
}
</script>

<style scoped lang="scss">
/* 你可以根据需要写样式 */
.flex-column-page-wrap {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.pageWrap {
  background-color: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 40px);
}

/* 页面标题 */
h3 {
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
}

/* 调整为每行显示两个输入组，自然排列 */
.input-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 40px 0;
  width: 100%;
  padding: 0;
}

.input-group {
  width: calc(50% - 12px); /* 调整宽度以适应更好的间距 */
  margin-bottom: 0;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.input-group:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #e6f7ff;
}

.input-group h4 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #e6f7ff;
  position: relative;
  text-align: left;
}

.input-group h4::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #1890ff;
  border-radius: 2px;
}

.input-group > .el-input {
  width: 100%;
  max-width: 350px;
}

.input-group > .el-input + .el-input {
  margin-top: 15px;
}

.el-input {
  margin-bottom: 10px;
}

/* 组件文档样式 */
.component-docs {
  margin: 40px 0;
  width: 100%;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.doc-section {
  margin-bottom: 30px;
}

.doc-section h4 {
  color: #606266;
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.doc-section p {
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.6;
}

/* BasicTable 组件样式调整 */
.doc-section :deep(.table-container) {
  margin-bottom: 20px;
}

.doc-section :deep(.el-card) {
  border: 1px solid #ebeef5;
  box-shadow: none;
  margin-bottom: 0;
}

.doc-section :deep(.el-table) {
  width: 100%;
}

.doc-section :deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa;
  color: #303133;
  font-weight: 600;
}

.doc-section :deep(.el-table__body-wrapper tr:nth-child(even)) {
  background-color: #fafafa;
}

.doc-section :deep(.el-table__body-wrapper tr:hover) {
  background-color: #f5f7fa;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .input-group {
    width: 100%;
  }

  .doc-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
