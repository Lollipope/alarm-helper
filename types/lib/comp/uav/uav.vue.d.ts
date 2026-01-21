declare function init(): Promise<"" | undefined>;
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {
    init: typeof init;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    alarmSelect: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    DroneModalRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        startLatLng: {
            type: StringConstructor;
        };
        sectionId: {
            type: StringConstructor;
        };
        modelValue: {
            type: import('vue').PropType<boolean>;
        };
    }>> & Readonly<{
        onUAVGoInject?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    }>, {
        show: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        UAVGoInject: (...args: any[]) => void;
        "update:modelValue": (value: boolean) => void;
    }, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        startLatLng: {
            type: StringConstructor;
        };
        sectionId: {
            type: StringConstructor;
        };
        modelValue: {
            type: import('vue').PropType<boolean>;
        };
    }>> & Readonly<{
        onUAVGoInject?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    }>, {
        show: () => void;
    }, {}, {}, {}, {}> | null;
}, HTMLDivElement>;
export default _default;
