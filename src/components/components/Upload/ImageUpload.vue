<template>
  <div class="image-upload-container">
    <el-upload
      :http-request="handleUpload"
      :file-list="fileList"
      :limit="limit"
      :accept="accept"
      :multiple="multiple"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :disabled="disabled"
      class="image-upload"
    >
      <el-icon v-if="!disabled"><Plus /></el-icon>
      <template #tip>
        <div class="upload-tip" v-if="tip">
          {{ tip }}
        </div>
      </template>
    </el-upload>
    
    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" title="图片预览" width="800px" align-center>
      <div class="preview-container">
        <img :src="previewImageUrl" alt="预览图片" class="preview-image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { UploadUserFile, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

interface Props {
  modelValue?: string | string[];
  limit?: number;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB
  disabled?: boolean;
  tip?: string;
  action?: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => "",
  limit: 9,
  accept: "image/*",
  multiple: true,
  maxSize: 10,
  disabled: false,
  action: "",
  headers: () => ({}),
  data: () => ({}),
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
  change: [value: string | string[]];
}>();

// 文件列表
const fileList = ref<UploadUserFile[]>([]);

// 预览相关
const previewVisible = ref(false);
const previewImageUrl = ref("");

// 初始化文件列表
const initFileList = () => {
  const value = props.modelValue;
  if (!value) {
    fileList.value = [];
    return;
  }

  if (Array.isArray(value)) {
    fileList.value = value.map((url, index) => ({
      uid: Date.now() + index,
      name: url.split("/").pop() || `image-${index}`,
      url: url,
      status: "success",
    }));
  } else if (typeof value === "string") {
    fileList.value = [
      {
        uid: Date.now(),
        name: value.split("/").pop() || "image",
        url: value,
        status: "success",
      },
    ];
  }
};

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  () => {
    initFileList();
  },
  { immediate: true, deep: true }
);

// 更新值
const updateValue = (urls: string | string[]) => {
  emit("update:modelValue", urls);
  emit("change", urls);
};

// 上传前校验
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  // 文件大小校验
  const maxSize = props.maxSize * 1024 * 1024;
  if (file.size > maxSize) {
    ElMessage.error(`图片大小不能超过 ${props.maxSize}MB`);
    return false;
  }

  // 文件类型校验
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    ElMessage.error("只能上传图片文件");
    return false;
  }

  return true;
};

// 自定义上传处理
const handleUpload = async (options: any) => {
  const { file, onSuccess, onError } = options;
  
  try {
    // 模拟上传延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // 生成模拟的图片URL（使用本地预览URL）
    const imageUrl = URL.createObjectURL(file);
    
    // 模拟API响应
    const response = {
      url: imageUrl,
      code: 200,
      message: "上传成功",
    };
    
    onSuccess(response, file);
    
    // 更新文件列表中的URL
    const fileIndex = fileList.value.findIndex((f) => f.uid === file.uid);
    if (fileIndex !== -1) {
      fileList.value[fileIndex].url = imageUrl;
      fileList.value[fileIndex].status = "success";
    }

    // 更新表单值
    const currentValue = props.modelValue;
    if (props.multiple) {
      if (Array.isArray(currentValue)) {
        updateValue([...currentValue, imageUrl]);
      } else if (currentValue) {
        updateValue([currentValue, imageUrl]);
      } else {
        updateValue([imageUrl]);
      }
    } else {
      updateValue(imageUrl);
    }

    ElMessage.success("上传成功");
  } catch (error) {
    onError(error);
    ElMessage.error("上传失败，请重试");
  }
};

// 移除文件
const handleRemove: UploadProps["onRemove"] = (file) => {
  const fileUrl = (file as any).url || "";
  const currentValue = props.modelValue;

  if (props.multiple) {
    if (Array.isArray(currentValue)) {
      const newValue = currentValue.filter((url) => url !== fileUrl);
      updateValue(newValue.length > 0 ? newValue : []);
    } else if (currentValue === fileUrl) {
      updateValue([]);
    }
  } else {
    updateValue("");
  }

  ElMessage.success("已移除图片");
};

// 预览图片
const handlePreview: UploadProps["onPreview"] = (file) => {
  const fileUrl = (file as any).url || "";
  if (fileUrl) {
    previewImageUrl.value = fileUrl;
    previewVisible.value = true;
  }
};

// 超出限制
const handleExceed: UploadProps["onExceed"] = () => {
  ElMessage.warning(`最多只能上传 ${props.limit} 张图片`);
};
</script>

<style scoped lang="scss">
.image-upload-container {
  width: 100%;

  .image-upload {
    :deep(.el-upload) {
      border: 2px dashed var(--el-border-color);
      border-radius: 8px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
      }

      .el-icon {
        font-size: 28px;
        color: var(--el-text-color-secondary);
        transition: color 0.3s ease;
      }

      &:hover .el-icon {
        color: var(--el-color-primary);
      }
    }

    :deep(.el-upload-list--picture-card) {
      .el-upload-list__item {
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
        border: 1px solid var(--el-border-color-lighter);

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .el-upload-list__item-thumbnail {
          object-fit: cover;
        }

        .el-upload-list__item-actions {
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);

          .el-upload-list__item-preview,
          .el-upload-list__item-delete {
            color: #fff;
            transition: all 0.3s ease;

            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }

  .upload-tip {
    margin-top: 8px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
    line-height: 1.5;
  }

  .preview-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 8px;
    padding: 20px;

    .preview-image {
      max-width: 100%;
      max-height: 600px;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      object-fit: contain;
    }
  }
}
</style>
