import {
  AlarmHistoryParams,
  ResponseResult,
  AlarmMsg,
  PageList,
  AlarmSmallType,
  AlarmUserConf,
  UnreadBean,
  AlarmBigType,
  SortAlarmBigType,
  AlarmConfigMsgUser,
  StreamPlayApiParams,
  StreamStopApiParams,
  ConfigMsgKindListApiParams,
} from './types'
export declare function getAlarmMsgPage(
  params: AlarmHistoryParams,
): Promise<ResponseResult<PageList<AlarmMsg>>>
export declare function getAlarmConfigListByKindId(
  alarmKindId: number | string,
): Promise<ResponseResult<Array<AlarmSmallType>>>
export declare function getAlarmConfigListByKindIdWithEnable(
  alarmKindId: number | string,
): Promise<ResponseResult<Array<AlarmSmallType>>>
export declare function getUserConfigByAlarmId(
  alarmId: number | string,
): Promise<ResponseResult<AlarmUserConf>>
export declare function doHandle(params: {
  msgId: string
  status: '1' | '2'
}): Promise<ResponseResult<null | string>>
export declare function readAllMsg({
  alarmKindId,
}: {
  alarmKindId?: string | number
}): Promise<ResponseResult<null | string>>
export declare function readMsgById(msgId: string): Promise<ResponseResult<null | string>>
export declare function getUnReadAlarmMsgInfo(): Promise<ResponseResult<UnreadBean>>
export declare function getConfigMsgKindList(
  params: ConfigMsgKindListApiParams,
): Promise<ResponseResult<Array<AlarmBigType>>>
export declare function updateAlarmConfigMsgKindSort(
  params: SortAlarmBigType,
): Promise<ResponseResult<null | string>>
export declare function getUserConfigList(): Promise<ResponseResult<Array<AlarmConfigMsgUser>>>
export declare function getStreamUrl(params: StreamPlayApiParams): Promise<any>
export declare function stopDevicePlay(params: StreamStopApiParams): Promise<any>
export declare const alarmTypeButtonConfig: (alarmId: string | number) => Promise<unknown>
