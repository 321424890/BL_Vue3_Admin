<template>
	<div class="markdown-viewer">
		<div class="viewer-header">
			<el-button type="primary" size="small" :loading="isLoading" @click="toggleDoc">
				<el-icon><View /></el-icon> {{ showDoc ? '隐藏' + title : '查看' + title }}
			</el-button>
		</div>

		<el-card v-if="showDoc" class="markdown-content-card" shadow="hover">
			<template #header>
				<div class="card-header">
					<span>{{ title }}</span>
					<el-button type="text" size="small" @click="showDoc = false"> 关闭 </el-button>
				</div>
			</template>

			<div v-if="isLoading" class="loading">
				<el-icon><Loading /></el-icon>
				<span>文档加载中...</span>
			</div>

			<div v-else class="markdown-container markdown-body" v-html="markdownHtml"></div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { View, Loading } from '@element-plus/icons-vue'
// 直接使用ES模块导入方式
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

// 组件属性
interface Props {
	docPath?: string
	title?: string
	defaultShow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	docPath: '',
	title: '使用文档',
	defaultShow: false
})

// 方便在模板中使用
const { title } = props

// 组件状态
const showDoc = ref(props.defaultShow)
const markdownHtml = ref('')
const isLoading = ref(false)

// 切换文档显示状态
const toggleDoc = () => {
	showDoc.value = !showDoc.value
}

// 配置marked解析器 - 采用官方推荐的用法
marked.setOptions({
	highlight: function (code, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(code, { language: lang }).value
			} catch (err) {
				console.error('Highlight error:', err)
			}
		}
		return hljs.highlightAuto(code).value
	},
	breaks: true, // 将换行符转换为<br>
	gfm: true, // 使用GitHub风格的Markdown
	headerIds: true, // 为标题生成id
	mangle: false // 不转义html标签
})

// 加载Markdown文档内容
const loadMarkdown = async () => {
	if (isLoading.value) return

	isLoading.value = true
	try {
		let markdownText = ''

		// 如果提供了文档路径，尝试加载
		if (props.docPath) {
			try {
				// 使用动态导入方式加载markdown文件
				const modules = import.meta.glob(['@/**/*.md', '/src/**/*.md'], { as: 'raw' })

				// 尝试不同的路径格式
				const possiblePaths = [props.docPath, props.docPath.replace('@/', '/src/')]
				let found = false

				for (const path of possiblePaths) {
					if (modules[path]) {
						try {
							markdownText = await modules[path]()
							found = true
							break
						} catch (e) {
							console.warn(`加载路径 ${path} 失败`)
						}
					}
				}

				if (!found) {
					console.warn('未找到指定的Markdown文件:', props.docPath)
					markdownText = getDefaultContent()
				}
			} catch (e) {
				console.error('加载Markdown文件时出错:', e)
				markdownText = getDefaultContent()
			}
		} else {
			// 如果没有提供路径，使用默认内容
			markdownText = getDefaultContent()
		}

		// 使用marked官方解析器转换Markdown
		markdownHtml.value = marked.parse(markdownText)

		// 下一帧处理代码高亮
		await nextTick()
		try {
			const codeBlocks = document.querySelectorAll('.markdown-body pre code')
			codeBlocks.forEach(block => {
				hljs.highlightElement(block as HTMLElement)
			})
		} catch (highlightError) {
			console.error('应用代码高亮时出错:', highlightError)
		}
	} catch (error) {
		console.error('处理Markdown内容时出错:', error)
		markdownHtml.value = '<div class="error">加载文档时发生错误，请稍后重试。</div>'
	} finally {
		isLoading.value = false
	}
}

// 获取默认的示例内容
const getDefaultContent = () => {
	return `# Markdown文档查看器

## 功能介绍

这是一个简单的Markdown文档查看组件，支持以下功能：

- 基本的Markdown语法
- 可折叠的文档面板
- 响应式设计

## 支持的Markdown语法

### 标题
使用 # 符号可以创建不同级别的标题

### 文本格式化
**粗体文本** 或 *斜体文本*

### 代码
\`行内代码示例\`

### 代码块
\`\`\`javascript
// 代码块示例
function example() {
  console.log('Hello, world!');
}
\`\`\`

### 列表
- 列表项 1
- 列表项 2
- 列表项 3

> 提示：此为默认示例内容。如需显示自定义文档，请在使用组件时提供正确的docPath属性。`
}

// 监听showDoc状态变化，当显示文档时加载内容
watch(showDoc, async newVal => {
	if (newVal && !markdownHtml.value) {
		await loadMarkdown()
	}
})

// 组件挂载时加载文档
onMounted(() => {
	if (props.defaultShow) {
		loadMarkdown()
	}
})
</script>

<style scoped lang="scss">
.markdown-viewer {
	width: 100%;
}

.markdown-doc-card {
	margin-bottom: 20px;

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

.markdown-container {
	max-height: 600px;
	overflow-y: auto;
	padding: 10px 0;
	min-height: 100px;
}

.loading {
	text-align: center;
	padding: 20px;
	color: #606266;
}

:deep(.markdown-body) {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	line-height: 1.6;
	color: #333;
	padding: 0 16px;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 24px;
		margin-bottom: 16px;
		font-weight: 600;
		line-height: 1.25;
	}

	h1 {
		font-size: 2em;
		border-bottom: 1px solid #eaecef;
		padding-bottom: 0.3em;
	}

	h2 {
		font-size: 1.5em;
		border-bottom: 1px solid #eaecef;
		padding-bottom: 0.3em;
	}

	p {
		margin-top: 0;
		margin-bottom: 16px;
	}

	code {
		font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
		padding: 0.2em 0.4em;
		margin: 0;
		font-size: 85%;
		background-color: rgba(27, 31, 35, 0.05);
		border-radius: 3px;
	}

	pre {
		padding: 16px;
		overflow: auto;
		font-size: 85%;
		line-height: 1.45;
		background-color: #f6f8fa;
		border-radius: 3px;
		margin-bottom: 16px;

		code {
			padding: 0;
			margin: 0;
			font-size: 100%;
			background-color: transparent;
			border: 0;
		}
	}

	blockquote {
		padding: 0 1em;
		color: #6a737d;
		border-left: 0.25em solid #dfe2e5;
		margin: 0 0 16px 0;
	}

	ul,
	ol {
		padding-left: 2em;
		margin-top: 0;
		margin-bottom: 16px;
	}

	li {
		margin-bottom: 4px;
	}

	hr {
		height: 0.25em;
		padding: 0;
		margin: 24px 0;
		background-color: #e1e4e8;
		border: 0;
	}

	.error {
		color: #d73a49;
		background-color: #ffeef0;
		padding: 16px;
		border-radius: 3px;
		border-left: 4px solid #d73a49;
	}
}

.doc-toggle {
	text-align: center;
	padding: 10px 0;
}
</style>
