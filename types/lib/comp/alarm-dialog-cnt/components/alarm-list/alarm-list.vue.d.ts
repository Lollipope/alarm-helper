declare function initMsgList({ page, size, msgId }: {
    page?: number | undefined;
    size?: any;
    msgId?: undefined;
}): Promise<void>;
declare function insertMsgList(row: any): void;
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
                (arrayLength: number): import('./alarm-msg-list.vue').AlarmMsg[];
                (...items: import('./alarm-msg-list.vue').AlarmMsg[]): import('./alarm-msg-list.vue').AlarmMsg[];
                new (arrayLength: number): import('./alarm-msg-list.vue').AlarmMsg[];
                new (...items: import('./alarm-msg-list.vue').AlarmMsg[]): import('./alarm-msg-list.vue').AlarmMsg[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
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
        list: import('./alarm-msg-list.vue').AlarmMsg[];
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
                (arrayLength: number): import('./alarm-msg-list.vue').AlarmMsg[];
                (...items: import('./alarm-msg-list.vue').AlarmMsg[]): import('./alarm-msg-list.vue').AlarmMsg[];
                new (arrayLength: number): import('./alarm-msg-list.vue').AlarmMsg[];
                new (...items: import('./alarm-msg-list.vue').AlarmMsg[]): import('./alarm-msg-list.vue').AlarmMsg[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
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
        list: import('./alarm-msg-list.vue').AlarmMsg[];
        loadMore: Function;
    }> | null;
}, HTMLDivElement>;
export default _default;
