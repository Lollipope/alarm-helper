<template>
  <DetailSect title="视频实况" :imgUrl="imgUrl">
    <SwiperBox :list="liveList">
      <template #default="{ data }">
        <div class="pic" v-for="(li, index) of data.item" :key="index">
          <StreamBox v-if="li" :pid="li" :mode="mode" />
        </div>
      </template>
    </SwiperBox>
  </DetailSect>
</template>
<script setup lang="ts">
import DetailSect from './DetailSect.vue'
import StreamBox from '@ah/comp/stream-box/StreamBox.vue'
import SwiperBox from '@ah/comp/swiper-box/SwiperBox.vue'
import { chunkArray } from '@ah/utils'
import imgUrl from '../../../../assets/images/shikuang.png'
const props = defineProps({
  alarmSelect: {
    type: Object,
    default: () => ({}),
  },
})

const mode = window?.globalConfig?.AlarmStreamMode
const liveList = ref<Array<Array<string | undefined>>>([[,]])

watch(() => props.alarmSelect, initAlarmInfo)

onMounted(() => {
  initAlarmInfo(props.alarmSelect)
})

function initAlarmInfo(alarmSelect: { info?: string; infoObj?: { deviceId: string } }) {
  if (!alarmSelect || !alarmSelect.info || alarmSelect.info === '') {
    liveList.value = chunkArray([,], 2)
    return
  }
  const infoObj = alarmSelect.infoObj
  const pids = (infoObj?.deviceId || '').split(',')
  liveList.value = chunkArray(pids, 2)
}
</script>

<style scoped lang="scss">
@import './common.scss';
.kind-item {
  .kind-title {
    height: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      margin-left: 7px;
      width: 18px;
      height: 12px;
      display: inline-block;
    }
    .name {
      margin-left: 9px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1px;
    }
  }

  .kind-cnt {
    .pic {
      height: 124px;
      border-radius: 6px;
      // border: 1px solid #a5ceff;
      .empty {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
        font-size: 14px;
        color: var(--el-text-color-placeholder);
        background-color: var(--el-fill-color-light);
      }
      :deep(.prism-player) {
        border-radius: 6px;
      }
    }
  }
}
</style>
