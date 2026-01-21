declare function show(): void;
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    startLatLng: {
        type: StringConstructor;
    };
    sectionId: {
        type: StringConstructor;
    };
    modelValue: {
        type: import('vue').PropType<boolean>;
    };
}>, {
    show: typeof show;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    UAVGoInject: (...args: any[]) => void;
    "update:modelValue": (value: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
