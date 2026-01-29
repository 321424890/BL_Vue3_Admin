<template>
  <div class="basic-echarts" :style="{ width, height }">
    <div v-if="loading" class="echarts-loading">
      <slot name="loading">
        <div class="loading-content">加载中...</div>
      </slot>
    </div>
    <div ref="chartRef" class="chart-container"></div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onUnmounted, nextTick, PropType } from "vue"
import { debounce } from "@/utils"
import { ChartData, BasicConfig, BasicEchartsProps } from "./types"

/**
 * BasicEcharts 组件
 * 企业级ECharts图表封装组件，支持业务数据与配置分离，按需加载ECharts核心模块
 * 设计原则：
 * 1. 数据与配置分离：业务数据与图表配置独立管理，提高复用性
 * 2. 按需加载：只引入必要的ECharts模块，减小打包体积
 * 3. 响应式设计：自动监听数据变化和窗口大小变化
 * 4. 类型安全：完整的TypeScript类型支持
 * 5. 灵活扩展：支持自定义配置和事件监听
 */
export default defineComponent({
  name: "BasicEcharts",
  components: {},
  props: {
    // 图表宽度
    width: {
      type: String,
      default: "100%"
    },
    // 图表高度
    height: {
      type: String,
      default: "400px"
    },
    // 业务数据
    data: {
      type: Object as PropType<ChartData>,
      default: () => ({})
    },
    // 基础配置
    config: {
      type: Object as PropType<BasicConfig>,
      default: () => ({})
    },
    // 图表类型
    chartType: {
      type: String,
      default: "bar"
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 自定义option（优先级最高）
    customOption: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  emits: ["chart-ready", "click", "legendselectchanged", "datazoom"],
  setup(props, { emit }) {
    // 图表容器引用
    const chartRef = ref<HTMLElement | null>(null)
    // 图表实例
    const chartInstance = ref<any>(null)
    // 图表是否已初始化
    const isChartInitialized = ref(false)

    /**
     * 按需加载ECharts核心模块
     * 优势：
     * 1. 减小打包体积：只引入必要的模块，避免全量引入ECharts
     * 2. 提高加载速度：减少网络请求大小
     * 3. 优化性能：只初始化需要的图表类型和组件
     * @returns {Promise<any>} ECharts实例
     */
    const loadEcharts = async () => {
      try {
        // 按需引入ECharts核心模块
        const echarts = await import("echarts/core")
        // 按需引入图表类型组件
        const { BarChart, LineChart, PieChart, ScatterChart, MapChart, RadarChart } = await import("echarts/charts")
        // 按需引入基础组件
        const {
          TitleComponent, // 标题组件
          TooltipComponent, // 提示框组件
          LegendComponent, // 图例组件
          GridComponent, // 网格组件
          DatasetComponent, // 数据集组件
          TransformComponent, // 数据变换组件
          DataZoomComponent, // 数据缩放组件
          VisualMapComponent // 视觉映射组件
        } = await import("echarts/components")
        // 按需引入渲染器
        const { CanvasRenderer } = await import("echarts/renderers")

        // 注册必须的组件
        echarts.use([
          TitleComponent,
          TooltipComponent,
          LegendComponent,
          GridComponent,
          DatasetComponent,
          TransformComponent,
          DataZoomComponent,
          VisualMapComponent,
          BarChart,
          LineChart,
          PieChart,
          ScatterChart,
          MapChart,
          RadarChart,
          CanvasRenderer
        ])

        return echarts
      } catch (error) {
        console.error("Failed to load echarts:", error)
        throw error
      }
    }

    /**
     * 初始化图表
     * 1. 加载ECharts核心模块
     * 2. 创建图表实例
     * 3. 绑定图表事件
     * 4. 触发图表就绪事件
     * 5. 更新图表数据和配置
     */
    const initChart = async () => {
      if (!chartRef.value) return

      try {
        // 加载ECharts核心模块
        const echarts = await loadEcharts()
        // 创建图表实例
        chartInstance.value = echarts.init(chartRef.value)
        // 标记图表已初始化
        isChartInitialized.value = true

        // 绑定图表事件
        bindChartEvents()

        // 触发图表就绪事件，将图表实例传递给父组件
        emit("chart-ready", chartInstance.value)

        // 更新图表数据和配置
        updateChart()
      } catch (error) {
        console.error("Failed to initialize chart:", error)
      }
    }

    // 绑定图表事件
    const bindChartEvents = () => {
      if (!chartInstance.value) return

      // 支持的事件列表
      const events = ["click", "legendselectchanged", "datazoom"]

      events.forEach(event => {
        chartInstance.value.on(event, (params: any) => {
          emit(event, params)
        })
      })
    }

    // 生成图表配置
    const generateOption = () => {
      const { data, config, chartType, customOption } = props

      // 基础配置
      const baseOption: any = {
        title: config.title || {},
        tooltip: config.tooltip || {
          trigger: "axis"
        },
        legend: config.legend || {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        textStyle: {
          fontSize: 12
        }
      }

      // 根据图表类型生成默认配置
      let chartOption: any = {}

      switch (chartType) {
        case "bar":
          // 确保柱状图数据格式正确
          let barSeries = (data.series || []).map(seriesItem => ({
            ...seriesItem,
            type: seriesItem.type || "bar"
          }))

          chartOption = {
            xAxis: {
              type: "category",
              data: data.xAxis || [],
              axisLabel: {
                color: "rgba(0, 0, 0, 0.65)"
              }
            },
            yAxis: {
              type: "value",
              axisLabel: {
                color: "rgba(0, 0, 0, 0.45)"
              }
            },
            series: barSeries
          }
          break

        case "line":
          // 确保折线图数据格式正确
          let lineSeries = (data.series || []).map(seriesItem => ({
            ...seriesItem,
            type: seriesItem.type || "line"
          }))

          chartOption = {
            xAxis: {
              type: "category",
              data: data.xAxis || [],
              axisLabel: {
                color: "rgba(0, 0, 0, 0.65)"
              }
            },
            yAxis: {
              type: "value",
              axisLabel: {
                color: "rgba(0, 0, 0, 0.45)"
              }
            },
            series: lineSeries
          }
          break

        case "pie":
          // 确保饼图数据格式正确
          let pieSeries = data.series || [
            {
              type: "pie",
              radius: "60%",
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]

          // 确保series数组中的每个对象都有type属性
          pieSeries = pieSeries.map(seriesItem => ({
            ...seriesItem,
            type: seriesItem.type || "pie"
          }))

          chartOption = {
            series: pieSeries
          }
          break

        default:
          // 确保默认图表类型数据格式正确
          let defaultSeries = (data.series || []).map(seriesItem => ({
            ...seriesItem,
            type: seriesItem.type || "bar" // 默认为柱状图类型
          }))

          chartOption = {
            series: defaultSeries
          }
      }

      // 合并配置：基础配置 -> 图表类型配置 -> 自定义配置
      return {
        ...baseOption,
        ...chartOption,
        ...customOption
      }
    }

    // 更新图表
    const updateChart = () => {
      if (!chartInstance.value || !isChartInitialized.value) return

      nextTick(() => {
        const option = generateOption()
        chartInstance.value.setOption(option, true)
      })
    }

    // 调整图表大小
    const resizeChart = debounce(() => {
      if (chartInstance.value) {
        chartInstance.value.resize()
      }
    }, 100)

    // 监听数据变化
    watch(
      () => props.data,
      () => {
        updateChart()
      },
      { deep: true }
    )

    // 监听配置变化
    watch(
      () => props.config,
      () => {
        updateChart()
      },
      { deep: true }
    )

    // 监听自定义配置变化
    watch(
      () => props.customOption,
      () => {
        updateChart()
      },
      { deep: true }
    )

    // 监听尺寸变化
    watch([() => props.width, () => props.height], () => {
      resizeChart()
    })

    // 监听图表类型变化
    watch(
      () => props.chartType,
      () => {
        updateChart()
      }
    )

    // 组件挂载
    onMounted(() => {
      nextTick(() => {
        initChart()
      })
      window.addEventListener("resize", resizeChart)
    })

    // 组件卸载
    onUnmounted(() => {
      window.removeEventListener("resize", resizeChart)
      if (chartInstance.value) {
        chartInstance.value.dispose()
        chartInstance.value = null
      }
    })

    // 暴露方法
    const methods = {
      // 获取图表实例
      getChartInstance: () => chartInstance.value,
      // 手动更新图表
      update: updateChart,
      // 手动调整大小
      resize: resizeChart,
      // 清空图表
      clear: () => chartInstance.value?.clear()
    }

    // 暴露方法给父组件
    ;(methods as any).expose = methods

    return {
      chartRef,
      ...methods
    }
  }
})
</script>

<style lang="scss" scoped>
.basic-echarts {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .chart-container {
    width: 100%;
    height: 100%;
  }

  .echarts-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 10;

    .loading-content {
      color: #1890ff;
      font-size: 14px;
    }
  }

  .echarts-nodata {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 10;

    .nodata-content {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
