import { default as Uav } from './uav.vue';
export interface UavParams {
    dockSn: string;
    longitude: string;
    latitude: string;
    cycleId: string;
}
export type UavInstance = InstanceType<typeof Uav>;
