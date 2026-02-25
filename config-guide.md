# 基础配置文档

## 配置

### 环境变量

环境变量是运行时动态的全局变量，在项目启动时，会根据当前环境加载对应的环境变量。

Vite 的环境变量命名遵循 `VITE_` 开头，然后加上环境名称，比如 `VITE_PORT`。

### 配置文件

本项目一共有 2 个环境配置文件，具体如下：

| 序号 | 配置文件 | 说明 |
|------|---------|------|
| 1 | `.env.development` | 开发环境 |
| 2 | `.env.production` | 生产环境 |

`.env.development` 是开发环境变量文件，它在开发环境下生效，当运行 `npm run dev` 时，项目会加载该文件的变量。

`.env.production` 是生产环境变量文件，它在生产环境下生效，当运行 `npm run build` 时，项目会加载该文件的变量。

### 开发环境配置

**文件路径：** `.env.development`

```env
# 项目标题，名称
VITE_APP_TITLE = "VxAdmin"
# 本地运行端口号(修改此处保存可立即重启vite开发服务器)
VITE_PORT = 8080
# . 清除 Vite 缓存（Windows 命令）
# Remove-Item -Recurse -Force node_modules/.vite
# 开发环境读取配置文件路径
VITE_PUBLIC_PATH = /

# 开发环境路由历史模式（Hash模式传"hash"、HTML5模式传"h5"、Hash模式带base参数传"hash,base参数"、HTML5模式带base参数传"h5,base参数"）
VITE_ROUTER_HISTORY = "hash"

# 压缩时删除原始文件的配置：gzip-clear、brotli-clear、both-clear（同时开启 gzip 与 brotli 压缩）、none（不开启压缩，默认）
VITE_COMPRESSION = "none"
#是否生成report.html报告文件
VITE_REPORT = false
```

### 生产环境配置

**文件路径：** `.env.production`

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

### 配置项说明

| 配置项 | 说明 | 默认值 | 可选值 |
|--------|------|--------|--------|
| `VITE_APP_TITLE` | 项目标题，名称 | "VxAdmin" | 字符串 |
| `VITE_PORT` | 本地运行端口号 | 8080 | 数字 |
| `VITE_PUBLIC_PATH` | 项目公共路径 | / | 字符串 |
| `VITE_ROUTER_HISTORY` | 路由历史模式 | "hash" | "hash", "h5" |
| `VITE_COMPRESSION` | 压缩配置 | 开发环境："none"<br>生产环境："gzip" | "gzip-clear", "brotli-clear", "both-clear", "none" |
| `VITE_CDN` | 是否使用CDN替换本地库 | true | true, false |
| `VITE_REPORT` | 是否生成report.html报告文件 | false | true, false |

### 命令说明

| 命令 | 说明 | 环境 |
|------|------|------|
| `npm run dev` | 启动开发服务器 | 开发环境 |
| `npm run build` | 构建生产版本 | 生产环境 |
| `npm run preview` | 预览生产构建结果 | 生产环境 |

### 缓存清理

**Windows 命令：**
```powershell
Remove-Item -Recurse -Force node_modules/.vite
```

**作用：** 清除 Vite 缓存，解决依赖或构建问题

### 注意事项

1. 环境变量名称必须以 `VITE_` 开头，否则 Vite 不会识别
2. 修改环境变量后，需要重启开发服务器才能生效
3. 生产环境配置文件中的敏感信息应该通过 CI/CD 流程注入，避免硬编码
4. 不同环境的配置文件应该保持结构一致，只修改对应环境的具体值