<template>
  <div class="sendMsgCon">
    <DetailHeaderSecond title="发送人"></DetailHeaderSecond>
    <el-tree-select
      multiple
      v-model="userVal"
      show-checkbox
      :data="treeUserList"
      style="width: 100%; margin: 5px 0"
    >
    </el-tree-select>
    <DetailHeaderSecond title="短信内容"></DetailHeaderSecond>

    <div class="sendMsgCon-content">
      <div class="text">
        <el-input
          placeholder="请输入内容"
          v-model="msgContent"
          style="width: 100%"
          :rows="2"
          type="textarea"
        ></el-input>
      </div>
      <div class="detailsTitle">
        <img :src="bellIcon" alt="" />
        告警详情信息
      </div>
      <div class="detailsList">
        <div class="detailsList-item">
          <div class="detailsList-item-label">告警类型：</div>
          <div class="detailsList-item-cnt">{{ alarmSelect.alarmName }}</div>
        </div>
        <div class="detailsList-item">
          <div class="detailsList-item-label">发生时间：</div>
          <div class="detailsList-item-cnt">{{ alarmSelect.alarmTime }}</div>
        </div>
        <div class="detailsList-item">
          <div class="detailsList-item-label">告警等级：</div>
          <div class="detailsList-item-cnt">{{ alarmSelect.alarmLevel }}</div>
        </div>
        <div class="detailsList-item">
          <div class="detailsList-item-label">报警位置：</div>
          <div class="detailsList-item-cnt">{{ directionNameFilter(alarmSelect.info) }}</div>
        </div>
        <div class="detailsList-item">
          <div class="detailsList-item-label">告警内容：</div>
          <div class="detailsList-item-cnt" :title="props.alarmSelect.msg">
            {{ props.alarmSelect.msg }}
          </div>
        </div>
      </div>
    </div>
    <div class="sendMsgCon-sendBtn">
      <el-button type="primary" @click="sendMsgBtn">发送</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DetailHeaderSecond from './DetailHeaderSecond.vue'
import bellIcon from '../../../assets/images/sendMsg/bellIcon.png'
import { CommonApi } from '@lollipope/alarm-helper'
import { ElMessage } from 'element-plus'

const userInfoJson = localStorage.getItem('cdp-userInfo') as string
const userInfo = localStorage ? JSON.parse(userInfoJson) : ''

const emits = defineEmits(['hide'])

const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => {},
  },
})

interface TreeList {
  value: string
  label: string
  children: TreeList[] | undefined
}
interface ItemType {
  department: string
  list: []
}
interface infoType {
  name: string
  mobilePhone: string
}
type dataRes = {
  code: number
  data: []
  msg: string
}
const userVal = ref()
const treeUserList: TreeList[] = reactive([])
function getAllUserInfoListFn() {
  CommonApi.getAllUserInfoList().then((val) => {
    const res = val as dataRes
    if (res.code == 200) {
      if (res.data && res.data.length > 0) {
        res.data.map((item: ItemType) => {
          const obj: TreeList = { value: '', label: '', children: [] }
          obj.value = item.department
          obj.label = item.department
          if (item.list && item.list.length > 0) {
            item.list.map((info: infoType) => {
              const obj2: TreeList = { value: '', label: '', children: [] }
              ;(obj2.label = info.name), (obj2.value = `${info.mobilePhone},${info.name}`)
              obj?.children?.push(obj2)
            })
          }
          treeUserList.push(obj)
        })
      }
    }
  })
}
getAllUserInfoListFn()
const msgContent = ref('')

function directionNameFilter(val: string) {
  if (!val) return ''
  const data = JSON.parse(val)
  const directionName = data.directionName ? data.directionName : ''
  const roadName = data.roadName ? data.roadName : ''
  return roadName + directionName
}

interface sendParams {
  receiveName: string
  receivePhone: string
  content: string
  linkInfo: string
  linkSys: string
  sendName: string
  msgId: string
}

function sendMsgBtn() {
  if (userVal.value && userVal.value.length > 0) {
    if (!msgContent.value) return ElMessage.warning('请填写发送内容')
    const params = [] as sendParams[]
    userVal.value.map((item: string) => {
      const obj = {
        receiveName: '',
        receivePhone: '',
        content: '',
        linkInfo: '',
        linkSys: '',
        sendName: '',
        msgId: '',
      }
      const [value, label] = item.split(',')
      obj.receiveName = label
      obj.receivePhone = value
      obj.content = msgContent.value
      obj.linkInfo = props.alarmSelect.msg
      obj.linkSys = '智慧版告警中心'
      obj.sendName = userInfo.userName || ''
      obj.msgId = props.alarmSelect.msgId
      params.push(obj)
    })

    CommonApi.sendSms(params).then((val) => {
      const res = val as dataRes
      if (res.code == 200) {
        ElMessage.success(res.msg)
      } else {
        ElMessage.warning(res.msg)
      }
      emits('hide')
    })
  } else {
    ElMessage.warning('请选择发送人')
  }
}
</script>

<style lang="scss" scoped>
.sendMsgCon {
  width: 100%;
  height: 100%;
  background: #eff4ff;
  border-radius: 10px;
  padding: 10px;

  &-sendBtn {
    text-align: center;
  }

  &-content {
    width: 100%;
    height: calc(100% - 120px);
    background: white;
    margin-top: 5px;

    .text {
      padding: 10px 30px;
    }

    .detailsTitle {
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #2b68ff;
      display: flex;
      justify-content: start;
      align-items: center;
      width: 50%;
      height: 36px;
      background: linear-gradient(279deg, rgba(228, 236, 255, 0) 0%, #e4ecff 100%);
      padding-left: 20px;

      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }

    .detailsList {
      padding: 10px 30px;

      &-item {
        width: 100%;
        display: flex;
        justify-content: start;
        margin: 2px 0;

        &-label {
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #666666;
          width: 15%;
        }

        &-cnt {
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 500;
          font-size: 14px;
          color: #333333;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}

:deep(.el-textarea__inner) {
  resize: none !important;
  /* 禁止调整大小 */
  box-shadow: none;
  padding-left: 0;
}

:deep(.el-tag.is-closable) {
  border-radius: 15px;
}

:deep(.el-tag .el-tag__close:hover) {
  background-color: #2b68ff;
}
</style>
