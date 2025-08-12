/*
 * @Author: Lollipope
 * @Date: 2025-05-27 09:22:01
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-05-27 09:22:06
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\utils\dom.ts
 * @Description:
 */
/**
 * 检查视频是否可播放
 * @param url
 * @returns
 */
export function checkVideoPlayable(url: string) {
  return new Promise((resolve) => {
    const video = document.createElement('video')

    // 视频成功加载并且可以播放
    video.oncanplay = () => resolve(url) // 视频可播放
    // 视频加载或播放失败
    video.onerror = () => resolve(null) // 视频不可播放
    // 设置视频源
    video.src = url
    // 由于有时浏览器会提前开始加载，确保开始播放的行为被触发
    video.load()
  })
}
