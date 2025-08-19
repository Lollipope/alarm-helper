import AlarmDialog from './alarm-dialog.vue'
import AlarmCount from './alarm-count.vue'

export {
  AlarmDialog, // 告警中心弹窗
  AlarmCount, // 告警数量
}

export type AlarmDialogInstance = InstanceType<typeof AlarmDialog>
export type AlarmCountInstance = InstanceType<typeof AlarmCount>
