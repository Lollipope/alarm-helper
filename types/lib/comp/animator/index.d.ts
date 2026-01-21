export declare const AlarmHelperAnimator: import('../../utils').SFCWithInstall<import('vue').DefineComponent<{
    unRead?: import('../..').UnreadBean;
} & import('./Animator').AnimatorProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    dragend: (...args: any[]) => void;
    "update:unRead": (value: import('../..').UnreadBean) => void;
}, string, import('vue').PublicProps, Readonly<{
    unRead?: import('../..').UnreadBean;
} & import('./Animator').AnimatorProps> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
    "onUpdate:unRead"?: ((value: import('../..').UnreadBean) => any) | undefined;
}>, {
    isHide: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    root: HTMLDivElement;
    full: HTMLDivElement;
}, HTMLDivElement>> & Record<string, any>;
export default AlarmHelperAnimator;
export * from './Animator';
