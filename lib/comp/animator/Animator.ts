import { type UnreadBean, type AlarmApiError, AlarmRobotApi } from '@ah/api'
import Animator from './Animator.vue'

export interface AnimatorProps {
  isHide: boolean
  unRead: UnreadBean
}
export type AnimatorEmits = {}

export type AnimatorInstance = InstanceType<typeof Animator>
