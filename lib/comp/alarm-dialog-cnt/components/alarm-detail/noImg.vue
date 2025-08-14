<template>
  <DetailSect :title="headType" :imgUrl="imgList">
    <div class="capture">
      <div class="capture-cnt">
        <div class="noImage">
          <img class="image" :src="src" @dblclick.prevent alt="" />
        </div>
      </div>
    </div>
  </DetailSect>
</template>

<script setup lang="ts">
import DetailSect from './DetailSect.vue'
import imgPic from '../../../../assets/images/noImg.png'
import videoPic from '../../../../assets/images/noVideo.png'
import imgUrl from '../../../../assets/images/zhuapai.png'
import recordUrl from '../../../../assets/images/luxiang.png'
import liveUrl from '../../../../assets/images/shikuang.png'

const props = defineProps({
  headType: {
    type: String,
    default: '',
  },
})

const imgList = ref(imgUrl)

const src = ref(imgPic)
watch(
  () => props.headType,
  (val) => {
    if (val === '录像回放') {
      src.value = videoPic
      imgList.value = recordUrl
    } else if (val === '视频实况') {
      src.value = videoPic
      imgList.value = liveUrl
    } else {
      src.value = imgPic
      imgList.value = imgUrl
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.capture-cnt {
  height: 124px;
  padding: 3px;
  width: 48%;
  background: #f1f4ff;
}

.noImage {
  width: 100%;
  height: 100%;
  border: 1px solid #a5ceff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #edf4ff 0%, #dfecff 100%);

  .image {
    width: 80px;
    height: 66px;
    display: inline-block;
    object-fit: fill;
  }
}
</style>
