# 项目目录结构

```
BL_Vue3_Admin/
├── build/             # 构建配置
│   ├── cdn.ts         # CDN配置
│   ├── compress.ts    # 压缩配置
│   ├── index.ts       # 构建入口
│   └── plugins.ts     # 插件配置
├── mock/              # 模拟数据
│   ├── analysis/      # 分析相关模拟数据
│   ├── useTable/      # 表格相关模拟数据
│   ├── user/          # 用户相关模拟数据
│   ├── _createProductionServer.ts  # 生产服务器模拟
│   └── utils.ts       # 模拟数据工具
├── src/               # 源代码
│   ├── api/           # API接口
│   │   ├── analysis/  # 分析相关接口
│   │   ├── demo/      # 示例接口
│   │   ├── table/     # 表格相关接口
│   │   └── user/      # 用户相关接口
│   ├── assets/        # 静态资源
│   │   ├── imgs/      # 图片资源
│   │   └── svgs/      # SVG图标
│   ├── axios/         # 网络请求
│   │   ├── helper/    # 辅助函数
│   │   ├── types/     # 类型定义
│   │   └── index.ts   # Axios实例配置
│   ├── components/    # 自定义组件
│   │   ├── Avatar/    # 自定义头像组件
│   │   ├── BasicTable/ # 自定义基础表格组件
│   │   ├── CrystalButton/ # 自定义水晶按钮组件
│   │   ├── CrystalCalendar/ # 自定义日历组件
│   │   ├── CrystalCascader/ # 自定义级联选择器
│   │   ├── CrystalCheckbox/ # 自定义复选框组件
│   │   ├── CrystalForm/ # 自定义表单组件
│   │   ├── CrystalIcon/ # 自定义图标组件
│   │   ├── CrystalImage/ # 自定义图片组件
│   │   ├── CrystalRadio/ # 自定义单选框组件
│   │   ├── CrystalSelect/ # 自定义选择器组件
│   │   ├── CrystalSwitch/ # 自定义开关组件
│   │   ├── CrystalText/ # 自定义文本组件
│   │   ├── CrystalTimePicker/ # 自定义时间选择器
│   │   ├── CrystalTimeSelect/ # 自定义时间选择组件
│   │   ├── CrystalTree/ # 自定义树组件
│   │   ├── CrystalTreeSelect/ # 自定义树选择组件
│   │   ├── Form/       # 自定义表单组件
│   │   ├── Menu/       # 自定义菜单组件
│   │   ├── Table/      # 自定义高级表格组件
│   │   ├── TagsView/   # 自定义标签页组件
│   │   └── VxContainer/ # 自定义容器组件
│   ├── constants/     # 常量定义
│   ├── directives/    # 指令
│   ├── hook/          # 自定义hook
│   ├── hooks/         # 更多hook
│   ├── layout/        # 布局组件
│   │   ├── src/       # 布局源代码
│   │   └── index.ts   # 布局入口
│   ├── locales/       # 国际化
│   │   └── lang/      # 语言文件
│   ├── plugins/       # 插件
│   ├── router/        # 路由
│   │   ├── asyncRouterHelper.ts # 动态路由助手
│   │   └── index.ts   # 静态路由配置
│   ├── scripts/       # 脚本
│   ├── store/         # 状态管理
│   │   ├── modules/   # 模块
│   │   └── index.ts   # 状态管理入口
│   ├── styles/        # 样式
│   │   ├── element/   # Element Plus主题
│   │   ├── index.scss # 样式主入口
│   │   ├── var.scss   # 全局变量
│   │   └── reset.scss # 重置样式
│   ├── utils/         # 工具函数
│   ├── views/         # 页面
│   │   ├── ClAlert/   # 告警组件示例
│   │   ├── ClForm/    # 表单组件示例
│   │   ├── ClTable/   # 表格组件示例
│   │   ├── Dashboard/ # 仪表盘
│   │   ├── Error/     # 错误页面
│   │   ├── Login/     # 登录页面
│   │   └── Workflow/  # 工作流
│   ├── App.vue        # 根组件
│   ├── main.ts        # 入口文件
│   └── vite-env.d.ts  # Vite类型声明
├── types/             # 类型定义
├── .env.development   # 开发环境配置
├── .env.production    # 生产环境配置
├── .eslintignore      # ESLint忽略文件
├── .eslintrc.json     # ESLint配置
├── .gitignore         # Git忽略文件
├── .prettierignore    # Prettier忽略文件
├── .prettierrc.js     # Prettier配置
├── .stylelintignore   # Stylelint忽略文件
├── .stylelintrc.json  # Stylelint配置
├── LICENSE            # 许可证
├── README.md          # 项目说明
├── auto-imports.d.ts  # 自动导入类型
├── index.html         # HTML模板
├── package.json       # 项目依赖
├── pnpm-lock.yaml     # pnpm锁定文件
├── tsconfig.json      # TypeScript配置
├── vite.config.ts     # Vite配置
└── vite.config.ts.timestamp-*.mjs  # Vite配置时间戳文件
```

## 目录说明

### 核心目录

| 目录              | 说明        | 主要内容                |
| ----------------- | ----------- | ----------------------- |
| `src/api/`        | API接口管理 | 按功能模块组织的API接口 |
| `src/components/` | 组件库      | 自定义和封装的Vue组件   |
| `src/layout/`     | 布局组件    | 应用的整体布局结构      |
| `src/router/`     | 路由配置    | 静态和动态路由定义      |
| `src/store/`      | 状态管理    | Pinia状态管理模块       |
| `src/styles/`     | 样式文件    | 全局样式和主题配置      |
| `src/views/`      | 页面视图    | 应用的各个页面          |

### 配置文件

| 文件               | 说明           | 用途                 |
| ------------------ | -------------- | -------------------- |
| `.env.development` | 开发环境配置   | 开发模式下的环境变量 |
| `.env.production`  | 生产环境配置   | 生产模式下的环境变量 |
| `vite.config.ts`   | Vite配置       | 构建工具配置         |
| `tsconfig.json`    | TypeScript配置 | 类型检查和编译配置   |
| `package.json`     | 项目配置       | 依赖管理和脚本定义   |

### 工具目录

| 目录     | 说明     | 用途                 |
| -------- | -------- | -------------------- |
| `build/` | 构建配置 | 自定义构建流程       |
| `mock/`  | 模拟数据 | 开发环境模拟后端数据 |
| `types/` | 类型定义 | 全局TypeScript类型   |

## 技术栈

| 类别       | 技术/库                            | 版本    |
| ---------- | ---------------------------------- | ------- |
| 前端框架   | Vue                                | ^3.4.14 |
| 状态管理   | Pinia                              | ^2.1.7  |
| 路由       | Vue Router                         | ^4.2.5  |
| UI库       | Element Plus                       | ^2.4.2  |
| 表格       | 自定义表格组件 (BasicTable, Table) | -       |
| 网络请求   | Axios                              | ^1.6.2  |
| 构建工具   | Vite                               | ^5.1.6  |
| 语言       | TypeScript                         | ^5.4.3  |
| 样式预处理 | SCSS                               | ^1.69.5 |

## 项目特点

1. **模块化结构**：按功能模块组织代码，职责清晰
2. **类型安全**：完整的TypeScript类型支持
3. **自定义组件库**：丰富的自定义组件，包括表格、表单、按钮等
4. **响应式设计**：适配不同屏幕尺寸
5. **国际化支持**：内置多语言切换
6. **主题定制**：支持亮色/暗黑模式
7. **开发友好**：完善的模拟数据和开发工具链
8. **表格组件**：使用自定义的BasicTable和Table组件，而非vxe-table

通过这种结构化的目录组织，项目具有良好的可维护性和可扩展性，便于团队协作和后续功能迭代。
