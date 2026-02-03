# CrystalButton 组件使用文档

## 简介

`CrystalButton` 是一个基于 Element Plus `el-button` 的直接封装组件，它完全继承了 `el-button` 的所有属性、事件和功能，保持与 Element Plus 按钮的样式一致性和使用体验。

### 核心特性

- ✅ **完全继承 Element Plus `el-button` 的所有属性**
- ✅ **完全继承 Element Plus `el-button` 的所有事件**
- ✅ **保持与 Element Plus 样式完全一致**
- ✅ **支持 Element Plus 主题定制**
- ✅ **内置异步操作 loading 状态管理**
- ✅ **简化异步操作代码，提高开发效率**

## 快速开始

### 基本用法

```vue
<template>
  <div>
    <!-- 基础按钮 -->
    <CrystalButton>默认按钮</CrystalButton>

    <!-- 带类型的按钮 -->
    <CrystalButton type="primary">主要按钮</CrystalButton>
    <CrystalButton type="success">成功按钮</CrystalButton>
    <CrystalButton type="warning">警告按钮</CrystalButton>
    <CrystalButton type="danger">危险按钮</CrystalButton>
    <CrystalButton type="info">信息按钮</CrystalButton>
  </div>
</template>

<script setup lang="ts">
import { CrystalButton } from "@/components/CrystalButton"
</script>
```

### 安装与注册

```ts
// 全局注册
import { createApp } from "vue"
import CrystalUI from "crystal-ui"
import "crystal-ui/dist/index.css"

const app = createApp(App)
app.use(CrystalUI)

// 按需引入
import { CrystalButton } from "crystal-ui"
import "crystal-ui/dist/index.css"

export default {
  components: {
    CrystalButton
  }
}
```

## 属性说明

`CrystalButton` 完全继承了 Element Plus `el-button` 的所有属性，详细属性请参考 [Element Plus 按钮文档](https://element-plus.org/zh-CN/component/button.html)。

### 常用属性示例

```vue
<!-- 按钮尺寸 -->
<CrystalButton size="large">大型按钮</CrystalButton>
<CrystalButton>默认按钮</CrystalButton>
<CrystalButton size="small">小型按钮</CrystalButton>

<!-- 按钮状态 -->
<CrystalButton disabled>禁用按钮</CrystalButton>
<CrystalButton loading>加载中</CrystalButton>
<CrystalButton plain>朴素按钮</CrystalButton>
<CrystalButton round>圆角按钮</CrystalButton>
<CrystalButton circle icon="el-icon-search"></CrystalButton>

<!-- 带图标的按钮 -->
<CrystalButton type="primary" icon="el-icon-edit">编辑</CrystalButton>
<CrystalButton type="success" icon="el-icon-check">成功</CrystalButton>
<CrystalButton type="warning" icon="el-icon-delete">删除</CrystalButton>
```

## 事件说明

`CrystalButton` 完全继承了 Element Plus `el-button` 的所有事件，详细事件请参考 [Element Plus 按钮文档](https://element-plus.org/zh-CN/component/button.html)。

### 常用事件示例

```vue
<template>
  <CrystalButton @click="handleClick" @mouseenter="handleMouseEnter" type="primary"> 点击我 </CrystalButton>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"

const handleClick = () => {
  ElMessage.success("按钮被点击了！")
}

const handleMouseEnter = () => {
  console.log("鼠标进入按钮")
}
</script>
```

## 异步操作自动管理

### autoLoading 功能简介

`CrystalButton` 提供了内置的异步操作 loading 状态管理功能，通过 `autoLoading` 属性可以实现点击按钮时自动显示 loading 状态，操作完成后自动关闭。

### autoLoading 功能的好处

使用 `autoLoading` 功能可以带来以下好处：

1. **简化代码**：无需手动管理 loading 状态，减少模板中的 `:loading` 绑定和组件中的 loading 变量

2. **提高开发效率**：只需要关注异步操作本身，不需要关心 loading 状态的切换

3. **避免遗漏**：自动处理 loading 状态的关闭，避免因为忘记关闭 loading 状态导致的 UI 卡死

4. **代码更清晰**：将异步操作的逻辑与 UI 状态管理分离，代码结构更清晰

5. **支持多个按钮**：每个按钮都有自己独立的 loading 状态，互不影响

6. **保持一致性**：所有异步按钮的 loading 状态管理方式保持一致，提高代码可维护性

7. **错误处理更完善**：无论异步操作成功失败，都能确保 loading 状态被正确关闭

### autoLoading 功能使用示例

```vue
<template>
  <div>
    <!-- 基础异步按钮 -->
    <CrystalButton type="primary" :auto-loading="true" @async-click="handleAsyncClick"> 提交表单 </CrystalButton>

    <!-- 多个独立的异步按钮 -->
    <CrystalButton
      type="success"
      :auto-loading="true"
      @async-click="(event, done) => handleAsyncOperation(1000, done)"
      style="margin-left: 10px"
    >
      操作 1s
    </CrystalButton>

    <CrystalButton
      type="warning"
      :auto-loading="true"
      @async-click="(event, done) => handleAsyncOperation(2000, done)"
      style="margin-left: 10px"
    >
      操作 2s
    </CrystalButton>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"

// 处理表单提交
const handleAsyncClick = async (event: MouseEvent, done: () => void) => {
  try {
    // 模拟表单提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success("表单提交成功！")
  } catch (error) {
    ElMessage.error("表单提交失败，请重试")
    console.error("表单提交失败:", error)
  } finally {
    // 不管成功失败，都关闭loading状态
    done()
  }
}

// 处理通用异步操作
const handleAsyncOperation = async (delay: number, done: () => void) => {
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, delay))
    console.log(`异步操作完成，延迟 ${delay}ms`)
  } catch (error) {
    console.error(`异步操作失败，延迟 ${delay}ms`, error)
  } finally {
    // 不管成功失败，都关闭loading状态
    done()
  }
}
</script>
```

### 对比传统方式

#### 传统方式（繁琐）

```vue
<template>
  <CrystalButton type="primary" :loading="submitLoading" @click="handleSubmit"> 提交表单 </CrystalButton>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"

const submitLoading = ref(false)

const handleSubmit = async () => {
  try {
    submitLoading.value = true
    // 模拟表单提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success("表单提交成功！")
  } catch (error) {
    ElMessage.error("表单提交失败，请重试")
  } finally {
    submitLoading.value = false
  }
}
</script>
```

#### 使用 autoLoading 功能（简洁）

```vue
<template>
  <CrystalButton type="primary" :auto-loading="true" @async-click="handleSubmit"> 提交表单 </CrystalButton>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"

const handleSubmit = async (event: MouseEvent, done: () => void) => {
  try {
    // 模拟表单提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success("表单提交成功！")
  } catch (error) {
    ElMessage.error("表单提交失败，请重试")
  } finally {
    done()
  }
}
</script>
```

通过对比可以看出，使用 `autoLoading` 功能可以减少模板中的 `:loading` 绑定和组件中的 loading 变量，让代码更简洁、更易维护。

## 点击节流功能

### throttle 功能简介

`CrystalButton` 提供了内置的点击节流功能，通过 `throttle` 属性可以设置点击节流时间（毫秒），防止用户在短时间内重复点击按钮，导致多次触发相同的操作。

### throttle 功能的好处

使用 `throttle` 功能可以带来以下好处：

1. **防止重复操作**：避免用户在短时间内重复点击按钮，导致多次触发相同的操作
2. **提高用户体验**：减少因快速点击导致的不必要的加载和响应
3. **保护服务器**：减少因重复点击导致的多余 API 请求，减轻服务器负担
4. **灵活配置**：可以根据不同操作的需要设置不同的节流时间
5. **易于使用**：只需设置 `throttle` 属性即可启用节流功能，无需编写额外的节流逻辑

### throttle 功能使用示例

```vue
<template>
  <div>
    <!-- 基础节流按钮 -->
    <CrystalButton type="primary" :throttle="1000" @click="handleClick"> 点击我（1秒节流） </CrystalButton>

    <!-- 结合 autoLoading 使用 -->
    <CrystalButton type="success" :auto-loading="true" :throttle="2000" @async-click="handleAsyncClick" style="margin-left: 10px">
      异步操作（2秒节流）
    </CrystalButton>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"

const handleClick = () => {
  ElMessage.success("按钮被点击了！")
}

const handleAsyncClick = async (event: MouseEvent, done: () => void) => {
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success("异步操作完成！")
  } catch (error) {
    ElMessage.error("异步操作失败，请重试")
  } finally {
    done()
  }
}
</script>
```

### 节流时间设置建议

- **0.5-1秒**：适用于快速响应的操作，如页面跳转、简单的表单提交
- **1-2秒**：适用于中等耗时的操作，如数据加载、文件上传
- **2-3秒**：适用于耗时较长的操作，如视频处理、大型文件上传

## 浏览器兼容性

与 Element Plus 保持一致：

| 浏览器  | 版本要求 | 支持状态     |
| ------- | -------- | ------------ |
| Chrome  | ≥ 60     | ✅           |
| Firefox | ≥ 55     | ✅           |
| Safari  | ≥ 12     | ✅           |
| Edge    | ≥ 79     | ✅           |
| IE      | -        | ❌（不支持） |

## 注意事项

1. **与 Element Plus 保持一致**：

   - 组件完全继承 Element Plus `el-button` 的所有功能
   - 样式、属性、事件与 Element Plus 官方文档完全一致

2. **主题定制**：
   - 支持通过 Element Plus 的主题系统进行样式定制
   - 请参考 [Element Plus 主题定制文档](https://element-plus.org/zh-CN/guide/theming.html)

## 版本说明

### v1.1.0

- ✨ 新增 `autoLoading` 属性，支持自动管理异步操作的 loading 状态
- ✨ 新增 `asyncClick` 事件，用于处理启用了 `autoLoading` 时的异步操作
- ✨ 新增 `throttle` 属性，支持点击节流功能
- ✨ 完善文档和示例

### v1.0.0

- ✨ 基于 Element Plus `el-button` 封装
- ✨ 完全继承 `el-button` 的所有属性和事件
- ✨ 保持与 Element Plus 样式一致性

## 更新日志

### v1.1.0 (2026-02-02)

- 新增 `autoLoading` 功能，支持自动管理异步操作的 loading 状态
- 新增 `asyncClick` 事件，用于处理异步操作
- 新增 `throttle` 功能，支持点击节流，防止重复点击
- 完善文档和示例

### v1.0.0 (2026-01-13)

- 首次发布
- 实现核心功能
- 完善文档和示例

## 贡献指南

如果您有任何建议或发现了 bug，欢迎提交 Issue 或 Pull Request。

## 许可证

MIT License
