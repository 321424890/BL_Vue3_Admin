# 路由文档

## 路由系统概述

本项目采用 Vue Router 4 实现路由管理，支持静态路由和动态路由两种模式。路由系统主要由以下部分组成：

- **静态路由**：在代码中直接定义的路由，如登录页、仪表盘等基础页面
- **动态路由**：从后端接口获取的路由配置，支持权限控制
- **路由模式**：支持静态模式和异步模式

## 静态路由

### 静态路由定义

静态路由定义在 `src/router/index.ts` 文件中，使用 `RouteRecordRaw` 类型定义路由配置。

```typescript
// src/router/index.ts
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
  }
  // 其他静态路由...
]
```

### 静态路由结构

静态路由支持嵌套结构，使用 `children` 属性定义子路由：

```typescript
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
}
```

### 静态路由配置项

| 配置项      | 说明       | 类型             | 是否必填 |
| ----------- | ---------- | ---------------- | -------- |
| `path`      | 路由路径   | string           | 是       |
| `name`      | 路由名称   | string           | 是       |
| `component` | 路由组件   | Component        | 是       |
| `redirect`  | 重定向路径 | string           | 否       |
| `meta`      | 路由元信息 | object           | 否       |
| `children`  | 子路由     | RouteRecordRaw[] | 否       |

### 路由元信息 (meta)

路由元信息用于存储路由的额外信息，如标题、图标、权限等：

| 元信息   | 说明     | 类型     |
| -------- | -------- | -------- |
| `title`  | 路由标题 | string   |
| `icon`   | 路由图标 | string   |
| `hidden` | 是否隐藏 | boolean  |
| `role`   | 权限要求 | string[] |

## 动态路由

### 动态路由实现

动态路由通过 `src/router/asyncRouterHelper.ts` 实现，支持从后端接口获取路由配置：

```typescript
// src/router/asyncRouterHelper.ts
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
```

### 动态路由生成

动态路由通过 `generateDynamicRouters` 函数生成，支持权限筛选：

```typescript
// src/utils/routerUtils.ts
const generateDynamicRouters = (routers: RouteRecordRaw[], mode: RouterMode, user: any) => {
  let returnRouters = [] as RouteRecordRaw[]
  let backupRouters = cloneDeep(routers) as RouteRecordRaw[]

  // 静态路由，直接拿router/index.ts 的staticRouter
  if (mode === "static") {
    return staticRouter
  }
  // 异步/动态路由
  else {
    returnRouters = mode === "async" ? traverseRoleRouting(backupRouters, user.roles) : traverseRouting(backupRouters)
    // 添加基础路由...
    return returnRouters
  }
}
```

### 权限筛选

动态路由支持基于用户角色的权限筛选：

```typescript
// src/utils/routerUtils.ts
const traverseRoleRouting = (routers: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
  const toolArray = [] as RouteRecordRaw[]
  for (let v of routers) {
    // 权限筛选逻辑
    if (v.meta?.role?.length) {
      const hasRequiredPermissions = v.meta?.role.every(permission => roles.includes(permission))
      if (hasRequiredPermissions) {
        toolArray.push(v)
      }
    }
    // 其他处理...
  }
  return toolArray
}
```

## 路由模式

本项目支持两种路由模式：

### 1. 静态模式 (static)

- **特点**：使用预定义的静态路由，不从后端获取
- **适用场景**：路由结构相对固定的项目
- **配置**：在 `src/store/modules/app.ts` 中设置 `routerMode: "static"`

### 2. 异步模式 (async)

- **特点**：从后端接口获取路由配置，支持动态更新
- **适用场景**：需要基于用户权限动态生成路由的项目
- **配置**：在 `src/store/modules/app.ts` 中设置 `routerMode: "async"`

## 路由工具函数

### 1. 路由降级处理

将多级路由降级为最多二级，以支持 keep-alive 缓存：

```typescript
// src/utils/routerUtils.ts
const toLowerRoutes = (
  routes: RouteRecordRaw[],
  level: number = 1,
  parentRoute: Nullable<RouteRecordRaw> = null,
  expectedLevel: number = 2
) => {
  // 路由降级逻辑...
}
```

### 2. 菜单路由创建

生成用于菜单渲染的路由：

```typescript
// src/utils/routerUtils.ts
const createMenuRoutes = (staticRouter: RouteRecordRaw[]): RouteRecordRaw[] => {
  const localRoutes: RouteRecordRaw[] = cloneDeep(staticRouter)
  remove(localRoutes, (route: RouteRecordRaw) => menuWhiteList.includes(route.name as string))
  toLowerRoutes(localRoutes)
  return localRoutes
}
```

### 3. 路由打平

将嵌套路由打平为一级路由：

```typescript
// src/utils/routerUtils.ts
const flattenRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  let flattenedRoutes: RouteRecordRaw[] = []
  // 路由打平逻辑...
  return flattenedRoutes
}
```

### 4. 路径解析

解析路由路径：

```typescript
// src/utils/routerUtils.ts
const pathResolve = (parentPath: string, path: string) => {
  if (isUrl(path)) return path
  const childPath = path.startsWith("/") || !path ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, "/")
}
```

## 路由守卫

项目使用全局前置守卫进行路由权限控制：

```typescript
// src/router/asyncRouterHelper.ts
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
```

## 开发环境路由热更新

在开发环境下，项目支持周期性拉取最新路由，配合 mock 修改，省去重新登录：

```typescript
// src/router/asyncRouterHelper.ts
if (import.meta.env.DEV) {
  const w = window as any
  if (w.__MENU_POLL_TIMER__) {
    clearInterval(w.__MENU_POLL_TIMER__)
  }
  w.__MENU_POLL_TIMER__ = setInterval(() => {
    if (unref(isAuth)) {
```
      initAsyncRouters()
    }
  }, 2000) // 间隔可按需调整
}
```

## 页面刷新处理

项目使用 sessionStorage 标记页面刷新，确保刷新后路由状态正确：

```typescript
// src/router/asyncRouterHelper.ts
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
```

## 路由配置示例

### 1. 基础路由配置

```typescript
// 基础路由配置示例
const routeConfig = {
  path: "/example",
  name: "Example",
  component: Layout,
  meta: {
    title: "示例页面",
    icon: "ri:example-line"
  },
  children: [
    {
      path: "detail",
      name: "ExampleDetail",
      component: () => import("@/views/Example/Detail.vue"),
      meta: {
        title: "示例详情"
      }
    }
  ]
}
```

### 2. 带权限的路由配置

```typescript
// 带权限的路由配置示例
const protectedRoute = {
  path: "/admin",
  name: "Admin",
  component: Layout,
  meta: {
    title: "管理员页面",
    icon: "ri:admin-line",
    role: ["admin"] // 仅管理员可访问
  },
  children: [
    // 子路由...
  ]
}
```

### 3. 后端路由配置格式

```typescript
// 后端返回的路由配置格式示例
const backendRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: "Layout",
    meta: {
      title: "仪表盘",
      icon: "ri:dashboard-line"
    },
    children: [
      {
        path: "workplace",
        name: "Workplace",
        component: "/views/Dashboard/Workplace",
        meta: {
          title: "工作台"
        }
      }
    ]
  }
]
```

## 常见问题与解决方案

### 1. 路由不显示

**可能原因**：
- 路由配置错误
- 权限不足
- 路由模式配置错误

**解决方案**：
- 检查路由配置是否正确
- 确认用户角色是否有权限访问
- 检查路由模式设置

### 2. 页面刷新后路由丢失

**可能原因**：
- 动态路由未正确初始化
- 缓存问题

**解决方案**：
- 检查 `initAsyncRouters` 函数是否正确执行
- 清除浏览器缓存后重试

### 3. 权限控制不生效

**可能原因**：
- 路由元信息中未设置 `role` 属性
- 权限筛选逻辑错误

**解决方案**：
- 确保路由配置中正确设置了 `meta.role`
- 检查 `traverseRoleRouting` 函数实现

## 总结

本项目的路由系统具有以下特点：

1. **灵活性**：支持静态路由和动态路由两种模式
2. **可扩展性**：支持从后端接口获取路由配置
3. **安全性**：支持基于用户角色的权限控制
4. **性能优化**：支持路由降级和 keep-alive 缓存
5. **开发体验**：支持开发环境路由热更新

通过合理配置和使用路由系统，可以构建出结构清晰、权限可控的单页应用。