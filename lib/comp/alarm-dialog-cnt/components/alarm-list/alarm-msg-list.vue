<template>
  <div class="alarm-msg-list" @scroll="onScroll" ref="scrollContentRef">
    <div
      class="alarm-msg-item"
      v-for="item of list"
      :key="item.msgId"
      :class="{
        selected: item.msgId === props.selectAlarmId,
        isRead: item.isRead,
        isDeal: [1, 2].includes(Number(item.handleStatus)),
        divider: item.$type == 'DIVIDER',
      }"
      @click="emit('selectAlarm', item)"
    >
      <div class="item-icon">
        <span
          class="icon-level"
          :class="{
            level1: String(item.alarmMajor) === '1',
            level2: String(item.alarmMajor) === '2',
          }"
        />
        <img class="icon-type" :src="item.iconUrl" />
      </div>
      <div class="item-info">
        <!-- 新消息图片  -->
        <div class="title">
          <div class="alarm-title" :class="{ point: item.isNew }" :title="item.alarmTitle">
            {{ item.alarmTitle }}
          </div>
          <div class="item-time">
            {{ item.alarmTime.slice(0, 11) }}<br />{{ item.alarmTime.slice(11) }}
          </div>
        </div>
        <div class="alarm-desc" :title="item.alarmDesc">
          {{ item.alarmDesc }}
        </div>
      </div>
      <!-- 信息等级图标 -->
      <div
        class="item-level-icon"
        :class="{
          level1: String(item.alarmLevel) === '1',
          level2: String(item.alarmLevel) === '2',
          level3: String(item.alarmLevel) === '3',
          level4: String(item.alarmLevel) === '4',
        }"
      ></div>
      <div class="affix" v-if="item.$type == 'DIVIDER'">以上告警内容置顶</div>
    </div>
    <div class="scroll-loading-bar" v-if="scrollStatus.isLoading">
      <el-icon class="is-loading" :size="16"><Loading /></el-icon>
      <span class="word">数据加载中，请稍候</span>
    </div>
    <div
      class="scroll-loading-bar"
      v-if="list.length > 0 && scrollStatus.isEnd"
      :class="{ end: scrollStatus.isEnd }"
    >
      <span class="word">-- 已经到底了 --</span>
    </div>
    <!-- <div class="empty-holder" v-if="list.length === 0 && scrollStatus.isEnd"></div> -->
  </div>
</template>

<script setup lang="ts">
export interface AlarmMsg {
  msgId: string //信息id
  alarmTitle: string //告警标题
  alarmDesc: string //描述
  alarmTime: string // 时间
  createTime: string //创建时间
  alarmLevel: string //等级
  alarmKindId: string // 告警大类
  alarmId: string //告警小类id
  isNew: boolean // 是否新消息
  isRead: boolean //是否已读
  handleStatus: number | string
  iconUrl: string //图标地址
  alarmMajor: string | number //重要性
  $type?: string // 分割线
}
const props = defineProps({
  // 选中的消息id
  selectAlarmId: {
    type: String,
    default: '',
  },
  list: {
    type: Array<AlarmMsg>,
    default: () => [],
  },
  loadMore: {
    type: Function,
    default: () => [],
  },
})

const emit = defineEmits(['selectAlarm', 'update:scroll-status'])

const scrollContentRef = shallowRef()
const scrollStatus = defineModel<{ isLoading: boolean; isEnd: boolean }>('scrollStatus', {
  required: true,
})
function onScroll() {
  if (!scrollContentRef.value) {
    console.warn('scrollContentRef 不存在')
    return
  }
  const $div = scrollContentRef.value
  const scrollTop = $div.scrollTop
  const scrollHeight = $div.scrollHeight
  const offsetHeight = $div.offsetHeight

  if (scrollTop + offsetHeight + 1 >= scrollHeight) {
    // 上一次瀑布加载完数据才允许进行下一次加载
    if (!scrollStatus.value.isLoading && !scrollStatus.value.isEnd) {
      scrollStatus.value.isLoading = true
      // 这里太快了,一闪而过,要慢一点
      setTimeout(() => {
        props.loadMore({})
      }, 800)
    }
  }
}

function setScrollTop() {
  scrollContentRef.value.scrollTop = 0
}

defineExpose({
  setScrollTop,
})
</script>

<style scoped lang="scss">
.alarm-msg-list {
  height: 652px;
  padding-right: 11px;
  padding-top: 3px;
  width: 297px;
  overflow-x: hidden;
  overflow-y: auto;
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #dee5ec !important;
    }
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent !important;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track {
    width: 6px;
    height: 6px;
    border-radius: 4px;
    background-color: transparent !important; //设置背景透明
  }

  .alarm-msg-item {
    cursor: pointer;
    width: 280px;
    height: 74px;
    margin-bottom: 10px;
    background: #ffffff;
    border-radius: 15px;
    border: 1px solid #a0ceff;
    display: flex;
    position: relative;

    &.isRead {
      .item-info {
        position: relative;
        &::before {
          display: none;
        }
        .title {
          .alarm-title {
            color: #888888;
          }

          .item-time {
            color: #888888;
          }
        }
      }
    }
    &.isDeal {
      background: #e9f3ff;
      border: 1px solid #bdddff;
      font-size: 11px;
      color: #888888;
      .icon-type,
      // .icon-level,
      .item-level-icon {
        filter: grayscale(80%);
      }
    }
    &.selected {
      background: #d9e6ff;
      box-shadow: 0px 1px 5px 0px rgba(102, 132, 174, 0.32);
      border: 1px solid #2b68ff;
    }
    &:hover {
      background: #d9e6ff;
      box-shadow: 0px 1px 5px 0px rgba(102, 132, 174, 0.25);
    }
    &.divider {
      margin-bottom: 30px;
      .affix {
        position: absolute;
        left: 0;
        bottom: -23px;
        width: 100%;
        margin: 0 auto;
        font-size: 9px;
        color: #999999;
        text-align: center;
        @mixin commonDividerStyle {
          position: absolute;
          width: 56px;
          content: '';
          height: 1px;
          background: #979797;
          opacity: 0.38;
        }
        &:before {
          left: 16px;
          top: 50%;
          @include commonDividerStyle;
        }
        &:after {
          right: 16px;
          top: 50%;
          @include commonDividerStyle;
        }
      }
    }

    .item-icon {
      margin: 11px 11px 0 13px;
      display: block;
      width: 50px;
      height: 50px;
      position: relative;
      .icon-level {
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        &.level1 {
          background: url('../../../../assets/images/alarm-robot-msg1.png') 0 0/ 100% 100% no-repeat;
        }
        &.level2 {
          background: url('../../../../assets/images/alarm-robot-msg2.png') 0 0/ 100% 100% no-repeat;
        }
      }
      .icon-type {
        width: 100%;
        height: 100%;
      }
    }

    .item-info {
      width: calc(100% - 74px);
      position: relative;
      &::before {
        position: absolute;
        content: '';
        display: block;
        top: 12px;
        left: 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #ff2e2e;
      }
      .title {
        display: flex;
        justify-content: space-between;
        .alarm-title {
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 600;
          font-size: 14px;
          color: #333333;
          line-height: 16px;
          max-width: 126px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
          padding-top: 17px;
          padding-right: 20px;
          &.point::after {
            content: '';
            display: block;
            background: url('../../../../assets/images/alarm-robot-msg-new.png') no-repeat 0 0/ 100%
              100%;
            position: absolute;
            right: 10px;
            top: 5px;
            width: 21px;
            height: 11px;
          }
        }

        .item-time {
          align-self: flex-end;
          margin-right: 12px;
          font-family: DIN, DIN;
          font-weight: 400;
          font-size: 11px;
          color: #888888;
          line-height: 10px;
          text-align: right;
        }
      }
      .alarm-desc {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 6px;
        padding-right: 9px;
        height: 17px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #666666;
        line-height: 17px;
      }
    }
    .item-level-icon {
      position: absolute;
      right: -1px;
      bottom: 0;
      width: 40px;
      height: 20px;

      &.level1 {
        background: url('../../../../assets/images/alarm-robot-type1.png') no-repeat 0 0/ 100% 100%;
      }
      &.level2 {
        background: url('../../../../assets/images/alarm-robot-type2.png') no-repeat 0 0/ 100% 100%;
      }
      &.level3 {
        background: url('../../../../assets/images/alarm-robot-type3.png') no-repeat 0 0/ 100% 100%;
      }
      &.level4 {
        background: url('../../../../assets/images/alarm-robot-type4.png') no-repeat 0 0/ 100% 100%;
      }
    }
  }
  .scroll-loading-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #777777;
    font-size: 11px;
    .word {
      margin-left: 6px;
    }
    &.end {
      margin-bottom: 14px;
    }
  }
}
</style>
