import type { Plugin } from 'vue'
import AlarmHelper from './views/index'
import AlarmHelperClose from './comp/alarm-close'
import AlarmHelperMenuItem from './comp/alarm-menu-item'
import AlarmHelperAudioBox from './comp/audio-box'
import AlarmHelperFallbackBox from './comp/fallback-box'
import AlarmHelperImageBox from './comp/image-box'
import AlarmHelperLiveBox from './comp/live-box'
import AlarmHelperRecordBox from './comp/record-box'
import AlarmHelperSwiperBox from './comp/swiper-box'
import AlarmHelperConfirm from './comp/alarm-confirm'
import AlarmHelperWS from './comp/alarm-ws'
import AlarmHelperFlvBox from './comp/flv-box'
import AlarmHelperStreamBox from './comp/stream-box'
import AlarmHelperMsgDialog from './comp/msg-dialog'
export default [
  AlarmHelper,
  AlarmHelperClose,
  AlarmHelperConfirm,
  AlarmHelperMenuItem,
  AlarmHelperWS,
  AlarmHelperAudioBox,
  AlarmHelperFallbackBox,
  AlarmHelperImageBox,
  AlarmHelperLiveBox,
  AlarmHelperRecordBox,
  AlarmHelperSwiperBox,
  AlarmHelperSwiperBox,
  AlarmHelperFlvBox,
  AlarmHelperStreamBox,
  AlarmHelperMsgDialog,
] as Plugin[]

// 建议组件统一以 AlarmHelperXXX命名
