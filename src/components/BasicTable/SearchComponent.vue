<template>
  <div class="searchHeader" :style="{ height: computedHeight }">
    <el-form ref="formRef" :model="formData" :inline="true" :rules="formRules" class="form-container">
      <template v-for="(queryItem, index) in displayedQueryConfig" :key="index">
        <el-form-item
          v-if="queryItem.label"
          :label="queryItem.label"
          :prop="queryItem.prop"
          :required="queryItem.required"
          class="form-item"
        >
          <el-input
            v-if="queryItem.type === 'el-input'"
            v-model="formData[queryItem.prop]"
            :placeholder="queryItem.props.placeholder || ''"
            :style="{ width: queryItem.width || '200px' }"
            :disabled="queryItem.disabled"
            :readonly="queryItem.readonly"
            v-bind="queryItem.props"
            clearable
            @click="handleFieldClick(queryItem)"
            @input="val => handleFieldChange(queryItem, val)"
          />
          <el-select
            v-if="queryItem.type === 'el-select'"
            v-model="formData[queryItem.prop]"
            :placeholder="queryItem.props.placeholder || ''"
            :style="{ width: queryItem.width || '200px' }"
            :disabled="queryItem.disabled"
            v-bind="queryItem.props"
            clearable
            filterable
            remote
            :loading="queryItem.props.loading"
            @change="val => handleFieldChange(queryItem, val)"
            @remote-search="query => handleRemoteSearch(queryItem, query)"
          >
            <el-option
              v-for="option in queryItem.props.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-date-picker
            v-if="queryItem.type === 'el-date-picker'"
            v-model="formData[queryItem.prop]"
            :placeholder="queryItem.props.placeholder || ''"
            :style="{ width: queryItem.width || '200px' }"
            type="date"
            :disabled="queryItem.disabled"
            v-bind="queryItem.props"
            clearable
            @change="val => handleFieldChange(queryItem, val)"
          />
          <el-input-number
            v-if="queryItem.type === 'el-input-number'"
            v-model="formData[queryItem.prop]"
            :placeholder="queryItem.props.placeholder || ''"
            :style="{ width: queryItem.width || '200px' }"
            :disabled="queryItem.disabled"
          />
          <el-switch
            v-if="queryItem.type === 'el-switch'"
            v-model="formData[queryItem.prop]"
            :active-text="queryItem.props.activeText"
            :inactive-text="queryItem.props.inactiveText"
            :disabled="queryItem.disabled"
          />
        </el-form-item>
      </template>
      <el-form-item class="button-container">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button class="btn" @click="handleReset">重置</el-button>
        <!-- <el-button v-if="isExpandable && isExpanded" @click="toggleExpand">收起</el-button>
        <el-button v-if="isExpandable && !isExpanded" @click="toggleExpand">展开</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, computed, Ref } from "vue"
import { QueryItem } from "./hook/types"
import "./hook/css/index.css"

const props = defineProps<{
  queryConfig: QueryItem[]
}>()
const emit = defineEmits()

const formData = ref<Record<string, any>>({})
const formRules = ref<Record<string, any>>({})
const formRef = ref()
const isExpanded = ref(false)

/**
 * 初始化表单数据
 */
const initFormData = (): void => {
  props.queryConfig.forEach(queryItem => {
    formData.value[queryItem.prop] = queryItem.value || ""
    if (queryItem.onChange && queryItem.value) {
      queryItem.onChange(queryItem.value)
    }
  })
}

onMounted(() => {
  initFormData()
})

// 展示的查询配置（如有展开收起功能可切换）
const displayedQueryConfig = props.queryConfig

const isExpandable = computed<boolean>(() => {
  return props.queryConfig.length > 4
})

const computedHeight = computed<string>(() => {
  return isExpanded.value ? "auto" : "auto"
})
function handleFieldClick(queryItem: QueryItem) {
  console.log("queryItem", queryItem)
  if (queryItem.readonly === true) {
    emit("field-click", queryItem)
  }
}
/**
 * 日期格式化
 */
const formatDate = (date: any): string => {
  if (!date) return ""
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * 查询按钮事件
 */
const handleSearch = async (): Promise<void> => {
  formRules.value = {}
  props.queryConfig.forEach(queryItem => {
    if (queryItem.required) {
      formRules.value[queryItem.prop] = [
        {
          required: true,
          message: `${queryItem.label} 为必填项`,
          trigger: "blur"
        }
      ]
    }
  })
  const valid = await new Promise<boolean>(resolve => {
    ;(formRef.value as any).validate((valid: boolean) => {
      resolve(valid)
    })
  })
  if (!valid) return
  const searchParams: Record<string, any> = {}
  props.queryConfig.forEach(queryItem => {
    const key = queryItem.prop
    if (queryItem.type === "el-date-picker") {
      searchParams[key] = formatDate(formData.value[key])
    } else {
      searchParams[key] = formData.value[key] !== undefined ? formData.value[key] : ""
    }
  })
  emit("search", { ...searchParams })
}

/**
 * 重置按钮事件
 */
const handleReset = (): void => {
  initFormData()
  emit("reset", { ...formData.value })
}

const toggleExpand = (): void => {
  isExpanded.value = !isExpanded.value
}

const handleFieldChange = (queryItem: QueryItem, val: any): void => {
  if (queryItem.onChange) {
    queryItem.onChange(val)
  }
}

const handleRemoteSearch = async (queryItem: QueryItem, query: any): Promise<void> => {
  if (queryItem.onRemoteSearch) {
    queryItem.props = queryItem.props || {}
    queryItem.props.loading = true
    try {
      await queryItem.onRemoteSearch(query)
    } finally {
      queryItem.props.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
