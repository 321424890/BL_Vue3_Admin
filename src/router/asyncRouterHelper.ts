import { unref, computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { router, staticRouter } from "@/router"
import { useRoutersStoreWithOut } from "@/store/modules/router"
import { useAppStoreWithOut } from "@/store/modules/app"
import { generateDynamicRouters } from "@/utils/routerUtils"
import { useNProgress } from "@/hooks/useProgress"
import { useStorage } from "@/hooks/useStorage"
import { menuWhiteList } from "@/constants"

const { start, done } = useNProgress()
const routersStore = useRoutersStoreWithOut()
const appStore = useAppStoreWithOut()
const { getStorage } = useStorage("localStorage")

const mode = computed(() => appStore.getRouterMode)

const cashRoutes = routersStore.getRouters.length ? routersStore.getRouters : staticRouter
// 创建路由
export const createRouter = (asyncRouters: RouteRecordRaw[] = cashRoutes) => {
  let asyncFinalRouter = [] as RouteRecordRaw[]
  let newAsyncFinalRouter = [] as RouteRecordRaw[]
  asyncFinalRouter = generateDynamicRouters(asyncRouters, unref(mode), routersStore.user)

  // 过滤菜单，去除白名单中的路由，只保留有名称的路由
  newAsyncFinalRouter = asyncFinalRouter.filter((route: RouteRecordRaw) => {
    return route.name && !menuWhiteList.includes(route.name as string)
  })
  routersStore.setMenu(newAsyncFinalRouter)

  // 清除现有路由
  router.getRoutes().forEach((v: RouteRecordRaw) => {
    if (v.name) {
      router.removeRoute(v.name)
    }
  })

  // 添加新路由
  asyncFinalRouter.forEach((v: RouteRecordRaw) => {
    router.addRoute(v)
  })
}

// 登录验证逻辑
const isAuth = computed(() => (getStorage("user") || routersStore.getRouters.length ? true : false))

// 保持原有行为：先用本地缓存/静态路由创建一次，避免刷新自定义路由时直接 404
if (unref(isAuth)) {
  createRouter(cashRoutes)
}

// 初始化时，根据路由模式决定是否重新请求最新路由
const initAsyncRouters = async () => {
  if (!unref(isAuth)) return
  // 无论什么模式，都使用静态路由
  routersStore.setRouters(staticRouter)
  createRouter(staticRouter)
}

// 应用启动时执行一次
initAsyncRouters()

// 开发环境下，周期性拉取最新路由（配合 mock 修改，省去重新登录）
// if (import.meta.env.DEV) {
//   const w = window as any
//   if (w.__MENU_POLL_TIMER__) {
//     clearInterval(w.__MENU_POLL_TIMER__)
//   }
//   w.__MENU_POLL_TIMER__ = setInterval(() => {
//     if (unref(isAuth)) {
//       initAsyncRouters()
//     }
//   }, 2000) // 间隔可按需调整
// }

// 使用 sessionStorage 标记页面刷新
// 在应用启动时设置标记
sessionStorage.setItem("isPageRefresh", "false")

// 监听页面卸载事件，设置刷新标记
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("isPageRefresh", "true")
})

// 监听页面加载完成事件，检查是否是刷新
window.addEventListener("load", () => {
  if (sessionStorage.getItem("isPageRefresh") === "true" && unref(isAuth)) {
    initAsyncRouters()
    // 重置标记
    sessionStorage.setItem("isPageRefresh", "false")
  }
})

router.beforeEach((to, from, next) => {
  start()
  if (to.path !== "/login" && !unref(isAuth)) {
    next("/login") // 如果未验证，跳转到登录页
  } else {
    next() // 继续路由导航
  }
})

router.afterEach(() => {
  done()
})
