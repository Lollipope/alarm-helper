<template>
  <div class="alarm-close"></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AlarmHelperClose',
})
</script>

<style scoped lang="scss">
.alarm-close {
  user-select: none;
  cursor: pointer;
  position: absolute;
  z-index: 30;
  top: 54px;
  right: 18px;
  width: 22px;
  height: 22px;
  background: url('../../assets/images/alarm-robot-pop-close.png') no-repeat 0 0/ 100% 100%;
  &:hover {
    background: url('../../assets/images/alarm-robot-pop-close-hover.png') no-repeat 0 0/ 100% 100%;
  }
}
</style>
