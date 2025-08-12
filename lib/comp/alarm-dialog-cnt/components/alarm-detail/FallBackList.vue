<template>
  <DetailSect title="反馈结果" :imgUrl="imgUrl">
    <FallbackBox :listHead="listHead" :listData="listData" />
  </DetailSect>
</template>

<script setup lang="ts">
import DetailSect from './DetailSect.vue'
import FallbackBox from '@ah/comp/fallback-box/FallbackBox.vue'
const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})

import imgUrl from '../../../../assets/images/fankui.png'
const listHead = ref([])
const listData = ref<string[][]>([])
onMounted(() => {
  init()
})

function init() {
  const infoObj = props.alarmSelect.infoObj
  const headProps = infoObj.showdata.shift()
  const list = infoObj.showdata
  listHead.value = headProps.row.split(',')
  listData.value = list.map((i: any) => {
    return i.row.split(',') as Array<string>
  })
}
</script>

<style scoped lang="scss"></style>
