<template>
  <div class="vb">
    <template v-if="isUserClick">
      <video
        v-if="!hitError"
        :id="playerId"
        class="video-player"
        controls
        controlslist="nodownload noremoteplayback noplaybackrate notimeline"
        disablepictureinpicture
      ></video>
      <ErrorVideo v-else @click="reset" />
    </template>
    <HolderOnlive v-else @trigger="onUserPlay" />
  </div>
</template>

<script setup lang="ts">
import FlvExtend from 'flv-extend'
import { ErrorVideo, HolderOnlive } from '../holder'
import { uuid } from '../../utils'
import type { LiveBoxProps } from './LiveBox'

defineOptions({
  name: 'AlarmHelperLiveBox',
})
const props = withDefaults(defineProps<LiveBoxProps>(), {
  pid: '037b697d-e921-4922-9126-f0dd867f259a',
})

const delay = window.globalConfig.videoDelay || 1000

const playerId = ref<string>('player')
const hitError = ref(false)

let flv: FlvExtend | undefined

const isUserClick = ref(false)
function onUserPlay() {
  isUserClick.value = true
  nextTick(() => {
    init()
  })
}

onBeforeUnmount(() => {
  destory()
})
watch(
  () => props.pid,
  () => {
    destory()
    isUserClick.value = false
  },
)

async function init() {
  hitError.value = false
  if (props.pid === '') {
    hitError.value = true
    return
  }
  playerId.value = `player-${uuid()}`
  const { flv } = await getPlayUrl(props.pid)
  if (flv === '') {
    hitError.value = true
    return
  }

  nextTick(() => {
    initPlayer(playerId.value, flv)
  })
}

function destory() {
  flv?.destroy()
  flv = void 0
}

// 获取播放地址
function getPlayUrl(pid: string) {
  return fetch(getStreamUrl(pid))
    .then((res) => res.json())
    .then((res) => {
      const data = res.videoRequestUrl
      const rtmp = data.rtmp_url
      const hls = data.hls_url
      const flv = data.flv_url
      return { rtmp, hls, flv }
    })
    .catch((err) => {
      console.log(err)
      return { flv: '' }
    })
}
function getStreamUrl(pid: string) {
  const { AlarmStreamPath, AlarmStreamRate, AlarmStreamDomain } = window.globalConfig
  const query = `pid=${pid}&rate=${AlarmStreamRate || 'slaver'}&domain=${
    AlarmStreamDomain || 'private'
  }`
  return `${AlarmStreamPath}?${query}`
}

// 初始化播放器
function initPlayer(domId: string, url: string) {
  const videoElement = document.getElementById(domId) as HTMLElement
  if (videoElement) {
    console.log(domId, props.pid)
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
        url: url,
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
  }
}
// 播放异常
function onError() {
  hitError.value = true
  setTimeout(() => {
    // 重新初始化
    reset()
  }, delay)
}
function reset() {
  destory()
  init()
}
</script>

<style scoped lang="scss">
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
