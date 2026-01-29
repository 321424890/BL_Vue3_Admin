<template>
  <!-- 可换成el-dialog -->
  <el-dialog v-model="props.visible" :title="props.title" :close-on-click-modal="false" size="55%" @close="closeDrawer">
    <div>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <template v-for="item in dialogFormConfig" :key="item.prop" style="padding-right: 32px !important">
            <el-col :xs="24" :sm="item.type === 'el-upload-image' ? 24 : 12" :md="item.type === 'el-upload-image' ? 24 : 12">
              <el-form-item :label="item.label" :prop="item.prop" :required="item.required">
                <!-- 输入框 @input="val => handleFieldChange(item, val)" -->
                <!-- :readonly="item.readonly === true"          readonly: true,  // 禁止键盘输入，只读，需点击弹出选择框 -->
                <el-input
                  v-if="item.type === 'el-input'"
                  v-model="formData[item.prop]"
                  v-bind="item.props"
                  :readonly="item.readonly === true"
                  clearable
                  @click="item.readonly === true ? handleFieldclick(item) : null"
                />
                <!-- 下拉框 -->
                <el-select
                  v-else-if="item.type === 'el-select'"
                  v-model="formData[item.prop]"
                  v-bind="item.props || {}"
                  clearable
                  filterable
                  remote
                  :loading="item.props?.loading"
                  @change="val => handleFieldChange(item, val)"
                  @remote-search="(query: string) => handleRemoteSearch(item, query)"
                >
                  <el-option
                    v-for="option in item.props?.options || []"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <!-- 日期选择器 -->
                <el-date-picker
                  v-else-if="item.type === 'el-date-picker'"
                  v-model="formData[item.prop]"
                  v-bind="item.props"
                  range-separator="To"
                  start-placeholder="Start Year"
                  end-placeholder="End Year"
                  clearable
                  @change="(val: any) => handleFieldChange(item, val)"
                />

                <!-- 数字输入框 -->
                <el-input-number v-else-if="item.type === 'el-input-number'" v-model="formData[item.prop]" v-bind="item.props" />
                <!-- 开关 -->
                <el-switch v-else-if="item.type === 'el-switch'" v-model="formData[item.prop]" v-bind="item.props" />
                <!-- 图片上传 -->
                <ImageUpload
                  v-else-if="item.type === 'el-upload-image'"
                  v-model="formData[item.prop]"
                  :limit="item.props?.limit || 9"
                  :accept="item.props?.accept || 'image/*'"
                  :multiple="item.props?.multiple !== false"
                  :max-size="item.props?.maxSize || 10"
                  :disabled="item.props?.disabled || false"
                  :tip="item.props?.tip"
                  :action="item.props?.action"
                  :headers="item.props?.headers"
                  :data="item.props?.data"
                  @change="val => handleFieldChange(item, val)"
                />
                <!-- 附件上传 -->
                <FileUpload
                  v-else-if="item.type === 'el-upload-file'"
                  v-model="formData[item.prop]"
                  :limit="item.props?.limit || 10"
                  :accept="item.props?.accept"
                  :multiple="item.props?.multiple !== false"
                  :max-size="item.props?.maxSize || 10"
                  :disabled="item.props?.disabled || false"
                  :tip="item.props?.tip"
                  :button-text="item.props?.buttonText || '选择文件'"
                  :drag="item.props?.drag || false"
                  :action="item.props?.action"
                  :headers="item.props?.headers"
                  :data="item.props?.data"
                  @change="val => handleFieldChange(item, val)"
                />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <div class="drawer-footer">
        <el-button @click="closeDrawer">关闭</el-button>
        <el-button v-if="title !== '详情'" type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import type { FormConfigItem } from "../hook/types"
import ImageUpload from "../Upload/ImageUpload.vue"
import FileUpload from "../Upload/FileUpload.vue"
// ... 其他引入
// 定义 props 的类型
interface Props {
  title: string
  visible: boolean
  formData: Record<string, any>
  dialogFormConfig: FormConfigItem[]
  columns: any[]
}

const props = withDefaults(defineProps<Props>(), {
  formData: () => ({})
})

const emit = defineEmits<{
  "update:visible": [value: boolean]
  confirm: [data: Record<string, any>]
}>()

const formRef = ref<FormInstance>()
const rules = ref<FormRules>({})

// 直接解构响应式引用
const { formData } = toRefs(props)

// 处理字段变化，支持联动
const handleFieldChange = (_item: FormConfigItem, _val: any) => {
  //  console.log('item',item,val)
}

const handleFieldclick = (item: FormConfigItem, _event?: Event) => {
  console.log("弹出选择框，字段:", item.prop)
}

const handleRemoteSearch = (item: FormConfigItem, query: string) => {
  // 远程搜索处理
  console.log("远程搜索:", item.prop, query)
}

const closeDrawer = () => {
  emit("update:visible", false)
  formRef.value?.resetFields() // 重置表单的验证状态
}

// 确认按钮
const confirm = async () => {
  if (!formRef.value) return

  const valid = await formRef.value.validate()
  if (valid) {
    emit("confirm", formData.value)
    closeDrawer()
  } else {
    console.log("表单验证失败")
  }
}
</script>

<style scoped>
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
