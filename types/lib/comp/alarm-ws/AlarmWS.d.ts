import { default as AlarmWS } from './AlarmWS.vue';
import { AlarmApiError } from '../../api';
export interface AlarmWSProps {
    userInfo: UserInfo;
    tokenId: string;
}
export interface UserInfo {
    userId: string;
}
export interface AlarmWSMessageConf {
    isPop: boolean;
    isAlarm: boolean;
    voiceType: number;
    isReceive: boolean;
}
export interface AlarmWSData {
    alarmId: string;
    alarmKindId: string;
    alarmName: string;
    msg: string;
    msgVoice: string;
    alarmTitle: string;
    alarmDesc: string;
    isNew: boolean;
    isRead: boolean;
    iconUrl: string;
    alarmMajor: number;
    alarmLevel: number;
}
export interface AlarmWSMessage {
    cnt: AlarmWSData;
    conf: AlarmWSMessageConf;
}
export type AlarmWSEmits = {
    onMessage: [value: AlarmWSMessage];
    onApiError: [value: AlarmApiError];
};
export type AlarmWSInstance = InstanceType<typeof AlarmWS>;
