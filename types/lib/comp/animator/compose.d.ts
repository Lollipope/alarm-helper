import { Ref } from 'vue';
import { AnimatorProps } from './Animator';
export type MoveCallback = (e: PointerEvent, dx: number, dy: number, absDx: number, absDy: number, initX: number, initY: number) => void;
export type StartCallback = (e: PointerEvent) => void;
export type EndCallback = (e: PointerEvent) => void;
export declare function createDrag(target: Ref<HTMLElement | null>, callbacks: {
    onStart?: StartCallback;
    onMove?: MoveCallback;
    onEnd?: EndCallback;
}): {
    dragging: Ref<boolean, boolean>;
    dragMoved: Ref<boolean, boolean>;
    onPointerDown: (e: PointerEvent) => void;
    destroy: () => void;
    _setInit: (ix: number, iy: number) => void;
};
export declare const animateDuration = 10000;
export declare function useMsgNew(props: AnimatorProps, isNew: Ref<boolean>): {
    clearNew: () => void;
};
export declare function useMsgIpmt(isIpmt: Ref<boolean>, isImportant: ComputedRef<boolean>): {
    clearIpmt: () => void;
};
export declare function useMsg(props: AnimatorProps): {
    isNew: Ref<boolean, boolean>;
    clearNew: () => void;
    isIpmt: Ref<boolean, boolean>;
    clearIpmt: () => void;
};
export declare function useMessageThreshold(): {
    threshold: Ref<number, number>;
};
export declare function useForceMessage(props: AnimatorProps): {
    isForce: Ref<boolean, boolean>;
};
