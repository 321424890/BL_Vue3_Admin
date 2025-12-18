<template>
  <div class="file-upload-container">
    <el-upload
      :http-request="handleUpload"
      :file-list="fileList"
      :limit="limit"
      :accept="accept"
      :multiple="multiple"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :disabled="disabled"
      :drag="drag"
      class="file-upload"
    >
      <template v-if="drag">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <el-button type="primary" :disabled="disabled">
          <el-icon><Upload /></el-icon>
          {{ buttonText }}
        </el-button>
      </template>
      <template #tip>
        <div class="upload-tip" v-if="tip">
          {{ tip }}
        </div>
      </template>
    </el-upload>

    <!-- 文件列表展示 -->
    <div class="file-list-container" v-if="fileList.length > 0">
      <div
        v-for="(file, index) in fileList"
        :key="file.uid || index"
        class="file-item"
      >
        <div class="file-info">
          <el-icon class="file-icon" :class="getFileIconClass(file)">
            <Document v-if="!isImageFile(file)" />
            <Picture v-else />
          </el-icon>
          <div class="file-details">
            <div class="file-name" :title="file.name">{{ file.name }}</div>
            <div class="file-meta">
              <span class="file-size">{{ formatFileSize(file.size || 0) }}</span>
              <span class="file-status" :class="getStatusClass(file)">
                {{ getStatusText(file) }}
              </span>
            </div>
          </div>
        </div>
        <div class="file-actions">
          <el-button
            v-if="isImageFile(file) && file.url"
            type="info"
            size="small"
            circle
            @click="previewFile(file)"
            title="预览"
          >
            <el-icon><View /></el-icon>
          </el-button>
          <el-button
            v-if="file.url"
            type="primary"
            size="small"
            circle
            @click="downloadFile(file)"
            title="下载"
          >
            <el-icon><Download /></el-icon>
          </el-button>
          <el-button
            type="danger"
            size="small"
            circle
            @click="() => removeFile(file)"
            :disabled="disabled"
            title="删除"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" title="文件预览" width="800px" align-center>
      <div class="preview-container">
        <img v-if="previewImageUrl" :src="previewImageUrl" alt="预览" class="preview-image" />
        <div v-else class="preview-placeholder">
          <el-icon size="64"><Document /></el-icon>
          <p>该文件不支持预览</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { UploadUserFile, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import {
  Upload,
  UploadFilled,
  Document,
  Picture,
  View,
  Download,
  Delete,
} from "@element-plus/icons-vue";

interface Props {
  modelValue?: string | string[];
  limit?: number;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB
  disabled?: boolean;
  tip?: string;
  buttonText?: string;
  drag?: boolean;
  action?: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => "",
  limit: 10,
  accept: "",
  multiple: true,
  maxSize: 10,
  disabled: false,
  buttonText: "选择文件",
  drag: false,
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
      name: url.split("/").pop() || `file-${index}`,
      url: url,
      status: "success",
      size: 0,
    }));
  } else if (typeof value === "string") {
    fileList.value = [
      {
        uid: Date.now(),
        name: value.split("/").pop() || "file",
        url: value,
        status: "success",
        size: 0,
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

// 判断是否为图片文件
const isImageFile = (file: UploadUserFile) => {
  const name = file.name?.toLowerCase() || "";
  const url = (file as any).url || "";
  return (
    name.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) ||
    url.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)
  );
};

// 获取文件图标类
const getFileIconClass = (file: UploadUserFile) => {
  const name = file.name?.toLowerCase() || "";
  if (name.endsWith(".pdf")) return "file-pdf";
  if (name.match(/\.(doc|docx)$/)) return "file-word";
  if (name.match(/\.(xls|xlsx)$/)) return "file-excel";
  if (name.match(/\.(zip|rar|7z)$/)) return "file-zip";
  return "file-default";
};

// 获取状态类
const getStatusClass = (file: UploadUserFile) => {
  return {
    "status-success": file.status === "success",
    "status-uploading": file.status === "uploading",
    "status-fail": file.status === "fail",
  };
};

// 获取状态文本
const getStatusText = (file: UploadUserFile) => {
  if (file.status === "success") return "上传成功";
  if (file.status === "uploading") return "上传中...";
  if (file.status === "fail") return "上传失败";
  return "";
};

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 上传前校验
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  // 文件大小校验
  const maxSize = props.maxSize * 1024 * 1024;
  if (file.size > maxSize) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB`);
    return false;
  }

  // 文件类型校验
  if (props.accept) {
    const acceptTypes = props.accept.split(",").map((t) => t.trim());
    const fileType = file.type || "";
    const fileName = file.name.toLowerCase();

    const isValid = acceptTypes.some((acceptType) => {
      if (acceptType === "*/*") return true;
      if (acceptType.endsWith("/*")) {
        const baseType = acceptType.split("/")[0];
        return fileType.startsWith(baseType + "/");
      }
      return (
        fileType === acceptType ||
        fileName.endsWith(acceptType.replace("*", ""))
      );
    });

    if (!isValid) {
      ElMessage.error(`文件类型不符合要求，仅支持：${props.accept}`);
      return false;
    }
  }

  return true;
};

// 自定义上传处理
const handleUpload = async (options: any) => {
  const { file, onSuccess, onError } = options;
  
  try {
    // 模拟上传延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // 生成模拟的文件URL（使用本地预览URL）
    const fileUrl = URL.createObjectURL(file);
    
    // 模拟API响应
    const response = {
      url: fileUrl,
      code: 200,
      message: "上传成功",
    };
    
    onSuccess(response, file);
    
    // 更新文件列表中的URL
    const fileIndex = fileList.value.findIndex((f) => f.uid === file.uid);
    if (fileIndex !== -1) {
      fileList.value[fileIndex].url = fileUrl;
      fileList.value[fileIndex].status = "success";
    }

    // 更新表单值
    const currentValue = props.modelValue;
    if (props.multiple) {
      if (Array.isArray(currentValue)) {
        updateValue([...currentValue, fileUrl]);
      } else if (currentValue) {
        updateValue([currentValue, fileUrl]);
      } else {
        updateValue([fileUrl]);
      }
    } else {
      updateValue(fileUrl);
    }

    ElMessage.success("上传成功");
  } catch (error) {
    onError(error);
    ElMessage.error("上传失败，请重试");
  }
};

// 移除文件的通用逻辑
const removeFileFromList = (file: UploadUserFile) => {
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

  // 从文件列表中移除
  const index = fileList.value.findIndex((f) => f.uid === file.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }

  ElMessage.success("已移除文件");
};

// 移除文件（用于 el-upload 的 on-remove）
const handleRemove: UploadProps["onRemove"] = (file) => {
  removeFileFromList(file);
};

// 移除文件（用于文件列表中的删除按钮）
const removeFile = (file: UploadUserFile) => {
  removeFileFromList(file);
};

// 预览文件
const previewFile = (file: UploadUserFile) => {
  const fileUrl = (file as any).url || "";
  if (isImageFile(file) && fileUrl) {
    previewImageUrl.value = fileUrl;
    previewVisible.value = true;
  } else {
    ElMessage.info("该文件类型不支持预览");
  }
};

// 下载文件
const downloadFile = (file: UploadUserFile) => {
  const fileUrl = (file as any).url || "";
  if (fileUrl) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = file.name || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// 超出限制
const handleExceed: UploadProps["onExceed"] = () => {
  ElMessage.warning(`最多只能上传 ${props.limit} 个文件`);
};
</script>

<style scoped lang="scss">
.file-upload-container {
  width: 100%;

  .file-upload {
    :deep(.el-upload) {
      width: 100%;
    }

    :deep(.el-upload-dragger) {
      width: 100%;
      border: 2px dashed var(--el-border-color);
      border-radius: 8px;
      background-color: var(--el-fill-color-lighter);
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
      }

      .el-icon--upload {
        font-size: 48px;
        color: var(--el-text-color-secondary);
        margin-bottom: 16px;
        transition: color 0.3s ease;
      }

      &:hover .el-icon--upload {
        color: var(--el-color-primary);
      }

      .el-upload__text {
        color: var(--el-text-color-regular);
        font-size: 14px;

        em {
          color: var(--el-color-primary);
          font-style: normal;
        }
      }
    }

    :deep(.el-upload-list) {
      margin-top: 12px;
    }
  }

  .upload-tip {
    margin-top: 8px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
    line-height: 1.5;
  }

  .file-list-container {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--el-bg-color);
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--el-color-primary);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transform: translateY(-1px);
      }

      .file-info {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;

        .file-icon {
          font-size: 32px;
          margin-right: 12px;
          flex-shrink: 0;

          &.file-pdf {
            color: #f40;
          }

          &.file-word {
            color: #2b579a;
          }

          &.file-excel {
            color: #1d6f42;
          }

          &.file-zip {
            color: #ff9800;
          }

          &.file-default {
            color: var(--el-text-color-secondary);
          }
        }

        .file-details {
          flex: 1;
          min-width: 0;

          .file-name {
            font-size: 14px;
            color: var(--el-text-color-primary);
            margin-bottom: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .file-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 12px;

            .file-size {
              color: var(--el-text-color-secondary);
            }

            .file-status {
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 11px;

              &.status-success {
                background-color: var(--el-color-success-light-9);
                color: var(--el-color-success);
              }

              &.status-uploading {
                background-color: var(--el-color-warning-light-9);
                color: var(--el-color-warning);
              }

              &.status-fail {
                background-color: var(--el-color-error-light-9);
                color: var(--el-color-error);
              }
            }
          }
        }
      }

      .file-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
    }
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

    .preview-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-text-color-secondary);

      p {
        margin-top: 16px;
        font-size: 14px;
      }
    }
  }
}
</style>
