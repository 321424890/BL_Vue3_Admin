import { App } from 'vue'
import MarkdownViewer from './MarkdownViewer.vue'

// 导出组件
// eslint-disable-next-line import/prefer-default-export
export const MarkdownViewerComponent = MarkdownViewer

// 导出注册方法
export const install = (app: App) => {
	app.component('MarkdownViewer', MarkdownViewer)
}

// 默认导出整个模块
export default {
	install,
	MarkdownViewer: MarkdownViewerComponent
}
