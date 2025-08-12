/*
 * @Author: Lollipope
 * @Date: 2025-05-09 15:56:22
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-06-13 10:40:06
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\index.ts
 * @Description: 依赖库入口文件
 */
import installer from './defaults'
import AlarmHelper from './views/index'
// AlarmHelper库版本号
const version = installer.version
const install = installer.install
// 导出相关属性
export { version, install, AlarmHelper as default }

export * from './utils'
export * from './api'
export * from './audio'
export * from './comp'
