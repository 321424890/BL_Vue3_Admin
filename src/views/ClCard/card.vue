<template>
  <div class="card-demo-container">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1 class="demo-title">CrystalCard 组件库</h1>
      <p class="demo-description">
        基于 Element Plus
        封装的卡片组件库，提供多种卡片类型，用于展示不同类型的数据，包括统计卡片、进度卡片、数据列表卡片、时间线卡片和图表卡片
      </p>
    </div>

    <!-- 示例区域 -->
    <div class="demo-content">
      <!-- 统计卡片示例 -->
      <div class="demo-section">
        <h3 class="section-title">统计卡片 (CrystalStatsCard)</h3>
        <p class="section-desc">用于展示数字统计信息，支持文字、数字滚动和自定义样式</p>

        <!-- 统计卡片（文字） -->
        <div class="demo-subsection">
          <h4 class="subsection-title">文字统计卡片</h4>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="销售产品"
                description="鞋子、牛仔裤、派对服装、手表"
                icon="Goods"
                icon-color="#fff"
                icon-bg-color="#409eff"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="活跃用户"
                description="日活跃用户超过5,000+"
                icon="User"
                icon-color="#fff"
                icon-bg-color="#67c23a"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="总收入"
                description="月收入超过¥350,000+"
                icon="Money"
                icon-color="#fff"
                icon-bg-color="#909399"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="客户评价"
                description="平均评分4.8/5"
                icon="Star"
                icon-color="#fff"
                icon-bg-color="#f56c6c"
              />
            </el-col>
          </el-row>
        </div>

        <!-- 统计卡片（数字滚动） -->
        <div class="demo-subsection">
          <h4 class="subsection-title">数字滚动统计卡片</h4>
          <p class="subsection-desc">显示数字并带有滚动动画效果</p>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="销售产品"
                count="1,235"
                description="鞋子、牛仔裤、派对服装、手表"
                icon="Goods"
                icon-color="#fff"
                icon-bg-color="#409eff"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="活跃用户"
                count="5,000"
                description="日活跃用户超过5,000+"
                icon="User"
                icon-color="#fff"
                icon-bg-color="#67c23a"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="总收入"
                count="35,000"
                description="月收入超过¥350,000+"
                icon="Money"
                icon-color="#fff"
                icon-bg-color="#909399"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="客户评价"
                count="4,800"
                description="平均评分4.8/5"
                icon="Star"
                icon-color="#fff"
                icon-bg-color="#f56c6c"
              />
            </el-col>
          </el-row>
        </div>

        <!-- 统计卡片（自定义样式） -->
        <div class="demo-subsection">
          <h4 class="subsection-title">自定义样式统计卡片</h4>
          <p class="subsection-desc">完全自定义卡片的颜色和样式</p>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="销售产品"
                description="鞋子、牛仔裤、派对服装、手表"
                icon="Goods"
                icon-color="#409eff"
                icon-bg-color="#ecf5ff"
                text-color="#409eff"
                background-color="#f0f9ff"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="活跃用户"
                description="日活跃用户超过5,000+"
                icon="User"
                icon-color="#e6a23c"
                icon-bg-color="#fdf6ec"
                text-color="#e6a23c"
                background-color="#fefce8"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="总收入"
                description="月收入超过¥350,000+"
                icon="Money"
                icon-color="#909399"
                icon-bg-color="#f5f7fa"
                text-color="#909399"
                background-color="#fafafa"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalStatsCard
                title="客户评价"
                description="平均评分4.8/5"
                icon="Star"
                icon-color="#f56c6c"
                icon-bg-color="#fef0f0"
                text-color="#f56c6c"
                background-color="#fef2f2"
              />
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 进度卡片示例 -->
      <div class="demo-section">
        <h3 class="section-title">进度卡片 (CrystalProgressCard)</h3>
        <p class="section-desc">用于展示进度信息，支持自定义颜色和图标</p>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <CrystalProgressCard
              title="完成进度"
              percentage="75"
              color="#67c23a"
              icon="Check"
              icon-color="#fff"
              icon-bg-color="#67c23a"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <CrystalProgressCard
              title="项目进度"
              percentage="65"
              color="#409eff"
              icon="Document"
              icon-color="#fff"
              icon-bg-color="#409eff"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <CrystalProgressCard
              title="学习进度"
              percentage="45"
              color="#f56c6c"
              icon="Reading"
              icon-color="#fff"
              icon-bg-color="#f56c6c"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <CrystalProgressCard
              title="任务进度"
              percentage="90"
              color="#909399"
              icon="Ticket"
              icon-color="#fff"
              icon-bg-color="#909399"
            />
          </el-col>
        </el-row>
      </div>

      <!-- 数据列表卡片示例 -->
      <div class="demo-section">
        <h3 class="section-title">数据列表卡片 (CrystalDataListCard)</h3>
        <p class="section-desc">用于展示列表数据，支持自定义最大显示数量和更多按钮</p>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="8">
            <CrystalDataListCard :list="dataList" title="待办事项" subtitle="今日待处理任务" />
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <CrystalDataListCard
              :max-count="4"
              :list="dataList"
              title="最近活动"
              subtitle="近期活动列表"
              :show-more-button="true"
              @more="handleMore"
            />
          </el-col>
        </el-row>
      </div>

      <!-- 时间线列表卡片示例 -->
      <div class="demo-section">
        <h3 class="section-title">时间线列表卡片 (CrystalTimelineListCard)</h3>
        <p class="section-desc">用于展示时间线数据，支持自定义时间和内容</p>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :lg="8">
            <CrystalTimelineListCard :list="timelineData" title="最近交易" subtitle="2024年12月20日" />
          </el-col>
        </el-row>
      </div>

      <!-- 图表卡片示例 -->
      <div class="demo-section">
        <h3 class="section-title">图表卡片</h3>
        <p class="section-desc">用于展示图表数据，包括折线图、柱状图和环形图</p>

        <!-- 图表卡片（小图表） -->
        <div class="demo-subsection">
          <h4 class="subsection-title">小图表卡片</h4>
          <p class="subsection-desc">适合在网格布局中使用的小尺寸图表</p>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalLineChartCard
                :is-mini-chart="true"
                :value="2545"
                label="新用户"
                date="过去7天"
                :percentage="1.2"
                :height="9.5"
                :chart-data="[120, 132, 101, 134, 90, 230, 210]"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalBarChartCard
                :is-mini-chart="true"
                :value="15480"
                label="浏览量"
                date="过去 14 天"
                :percentage="-4.15"
                :height="9.5"
                :bar-width="'45%'"
                :chart-data="[120, 100, 150, 140, 90, 120, 130]"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalLineChartCard
                :is-mini-chart="true"
                :value="2545"
                label="粉丝数"
                date="过去30天"
                :percentage="1.2"
                :height="9.5"
                :show-area-color="true"
                :chart-data="[150, 180, 160, 200, 180, 220, 240]"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalDonutChartCard
                :value="36358"
                title="粉丝量"
                :percentage="18"
                percentage-label="较去年"
                :data="[50, 40]"
                :height="9.5"
                current-value="2022"
                previous-value="2021"
                :radius="['50%', '70%']"
              />
            </el-col>
          </el-row>
        </div>

        <!-- 图表卡片（大图表） -->
        <div class="demo-subsection">
          <h4 class="subsection-title">大图表卡片</h4>
          <p class="subsection-desc">尺寸较大的图表，展示更详细的数据</p>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalLineChartCard
                :value="2545"
                label="新用户"
                :percentage="1.2"
                :height="11"
                :chart-data="[120, 132, 101, 134, 90, 230, 210]"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalBarChartCard
                :value="15480"
                label="浏览量"
                :percentage="-4.15"
                :height="11"
                :chart-data="[120, 100, 150, 140, 90, 120, 130, 110]"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalLineChartCard
                :value="2545"
                label="粉丝数"
                :percentage="1.2"
                :height="11"
                :show-area-color="true"
                :chart-data="[150, 180, 160, 200, 180, 220, 240]"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <CrystalDonutChartCard
                :value="36358"
                title="粉丝量"
                :percentage="-18"
                percentage-label="较2021年"
                :data="[70, 30]"
                :height="11"
                current-value="12月"
                previous-value="11月"
              />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 组件文档 -->
    <div class="component-docs">
      <h2 class="docs-title">CrystalCard 组件文档</h2>

      <!-- 统计卡片属性 -->
      <div class="doc-section">
        <h3 class="doc-section-title">CrystalStatsCard 属性</h3>
        <BasicTable
          :table-data="statsCardPropsData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
        />
      </div>

      <!-- 进度卡片属性 -->
      <div class="doc-section">
        <h3 class="doc-section-title">CrystalProgressCard 属性</h3>
        <BasicTable
          :table-data="progressCardPropsData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="300px"
        />
      </div>

      <!-- 数据列表卡片属性 -->
      <div class="doc-section">
        <h3 class="doc-section-title">CrystalDataListCard 属性</h3>
        <BasicTable
          :table-data="dataListCardPropsData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="300px"
        />
      </div>

      <!-- 时间线列表卡片属性 -->
      <div class="doc-section">
        <h3 class="doc-section-title">CrystalTimelineListCard 属性</h3>
        <BasicTable
          :table-data="timelineCardPropsData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="300px"
        />
      </div>

      <!-- 基础表格属性 -->
      <div class="doc-section">
        <h3 class="doc-section-title">BasicTable 属性</h3>
        <BasicTable
          :table-data="basicTablePropsData"
          :columns="propsColumns"
          :border="true"
          :stripe="true"
          :show-pagination="false"
          basic-height="400px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {
  CrystalStatsCard,
  CrystalProgressCard,
  CrystalDataListCard,
  CrystalTimelineListCard,
  CrystalLineChartCard,
  CrystalBarChartCard,
  CrystalDonutChartCard
} from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

const dataList = ref([
  {
    title: "新加坡之行",
    status: "进行中",
    time: "5分钟",
    icon: "Location",
    class: "bg-primary"
  },
  {
    title: "归档数据",
    status: "进行中",
    time: "10分钟",
    icon: "Document",
    class: "bg-secondary"
  },
  {
    title: "客户会议",
    status: "待处理",
    time: "15分钟",
    icon: "ChatLineRound",
    class: "bg-warning"
  },
  {
    title: "筛选任务团队",
    status: "进行中",
    time: "20分钟",
    icon: "User",
    class: "bg-danger"
  },
  {
    title: "发送信封给小王",
    status: "已完成",
    time: "20分钟",
    icon: "Message",
    class: "bg-success"
  }
])

const timelineData = ref([
  {
    time: "上午 09:30",
    status: "rgb(73, 190, 255)",
    content: "收到 John Doe 支付的 385.90 美元"
  },
  {
    time: "上午 10:00",
    status: "rgb(54, 158, 255)",
    content: "新销售记录",
    code: "ML-3467"
  },
  {
    time: "上午 12:00",
    status: "rgb(103, 232, 207)",
    content: "向 Michael 支付了 64.95 美元"
  },
  {
    time: "下午 14:30",
    status: "rgb(255, 193, 7)",
    content: "系统维护通知",
    code: "MT-2023"
  },
  {
    time: "下午 15:45",
    status: "rgb(255, 105, 105)",
    content: "紧急订单取消提醒",
    code: "OR-9876"
  }
])

// 基础表格操作按钮配置
const tableActions = ref([
  {
    label: "编辑",
    type: "primary",
    size: "small",
    permission: true,
    click: (row: any) => {
      console.log("编辑", row)
    }
  },
  {
    label: "删除",
    type: "danger",
    size: "small",
    permission: true,
    click: (row: any) => {
      console.log("删除", row)
    }
  }
])

const handleMore = () => {
  console.log("点击了更多按钮")
}

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

// 统计卡片属性数据
const statsCardPropsData = [
  {
    prop: "title",
    type: "string",
    default: "",
    required: true,
    description: "卡片标题"
  },
  {
    prop: "count",
    type: "string | number",
    default: "",
    required: false,
    description: "统计数字"
  },
  {
    prop: "description",
    type: "string",
    default: "",
    required: false,
    description: "描述信息"
  },
  {
    prop: "icon",
    type: "string",
    default: "",
    required: false,
    description: "图标，支持 Element Plus 图标"
  },
  {
    prop: "icon-color",
    type: "string",
    default: "#fff",
    required: false,
    description: "图标颜色"
  },
  {
    prop: "icon-bg-color",
    type: "string",
    default: "#409eff",
    required: false,
    description: "图标背景颜色"
  },
  {
    prop: "text-color",
    type: "string",
    default: "#303133",
    required: false,
    description: "文本颜色"
  },
  {
    prop: "background-color",
    type: "string",
    default: "#fff",
    required: false,
    description: "卡片背景颜色"
  }
]

// 进度卡片属性数据
const progressCardPropsData = [
  {
    prop: "title",
    type: "string",
    default: "",
    required: true,
    description: "卡片标题"
  },
  {
    prop: "percentage",
    type: "number",
    default: "",
    required: true,
    description: "进度百分比"
  },
  {
    prop: "color",
    type: "string",
    default: "#409eff",
    required: false,
    description: "进度条颜色"
  },
  {
    prop: "icon",
    type: "string",
    default: "",
    required: false,
    description: "图标，支持 Element Plus 图标"
  },
  {
    prop: "icon-color",
    type: "string",
    default: "#fff",
    required: false,
    description: "图标颜色"
  },
  {
    prop: "icon-bg-color",
    type: "string",
    default: "#409eff",
    required: false,
    description: "图标背景颜色"
  }
]

// 数据列表卡片属性数据
const dataListCardPropsData = [
  {
    prop: "title",
    type: "string",
    default: "",
    required: true,
    description: "卡片标题"
  },
  {
    prop: "subtitle",
    type: "string",
    default: "",
    required: false,
    description: "卡片副标题"
  },
  {
    prop: "list",
    type: "Array",
    default: "",
    required: true,
    description: "列表数据"
  },
  {
    prop: "max-count",
    type: "number",
    default: "5",
    required: false,
    description: "最大显示数量"
  },
  {
    prop: "show-more-button",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示更多按钮"
  }
]

// 时间线列表卡片属性数据
const timelineCardPropsData = [
  {
    prop: "title",
    type: "string",
    default: "",
    required: true,
    description: "卡片标题"
  },
  {
    prop: "subtitle",
    type: "string",
    default: "",
    required: false,
    description: "卡片副标题"
  },
  {
    prop: "list",
    type: "Array",
    default: "",
    required: true,
    description: "时间线数据"
  }
]

// 基础表格属性数据
const basicTablePropsData = [
  {
    prop: "table-data",
    type: "Array",
    default: "",
    required: true,
    description: "表格数据数组"
  },
  {
    prop: "columns",
    type: "Array",
    default: "",
    required: true,
    description: "表格列配置"
  },
  {
    prop: "border",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示边框"
  },
  {
    prop: "stripe",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示斑马纹"
  },
  {
    prop: "show-selection",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否显示选择框"
  },
  {
    prop: "show-pagination",
    type: "boolean",
    default: "true",
    required: false,
    description: "是否显示分页"
  },
  {
    prop: "actions",
    type: "Array",
    default: "[]",
    required: false,
    description: "操作按钮配置"
  },
  {
    prop: "single-select",
    type: "boolean",
    default: "false",
    required: false,
    description: "是否启用单选模式"
  }
]
</script>

<style scoped>
.card-demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 页面头部样式 */
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
  max-width: 800px;
  margin: 0 auto;
}

/* 示例区域样式 */
.demo-content {
  margin-bottom: 40px;
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
  margin-bottom: 10px;
  font-weight: 500;
}

.section-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

/* 子部分样式 */
.demo-subsection {
  margin-bottom: 30px;
}

.subsection-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.subsection-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

/* 组件描述样式 */
.demo-description {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.demo-description h4 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.demo-description ul {
  margin: 0;
  padding-left: 20px;
}

.demo-description li {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.demo-description code {
  background-color: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 13px;
}

/* 组件文档样式 */
.component-docs {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.docs-title {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.doc-section {
  margin-bottom: 30px;
}

.doc-section-title {
  font-size: 18px;
  color: #333;
  margin: 25px 0 15px 0;
  font-weight: 500;
}

/* 数据列表卡片图标背景色 */
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
