<template>
  <div :id="playerId" class="player-con" v-if="isUserClick">
    <ErrorVideo v-if="hitError" @click="reset" />
  </div>
  <HolderOnlive v-else @trigger="onUserPlay" />
</template>

<script setup lang="ts">
import { ErrorVideo, HolderOnlive } from '../holder'
import { uuid } from '../../utils'
import type { LiveBoxProps } from './LiveBox'

defineOptions({
  name: 'AlarmHelperLiveBox',
})
const props = withDefaults(defineProps<LiveBoxProps>(), {
  pid: '037b697d-e921-4922-9126-f0dd867f259a',
})

const playerId = ref<string | undefined>()
const hitError = ref(false)
let player: Aliplayer | null = null
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
  hitError.value = false
  player = initPlayer(playerId.value, flv)
}

function destory() {
  player?.dispose()
  player = null
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
function initPlayer(domId: string, url: string): Aliplayer {
  const player = new Aliplayer(
    {
      id: domId,
      source: url,
      width: '100%',
      height: '100%',
      autoplay: true,
      isLive: true,
      rePlay: false,
      preload: true,
      autoPlayDelay: 0,
      controlBarVisibility: 'hover',
      useH5Prism: true,
      liveRetry: 0,
      skinLayout: [
        { name: 'H5Loading', align: 'cc' },
        { name: 'errorDisplay', align: 'tlabs', x: 0, y: 0 },
        { name: 'infoDisplay' },
        { name: 'tooltip', align: 'blabs', x: 0, y: 56 },
        { name: 'thumbnail' },
        {
          name: 'controlBar',
          align: 'blabs',
          x: 0,
          y: 0,
          children: [
            { name: 'liveDisplay', align: 'tlabs', x: 15, y: 6 },
            { name: 'fullScreenButton', align: 'tr', x: 10, y: 12 },
            { name: 'volume', align: 'tr', x: 5, y: 10 },
          ],
        },
      ],
    },
    function () {
      // console.log('The player is created')
    },
  )
  player.on('error', (err: Error) => {
    console.log('player is error', err)
    reset()
  })
  return player
}

function reset() {
  destory()
  init()
}
</script>

<style scoped lang="scss">
.player-con {
  width: 100%;
  height: 100%;
}
</style>
