<template>
  <div class="popupDialogCon" v-if="dialogShow">
    <el-dialog
      draggable
      append-to-body
      class="uva-dialog"
      style="margin-top: 2vh !important"
      overflow
      :width="props.width ? props.width : '1319px'"
      :title="props.title"
      v-model="dialogShow"
      @close="close"
    >
      <div class="cnt" :style="{ height: props.height ? props.height : 'auto' }">
        <div>
          <iframe
            ref="iframeRef"
            width="100%"
            height="800px"
            :src="iframeSrc"
            @load="onLoad"
          ></iframe>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElDialog } from 'element-plus'
import type { UavParams } from '../uav'
import { getUavUrlByParams } from '@ah/api/common'
const props = defineProps({
  title: {
    type: String,
    default: '无人机系统',
  },
  height: {
    type: String,
    default: '800px',
  },
  width: {
    type: String,
    default: '100vw',
  },
  uavData: {
    type: Object as PropType<UavParams>,
  },
})
const dialogShow = defineModel<boolean>({ default: false })
const emits = defineEmits(['close'])

const iframeSrc = ref()
watch(
  () => dialogShow.value,
  (val) => {
    if (!val) return
    console.log('无人机', val)
    const uavData = props.uavData
    if (!uavData || !uavData?.dockSn) return
    getUavUrlByParamsFn('one-click-fly', uavData)
  },
  { deep: true, immediate: true },
)
function getUavUrlByParamsFn(type: string, objData: UavParams) {
  const params = {
    type,
  }

  return getUavUrlByParams(params).then((res) => {
    console.log('无人机', res)
    const origin = window.location.origin
    iframeSrc.value = res.data
    if (objData.longitude) {
      //  一键起飞
      iframeSrc.value =
        iframeSrc.value = `${iframeSrc.value}&origin=${origin}&dockSn=${objData.dockSn}&eventLongitude=${objData.longitude}&eventLatitude=${objData.latitude}`
      if (objData.cycleId) {
        // 保存jobId
        console.log('objData.cycleId: ', objData.cycleId)
      }
    } else {
      iframeSrc.value = `${iframeSrc.value}&origin=${origin}&dockSn=${objData.dockSn}`
    }
    console.log('iframeSrc', iframeSrc.value)

    nextTick(() => {
      dialogShow.value = true
    })
  })
}

// 关闭
function close() {
  dialogShow.value = false
  emits('close')
}
const iframeRef = shallowRef()
function onLoad() {
  console.log('iframe加载')
  iframeRef.value.contentWindow.postMessage(
    {
      from: 'external-system',
      type: 'test',
      data: {
        msg: '测试用的消息',
      },
    },
    'http://172.17.1.69:9090',
  )
}
function receiveFromSass(event: MessageEvent) {
  console.log('receive接收信息', event)
  if (event?.data?.data) {
    const params = {
      jobId: event?.data?.data,
    }
    console.log('jonId: ', params)
  }
}
onMounted(() => {
  window.addEventListener('message', receiveFromSass)
})
onBeforeUnmount(() => {
  window.removeEventListener('message', receiveFromSass)
})
</script>

<style lang="scss" scoped>
.popupDialogCon {
  .cnt {
    // width: 100%;
    // height: 77vh;
    overflow-y: auto;
  }
}
</style>

<style lang="scss">
.uva-dialog {
}
</style>
