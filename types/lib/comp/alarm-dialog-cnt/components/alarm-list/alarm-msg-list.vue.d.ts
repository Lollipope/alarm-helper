import { AlarmMsg } from '../../../../api';
declare function setScrollTop(): void;
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
}>, {
    setScrollTop: typeof setScrollTop;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    selectAlarm: (...args: any[]) => void;
    "update:scroll-status": (...args: any[]) => void;
    "update:scrollStatus": (value: {
        isLoading: boolean;
        isEnd: boolean;
    }) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
    selectAlarmId: string;
    list: AlarmMsg[];
    loadMore: Function;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    scrollContentRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
