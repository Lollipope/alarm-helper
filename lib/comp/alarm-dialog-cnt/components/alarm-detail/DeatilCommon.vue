<template>
  <div class="base-box">
    <div class="head">
      <div class="head-title" :title="alarmSelect.alarmTitle">{{ alarmSelect.alarmTitle }}</div>
      <div class="oper-btn-wrap">
        <span v-if="props.systemConf.perm" class="btn dealwith" @click="goSys">前往处理</span>
        <template v-if="props.systemConf.btn">
          <span class="btn correct" @click="onReportCorr">{{
            String(props.alarmSelect.handleStatus) === '1' ? '已正报' : '正报'
          }}</span>
          <span class="btn misco" @click="onReportMis">{{
            String(props.alarmSelect.handleStatus) === '2' ? '已误报' : '误报'
          }}</span>
        </template>
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
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { AlarmRobotApi } from '@ah/api'
import { getGoSysParams } from '@ah/utils'
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
    props.alarmSelect.handleStatus = '2'
  })
}
</script>

<style scoped lang="scss">
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
      width: 240px;
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
