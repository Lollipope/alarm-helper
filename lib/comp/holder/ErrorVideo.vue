<template>
  <div class="error-ph">
    <img class="image" src="../../assets/images/loading-error.png" alt="" />
    <span class="loading-text" v-if="showText"
      >失败原因可能是证书不合法、资源被清理、网络超时等情况导致，请手动信任浏览器安全证书或检查网络后稍后重新！</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps({
  showText: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.error-ph {
  width: 100%;
  height: 100%;
  border: 1px solid #a5ceff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(180deg, #edf4ff 0%, #dfecff 100%);
  .image {
    width: 100px;
    height: 80px;
    display: inline-block;
    object-fit: fill;
  }
  .loading-text {
    width: 420px;
    font-size: 14px;
    font-family:
      PingFang SC,
      PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #677785;
    line-height: 24px;
  }
}
</style>
