import { AlarmMsg } from '../../../../api';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: PropType<AlarmMsg>;
        default: () => {};
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onRead: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: PropType<AlarmMsg>;
        default: () => {};
    };
}>> & Readonly<{
    onOnRead?: ((...args: any[]) => any) | undefined;
}>, {
    alarmSelect: any;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
