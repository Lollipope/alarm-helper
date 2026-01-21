<template>
  <div class="uav">
    <!-- 无人机弹窗 -->
    <DroneModal
      @UAVGoInject="UAVGoInject"
      ref="DroneModalRef"
      v-if="droneModalShow"
      v-model="droneModalShow"
      :startLatLng="startLatLng"
      :sectionId="sectionId"
    ></DroneModal>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import DroneModal from './components/DroneModal.vue'
import type { UavParams } from './uav'
import { transformLnglat, getUavUrlByParams } from '@ah/api/common'
import { stakeToMeters } from '@ah/utils'

const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})

const droneModalShow = ref(false) // 无人机弹窗显示隐藏

const startLatLng = ref('') // 起始经纬度
const sectionId = ref(window.globalConfig.AlarmUAV.sectionId)

const uavData = ref()

function initNationalRoadNoList() {
  const nationalRoadNo = window.globalConfig.AlarmUAV.nationalRoadNo
  const nationalRoadNoList = Object.keys(nationalRoadNo).map((it) => {
    const { start, end } = nationalRoadNo[it]
    const startNum = stakeToMeters(start)
    const endNum = stakeToMeters(end)
    return {
      nationalCode: it,
      startNum,
      endNum,
    }
  })

  return nationalRoadNoList
}
const nationalRoadNoList = initNationalRoadNoList()
function UAVGoInject(data: UavParams) {
  uavData.value = data
  if (!data || !data?.dockSn) return
  getUavUrlByParamsFn('one-click-fly', data)
}
function getUavUrlByParamsFn(type: string, objData: UavParams) {
  const params = {
    type,
  }

  return getUavUrlByParams(params).then((res) => {
    console.log('无人机', res)
    const origin = window.location.origin
    const iframeSrc = res.data
    let url = ``
    if (objData.longitude) {
      //  一键起飞
      url = `${iframeSrc}&origin=${origin}&dockSn=${objData.dockSn}&eventLongitude=${objData.longitude}&eventLatitude=${objData.latitude}`
    } else {
      url = `${iframeSrc}&origin=${origin}&dockSn=${objData.dockSn}`
    }
    console.log('iframeSrc', url)
    const win = window.open(url, '_blank')
    win && (win.opener = null)
  })
}

async function init() {
  console.log('init: 无人机初始化')

  const infoObj = props.alarmSelect.infoObj
  // mock数据
  // infoObj.milePost = `K3514+432`
  if (!infoObj || !infoObj.milePost) {
    ElMessage.warning('当前告警消息缺少必要桩号字段')
    return
  }

  const { isValid, nationalCode, milePost } = checkMilePost(infoObj.milePost)
  if (!isValid) {
    ElMessage.warning('桩号不在当前路段范围内')
    return
  }

  const directionUpDown = window.globalConfig.AlarmUAV.direction || 1
  const params = {
    nationalCode,
    directionUpDown,
    milePost,
  }
  const res = await transformLnglat(params)
  if (!res || !res.result) {
    ElMessage({
      type: 'warning',
      message: '未查到该桩号的经纬度',
    })
    return ''
  }
  const location = res.result[0].location
  startLatLng.value = `${Number(location.lng)},${Number(location.lat)}`
  nextTick(() => {
    droneModalShow.value = true
  })
}
// 校验桩号是否合法
function checkMilePost(milePost: string) {
  const milePostVal = stakeToMeters(milePost)
  const selectNationalCode = nationalRoadNoList.find((na) => {
    return milePostVal <= na.endNum && milePostVal >= na.startNum
  })
  if (!selectNationalCode) {
    return { isValid: false, nationalCode: null, milePost }
  }

  return { isValid: true, nationalCode: selectNationalCode.nationalCode, milePost }
}

defineExpose({
  init,
})
</script>

<style scoped lang="scss"></style>
