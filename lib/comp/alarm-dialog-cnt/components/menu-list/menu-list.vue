<template>
  <div class="menu-list">
    <!-- 常显列表 -->
    <ConstantList v-model:item-list="cList" v-model:id-select="idSelect" />
    <!-- 展开按钮 -->
    <ExpandButton v-model:isOpen="isOpen" class="eb" />
    <!-- 菜单面板 -->
    <MenuPanel
      v-show="isOpen"
      v-model:isOpen="isOpen"
      v-model:id-select="idSelect"
      v-model:c-list="cList"
      v-model:e-list="eList"
      @onSort="onSort"
    />
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { SortAlarmBigType } from '@ah/api/types'
import {
  type MenuItem,
  AlarmTypeList,
  mergeWithImage,
  getLatestInterval,
  imgUrlDefault,
  imgUrlDefaultS,
} from '@ah/utils'
import { AlarmRobotApi } from '@ah/api'
import ExpandButton from './components/expand-btn.vue'
import MenuPanel from './components/menu-panel.vue'
import ConstantList from './components/constant-list.vue'
defineExpose({
  initMenu,
})
defineEmits(['update:id-select'])

const isOpen = ref(false)
// 选中的大类ID
const idSelect = defineModel('idSelect', { type: String })

// 所有大类类型
const menuTypeList = ref<Array<MenuItem>>()
// 常显列表
const cList = ref<Array<MenuItem>>([])
// 展开列表
const eList = ref<Array<MenuItem>>([])
// 全部列表
const allList = ref<Array<MenuItem>>([])

onBeforeMount(() => {
  initMenu()
})

function initMenu() {
  const { endTime, startTime } = getLatestInterval(3, 'month')
  //加载未处理和无需处理的高进消息
  AlarmRobotApi.getConfigMsgKindList({ startTime, endTime, handleStatus: '0,3' }).then((res) => {
    // 告警大类菜单
    const menuList = (res.data || []).map((item) => {
      return {
        isShow: item.isShow,
        id: item.alarmKindId,
        name: item.alarmKindName,
        badge: String(item.isRead) === '0', //是否有标记:未读有, 已读没有
      }
    })
    // 设置全部大类的图标
    AlarmTypeList[0].badge = menuList.some((i) => i.badge)
    AlarmTypeList[0].isShow = 1
    // 给大类设置图片
    menuTypeList.value = mergeWithImage(
      [AlarmTypeList[0], ...menuList].map((it) => ({
        ...it,
        imgUrl: imgUrlDefault,
        imgUrlS: imgUrlDefaultS,
      })),
      AlarmTypeList,
    )

    // 常显列表
    // console.log('常显列表: ', menuTypeList.value)
    const constList = menuTypeList.value.filter((item) => item.isShow === 1)
    const constLen = constList.length > 11 ? 11 : constList.length
    cList.value = JSON.parse(JSON.stringify(menuTypeList.value.slice(0, constLen)))
    // 展开列表
    eList.value = JSON.parse(JSON.stringify(menuTypeList.value.slice(constLen)))
    // 所有列表
    allList.value = menuTypeList.value
  })
}
// 排序
function onSort(params: SortAlarmBigType) {
  AlarmRobotApi.updateAlarmConfigMsgKindSort(params).then((res) => {
    const isSuc = res.code === 200
    if (isSuc) {
      initMenu()
    }
  })
}
</script>

<style scoped lang="scss">
.menu-list {
  margin: 57px 0 0;
  width: 82px;
  position: relative;
  .eb {
    margin-left: 32px;
    position: absolute;
    bottom: -8px;
    left: 0;
  }
}
</style>
