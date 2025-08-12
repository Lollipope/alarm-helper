<template>
  <div id="Video-VideoBare" class="vb">
    <template v-if="isUserClick">
      <video
        v-if="!hitError"
        :id="vid"
        class="video-player"
        controls
        controlslist="nodownload noremoteplayback noplaybackrate notimeline"
        disablepictureinpicture
      ></video>
      <ErrorVideo v-else @click="init" />
    </template>
    <HolderOnlive v-else @trigger="onUserPlay" />
  </div>
</template>
<script setup lang="ts">
import FlvExtend from 'flv-extend'
import { AlarmRobotApi } from '@ah/api'
import { ErrorVideo, HolderOnlive } from '../holder'
import type { FlvBoxProps } from './FlvBox'
const props = withDefaults(defineProps<FlvBoxProps>(), {
  deviceId: '',
  systemCode: 'tyrh',
  userName: 'tyrh',
  protocol: 'http',
  rate: 'master',
})

const vid = ref('pc_jPrismPlayer')
const delay = window.globalConfig.videoDelay || 1000

const playUrl = ref()
let flv: FlvExtend | undefined
const hitError = ref(false) //出现错误
const isUserClick = ref(false)

watch(
  () => props.deviceId,
  () => {
    console.log('设备变化: ', props.deviceId)
    isUserClick.value = false
    destroyPlayer()
  },
)

onBeforeMount(() => {})
onMounted(() => {
  init()
})
onBeforeUnmount(() => {
  destroyPlayer()
})

async function init() {
  vid.value = vid.value + Math.floor(Math.random() * 100000)
  // 没有必要参数,不进行初始化
  if (!props.deviceId && props.deviceId === '') return
  if (flv) {
    //  销毁原有播放器
    await destroyPlayer()
  }

  // 初始化播放器
  initPlayer()
}
function destroyPlayer() {
  // 没有获取到播放地址
  if (!playUrl.value || playUrl.value === '') return
  const params = {
    deviceId: props.deviceId, // 此处????
    videoUrl: playUrl.value,
  }

  return AlarmRobotApi.stopDevicePlay(params).finally(() => {
    flv?.destroy()
    flv = void 0
  })
}
async function initPlayer() {
  hitError.value = false
  const res = await AlarmRobotApi.getStreamUrl({
    deviceId: props.deviceId,
    needCompress: 1, // 参数开关 0-关，1-开，必填
    // pid: this.deviceId,
    // rate,
    // domain: "private",
  })
  if (res.code !== 200) {
    hitError.value = true
    console.warn(res.msg || '请求失败')
    return
  }
  const flvUrl = res.playUrl
  const hasUrl = flvUrl && flvUrl !== ''

  const videoElement = document.getElementById(vid.value) as HTMLElement
  if (hasUrl && videoElement) {
    console.log(vid.value, props.deviceId)
    const flvInstance = new FlvExtend({
      element: videoElement, // *必传
      frameTracking: true, // 开启追帧设置
      updateOnStart: true, // 点击播放后更新视频
      updateOnFocus: true, // 获得焦点后更新视频
      reconnect: true, // 开启断流重连
      reconnectInterval: 3000, // 断流重连间隔
    })
    // 调用 init 方法初始化视频
    // init 方法的参数与 flvjs.createPlayer 相同，并返回 flvjs.player 实例
    const flvPlayer = flvInstance.init(
      {
        type: 'flv',
        url: flvUrl,
        isLive: true,
      },
      {
        enableStashBuffer: false, // 如果您需要实时（最小延迟）来进行实时流播放，则设置为false
        autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
        stashInitialSize: 128, // 减少首帧显示等待时长
        enableWorker: true, // 启用分离的线程进行转换
      },
    )
    flvPlayer.on('error', (e) => {
      console.error('播放器错误', e)
      onError()
    })
    flvPlayer.play()
    // 赋值全局变量
    flv = flvInstance
    playUrl.value = flvUrl
  }
}
// 播放异常
function onError() {
  hitError.value = true
  setTimeout(() => {
    // 重新初始化
    init()
  }, delay)
}

function onUserPlay() {
  isUserClick.value = true
  nextTick(() => {
    init()
  })
}
</script>
<style lang="scss" scoped>
.vb {
  width: 100%;
  height: 100%;
  z-index: 99;
}
.video-player {
  position: unset !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: fill;
  &::-webkit-media-controls-timeline {
    display: none;
  }
  &::-webkit-media-controls-play-button {
    display: none;
  }
  &::-webkit-media-controls-current-time-display {
    display: none;
  }
  &::-webkit-media-controls-time-remaining-display {
    display: none;
  }
}
</style>
