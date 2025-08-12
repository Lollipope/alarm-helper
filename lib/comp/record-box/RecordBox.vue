<template>
  <template v-if="hasUrl">
    <video :src="v.url" class="video" controls v-if="v.canplay" @error="onPlayError(v)"></video>
    <ErrorVideo v-else />
  </template>
  <EmptyVideo v-else />
</template>

<script setup lang="ts">
import { EmptyVideo, ErrorVideo } from '../holder'
import type { RecordBoxProps, RecordVideo } from './RecordBox'

defineOptions({
  name: 'AlarmHelperRecordBox',
})
const props = defineProps<RecordBoxProps>()
const hasUrl = computed(() => {
  return props.v.url?.length > 0
})
function onPlayError(video: RecordVideo) {
  video.canplay = false
}
</script>

<style scoped lang="scss">
.video {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
  background-color: var(--el-fill-color-light);
}
</style>
