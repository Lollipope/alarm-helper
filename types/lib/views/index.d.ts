declare const _default: import('..').SFCWithInstall<import('vue').DefineComponent<import('./alarm-helper').AlarmHelperProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onApiError: (value: import('..').AlarmApiError) => any;
}, string, import('vue').PublicProps, Readonly<import('./alarm-helper').AlarmHelperProps> & Readonly<{
    onOnApiError?: ((value: import('..').AlarmApiError) => any) | undefined;
}>, {
    showAlarmRule: boolean;
    isIntegated: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    alarmDialogRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<{
        visible?: boolean;
    }> & Readonly<{
        "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    }>, {
        alarmRobotRef: any;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:visible": (...args: any[]) => void;
    }, import('vue').PublicProps, {}, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        customModal: HTMLDivElement;
        alarmRobotRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {
            alarmTypeIdSelect: any;
            menuListRef: any;
            alarmListRef: any;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
            menuListRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<{
                idSelect?: string | undefined;
            }> & Readonly<{
                "onUpdate:idSelect"?: ((value: string | undefined) => any) | undefined;
                "onUpdate:id-select"?: ((...args: any[]) => any) | undefined;
            }>, {
                initMenu: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                "update:id-select": (...args: any[]) => void;
                "update:idSelect": (value: string | undefined) => void;
            }, import('vue').PublicProps, {}, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
                P: {};
                B: {};
                D: {};
                C: {};
                M: {};
                Defaults: {};
            }, Readonly<{
                idSelect?: string | undefined;
            }> & Readonly<{
                "onUpdate:idSelect"?: ((value: string | undefined) => any) | undefined;
                "onUpdate:id-select"?: ((...args: any[]) => any) | undefined;
            }>, {
                initMenu: () => void;
            }, {}, {}, {}, {}> | null;
            alarmListRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
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
                initMsgList: ({ page, size, msgId }: {
                    page?: number | undefined;
                    size?: any;
                    msgId?: undefined;
                }) => Promise<void>;
                insertMsgList: (row: import('..').AlarmMsg) => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                "update:alarmSelect": (...args: any[]) => void;
                changeAlarmKindId: (...args: any[]) => void;
                refreshMenu: (...args: any[]) => void;
                changeList: (...args: any[]) => void;
            }, import('vue').PublicProps, {
                alarmTypeIdSelect: string;
            }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
                alarmMsgListRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
                    selectAlarmId: {
                        type: StringConstructor;
                        default: string;
                    };
                    list: {
                        type: {
                            (arrayLength: number): import('..').AlarmMsg[];
                            (...items: import('..').AlarmMsg[]): import('..').AlarmMsg[];
                            new (arrayLength: number): import('..').AlarmMsg[];
                            new (...items: import('..').AlarmMsg[]): import('..').AlarmMsg[];
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
                    list: import('..').AlarmMsg[];
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
                            (arrayLength: number): import('..').AlarmMsg[];
                            (...items: import('..').AlarmMsg[]): import('..').AlarmMsg[];
                            new (arrayLength: number): import('..').AlarmMsg[];
                            new (...items: import('..').AlarmMsg[]): import('..').AlarmMsg[];
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
                    list: import('..').AlarmMsg[];
                    loadMore: Function;
                }> | null;
            }, HTMLDivElement, import('vue').ComponentProvideOptions, {
                P: {};
                B: {};
                D: {};
                C: {};
                M: {};
                Defaults: {};
            }, Readonly<import('vue').ExtractPropTypes<{
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
                initMsgList: ({ page, size, msgId }: {
                    page?: number | undefined;
                    size?: any;
                    msgId?: undefined;
                }) => Promise<void>;
                insertMsgList: (row: import('..').AlarmMsg) => void;
            }, {}, {}, {}, {
                alarmTypeIdSelect: string;
            }> | null;
        }, HTMLDivElement, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<{}> & Readonly<{}>, {
            alarmTypeIdSelect: any;
            menuListRef: any;
            alarmListRef: any;
        }, {}, {}, {}, {}> | null;
    }, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<{
        visible?: boolean;
    }> & Readonly<{
        "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    }>, {
        alarmRobotRef: any;
    }, {}, {}, {}, {}> | null;
}, any>> & Record<string, any>;
export default _default;
export * from './alarm-helper';
