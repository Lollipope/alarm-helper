<template>
  <Teleport to="body" v-if="visible">
    <div class="devicePopMask">
      <div class="devicePop">
        <div class="head">
          <span class="title">{{ props.title || '' }}</span>
          <span class="close-btn" @click="close"></span>
        </div>

        <div class="main">
          <div class="content">
            当前触发行人 /
            非机动车闯入告警，该告警为目标可随时间位移的动态延续性告警。系统已自动匹配告警点位周边
            5km 范围内枪型摄像机，拟对该类告警执行静默操作。
          </div>
          <el-table
            :data="deviceData"
            height="85%"
            ref="tableRef"
            style="width: 100%; padding-left: 10px"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column property="deviceName" label="摄像头" />
            <el-table-column property="milePost" label="桩号" />
            <el-table-column property="distance" label="离当前摄像枪距离" width="200">
              <template #default="scope">
                <div>{{ scope.row.distance + 'm' }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="foot">
          <div class="foot-cancel" @click="close">取消</div>
          <div class="foot-confirm" @click="submitFn">确认</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { type Device } from '@ah/api'
import type { TableInstance } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    default: '管控任务创建',
  },
})
const emits = defineEmits(['submit'])
const tableRef = ref<TableInstance>()
const visible = defineModel('visible', { default: false })
const deviceData = defineModel<Array<Device>>('deviceData', { default: [] })

const close = () => {
  visible.value = false
}

function getDeviceIdStr(list: Array<Device>) {
  if (!Array.isArray(list)) return ''

  return list
    .map((item) => item?.deviceId) // 只取出 deviceId
    .filter((id) => id != null && id !== '') // 过滤空值
    .join(',') // 逗号拼接
}
function submitFn() {
  const arr = tableRef.value?.getSelectionRows() || []
  emits('submit', getDeviceIdStr(arr))
}
</script>

<style lang="scss" scoped>
.devicePopMask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;

  .devicePop {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 810px;
    height: 623px;
    background: white;
    box-shadow: 0px 0px 4px 0px rgba(102, 122, 134, 0.5);
    border-radius: 6px;
    border: 1px solid #a9d4ff;

    .head {
      margin: 10px 20px 0;
      height: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .title {
        padding-left: 14px;
        height: 22px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        position: relative;

        &::before {
          position: absolute;
          display: block;
          left: 0;
          content: '';
          top: 3px;
          width: 8px;
          height: 16px;
          background: url('../../assets/images/title-before.png') 0 0 /100% 100% no-repeat;
        }
      }

      .close-btn {
        display: block;
        background: url('../../assets/images/alart-pop_close.png') 0 0 /100% 100% no-repeat;
        width: 14px;
        height: 14px;
        cursor: pointer;
      }
    }

    .main {
      height: 80%;
      overflow-y: auto;

      .content {
        padding: 0 20px;
        margin-bottom: 10px;
      }
    }

    .foot {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;

      &-cancel {
        padding: 6px 46px;
        cursor: pointer;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        font-size: 14px;
        font-family:
          PingFang SC,
          PingFang SC-Medium;
        font-weight: Medium;
        text-align: center;
        color: #333333;
      }

      &-confirm {
        margin-left: 30px;
        padding: 6px 46px;
        cursor: pointer;
        background: #2b68ff;
        border-radius: 3px;
        font-size: 14px;
        font-family:
          PingFang SC,
          PingFang SC-Medium;
        font-weight: Medium;
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
</style>
