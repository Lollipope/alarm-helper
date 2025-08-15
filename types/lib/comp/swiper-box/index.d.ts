export declare const AlarmHelperSwiperBox: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('swiper/types').SwiperOptions & {
        list: any[];
    }> & Readonly<{
        onSwiper?: ((value: import('swiper/types').Swiper) => any) | undefined;
        "onSlide-change"?: ((value: import('swiper/types').Swiper) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        swiper: (value: import('swiper/types').Swiper) => any;
        "slide-change": (value: import('swiper/types').Swiper) => any;
    }, import('vue').PublicProps, {
        spaceBetween: number | string;
        slidesPerView: number | "auto";
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('swiper/types').SwiperOptions & {
        list: any[];
    }> & Readonly<{
        onSwiper?: ((value: import('swiper/types').Swiper) => any) | undefined;
        "onSlide-change"?: ((value: import('swiper/types').Swiper) => any) | undefined;
    }>, {}, {}, {}, {}, {
        spaceBetween: number | string;
        slidesPerView: number | "auto";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('swiper/types').SwiperOptions & {
    list: any[];
}> & Readonly<{
    onSwiper?: ((value: import('swiper/types').Swiper) => any) | undefined;
    "onSlide-change"?: ((value: import('swiper/types').Swiper) => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    swiper: (value: import('swiper/types').Swiper) => any;
    "slide-change": (value: import('swiper/types').Swiper) => any;
}, string, {
    spaceBetween: number | string;
    slidesPerView: number | "auto";
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {
            data: {
                item: any;
                idx: number;
            };
        }): any;
    };
})> & Record<string, any>;
export default AlarmHelperSwiperBox;
export * from './SwiperBox';
