/*
 * @Author: Lollipope
 * @Date: 2025-05-09 15:56:23
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-06-03 11:58:49
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\utils\time.ts
 * @Description:
 */
import dayjs from 'dayjs'
import type { ManipulateType } from 'dayjs'
/**
 * 往前获取间隔时间
 * @param val 获取间隔值
 * @param format 格式化文本
 * @param type 间隔类型
 * @returns Object { startTime,endTime}
 */
export function getLatestInterval(
  val = 2,
  type: ManipulateType = 'day',
  format = 'YYYY-MM-DD HH:mm:ss',
) {
  const dayjsInstance = dayjs()
  const endTime = dayjsInstance.format(format)
  const startTime = dayjsInstance.subtract(val, type).format(format)
  return {
    startTime,
    endTime,
  }
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function formatTime(seconds: number): string {
  // 计算小时、分钟和秒
  let hours: number = Math.floor(seconds / 3600) // 计算小时
  let minutes: number = Math.floor((seconds % 3600) / 60) // 计算分钟
  let remainingSeconds: number = seconds % 60 // 计算剩余秒数

  // 格式化为两位数的字符串
  hours = hours < 10 ? Number('0' + hours) : hours
  minutes = minutes < 10 ? Number('0' + minutes) : minutes
  remainingSeconds = remainingSeconds < 10 ? Number('0' + remainingSeconds) : remainingSeconds

  // 返回格式化后的字符串
  return `${hours}:${minutes}:${remainingSeconds}`
}
