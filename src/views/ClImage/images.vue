<template>
  <div class="pageWrap">
    <div class="pageTitle">CrystalImages 多图上传组件</div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="card">
          <div class="cardTitle">基本用法</div>
          <div class="cardContent">
            <CrystalImages
              v-model="fileList"
              :api="uploadApi"
              :limit="5"
              :multiple="true"
              :disabled="false"
              :file-size="5"
              :accept="'.jpg,.jpeg,.png,.gif'"
              :show-file-list="true"
              :list-type="'picture-card'"
              @success="onUploadSuccess"
              @error="onUploadError"
              @remove="onRemove"
            />
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="card">
          <div class="cardTitle">禁用状态</div>
          <div class="cardContent">
            <CrystalImages v-model="fileList" :api="uploadApi" :disabled="true" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="card">
          <div class="cardTitle">限制上传数量</div>
          <div class="cardContent">
            <CrystalImages v-model="fileList" :api="uploadApi" :limit="3" />
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="card">
          <div class="cardTitle">自定义上传按钮</div>
          <div class="cardContent">
            <CrystalImages v-model="fileList" :api="uploadApi">
              <template #trigger>
                <el-button type="primary">点击上传图片</el-button>
              </template>
            </CrystalImages>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="card" style="margin-top: 20px">
      <div class="cardTitle">属性表格</div>
      <div class="cardContent">
        <BasicTable :columns="columns" :table-data="tableData" :pagination="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { CrystalImages } from "crystal-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 模拟文件列表
const fileList = ref([])

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

// 表格列配置
const columns = [
  { prop: "prop", label: "属性名", width: 200 },
  { prop: "type", label: "类型", width: 150 },
  { prop: "default", label: "默认值", width: 150 },
  { prop: "description", label: "说明" }
]

// 表格数据
const tableData = [
  { prop: "v-model", type: "UploadUserFile[]", default: "[]", description: "绑定的文件列表" },
  { prop: "api", type: "(formData: FormData) => Promise<{ fileUrl: string }>", default: "必填", description: "上传接口函数" },
  { prop: "limit", type: "number", default: "5", description: "最大上传数量" },
  { prop: "multiple", type: "boolean", default: "true", description: "是否支持多选上传" },
  { prop: "disabled", type: "boolean", default: "false", description: "是否禁用上传组件" },
  { prop: "fileSize", type: "number", default: "5", description: "图片大小限制（MB）" },
  { prop: "accept", type: "string", default: "'.jpg,.jpeg,.png,.gif'", description: "接受的文件类型" },
  { prop: "show-file-list", type: "boolean", default: "true", description: "是否显示已上传文件列表" },
  { prop: "list-type", type: "string", default: "'picture-card'", description: "文件列表的类型" },
  { prop: "drag", type: "boolean", default: "true", description: "是否支持拖拽上传" },
  { prop: "action", type: "string", default: "''", description: "上传的地址" },
  { prop: "headers", type: "object", default: "{}", description: "设置上传的请求头部" },
  { prop: "data", type: "object", default: "{}", description: "上传时附带的额外参数" },
  { prop: "name", type: "string", default: "'file'", description: "上传的文件字段名" },
  { prop: "with-credentials", type: "boolean", default: "false", description: "支持发送 cookie 凭证信息" },
  {
    prop: "before-upload",
    type: "(file: File) => boolean | Promise<boolean>",
    default: "null",
    description: "上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传"
  },
  {
    prop: "before-remove",
    type: "(file: UploadUserFile, fileList: UploadUserFile[]) => boolean | Promise<boolean>",
    default: "null",
    description: "删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除"
  },
  {
    prop: "on-exceed",
    type: "(files: File[], fileList: UploadUserFile[]) => void",
    default: "null",
    description: "文件超出个数限制时的钩子"
  },
  {
    prop: "file-list",
    type: "UploadUserFile[]",
    default: "[]",
    description:
      '上传的文件列表, 例如: [{name: "food.jpg", url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]'
  },
  {
    prop: "http-request",
    type: "(options: UploadHttpRequestOptions) => Promise<any>",
    default: "null",
    description: "覆盖默认的上传行为，可以自定义上传的实现"
  },
  { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
  { prop: "limit", type: "number", default: "null", description: "最大允许上传个数" },
  {
    prop: "on-exceed",
    type: "(files: File[], fileList: UploadUserFile[]) => void",
    default: "null",
    description: "文件超出个数限制时的钩子"
  }
]
</script>

<style scoped>
.pageWrap {
  padding: 20px;
}

.pageTitle {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #303133;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.cardTitle {
  font-size: 18px;
  font-weight: 600;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  color: #303133;
}

.cardContent {
  padding: 20px;
}
</style>
