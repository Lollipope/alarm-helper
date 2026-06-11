export declare const AlarmHelperDevicePop: import('../../utils').SFCWithInstall<import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    visible: {
        type: import('vue').PropType<boolean>;
    };
    deviceData: {
        type: import('vue').PropType<import('../..').Device[]>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (...args: any[]) => void;
    "update:visible": (value: boolean) => void;
    "update:deviceData": (value: import('../..').Device[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    visible: {
        type: import('vue').PropType<boolean>;
    };
    deviceData: {
        type: import('vue').PropType<import('../..').Device[]>;
    };
}>> & Readonly<{
    onSubmit?: ((...args: any[]) => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    "onUpdate:deviceData"?: ((value: import('../..').Device[]) => any) | undefined;
}>, {
    title: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    tableRef: unknown;
}, any>> & Record<string, any>;
export default AlarmHelperDevicePop;
export * from './DevicePop';
