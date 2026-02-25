# 打包构建文档

## 构建系统概述

本项目使用 Vite 作为构建工具，结合 TypeScript 和 SCSS 预处理器，实现了一套完整的构建流程。构建系统主要包括：

- **开发环境**：使用 `npm run dev` 启动开发服务器
- **生产环境**：使用 `npm run build` 构建生产版本
- **预览环境**：使用 `npm run preview` 预览生产构建结果

## 构建命令

### 1. 开发环境

```bash
npm run dev
```

**功能**：启动开发服务器，支持热更新和实时预览

**配置**：

- 端口：从环境变量 `VITE_PORT` 获取，默认 8080
- 主机：0.0.0.0，支持局域网访问
- 热更新：启用 HMR

### 2. 生产环境

```bash
npm run build
```

**功能**：构建生产版本，包括类型检查和代码压缩

**流程**：

1. 执行 `vue-tsc --noEmit --skipLibCheck` 进行类型检查
2. 执行 `vite build` 进行构建

### 3. 预览环境

```bash
npm run preview
```

**功能**：预览生产构建结果，用于验证构建产物

## 构建配置

### Vite 配置

Vite 配置文件为 `vite.config.ts`，主要配置项包括：

#### 1. 基础配置

```typescript
// vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_PORT, VITE_CDN, VITE_PUBLIC_PATH, VITE_REPORT, VITE_COMPRESSION } = readEnv(loadEnv(mode, root))
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: getPluginsList(VITE_CDN, VITE_REPORT, VITE_COMPRESSION)
    // 其他配置...
  }
}
```

#### 2. 路径别名

```typescript
// vite.config.ts
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build"),
  // 使用用户指定的crystal-ui路径配置
  "crystal-ui": pathResolve("../element-plus-wrapper/packages/crystal-ui/src/index.ts")
}
```

#### 3. 构建配置

```typescript
// vite.config.ts
build: {
  sourcemap: false,
  // 消除打包大小超过500kb警告 默认500kb 这里改为4000kb
  chunkSizeWarningLimit: 4000,
  rollupOptions: {
    input: {
      index: pathResolve("index.html")
    },
    // 静态资源分类打包
    output: {
      chunkFileNames: "static/js/[name]-[hash].js",
      entryFileNames: "static/js/[name]-[hash].js",
      assetFileNames: "static/[ext]/[name]-[hash].[ext]"
    }
  }
}
```

#### 4. CSS 配置

```typescript
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "@/styles/element/index.scss" as *;`
    }
  },
  postcss: {
    plugins: [postcssImport as AcceptedPlugin, ...(mode === "production" ? [cssnano] : [])]
  }
}
```

### 插件配置

构建插件通过 `build/plugins.ts` 配置，主要插件包括：

1. **Vite 核心插件**：

   - `@vitejs/plugin-vue`：Vue 支持
   - `@vitejs/plugin-vue-jsx`：JSX 支持

2. **功能插件**：

   - `unplugin-auto-import`：自动导入
   - `unplugin-vue-components`：自动注册组件
   - `vite-plugin-mock`：模拟数据

3. **优化插件**：
   - `vite-plugin-cdn-import`：CDN 导入
   - `vite-plugin-compression`：文件压缩
   - `rollup-plugin-visualizer`：构建分析

## 环境变量

### 开发环境

文件：`.env.development`

```env
# 项目标题，名称
VITE_APP_TITLE = "VxAdmin"
# 本地运行端口号(修改此处保存可立即重启vite开发服务器)
VITE_PORT = 8080
# 开发环境读取配置文件路径
VITE_PUBLIC_PATH = /

# 开发环境路由历史模式（Hash模式传"hash"、HTML5模式传"h5"、Hash模式带base参数传"hash,base参数"、HTML5模式带base参数传"h5,base参数"）
VITE_ROUTER_HISTORY = "hash"

# 压缩时删除原始文件的配置：gzip-clear、brotli-clear、both-clear（同时开启 gzip 与 brotli 压缩）、none（不开启压缩，默认）
VITE_COMPRESSION = "none"
#是否生成report.html报告文件
VITE_REPORT = false
```

### 生产环境

文件：`.env.production`

```env
# 项目标题，名称
VITE_APP_TITLE = "VxAdmin"

# 线上环境平台打包路径
VITE_PUBLIC_PATH = /

# 线上环境路由历史模式（Hash模式传"hash"、HTML5模式传"h5"、Hash模式带base参数传"hash,base参数"、HTML5模式带base参数传"h5,base参数"）
VITE_ROUTER_HISTORY = "hash"

# 压缩时删除原始文件的配置：gzip-clear、brotli-clear、both-clear（同时开启 gzip 与 brotli 压缩）、none（不开启压缩，默认）
VITE_COMPRESSION = "gzip"

# 是否在打包时使用cdn替换本地库 替换 true 不替换 false
VITE_CDN = true
#是否生成report.html报告文件
VITE_REPORT = false
```

## 构建产物

### 目录结构

构建产物默认输出到 `dist` 目录，结构如下：

```
dist/
├── index.html              # 入口HTML文件
├── static/                 # 静态资源
│   ├── css/                # CSS文件
│   │   └── [name]-[hash].css
│   ├── js/                 # JS文件
│   │   ├── [name]-[hash].js      # 入口文件
│   │   └── [name]-[hash].chunk.js  # 代码分割文件
│   └── [ext]/              # 其他资源（图片、字体等）
│       └── [name]-[hash].[ext]
└── assets/                 # 其他静态资源
```

### 文件命名规则

- **入口文件**：`static/js/[name]-[hash].js`
- **代码分割文件**：`static/js/[name]-[hash].chunk.js`
- **CSS文件**：`static/css/[name]-[hash].css`
- **其他资源**：`static/[ext]/[name]-[hash].[ext]`

## 构建优化

### 1. 代码分割

Vite 默认启用代码分割，将第三方库和业务代码分离，提高缓存利用率。

### 2. 文件压缩

- **开发环境**：不开启压缩
- **生产环境**：
  - JS/CSS：使用 Vite 内置压缩
  - 静态资源：可通过 `VITE_COMPRESSION` 配置开启 gzip 或 brotli 压缩

### 3. CDN 优化

通过 `VITE_CDN` 配置，可将第三方库通过 CDN 引入，减少打包体积：

```env
# 是否在打包时使用cdn替换本地库 替换 true 不替换 false
VITE_CDN = true
```

### 4. 构建分析

通过 `VITE_REPORT` 配置，可生成构建分析报告：

```env
#是否生成report.html报告文件
VITE_REPORT = true
```

生成的 `report.html` 文件可用于分析构建产物的大小和依赖关系。

### 5. 预构建

Vite 会对依赖进行预构建，提高开发和构建速度：

```typescript
// vite.config.ts
optimizeDeps: {
  include: [
    "vue",
    "pinia",
    "vue-i18n",
    "vue-router",
    "@vueuse/core",
    "element-plus",
    // 其他依赖...
  ],
  exclude: ["@iconify-icons/ep", "@iconify-icons/ri", "@iconify/vue"],
  force: false
}
```

## 常见问题与解决方案

### 1. 构建失败

**问题**：执行 `npm run build` 失败

**解决方案**：

- 检查 TypeScript 类型错误
- 检查依赖是否安装完整
- 检查 Vite 配置是否正确

### 2. 构建体积过大

**问题**：构建产物体积超过预期

**解决方案**：

- 启用 CDN 优化
- 检查是否有未使用的依赖
- 优化图片和静态资源
- 使用代码分割

### 3. 构建速度慢

**问题**：构建过程耗时过长

**解决方案**：

- 确保依赖已缓存
- 检查是否有循环依赖
- 优化 TypeScript 类型检查

### 4. 部署后资源加载失败

**问题**：部署到服务器后资源加载失败

**解决方案**：

- 检查 `VITE_PUBLIC_PATH` 配置是否正确
- 检查路由模式是否与服务器配置匹配
- 检查静态资源路径是否正确

## 最佳实践

### 1. 开发环境

- **热更新**：利用 Vite 的热更新特性，提高开发效率
- **模拟数据**：使用 `vite-plugin-mock` 模拟后端数据
- **类型检查**：在编辑器中启用 TypeScript 类型检查

### 2. 生产环境

- **类型检查**：确保每次构建前都进行类型检查
- **代码压缩**：启用 gzip 或 brotli 压缩
- **CDN 优化**：将第三方库通过 CDN 引入
- **构建分析**：定期生成构建分析报告，优化构建产物

### 3. 性能优化

- **图片优化**：使用适当的图片格式和大小
- **代码分割**：合理使用动态导入
- **缓存策略**：配置合理的缓存策略
- **懒加载**：对非首屏资源使用懒加载

### 4. 部署建议

- **静态文件服务**：使用 Nginx 或 Apache 作为静态文件服务器
- **gzip 压缩**：在服务器端启用 gzip 压缩
- **缓存配置**：配置合理的缓存头
- **HTTPS**：启用 HTTPS 协议

## 总结
本项目的构建系统具有以下特点：

1. **现代化**：使用 Vite 作为构建工具，速度快，配置简洁
2. **类型安全**：集成 TypeScript，确保代码质量
3. **可配置性**：通过环境变量和配置文件，支持不同环境的构建需求
4. **优化全面**：支持代码分割、CDN 引入、文件压缩等多种优化方式
5. **开发友好**：支持热更新、模拟数据等开发特性

通过合理配置和使用构建系统，可以显著提高开发效率和生产环境性能。