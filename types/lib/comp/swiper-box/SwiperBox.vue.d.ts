import { SwiperBoxProps } from './SwiperBox';
type __VLS_Props = SwiperBoxProps;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {
            data: {
                item: any;
                idx: number;
            };
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    swiper: (value: import('swiper/types').Swiper) => any;
    "slide-change": (value: import('swiper/types').Swiper) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSwiper?: ((value: import('swiper/types').Swiper) => any) | undefined;
    "onSlide-change"?: ((value: import('swiper/types').Swiper) => any) | undefined;
}>, {
    spaceBetween: number | string;
    slidesPerView: number | "auto";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
