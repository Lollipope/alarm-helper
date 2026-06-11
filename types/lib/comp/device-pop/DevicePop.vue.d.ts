import { Device } from '../../api';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    visible: {
        type: import('vue').PropType<boolean>;
    };
    deviceData: {
        type: import('vue').PropType<Device[]>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (...args: any[]) => void;
    "update:visible": (value: boolean) => void;
    "update:deviceData": (value: Device[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    visible: {
        type: import('vue').PropType<boolean>;
    };
    deviceData: {
        type: import('vue').PropType<Device[]>;
    };
}>> & Readonly<{
    onSubmit?: ((...args: any[]) => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    "onUpdate:deviceData"?: ((value: Device[]) => any) | undefined;
}>, {
    title: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    tableRef: unknown;
}, any>;
export default _default;
