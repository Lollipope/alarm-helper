import { UnreadBean } from '../../api';
import { default as Animator } from './Animator.vue';
export interface AnimatorProps {
    isHide: boolean;
    unRead: UnreadBean;
}
export type AnimatorEmits = {};
export type AnimatorInstance = InstanceType<typeof Animator>;
