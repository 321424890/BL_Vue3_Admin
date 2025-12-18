import { useRoutersStoreWithOut } from "@/store/modules/router"
import { getRouterList } from "@/api/user"
import type { RouteRecordRaw } from "vue-router"
import { createRouter } from "@/router/asyncRouterHelper"

/**
 * 文件保存监听器 - 监听文件保存事件并重新请求菜单接口
 */
class FileSaveWatcher {
  private static instance: FileSaveWatcher
  private watchFolders: string[] = []
  private lastModified: Map<string, number> = new Map()
  private isWatching: boolean = false
  private watchInterval: number | null = null
  private routersStore = useRoutersStoreWithOut()

  private constructor() {}

  /**
   * 获取单例实例
   */
  static getInstance(): FileSaveWatcher {
    if (!FileSaveWatcher.instance) {
      FileSaveWatcher.instance = new FileSaveWatcher()
    }
    return FileSaveWatcher.instance
  }

  /**
   * 添加要监听的文件夹路径
   * @param folders 文件夹路径数组
   */
  addWatchFolders(folders: string[]): void {
    this.watchFolders = [...this.watchFolders, ...folders]
  }

  /**
   * 开始监听文件变化
   * @param interval 检查间隔，默认1000ms
   */
  startWatching(interval: number = 1000): void {
    if (this.isWatching) return

    this.isWatching = true
    this.initializeLastModified()

    this.watchInterval = window.setInterval(() => {
      this.checkForChanges()
    }, interval)
  }

  /**
   * 停止监听
   */
  stopWatching(): void {
    if (this.watchInterval) {
      clearInterval(this.watchInterval)
      this.watchInterval = null
    }
    this.isWatching = false
  }

  /**
   * 初始化文件最后修改时间
   */
  private async initializeLastModified(): Promise<void> {
    // 在实际环境中，这里需要遍历监听文件夹获取文件修改时间
    // 由于浏览器环境限制，这里仅作为示例
    console.log("文件监听器已启动，监听文件夹:", this.watchFolders)
  }

  /**
   * 检查文件是否有变化
   */
  private async checkForChanges(): Promise<void> {
    // 在实际环境中，这里需要检查文件修改时间
    // 由于浏览器环境限制，我们使用其他方式模拟文件保存检测
  }

  /**
   * 手动触发菜单更新
   * 当检测到文件保存时调用此方法
   */
  async refreshMenu(): Promise<void> {
    try {
      console.log("检测到文件保存，正在刷新菜单...")
      const res = await getRouterList({ page: 1, pageSize: 999 })
      const list = (res.data?.data?.list || []) as RouteRecordRaw[]
      
      if (list.length) {
        this.routersStore.setRouters(list)
        createRouter(list)
        console.log("菜单刷新成功")
        
        // 触发自定义事件，通知其他组件菜单已更新
        window.dispatchEvent(new CustomEvent('menu-updated', { detail: { routes: list } }))
      }
    } catch (error) {
      console.error("刷新菜单失败:", error)
    }
  }
}

export default FileSaveWatcher