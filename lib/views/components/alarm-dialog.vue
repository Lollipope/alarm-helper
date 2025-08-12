<template>
  <div class="overlay" v-if="visible">
    <div
      class="customModal"
      :style="{
        top: position.top + 'px',
        left: position.left + 'px',
        '--scale': scaleVal,
      }"
      ref="customModal"
    >
      <div class="customModal-header" @mousedown="startDrag"></div>
      <!-- 弹窗内容 -->
      <AlarmDialogCnt ref="alarmRobotRef" />
      <!-- 关闭按钮 -->
      <AlarmClose @click.stop="closeModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AlarmDialogCnt from '../../comp/alarm-dialog-cnt/alarm-dialog-cnt.vue'
import AlarmClose from '../../comp/alarm-close/AlarmClose.vue'
import { useAlarmDialogDragState } from '../useCustomHook'

defineEmits(['update:visible'])
const visible = defineModel('visible', { type: Boolean, default: false })
const alarmRobotRef = shallowRef()
const { position, customModal, startDrag, scaleVal, closeModal } = useAlarmDialogDragState(visible)
defineExpose({
  alarmRobotRef,
})
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.customModal {
  width: 986px;
  position: absolute;
  box-sizing: border-box;
  pointer-events: auto;
  transform: scale(var(--scale));
  transform-origin: 0 0;
}

.customModal-header {
  position: absolute;
  display: block;
  left: 0;
  top: 48px;
  width: 100%;
  height: 32px;
  cursor: move;
  user-select: none;
  z-index: 20;
}
</style>
