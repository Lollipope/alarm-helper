<template>
  <div class="empty-video">
    <img class="icon" src="../../assets/images/empty-video.png" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.empty-video {
  width: 100%;
  height: 100%;
  border: 1px solid #a5ceff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #edf4ff 0%, #dfecff 100%);
  .icon {
    width: 100px;
    height: 80px;
    display: inline-block;
    object-fit: fill;
  }
}
</style>
