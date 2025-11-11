<template>
  <div v-if="isNew" class="alarm" @click="onClick" :class="{ isHide: isAlarmDialogVisible }">
    <!-- 告警弹窗 -->
    <AlarmDialog v-model:visible="isAlarmDialogVisible" ref="alarmDialogRef" />
    <!-- 告警数 -->
    <AlarmCount :unRead="unRead" :isAlarmDialogVisible="isAlarmDialogVisible" />
    <!-- 告警socket -->
    <AlarmHelperWS
      :tokenId="props.tokenId"
      :userInfo="props.userInfo"
      @onMessage="onReceiveMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { AlarmTypeIds, getAlarmSmallTypeImgUrl } from '@ah/utils'
import { AlarmSpeech as speech } from '@ah/audio'
import { type UnreadBean, type AlarmApiError, AlarmRobotApi } from '@ah/api'
import { AlarmCount, AlarmDialog } from './components/index'
import { AlarmHelperWS } from '@ah/comp'
import { useApiError, useRefresh } from './useCustomHook'
import type { AlarmHelperProps, AlarmHelperEmits } from './alarm-helper'
import type { AlarmWSMessage } from '@ah/comp/alarm-ws/AlarmWS'
import { updateTokenId } from '../utils'
import type { AlarmDialogCntInstance } from '@ah/comp/alarm-dialog-cnt/alarm-dialog-cnt'

const props = withDefaults(defineProps<AlarmHelperProps>(), {
  showAlarmRule: false,
  isIntegated: true,
})
provide('showAlarmRule', props.showAlarmRule)

const { isNew, updateNew } = useRefresh()
watch(
  () => props.tokenId,
  (val) => {
    updateTokenId(val)
    if (val) {
      initCount()
      updateNew()
    } else {
      // throw new Error('初始化告警小助手缺少必要参数tokenId !!!!!')
      console.error('初始化告警小助手缺少必要参数tokenId !!!!!')
    }
  },
  { immediate: true },
)

const emits = defineEmits<AlarmHelperEmits>()

const isAlarmDialogVisible = ref<boolean>(false)

const onClick = ({}) => {
  isAlarmDialogVisible.value = true
}
watch(isAlarmDialogVisible, (val) => {
  if (!val) {
    initCount()
  }
})

const unRead = ref<UnreadBean>({
  isImportant: false,
  num: 0,
})

const alarmDialogRef = shallowRef<HTMLElement & { alarmRobotRef: AlarmDialogCntInstance }>()

onMounted(() => {})
onBeforeUnmount(() => {})

function initCount() {
  AlarmRobotApi.getUnReadAlarmMsgInfo().then((res) => {
    unRead.value = res.data
  })
}

// 处理socket 包
async function onReceiveMessage(message: AlarmWSMessage) {
  const {
    isPop, //是否需要弹窗
    isAlarm, //是否开启铃声
    voiceType, //铃声类型
    isReceive, // 是否订阅
  } = message.conf
  // 收到的原始消息内容
  const data = message.cnt

  console.log('告警配置: ', {
    isPop,
    isAlarm,
    voiceType,
    isReceive,
  })
  // 更新总数
  !isAlarmDialogVisible.value && initCount()

  if (!isReceive) {
    console.warn('未订阅该告警类型', data.alarmId)
    return
  }

  const isDialogShow = isAlarmDialogVisible.value
  // 此处需要弹窗
  if (isPop) {
    isAlarmDialogVisible.value = true
  } else {
    console.log('该告警类型未设置弹窗提醒: ', data)
  }

  // 此处需要告警声音
  if (isAlarm) {
    if (voiceType == 1) {
      // 播放系统默认声音
      // 停止上一次
      // speech.cancelSpeakAudio()
      // 播放当次
      speech.startSpeakAudio()
    } else {
      // 停止上一次
      // speech.cancelSpeakText()
      // 播放当次
      speech.startSpeakText(data.msgVoice)
    }
  } else {
    console.log('该告警类型未设置声音提醒: ', data)
  }

  await nextTick()

  // 告警内容实例
  const alarmRobotRef = alarmDialogRef.value?.alarmRobotRef
  //更新菜单列表
  alarmRobotRef?.menuListRef?.initMenu()

  // 告警弹窗已存在,更新消息列表(如果弹窗不存在,初始化后会去拿一遍接口数据,故不需要额外处理)
  if (isDialogShow) {
    //如果是同类型,更新列表
    const isInsertMsgList =
      String(alarmRobotRef?.alarmTypeIdSelect) === String(data.alarmKindId) ||
      alarmRobotRef?.alarmTypeIdSelect === AlarmTypeIds.ALL

    // 将新消息插入列表
    if (isInsertMsgList) {
      const newOne = Object.assign(data, {
        alarmTitle: data.alarmName,
        alarmDesc: data.msg,
        isNew: true,
        isRead: false,
        iconUrl: getAlarmSmallTypeImgUrl(String(data.alarmId).padStart(3, '0')),
      })
      alarmRobotRef?.alarmListRef?.insertMsgList(newOne)
    }
  }
}

// 向外抛出请求异常
useApiError((data: unknown) => {
  emits('onApiError', data as AlarmApiError)
})
</script>

<style scoped lang="scss">
.alarm {
  cursor: pointer;
  user-select: none;
  position: fixed;
  right: 6px;
  bottom: 2px;
  width: 68px;
  height: 98px;
  background: url(../assets/images/alarm-robot.png) 0 0 / 100% 100% no-repeat;
  z-index: 2000;
  &.isHide {
    background: none;
  }
}
</style>
