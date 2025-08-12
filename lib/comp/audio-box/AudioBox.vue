<template>
  <div class="audio">
    <span class="fname">{{ filename }}</span>
    <div class="fprogress">
      <span class="btn" @click="togglePlay"></span>
      <span class="progress">
        <div class="progress-bar-filled" :style="{ width: percent + '%' }"></div>
      </span>
      <span class="time">{{ formattedProgress }}</span>
    </div>
    <audio
      ref="audioElement"
      @timeupdate="updateProgress"
      :src="audioSource"
      @ended="resetProgress"
    />
  </div>
</template>

<script setup lang="ts">
import type { AudioBoxProps } from './AudioBox'
defineOptions({
  name: 'AlarmHelperAudioBox',
})
const props = withDefaults(defineProps<AudioBoxProps>(), { url: '' })
const filename = ref()
const audioElement = ref<HTMLAudioElement>() // 用来引用 <audio> 元素
const audioSource = ref(props.url) // 音频源 URL
const isPlaying = ref(false) // 音频播放状态
const currentTime = ref(0) // 当前播放时间
const duration = ref(0) // 音频总时长

onMounted(() => {
  filename.value = audioSource.value.split('/').pop() // 获取最后一个部分，即文件名
})

// 计算进度条的百分比
const percent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})
// 格式化播放时间
const formattedProgress = computed(() => {
  const hours = Math.floor(currentTime.value / 3600)
  const minutes = Math.floor((currentTime.value % 3600) / 60)
  const seconds = Math.floor(currentTime.value % 60)
  return `${hours > 0 ? hours + ':' : '00:'}${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})
// 监听时间更新
const updateProgress = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
    duration.value = audioElement.value.duration
  }
}
// 播放或暂停音频
const togglePlay = () => {
  if (isPlaying.value) {
    audioElement.value?.pause()
  } else {
    audioElement.value?.play()
  }
  isPlaying.value = !isPlaying.value
}
// 播放结束后重置进度
const resetProgress = () => {
  currentTime.value = 0
  isPlaying.value = false
}
</script>

<style scoped lang="scss">
.audio {
  width: 162px;
  background: #ffffff;
  border-radius: 6px;
  padding: 6px 8px;
  .fname {
    width: 65px;
    height: 17px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 500;
    font-size: 12px;
    color: #333333;
    line-height: 17px;
    letter-spacing: 1px;
  }
  .fprogress {
    display: flex;
    align-items: center;

    .btn {
      display: block;
      width: 12px;
      height: 12px;
      background: url('../../assets/images/audioplay.png') 0 0 /100% 100% no-repeat;
    }
    .progress {
      height: 6px;
      margin: 0 11px 0 2px;
      flex: 1;
      background: #e4ecff;
      border-radius: 3px;
      .progress-bar-filled {
        height: 100%;
        background-color: #2b68ff;
        border-radius: 3px;
      }
    }
    .time {
      width: 40px;
      height: 14px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 10px;
      color: #93adcf;
      line-height: 14px;
      text-align: left;
      font-style: normal;
    }
  }
}
</style>
