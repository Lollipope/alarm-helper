import { UnreadBean } from '../../api';
import { AnimatorProps } from './Animator';
type __VLS_Props = AnimatorProps;
type __VLS_PublicProps = {
    'unRead'?: UnreadBean;
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    dragend: (...args: any[]) => void;
    "update:unRead": (value: UnreadBean) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
    "onUpdate:unRead"?: ((value: UnreadBean) => any) | undefined;
}>, {
    isHide: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    root: HTMLDivElement;
    full: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
