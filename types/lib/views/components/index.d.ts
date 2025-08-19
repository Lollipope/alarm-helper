import { default as AlarmDialog } from './alarm-dialog.vue';
import { default as AlarmCount } from './alarm-count.vue';
export { AlarmDialog, // 告警中心弹窗
AlarmCount, };
export type AlarmDialogInstance = InstanceType<typeof AlarmDialog>;
export type AlarmCountInstance = InstanceType<typeof AlarmCount>;
