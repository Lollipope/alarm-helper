<script setup lang="ts">
import { emitter } from '@ah/utils'
import { AlarmSocket } from '@ah/audio/index'
import { type AlarmConfigMsgUser, type AlarmApiError, AlarmRobotApi } from '@ah/api'
import { useApiError } from '@ah/views/useCustomHook'
import { useAlarmConf } from './useHook'
import type { AlarmWSProps, AlarmWSEmits, AlarmWSMessageConf } from './AlarmWS'
import { updateTokenId } from '@ah/utils/tokenId'

defineOptions({
  name: 'AlarmHelperWS',
})
const props = defineProps<AlarmWSProps>()
const emits = defineEmits<AlarmWSEmits>()

watch(
  () => props.tokenId,
  (val) => {
    updateTokenId(val)
  },
  { immediate: true },
)

let alarmSocket: AlarmSocket

const [, setAlarmConf] = useAlarmConf()
onMounted(() => {
  initEvent()
  initSocket()
})

// 告警配置
function initConf() {
  AlarmRobotApi.getUserConfigList().then((res) => {
    setAlarmConf(res.data)
  })
}
function initEvent() {
  emitter.on('update:conf', initConf)
}
function removeEvent() {
  emitter.off('update:conf', initConf)
}
function initSocket() {
  alarmSocket = new AlarmSocket(getWSUrl(), {
    onOpen: () => {
      console.log('socket:open')
    },
    onClose: () => {
      console.log('socket:close')
    },
    onMessage: (data: string) => {
      console.log('socket:onmessage', data)
      handleMessage(data)
    },
  })
  alarmSocket.connect()
}
// 告警中心Socket地址
function getWSUrl() {
  let socketUrl = ''
  const AlarmCenterWsUrl = window.globalConfig.AlarmCenterWsUrl
  if (window.location.href.indexOf('https:') === 0) {
    socketUrl = `wss://${AlarmCenterWsUrl}/alarm/msgHelper`
  } else {
    socketUrl = `ws://${AlarmCenterWsUrl}/alarm/msgHelper`
  }
  // 实例化socket
  return `${socketUrl}/${props.userInfo.userId}`
}
// 处理socket 包
async function handleMessage(cnt: string) {
  try {
    const content = JSON.parse(cnt)
    const data = content.data
    // 获取当前消息的配置
    const alarmConf = await getAlarmConf(data)
    emits('onMessage', { cnt: data, conf: dealWithWsData(alarmConf, data) })
  } catch (error) {
    console.log('解析socket 包异常', error)
  }
}
function getAlarmConf(data: { alarmId: string | number }) {
  return AlarmRobotApi.getUserConfigByAlarmId(data.alarmId).then(
    (res) => res.data.alarmConfigMsgUser,
  )
}
function dealWithWsData(alarmIdConf: AlarmConfigMsgUser, data: any): AlarmWSMessageConf {
  if (!alarmIdConf) {
    console.warn('找不到该告警类型配置')
    return {
      isPop: false,
      isAlarm: false,
      voiceType: 0,
      isReceive: false,
    }
  }
  console.log('告警配置提醒配置: ', alarmIdConf)

  // 是否需要弹窗
  const isPop = alarmIdConf.popLevel.includes(String(data.alarmLevel))
  // 是否开启提醒
  const isAlarm = alarmIdConf.useVoice == 1
  // 提醒类型 1-系统铃声，2-语音模板
  const voiceType = alarmIdConf.voiceType
  //是否接受告警
  const isReceive = alarmIdConf.isReceive == 1
  return {
    isPop, //是否需要弹窗
    isAlarm,
    voiceType, //铃声类型
    isReceive, // 该消息是否订阅
  }
}

onBeforeUnmount(() => {
  alarmSocket.closeSocket()
  removeEvent()
})

// 向外抛出请求异常
useApiError((data: unknown) => {
  emits('onApiError', data as AlarmApiError)
})
</script>

<style scoped lang="scss"></style>
