# 请求文档

## 请求系统概述

本项目采用 Axios 作为 HTTP 客户端，实现了一套完整的请求系统，包括：

- **请求配置**：统一的 Axios 实例配置
- **拦截器**：请求和响应拦截器
- **API 组织**：模块化的 API 接口管理
- **类型定义**：完整的 TypeScript 类型支持
- **错误处理**：统一的错误处理机制

## 核心配置

### Axios 实例配置

请求系统的核心配置定义在 `src/axios/index.ts` 文件中：

```typescript
// src/axios/index.ts
const defaultConfig: AxiosRequestConfig = baseURL
  ? {
      baseURL,
      timeout: 10000,
      headers: {
        baseURL,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }
  : {
      timeout: 10000,
      headers: {
        baseURL,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }
```

### 配置说明

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `baseURL` | 请求基础路径 | 从 `@/constants` 导入 |
| `timeout` | 请求超时时间 | `10000` ms |
| `headers` | 请求头配置 | `Content-Type: application/json` 等 |

## 拦截器

### 请求拦截器

请求拦截器用于处理请求前的逻辑，如添加认证信息、开启进度条等：

```typescript
// src/axios/index.ts
private httpInterceptorsRequest(): void {
  Http.axiosInstance.interceptors.request.use(
    async (config: HttpRequestConfig): Promise<any> => {
      // 开启进度条动画
      // NProgress.start()
      // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
      if (typeof config.beforeRequestCallback === "function") {
        config.beforeRequestCallback(config)
        return config
      }
      if (Http.initConfig.beforeRequestCallback) {
        Http.initConfig.beforeRequestCallback(config)
        return config
      }
      /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
      const whiteList = ["/refresh-token", "/login"]
      return whiteList.find(url => url === config.url)
        ? config
        : new Promise(resolve => {
            resolve(config)
          })
    },
    error => {
      return Promise.reject(error)
    }
  )
}
```

### 响应拦截器

响应拦截器用于处理响应后逻辑，如关闭进度条、统一处理响应数据等：

```typescript
// src/axios/index.ts
private httpInterceptorsResponse(): void {
  const instance = Http.axiosInstance
  instance.interceptors.response.use(
    (response: any) => {
      const $config = response.config
      // 关闭进度条动画
      // NProgress.done()
      // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
      if (typeof $config.beforeResponseCallback === "function") {
        $config.beforeResponseCallback(response)
        return response.data
      }
      if (Http.initConfig.beforeResponseCallback) {
        Http.initConfig.beforeResponseCallback(response)
        return response.data
      }
      return response.data
    },
    (error: HttpError) => {
      const $error = error
      $error.isCancelRequest = Axios.isCancel($error)
      // 关闭进度条动画
      // NProgress.done()
      // 所有的响应异常 区分来源为取消请求/非取消请求
      return Promise.reject($error)
    }
  )
}
```

## API 组织方式

### 目录结构

API 接口按模块组织，存放在 `src/api/` 目录下：

```
src/api/
├── analysis/         # 分析相关接口
│   └── index.ts
├── demo/             # 示例相关接口
│   └── index.ts
├── table/            # 表格相关接口
│   ├── index.ts
│   └── types.ts
└── user/             # 用户相关接口
    ├── index.ts
    └── types.ts
```

### 接口定义示例

以用户相关接口为例，定义在 `src/api/user/index.ts` 文件中：

```typescript
// src/api/user/index.ts
import { http } from "@/axios"
import type {
  UserLoginParams,
  UserReturns,
  UserListParams,
  getRoleListParams,
  RoleReturns,
  deleteRoleListParams,
  updateRoleParams,
  RouterListReturns
} from "./types"

// 登录
const login = async (data: UserLoginParams): Promise<UserReturns> => {
  return http.post("/user/login", { data })
}

// 获取用户列表
const userList = async (params: UserListParams): Promise<UserReturns> => {
  return http.get("/user/list", { params })
}

// 获取权限列表
const roleList = async (data: getRoleListParams): Promise<RoleReturns> => {
  return http.post("/user/role", { data })
}

// 获取路由列表（菜单）
const getRouterList = async (data: getRoleListParams): Promise<RouterListReturns> => {
  return http.post("/user/routerList", { data })
}

//根据roleId删除权限
const deleteRoleList = async (data: deleteRoleListParams): Promise<RoleReturns> => {
  return http.post("/user/deleteRoleById", { data })
}

//更新权限列表
const updateRole = async (data: updateRoleParams): Promise<RoleReturns> => {
  return http.post("/user/updateRole", { data })
}

// 退出登录
const outLogin = async (): Promise<any> => {
  return http.get("/user/loginOut")
}

export { login, userList, roleList, outLogin, getRouterList, deleteRoleList, updateRole }
```

### 类型定义

接口参数和返回值类型定义在对应的 `types.ts` 文件中：

```typescript
// src/api/user/types.ts 示例
export interface UserLoginParams {
  username: string
  password: string
}

export interface UserReturns {
  code: number
  message: string
  data: {
    token: string
    user: {
      id: number
      username: string
      roles: string[]
    }
  }
}

// 其他类型定义...
```

## 请求方法

### 核心请求方法

请求系统提供了以下核心方法：

1. **request**：通用请求方法
2. **get**：GET 请求方法
3. **post**：POST 请求方法

### 方法签名

```typescript
// src/axios/index.ts

/** 通用请求工具函数 */
public request<T>(
  method: RequestMethods,
  url: string,
  param?: AxiosRequestConfig,
  axiosConfig?: HttpRequestConfig
): Promise<T>

/** 单独抽离的post工具函数 */
public post<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: HttpRequestConfig): Promise<P>

/** 单独抽离的get工具函数 */
public get<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: HttpRequestConfig): Promise<P>
```

## 使用示例

### 1. 基本使用

```typescript
// 导入API接口
import { login, userList } from "@/api/user"

// 登录
const handleLogin = async () => {
  try {
    const response = await login({
      username: "admin",
      password: "123456"
    })
    console.log("登录成功:", response)
  } catch (error) {
    console.error("登录失败:", error)
  }
}

// 获取用户列表
const getUsers = async () => {
  try {
    const response = await userList({
      page: 1,
      pageSize: 10
    })
    console.log("用户列表:", response)
  } catch (error) {
    console.error("获取用户列表失败:", error)
  }
}
```

### 2. 自定义回调

```typescript
import { http } from "@/axios"

// 带自定义回调的请求
const customRequest = async () => {
  try {
    const response = await http.post(
      "/api/data",
      { data: { key: "value" } },
      {
        beforeRequestCallback: (config) => {
          console.log("请求前:", config)
          // 可以在这里修改请求配置
        },
        beforeResponseCallback: (response) => {
          console.log("响应前:", response)
          // 可以在这里处理响应数据
        }
      }
    )
    console.log("请求成功:", response)
  } catch (error) {
    console.error("请求失败:", error)
  }
}
```

### 3. 直接使用 http 实例

```typescript
import { http } from "@/axios"

// 直接使用http实例发送请求
const directRequest = async () => {
  try {
    // GET请求
    const getResponse = await http.get("/api/getData", { params: { id: 1 } })
    console.log("GET请求成功:", getResponse)

    // POST请求
    const postResponse = await http.post("/api/postData", { data: { name: "test" } })
    console.log("POST请求成功:", postResponse)
  } catch (error) {
    console.error("请求失败:", error)
  }
}
```

## 错误处理

### 全局错误处理

响应拦截器会捕获所有响应异常，并返回 Promise.reject(error)，可以在业务代码中统一处理：

```typescript
import { ElMessage } from "element-plus"

const handleRequest = async () => {
  try {
    // 发送请求
    const response = await someApi()
    // 处理成功响应
  } catch (error: any) {
    // 统一错误处理
    if (error.isCancelRequest) {
      // 处理取消请求
      console.log("请求已取消")
    } else if (error.response) {
      // 处理HTTP错误
      const status = error.response.status
      switch (status) {
        case 400:
          ElMessage.error("请求参数错误")
          break
        case 401:
          ElMessage.error("未授权，请重新登录")
          // 跳转到登录页
          break
        case 403:
          ElMessage.error("拒绝访问")
          break
        case 404:
          ElMessage.error("请求地址不存在")
          break
        case 500:
          ElMessage.error("服务器内部错误")
          break
        default:
          ElMessage.error(`请求失败: ${error.message}`)
      }
    } else if (error.request) {
      // 处理网络错误
      ElMessage.error("网络错误，请检查网络连接")
    } else {
      // 处理其他错误
      ElMessage.error(`请求失败: ${error.message}`)
    }
  }
}
```

### 错误类型

请求系统定义了完整的错误类型：

```typescript
// src/axios/types.ts
export interface HttpError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: any
  isCancelRequest?: boolean
}
```

## 最佳实践

### 1. API 模块化

- **按功能模块组织**：将相关接口放在同一个文件中
- **统一导出**：使用 `export` 导出所有接口函数
- **类型定义**：为每个接口定义请求参数和返回值类型

### 2. 请求参数处理

- **GET 请求**：使用 `{ params: {...} }` 传递参数
- **POST 请求**：使用 `{ data: {...} }` 传递参数
- **复杂请求**：可以传递自定义配置

### 3. 错误处理

- **统一错误处理**：在业务代码中使用 try/catch 捕获错误
- **错误分类**：区分 HTTP 错误、网络错误和其他错误
- **用户提示**：根据错误类型给出友好的用户提示

### 4. 性能优化

- **请求缓存**：对于不频繁变化的数据，可以使用缓存
- **请求防抖**：对于频繁触发的请求，使用防抖
- **取消请求**：对于已发送但不再需要的请求，使用取消

### 5. 安全性

- **请求白名单**：对于不需要认证的接口，添加到白名单
- **token 管理**：实现 token 过期自动刷新
- **参数验证**：在发送请求前验证参数

## 常见问题与解决方案

### 1. 请求超时

**问题**：请求超过设定的超时时间

**解决方案**：
- 检查网络连接
- 调整 `timeout` 配置
- 优化服务器响应速度

### 2. 401 未授权

**问题**：token 过期或无效

**解决方案**：
- 实现 token 自动刷新机制
- 跳转到登录页重新登录

### 3. 404 未找到

**问题**：请求地址不存在

**解决方案**：
- 检查 API 地址是否正确
- 确认后端是否已部署该接口

### 4. 500 服务器错误

**问题**：服务器内部错误

**解决方案**：
- 检查请求参数是否正确
- 联系后端开发人员排查问题

### 5. 跨域问题

**问题**：浏览器跨域限制

**解决方案**：
- 后端配置 CORS
- 使用代理服务器

## 总结

本项目的请求系统具有以下特点：

1. **模块化**：按功能模块组织 API 接口
2. **类型安全**：完整的 TypeScript 类型支持
3. **可扩展**：支持自定义请求和响应回调
4. **统一处理**：统一的错误处理机制
5. **性能优化**：支持请求拦截和响应拦截

通过合理使用请求系统，可以构建出高效、可靠的前后端交互流程。