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
export interface AlarmWSMessage {
  cnt: any //收到的消息
  conf: AlarmWSMessageConf //用户配置
}

export type AlarmWSEmits = {
  onMessage: [value: AlarmWSMessage]
  onApiError: [value: AlarmApiError]
}
export type AlarmWSInstance = InstanceType<typeof AlarmWS>
