<template>
  <DetailSect title="附件" :imgUrl="imgUrl">
    <div class="audio-sect" v-if="audioList.length > 0">
      <AudioBox :url="au" v-for="(au, index) of audioList" :key="index" class="audio-item" />
    </div>
  </DetailSect>
</template>
<script setup lang="ts">
import DetailSect from './DetailSect.vue'

import AudioBox from '@ah/comp/audio-box/AudioBox.vue'
const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})

import imgUrl from '../../../../assets/images/fujian.png'
const audioList = ref<string[]>([])

onMounted(() => {
  initAlarmInfo(props.alarmSelect)
})

function initAlarmInfo(alarmSelect: { info?: string; infoObj?: { audioUrl: Array<string> } }) {
  if (!alarmSelect || !alarmSelect.info || alarmSelect.info === '') {
    return
  }
  audioList.value = alarmSelect.infoObj?.audioUrl || []
}
</script>

<style scoped lang="scss">
.audio-sect {
  margin-bottom: 10px;
  display: flex;
  .audio-item {
    margin-right: 10px;
  }
}
</style>
