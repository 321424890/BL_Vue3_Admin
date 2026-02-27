<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalImage 组件</h1>
        <p class="page-description">基于 Element Plus 上传组件的二次封装，提供单图片和多图片上传功能</p>
      </div>
    </div>
    <!-- 单图片上传使用案例 -->
    <el-row :gutter="24">
      <el-col :xs="24">
        <div class="input-group">
          <h3>单图片上传使用案例</h3>
          <div class="demo-section">
            <h4>基础用法</h4>
            <CrystalImage
              v-model:image-url="singleImage"
              :api="uploadApi"
              :width="'200px'"
              :height="'200px'"
              :border-radius="'8px'"
              :drag="true"
              :disabled="false"
              :file-size="5"
              :file-type="['image/jpeg', 'image/png', 'image/gif']"
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

          <div class="demo-section">
            <h4>自定义样式</h4>
            <CrystalImage
              v-model:image-url="customImage"
              :api="uploadApi"
              :width="'300px'"
              :height="'200px'"
              :border-radius="'12px'"
              :wrapper-style="{ borderColor: '#1890ff', focusBorderColor: '#52c41a' }"
            >
              <template #empty>
                <el-icon><Upload /></el-icon>
                <span>拖拽上传图片</span>
              </template>
            </CrystalImage>
          </div>

          <div class="demo-section">
            <h4>禁用状态</h4>
            <CrystalImage
              v-model:image-url="disabledImage"
              :api="uploadApi"
              :disabled="true"
              :width="'200px'"
              :height="'200px'"
            />
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 单图片上传组件属性表格 -->
    <el-row :gutter="24">
      <el-col :xs="24">
        <div class="input-group">
          <h3>CrystalImage 单图片上传组件属性</h3>
          <BasicTable
            :table-data="singleImagePropsTableData"
            :columns="propsColumns"
            basic-height="400px"
            :border="true"
            :stripe="true"
            :show-pagination="false"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 多图片上传使用案例 -->
    <el-row :gutter="24">
      <el-col :xs="24">
        <div class="input-group">
          <h3>多图片上传使用案例</h3>
          <div class="demo-section">
            <h4>基础用法</h4>
            <CrystalImages
              v-model:file-list="multipleImages"
              :api="uploadApi"
              :limit="3"
              :multiple="true"
              :file-size="2"
              :file-type="['image/jpeg', 'image/png']"
              :width="'200px'"
              :height="'200px'"
              :border-radius="'12px'"
              :drag="false"
              @upload-success="onUploadSuccess"
              @upload-error="onUploadError"
              @remove="onRemove"
            >
              <template #empty>
                <div style="color: #999">点击上传图片</div>
              </template>
              <template #tip>
                <div>支持 jpg/png 格式，单张不超过 2MB</div>
              </template>
            </CrystalImages>
          </div>

          <div class="demo-section">
            <h4>拖拽上传</h4>
            <CrystalImages
              v-model:file-list="dragImages"
              :api="uploadApi"
              :limit="5"
              :drag="true"
              :width="'150px'"
              :height="'150px'"
            />
          </div>

          <div class="demo-section">
            <h4>单选模式</h4>
            <CrystalImages
              v-model:file-list="singleSelectImages"
              :api="uploadApi"
              :multiple="false"
              :limit="1"
              :width="'200px'"
              :height="'200px'"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 多图片上传组件属性表格 -->
    <el-row :gutter="24">
      <el-col :xs="24">
        <div class="input-group">
          <h3>CrystalImageImages 多图片上传组件属性</h3>
          <BasicTable
            :table-data="multiImagePropsTableData"
            :columns="propsColumns"
            basic-height="400px"
            :border="true"
            :stripe="true"
            :show-pagination="false"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { CrystalImages, CrystalImage } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import { Plus, Upload } from "@element-plus/icons-vue"

// 单图片上传示例数据
const singleImage = ref("")
const customImage = ref("")
const disabledImage = ref("")

// 多图片上传示例数据
const multipleImages = ref([])
const dragImages = ref([])
const singleSelectImages = ref([])

// 模拟上传接口
const uploadApi = async formData => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: { fileUrl: URL.createObjectURL(formData.get("file")) }
      })
    }, 1000)
  })
}

// 上传成功回调
const onUploadSuccess = (response, file) => {
  console.log("上传成功", response, file)
}

// 上传失败回调
const onUploadError = (error, file) => {
  console.error("上传失败", error, file)
}

// 删除文件回调
const onRemove = file => {
  console.log("删除文件", file)
}

// 单图片上传组件属性表格数据
const singleImagePropsTableData = [
  { prop: "imageUrl", description: "图片地址，支持 v-model 双向绑定", type: "String", default: "''" },
  { prop: "api", description: "上传图片的 API 方法", type: "Function", default: "必填" },
  { prop: "drag", description: "是否支持拖拽上传", type: "Boolean", default: "true" },
  { prop: "disabled", description: "是否禁用上传组件", type: "Boolean", default: "false" },
  { prop: "fileSize", description: "图片大小限制（MB）", type: "Number", default: "5" },
  { prop: "fileType", description: "图片类型限制", type: "String[]", default: "['image/jpeg', 'image/png', 'image/gif']" },
  { prop: "height", description: "组件高度", type: "String", default: "'150px'" },
  { prop: "width", description: "组件宽度", type: "String", default: "'150px'" },
  { prop: "borderRadius", description: "组件边框圆角", type: "String", default: "'8px'" },
  { prop: "wrapperStyle", description: "组件样式配置", type: "Object", default: "{}" }
]

// 多图片上传组件属性表格数据
const multiImagePropsTableData = [
  { prop: "fileList", description: "绑定的文件列表，支持 v-model 双向绑定", type: "UploadUserFile[]", default: "[]" },
  { prop: "api", description: "上传接口函数", type: "Function", default: "必填" },
  { prop: "drag", description: "是否开启拖拽上传", type: "Boolean", default: "true" },
  { prop: "disabled", description: "是否禁用上传", type: "Boolean", default: "false" },
  { prop: "limit", description: "最大上传数量", type: "Number", default: "5" },
  { prop: "multiple", description: "是否支持多选上传", type: "Boolean", default: "true" },
  { prop: "fileSize", description: "单个文件大小限制（MB）", type: "Number", default: "5" },
  {
    prop: "fileType",
    description: "支持的图片类型",
    type: "ImageMimeType[]",
    default: "['image/jpeg', 'image/png', 'image/gif']"
  },
  { prop: "height", description: "上传区域高度", type: "String", default: "'150px'" },
  { prop: "width", description: "上传区域宽度", type: "String", default: "'150px'" },
  { prop: "borderRadius", description: "上传区域圆角", type: "String", default: "'8px'" }
]

// 属性表格列
const propsColumns = [
  { label: "属性", prop: "prop", width: "150" },
  { label: "描述", prop: "description" },
  { label: "类型", prop: "type", width: "100" },
  { label: "默认值", prop: "default", width: "200" }
]
</script>

<style scoped>
.pageWrap {
  padding: 20px;
}

/* 页面头部样式 */
.page-header {
  padding: 30px 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: #303133;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page-description {
  color: #606266;
  font-size: 16px;
  margin: 0;
}

/* 示例组样式 */
.input-group {
  width: 100%;
  margin-bottom: 24px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.input-group:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #e6f7ff;
}

.demo-section {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
}

.demo-section h4 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}
</style>
