import { App } from 'vue'
import CrystalCalendar from './index.vue'

// 导出组件

export { CrystalCalendar }

// 导出类型
export type { } from './index.vue'

// 注册组件
export default {
  install(app: App) {
    app.component('CrystalCalendar', CrystalCalendar)
  }
}