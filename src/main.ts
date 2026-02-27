import { createApp } from "vue"
import App from "./App.vue"
import { router, setupRouter } from "@/router"
import { setupStore } from "@/store"
import { setupI18n } from "@/plugins/vueI18n"
import { setupVxeTable } from "./plugins/vxeTable"
import { setupAuthDirective } from "./directives/auth"
import BasicTable from "@/components/BasicTable/BasicTable.vue"
import "@/router/asyncRouterHelper"

// 全局导入 Element Plus
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

// 导入 Crystal 组件库
import CrystalUi from "crystalplus-ui"
import "crystalplus-ui/dist/index.css"

import "animate.css"
import "./styles/reset.scss"
import "./styles/index.scss"

const setupApp = async () => {
  const app = createApp(App)
  setupI18n(app)
  setupRouter(app)
  // 在页面显示之前先等待router加载完毕
  await router.isReady()

  // 全局注册 Element Plus
  app.use(ElementPlus, {
    locale: zhCn
  })

  // 全局注册 Element Plus 图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  setupStore(app)
  setupVxeTable(app)
  setupAuthDirective(app)
  // 全局注册 Crystal 组件库
  app.use(CrystalUi)
  app.component("BasicTable", BasicTable)
  app.mount("#app")
}
setupApp()
