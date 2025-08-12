import SwiperBox from './SwiperBox.vue'
import type { SwiperOptions, Swiper } from 'swiper/types'

export type SwiperBoxProps<T = any> = SwiperOptions & {
  list: Array<T>
}

export type SwiperBoxEmits = {
  swiper: [value: Swiper]
  'slide-change': [value: Swiper]
}
export type SwiperBoxInstance = InstanceType<typeof SwiperBox>
