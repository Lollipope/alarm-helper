import { UserConfig } from './types';
export declare const ViewTagType: {
    LIVE: number;
    PIC: number;
    RECORD: number;
    FALLBACK: number;
    AUDIO: number;
};
export declare const defaultPerm: UserConfig;
/**
 * 同步用户配置
 * @param alarmId 告警小类
 * @returns
 */
export declare function syncUserPermConfig(alarmId: string | number): Promise<{
    system: {
        perm: boolean;
        url: string;
        btn: boolean;
        paramList: any[];
    };
    live: {
        perm: any;
    };
    pic: {
        perm: any;
    };
    record: {
        perm: any;
    };
    fallback: {
        perm: any;
    };
    audio: {
        perm: any;
    };
}>;
export declare function getGoSysParams(params: any[], infoObj: any, msgId: string): string;
