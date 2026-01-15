import AlarmWS from './AlarmWS.vue'
import type { AlarmApiError } from '@ah/api'

export interface AlarmWSProps {
  userInfo: UserInfo
  tokenId: string // 传token
}
export interface UserInfo {
  userId: string
}
export interface AlarmWSMessageConf {
  isPop: boolean // 是否弹窗
  isAlarm: boolean //是否开启告警提醒
  voiceType: number //提醒类型 1-系统铃声，2-语音模板
  isReceive: boolean //是否订阅
}

export interface AlarmWSData {
  alarmId: string // 告警ID
  alarmKindId: string // 告警类型ID
  alarmName: string // 告警名称
  msg: string // 告警内容
  msgVoice: string // 声音消息内容
  alarmTitle: string // 告警标题
  alarmDesc: string // 告警描述
  isNew: boolean // 是否是新消息
  isRead: boolean // 是否已读
  iconUrl: string // 图标URL
  alarmMajor: number
  alarmLevel: number
}
export interface AlarmWSMessage {
  cnt: AlarmWSData //收到的消息
  conf: AlarmWSMessageConf //用户配置
}

export type AlarmWSEmits = {
  onMessage: [value: AlarmWSMessage]
  onApiError: [value: AlarmApiError]
}
export type AlarmWSInstance = InstanceType<typeof AlarmWS>
