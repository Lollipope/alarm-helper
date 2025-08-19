<template>
  <div class="alarm-detail">
    <ActionBar @on-his="onHis" @on-set="onSet" @on-read="onRead" />
    <div class="detail" v-if="alarmSelect && alarmSelect.msgId && isNew">
      <DetailCommon :alarmSelect="props.alarmSelect" :systemConf="PermConf.system" />
      <!-- 备注 -->
      <Remark :alarmSelect="props.alarmSelect" />
      <div class="other-box">
        <!-- 20250328 这一版不实现 -->
        <ControlStra v-if="false" />

        <!-- 附件 -->
        <Attachment :alarmSelect="alarmDetialInfo" v-if="PermConf.audio.perm" />

        <!-- 设备反馈结果 -->
        <FallBackList :alarmSelect="alarmDetialInfo" v-if="PermConf.fallback.perm" />

        <!-- 视频抓拍 -->
        <template v-if="PermConf.pic.perm">
          <PicCapture :alarmSelect="alarmDetialInfo" v-if="picShowFn(alarmDetialInfo)" />
          <NoImg v-else :head-type="'视频抓拍'"></NoImg>
        </template>

        <!-- 录像回放 -->
        <template v-if="PermConf.record.perm">
          <RecordPlay :alarmSelect="alarmDetialInfo" v-if="recordShowFn(alarmDetialInfo)" />
          <NoImg v-else :head-type="'录像回放'"></NoImg>
        </template>

        <!-- 视频实况 -->
        <template v-if="PermConf.live.perm">
          <LivePlay :alarmSelect="alarmDetialInfo" v-if="liveShowFn(alarmDetialInfo)" />
          <NoImg v-else :head-type="'视频实况'"></NoImg>
        </template>
      </div>
    </div>
    <!-- 告警弹窗 -->
    <AlarmConfirm v-model="dialogVisible" @onYes="onConfirmed" @onNo="dialogVisible = false" />
  </div>
</template>

<script setup lang="ts">
import { AlarmRobotApi, type AlarmMsg } from '@ah/api'
import { defaultPerm, syncUserPermConfig } from '@ah/utils'
import DetailCommon from './DeatilCommon.vue'
import ControlStra from './ControlStra.vue'
import RecordPlay from './RecordPlay.vue'
import PicCapture from './PicCapture.vue'
import LivePlay from './LivePlay.vue'
import ActionBar from './ActionBar.vue'
import AlarmConfirm from '../../../alarm-confirm/AlarmConfirm.vue'
import FallBackList from './FallBackList.vue'
import Remark from './Remark.vue'
import Attachment from './Attachment.vue'
import { ElMessage } from 'element-plus'
// import { getLocalStorageToken } from '@ah/api/auth'
import { getTokenId } from '@ah/utils/tokenId'
import NoImg from './NoImg.vue'
const emits = defineEmits(['onRead'])
const props = defineProps({
  alarmSelect: {
    type: Object as PropType<AlarmMsg>,
    default: () => ({}),
  },
})
const dialogVisible = ref(false)
const PermConf = ref(defaultPerm)
const isNew = ref(true)

function picShowFn(data: AlarmMsg) {
  if (!data || !data.info || data.info === '') {
    return false
  }
  const infoObj = data?.infoObj as { picUrl: Array<string> }
  if (!infoObj?.picUrl || infoObj.picUrl.length === 0) {
    return false
  }
  return true
}

function recordShowFn(data: AlarmMsg) {
  if (!data || !data.info || data.info === '') {
    return false
  }
  const infoObj = data?.infoObj as { videoUrl: Array<string> }
  if (!infoObj?.videoUrl || infoObj.videoUrl.length === 0) {
    return false
  }
  return true
}

function liveShowFn(data: AlarmMsg) {
  if (!data || !data.info || data.info === '') {
    return false
  }
  const infoObj = data?.infoObj as { deviceId?: string }
  if (!infoObj?.deviceId) {
    return false
  }
  return true
}

watch(
  () => props.alarmSelect,
  (newVal) => {
    if (!newVal || !newVal.alarmId) {
      return
    }
    parseAlarmSelect(newVal)

    isNew.value = false
    // 同步用户配置信息
    syncUserPermConfig(newVal.alarmId).then((val) => {
      PermConf.value = val
      isNew.value = true
    })
  },
)
// 详情信息
const alarmDetialInfo = ref(props.alarmSelect)
function parseAlarmSelect(alarmSelect: AlarmMsg) {
  try {
    alarmSelect.infoObj = JSON.parse(alarmSelect.info)
    alarmDetialInfo.value = alarmSelect
  } catch (error) {
    console.log('解析告警信息异常: ', error)
  }
}

// 获取全局配置
function getGlobalConf() {
  const alarmWebPath = window.globalConfig.AlarmWebPath
  const isIntegrated = !!alarmWebPath
  const path = isIntegrated ? alarmWebPath : `${location.origin}${location.pathname}`
  const target = isIntegrated ? '_blank' : '_self'
  return { path, target, isIntegrated }
}

// 前往历史记录
function onHis() {
  const { path, target, isIntegrated } = getGlobalConf()
  if (isIntegrated) {
    // 外部集成,带token
    const token = getTokenId()
    const newUrl = `${path}#/caslogin?token=${token}&redirect=/`
    window.open(newUrl, target, 'noopener')
    return
  }
  if (!props.alarmSelect || !props.alarmSelect.msgId) {
    window.open(`${path}#/redirect/alarm-history/alarm-history`, target, 'noopener')
    return
  }
  window.open(
    `${path}#/redirect/alarm-history/alarm-history?msgId=${props.alarmSelect.msgId}`,
    target,
    'noopener',
  )
}
// 前往告警配置
function onSet() {
  const { path, target } = getGlobalConf()
  window.open(`${path}#/alarm-center/alarm-rule`, target, 'noopener')
}

// 一键已读
function onRead() {
  dialogVisible.value = true
}
function onConfirmed() {
  AlarmRobotApi.readAllMsg({}).then((res) => {
    const isSuc = res.code === 200
    if (isSuc) {
      dialogVisible.value = false
      ElMessage({
        message: '一键已读成功',
        type: 'success',
      })
      emits('onRead', false)
    }
  })
}
</script>

<style scoped lang="scss">
.alarm-detail {
  margin-left: 7px;
  margin-top: 65px;
  width: 535px;
  .detail {
    height: 654px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 20%, #e9f5ff 25%, #e9f5ff 30%);
    border-radius: 15px;
    border: 2px solid #ffffff;
  }
  .other-box {
    height: calc(100% - 166px);
    padding: 0 16px;
    overflow-y: auto;
    margin-top: 8px;
    margin-bottom: 18px;
    &::-webkit-scrollbar-track {
      background-color: transparent !important;
    }
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb {
      background-color: transparent !important;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #dee5ec !important;
      }
    }
  }
}
</style>
