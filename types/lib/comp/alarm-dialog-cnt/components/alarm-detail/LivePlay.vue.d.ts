import { PropType } from 'vue';
import { Device } from '../../../../api/types';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
    streamList: {
        type: PropType<Array<Device>>;
        default: () => never[];
    };
    liveType: {
        type: NumberConstructor;
        default: number;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    alarmSelect: {
        type: ObjectConstructor;
        default: () => {};
    };
    streamList: {
        type: PropType<Array<Device>>;
        default: () => never[];
    };
    liveType: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    alarmSelect: Record<string, any>;
    streamList: Device[];
    liveType: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
