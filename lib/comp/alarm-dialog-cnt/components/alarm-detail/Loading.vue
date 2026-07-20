<template>
  <div>
    <DetailSect title="视频抓拍" :imgUrl="imgUrl"></DetailSect>
    <div class="loading-box">
      <div class="loading-bg">
        <img src="../../../../assets/images/loading.png" class="loading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DetailSect from './DetailSect.vue'
import imgUrl from '../../../../assets/images/zhuapai.png'

defineOptions({
  name: 'AsyncLoading',
})
</script>

<style scoped lang="scss">
.loading-box {
  width: 48%;
  height: 124px;
  background: #f1f4ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @keyframes loadingAni {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-bg {
    width: 100px;
    height: 80px;
    display: inline-flex;
    background: url('../../../../assets/images/loading-bg.png') 0 0 / 100% 100% no-repeat;
    justify-content: center;
    align-items: center;
  }
  .loading {
    width: 50px;
    height: 50px;
    display: inline-block;
    animation: loadingAni 2s linear infinite;
    margin-bottom: 10px;
  }
}
</style>
