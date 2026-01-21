declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
    systemConf: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    sendMsg: (...args: any[]) => void;
    linkedControlFn: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
    systemConf: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    onSendMsg?: ((...args: any[]) => any) | undefined;
    onLinkedControlFn?: ((...args: any[]) => any) | undefined;
}>, {
    alarmSelect: Record<string, any>;
    systemConf: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    uavRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        alarmSelect: {
            type: ObjectConstructor;
            default: () => {};
        };
    }>> & Readonly<{}>, {
        init: () => Promise<"" | undefined>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
        alarmSelect: Record<string, any>;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
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
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        alarmSelect: {
            type: ObjectConstructor;
            default: () => {};
        };
    }>> & Readonly<{}>, {
        init: () => Promise<"" | undefined>;
    }, {}, {}, {}, {
        alarmSelect: Record<string, any>;
    }> | null;
}, any>;
export default _default;
