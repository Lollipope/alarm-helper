import { default as FlvJs } from 'mpegts.js/d.ts/mpegts';
import { default as FlvBox } from './FlvBox.vue';
declare namespace FlvExtend {
    interface Player extends FlvJs.Player {
    }
}
export interface FlvPlayer extends FlvExtend.Player {
}
export interface FlvBoxProps {
    deviceId?: string;
    systemCode?: string | number;
    userName?: string;
    protocol?: string;
    rate?: string;
}
export type FlvBoxEmits = {};
export type FlvBoxInstance = InstanceType<typeof FlvBox>;
export {};
