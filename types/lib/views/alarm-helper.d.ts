import { default as AlarmHelper } from './alarm-helper.vue';
import { AlarmApiError } from '../api';
import { UserInfo } from '../comp/alarm-ws/AlarmWS';
export interface AlarmHelperProps {
    userInfo: UserInfo;
    showAlarmRule?: boolean;
    isIntegated?: boolean;
    tokenId: string;
}
export type AlarmHelperEmits = {
    onApiError: [value: AlarmApiError];
};
export type AlarmHelperInstance = InstanceType<typeof AlarmHelper>;
