<template>
  <DetailSect title="视频抓拍" :imgUrl="imgUrl">
    <SwiperBox :list="imgList">
      <template #default="{ data }">
        <div class="pic" v-for="(li, index) of data.item" :key="index">
          <ImageBox :li="li" />
        </div>
      </template>
    </SwiperBox>
  </DetailSect>
</template>
<script setup lang="ts">
import DetailSect from './DetailSect.vue'
import ImageBox from '@ah/comp/image-box/ImageBox.vue'
import SwiperBox from '@ah/comp/swiper-box/SwiperBox.vue'
import { chunkArray } from '@ah/utils'
const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})
import imgUrl from '../../../../assets/images/zhuapai.png'
const imgList = ref()

watch(() => props.alarmSelect, initAlarmInfo)

onMounted(() => {
  initAlarmInfo(props.alarmSelect)
})

function initAlarmInfo(alarmSelect: any) {
  if (!alarmSelect || !alarmSelect.info || alarmSelect.info === '') {
    imgList.value = chunkArray([,], 2)
    return
  }
  imgList.value = chunkArray(alarmSelect.infoObj.picUrl || [,], 2)
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
      height: 16px;
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
:deep(.el-image-viewer__mask) {
  position: fixed;
}
</style>
