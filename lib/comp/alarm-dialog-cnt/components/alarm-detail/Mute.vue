<template>
  <div class="mute">
    <div class="title">
      <div class="left">
        <img src="../../../../assets/images/mute.png" alt="" class="icon" />
        <span class="label">静默时间</span>
      </div>
    </div>
    <div class="cnt">
      <span class="label">告警静默时间: </span>
      <el-select
        v-model="mute"
        placeholder="请选择"
        clearable
        size="mini"
        class="select"
        :disabled="muteConf.silentStatus != -1"
      >
        <el-option
          :value="item.value"
          :label="item.label"
          v-for="item in muteOptions"
          :key="item.value"
        />
      </el-select>
      <span class="confirm" @click="onConfirm" v-if="muteConf.silentStatus == -1">确定</span>
      <span class="history" @click="goMute">告警静默记录</span>
    </div>
    <div class="explan">
      注意，静默告警后，将一定时间内不会收到该摄像枪产生的相同类型告警，如需提前解除静默，请点击---告警静默记录
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { type BaseSilent } from '@ah/api'
import { ElMessageBox, ElMessage } from 'element-plus'
import { CommonApi } from '@ah/api'

const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})
const muteConf = defineModel<BaseSilent>('mute', {
  default: {
    silentStatus: -1,
    silenceDuration: 0,
  },
})
const mute = ref(muteConf.value.silenceDuration)
watch(
  () => muteConf.value,
  (val) => {
    mute.value = Number(val?.silenceDuration)
  },
)
const router = useRouter()
const muteOptions = ref([
  {
    label: '不设置',
    value: 0,
  },
  {
    label: '10分钟',
    value: 10,
  },
  {
    label: '30分钟',
    value: 30,
  },
  {
    label: '60分钟',
    value: 60,
  },
])
const getLabels = (deviceId: string | undefined) => {
  if (!deviceId || deviceId == '') return Promise.resolve(undefined)
  const pList = deviceId.split(',').map((id) => {
    return CommonApi.getCameraInfo(id).then((res) => res.data?.deviceName)
  })

  return Promise.all(pList)
}

async function onConfirm() {
  if (!mute.value || mute.value == 0) return
  const row = props.alarmSelect
  const infoObj = row.infoObj
  const labels = await getLabels(infoObj.deviceId)
  const isPass = await ElMessageBox.confirm(
    `开启静默后，<span style='font-weight:bold;padding:0 2px;'>${labels ? labels.join(',') : '该摄像枪'}</span>将<span style='color:red;font-weight:bold;;padding:0 2px;'>${mute.value}分钟</span>内无法接收<span style='color:red;font-weight:bold;padding:0 2px;'>${props.alarmSelect.alarmName}类型告警</span>，请确认正在监控摄像枪画面后再开启静默功能，否则会有漏报风险。`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true,
      customStyle: {
        '--el-color-primary': '#2b68ff',
      },
      dangerouslyUseHTMLString: true,
    },
  )
    .then(() => true)
    .catch(() => false)
  if (!isPass) return

  CommonApi.addAlarmSilentMsg({
    msgId: row.msgId,
    roadNo: infoObj?.roadNo,
    roadName: infoObj?.roadName,
    cameraId: infoObj?.deviceId,
    cameraName: labels && labels.join(','),
    cameraMilePost: infoObj?.milePost,
    silenceAlarmId: row.alarmId,
    silenceDuration: mute.value,
    silentStatus: 0, // 0-静默中，1-已结束
    relatedMsgContent: row.msg,
  }).then((res) => {
    const isSuc = res.code == 200
    if (isSuc) {
      muteConf.value.silentStatus = 0
      muteConf.value.silenceDuration = mute.value
    }
    ElMessage({
      type: isSuc ? 'success' : 'error',
      message: isSuc ? '操作成功' : res.msg || '操作失败',
    })
  })
}
function goMute() {
  router.push('/stat-analysis/history-mute')
}
</script>

<style scoped lang="scss">
.mute {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px 10px 16px;
    .left {
      display: flex;
      align-items: center;
      .icon {
        display: block;
        width: 17px;
        height: 17px;
        margin-left: 3px;
      }
      .label {
        margin-left: 9px;
        width: 80px;
        height: 20px;
        font-weight: 600;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        letter-spacing: 1px;
        font-family:
          PingFangSC,
          PingFang SC;
      }
    }
  }
  .cnt {
    display: flex;
    align-items: center;
    .label {
      display: block;
      width: 111px;
      height: 20px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      text-align: right;
    }
    .select {
      width: 140px;
      margin-left: 5px;
      border-radius: 6px;
    }
    .confirm {
      cursor: pointer;
      margin-left: 9px;
      display: block;
      width: 66px;
      height: 30px;
      line-height: 30px;
      background: #2b68ff;
      border-radius: 15px;
      font-size: 14px;
      text-align: center;
      color: #ffffff;
    }
    .history {
      cursor: pointer;
      margin-left: auto;
      display: block;
      text-align: center;
      width: 100px;
      height: 30px;
      line-height: 28px;
      background: #ffffff;
      border-radius: 15px;
      border: 1px solid #92b1ff;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 14px;
      margin-right: 20px;
      color: #2b68ff;
    }
  }
  .explan {
    margin: 10px;
    padding: 10px 14px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #f44140;
    line-height: 18px;
    text-align: left;
    font-style: normal;
    border-radius: 3px;
    background: #fff1f1;
    border-radius: 3px;
  }
}
</style>
