<template>
  <div class="kind-item">
    <div class="kind-title">
      <img class="icon" :src="props.imgUrl" alt="" />
      <span class="name">{{ props.title }}</span>
    </div>
    <div class="kind-cnt">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  imgUrl: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.kind-item {
  .kind-title {
    height: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      margin-left: 3px;
      width: 18px;
      height: 16px;
      display: inline-block;
    }
    .name {
      margin-left: 9px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1px;
    }
  }

  .kind-cnt {
  }
}
</style>
