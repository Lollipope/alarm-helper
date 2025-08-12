<template>
  <div class="action-bar">
    <div class="btn read" title="一键已读" @click="emits('onRead')"></div>
    <div class="btn set" v-if="showAlarmRule" title="告警配置" @click="emits('onSet')"></div>
    <div class="btn his" title="告警历史" @click="emits('onHis')"></div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['onRead', 'onSet', 'onHis'])
const showAlarmRule = inject('showAlarmRule', false)
</script>

<style scoped lang="scss">
.action-bar {
  /* Add your styles here */
  display: flex;
  margin-bottom: 22px;
  margin-left: 15px;
  .btn {
    width: 17px;
    height: 17px;
    margin-right: 15px;
    cursor: pointer;
    user-select: none;
    &.read {
      background: url('../../../../assets/images/ac1.png') 0 0 / 100% 100% no-repeat;
      &:hover {
        background: url('../../../../assets/images/ac1h.png') 0 0 / 100% 100%;
      }
    }
    &.set {
      background: url('../../../../assets/images/ac3.png') 0 0 / 100% 100% no-repeat;
      &:hover {
        background: url('../../../../assets/images/ac3h.png') 0 0 / 100% 100%;
      }
    }
    &.his {
      background: url('../../../../assets/images/ac2.png') 0 0 / 100% 100% no-repeat;
      &:hover {
        background: url('../../../../assets/images/ac2h.png') 0 0 / 100% 100%;
      }
    }
  }
}
</style>
