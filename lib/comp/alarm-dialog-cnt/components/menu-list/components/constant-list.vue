<template>
  <div class="list-wrap">
    <AlarmMenuItem
      v-for="(item, idx) in itemList"
      :key="item.id"
      @click="onSelect(item, idx)"
      :item="item"
      :id-select="idSelect"
    />
  </div>
  <div class="shadow-decorator" v-show="isDecShow" :style="{ '--top': topVal }"></div>
</template>

<script setup lang="ts">
import type { MenuItem } from '@ah/utils'
import AlarmMenuItem from '@ah/comp/alarm-menu-item/AlarmMenuItem.vue'

defineEmits(['update:item-list', 'update:id-select'])
const idSelect = defineModel('idSelect', { type: String, default: 'all' })
const itemList = defineModel('itemList', { type: Array<MenuItem> })

const topVal = ref(-13)

watch(idSelect, (val) => {
  const idx = itemList.value?.findIndex((item) => item.id === val)
  idx !== -1 && upPos(idx as number)
})
watch(itemList, (val) => {
  const idx = val?.findIndex((item) => item.id === idSelect.value)
  idx !== -1 && upPos(idx as number)
})
// 选中某大类
function onSelect(item: MenuItem, idx: number) {
  idSelect.value = item.id as string
  upPos(idx)
}
// 更新选中位置
function upPos(idx: number) {
  topVal.value = idx * 62 - 13
}
const isDecShow = computed(() => {
  return itemList.value?.some((item) => item.id === idSelect.value)
})
</script>

<style scoped lang="scss">
.list-wrap {
  padding-left: 17px;
  padding-right: 8px;
  height: 684px;
  position: absolute;
  z-index: 2;
}
.shadow-decorator {
  position: absolute;
  z-index: 1;
  left: 2px;
  top: calc(var(--top) * 1px);
  width: 78px;
  height: 80px;
  background: url('../../../../../assets/images/alarm-type/alarm-type-hover.png') no-repeat 0 0 /
    100% 100%;
}
</style>
