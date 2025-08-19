/*
 * @Author: Lollipope
 * @Date: 2025-05-16 11:39:03
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-07-17 15:34:30
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\api\alarm.ts
 * @Description: 告警业务API
 */
import * as request from './request'
// import { getLocalStorageToken } from './auth'
import { getTokenId } from '../utils'
import qs from 'qs'
import type {
  AlarmHistoryParams,
  ResponseResult,
  PageList,
  AlarmSmallType,
  AlarmUserConf,
  UnreadBean,
  AlarmBigType,
  SortAlarmBigType,
  AlarmConfigMsgUser,
  StreamPlayApiParams,
  StreamStopApiParams,
} from './types'
// 告警历史列表
export function getAlarmMsgPage(
  params: AlarmHistoryParams,
): Promise<ResponseResult<PageList<any>>> {
  return request.get('/alarm/alarmMg/getAlarmMsgPage', params)
}

// 根据大类查询小类信息
export function getAlarmConfigListByKindId(
  alarmKindId: number | string,
): Promise<ResponseResult<Array<AlarmSmallType>>> {
  return request.get('/alarm/alarmConfigMsg/getAlarmConfigListByKindId', {
    alarmKindId,
  })
}

// 查询系统地址
export function getUserConfigByAlarmId(
  alarmId: number | string,
): Promise<ResponseResult<AlarmUserConf>> {
  return request.get(`/alarm/alarmConfigMsgUser/getUserConfigByAlarmId?alarmId=${alarmId}`)
}
// 正报误报 1:正报 2:误报
export function doHandle(params: {
  msgId: string
  status: '1' | '2'
}): Promise<ResponseResult<null | string>> {
  return request.put_form(`/alarm/alarmMg/doHandle`, params)
}
// 一键已读所有消息
export function readAllMsg({
  alarmKindId,
}: {
  alarmKindId?: string | number
}): Promise<ResponseResult<null | string>> {
  return request.put_form(`/alarm/alarmMg/readAllMsg`, { alarmKindId })
}
// 已读消息
export function readMsgById(msgId: string): Promise<ResponseResult<null | string>> {
  return request.put_form(`alarm/alarmMg/readMsgById`, { msgId })
}

//  查询未读消息数量信息
export function getUnReadAlarmMsgInfo(): Promise<ResponseResult<UnreadBean>> {
  return request.get(`/alarm/alarmMg/getUnReadAlarmMsgInfo`)
}

// 查看所有菜单项
export function getConfigMsgKindList(params: any): Promise<ResponseResult<Array<AlarmBigType>>> {
  return request.get(`/alarm/alarmConfigMsgKind/getConfigMsgKindList`, params)
}

//更新排序
export function updateAlarmConfigMsgKindSort(
  params: SortAlarmBigType,
): Promise<ResponseResult<null | string>> {
  return request.put(`/alarm/alarmConfigMsgKind/updateAlarmConfigMsgKindSort`, params)
}

// 根据告警类型id查询用户配置信息列表
export function getUserConfigList(): Promise<ResponseResult<Array<AlarmConfigMsgUser>>> {
  return request.get(`/alarm/alarmConfigMsgUser/getUserConfigList`)
}

function withCustomHeader(): Record<string, string> {
  const token = getTokenId() || ''
  return {
    'Content-Type': 'application/json', // 指定请求体的格式为 JSON
    'Accept-Sign-Ignore': 'BIGBIGGIRL',
    'cdp-token': token,
  }
}
// 播放流
export function getStreamUrl(params: StreamPlayApiParams) {
  const BaseURL = window.globalConfig?.AlarmRobotApiContext || '/api/'
  const url = `${BaseURL}alarm/stream/getDeviceUrl`
  return fetch(url, {
    method: 'POST', // 设置请求方法为 POST
    headers: {
      ...withCustomHeader(),
    },
    body: JSON.stringify(params), // 将数据对象转换为 JSON 字符串
  }).then((response) => response.json())
}

// 停止流
export function stopDevicePlay(params: StreamStopApiParams) {
  const BaseURL = window.globalConfig?.AlarmRobotApiContext || '/api/'
  const url = `${BaseURL}alarm/stream/stopDevicePlay?${qs.stringify(params)}`
  return fetch(url, {
    method: 'GET', // 设置请求方法为 POST
    headers: {
      ...withCustomHeader(),
    },
  }).then((response) => response.json())
}
