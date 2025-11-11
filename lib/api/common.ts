/*
 * @Author: Lollipope
 * @Date: 2025-05-09 15:56:23
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-06-30 17:07:45
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\api\common.ts
 * @Description: 通用相关API
 */
import * as request from './request'
import type { DictOptions, ResponseResult, SectionItem, sendParams, HistoryPageParams } from './types'
// 根据key（parentId）查询字典
export function getDictionaryListByKey(key: string): Promise<DictOptions> {
  return request.get('/alarm/alarmDictionary/getDictionaryListByKey', { key })
}

// 修改备注
export function updateRemark(
  msgId: string,
  remark: string,
): Promise<ResponseResult<null | string>> {
  return request.put_form('/alarm/alarmMg/updateRemark', { msgId, remark })
}
// // 查询所有大类列表
// export const getAlarmConfigMsgKindList = () => {
//   return request.get('/alarm/alarmConfigMsgKind/getAlarmConfigMsgKindList')
// }

// // 查询所有小类列表
// export const getAlarmConfigList = () => {
//   return request.get('/alarm/alarmConfigMsg/getAlarmConfigList')
// }

// // 查询系统列表
// export const getAlarmHandleSystemList = () => {
//   return request.get('/alarm/alarmHandleSystem/getAlarmHandleSystemList')
// }

// // 查询角色列表
// export const getRoleList = () => {
//   return request.post('/system/role/list')
// }
// 查询管理区间
export function getSectionList(): Promise<ResponseResult<SectionItem[]>> {
  return request.get(`/alarm/alarmMg/getSectionList`)
}

// export const getAllUserInfoList = () => {
//   return request.get(`/alarm/smsUserInfo/getAllUserInfoList`)
// }

export function getAllUserInfoList() {
  return request.get(`/alarm/smsUserInfo/getAllUserInfoList`)
}

export function sendSms(params : sendParams[]) {
  return request.postJson(`/alarm/smsSend/sendSms`,params)
}

export function getSmsSendHistoryPage(params : HistoryPageParams) {
  return request.postJson(`/alarm/smsSend/getSmsSendHistoryPage`,params)
}
