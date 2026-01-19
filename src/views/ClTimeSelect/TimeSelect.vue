<template>
  <div class="timeselect-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalTimeSelect 组件</h1>
      <p class="demo-description">基于 Element Plus 封装的增强型时间选择器组件，支持更多配置和优化功能</p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h3 class="section-title">基础使用</h3>
        <el-row :gutter="24">
          <!-- 示例1: 基本用法 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">基本用法</h4>
              <p class="card-desc">最基础的时间选择功能</p>
              <CrystalTimeSelect v-model="time1" />
              <div class="value-display">选择的值: {{ time1 }}</div>
            </div>
          </el-col>

          <!-- 示例2: 自定义占位符 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">自定义占位符</h4>
              <p class="card-desc">自定义时间选择器的占位文本</p>
              <CrystalTimeSelect v-model="time2" placeholder="请选择时间" />
              <div class="value-display">选择的值: {{ time2 }}</div>
            </div>
          </el-col>

          <!-- 示例3: 禁用状态 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">禁用状态</h4>
              <p class="card-desc">禁用时间选择器</p>
              <CrystalTimeSelect v-model="time3" disabled />
              <div class="value-display">选择的值: {{ time3 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">时间范围配置</h3>
        <el-row :gutter="24">
          <!-- 示例4: 自定义时间范围 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">自定义时间范围</h4>
              <p class="card-desc">设置自定义的开始时间、结束时间和步长</p>
              <CrystalTimeSelect
                v-model="time4"
                start="08:00"
                end="22:00"
                step="00:15"
                placeholder="选择时间"
              />
              <div class="value-display">选择的值: {{ time4 }}</div>
            </div>
          </el-col>

          <!-- 示例5: 短时间范围 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">短时间范围</h4>
              <p class="card-desc">仅上午时间范围</p>
              <CrystalTimeSelect
                v-model="time5"
                start="09:00"
                end="12:00"
                step="00:15"
                placeholder="上午时间"
              />
              <div class="value-display">选择的值: {{ time5 }}</div>
            </div>
          </el-col>

          <!-- 示例6: 长时间范围 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">长时间范围</h4>
              <p class="card-desc">仅下午时间范围</p>
              <CrystalTimeSelect
                v-model="time6"
                start="13:00"
                end="18:00"
                step="00:30"
                placeholder="下午时间"
              />
              <div class="value-display">选择的值: {{ time6 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">尺寸和样式</h3>
        <el-row :gutter="24">
          <!-- 示例7: 大尺寸 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">大尺寸</h4>
              <p class="card-desc">大尺寸时间选择器</p>
              <CrystalTimeSelect v-model="time7" size="large" />
              <div class="value-display">选择的值: {{ time7 }}</div>
            </div>
          </el-col>

          <!-- 示例8: 默认尺寸 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">默认尺寸</h4>
              <p class="card-desc">默认尺寸时间选择器</p>
              <CrystalTimeSelect v-model="time8" size="default" />
              <div class="value-display">选择的值: {{ time8 }}</div>
            </div>
          </el-col>

          <!-- 示例9: 小尺寸 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">小尺寸</h4>
              <p class="card-desc">小尺寸时间选择器</p>
              <CrystalTimeSelect v-model="time9" size="small" />
              <div class="value-display">选择的值: {{ time9 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">功能配置</h3>
        <el-row :gutter="24">
          <!-- 示例10: 不可清除 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">不可清除</h4>
              <p class="card-desc">不显示清除按钮</p>
              <CrystalTimeSelect v-model="time10" clearable="false" />
              <div class="value-display">选择的值: {{ time10 }}</div>
            </div>
          </el-col>

          <!-- 示例11: 不可编辑 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">不可编辑</h4>
              <p class="card-desc">文本框不可输入</p>
              <CrystalTimeSelect v-model="time11" editable="false" />
              <div class="value-display">选择的值: {{ time11 }}</div>
            </div>
          </el-col>

          <!-- 示例12: 自定义图标 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">自定义图标</h4>
              <p class="card-desc">自定义时间选择器的前缀图标</p>
              <CrystalTimeSelect v-model="time12" prefix-icon="Search"  />
              <div class="value-display">选择的值: {{ time12 }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="demo-section">
        <h3 class="section-title">下拉框配置</h3>
        <el-row :gutter="24">
          <!-- 示例13: 顶部下拉 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">顶部下拉</h4>
              <p class="card-desc">下拉菜单显示在输入框上方</p>
              <CrystalTimeSelect v-model="time13" placement="top-start" />
              <div class="value-display">选择的值: {{ time13 }}</div>
            </div>
          </el-col>

          <!-- 示例14: 适配宽度 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">适配宽度</h4>
              <p class="card-desc">下拉菜单适配输入框宽度</p>
              <CrystalTimeSelect v-model="time14" fit-input-width />
              <div class="value-display">选择的值: {{ time14 }}</div>
            </div>
          </el-col>

          <!-- 示例15: 隐藏禁用选项 -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="demo-card">
              <h4 class="card-title">隐藏禁用选项</h4>
              <p class="card-desc">隐藏禁用的时间选项</p>
              <CrystalTimeSelect v-model="time15" hide-disabled-options />
              <div class="value-display">选择的值: {{ time15 }}</div>
            </div>
          </el-col>

          <!-- 示例16: 事件监听 -->
          <el-col :xs="24" :sm="24" :md="16" :lg="16">
            <div class="demo-card">
              <h4 class="card-title">事件监听</h4>
              <p class="card-desc">监听时间选择器的各种事件</p>
              <CrystalTimeSelect
                v-model="time16"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
                @clear="handleClear"
              />
              <div class="event-log">
                <h5>事件日志：</h5>
                <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                  {{ log }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2>CrystalTimeSelect 组件文档</h2>

      <div class="doc-section">
        <h3>支持的属性</h3>
        <BasicTable
          :table-data="attributeData"
          :columns="attributeColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="600px"
        />
      </div>

      <div class="doc-section">
        <h3>支持的事件</h3>
        <BasicTable
          :table-data="eventData"
          :columns="eventColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          height="400px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { CrystalTimeSelect } from "crystal-ui"
import BasicTable from '@/components/BasicTable/BasicTable.vue'

// 时间绑定值
const time1 = ref('')
const time2 = ref('')
const time3 = ref('')
const time4 = ref('')
const time5 = ref('')
const time6 = ref('')
const time7 = ref('')
const time8 = ref('')
const time9 = ref('')
const time10 = ref('')
const time11 = ref('')
const time12 = ref('')
const time13 = ref('')
const time14 = ref('')
const time15 = ref('')
const time16 = ref('')

// 事件日志
const eventLogs = ref<string[]>([])

// 事件处理
const handleChange = (value: string) => {
  eventLogs.value.push(`change: ${value}`)
  ElMessage.success(`选择时间：${value}`)
}

const handleFocus = (event: FocusEvent) => {
  eventLogs.value.push('focus: 获得焦点')
}

const handleBlur = (event: FocusEvent) => {
  eventLogs.value.push('blur: 失去焦点')
}

const handleClear = () => {
  eventLogs.value.push('clear: 清除时间')
  ElMessage.info('清除时间')
}

// 属性表格列配置
const attributeColumns = [
  { prop: 'name', label: '属性名', width: '200' },
  { prop: 'description', label: '说明' },
  { prop: 'type', label: '类型', width: '150' },
  { prop: 'default', label: '默认值', width: '150' }
]

// 属性表格数据
const attributeData = [
  { name: 'modelValue / v-model', description: '绑定值', type: 'string', default: '—' },
  { name: 'placeholder', description: '占位符', type: 'string', default: '请选择时间' },
  { name: 'start', description: '开始时间', type: 'string', default: '09:00' },
  { name: 'end', description: '结束时间', type: 'string', default: '18:00' },
  { name: 'step', description: '间隔时间', type: 'string', default: '00:30' },
  { name: 'maxTime', description: '最大时间', type: 'string', default: '—' },
  { name: 'minTime', description: '最小时间', type: 'string', default: '—' },
  { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
  { name: 'editable', description: '文本框是否可输入', type: 'boolean', default: 'true' },
  { name: 'clearable', description: '是否显示清除按钮', type: 'boolean', default: 'true' },
  { name: 'size', description: '尺寸', type: 'enum', default: 'default' },
  { name: 'prefix-icon', description: '自定义前缀图标', type: 'string / Component', default: '—' },
  { name: 'suffix-icon', description: '自定义后缀图标', type: 'string / Component', default: '—' },
  { name: 'clear-icon', description: '自定义清除图标', type: 'string / Component', default: '—' },
  { name: 'validate-event', description: '输入时是否触发表单验证', type: 'boolean', default: 'true' },
  { name: 'popper-class', description: '自定义浮层类名', type: 'string', default: '—' },
  { name: 'teleported', description: '是否使用 teleport', type: 'boolean', default: 'true' },
  { name: 'id', description: '原生 id', type: 'string', default: '—' },
  { name: 'name', description: '原生 name', type: 'string', default: '—' },
  { name: 'readonly', description: '原生 readonly 属性', type: 'boolean', default: 'false' },
  { name: 'show-arrow', description: '是否显示下拉箭头', type: 'boolean', default: 'true' },
  { name: 'hours', description: '小时选项', type: 'array', default: '—' },
  { name: 'minutes', description: '分钟选项', type: 'array', default: '—' },
  { name: 'seconds', description: '秒选项', type: 'array', default: '—' },
  { name: 'show-trigger', description: '是否显示触发按钮', type: 'boolean', default: 'true' },
  { name: 'hide-disabled-options', description: '是否隐藏禁用的选项', type: 'boolean', default: 'false' },
  { name: 'fit-input-width', description: '下拉菜单是否适配输入框宽度', type: 'boolean', default: 'false' },
  { name: 'input-style', description: '输入框样式', type: 'object', default: '—' },
  { name: 'tag', description: '自定义标签', type: 'string', default: '—' },
  { name: 'value-key', description: '选项值的 key', type: 'string', default: 'value' },
  { name: 'placement', description: '下拉框的位置', type: 'string', default: 'bottom-start' },
  { name: 'strategy', description: '定位策略', type: 'string', default: 'absolute' },
  { name: 'fallback-strategy', description: '回退策略', type: 'string', default: 'flip' },
  { name: 'gpu-acceleration', description: '是否启用 GPU 加速', type: 'boolean', default: 'true' },
  { name: 'persistent', description: '下拉框是否保持打开状态', type: 'boolean', default: 'true' },
  { name: 'auto-complete', description: '原生 auto-complete 属性', type: 'string', default: 'off' },
  { name: 'aria-label', description: '无障碍标签', type: 'string', default: '—' },
  { name: 'tabindex', description: '原生 tabindex 属性', type: 'number', default: '—' },
  { name: 'auto-focus', description: '是否自动聚焦', type: 'boolean', default: 'false' },
  { name: 'maxlength', description: '最大输入长度', type: 'number', default: '—' },
  { name: 'minlength', description: '最小输入长度', type: 'number', default: '—' },
  { name: 'show-word-limit', description: '是否显示字数统计', type: 'boolean', default: 'false' },
  { name: 'resize', description: '文本框是否可调整大小', type: 'string', default: '—' },
  { name: 'autosize', description: '自适应内容高度', type: 'boolean / object', default: '—' },
  { name: 'autocomplete', description: '原生 autocomplete 属性', type: 'string', default: 'off' },
  { name: 'autocorrect', description: '原生 autocorrect 属性', type: 'string', default: 'off' },
  { name: 'autocapitalize', description: '原生 autocapitalize 属性', type: 'string', default: 'off' },
  { name: 'spellcheck', description: '原生 spellcheck 属性', type: 'boolean', default: 'false' },
  { name: 'enterkeyhint', description: '原生 enterkeyhint 属性', type: 'string', default: '—' },
  { name: 'inputmode', description: '原生 inputmode 属性', type: 'string', default: '—' }
]

// 事件表格列配置
const eventColumns = [
  { prop: 'name', label: '事件名', width: '200' },
  { prop: 'description', label: '说明' },
  { prop: 'parameters', label: '回调参数', width: '200' }
]

// 事件表格数据
const eventData = [
  { name: 'update:modelValue', description: '绑定值变化时触发', parameters: 'value: string' },
  { name: 'change', description: '值改变时触发', parameters: 'value: string' },
  { name: 'blur', description: '失去焦点时触发', parameters: 'event: FocusEvent' },
  { name: 'focus', description: '获得焦点时触发', parameters: 'event: FocusEvent' },
  { name: 'clear', description: '点击清除按钮时触发', parameters: '—' },
  { name: 'visible-change', description: '下拉框显示/隐藏时触发', parameters: 'visible: boolean' },
  { name: 'remove-tag', description: '移除标签时触发', parameters: 'tag: any' },
  { name: 'input', description: '输入时触发', parameters: 'value: string' },
  { name: 'keydown', description: '按下按键时触发', parameters: 'event: KeyboardEvent' },
  { name: 'keyup', description: '松开按键时触发', parameters: 'event: KeyboardEvent' },
  { name: 'keypress', description: '按键按下时触发', parameters: 'event: KeyboardEvent' },
  { name: 'paste', description: '粘贴时触发', parameters: 'event: ClipboardEvent' },
  { name: 'copy', description: '复制时触发', parameters: 'event: ClipboardEvent' },
  { name: 'cut', description: '剪切时触发', parameters: 'event: ClipboardEvent' },
  { name: 'compositionstart', description: '开始输入中文时触发', parameters: 'event: CompositionEvent' },
  { name: 'compositionupdate', description: '中文输入中触发', parameters: 'event: CompositionEvent' },
  { name: 'compositionend', description: '中文输入结束时触发', parameters: 'event: CompositionEvent' }
]
</script>

<style scoped>
.timeselect-demo-container {
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

.event-log {
  margin-top: 15px;
  padding: 12px;
  background-color: #f0f2f5;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.event-log h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.log-item {
  margin: 5px 0;
  font-size: 12px;
  color: #606266;
  line-height: 1.4;
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