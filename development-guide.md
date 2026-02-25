# 开发指南

## 项目概述

本项目是一个基于 Vue 3 + TypeScript + Vite 的前端管理系统，使用 Element Plus 作为 UI 库，集成了丰富的自定义组件和功能模块。本指南将帮助开发者快速上手项目开发。

## 环境搭建

### 1. 前置要求

- **Node.js**：v16.0 或更高版本
- **pnpm**：v8.0 或更高版本
- **Git**：用于版本控制
- **IDE**：推荐使用 VS Code

### 2. 安装依赖

```bash
# 克隆项目
git clone <仓库地址>

# 进入项目目录
cd BL_Vue3_Admin

# 安装依赖
pnpm install
```

### 3. 启动开发服务器

```bash
# 启动开发服务器
pnpm run dev

# 或使用 npm
npm run dev
```

开发服务器默认运行在 `http://localhost:8080`，如果端口被占用，会自动尝试其他端口。

## 项目结构

### 核心目录

```
BL_Vue3_Admin/
├── src/               # 源代码
│   ├── api/           # API接口
│   ├── assets/        # 静态资源
│   ├── axios/         # 网络请求
│   ├── components/    # 自定义组件
│   ├── constants/     # 常量定义
│   ├── directives/    # 指令
│   ├── hook/          # 自定义hook
│   ├── hooks/         # 更多hook
│   ├── layout/        # 布局组件
│   ├── locales/       # 国际化
│   ├── plugins/       # 插件
│   ├── router/        # 路由
│   ├── scripts/       # 脚本
│   ├── store/         # 状态管理
│   ├── styles/        # 样式
│   ├── utils/         # 工具函数
│   ├── views/         # 页面
│   ├── App.vue        # 根组件
│   ├── main.ts        # 入口文件
│   └── vite-env.d.ts  # Vite类型声明
├── build/             # 构建配置
├── mock/              # 模拟数据
├── types/             # 类型定义
└── ...                # 配置文件
```

### 目录说明

| 目录 | 说明 | 用途 |
|------|------|------|
| `src/api/` | API接口管理 | 按功能模块组织的API接口 |
| `src/components/` | 自定义组件 | 项目中使用的各种自定义组件 |
| `src/views/` | 页面视图 | 应用的各个页面 |
| `src/router/` | 路由配置 | 静态和动态路由定义 |
| `src/store/` | 状态管理 | Pinia状态管理模块 |
| `src/styles/` | 样式文件 | 全局样式和主题配置 |
| `src/utils/` | 工具函数 | 通用工具函数 |
| `src/assets/` | 静态资源 | 图片、SVG等静态资源 |

## 开发流程

### 1. 新建页面

1. **在 `src/views/` 目录下创建新的页面文件夹**
   - 例如：`src/views/MyPage/`

2. **创建页面组件**
   - 例如：`src/views/MyPage/index.vue`

3. **配置路由**
   - 在 `src/router/index.ts` 中添加路由配置

### 2. 新增组件

1. **在 `src/components/` 目录下创建组件文件夹**
   - 例如：`src/components/MyComponent/`

2. **创建组件文件**
   - 例如：`src/components/MyComponent/index.vue`
   - 可选：创建 `index.ts` 文件用于导出组件

3. **在页面中使用组件**
   - 直接导入使用，或通过自动注册使用

### 3. API接口开发

1. **在 `src/api/` 目录下创建接口模块**
   - 例如：`src/api/myModule/index.ts`

2. **定义接口函数**
   - 使用 `http.get` 或 `http.post` 方法

3. **定义类型**
   - 在 `types.ts` 文件中定义请求参数和返回值类型

4. **在页面中使用接口**
   - 导入并调用接口函数

### 4. 状态管理

1. **在 `src/store/modules/` 目录下创建状态模块**
   - 例如：`src/store/modules/myModule.ts`

2. **定义状态、Getters、Actions**
   - 使用 Pinia 的语法定义

3. **在页面中使用状态**
   - 使用 `useStore` 或 `useMyModuleStore` 导入使用

## 代码规范

### 1. TypeScript 规范

- **类型定义**：为所有变量、函数参数和返回值添加类型
- **接口命名**：使用 `PascalCase` 命名接口
- **类型命名**：使用 `PascalCase` 命名类型
- **变量命名**：使用 `camelCase` 命名变量
- **常量命名**：使用 `UPPER_SNAKE_CASE` 命名常量

### 2. Vue 规范

- **组件命名**：使用 `PascalCase` 命名组件
- **Props 命名**：使用 `camelCase` 命名 Props
- **事件命名**：使用 `kebab-case` 命名事件
- **模板语法**：使用简写语法，如 `v-if`、`v-for`
- **script setup**：优先使用 `<script setup>` 语法

### 3. SCSS 规范

- **变量命名**：使用 `kebab-case` 命名 SCSS 变量
- **类名命名**：使用 `kebab-case` 命名 CSS 类
- **嵌套层级**：避免过深的嵌套，最多不超过 3 层
- **注释**：为复杂样式添加注释

### 4. Git 规范

- **提交信息**：使用语义化的提交信息
  - `feat`: 新功能
  - `fix`: 修复bug
  - `docs`: 文档更新
  - `style`: 代码风格调整
  - `refactor`: 代码重构
  - `test`: 测试相关
  - `chore`: 构建或依赖更新

- **分支管理**：
  - `main`: 主分支
  - `dev`: 开发分支
  - `feature/*`: 功能分支
  - `fix/*`: 修复分支

## 常用命令

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建结果
npm run preview
```

### 代码质量命令

```bash
# ESLint 检查
npm run lint

# ESLint 检查并修复
npm run lint:fix

# Stylelint 检查
npm run stylelint

# Stylelint 检查并修复
npm run stylelint:fix

# Prettier 格式化
npm run format
```

## 开发工具

### 推荐 VS Code 插件

1. **Volar**：Vue 3 支持
2. **TypeScript Vue Plugin (Volar)**：Vue TypeScript 支持
3. **ESLint**：代码质量检查
4. **Prettier**：代码格式化
5. **Stylelint**：样式检查
6. **GitLens**：Git 增强
7. **Path Intellisense**：路径自动补全
8. **Auto Import**：自动导入

### 编辑器配置

项目根目录已配置 `.vscode/settings.json`，包含推荐的编辑器设置。

## 常见问题

### 1. 依赖安装失败

**问题**：执行 `pnpm install` 失败

**解决方案**：
- 检查网络连接
- 清理缓存：`pnpm cache clean`
- 重新安装：`pnpm install`

### 2. 开发服务器启动失败

**问题**：执行 `npm run dev` 失败

**解决方案**：
- 检查端口是否被占用
- 清理 Vite 缓存：`Remove-Item -Recurse -Force node_modules\.vite`
- 重新启动：`npm run dev`

### 3. 类型检查失败

**问题**：执行 `npm run build` 时类型检查失败

**解决方案**：
- 检查 TypeScript 错误信息
- 修复类型错误
- 或使用 `--skipLibCheck` 跳过库类型检查

### 4. 组件不显示

**问题**：添加的组件不显示

**解决方案**：
- 检查组件路径是否正确
- 检查组件是否正确导出
- 检查路由配置是否正确

### 5. API 调用失败

**问题**：API 接口调用失败

**解决方案**：
- 检查接口地址是否正确
- 检查请求参数是否正确
- 检查模拟数据是否配置
- 检查网络连接

## 最佳实践

### 1. 组件设计

- **单一职责**：每个组件只负责一个功能
- **Props 设计**：合理设计组件的 Props，使用默认值
- **事件设计**：使用清晰的事件命名，传递必要的参数
- **样式隔离**：使用 `scoped` 或 CSS Modules 隔离组件样式

### 2. 状态管理

- **模块拆分**：按功能模块拆分状态
- **数据流**：使用单向数据流，避免直接修改状态
- **异步操作**：在 Actions 中处理异步操作
- **持久化**：使用 `pinia-plugin-persist` 持久化必要的状态

### 3. 性能优化

- **组件懒加载**：使用动态导入懒加载组件
- **路由懒加载**：使用动态导入懒加载路由
- **图片优化**：使用适当的图片格式和大小
- **计算属性**：使用计算属性缓存复杂计算
- **watch 优化**：合理使用 watch，避免不必要的监听

### 4. 安全性

- **XSS 防护**：使用 `v-html` 时注意 XSS 防护
- **CSRF 防护**：使用合适的 CSRF 防护措施
- **敏感信息**：不在前端存储敏感信息
- **API 调用**：验证 API 调用的参数和返回值

## 部署流程

### 1. 构建生产版本

```bash
# 构建生产版本
npm run build
```

构建产物会输出到 `dist` 目录。

### 2. 部署到服务器

- **静态文件服务器**：使用 Nginx 或 Apache 部署
- **CDN**：使用 CDN 加速静态资源
- **容器化**：使用 Docker 容器化部署

### 3. 环境配置

- **环境变量**：根据部署环境配置 `.env.production` 文件
- **路由模式**：根据服务器配置选择合适的路由模式
- **公共路径**：根据部署路径配置 `VITE_PUBLIC_PATH`

## 总结

本开发指南涵盖了项目的环境搭建、开发流程、代码规范、常用命令、开发工具、常见问题和最佳实践等方面。通过遵循本指南，可以提高开发效率，保证代码质量，确保项目的可维护性和可扩展性。

如果在开发过程中遇到问题，请参考本指南的常见问题部分，或咨询团队其他成员。