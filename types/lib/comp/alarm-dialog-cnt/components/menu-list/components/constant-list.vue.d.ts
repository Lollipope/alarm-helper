import { MenuItem } from '../../../../../utils';
declare const idSelect: import('vue').ModelRef<string, string, string, string>;
declare const itemList: import('vue').ModelRef<MenuItem[] | undefined, string, MenuItem[] | undefined, MenuItem[] | undefined>;
type __VLS_PublicProps = {
    'idSelect'?: typeof idSelect['value'];
    'itemList'?: typeof itemList['value'];
};
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:id-select": (...args: any[]) => void;
    "update:item-list": (...args: any[]) => void;
    "update:idSelect": (value: string) => void;
    "update:itemList": (value: MenuItem[] | undefined) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:idSelect"?: ((value: string) => any) | undefined;
    "onUpdate:id-select"?: ((...args: any[]) => any) | undefined;
    "onUpdate:item-list"?: ((...args: any[]) => any) | undefined;
    "onUpdate:itemList"?: ((value: MenuItem[] | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
