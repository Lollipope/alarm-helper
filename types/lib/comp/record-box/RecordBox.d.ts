import { default as RecordBox } from './RecordBox.vue';
export interface RecordVideo {
    url: string;
    canplay: boolean;
}
export interface RecordBoxProps {
    v: RecordVideo;
}
export type RecordBoxEmits = {};
export type RecordBoxInstance = InstanceType<typeof RecordBox>;
