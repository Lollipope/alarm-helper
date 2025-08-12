<template>
  <teleport to="body">
    <div class="alarm-confirm" v-if="props.modelValue">
      <div class="alarm-confirm-content">
        <div class="option">
          <slot>
            <span>是否将所有告警消息一键已读</span>
            <span>（仅标记支持一键已读的告警类型）</span>
          </slot>
        </div>
        <div class="oper">
          <span class="cancel" @click.stop="onCancel">取消</span>
          <span class="confirm" @click.stop="onConfirm">确认</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import type { AlarmConfimProps, AlarmConfirmEmits } from './AlarmConfirm'
defineOptions({
  name: 'AlarmHelperConfirm',
})
const props = defineProps<AlarmConfimProps>()
const emits = defineEmits<AlarmConfirmEmits>()

function onCancel() {
  emits('onNo')
}
function onConfirm() {
  emits('onYes')
}
</script>

<style scoped lang="scss">
.alarm-confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .alarm-confirm-content {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 402px;
    height: 251px;
    background: url('../../assets/images/alarm-confirm-pop.png') 0 0 / 100% 100% no-repeat;
    padding: 73px 50px 0;
    .title {
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 500;
      font-size: 18px;
      color: #333333;
    }
    .option {
      margin-top: 19px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
    }

    .oper {
      margin-top: 28px;
      display: flex;
      justify-content: center;
      cursor: pointer;
      .cancel {
        width: 146px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #ebf7ff;
        border-radius: 8px;
        border: 1px solid #99c6ff;
        margin-right: 10px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-size: 14px;
        color: #2b68ff;
        letter-spacing: 1px;
      }
      .confirm {
        width: 146px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #2b68ff;
        border-radius: 8px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
