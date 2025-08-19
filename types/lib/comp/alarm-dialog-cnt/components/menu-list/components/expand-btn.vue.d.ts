declare const isOpen: import('vue').ModelRef<boolean | undefined, string, boolean | undefined, boolean | undefined>;
type __VLS_PublicProps = {
    'isOpen'?: typeof isOpen['value'];
};
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:is-open": (...args: any[]) => void;
    "update:isOpen": (value: boolean | undefined) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:is-open"?: ((...args: any[]) => any) | undefined;
    "onUpdate:isOpen"?: ((value: boolean | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
