import { MenuItem } from '../../../../../utils';
declare const _default: import('vue').DefineComponent<{
    isOpen?: boolean | undefined;
    idSelect?: string;
    cList?: MenuItem[] | undefined;
    eList?: MenuItem[] | undefined;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:is-open": (...args: any[]) => void;
    "update:id-select": (...args: any[]) => void;
    "update:c-list": (...args: any[]) => void;
    "update:e-list": (...args: any[]) => void;
    onSort: (...args: any[]) => void;
    "update:isOpen": (value: boolean | undefined) => void;
    "update:idSelect": (value: string) => void;
    "update:cList": (value: MenuItem[] | undefined) => void;
    "update:eList": (value: MenuItem[] | undefined) => void;
}, string, import('vue').PublicProps, Readonly<{
    isOpen?: boolean | undefined;
    idSelect?: string;
    cList?: MenuItem[] | undefined;
    eList?: MenuItem[] | undefined;
}> & Readonly<{
    "onUpdate:is-open"?: ((...args: any[]) => any) | undefined;
    "onUpdate:isOpen"?: ((value: boolean | undefined) => any) | undefined;
    "onUpdate:idSelect"?: ((value: string) => any) | undefined;
    "onUpdate:cList"?: ((value: MenuItem[] | undefined) => any) | undefined;
    "onUpdate:eList"?: ((value: MenuItem[] | undefined) => any) | undefined;
    "onUpdate:id-select"?: ((...args: any[]) => any) | undefined;
    "onUpdate:c-list"?: ((...args: any[]) => any) | undefined;
    "onUpdate:e-list"?: ((...args: any[]) => any) | undefined;
    onOnSort?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    target: HTMLDivElement;
    lRef: HTMLDivElement;
    rRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
