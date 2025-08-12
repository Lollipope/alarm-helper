import StreamBox from './StreamBox.vue'

export interface StreamBoxProps {
  pid: string // 设备id
  mode?: string // 模式
}

export type StreamBoxEmits = {}

export type StreamBoxInstance = InstanceType<typeof StreamBox>
