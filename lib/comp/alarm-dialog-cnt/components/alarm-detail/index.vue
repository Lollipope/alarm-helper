<template>
  <div class="alarm-detail">
    <ActionBar @on-his="onHis" @on-set="onSet" @on-read="onRead" />
    <div class="detail" v-if="alarmSelect && alarmSelect.msgId && isNew">
      <DetailCommon
        @sendMsg="sendMsgFn"
        @linkedControlFn="linkedControlFn"
        :alarmSelect="props.alarmSelect"
        :systemConf="PermConf.system"
      />
      <!-- 备注 -->
      <div class="detail-box">
        <Remark :alarmSelect="props.alarmSelect" />
        <Mute :alarmSelect="alarmDetialInfo" v-if="PermConf.mute.perm" v-model:mute="muteConf" />
        <div class="other-box">
          <!-- 20250328 这一版不实现 -->
          <ControlStra v-if="false" />

          <!-- 附件 -->
          <Attachment :alarmSelect="alarmDetialInfo" v-if="PermConf.audio.perm" />

          <!-- 设备反馈结果 -->
          <FallBackList :alarmSelect="alarmDetialInfo" v-if="PermConf.fallback.perm" />

          <!-- 视频抓拍 -->
          <template v-if="PermConf.pic.perm">
            <template v-if="isAsyncLoading"> <AsyncLoading /></template>
            <template v-else>
              <PicCapture
                :alarmSelect="alarmDetialInfo"
                :liveType="PermConf.relate.liveType"
                :picList="picList"
                v-if="hasPic"
              />
              <NoImg v-else :head-type="'视频抓拍'"></NoImg>
            </template>
          </template>

          <!-- 录像回放 -->
          <template v-if="PermConf.record.perm">
            <template v-if="isAsyncLoading"> <AsyncLoading /></template>
            <template v-else>
              <RecordPlay
                :alarmSelect="alarmDetialInfo"
                v-if="hasVideo"
                :liveType="PermConf.relate.liveType"
                :recordList="videoList"
              />
              <NoImg v-else :head-type="'录像回放'"></NoImg>
            </template>
          </template>

          <!-- 视频实况 -->
          <template v-if="PermConf.live.perm">
            <LivePlay
              :liveType="PermConf.relate.liveType"
              :streamList="liveStreamList"
              :alarmSelect="alarmDetialInfo"
              v-if="hasLiveStream"
            />
            <NoImg v-else :head-type="'视频实况'"></NoImg>
          </template>
        </div>
      </div>
    </div>
    <!-- 告警弹窗 -->
    <AlarmConfirm v-model="dialogVisible" @onYes="onConfirmed" @onNo="dialogVisible = false" />
    <AlarmHelperMsgDialog
      :alarmSelect="alarmDetialInfo"
      v-model:visible="msgDialogShow"
      v-if="msgDialogShow"
    ></AlarmHelperMsgDialog>
    <AlarmHelperLinkedControl
      :alarmSelect="alarmDetialInfo"
      v-model:visible="linkedControlShow"
      v-if="linkedControlShow"
    ></AlarmHelperLinkedControl>
  </div>
</template>

<script setup lang="ts">
import { AlarmRobotApi, CommonApi, type AlarmMsg, type BaseSilent } from '@ah/api'
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
import Mute from './Mute.vue'

import { ElMessage } from 'element-plus'
// import { getLocalStorageToken } from '@ah/api/auth'
import { getTokenId } from '@ah/utils/tokenId'
import NoImg from './NoImg.vue'
import AsyncLoading from './Loading.vue'
import { AlarmHelperMsgDialog, AlarmHelperLinkedControl } from '@ah/comp'
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
const muteConf = ref<BaseSilent>()

const hasPic = ref(false)
const picList = ref()
const isAsyncLoading = ref(false)
function picShowFn(data: AlarmMsg, imgs: Array<string>) {
  const infoObj = data?.infoObj as { picUrl: Array<string> }
  const liveType = PermConf.value.relate.liveType
  if (liveType === 0) {
    isAsyncLoading.value = false
    if (!data || !data.info || data.info === '') {
      hasPic.value = false
      return
    }

    if (!infoObj?.picUrl || infoObj.picUrl.length === 0) {
      hasPic.value = false
      return
    }
    hasPic.value = true
    return
  }

  isAsyncLoading.value = true
  setTimeout(() => {
    picList.value = imgs //['https://172.17.1.33:8443/pic/95.jpg', 'https://172.17.1.33:8443/pic/96.png']
    isAsyncLoading.value = false
    hasPic.value = picList.value.length > 0
  }, 0)
}

const hasVideo = ref(false)
const videoList = ref()
function recordShowFn(data: AlarmMsg, videos: Array<string>) {
  const infoObj = data?.infoObj as { videoUrl: Array<string> }
  const liveType = PermConf.value.relate.liveType
  if (liveType === 0) {
    isAsyncLoading.value = false
    if (!data || !data.info || data.info === '') {
      hasVideo.value = false
      return
    }
    if (!infoObj?.videoUrl || infoObj.videoUrl.length === 0) {
      hasVideo.value = false
      return
    }

    hasVideo.value = true
    return
  }
  isAsyncLoading.value = true
  setTimeout(() => {
    videoList.value = videos.map((it, index) => {
      return {
        url: it,
        canplay: true,
        type: 'video',
        index,
      }
    }) //['https://172.17.1.33:8443/pic/95.jpg', 'https://172.17.1.33:8443/pic/96.png']
    isAsyncLoading.value = false
    hasVideo.value = videoList.value.length > 0

    console.log('videoList: ', videoList.value)
  }, 0)
}
const hasLiveStream = ref(false)
const liveStreamList = ref()
function liveShowFn(data: AlarmMsg) {
  if (!data || !data.info || data.info === '') {
    hasLiveStream.value = false
    return
  }
  const infoObj = data?.infoObj as { milePost?: string; deviceId: string; directionNo: number }
  const liveType = PermConf.value.relate.liveType
  if (liveType === 0) {
    if (!infoObj.deviceId) {
      hasLiveStream.value = false
      return
    }
    hasLiveStream.value = true
    return
  }
  if (!infoObj.milePost) {
    // ElMessage.warning('实况缺少必传参数 milePost')
    console.error('实况缺少必传参数 milePost')
    hasLiveStream.value = false
    liveStreamList.value = []
    return
  }

  const params = {
    milePost: infoObj.milePost, // infoObj.milePost,
    directionNo: infoObj.directionNo,
    limitNum: liveType == 1 ? 2 : 4,
  }
  hasLiveStream.value = false
  CommonApi.getNearCameraByMilePost(params).then((res) => {
    liveStreamList.value = res.data || []
    hasLiveStream.value = liveStreamList.value?.length > 0
  })
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
      liveShowFn(newVal)
      initSnapAndVideo(newVal)
    })

    CommonApi.getByMsgId(newVal.msgId).then((res) => {
      const ret = res.data
      if (!ret) {
        muteConf.value = {
          silenceDuration: 0,
          silentStatus: -1,
        }
        return
      }
      muteConf.value = {
        silenceDuration: ret.silenceDuration,
        silentStatus: ret.silentStatus,
      }
    })
  },
)
function initSnapAndVideo(alarmSelect: AlarmMsg) {
  CommonApi.getSnapAndVideo(alarmSelect.msgId).then((res) => {
    const ret = res.data
    if (typeof ret === 'number') {
      setTimeout(() => {
        initSnapAndVideo(alarmSelect)
      }, ret * 1000)
      return
    }
    const imgs: string[] = []
    const videos: string[] = []
    ret?.forEach((it) => {
      imgs.push(it.picUrl)
      videos.push(it.videoUrl)
    })
    picShowFn(alarmSelect, imgs)
    recordShowFn(alarmSelect, videos)
  })
}
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

const msgDialogShow = ref(false)
function sendMsgFn() {
  nextTick(() => {
    msgDialogShow.value = true
  })
}

const linkedControlShow = ref(false)
function linkedControlFn() {
  nextTick(() => {
    linkedControlShow.value = true
  })
}
</script>

<style scoped lang="scss">
.alarm-detail {
  margin-left: 7px;
  margin-top: 65px;
  width: 535px;
  display: flex;
  flex-direction: column;
  .detail {
    height: 654px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 20%, #e9f5ff 25%, #e9f5ff 30%);
    border-radius: 15px;
    border: 2px solid #ffffff;
  }
  .detail-box {
    height: calc(100% - 130px);
    overflow-y: auto;
  }
  .other-box {
    padding: 0 16px;
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
  .mute + .ohter-box {
    height: calc(100% - 166px - 138px);
  }
}
</style>
