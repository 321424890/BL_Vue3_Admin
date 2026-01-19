# CrystalText 组件使用文档

## 简介

`CrystalText` 是一个基于 Element Plus `el-text` 封装的增强型文本组件，它继承了 `el-text` 的所有属性和功能，并在此基础上添加了丰富的视觉效果和设计特性，让文本展示更加生动和多样化。

### 核心特性

- ✅ **继承 Element Plus `el-text` 的所有属性**
- ✅ **渐变文字效果**：支持自定义渐变方向和颜色
- ✅ **文字阴影效果**：可调节阴影颜色和深度
- ✅ **悬停交互效果**：鼠标悬停时的动态变化
- ✅ **高级文本样式控制**：字体、行高、间距等精细调节
- ✅ **文本溢出处理**：自动省略或截断超出长度的文本
- ✅ **响应式设计**：适配不同屏幕尺寸

## 快速开始

### 基本用法

```vue
<template>
  <div>
    <!-- 基础文本 -->
    <CrystalText>这是一段普通文本</CrystalText>
    
    <!-- 带类型的文本 -->
    <CrystalText type="primary">主要文本</CrystalText>
    <CrystalText type="success">成功状态文本</CrystalText>
    <CrystalText type="warning">警告提示文本</CrystalText>
    <CrystalText type="danger">危险警告文本</CrystalText>
    <CrystalText type="info">信息提示文本</CrystalText>
  </div>
</template>

<script setup lang="ts">
import { CrystalText } from '@/components/CrystalText'
</script>
```

### 安装与注册

```ts
// 全局注册
import { createApp } from 'vue'
import CrystalUI from 'crystal-ui'
import 'crystal-ui/dist/index.css'

const app = createApp(App)
app.use(CrystalUI)

// 按需引入
import { CrystalText } from 'crystal-ui'
import 'crystal-ui/dist/index.css'

export default {
  components: {
    CrystalText
  }
}
```

## 属性说明

### 基础属性（继承自 el-text）

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `tag` | `string` | `'span'` | 文本包裹标签 |
| `type` | `'' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `''` | 文本类型 |
| `size` | `'' \| 'xs' \| 'sm' \| 'base' \| 'lg'` | `''` | 文本大小 |
| `bold` | `boolean` | `false` | 是否粗体 |
| `italic` | `boolean` | `false` | 是否斜体 |
| `underline` | `boolean` | `false` | 是否下划线 |
| `delete` | `boolean` | `false` | 是否删除线 |
| `code` | `boolean` | `false` | 是否代码块样式 |
| `copyable` | `boolean` | `false` | 是否可复制 |

### 扩展属性（CrystalText 特有）

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `gradient` | `boolean` | `false` | 是否启用渐变文字效果 |
| `gradientFrom` | `string` | `'#1890ff'` | 渐变起始颜色 |
| `gradientTo` | `string` | `'#52c41a'` | 渐变结束颜色 |
| `shadow` | `boolean` | `false` | 是否启用文字阴影 |
| `shadowColor` | `string` | `'#888888'` | 阴影颜色 |
| `hoverEffect` | `boolean` | `false` | 是否启用悬停效果 |
| `hoverColor` | `string` | `'#1890ff'` | 悬停时的文本颜色 |
| `fontFamily` | `string` | `''` | 自定义字体 |
| `lineHeight` | `string` | `''` | 行高 |
| `letterSpacing` | `string` | `''` | 字间距 |
| `wordSpacing` | `string` | `''` | 词间距 |
| `textDecoration` | `string` | `''` | 文本装饰 |
| `textTransform` | `'none' \| 'capitalize' \| 'uppercase' \| 'lowercase'` | `'none'` | 文本转换 |
| `textAlign` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | 文本对齐 |
| `textOverflow` | `'clip' \| 'ellipsis'` | `'clip'` | 文本溢出处理方式 |
| `maxWidth` | `string` | `''` | 文本最大宽度（配合 ellipsis 使用） |

## 功能示例

### 1. 渐变文字

```vue
<!-- 基础渐变效果 -->
<CrystalText gradient>
  渐变文字效果
</CrystalText>

<!-- 自定义渐变颜色 -->
<CrystalText gradient gradientFrom="#ff6b6b" gradientTo="#4ecdc4">
  自定义颜色渐变
</CrystalText>

<!-- 渐变标题 -->
<CrystalText gradient gradientFrom="#1890ff" gradientTo="#722ed1" size="lg" bold>
  渐变标题文字
</CrystalText>
```

### 2. 文字阴影

```vue
<!-- 基础阴影效果 -->
<CrystalText shadow>
  带阴影的文字
</CrystalText>

<!-- 自定义阴影颜色 -->
<CrystalText shadow shadowColor="#ff6b6b" bold size="lg">
  红色阴影文字
</CrystalText>

<!-- 阴影+渐变组合 -->
<CrystalText gradient shadow shadowColor="#333333">
  渐变+阴影效果
</CrystalText>
```

### 3. 悬停效果

```vue
<!-- 基础悬停效果 -->
<CrystalText hoverEffect>
  鼠标悬停时变色
</CrystalText>

<!-- 自定义悬停颜色 -->
<CrystalText hoverEffect hoverColor="#4ecdc4" underline>
  悬停变色的链接文本
</CrystalText>

<!-- 悬停+渐变组合 -->
<CrystalText gradient hoverEffect hoverColor="#ff6b6b">
  渐变文字悬停效果
</CrystalText>
```

### 4. 文本样式控制

```vue
<!-- 自定义字体和行高 -->
<CrystalText fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" lineHeight="1.8">
  这是一段使用自定义字体和行高的文本内容，
  多行显示时效果更加明显。
</CrystalText>

<!-- 调整字间距和词间距 -->
<CrystalText letterSpacing="3px" wordSpacing="10px">
  Letter and Word Spacing
</CrystalText>

<!-- 文本转换 -->
<CrystalText textTransform="uppercase">
  convert to uppercase
</CrystalText>
<CrystalText textTransform="capitalize">
  capitalize each word
</CrystalText>
```

### 5. 文本溢出处理

```vue
<!-- 单行文本溢出省略 -->
<CrystalText textOverflow="ellipsis" maxWidth="200px">
  这是一段非常长的文本内容，当超过最大宽度时会自动显示省略号
</CrystalText>

<!-- 结合其他样式 -->
<CrystalText 
  textOverflow="ellipsis" 
  maxWidth="300px" 
  type="primary" 
  bold
>
  这是一段结合了类型、粗体和溢出处理的文本内容
</CrystalText>
```

### 6. 高级组合效果

```vue
<!-- 渐变+阴影+悬停 -->
<CrystalText 
  gradient 
  gradientFrom="#52c41a" 
  gradientTo="#1890ff" 
  shadow 
  shadowColor="#333" 
  hoverEffect 
  hoverColor="#ff6b6b" 
  size="lg" 
  bold
>
  高级组合效果文本
</CrystalText>

<!-- 完整样式控制 -->
<CrystalText 
  type="warning" 
  italic 
  underline 
  fontFamily="Georgia, serif" 
  letterSpacing="2px" 
  lineHeight="2" 
  textTransform="uppercase"
>
  完整样式控制示例
</CrystalText>
```

## 事件说明

| 事件名 | 参数 | 说明 |
|-------|------|------|
| `copy` | `(event: ClipboardEvent) => void` | 复制成功时触发 |
| `copy-error` | `(event: ClipboardEvent) => void` | 复制失败时触发 |

### 事件使用示例

```vue
<CrystalText 
  copyable 
  @copy="handleCopy" 
  @copy-error="handleCopyError"
>
  点击复制这段文字
</CrystalText>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const handleCopy = () => {
  ElMessage.success('复制成功！')
}

const handleCopyError = () => {
  ElMessage.error('复制失败，请重试！')
}
</script>
```

## 插槽说明

| 插槽名 | 说明 |
|-------|------|
| `default` | 文本内容插槽，用于放置需要展示的文本 |

## 样式扩展

### CSS 变量

组件提供了以下 CSS 变量，方便自定义样式：

| 变量名 | 默认值 | 说明 |
|-------|------|------|
| `--el-text-color-primary` | `#409eff` | 主要文本颜色 |
| `--el-text-color-success` | `#67c23a` | 成功文本颜色 |
| `--el-text-color-warning` | `#e6a23c` | 警告文本颜色 |
| `--el-text-color-danger` | `#f56c6c` | 危险文本颜色 |
| `--el-text-color-info` | `#909399` | 信息文本颜色 |

### 自定义类名

| 类名 | 说明 |
|------|------|
| `crystal-text` | 组件基础类名 |
| `crystal-text-gradient` | 渐变文字类 |
| `crystal-text-shadow` | 阴影文字类 |
| `crystal-text-hover` | 悬停效果类 |
| `crystal-text-${type}` | 不同类型文本的类（如 crystal-text-primary） |

### 自定义样式示例

```vue
<template>
  <CrystalText class="custom-text">
    自定义样式的文本
  </CrystalText>
</template>

<style scoped>
.custom-text {
  /* 自定义渐变角度 */
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* 自定义阴影 */
  text-shadow: 2px 2px 8px rgba(255, 107, 107, 0.5);
  
  /* 自定义过渡动画 */
  transition: all 0.4s ease;
}

.custom-text:hover {
  transform: scale(1.05);
  text-shadow: 3px 3px 12px rgba(255, 107, 107, 0.8);
}
</style>
```

## 浏览器兼容性

| 浏览器 | 版本要求 | 支持状态 |
|-------|---------|---------|
| Chrome | ≥ 60 | ✅ |
| Firefox | ≥ 55 | ✅ |
| Safari | ≥ 12 | ✅ |
| Edge | ≥ 79 | ✅ |
| IE | - | ❌（不支持） |

## 注意事项

1. **渐变文字兼容性**：渐变文字效果依赖 CSS `background-clip: text` 属性，部分旧版浏览器可能不支持

2. **属性优先级**：当同时使用 `gradient` 和 `type` 属性时，渐变效果会覆盖 `type` 定义的颜色

3. **文本溢出处理**：使用 `textOverflow="ellipsis"` 时，必须同时设置 `maxWidth` 属性，否则不会生效

4. **性能考虑**：过多使用复杂的视觉效果（如多层渐变、阴影等）可能会影响页面性能

5. **响应式设计**：在移动设备上使用时，建议适当调整字体大小和间距，确保良好的可读性

## 常见问题

### Q: 为什么渐变文字在某些浏览器中不显示？
A: 渐变文字效果依赖 CSS `background-clip: text` 和 `-webkit-text-fill-color: transparent` 属性，部分旧版浏览器可能不支持这些属性。建议为不支持的浏览器提供降级方案。

### Q: 如何调整渐变方向？
A: 当前版本的渐变方向固定为 45 度角。如果需要自定义渐变方向，可以通过覆盖组件的 CSS 样式来实现：
```css
.crystal-text-gradient {
  background: linear-gradient(90deg, var(--gradient-from), var(--gradient-to)) !important;
}
```

### Q: 为什么悬停效果没有生效？
A: 请确保已经设置了 `hoverEffect` 属性为 `true`，并且文本内容不为空。另外，部分浏览器可能需要启用硬件加速才能正常显示过渡效果。

### Q: 如何实现多行文本溢出省略？
A: 当前版本只支持单行文本溢出省略。如果需要实现多行文本溢出省略，可以通过自定义 CSS 样式来实现：
```vue
<CrystalText class="multi-line-ellipsis">
  这是一段多行文本，当超过指定行数时会显示省略号
</CrystalText>

<style scoped>
.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
```

## 版本说明

### v1.0.0
- ✨ 基于 Element Plus `el-text` 封装
- ✨ 添加渐变文字效果
- ✨ 添加文字阴影效果
- ✨ 添加悬停交互效果
- ✨ 支持高级文本样式控制
- ✨ 支持文本溢出处理

## 更新日志

### v1.0.0 (2026-01-13)
- 首次发布
- 实现所有核心功能
- 完善文档和示例

## 贡献指南

如果您有任何建议或发现了 bug，欢迎提交 Issue 或 Pull Request。

## 许可证

MIT License