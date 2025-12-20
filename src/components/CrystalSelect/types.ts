export interface CrystalSelectOption {
  value: any
  label: string
  disabled?: boolean
  [key: string]: any
}

export interface CrystalSelectOptionGroup {
  label: string
  options: CrystalSelectOption[]
  [key: string]: any
}

export type CrystalSelectData = CrystalSelectOption | CrystalSelectOptionGroup

export interface InfiniteScrollConfig {
  /** 是否启用无限滚动 */
  enabled: boolean
  /** 触底距离，单位像素 */
  distance: number
  /** 是否还有更多数据 */
  hasMore: boolean
  /** 加载更多数据的方法 */
  loadMore: () => Promise<void> | void
}
