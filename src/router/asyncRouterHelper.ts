import { unref, computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { router, staticRouter } from "@/router"
import { useRoutersStoreWithOut } from "@/store/modules/router"
import { useAppStoreWithOut } from "@/store/modules/app"
import { generateDynamicRouters } from "@/utils/routerUtils"
import { useNProgress } from "@/hooks/useProgress"
import { useStorage } from "@/hooks/useStorage"
import { getRouterList } from "@/api/user"
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

  newAsyncFinalRouter = asyncFinalRouter.filter((route: RouteRecordRaw) => {
    return !menuWhiteList.includes(route.name as string)
  })
  routersStore.setMenu(newAsyncFinalRouter)
  router.getRoutes().map((v: RouteRecordRaw) => {
    router.removeRoute(v.name)
  })
  asyncFinalRouter.map((v: RouteRecordRaw) => {
    router.addRoute(v)
  })
}

// 如果未登录过默认不执行,实际可换成token (本地无user缓存和pinia中无路由表视为未登录)
const isAuth = computed(() => (getStorage("user") || routersStore.getRouters.length ? true : false))

// 保持原有行为：先用本地缓存/静态路由创建一次，避免刷新自定义路由时直接 404
if (unref(isAuth)) {
  createRouter(cashRoutes)
}

// 初始化时，根据路由模式决定是否重新请求最新路由
const initAsyncRouters = async () => {
  if (!unref(isAuth)) return
  const currentMode = unref(mode)
  // 异步路由模式：每次刷新页面都重新从接口获取一次路由列表
  if (currentMode === "async") {
    try {
      const res = await getRouterList({ page: 1, pageSize: 999 })
      const list = (res.data?.data?.list || []) as RouteRecordRaw[]
      if (list.length) {
        routersStore.setRouters(list)
        createRouter(list)
        return
      }
    } catch (error) {
      console.error("获取路由列表失败，使用缓存路由", error)
    }
  }
  // 静态模式或请求失败时，退回使用缓存/静态路由
  createRouter(cashRoutes)
}

// 应用启动时执行一次
initAsyncRouters()

// 开发环境下，周期性拉取最新路由（配合 mock 修改，省去重新登录）
if (import.meta.env.DEV) {
  const w = window as any
  if (w.__MENU_POLL_TIMER__) {
    clearInterval(w.__MENU_POLL_TIMER__)
  }
  w.__MENU_POLL_TIMER__ = setInterval(() => {
    if (unref(isAuth)) {
      initAsyncRouters()
    }
  }, 2000) // 间隔可按需调整
}

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
