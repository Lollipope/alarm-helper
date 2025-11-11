export declare const AlarmHelperLinkedControl: import('../../utils').SFCWithInstall<import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => void;
    };
    visible: {
        type: import('vue').PropType<boolean>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:visible": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => void;
    };
    visible: {
        type: import('vue').PropType<boolean>;
    };
}>> & Readonly<{
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
}>, {
    alarmSelect: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>> & Record<string, any>;
export default AlarmHelperLinkedControl;
export * from './LinkedControl.vue';
