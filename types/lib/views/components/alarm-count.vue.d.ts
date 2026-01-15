declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    isAlarmDialogVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    unRead: {
        type: ObjectConstructor;
        default: () => {
            isImportant: boolean;
            num: number;
        };
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    isAlarmDialogVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    unRead: {
        type: ObjectConstructor;
        default: () => {
            isImportant: boolean;
            num: number;
        };
    };
}>> & Readonly<{}>, {
    unRead: Record<string, any>;
    isAlarmDialogVisible: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
