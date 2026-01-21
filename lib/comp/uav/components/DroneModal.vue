<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    class="drone-modal"
    append-to-body
    width="514px"
    draggable
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="title">已规划附近空闲机巢</div>
    </template>
    <div class="main-content">
      <div class="item">
        <div class="left-title">机巢：</div>
        <div class="right-content">
          <span>{{ dataList?.deviceName ? dataList.deviceName : '' }}</span>
          <span class="green">{{
            dataList?.modeCode ? '【' + getState(dataList.modeCode) + '】' : ''
          }}</span>
        </div>
      </div>
      <div class="item">
        <div class="left-title">当前电量：</div>
        <div class="right-content">
          <span class="green">{{
            dataList?.capacityPercent ? dataList?.capacityPercent + '%' : ''
          }}</span>
        </div>
      </div>
      <div class="item">
        <div class="left-title">当前天气：</div>
        <div class="right-content">
          {{
            dataList?.dockState?.rainfall || dataList?.dockState?.rainfall == 0
              ? rainFn(dataList.dockState.rainfall)
              : '-'
          }}
        </div>
      </div>
      <div class="item">
        <div class="left-title">预计飞行距离：</div>
        <div class="right-content">{{ dataList?.maxRadius ? dataList.maxRadius + 'km' : '' }}</div>
      </div>
      <div class="item">
        <div class="left-title">预计飞行时长：</div>
        <div class="right-content">{{ dataList?.maxTime ? dataList.maxTime + 'min' : '' }}</div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" @click="flyBtn" v-if="dataList?.deviceSn">确认起飞</el-button>
    </div>
    <el-icon @click="hide" class="close-icon">
      <Close />
    </el-icon>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, ElDialog } from 'element-plus'
import { viewUavNest } from '@ah/api/common'

const props = defineProps({
  startLatLng: {
    type: String,
  },
  sectionId: {
    type: String,
  },
})
const modeState = { 0: '空闲种', 1: '现场调试', 2: '远程调试', 3: '固件升级', 4: '作业中' }
type ModeStateType = keyof typeof modeState

const visible = defineModel<boolean>({ default: false }) // 是否显示弹窗
const emits = defineEmits(['UAVGoInject'])

interface UavPanel {
  deviceName?: string
  capacityPercent?: number
  modeCode?: ModeStateType
  dockState?: {
    rainfall: string | number
  }
  maxRadius?: string | number
  maxTime?: string
  deviceSn: string
  latitude: string | number
  longitude: string | number
}

const dataList = ref<UavPanel>()

const rainFn = (data: string | number) => {
  if (data == 0) {
    return '无雨'
  } else if (data == 1) {
    return '小雨'
  } else if (data == 2) {
    return '中雨'
  } else if (data == 3) {
    return '大雨'
  }
  return data
}

const getState = (modeCode: ModeStateType) => {
  return modeState[modeCode]
}
function init() {
  if (!props.startLatLng) {
    ElMessage.warning('缺少经纬度')

    return
  }
  if (!props.sectionId) {
    ElMessage.warning('缺少sectionId')
    return
  }
  const [lng, lat] = props.startLatLng.split(',')
  const params = {
    sectionId: props.sectionId,
    lng,
    lat,
  }

  viewUavNest(params).then((res) => {
    console.log('附近空闲机槽', res)
    if (res.code == 200) {
      dataList.value = res.data as UavPanel
    }
  })
}

function flyBtn() {
  const parmas = {
    dockSn: dataList.value?.deviceSn,
    longitude: dataList.value?.longitude,
    latitude: dataList.value?.latitude,
  }
  emits('UAVGoInject', parmas)
  nextTick(() => {
    visible.value = false
  })
}

// 显示弹窗
function show() {
  visible.value = true
}

// 隐藏弹窗
function hide() {
  visible.value = false
}

onMounted(() => {
  init()
})

// 暴露方法
defineExpose({
  show,
})
</script>

<style lang="scss" scoped>
.title {
  font-family:
    PingFangSC,
    PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    background: url('../../../assets/images/uav/title-icon.png') no-repeat center / 100% 100%;
    margin-right: 8px;
  }
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 31px;

  .item {
    width: calc((100% - 26px) / 2);
    border-bottom: 2px dashed #bed1fc;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0 9px 0px;

    .left-title {
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      &::before {
        content: '';
        display: block;
        width: 3px;
        height: 6px;
        background: #5280f3;
        border-radius: 2px;
        margin-right: 8px;
      }
    }

    .right-content {
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      text-align: right;
      .green {
        color: #0bd33c;
      }
    }
  }
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;
}

.close-icon {
  position: absolute;
  top: 13px;
  right: 19px;
  cursor: pointer;
  font-size: 14px;
  color: #8395bf;
}
</style>
<style lang="scss">
.drone-modal {
  padding: 0 !important;
  background: linear-gradient(180deg, #c9e4ff 0%, #ffffff 18%, #ffffff 100%) !important;
  box-shadow: 0px 0px 4px 0px rgba(102, 122, 134, 0.5) !important;
  border-radius: 6px !important;
  border: 1px solid #a9d4ff !important;
}

.drone-modal .el-dialog__header {
  padding: 10px 19px 13px 14px !important;
  border-bottom: none !important;
  height: 40px !important;
}

.drone-modal .el-dialog__body {
  padding: 0 19px 0px 14px !important;
}
</style>
