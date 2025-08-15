import { AlarmHistoryParams, ResponseResult, PageList, AlarmSmallType, AlarmUserConf, UnreadBean, AlarmBigType, SortAlarmBigType, AlarmConfigMsgUser } from './types';
export declare function getAlarmMsgPage(params: AlarmHistoryParams): Promise<ResponseResult<PageList<any>>>;
export declare function getAlarmConfigListByKindId(alarmKindId: number | string): Promise<ResponseResult<Array<AlarmSmallType>>>;
export declare function getUserConfigByAlarmId(alarmId: number | string): Promise<ResponseResult<AlarmUserConf>>;
export declare function doHandle(params: any): Promise<ResponseResult<null | string>>;
export declare function readAllMsg({ alarmKindId, }: {
    alarmKindId?: string | number;
}): Promise<ResponseResult<null | string>>;
export declare function readMsgById(msgId: string): Promise<ResponseResult<null | string>>;
export declare function getUnReadAlarmMsgInfo(): Promise<ResponseResult<UnreadBean>>;
export declare function getConfigMsgKindList(params: any): Promise<ResponseResult<Array<AlarmBigType>>>;
export declare function updateAlarmConfigMsgKindSort(params: SortAlarmBigType): Promise<ResponseResult<null | string>>;
export declare function getUserConfigList(): Promise<ResponseResult<Array<AlarmConfigMsgUser>>>;
export declare function getStreamUrl(params: any): Promise<any>;
export declare function stopDevicePlay(params: any): Promise<any>;
