# CrystalImages 组件使用文档

## 简介

`CrystalImages` 是一个基于 Element Plus `el-upload` 封装的多图片上传组件，支持拖拽上传、图片预览、删除功能。

## 基本用法

```vue
<template>
  <div>
    <CrystalImages
      v-model:fileList="images"
      :api="uploadApi"
      :limit="3"
      :multiple="true"
      :fileSize="2"
      :fileType="['image/jpeg', 'image/png']"
      :width="'200px'"
      :height="'200px'"
      :borderRadius="'12px'"
      :drag="false"
      @upload-success="onUploadSuccess"
      @upload-error="onUploadError"
      @remove="onRemove"
    >
      <template #empty>
        <div style="color: #999;">点击上传图片</div>
      </template>
      <template #tip>
        <div>支持 jpg/png 格式，单张不超过 2MB</div>
      </template>
    </CrystalImages>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const images = ref([])

// 模拟上传接口
const uploadApi = async (formData: FormData) => {
  return new Promise<{ fileUrl: string }>((resolve) => {
    setTimeout(() => {
      resolve({ fileUrl: URL.createObjectURL(formData.get('file') as Blob) })
    }, 1000)
  })
}

const onUploadSuccess = (response: any, file: any) => {
  console.log('上传成功', response, file)
}

const onUploadError = (error: any, file: any) => {
  console.error('上传失败', error, file)
}

const onRemove = (file: any) => {
  console.log('删除文件', file)
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `fileList` | `UploadUserFile[]` | `[]` | 绑定的文件列表，支持 `v-model` 双向绑定 |
| `api` | `(formData: FormData) => Promise<{ fileUrl: string }>` | 必填 | 上传接口函数 |
| `drag` | `boolean` | `true` | 是否开启拖拽上传 |
| `disabled` | `boolean` | `false` | 是否禁用上传 |
| `limit` | `number` | `5` | 最大上传数量 |
| `multiple` | `boolean` | `true` | 是否支持多选上传 |
| `fileSize` | `number` | `5` | 单个文件大小限制（MB） |
| `fileType` | `ImageMimeType[]` | `['image/jpeg', 'image/png', 'image/gif']` | 支持的图片类型 |
| `height` | `string` | `'150px'` | 上传区域高度 |
| `width` | `string` | `'150px'` | 上传区域宽度 |
| `borderRadius` | `string` | `'8px'` | 上传区域圆角 |

## 事件说明

| 事件名 | 参数 | 说明 |
|-------|------|------|
| `update:fileList` | `(value: UploadUserFile[])` | 文件列表变化时触发，支持 `v-model` |
| `upload-success` | `(response: any, file: UploadFile)` | 上传成功回调 |
| `upload-error` | `(error: any, file: UploadFile)` | 上传失败回调 |
| `remove` | `(file: UploadFile)` | 删除文件时触发 |

## 插槽说明

| 插槽名 | 说明 |
|-------|------|
| `empty` | 空状态显示内容 |
| `tip` | 提示信息显示内容 |

## 方法说明

| 方法名 | 说明 |
|-------|------|
| `beforeUpload` | 上传前校验文件类型和大小 |
| `handleHttpUpload` | 自定义上传请求，调用传入的 `api` |
| `uploadSuccess` | 上传成功处理，更新文件列表 |
| `handleRemove` | 删除文件 |
| `uploadError` | 上传失败处理 |
| `handleExceed` | 超出上传数量限制处理 |
| `handlePictureCardPreview` | 图片预览 |

## 注意事项

1. 组件依赖 Element Plus 的 `el-upload` 和 `el-image-viewer` 组件
2. 上传成功后，组件会自动更新 `fileList`
3. 当 `multiple` 为 `false` 时，`limit` 会被强制设置为 1
4. 支持自定义空状态和提示信息