<template>
  <div class="alarm-menu-item" :key="item.id" :title="item.name">
    <img class="image" :src="idSelect == item.id ? item.imgUrlS : item.imgUrl" alt="" srcset="" />
    <i class="point" v-if="item.badge"></i>
  </div>
</template>

<script setup lang="ts">
import type { AlarmMenuItemProps } from './AlarmMenuItem'
defineOptions({
  name: 'AlarmHelperMenuItem',
})
defineProps<AlarmMenuItemProps>()
</script>

<style scoped lang="scss">
.alarm-menu-item {
  width: 56px;
  height: 56px;
  display: block;
  margin-bottom: 6px;
  position: relative;
  cursor: pointer;
  background: transparent;
  .image {
    width: 100%;
    height: 100%;
  }
  .point {
    width: 5px;
    height: 5px;
    background: #ff2e2e;
    border-radius: 50% 50%;
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
