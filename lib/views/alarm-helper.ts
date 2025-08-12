import AlarmHelper from './alarm-helper.vue'
import type { AlarmApiError } from '@ah/api'
import type { UserInfo } from '../comp/alarm-ws/AlarmWS'
export interface AlarmHelperProps {
  userInfo: UserInfo
  showAlarmRule?: boolean
  isIntegated?: boolean // 是否集成
  tokenId: string // 传token
}

export type AlarmHelperEmits = {
  onApiError: [value: AlarmApiError]
}
export type AlarmHelperInstance = InstanceType<typeof AlarmHelper>
