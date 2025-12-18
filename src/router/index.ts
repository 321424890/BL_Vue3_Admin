import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { t } from "@/hooks/useLocale"
import { Layout, secLayout } from "@/utils/routerUtils"

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard/workplace",
    name: "Root"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
    meta: {
      title: t("routes.login")
    }
  },
  {
    path: "/redirect/:path(.*)*/:type(.*)*",
    name: "Redirect",
    component: () => import("@/views/Redirect/Redirect.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    redirect: "/dashboard/workplace",
    meta: {
      title: t("routes.dashboard"),
      icon: "ri:dashboard-line"
    },
    children: [
      {
        path: "workplace",
        name: "Workplace",
        component: () => import("@/views/Dashboard/Workplace.vue"),
        meta: {
          title: t("routes.workplace"),
          icon: "bx:bxs-briefcase-alt-2"
        }
      }
    ]
  },
  {
    path: "/workflow",
    name: "Workflow",
    redirect: "/workflow/antvX6",
    component: Layout,
    meta: {
      title: t("routes.workflow"),
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "antvX6",
        name: "AntvX6",
        component: () => import("@/views/Workflow/useAntvX6.vue"),
        meta: {
          title: t("routes.useX6")
        }
      }
    ]
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: () => import("@/views/Error/404.vue"),
    meta: {
      title: t("result.notfound"),
      icon: "ic:outline-error-outline"
    }
  }
  // 其他路由配置
]

export const router = createRouter({
  history: createWebHistory(),
  routes: staticRouter
})

// 在路由加载完毕后，导出之前将router注册方法导出
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
