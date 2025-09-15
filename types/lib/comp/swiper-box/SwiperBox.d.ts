import { default as SwiperBox } from './SwiperBox.vue';
import { SwiperOptions, Swiper } from 'swiper/types';
export type SwiperBoxProps<T> = SwiperOptions & {
    list: Array<T>;
};
export type SwiperInstance = InstanceType<typeof Swiper>;
export type SwiperBoxEmits = {
    swiper: [value: SwiperInstance];
    'slide-change': [value: SwiperInstance];
};
export type SwiperBoxInstance = InstanceType<typeof SwiperBox>;
