<template>
  <DetailSect title="录像回放" :imgUrl="imgUrl">
    <SwiperBox :list="videoList">
      <template #default="{ data }">
        <div class="pic" v-for="(v, index) of data.item" :key="index">
          <RecordBox :v="v" />
        </div>
      </template>
    </SwiperBox>
  </DetailSect>
</template>
<script setup lang="ts">
import DetailSect from './DetailSect.vue'
import RecordBox from '@ah/comp/record-box/RecordBox.vue'
import SwiperBox from '@ah/comp/swiper-box/SwiperBox.vue'
import { chunkArray } from '@ah/utils'
const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})

import imgUrl from '../../../../assets/images/luxiang.png'
const videoList = ref()
watch(() => props.alarmSelect, initAlarmInfo)
onMounted(() => {
  initAlarmInfo(props.alarmSelect)
})

function initAlarmInfo(alarmSelect: any) {
  if (!alarmSelect || !alarmSelect.info || alarmSelect.info === '') {
    videoList.value = chunkArray([{ canplay: false }, { canplay: false }], 2)
    return
  }
  const infoObj = alarmSelect.infoObj
  if (!infoObj.videoUrl || infoObj.videoUrl.length === 0) {
    videoList.value = chunkArray([{ canplay: false }, { canplay: false }], 2)
    return
  }
  const list = (infoObj.videoUrl || [,]).map((url: string) => ({ url, canplay: true }))
  videoList.value = chunkArray(list, 2)
}
</script>
<style scoped lang="scss">
@import './common.scss';
.kind-item {
  .kind-title {
    height: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      margin-left: 7px;
      width: 18px;
      height: 12px;
      display: inline-block;
    }
    .name {
      margin-left: 9px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1px;
    }
  }

  .kind-cnt {
    .pic {
      height: 124px;
      border-radius: 6px;
    }
  }
}
</style>
