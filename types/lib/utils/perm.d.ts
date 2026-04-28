import { SysParam } from '../api';
import { UserConfig } from './types';
export declare const ViewTagType: {
    LIVE: number;
    PIC: number;
    RECORD: number;
    FALLBACK: number;
    AUDIO: number;
    POSITION: number;
    QBB: number;
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
        paramList: SysParam[];
    };
    live: {
        perm: boolean;
        liveType: number;
    };
    pic: {
        perm: boolean;
    };
    record: {
        perm: boolean;
    };
    fallback: {
        perm: boolean;
    };
    audio: {
        perm: boolean;
    };
    mute: {
        perm: boolean;
    };
    position: {
        perm: boolean;
    };
    qbb: {
        perm: boolean;
    };
}>;
export declare function getGoSysParams(params: SysParam[], infoObj: Record<string, string>, msgId: string): string;
