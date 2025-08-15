import { ModelRef, Ref, ShallowRef } from 'vue';
/**
 * 弹窗状态 hook
 * @param visible 弹窗可见度
 * @returns
 */
export declare function useAlarmDialogDragState(visible: ModelRef<boolean>): {
    position: Ref<{
        top: number;
        left: number;
    }, {
        top: number;
        left: number;
    } | {
        top: number;
        left: number;
    }>;
    customModal: ShallowRef<HTMLElement>;
    startDrag: (e: MouseEvent) => void;
    scaleVal: Ref<number, number>;
    closeModal: () => void;
};
/**
 * 接口异常回调hook
 * @param {Fucntion} fn 接口异常回调函数
 */
export declare function useApiError(fn: (t: unknown) => void): void;
/**
 * 更新标记
 * @returns
 */
export declare function useRefresh(): {
    isNew: Ref<boolean, boolean>;
    updateNew: () => void;
};
