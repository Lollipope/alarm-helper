<template>
  <div class="live-init">
    <img
      class="btn"
      src="../../assets/images/btn-play.png"
      alt=""
      srcset=""
      @click="emits('trigger')"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['trigger'])
</script>

<style scoped lang="scss">
.live-init {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/images/live-hoder.png') 0 0 /100% 100% no-repeat;
  .btn {
    width: 36px;
    height: 36px;
    display: inline-block;
  }
}
</style>
