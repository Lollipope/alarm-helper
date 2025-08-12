import AlarmConfirm from './AlarmConfirm.vue'

export interface AlarmConfimProps {
  modelValue: boolean
}
export type AlarmConfirmEmits = {
  onYes: []
  onNo: []
}

export type AlarmConfirmInstance = InstanceType<typeof AlarmConfirm>
