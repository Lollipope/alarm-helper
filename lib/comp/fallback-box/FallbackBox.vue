<template>
  <ul class="fallback">
    <li class="fallback-header">
      <span :class="`head${idx + 1}`" v-for="(item, idx) of listHead" :key="idx">{{ item }}</span>
    </li>
    <li class="fallback-item" v-for="(item, index) of listData" :key="index">
      <span
        :class="`head${cIdx + 1} ${col.includes('成功') ? 'suc' : 'fail'} item`"
        v-for="(col, cIdx) of item"
        :key="cIdx"
        :title="col"
        >{{ col }}</span
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { FallbackBoxProps } from './FallbackBox'
defineOptions({
  name: 'AlarmHelperFallbackBox',
})
defineProps<FallbackBoxProps>()
</script>

<style scoped lang="scss">
.fallback {
  .fallback-header {
    height: 43px;
    background: #d2eaff;
    border-radius: 14px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-size: 14px;
    color: #2a5c86;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    .head1 {
      padding-left: 28px;
      width: 230px;
    }
    .head2 {
      flex: 1;
      text-align: center;
    }
    .head3 {
      width: 120px;
      text-align: center;
    }
  }
  .fallback-item {
    display: flex;
    align-items: center;
    height: 43px;
    margin-top: 7px;
    background: #ffffff;
    border-radius: 14px;
    color: #333333;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 1px;
    .head1 {
      padding-left: 28px;
      width: 230px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item:not(:last-child):not(:first-child) {
      flex: 1;
      text-align: center;
    }
    .item {
      &:last-child {
        width: 120px;
        text-align: center;
        &.suc {
          color: #14bc74;
        }
        &.fail {
          color: #f07816;
        }
      }
    }
    &:last-child {
      margin-bottom: 7px;
    }
  }
}
</style>
