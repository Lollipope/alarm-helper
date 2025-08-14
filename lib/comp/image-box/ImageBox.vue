<template>
  <el-image :src="li" fit="cover" v-if="isImgShow" @dblclick="onPreview(li)">
    <template #error>
      <ErrorImage />
    </template>
  </el-image>
  <EmptyImage v-else />
  <Teleport v-if="showPreview" to="body">
    <el-image-viewer
      v-if="showPreview"
      :url-list="srcList"
      @close="showPreview = false"
      z-index="3000"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { EmptyImage, ErrorImage } from '../holder'
import type { ImageBoxProps } from './ImageBox'
defineOptions({
  name: 'AlarmHelperImageBox',
})
const props = defineProps<ImageBoxProps>()
const isImgShow = computed(() => {
  return props.li?.length > 0
})
const showPreview = ref(false)
const srcList = ref<Array<string>>([])
function onPreview(li: string) {
  srcList.value = [li]
  showPreview.value = true
}
</script>

<style scoped lang="scss">
.el-image {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}
</style>
