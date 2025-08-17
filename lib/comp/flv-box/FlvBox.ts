import FlvJs from 'mpegts.js/d.ts/mpegts'
import FlvBox from './FlvBox.vue'

declare namespace FlvExtend {
  interface Player extends FlvJs.Player {}
}

export interface FlvPlayer extends FlvExtend.Player {}
// 组件属性类型
export interface FlvBoxProps {
  deviceId?: string
  systemCode?: string | number
  userName?: string
  protocol?: string
  rate?: 'master' | 'slaver'
}

export type FlvBoxEmits = {}

export type FlvBoxInstance = InstanceType<typeof FlvBox>
