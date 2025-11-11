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
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
