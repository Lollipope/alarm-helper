import { AlarmMsg } from '../../../../api';
declare function initMsgList({ page, size, msgId }: {
    page?: number | undefined;
    size?: any;
    msgId?: undefined;
}): Promise<void>;
declare function insertMsgList(row: AlarmMsg): void;
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    alarmTypeIdSelect: {
        type: StringConstructor;
        default: string;
    };
    alarmSelect: {
        type: import('vue').PropType<any>;
    };
}>, {
    initMsgList: typeof initMsgList;
    insertMsgList: typeof insertMsgList;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:alarmSelect": (...args: any[]) => void;
    changeAlarmKindId: (...args: any[]) => void;
    refreshMenu: (...args: any[]) => void;
    changeList: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    alarmTypeIdSelect: {
        type: StringConstructor;
        default: string;
    };
    alarmSelect: {
        type: import('vue').PropType<any>;
    };
}>> & Readonly<{
    "onUpdate:alarmSelect"?: ((...args: any[]) => any) | undefined;
    onChangeAlarmKindId?: ((...args: any[]) => any) | undefined;
    onRefreshMenu?: ((...args: any[]) => any) | undefined;
    onChangeList?: ((...args: any[]) => any) | undefined;
}>, {
    alarmTypeIdSelect: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    alarmMsgListRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        selectAlarmId: {
            type: StringConstructor;
            default: string;
        };
        list: {
            type: {
                (arrayLength: number): AlarmMsg[];
                (...items: AlarmMsg[]): AlarmMsg[];
                new (arrayLength: number): AlarmMsg[];
                new (...items: AlarmMsg[]): AlarmMsg[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        loadMore: {
            type: FunctionConstructor;
            default: () => never[];
        };
        scrollStatus: {
            type: import('vue').PropType<{
                isLoading: boolean;
                isEnd: boolean;
            }>;
            required: true;
        };
    }>> & Readonly<{
        onSelectAlarm?: ((...args: any[]) => any) | undefined;
        "onUpdate:scroll-status"?: ((...args: any[]) => any) | undefined;
        "onUpdate:scrollStatus"?: ((value: {
            isLoading: boolean;
            isEnd: boolean;
        }) => any) | undefined;
    }>, {
        setScrollTop: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        selectAlarm: (...args: any[]) => void;
        "update:scroll-status": (...args: any[]) => void;
        "update:scrollStatus": (value: {
            isLoading: boolean;
            isEnd: boolean;
        }) => void;
    }, import('vue').PublicProps, {
        selectAlarmId: string;
        list: AlarmMsg[];
        loadMore: Function;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        scrollContentRef: HTMLDivElement;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        selectAlarmId: {
            type: StringConstructor;
            default: string;
        };
        list: {
            type: {
                (arrayLength: number): AlarmMsg[];
                (...items: AlarmMsg[]): AlarmMsg[];
                new (arrayLength: number): AlarmMsg[];
                new (...items: AlarmMsg[]): AlarmMsg[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        loadMore: {
            type: FunctionConstructor;
            default: () => never[];
        };
        scrollStatus: {
            type: import('vue').PropType<{
                isLoading: boolean;
                isEnd: boolean;
            }>;
            required: true;
        };
    }>> & Readonly<{
        onSelectAlarm?: ((...args: any[]) => any) | undefined;
        "onUpdate:scroll-status"?: ((...args: any[]) => any) | undefined;
        "onUpdate:scrollStatus"?: ((value: {
            isLoading: boolean;
            isEnd: boolean;
        }) => any) | undefined;
    }>, {
        setScrollTop: () => void;
    }, {}, {}, {}, {
        selectAlarmId: string;
        list: AlarmMsg[];
        loadMore: Function;
    }> | null;
}, HTMLDivElement>;
export default _default;
