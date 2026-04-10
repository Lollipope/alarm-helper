import { BaseSilent } from '../../../../api';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
    mute: {
        type: import('vue').PropType<BaseSilent>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:mute": (value: BaseSilent) => any;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
    mute: {
        type: import('vue').PropType<BaseSilent>;
    };
}>> & Readonly<{
    "onUpdate:mute"?: ((value: BaseSilent) => any) | undefined;
}>, {
    alarmSelect: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
