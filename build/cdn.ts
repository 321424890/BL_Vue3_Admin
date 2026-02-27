import { Plugin as importToCDN } from "vite-plugin-cdn-import"

export const cdn = importToCDN({
  prodUrl: "https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}",
  modules: [
    {
      name: "vue",
      var: "Vue",
      version: "3.4.14",
      path: "vue.global.prod.min.js"
    },
    {
      name: "vue-router",
      var: "VueRouter",
      version: "4.2.5",
      path: "vue-router.global.min.js"
    },
    {
      name: "vue-i18n",
      var: "VueI18n",
      version: "9.8.0",
      path: "vue-i18n.runtime.global.prod.min.js"
    },
    {
      name: "vue-demi",
      var: "VueDemi",
      version: "0.14.7",
      path: "index.iife.min.js"
    },
    {
      name: "pinia",
      var: "Pinia",
      version: "2.1.7",
      path: "pinia.iife.min.js"
    },
    {
      name: "element-plus",
      var: "ElementPlus",
      version: "2.4.2",
      path: "index.full.min.js",
      css: "index.min.css"
    },
    {
      name: "axios",
      var: "axios",
      version: "1.6.2",
      path: "axios.min.js"
    },
    {
      name: "echarts",
      var: "echarts",
      version: "5.5.0",
      path: "echarts.min.js"
    }
  ]
})
