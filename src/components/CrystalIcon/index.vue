<template>
  <el-icon
    :size="size"
    :color="color"
    :class="[
      'crystal-icon',
      {
        'crystal-icon-animate': animate,
        'crystal-icon-rotate': animateType === 'rotate',
        'crystal-icon-pulse': animateType === 'pulse',
        'crystal-icon-bounce': animateType === 'bounce',
        'crystal-icon-gradient': gradient
      }
    ]"
    :style="gradientStyle"
  >
    <!-- 动态渲染 Element Plus 图标 -->
    <component :is="iconComponent" v-if="iconComponent" />
    <!-- 自定义内容插槽 -->
    <slot v-else></slot>
  </el-icon>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { computed } from 'vue'

// 定义组件属性
interface Props {
  // Element Plus 图标名称
  icon?: string
  // 图标大小
  size?: number | string
  // 图标颜色
  color?: string
  // 是否启用动画
  animate?: boolean
  // 动画类型: rotate | pulse | bounce
  animateType?: 'rotate' | 'pulse' | 'bounce'
  // 是否启用颜色渐变
  gradient?: boolean
  // 渐变起始颜色
  gradientFrom?: string
  // 渐变结束颜色
  gradientTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  color: '#333',
  animate: false,
  animateType: 'rotate',
  gradient: false,
  gradientFrom: '#1890ff',
  gradientTo: '#52c41a'
})

// 动态导入 Element Plus 图标组件
const iconComponent = computed(() => {
  if (!props.icon) return null
  // 将 kebab-case 转换为 PascalCase
  const pascalCaseIcon = props.icon.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  return ElementPlusIconsVue[pascalCaseIcon as keyof typeof ElementPlusIconsVue]
})

// 计算渐变样式
const gradientStyle = computed(() => {
  if (!props.gradient) return {}
  return {
    background: `linear-gradient(45deg, ${props.gradientFrom}, ${props.gradientTo})`,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'background-clip': 'text'
  }
})

// 组件名称
defineOptions({
  name: 'CrystalIcon'
})
</script>

<style scoped>
/* 基础样式 */
.crystal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* 动画效果 */
.crystal-icon-animate.crystal-icon-rotate {
  animation: rotate 2s linear infinite;
}

.crystal-icon-animate.crystal-icon-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.crystal-icon-animate.crystal-icon-bounce {
  animation: bounce 1s ease-in-out infinite;
}

/* 动画关键帧 */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>