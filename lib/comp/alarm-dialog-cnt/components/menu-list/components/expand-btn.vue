<template>
  <div class="btn-expand" @click="onToggle" :class="{ reverse: isOpen }">
    <i class="icon" />
  </div>
</template>

<script setup lang="ts">
defineEmits(['update:is-open'])
const isOpen = defineModel('isOpen', { type: Boolean })
function onToggle() {
  const open = !isOpen.value
  isOpen.value = open
}
</script>

<style scoped lang="scss">
.btn-expand {
  width: 24px;
  height: 24px;
  background: #85a7ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #2b68ff;
  }
  .icon {
    width: 10px;
    height: 10px;
    background: url(../../../../../assets/images/alarm-type/btn-expand.png) no-repeat 0 0 /100% 100%;
  }
  &.reverse {
    .icon {
      transform: rotate(180deg);
    }
  }
}
</style>
