# CrystaDatePickerPane

日期选择器面板组件，基于 Element Plus 的 ElDatePicker 组件封装。

## 基本用法

```vue
<template>
  <div>
    <!-- 基本日期选择器 -->
    <crysta-date-picker-pane
      v-model="dateValue"
      type="date"
      placeholder="选择日期"
    />
    
    <!-- 日期范围选择器 -->
    <crysta-date-picker-pane
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CrystaDatePickerPane } from 'crystal-ui'

// 日期值
const dateValue = ref('')
// 日期范围
const dateRange = ref([])
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | Date / Date[] / string / string[] / number / number[] / null / undefined | - | 绑定值 |
| type | string | 'date' | 选择器类型，可选值：date/week/month/quarter/year/datetime/datetimerange/daterange/monthrange |
| format | string | 'YYYY-MM-DD' | 显示在输入框中的格式 |
| rangeSeparator | string | '-' | 范围选择器的分隔符 |
| defaultValue | Date / Date[] / string / string[] / number / number[] | - | 默认日期 |
| disabledDate | function | - | 禁用日期，返回布尔值 |
| cellClassName | string / function | - | 单元格的自定义类名 |
| teleported | boolean | true | 是否将弹出层放置于 body 内 |
| popperClass | string | - | 弹出层的自定义类名 |
| placement | string | - | 弹出层的放置位置 |
| appendToBody | boolean | true | 是否将弹出层追加到 body 元素 |
| destroyOnClose | boolean | - | 关闭时是否销毁弹出层 |
| unlinkPanels | boolean | - | 在范围选择器里取消两个日期面板之间的联动 |
| firstDayOfWeek | number | 1 | 周起始日，可选值：0 到 6 |
| pickerOptions | object | - | 当前时间日期选择器特有的选项 |
| shortcuts | object[] | - | 预设时间快捷选择 |
| size | string | - | 输入框尺寸，可选值：large/default/small |
| border | boolean | false | 是否显示边框 |
| readonly | boolean | false | 是否只读 |
| clearable | boolean | true | 是否可清空 |
| validateEvent | boolean | true | 输入时是否触发表单验证 |
| autofocus | boolean | false | 是否自动获取焦点 |
| placeholder | string | - | 非范围选择时的占位内容 |
| editable | boolean | true | 文本框是否可输入 |
| disabled | boolean | false | 是否禁用 |
| allowInput | boolean | false | 是否允许输入 |
| inputSize | string | - | 输入框尺寸，同 size |
| unlinkPickers | boolean | - | 在范围选择器里取消两个日期选择器之间的联动 |
| startPlaceholder | string | - | 范围选择时开始日期的占位内容 |
| endPlaceholder | string | - | 范围选择时结束日期的占位内容 |
| selectionMode | string | - | 选择模式，可选值：single/multiple |
| showWeekNumbers | boolean | false | 是否显示周数 |
| showBorders | boolean | false | 是否显示内边框 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 绑定值变化时触发 | 组件绑定的值 |
| change | 用户确认选定的值时触发 | 组件绑定的值 |
| blur | 当输入框失去焦点时触发 | 事件对象 |
| focus | 当输入框获得焦点时触发 | 事件对象 |
| calendar-change | 当日历所选值发生变化时触发 | 日历所选的值 |
| panel-change | 面板切换时触发 | 日期值，当前面板模式 |
| visible-change | 弹出日历和关闭日历的回调 | 布尔值，true 显示，false 隐藏 |

## 示例代码

### 自定义格式

```vue
<crysta-date-picker-pane
  v-model="dateValue"
  type="date"
  format="YYYY年MM月DD日"
  placeholder="选择日期"
/>
```

### 禁用日期

```vue
<crysta-date-picker-pane
  v-model="dateValue"
  type="date"
  :disabled-date="(time) => time.getTime() < Date.now()"
  placeholder="只能选择今天之后的日期"
/>
```

### 快捷选项

```vue
<crysta-date-picker-pane
  v-model="dateRange"
  type="daterange"
  range-separator="至"
  start-placeholder="开始日期"
  end-placeholder="结束日期"
  :shortcuts="[
    {
      text: '最近一周',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      }
    },
    {
      text: '最近一个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      }
    }
  ]"
/>
```

## 插槽

支持默认插槽，可以插入自定义内容。

```vue
<crysta-date-picker-pane
  v-model="dateValue"
  type="date"
>
  <template #reference>
    <el-button>自定义触发按钮</el-button>
  </template>
</crysta-date-picker-pane>
```