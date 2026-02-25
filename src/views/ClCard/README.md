# CrystalCard 组件库

基于 Element Plus 的卡片组件库，提供多种卡片类型，用于展示不同类型的数据。

## 组件列表

- `CrystalStatsCard` - 统计卡片，用于展示数字统计信息
- `CrystalProgressCard` - 进度卡片，用于展示进度信息
- `CrystalDataListCard` - 数据列表卡片，用于展示列表数据
- `CrystalTimelineListCard` - 时间线列表卡片，用于展示时间线数据
- `CrystalBarChartCard` - 柱状图卡片，用于展示柱状图数据
- `CrystalLineChartCard` - 折线图卡片，用于展示折线图数据
- `CrystalDonutChartCard` - 环形图卡片，用于展示环形图数据

## 安装

```bash
pnpm install crystalplus-ui
```

## 引入

### 全局引入

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import CrystalUI from "crystalplus-ui";
import "crystalplus-ui/dist/index.css";

const app = createApp(App);
app.use(CrystalUI);
app.mount("#app");
```

### 按需引入

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import {
  CrystalStatsCard,
  CrystalProgressCard,
  CrystalDataListCard,
  CrystalTimelineListCard,
  CrystalBarChartCard,
  CrystalLineChartCard,
  CrystalDonutChartCard,
} from "crystalplus-ui";

const app = createApp(App);
app.component("CrystalStatsCard", CrystalStatsCard);
app.component("CrystalProgressCard", CrystalProgressCard);
app.component("CrystalDataListCard", CrystalDataListCard);
app.component("CrystalTimelineListCard", CrystalTimelineListCard);
app.component("CrystalBarChartCard", CrystalBarChartCard);
app.component("CrystalLineChartCard", CrystalLineChartCard);
app.component("CrystalDonutChartCard", CrystalDonutChartCard);
app.mount("#app");
```

## 使用示例

### CrystalStatsCard 组件

```vue
<template>
  <div class="stats-card-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalStatsCard
          title="销售产品"
          count="1235"
          description="鞋子、牛仔裤、派对服装、手表"
          icon="&#xe812;"
          iconColor="#fff"
          iconBgColor="#409eff"
          showArrow
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalStatsCard
          title="活跃用户"
          count="5000"
          description="日活跃用户超过5,000+"
          icon="&#xe724;"
          iconColor="#fff"
          iconBgColor="#67c23a"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalStatsCard
          title="总收入"
          count="35000"
          description="月收入超过¥350,000+"
          icon="&#xe70e;"
          iconColor="#fff"
          iconBgColor="#e6a23c"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalStatsCard
          title="客户评价"
          count="4800"
          description="平均评分4.8/5"
          icon="&#xe82d;"
          iconColor="#fff"
          iconBgColor="#f56c6c"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { CrystalStatsCard } from "crystalplus-ui";
</script>

<style scoped>
.stats-card-demo {
  padding: 20px;
}
</style>
```

### CrystalProgressCard 组件

```vue
<template>
  <div class="progress-card-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalProgressCard
          title="完成进度"
          percentage="75"
          color="#67c23a"
          icon="&#xe812;"
          iconColor="#fff"
          iconBgColor="#67c23a"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalProgressCard
          title="项目进度"
          percentage="65"
          color="#409eff"
          icon="&#xe724;"
          iconColor="#fff"
          iconBgColor="#409eff"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalProgressCard
          title="学习进度"
          percentage="45"
          color="#f56c6c"
          icon="&#xe724;"
          iconColor="#fff"
          iconBgColor="#f56c6c"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalProgressCard
          title="任务进度"
          percentage="90"
          color="#909399"
          icon="&#xe724;"
          iconColor="#fff"
          iconBgColor="#909399"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { CrystalProgressCard } from "crystalplus-ui";
</script>

<style scoped>
.progress-card-demo {
  padding: 20px;
}
</style>
```

### CrystalDataListCard 组件

```vue
<template>
  <div class="data-list-card-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="8">
        <CrystalDataListCard
          :list="dataList"
          title="待办事项"
          subtitle="今日待处理任务"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <CrystalDataListCard
          :maxCount="4"
          :list="dataList"
          title="最近活动"
          subtitle="近期活动列表"
          :showMoreButton="true"
          @more="handleMore"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CrystalDataListCard } from "crystalplus-ui";

const dataList = ref([
  {
    title: "新加坡之行",
    status: "进行中",
    time: "5分钟",
    icon: "&#xe6f2;",
    class: "bg-primary",
  },
  {
    title: "归档数据",
    status: "进行中",
    time: "10分钟",
    icon: "&#xe806;",
    class: "bg-secondary",
  },
  {
    title: "客户会议",
    status: "待处理",
    time: "15分钟",
    icon: "&#xe6fb;",
    class: "bg-warning",
  },
  {
    title: "筛选任务团队",
    status: "进行中",
    time: "20分钟",
    icon: "&#xe813;",
    class: "bg-danger",
  },
  {
    title: "发送信封给小王",
    status: "已完成",
    time: "20分钟",
    icon: "&#xe70c;",
    class: "bg-success",
  },
]);

const handleMore = () => {
  console.log("点击了更多按钮");
};
</script>

<style scoped>
.data-list-card-demo {
  padding: 20px;
}

.bg-primary {
  background-color: #409eff;
}

.bg-secondary {
  background-color: #909399;
}

.bg-warning {
  background-color: #e6a23c;
}

.bg-danger {
  background-color: #f56c6c;
}

.bg-success {
  background-color: #67c23a;
}
</style>
```

### CrystalTimelineListCard 组件

```vue
<template>
  <div class="timeline-list-card-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <CrystalTimelineListCard
          :list="timelineData"
          title="最近交易"
          subtitle="2024年12月20日"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CrystalTimelineListCard } from "crystalplus-ui";

const timelineData = ref([
  {
    time: "上午 09:30",
    status: "rgb(73, 190, 255)",
    content: "收到 John Doe 支付的 385.90 美元",
  },
  {
    time: "上午 10:00",
    status: "rgb(54, 158, 255)",
    content: "新销售记录",
    code: "ML-3467",
  },
  {
    time: "上午 12:00",
    status: "rgb(103, 232, 207)",
    content: "向 Michael 支付了 64.95 美元",
  },
  {
    time: "下午 14:30",
    status: "rgb(255, 193, 7)",
    content: "系统维护通知",
    code: "MT-2023",
  },
  {
    time: "下午 15:45",
    status: "rgb(255, 105, 105)",
    content: "紧急订单取消提醒",
    code: "OR-9876",
  },
]);
</script>

<style scoped>
.timeline-list-card-demo {
  padding: 20px;
}
</style>
```

### CrystalBarChartCard 组件

```vue
<template>
  <div class="bar-chart-card-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalBarChartCard
          value="1235"
          label="销售产品"
          date="2024-12-20"
          :percentage="15"
          :chartData="[120, 200, 150, 80, 70, 110, 130]"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { CrystalBarChartCard } from "crystalplus-ui";
</script>

<style scoped>
.bar-chart-card-demo {
  padding: 20px;
}
</style>
```

### CrystalLineChartCard 组件

```vue
<template>
  <div class="line-chart-card-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalLineChartCard
          value="5000"
          label="活跃用户"
          date="2024-12-20"
          :percentage="25"
          :chartData="[120, 200, 150, 80, 70, 110, 130]"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { CrystalLineChartCard } from "crystalplus-ui";
</script>

<style scoped>
.line-chart-card-demo {
  padding: 20px;
}
</style>
```

### CrystalDonutChartCard 组件

```vue
<template>
  <div class="donut-chart-card-demo">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6">
        <CrystalDonutChartCard
          value="75%"
          title="完成进度"
          :percentage="75"
          :data="[75, 25]"
          :radius="['40%', '70%']"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { CrystalDonutChartCard } from "crystalplus-ui";
</script>

<style scoped>
.donut-chart-card-demo {
  padding: 20px;
}
</style>
```

## API

### CrystalStatsCard 组件

| 属性            | 类型          | 默认值    | 说明                 |
| --------------- | ------------- | --------- | -------------------- |
| title           | string        | ""        | 卡片标题             |
| count           | number string | ""        | 统计数字             |
| description     | string        | ""        | 描述信息             |
| icon            | string        | ""        | 图标，支持 HTML 实体 |
| iconColor       | string        | "#fff"    | 图标颜色             |
| iconSize        | number        | 20        | 图标大小             |
| iconBgColor     | string        | "#409eff" | 图标背景颜色         |
| iconBgRadius    | number        | 4         | 图标背景圆角         |
| textColor       | string        | "#303133" | 文本颜色             |
| backgroundColor | string        | "#fff"    | 卡片背景颜色         |
| showArrow       | boolean       | false     | 是否显示箭头         |

### CrystalProgressCard 组件

| 属性            | 类型   | 默认值    | 说明                 |
| --------------- | ------ | --------- | -------------------- |
| title           | string | 必填      | 卡片标题             |
| percentage      | number | 必填      | 进度百分比           |
| color           | string | "#409eff" | 进度条颜色           |
| icon            | string | ""        | 图标，支持 HTML 实体 |
| iconColor       | string | "#fff"    | 图标颜色             |
| iconSize        | number | 20        | 图标大小             |
| iconBgColor     | string | "#409eff" | 图标背景颜色         |
| iconBgRadius    | number | 4         | 图标背景圆角         |
| backgroundColor | string | "#fff"    | 卡片背景颜色         |

### CrystalDataListCard 组件

| 属性            | 类型    | 默认值 | 说明             |
| --------------- | ------- | ------ | ---------------- |
| title           | string  | 必填   | 卡片标题         |
| subtitle        | string  | ""     | 卡片副标题       |
| list            | Array   | 必填   | 列表数据         |
| maxCount        | number  | 5      | 最大显示数量     |
| showMoreButton  | boolean | false  | 是否显示更多按钮 |
| backgroundColor | string  | "#fff" | 卡片背景颜色     |

#### list 数据结构

```typescript
interface ListItem {
  title: string; // 列表项标题
  status?: string; // 列表项状态
  time?: string; // 列表项时间
  icon?: string; // 列表项图标，支持 HTML 实体
  class?: string; // 列表项图标类名
}
```

#### 事件

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| more   | 点击更多按钮时触发 | 无       |

### CrystalTimelineListCard 组件

| 属性            | 类型   | 默认值 | 说明         |
| --------------- | ------ | ------ | ------------ |
| title           | string | 必填   | 卡片标题     |
| subtitle        | string | ""     | 卡片副标题   |
| list            | Array  | 必填   | 时间线数据   |
| backgroundColor | string | "#fff" | 卡片背景颜色 |

#### list 数据结构

```typescript
interface TimelineItem {
  time: string; // 时间线时间
  status: string; // 时间线节点颜色
  content: string; // 时间线内容
  code?: string; // 时间线代码（可选）
}
```

### CrystalBarChartCard 组件

| 属性            | 类型          | 默认值 | 说明            |
| --------------- | ------------- | ------ | --------------- |
| value           | number string | ""     | 显示值          |
| label           | string        | ""     | 标签文本        |
| date            | string        | ""     | 日期文本        |
| percentage      | number        | 0      | 百分比值        |
| height          | number        | 10     | 卡片高度（rem） |
| isMiniChart     | boolean       | false  | 是否为迷你图表  |
| barWidth        | string number | "40%"  | 柱状图宽度      |
| chartData       | number[]      | []     | 图表数据        |
| backgroundColor | string        | "#fff" | 卡片背景颜色    |

### CrystalLineChartCard 组件

| 属性            | 类型          | 默认值 | 说明            |
| --------------- | ------------- | ------ | --------------- |
| value           | number string | ""     | 显示值          |
| label           | string        | ""     | 标签文本        |
| date            | string        | ""     | 日期文本        |
| percentage      | number        | 0      | 百分比值        |
| height          | number        | 10     | 卡片高度（rem） |
| isMiniChart     | boolean       | false  | 是否为迷你图表  |
| chartData       | number[]      | []     | 图表数据        |
| backgroundColor | string        | "#fff" | 卡片背景颜色    |

### CrystalDonutChartCard 组件

| 属性            | 类型          | 默认值         | 说明            |
| --------------- | ------------- | -------------- | --------------- |
| title           | string        | ""             | 卡片标题        |
| value           | number string | ""             | 显示值          |
| percentage      | number        | 0              | 百分比值        |
| percentageLabel | string        | ""             | 百分比标签      |
| height          | number        | 10             | 卡片高度（rem） |
| currentValue    | string        | ""             | 当前值文本      |
| previousValue   | string        | ""             | 之前值文本      |
| data            | number[]      | [50, 50]       | 图表数据        |
| radius          | string[]      | ["40%", "70%"] | 环形图半径范围  |
| backgroundColor | string        | "#fff"         | 卡片背景颜色    |

## 样式定制

可以通过 CSS 变量和覆盖样式来定制卡片组件的外观。

### 示例

```css
/* 定制 CrystalStatsCard 组件 */
:deep(.stats-card) {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 定制 CrystalProgressCard 组件 */
:deep(.progress-card) {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 定制 CrystalDataListCard 组件 */
:deep(.data-list-card) {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 定制 CrystalTimelineListCard 组件 */
:deep(.timeline-list-card) {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 定制 CrystalBarChartCard 组件 */
:deep(.chart-card) {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 定制 CrystalLineChartCard 组件 */
:deep(.chart-card) {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 定制 CrystalDonutChartCard 组件 */
:deep(.chart-card) {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
```
