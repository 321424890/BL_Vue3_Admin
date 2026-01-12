# CrystalImage 组件使用文档

## 简介

`CrystalImage` 是一个基于 Element Plus `el-upload` 封装的单图片上传组件，支持拖拽上传、图片预览、编辑和删除功能。

## 基本用法

```vue
<template>
  <div>
    <CrystalImage
      v-model:imageUrl="image"
      :api="uploadApi"
      :width="'200px'"
      :height="'200px'"
      :borderRadius="'8px'"
      :drag="true"
      :disabled="false"
      :fileSize="5"
      :fileType="['image/jpeg', 'image/png', 'image/gif']"
      @upload-success="onUploadSuccess"
      @upload-error="onUploadError"
    >
      <template #empty>
        <el-icon><Plus /></el-icon>
        <span>点击上传图片</span>
      </template>
      <template #tip>
        <div>支持 jpg/png/gif 格式，单张不超过 5MB</div>
      </template>
    </CrystalImage>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const image = ref('')

// 模拟上传接口
const uploadApi = async (formData: FormData) => {
  return new Promise<{ data: { fileUrl: string } }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          fileUrl: URL.createObjectURL(formData.get('file') as Blob)
        }
      })
    }, 1000)
  })
}

const onUploadSuccess = (response: any, file: any) => {
  console.log('上传成功', response, file)
}

const onUploadError = (error: any, file: any) => {
  console.error('上传失败', error, file)
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `imageUrl` | `string` | `''` | 图片地址，支持 `v-model` 双向绑定 |
| `api` | `(params: any) => Promise<any>` | 必填 | 上传图片的 API 方法 |
| `drag` | `boolean` | `true` | 是否支持拖拽上传 |
| `disabled` | `boolean` | `false` | 是否禁用上传组件 |
| `fileSize` | `number` | `5` | 图片大小限制（MB） |
| `fileType` | `string[]` | `['image/jpeg', 'image/png', 'image/gif']` | 图片类型限制 |
| `height` | `string` | `'150px'` | 组件高度 |
| `width` | `string` | `'150px'` | 组件宽度 |
| `borderRadius` | `string` | `'8px'` | 组件边框圆角 |
| `wrapperStyle` | `object` | `{}` | 组件样式配置 |

### wrapperStyle 对象说明

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `borderColor` | `string` | `'#dcdfe6'` | 边框颜色 |
| `focusBorderColor` | `string` | `'#409eff'` | 聚焦/悬停时边框颜色 |
| `focusBoxShadow` | `string` | - | 聚焦/悬停时阴影 |
| `backgroundColor` | `string` | - | 背景颜色 |
| `boxShadow` | `string` | - | 阴影 |

## 事件说明

| 事件名 | 参数 | 说明 |
|-------|------|------|
| `update:imageUrl` | `value: string` | 图片地址变化时触发，支持 `v-model` |
| `upload-success` | `response: any, file: any` | 上传成功回调 |
| `upload-error` | `error: any, file: any` | 上传失败回调 |

## 插槽说明

| 插槽名 | 说明 |
|-------|------|
| `empty` | 空状态显示内容 |
| `tip` | 提示信息显示内容 |

## 方法说明

| 方法名 | 说明 |
|-------|------|
| `editImg` | 编辑图片，重新选择图片 |
| `deleteImg` | 删除图片，清空图片地址 |
| `beforeUpload` | 上传前校验文件类型和大小 |
| `handleHttpUpload` | 自定义上传请求，调用传入的 `api` |
| `uploadSuccess` | 上传成功处理，更新图片地址 |
| `uploadError` | 上传失败处理 |

## 注意事项

1. 组件依赖 Element Plus 的 `el-upload` 和 `el-image-viewer` 组件
2. 上传成功后，组件会自动更新 `imageUrl`
3. 组件支持表单验证，当在 `el-form` 中使用时，会自动触发表单校验
4. 拖拽上传时，组件会移除边框样式