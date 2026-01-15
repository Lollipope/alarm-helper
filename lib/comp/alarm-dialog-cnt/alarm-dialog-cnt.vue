<template>
  <div class="alarm-robot">
    <div class="alarm-robot-cnt">
      <!-- 左侧:菜单列表 -->
      <MenuList ref="menuListRef" v-model:id-select="alarmTypeIdSelect" />
      <!-- 中间:告警列表 -->
      <AlarmList
        ref="alarmListRef"
        :alarmTypeIdSelect="alarmTypeIdSelect"
        v-model:alarmSelect="alarmSelect"
        @changeAlarmKindId="onChangeAlarmKindId"
        @refreshMenu="refreshMenu"
        @changeList="onChangeList"
      />
      <!-- 右侧:告警详情 -->
      <AlarmDetail :alarmSelect="alarmSelect" @onRead="onRead" />
      <div class="empty-holder" v-if="isListEmpty">
        <div class="empty-content">近3个月内无未处理消息</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlarmTypeIds } from '@ah/utils'
import { AlarmDetail, AlarmList, MenuList } from './components/index'

// 告警大类列表
// 选中的告警大类ID
const alarmTypeIdSelect = ref(AlarmTypeIds.ALL) //默认选中全部类型

// 选中的告警小类对象
const alarmSelect = ref()
// 告警列表ref
const alarmListRef = shallowRef()
// 菜单列表ref
const menuListRef = shallowRef()
// 确认已读
function onRead(isCurrenTypeRefresh: boolean) {
  if (!isCurrenTypeRefresh) {
    refreshMenu()
  }
  alarmListRef.value?.initMsgList({ msgId: alarmSelect.value?.msgId })
}
// 改变告警大类
function onChangeAlarmKindId(val: string) {
  alarmTypeIdSelect.value = val
}
// 刷新菜单数据
function refreshMenu() {
  menuListRef.value?.initMenu({})
}
//告警列表是否为空
const isListEmpty = ref(false)
function onChangeList(isEmpty: boolean) {
  isListEmpty.value = isEmpty
}

defineExpose({
  alarmTypeIdSelect,
  menuListRef,
  alarmListRef,
})
</script>

<style scoped lang="scss">
.alarm-robot {
  margin-top: 40px;
  width: 986px;
  height: 789px;
  background: url('../../assets/images/alarm-robot-pop.png') 0 0 / 100% 100% no-repeat;

  .alarm-robot-cnt {
    margin-left: 15px;
    height: 758px;
    display: flex;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      pointer-events: none;
      right: 62px;
      top: -78px;
      width: 175px;
      height: 175px;
      background: url('../../assets/images/alarm-robot2.png') 0 0 / 100% 100% no-repeat;
    }

    .empty-holder {
      position: absolute;
      top: 352px;
      left: 403px;
      width: 191px;
      height: 150px;
      background: url('../../assets/images/msg-list-empty.png') no-repeat center center / 100% 100%;

      .empty-content {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #6b99c9;
        font-size: 14px;
      }
    }
  }
}
</style>
