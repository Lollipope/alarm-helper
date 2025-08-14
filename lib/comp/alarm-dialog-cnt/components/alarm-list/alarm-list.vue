<template>
  <div class="alarm-list">
    <!-- 过滤框 -->
    <FilterBox
      :alarmType="props.alarmTypeIdSelect"
      v-model:condition="filter"
      :importOptions="alarmImportanceOptions"
      :gradeOptions="gradeOptions"
      :readOptions="readOptions"
      :intervalTypeOptions="intervalTypeOptions"
      @on-yes="onFilterYes"
      @on-reset="onFilterReset"
    />
    <!-- 信息列表 -->
    <AlarmMsgList
      ref="alarmMsgListRef"
      v-model:scrollStatus="scrollStatus"
      :list="msgList"
      :selectAlarmId="alarmMsgSelect && alarmMsgSelect.msgId"
      @selectAlarm="onSelectAlarm"
      :loadMore="loadMoreMsgList"
    />
  </div>
</template>

<script setup lang="ts">
import { AlarmRobotApi, CommonApi } from '@ah/api'
import { getAlarmSmallTypeImgUrl, AlarmTypeIds, getLatestInterval } from '@ah/utils'
import FilterBox from './filter-box.vue'
import AlarmMsgList from './alarm-msg-list.vue'

// 选中的告警大类
const props = defineProps({
  alarmTypeIdSelect: {
    type: String,
    default: AlarmTypeIds.ALL,
  },
})
const emits = defineEmits(['update:alarmSelect', 'changeAlarmKindId', 'refreshMenu', 'changeList'])
// 选中的告警对象
const alarmMsgSelect = defineModel('alarmSelect', {
  type: Object,
  default: {},
})
watch(
  () => props.alarmTypeIdSelect,
  (newVal) => {
    filter.value.typeVal = [] // 清空告警类型
  },
)

const filter = ref({
  ipt: '',
  importVal: '', //告警重要性:默认全部
  gradeVal: '', //告警级别:默认全部
  typeVal: [], //告警类型
  isRead: '', //消息状态
  intervalType: '', //区间类型 1-管理中心，2-西人工岛
})
const msgList = ref<Array<any>>([])
watch(
  msgList,
  (val) => {
    emits('changeList', !val || val.length == 0)
  },
  {
    immediate: true,
  },
)

const scrollStatus = ref({
  isLoading: false, // 正在加载中
  isEnd: false, // 是否加载到底
})
const listStatus = reactive({
  current: 1,
  size: 10,
})
const alarmMsgListRef = shallowRef()

watch(
  () => props.alarmTypeIdSelect,
  () => initMsgList({}),
)

onMounted(() => {
  // 初始化下拉框选项
  initOptions()
  // 初始化消息列表
  initMsgList({})
})
// 重要性选项
const alarmImportanceOptions = ref<{ label: string; value: string }[]>([])
// 等级选项
const gradeOptions = ref<{ label: string; value: string }[]>([])
const readOptions = ref<{ label: string; value: string }[]>([])
const intervalTypeOptions = ref<{ label: string; value: string }[]>([])
function initOptions() {
  CommonApi.getDictionaryListByKey('alarm_major_type').then((data) => {
    const options = (data || []).map((item) => ({
      label: item.kindName,
      value: item.kindId,
    }))
    alarmImportanceOptions.value = [{ label: '全部', value: '' }, ...options]
  })

  // 告警级别
  CommonApi.getDictionaryListByKey('alarm_level_type').then((data) => {
    const options = (data || []).map((item, idx) => ({
      label: `${item.kindName}`,
      value: item.kindId,
    }))
    gradeOptions.value = [{ label: '全部', value: '' }, ...options]
  })

  readOptions.value = [
    { label: '全部', value: '' },
    { label: '已读', value: '1' },
    { label: '未读', value: '0' },
  ]
  CommonApi.getSectionList().then(({ data }) => {
    const options = (data || []).map((item) => ({
      label: item.managementSectionName,
      value: item.id,
    }))
    intervalTypeOptions.value = [{ label: '全部', value: '' }, ...options]
  })
}
// 初始化列表
function initMsgList({ page = 1, size = listStatus.size, msgId = void 0 }) {
  const { gradeVal = 0, importVal, ipt, isRead, intervalType } = filter.value
  const typeVal = filter.value.typeVal

  const params = {
    page,
    size,
    alarmKindId: props.alarmTypeIdSelect, //告警大类
    alarmIdList: typeVal.join(','), // 告警小类
    alarmLevel: gradeVal, //告警级别
    alarmMajor: importVal, //告警重要性
    keyWord: ipt, //关键字
    isRead, // 已读状态
    managementSectionId: intervalType, // 区间类型
  }
  return queryMsgList(params).then((res) => {
    const list = (res.result || []).map((item: any) => {
      return {
        ...item,
        alarmTitle: item.alarmName,
        alarmDesc: item.msg,
        isNew: false,
        isRead: !!item.isRead,
        iconUrl: getAlarmSmallTypeImgUrl(String(item.alarmId).padStart(3, '0')),
        isRemarkEdit: false,
        isUp: 0, //重置该字段
      }
    })
    // 添加置顶分割线
    const normalFirst = list.findIndex((item: any) => item.isUp == 0)
    if (normalFirst > 0) {
      list[normalFirst - 1].$type = 'DIVIDER'
    }
    msgList.value = list
    // 是否加载到底部
    scrollStatus.value.isEnd = res.totalCount === msgList.value.length
    scrollStatus.value.isLoading = false
    listStatus.current = 1
    alarmMsgListRef.value?.setScrollTop()

    // 选中
    if (msgId) {
      const checkItemIndex = list.findIndex((item) => item.msgId === msgId)
      onSelectAlarm(checkItemIndex >= 0 ? list[checkItemIndex] : null)
    } else {
      onSelectAlarm(list.length > 0 ? list[0] : null)
    }
  })
}
// 加载更多
function loadMoreMsgList({ size = listStatus.size }) {
  listStatus.current = listStatus.current + 1
  const { typeVal, gradeVal = 0, importVal, ipt, isRead, intervalType } = filter.value
  const params = {
    page: listStatus.current,
    size,
    alarmKindId: props.alarmTypeIdSelect, //告警大类
    alarmIdList: typeVal.join(','), // 告警小类
    alarmLevel: gradeVal, //告警级别
    alarmMajor: importVal, //告警重要性
    keyWord: ipt, //关键字
    isRead, // 已读状态
    managementSectionId: intervalType,
  }
  scrollStatus.value.isLoading = true
  return queryMsgList(params)
    .then((res) => {
      const moreList: Array<any> = (res.result || []).map((item: any) => {
        return {
          ...item,
          alarmTitle: item.alarmName,
          alarmDesc: item.msg,
          isNew: false,
          isRead: !!item.isRead,
          iconUrl: getAlarmSmallTypeImgUrl(String(item.alarmId).padStart(3, '0')),
          isUp: 0, //重置该字段
        }
      })
      msgList.value.push(...moreList)
      scrollStatus.value.isEnd = res.totalCount <= msgList.value.length
    })
    .finally(() => {
      scrollStatus.value.isLoading = false
    })
}
// 查询列表数据
function queryMsgList(queryParams: any) {
  let alarmKindId = queryParams.alarmKindId === AlarmTypeIds.ALL ? '' : queryParams.alarmKindId
  // 有过滤条件,就查询所有大类的消息
  alarmKindId = queryParams.keyWord && queryParams.keyWord !== '' ? '' : alarmKindId

  const { endTime, startTime } = getLatestInterval(3, 'month')
  const params = {
    ...queryParams,
    alarmKindId, //告警大类
    startTime,
    endTime,
    handleStatus: '0,3', //处理未处理和无需处理的消息
    isHistoryList: false, //非历史列表
  }
  return AlarmRobotApi.getAlarmMsgPage(params).then((res) => res.data)
}

// 点击过滤条件确定按钮
function onFilterYes() {
  const { ipt } = filter.value
  // 存在过滤条件, 跳转大类菜单项
  if (ipt && ipt.trim() != '' && props.alarmTypeIdSelect !== AlarmTypeIds.ALL) {
    emits('changeAlarmKindId', AlarmTypeIds.ALL)
    return
  }
  initMsgList({})
}

// 点击过滤条件重置按钮
function onFilterReset() {
  const { ipt } = filter.value
  // 存在过滤条件, 跳转大类菜单项
  if (ipt && ipt.trim() != '' && props.alarmTypeIdSelect !== AlarmTypeIds.ALL) {
    emits('changeAlarmKindId', AlarmTypeIds.ALL)
    return
  }
  initMsgList({})
}

// 选中的告警信息
function onSelectAlarm(item: any) {
  // console.log('设置已读消息: ', item)
  if (!item) {
    alarmMsgSelect.value = null
    return
  }
  // 已读的消息,不重复设置已读
  if (item.isRead) {
    alarmMsgSelect.value = item
    return
  }

  //调用接口设置已读
  AlarmRobotApi.readMsgById(item.msgId).then((res) => {
    const isSuc = res.code === 200
    if (isSuc) {
      item.isRead = true
      item.isNew = false
      alarmMsgSelect.value = item
    }
    const isAllRead = msgList.value.every((msg: any) => msg.isRead)
    // 该类下所有消息已全部已读,刷新大类菜单
    isAllRead && emits('refreshMenu')
  })
}
//插入消息到消息列表
function insertMsgList(row: any) {
  msgList.value.unshift(row)
}

defineExpose({
  initMsgList,
  insertMsgList,
})
</script>

<style scoped lang="scss">
.alarm-list {
  margin-top: 59px;
  margin-left: 10px;
  position: relative;
  &::after {
    pointer-events: none;
    display: block;
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    position: absolute;
    background: linear-gradient(transparent 0%, #fff 100%);
  }
}
</style>
