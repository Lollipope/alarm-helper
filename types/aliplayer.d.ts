// aliplayer.d.ts
declare global {
  // AliplayerConfig: 配置对象的类型
  interface AliplayerConfig {
    id: string // DOM 元素 ID
    source: string // 视频 URL
    width: string // 播放器宽度（如 '100%'）
    height: string // 播放器高度（如 '100%'）
    autoplay?: boolean // 是否自动播放
    isLive?: boolean // 是否直播
    rePlay?: boolean // 是否允许重播
    preload?: boolean // 是否预加载
    autoPlayDelay?: number //
    liveRetry?: number //
    autoPlayDelayDisplayText?: string //
    controlBarVisibility?: 'hover' | 'always' | 'never' // 控制条显示方式
    useH5Prism?: boolean // 是否使用 H5 Prism 播放器
    skinLayout?: SkinLayoutItem[] // 播放器皮肤布局
  }

  // SkinLayoutItem: 皮肤布局项的类型
  interface SkinLayoutItem {
    name: string // 布局项名称
    align?: string // 对齐方式，如 'tl', 'cc', 'blabs' 等
    x?: number // 布局项的 X 坐标
    y?: number // 布局项的 Y 坐标
    children?: SkinLayoutItem[] // 子元素（如果有的话）
  }

  interface Aliplayer {
    new (config: AliplayerConfig, fn: (player: Aliplayer) => void): Aliplayer // 可以根据实际返回类型调整这里
    play(): void
    dispose(): void
    // 根据实际 API 添加更多方法
    on(key: string, fn: Function): void
  }

  var Aliplayer: Aliplayer
}

// 导出空对象以便 TypeScript 能识别为模块
export {}
