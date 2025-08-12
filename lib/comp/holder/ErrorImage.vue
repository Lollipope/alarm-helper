<template>
  <div class="error-ph">
    <img class="image" src="../../assets/images/pic-error-ph.png" @dblclick.prevent alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.error-ph {
  width: 100%;
  height: 100%;
  border: 1px solid #a5ceff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #edf4ff 0%, #dfecff 100%);
  .image {
    width: 100px;
    height: 80px;
    display: inline-block;
    object-fit: fill;
  }
}
</style>
