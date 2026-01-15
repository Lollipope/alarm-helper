<template>
  <div class="msgHistoryCon">
    <el-table :data="tableData" style="width: 100%; height: 100%" empty-text="暂无历史记录">
      <el-table-column align="center" prop="sendTime" label="发送时间" />
      <el-table-column align="center" prop="sendName" label="发送人" />
      <el-table-column align="center" prop="test" label="发送内容">
        <template #default="scope">
          <div @click="((browseShow = true), (content = scope.row.content))" class="browse">
            浏览
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="receiveName" label="接收人" />
      <el-table-column align="center" prop="result" label="发送结果">
        <template #default="scope">
          <div class="success" v-if="scope.row.result === 1">成功</div>
          <div class="err" v-else>失败</div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <BrowseDialog
    :alarmSelect="alarmSelect"
    :content="content"
    v-model:visible="browseShow"
  ></BrowseDialog>
</template>

<script lang="ts" setup>
import BrowseDialog from './BrowseDialog.vue'
import { CommonApi } from '@ah/api'

const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => {},
  },
})

type dataRes = {
  code: number
  data: { result: [] }
  msg: string
}

const content = ref('')
const browseShow = ref(false)

function init() {
  const params = {
    page: 1,
    size: 1000,
    msgId: props.alarmSelect.msgId,
  }

  CommonApi.getSmsSendHistoryPage(params).then((val) => {
    const res = val as dataRes
    if (res.code == 200) {
      tableData.value = res.data?.result
    }
  })
}

init()

const tableData = ref([])
</script>

<style lang="scss" scoped>
.msgHistoryCon {
  width: 100%;
  height: 100%;

  .success {
    color: rgb(9, 201, 9);
  }

  .err {
    color: red;
  }

  .browse {
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #2b68ff;
    cursor: pointer;
    width: 48px;
    margin: 0 auto;

    &:hover {
      background: #2b68ff;
      border-radius: 5px;
      color: #fff;
    }
  }

  :deep(.el-table__header-wrapper thead th) {
    background-color: #dce6ff;
  }
}
</style>
