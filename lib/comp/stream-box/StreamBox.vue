<template>
  <!-- 一体机 -->
  <FlvBox v-if="mode === '1'" :deviceId="pid" />
  <!-- 非一体机 -->
  <LiveBox v-else :pid="pid" />
</template>

<script setup lang="ts">
import LiveBox from '../live-box/LiveBox.vue'
import FlvBox from '../flv-box/FlvBox.vue'
import type { StreamBoxProps } from './StreamBox'
defineProps<StreamBoxProps>()
</script>

<style scoped lang="scss"></style>
