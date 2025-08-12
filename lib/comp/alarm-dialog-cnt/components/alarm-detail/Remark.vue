<template>
  <div class="remark">
    <div class="left">
      <img src="../../../../assets/images/beizhu.png" alt="" class="icon" />
      <span class="label">备注: </span>
    </div>
    <div class="right">
      <div class="cnt">
        <span class="text" v-if="!remark.isEdit" @mouseenter="mousenter" @mouseleave="mouseleave">{{
          remark.text
        }}</span>
        <input
          type="text"
          class="ipt text"
          v-model="remark.text"
          v-else
          @blur="showText"
          @mouseenter="mousenter"
          @mouseleave="mouseleave"
        />
        <div class="tooltip" v-if="!remark.isEdit && isHover && remark.text">
          {{ remark.text }}
        </div>
      </div>
      <img src="../../../../assets/images/pen.png" class="icon" @click="changeStatus" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommonApi } from '@ah/api'

const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})

const remark = ref({
  text: props.alarmSelect.remark as string,
  isEdit: false,
})

const isHover = ref(false)

function changeStatus() {
  remark.value.isEdit = !remark.value.isEdit
}

function showText() {
  remark.value.isEdit = false
  return CommonApi.updateRemark(props.alarmSelect.msgId, remark.value.text)
}

function mousenter() {
  isHover.value = true
}
function mouseleave() {
  isHover.value = false
}
</script>

<style scoped lang="scss">
.remark {
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
      width: 46px;
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
  .right {
    display: flex;
    align-items: center;
    .cnt {
      width: 320px;
      position: relative;
      .tooltip {
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(calc(-100% - 6px));
        width: 100%;
        background: rgba(65, 91, 120, 0.9);
        border-radius: 6px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-size: 12px;
        color: #ffffff;
        line-height: 17px;
        letter-spacing: 1px;
        padding: 13px;
        height: fit-content;
        word-break: break-all;
        &:after {
          position: absolute;
          bottom: -8px;
          left: 50%;
          width: 0;
          height: 0;
          content: '';
          border-top: 4px solid rgba(65, 91, 120, 0.9);
          border-right: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 4px solid transparent;
        }
      }
      .text {
        display: block;
        width: 100%;
        height: 20px;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ipt {
        all: unset; /* 重置所有样式 */
        border: none; /* 去掉默认的边框 */
        outline: none; /* 去掉聚焦时的默认轮廓 */
        padding: 0; /* 去掉默认的内边距 */
        margin: 0; /* 去掉默认的外边距 */
        display: block;
        width: 100%;
        text-indent: 10px; /* 设置输入框文本的缩进 */
        font-size: 14px;
        color: #333333;
        letter-spacing: 1px;
        background: #d2eaff; /* 设置焦点时的背景 */
      }
    }
    .icon {
      display: block;
      width: 17px;
      height: 17px;
    }
  }
}
</style>
