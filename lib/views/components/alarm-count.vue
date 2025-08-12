<template>
  <div
    class="count"
    :class="{ isImp: unRead.isImportant }"
    v-show="!isAlarmDialogVisible"
    :title="unRead.num > 99 ? unRead.num : ''"
  >
    {{ formatNumber(unRead.num) }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  isAlarmDialogVisible: {
    type: Boolean,
    default: false,
  },
  unRead: {
    type: Object,
    default: () => ({
      isImportant: false,
      num: 0,
    }),
  },
})

function formatNumber(num: number) {
  // 判断数字是否大于等于100
  if (num >= 100) {
    return '99+'
  }
  return num
}
</script>

<style scoped lang="scss">
.count {
  position: absolute;
  top: 10px;
  right: 0;
  width: 26px;
  height: 16px;
  background: #fc5249;
  border-radius: 11px;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  line-height: 16px;
  text-align: center;
}
</style>
