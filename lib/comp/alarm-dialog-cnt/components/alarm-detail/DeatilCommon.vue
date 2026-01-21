<template>
  <div class="base-box">
    <div class="head">
      <div class="head-title" :title="alarmSelect.alarmTitle">{{ alarmSelect.alarmTitle }}</div>
      <div class="oper-btn-wrap">
        <template v-if="props.systemConf.btn">
          <span class="btn correct" @click="onReportCorr">{{
            String(props.alarmSelect.handleStatus) === '1' ? '已正报' : '正报'
          }}</span>
          <span class="btn misco" @click="onReportMis">{{
            String(props.alarmSelect.handleStatus) === '2' ? '已误报' : '误报'
          }}</span>
        </template>
        <span
          v-if="leaveForCheck.start == 1 && leaveForCheck.pull == 0"
          class="btn dealwith"
          @click="goSys"
          >前往处理</span
        >
        <span
          v-if="sendMsgCheck.start == 1 && sendMsgCheck.pull == 0"
          @click="sendMsgFn"
          class="btn blue"
          >发送消息</span
        >
        <span
          v-if="gangControlCheck.start == 1 && gangControlCheck.pull == 0"
          class="btn blue"
          @click="linkedControlFn"
          >联动管控</span
        >
        <span
          v-if="uvaControlCheck.start == 1 && uvaControlCheck.pull == 0"
          class="btn blue"
          @click="dispatchUva"
          >指派无人机</span
        >
        <el-dropdown
          v-if="
            leaveForCheck.pull == 1 ||
            sendMsgCheck.pull == 1 ||
            gangControlCheck.pull == 1 ||
            uvaControlCheck.pull == 1
          "
        >
          <span class="el-dropdown-link">
            更多
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="leaveForCheck.pull == 1" @click="goSys"
                >前往处理</el-dropdown-item
              >
              <el-dropdown-item v-if="sendMsgCheck.pull == 1" @click="sendMsgFn"
                >发送消息</el-dropdown-item
              >
              <el-dropdown-item v-if="gangControlCheck.pull == 1" @click="linkedControlFn"
                >联动管控</el-dropdown-item
              >
              <el-dropdown-item v-if="uvaControlCheck.pull == 1" @click="dispatchUva"
                >指派无人机</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="cnt" :title="alarmSelect.msg">
      {{ alarmSelect.msg || '暂无信息' }}
    </div>
    <div class="desc">
      <div class="time">{{ alarmSelect.alarmTime || '-' }}</div>
      <div class="source">报警来源: {{ alarmSelect.alarmSource || '暂无信息' }}</div>
    </div>
  </div>
  <Uav :alarmSelect="alarmSelect" ref="uavRef" />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { AlarmRobotApi } from '@ah/api'
import { getGoSysParams } from '@ah/utils'
import Uav from '../../../uav/uav.vue'

const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
  systemConf: {
    type: Object,
    default: () => ({}),
  },
})

// 前往处理
function goSys() {
  props.systemConf.btn && onReportCorr()
  const params = getGoSysParams(
    props.systemConf.paramList,
    props.alarmSelect.infoObj,
    props.alarmSelect.msgId,
  )
  window.open(`${props.systemConf.url}${params}`, '_blank')
}

function onReportCorr() {
  AlarmRobotApi.doHandle({
    msgId: props.alarmSelect.msgId,
    status: '1', //正报
  }).then((res) => {
    const isSuc = res.code === 200
    isSuc &&
      ElMessage({
        message: '操作成功!',
        type: 'success',
      })
    // eslint-disable-next-line
    props.alarmSelect.handleStatus = '1'
  })
}
function onReportMis() {
  AlarmRobotApi.doHandle({
    msgId: props.alarmSelect.msgId,
    status: '2', //误报
  }).then((res) => {
    const isSuc = res.code === 200
    isSuc &&
      ElMessage({
        message: '操作成功!',
        type: 'success',
      })
    // eslint-disable-next-line
    props.alarmSelect.handleStatus = '2'
  })
}

//前往处置按钮
const leaveForCheck = ref({
  start: 0,
  pull: 0,
})
//发送消息按钮
const sendMsgCheck = ref({
  start: 0,
  pull: 0,
})
//联动控制按钮
const gangControlCheck = ref({
  start: 0,
  pull: 0,
})
//无人机按钮
const uvaControlCheck = ref({
  start: 0,
  pull: 0,
})

onMounted(() => {
  buttonInit()
})

const emits = defineEmits(['sendMsg', 'linkedControlFn'])

function sendMsgFn() {
  emits('sendMsg')
}

function linkedControlFn() {
  if (!props.alarmSelect.info) return ElMessage.warning('缺少info参数')
  const info = JSON.parse(props.alarmSelect.info)
  if (!info.roadNo) {
    return ElMessage.warning('缺少路段参数')
  } else if (!info.directionNo) {
    return ElMessage.warning('缺少方向参数')
  } else if (!info.milePost) {
    return ElMessage.warning('缺少桩号参数')
  }
  emits('linkedControlFn')
}
const uavRef = shallowRef()
function dispatchUva() {
  uavRef.value?.init()
}
type dataRes = {
  code: number
  data: []
  msg: string
}

interface ItemType {
  buttonType: number
  isEnable: number
  isDropdown: number
}

function buttonInit() {
  AlarmRobotApi.alarmTypeButtonConfig(props.alarmSelect.alarmId).then((val) => {
    const res = val as dataRes
    if (res.code == 200) {
      ;(res.data || []).map((item: ItemType) => {
        if (item.buttonType == 1) {
          leaveForCheck.value.start = item.isEnable
          leaveForCheck.value.pull = item.isDropdown
        } else if (item.buttonType == 2) {
          sendMsgCheck.value.start = item.isEnable
          sendMsgCheck.value.pull = item.isDropdown
        } else if (item.buttonType == 3) {
          gangControlCheck.value.start = item.isEnable
          gangControlCheck.value.pull = item.isDropdown
        } else if (item.buttonType == 4) {
          uvaControlCheck.value.start = item.isEnable
          uvaControlCheck.value.pull = item.isDropdown
        }
      })
    }
  })
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  padding-left: 5px;
  cursor: pointer;
  color: #2b68ff;
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: none;
  }
}
.base-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 127px;
  background: url(../../../../assets/images/alarm-detail-common.png) 0 0 / 100% 100% no-repeat;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    flex-shrink: 0;
    margin: 0 23px;
    .head-title {
      flex: 1;
      // width: 240px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 1px;
      background: -webkit-linear-gradient(top, #2494ec 0%, #003ac8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .oper-btn-wrap {
      display: flex;
      justify-content: flex-end;
      .btn {
        flex-shrink: 0;
        user-select: none;
        cursor: pointer;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        font-size: 14px;
        line-height: 28px;
        padding: 0 14px;
        border-radius: 15px;
        margin-left: 8px;
        background: rgba(255, 255, 255, 0.6);
        &.blue {
          background-color: #2b68ff;
          color: #fff;
        }
        &.dealwith {
          border: 1px solid #94b3ff;
          color: #2b68ff;
          &:hover {
            color: white;
            background: #2b68ff;
          }
        }
        &.correct {
          border: 1px solid #90efc5;
          color: #0cbb6d;
          &:hover {
            color: white;
            background: #0cbb6d;
          }
        }
        &.misco {
          border: 1px solid #ffc393;
          color: #f07816;
          &:hover {
            color: white;
            background: #f07816;
          }
        }
      }
    }
  }
  .cnt {
    flex: 1;
    padding: 10px 15px 0 21px;
    // height: 63px;
    height: 38px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #333333;
    line-height: 19px;
    letter-spacing: 1px;
    overflow-y: auto;
  }
  .desc {
    display: flex;
    flex-direction: row;
    margin-bottom: 6px;
    padding: 0 21px;
    line-height: 17px;
    height: 17px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-size: 12px;
    color: #888888;
    letter-spacing: 1px;
    .time {
      padding-right: 14px;
      position: relative;
      text-align: left;
      &:before {
        content: '';
        position: absolute;
        top: calc(50% - 5px);
        right: 0;
        width: 1px;
        height: 10px;
        background: #d5d5d5;
      }
    }
    .source {
      margin-left: 14px;
    }
  }
}
</style>
