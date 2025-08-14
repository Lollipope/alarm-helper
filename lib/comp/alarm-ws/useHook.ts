/**
 * 告警配置
 */
export function useAlarmConf() {
  const alarmConf = ref()
  function setAlarmConf(data: any[]) {
    alarmConf.value = data.reduce((sum, item) => {
      sum[item.alarmId] = {
        ...item,
      }
      return sum
    }, {})
  }
  return [alarmConf, setAlarmConf] as const
}
