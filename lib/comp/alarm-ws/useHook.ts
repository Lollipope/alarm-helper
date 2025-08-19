import type { AlarmConfigMsgUser } from '@ah/api'
/**
 * 告警配置
 */
export function useAlarmConf() {
  const alarmConf = ref()
  function setAlarmConf(data: Array<AlarmConfigMsgUser>) {
    alarmConf.value = data.reduce<Record<string, AlarmConfigMsgUser>>((sum, item) => {
      sum[item.alarmId] = {
        ...item,
      }
      return sum
    }, {})
  }
  return [alarmConf, setAlarmConf] as const
}
