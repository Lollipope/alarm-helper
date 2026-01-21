<template>
  <div class="animator" :class="{ isHide: props.isHide }">
    <div
      v-if="isQuickShow"
      class="robot-quick"
      ref="root"
      :class="{ dragging: dragging, sticky: isSticky }"
      :style="x > 0 ? rootStyle : {}"
      @click="onRootClick"
      @pointerdown.prevent="onPointerDown"
    >
      <div class="num" v-if="isShowCount">{{ formatNumber(unReadModel.num) }}</div>
      <div class="icon"></div>
    </div>
    <div
      class="robot-full"
      v-else
      ref="full"
      @click="emit('click')"
      @pointerdown.prevent="onPointerDownFull"
      :class="{
        isNew,
        isIpmt,
        isForce,
      }"
    >
      <div class="num" v-if="isShowCount && !isNew && !isIpmt && !isForce">
        {{ formatNumber(unReadModel.num) }}
      </div>
      <template v-if="isForce">
        <div class="msg-new">告警消息过多，请快点处理！</div>
      </template>
      <template v-else>
        <div class="msg-new" v-if="!isIpmt && isNew">普通告警消息，请注意处理！</div>
        <div class="msg-impt" v-if="isIpmt">
          {{ unReadModel.isMajor ? '重要' : '一级' }}告警消息，请及时处理！
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { type UnreadBean } from '@ah/api'
import type { AnimatorProps } from './Animator'
import { createDrag, useMsg, useForceMessage } from './compose'
//
const props = withDefaults(defineProps<AnimatorProps>(), {
  isHide: false,
})
const unReadModel = defineModel<UnreadBean>('unRead', {
  default: {
    isMajor: false,
    isLevelTop: false,
    num: -1,
  },
})

const emit = defineEmits(['click', 'dragend'])

const root = ref<HTMLElement | null>(null)
const full = ref<HTMLElement | null>(null)
const isSticky = ref(false)
const x = ref(0)
const y = ref(0)
let initX = 0
let initY = 0
let elW = 56
let elH = 56

const isQuickShow = ref(true)

const rootStyle = computed(() => ({
  left: `${x.value}px`,
  top: `${y.value}px`,
  right: 'auto',
  bottom: 'auto',
  cursor: dragging.value ? 'grabbing' : 'grab',
}))

const isShowCount = computed(() => Number(unReadModel.value.num) > 0)

const { isNew, isIpmt } = useMsg(unReadModel)
const { isForce } = useForceMessage(unReadModel)
//
let needResume = false
let aniToutNew: 0 | NodeJS.Timeout
let aniToutImpt: 0 | NodeJS.Timeout
let aniToutForce: 0 | NodeJS.Timeout
watch(
  () => isNew.value || isIpmt.value || isForce.value,
  (val) => {
    if (val) {
      const isTypeNew = isNew.value
      const isTypeImpt = isIpmt.value
      const isTypeForce = isForce.value

      // 新消息
      if (isTypeNew) {
        clearFullAnimate()
        aniToutNew = animateFull(() => {
          isNew.value = false
        })
      }
      // 重要消息
      if (isTypeImpt) {
        clearFullAnimate()
        aniToutImpt = animateFull(() => {
          isIpmt.value = false
          // unReadModel.value.isLevelTop = false
          // unReadModel.value.isMajor = false
        })
      }
      // 定时轮巡消息
      if (isTypeForce) {
        clearFullAnimate()
        aniToutForce = animateFull(() => {
          isForce.value = false
          // unReadModel.value.isLevelTop = false
          // unReadModel.value.isMajor = false
        })
      }
    } else {
      clearFullAnimate()
    }
  },
  {
    immediate: true,
    flush: 'post',
  },
)
watch(
  () => isQuickShow.value,
  (val) => {
    if (val) {
      clearFullAnimate()
      isNew.value = false
      isIpmt.value = false
      isForce.value = false
    }
  },
)

function clearFullAnimate() {
  aniToutNew && clearTimeout(aniToutNew)
  aniToutImpt && clearTimeout(aniToutImpt)
  aniToutForce && clearTimeout(aniToutForce)
}

function animateFull(fn: () => void) {
  if (!isQuickShow.value) {
    return 0
  }
  // 有新消息或者 重要告警消息, 弹出机器人画面,稍后隐藏
  needResume = true
  isQuickShow.value = false
  // 3秒后消失
  return setTimeout(() => {
    if (needResume) {
      isQuickShow.value = true
      needResume = false
      fn()
    }
  }, 10000)
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v))
}

function updateElementSize() {
  if (!root.value) return
  const r = root.value.getBoundingClientRect()
  elW = Math.max(1, r.width)
  elH = Math.max(1, r.height)
  console.log('updateElementSize: ', elW, elH)
  // initial stick to right bottom as original layout
}
function updatePos() {
  x.value = window.innerWidth - elW
  y.value = window.innerHeight - elH - 51
}
function onResize() {
  updateElementSize()
  updatePos()
}

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

// root (quick) drag
const {
  dragging,
  dragMoved,
  onPointerDown,
  // allow accessors for start/init values if needed by caller
} = createDrag(root, {
  onStart() {
    updateElementSize()
    // set initial pointers and positions
    initX = x.value
    initY = y.value
  },
  onMove(_e, dx, dy, absDx, absDy) {
    // emit horizontal behavior when user moves horizontally > 30 and vertical smaller
    if (absDx > 30 && absDy < absDx) {
      // collapse to full view
      isQuickShow.value = false
    }
    const maxX = window.innerWidth - elW
    const maxY = window.innerHeight - elH
    // limit horizontal left movement to at most 50px from initial position
    const minAllowedX = Math.max(0, initX - 50)
    x.value = clamp(initX + dx, minAllowedX, maxX)
    y.value = clamp(initY + dy, 0, maxY)
  },
  onEnd() {
    // emit the coordinates where user dropped
    emit('dragend', { x: x.value, y: y.value })
    // stick to right edge (animate)
    updateElementSize()
    const maxX = window.innerWidth - elW
    isSticky.value = true
    x.value = maxX
    y.value = clamp(y.value, 0, window.innerHeight - elH)
    setTimeout(() => {
      isSticky.value = false
    }, 300)
  },
})

// full (large) drag — only detect right-swipe
const { onPointerDown: onPointerDownFull } = createDrag(full, {
  onStart() {
    // nothing special
  },
  onMove(_e, dx, dy, absDx, absDy) {
    if (dx > 30 && absDy < absDx) {
      // emit once via event

      // show quick after swipe
      isQuickShow.value = true
    }
  },
  onEnd() {
    // nothing special
  },
})

function onRootClick(e: MouseEvent) {
  if (dragMoved.value) {
    e.stopPropagation()
    e.preventDefault()
    return
  }
  emit('click')
}

function formatNumber(num: number | null) {
  const n = num ?? 0
  // 判断数字是否大于等于100
  if (n >= 100) {
    return '99+'
  }
  return n
}
</script>

<style scoped lang="scss">
.animator {
  &.isHide {
    display: none;
  }
  .robot-full {
    cursor: pointer;
    position: fixed;
    right: 15px;
    bottom: 2px;
    width: calc(170px * 0.75);
    height: 150px;
    background: url(../../assets/images/alarm-robot30.png) 0 0 / 100% 100% no-repeat;
    z-index: 2000;
    &.isNew {
      background: url(../../assets/images/alarm-robot3.png) 0 0 / 100% 100% no-repeat;
    }
    &.isIpmt {
      background: url(../../assets/images/alarm-robot4.png) 0 0 / 100% 100% no-repeat !important;
    }
    &.isForce {
      background: url(../../assets/images/alarm-robot3.png) 0 0 / 100% 100% no-repeat !important;
    }
    .num {
      position: absolute;
      left: -11px;
      top: 38px;
      background: linear-gradient(to bottom, #fa9868, #fe4141);
      border: 2px solid #ffffff;
      border-radius: 19px;
      padding: 1px 6px;
      font-weight: bold;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      z-index: 2001;
    }
    @mixin msgCommonStyle {
      white-space: nowrap;
      width: fit-content;
      font-size: 14px;
      color: white;
      font-weight: 600;
      padding: 0 20px;
      height: 36px;
      line-height: 36px;
      border-radius: 8px 14px 0 8px;
      position: absolute;
      right: 116px;
      top: 33px;
    }
    .msg-new {
      @include msgCommonStyle;
      background: linear-gradient(to right, #68c0fa, #4255fe);
    }
    .msg-impt {
      @include msgCommonStyle;
      background: linear-gradient(to right, #fa9868, #f55454);
    }
  }
  .robot-quick {
    cursor: grab;
    position: fixed;
    right: 0;
    bottom: 26px;
    width: 56px;
    height: 56px;
    border-radius: 50% 50% 2px 50%;
    background: linear-gradient(to right, #23eaff, #5988ff);
    transition:
      left 0.22s ease,
      top 0.22s ease;
    &.dragging {
      transition: none;
      cursor: grabbing;
    }
    &.sticky {
      transition: left 0.22s ease;
    }
    .num {
      position: absolute;
      right: 43px;
      top: 0;
      background: linear-gradient(to bottom, #fa9868, #fe4141);
      border: 2px solid #ffffff;
      border-radius: 19px;
      padding: 1px 6px;
      font-weight: bold;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      z-index: 2001;
    }
    .icon {
      position: absolute;
      top: calc(50% - 28px);
      left: calc(50% - 25px);
      width: 50px;
      height: 50px;
      background: url(../../assets/images/alarm-robot5.png) 0 0 / 100% 100% no-repeat;
      z-index: 2000;
    }
  }
}
</style>
