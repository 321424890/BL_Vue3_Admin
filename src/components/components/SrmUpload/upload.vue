<template>
	<el-dialog v-model="dialogVisible" :align-center="true" title="文件上传" width="700px" :close-on-click-modal="false" @close="handleClose">
		<div class="upload-container">
			<!-- 上传区域 -->
			<div class="upload-area" @click="triggerFileInput" @drop="handleDrop" @dragover.prevent>
				<div v-if="importFormData.files.length === 0" class="upload-content">
					<div class="upload-icon">
						<el-icon size="48" color="#409eff"><upload-filled /></el-icon>
					</div>
					<div class="upload-text">
						<p class="upload-title">点击或拖拽文件到此处上传</p>
						<!-- <p class="upload-desc">支持多个文件，单个文件不超过10MB</p> -->
					</div>
				</div>

				<!-- 文件列表 -->
				<div v-else class="file-list">
					<div v-for="(file, index) in importFormData.files" :key="index" class="file-item">
						<div class="file-info">
							<el-icon class="file-icon"><document /></el-icon>
							<div class="file-details">
								<div class="file-name">{{ file.name }}</div>
								<div class="file-size">{{ formatFileSize(file.size) }}</div>
							</div>
						</div>
						<div class="file-actions">
							<el-button type="info" size="small" circle class="preview-btn" title="预览" @click.stop="previewFile(file)">
								<el-icon><Pointer /></el-icon>
							</el-button>
							<el-button type="danger" size="small" circle class="remove-btn" title="删除" @click.stop="removeFile(index)">
								<el-icon><delete /></el-icon>
							</el-button>
						</div>
					</div>
				</div>
			</div>

			<!-- 隐藏的文件输入 -->
			<input ref="fileInput" type="file" multiple accept="application/pdf" style="display: none" @change="handleFileChange" />

			<!-- 添加更多文件按钮 -->
			<div v-if="importFormData.files.length > 0" class="add-more">
				<el-button type="primary" @click="triggerFileInput">
					<el-icon><plus /></el-icon>
					添加更多文件
				</el-button>
			</div>
		</div>

		<template #footer>
			<div class="dialog-footer" style="margin-bottom: 30px">
				<el-button @click="handleClose">取消</el-button>
				<el-button type="primary" :disabled="importFormData.files.length === 0 || uploadStatus" :loading="uploading" @click="handleSubmit">
					{{ uploading ? '上传中...' : '开始上传' }}
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { type UploadUserFile } from 'element-plus'
import { computed, ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled, Document, Delete, Plus, View, Download, Pointer } from '@element-plus/icons-vue'
// 引入全局上传样式
import '@/styles/uploadcss.css'
const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	},
	fileList: {
		type: Array,
		default: () => []
	},
	uploadStatus: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:visible', 'import-success', 'update:file-list'])

const dialogVisible = computed({
	get: () => props.visible,
	set: val => {
		emit('update:visible', val)
	}
})

const fileInput = ref<HTMLInputElement>()
const uploading = ref(false)

const importFormData = reactive<{
	files: UploadUserFile[]
}>({
	files: []
})

// 弹窗打开时同步父组件传入的文件列表
watch(
	() => props.fileList,
	val => {
		importFormData.files = val ? [...val] : []
	},
	{ immediate: true }
)

// 文件列表变化时同步到父组件
watch(
	() => importFormData.files,
	val => {
		emit('update:file-list', val)
	},
	{ deep: true }
)

// 触发文件选择器点击事件
const triggerFileInput = () => {
	fileInput.value?.click() // 模拟点击隐藏的文件输入框
}

// 处理文件选择变化事件
const handleFileChange = (event: Event) => {
	const target = event.target as HTMLInputElement // 获取文件输入元素
	if (target.files) {
		// 只保留pdf文件
		const newFiles = Array.from(target.files)
			.filter(file => {
				if (!file.name.toLowerCase().endsWith('.pdf')) {
					ElMessage.warning(`只允许上传PDF文件，已过滤：${file.name}`)
					return false
				}
				return true
			})
			.map(file => ({
				name: file.name, // 文件名
				size: file.size, // 文件大小
				raw: file, // 原始文件对象
				uid: Date.now() + Math.random() // 生成唯一ID
			}))

		// 检查文件大小限制 (10MB)
		const validFiles = newFiles.filter(file => {
			if (file.size > 10 * 1024 * 1024) {
				ElMessage.warning(`文件 ${file.name} 超过10MB限制`) // 显示警告消息
				return false // 过滤掉超大文件
			}
			return true // 保留符合大小限制的文件
		})

		importFormData.files.push(...validFiles) // 将有效文件添加到文件列表
	}
	// 清空input值，允许重复选择相同文件
	target.value = ''
}

// 处理拖拽文件事件
const handleDrop = (event: DragEvent) => {
	event.preventDefault() // 阻止默认行为
	if (event.dataTransfer?.files) {
		// 只保留pdf文件
		const newFiles = Array.from(event.dataTransfer.files)
			.filter(file => {
				if (!file.name.toLowerCase().endsWith('.pdf')) {
					ElMessage.warning(`只允许上传PDF文件，已过滤：${file.name}`)
					return false
				}
				return true
			})
			.map(file => ({
				name: file.name, // 文件名
				size: file.size, // 文件大小
				raw: file, // 原始文件对象
				uid: Date.now() + Math.random() // 生成唯一ID
			}))

		// 检查文件大小限制
		const validFiles = newFiles.filter(file => {
			if (file.size > 10 * 1024 * 1024) {
				ElMessage.warning(`文件 ${file.name} 超过10MB限制`) // 显示警告消息
				return false // 过滤掉超大文件
			}
			return true // 保留符合大小限制的文件
		})

		importFormData.files.push(...validFiles) // 将有效文件添加到文件列表
	}
}

// 从文件列表中移除指定索引的文件
const removeFile = (index: number) => {
	importFormData.files.splice(index, 1) // 从数组中删除指定位置的文件
}

// 格式化文件大小显示
const formatFileSize = (bytes: number) => {
	if (bytes === 0) return '0 B' // 处理0字节的情况
	const k = 1024 // 进制基数
	const sizes = ['B', 'KB', 'MB', 'GB'] // 单位数组
	const i = Math.floor(Math.log(bytes) / Math.log(k)) // 计算单位级别
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] // 格式化显示
}

// 关闭弹窗并清理数据
const handleClose = () => {
	dialogVisible.value = false // 关闭弹窗
	importFormData.files = [] // 清空文件列表
	uploading.value = false // 重置上传状态
}

// 处理文件上传提交
const handleSubmit = async () => {
	if (!importFormData.files.length) {
		ElMessage.warning('请选择文件') // 提示用户选择文件
		return
	}

	uploading.value = true // 设置上传状态为true

	try {
		// 这里可以调用实际的上传API
		// for (const file of importFormData.files) {
		//   await uploadAPI.upload(file.raw as File);
		// }

		// 模拟上传延迟
		await new Promise(resolve => setTimeout(resolve, 1500))

		ElMessage.success(`成功上传 ${importFormData.files.length} 个文件`) // 显示成功消息
		emit('import-success', importFormData.files) // 触发上传成功事件
		handleClose() // 关闭弹窗
	} catch (error) {
		console.log(error) // 记录错误信息
		ElMessage.error('上传失败') // 显示错误消息
	} finally {
		uploading.value = false // 重置上传状态
	}
}

// 智能预览文件：能预览就预览，不能预览就下载
const previewFile = (file: any) => {
	const url = URL.createObjectURL(file.raw as File) // 创建文件URL
	const fileName = file.name.toLowerCase() // 获取小写文件名

	// 判断文件类型 - 定义可以预览的文件扩展名
	const canPreview = [
		'.jpg',
		'.jpeg',
		'.png',
		'.gif',
		'.bmp',
		'.webp', // 图片格式
		'.pdf', // PDF格式
		'.txt',
		'.md',
		'.html',
		'.css',
		'.js',
		'.json',
		'.xml',
		'.csv' // 文本格式
	].some(ext => fileName.endsWith(ext)) // 检查文件是否以可预览的扩展名结尾

	if (canPreview) {
		// 能预览的文件：在新窗口打开
		window.open(url, '_blank') // 在新标签页中打开文件
	} else {
		// 不能预览的文件：直接下载
		const link = document.createElement('a') // 创建下载链接
		link.href = url // 设置链接地址
		link.download = file.name // 设置下载文件名
		document.body.appendChild(link) // 添加到DOM
		link.click() // 触发点击下载
		document.body.removeChild(link) // 从DOM中移除链接
	}

	// 延迟释放URL对象，避免内存泄漏
	setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>

<style scoped></style>
