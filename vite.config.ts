import { resolve } from "path"
import { loadEnv } from "vite"
import { readEnv } from "./build/index"
import type { UserConfig, ConfigEnv } from "vite"
import { getPluginsList } from "./build/plugins"
import type { AcceptedPlugin } from "postcss"
import postcssImport from "postcss-import"
import cssnano from "cssnano"

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(root, ".", dir)
}

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build"),
  // 使用用户指定的crystal-ui路径配置
  "crystal-ui": pathResolve("../element-plus-wrapper/packages/crystal-ui/src/index.ts")
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_PORT, VITE_CDN, VITE_PUBLIC_PATH, VITE_REPORT, VITE_COMPRESSION } = readEnv(loadEnv(mode, root))
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: getPluginsList(VITE_CDN, VITE_REPORT, VITE_COMPRESSION),
    // 解决路径
    resolve: {
      alias,
      // 确保依赖从主项目的 node_modules 解析，而不是外部包的 node_modules
      dedupe: ["vue", "element-plus", "@element-plus/icons-vue", "echarts"],
      // 确保从主项目的 node_modules 解析模块
      preserveSymlinks: false,
      // 确保能够解析外部包的依赖
      conditions: ["import", "module", "browser", "default"]
    },
    // vue 3.4去除控制台warning
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true"
    },
    // css配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      },
      postcss: {
        plugins: [postcssImport as AcceptedPlugin, ...(mode === "production" ? [cssnano] : [])]
      }
    },
    // 打包
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
    },
    // 服务
    server: {
      port: VITE_PORT,
      proxy: {},
      hmr: {
        overlay: false
      },
      host: "0.0.0.0",
      // 允许访问外部包目录
      fs: {
        allow: [root, "../element-plus-wrapper"]
      }
    },
    // 预构建 include构建 exclude排除
    optimizeDeps: {
      include: [
        "vue",
        "pinia",
        "vue-i18n",
        "vue-router",
        "@vueuse/core",
        "element-plus",
        "element-plus/es/locale/lang/zh-cn",
        "element-plus/es/locale/lang/en",
        "@element-plus/icons-vue",
        "axios",
        "echarts",
        "echarts/core",
        "echarts/charts",
        "echarts/components",
        "echarts/renderers",
        "vxe-table",
        "xe-utils",
        "lodash-es",
        "crystal-ui"
      ],
      exclude: ["@iconify-icons/ep", "@iconify-icons/ri", "@iconify/vue"],
      // 强制重新预构建（开发时如果遇到模块解析问题，可以临时启用）
      force: true
    }
  }
}
