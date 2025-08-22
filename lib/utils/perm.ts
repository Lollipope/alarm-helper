import { AlarmRobotApi, type SysParam } from '../api'
import type { UserConfig } from './types'
// 详情类型
export const ViewTagType = {
  LIVE: 1,
  PIC: 2,
  RECORD: 3,
  // 后续详情权限请在此配置
  FALLBACK: 5,
  // 录音
  AUDIO: 7,
}
export const defaultPerm: UserConfig = {
  // 前往处理配置
  system: { perm: false, url: '', btn: false, paramList: [] },
  // 实况配置
  live: { perm: false },
  // 图片配置
  pic: { perm: false },
  // 录像配置
  record: { perm: false },
  // 反馈结果
  fallback: {
    perm: false,
  },
  // 录音
  audio: {
    perm: false,
  },
}
/**
 * 同步用户配置
 * @param alarmId 告警小类
 * @returns
 */
export function syncUserPermConfig(alarmId: string | number) {
  return AlarmRobotApi.getUserConfigByAlarmId(alarmId).then(({ data }) => {
    const handleUrl = data.handleUrl
    const isBtnPerm = data.isSupportReport
    const paramList = data.paramList || []

    // 权限初始化
    const viewTag = {
      [ViewTagType.LIVE]: false,
      [ViewTagType.PIC]: false,
      [ViewTagType.RECORD]: false,
      [ViewTagType.FALLBACK]: false,
      [ViewTagType.AUDIO]: false,
    } as Record<string | number, boolean>
    // 更新用户详情权限
    data?.alarmConfigViewList.forEach((item) => {
      if (viewTag[item.viewTag] !== undefined) {
        viewTag[item.viewTag] = true
      }
    })
    // 用户权限赋值
    return {
      // 用户前往按钮权限
      system: {
        perm: !!handleUrl,
        url: handleUrl || '',
        btn: !!isBtnPerm,
        paramList,
      },
      // 用户查看实况权限
      live: {
        perm: viewTag[ViewTagType.LIVE],
      },
      // 用户查看图片权限
      pic: {
        perm: viewTag[ViewTagType.PIC],
      },
      // 用户查看录像权限
      record: {
        perm: viewTag[ViewTagType.RECORD],
      },
      // 用户查看反馈结果权限
      fallback: {
        perm: viewTag[ViewTagType.FALLBACK],
      },
      // 录音权限
      audio: {
        perm: viewTag[ViewTagType.AUDIO],
      },
    }
  })
}

// 获取前往处理系统参数
export function getGoSysParams(params: SysParam[], infoObj: Record<string, string>, msgId: string) {
  let query = ''
  params.forEach((data, index) => {
    if (data.defaultValue && data.defaultValue !== '') {
      query += data.paramCode + '=' + data.defaultValue
    } else {
      query += data.paramCode + '=' + infoObj[data.paramFieldName]
    }
    if (index !== params.length - 1) {
      query += '&'
    }
  })
  const baseParams = `?msgId=${msgId}`

  return `${baseParams}&${query || ''}`
}
