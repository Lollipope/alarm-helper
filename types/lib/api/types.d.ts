export interface AlarmHistoryParams {
    alarmKindId?: string | number;
    alarmId?: string | number;
    alarmLevel?: string | number;
    handleStatus?: string | number;
    alarmMajor?: string | number;
    startTime?: string;
    endTime?: string;
    keyWord?: string;
    roleId?: string;
    userId?: string;
    size?: number;
    page?: number;
}
export interface DictItem {
    kindName: string;
    kindId: string;
}
export type DictOptions = Array<DictItem>;
export interface ResponseResult<T> {
    code: number;
    data: T;
    msg?: string;
}
export interface ResponseResultBaidu<T> {
    status: number;
    result: T;
    message?: string;
}
export interface AlarmMsg {
    msgId: string;
    msg: string;
    msgVoice: string;
    createTime: string;
    updateTime: string;
    handleStatus: number;
    handleDetail?: string;
    handleTime?: string;
    handler?: string;
    sourceId: string;
    alarmId: number;
    businessId: string;
    alarmMajor: number;
    alarmLevel: number;
    isUp: number;
    infoShow?: string;
    alarmTime: string;
    readTime?: string;
    alarmSource?: string;
    remark?: string;
    alarmKindId: string;
    alarmKindName: string;
    isRead?: boolean | number | string;
    info: string;
    infoObj: unknown;
    alarmName: string;
    useVoice?: string | number;
    isSupportReport: number;
    intervalType?: string;
    managementSectionId?: string;
    managementSectionName?: string;
    readStatus?: string;
    handleUrl?: string;
    $type: string;
    isNew: boolean;
    alarmTitle: string;
    alarmDesc: string;
    iconUrl: string;
}
export interface PageList<T> {
    result: Array<T>;
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    thisPageNumber: number;
    lastPageNumber: number;
    thisPageFirstElementNumber: number;
    firstResult: number;
    firstPage: boolean;
    lastPage: boolean;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    thisPageLastElementNumber: number;
    nextPageNumber: number;
    previousPageNumber: number;
    linkPageNumbers: number[];
}
export interface AlarmSmallType {
    address: string | null;
    alarmFreq: number;
    alarmId: number;
    alarmKindId: number;
    alarmKindName: string | null;
    alarmLevel: string;
    alarmMajor: number;
    alarmMajorName: string | null;
    alarmName: string;
    attachId: string | null;
    enable: number;
    enableName: string | null;
    isSendVideo: number;
    isSendVoice: number;
    isSupportReport: number;
    msgName: string;
    systemId: string | null;
    textTemplate: string;
    triggerConditions: string;
    voiceTemplate: string;
}
export interface AlarmBigType {
    alarmKindId: number;
    alarmKindName: string;
    attachId: string | null;
    sort: number;
    isRead: number | null;
    isShow: number;
}
export interface AlarmConfigMsgUser {
    id: number;
    alarmId: number;
    userId: string;
    useVoice: number;
    voiceType: number;
    isReceive: number;
    popLevel: string;
    upLevel: string;
    readLevel: string;
    alarmName: string | null;
    alarmKindName: string | null;
    voiceTemplate: string | null;
    alarmLevel: string | null;
}
export interface SysParam {
    defaultValue?: string | undefined;
    paramCode: string;
    paramFieldName: string;
}
export interface AlarmConfView {
    alarmId: number;
    id: number;
    viewTag: number;
}
export interface AlarmUserConf {
    isShowSilenceConfig: number;
    handleUrl: string | null;
    isSupportReport: number;
    alarmConfigMsgUser: AlarmConfigMsgUser;
    alarmConfigViewList: AlarmConfView[];
    paramList: SysParam[];
}
export interface UnreadBean {
    isMajor: boolean;
    isLevelTop: boolean;
    num: number | null;
}
export type SortAlarmBigType = Omit<AlarmBigType, 'attachId' | 'isRead'>;
export interface AlarmApiError {
    status: number;
    data: ResponseResult<unknown>;
}
export interface SectionItem {
    id: string;
    managementSectionName: string;
}
export interface StreamPlayApiParams {
    deviceId: string;
    needCompress: number;
    pid?: string;
    rate?: 'master' | 'slaver';
    domain?: 'private' | 'pulbic';
}
export interface StreamStopApiParams {
    deviceId?: string;
    videoUrl?: string;
}
export interface ConfigMsgKindListApiParams {
    startTime: string;
    endTime: string;
    handleStatus: string;
}
export interface sendParams {
    receiveName: string;
    receivePhone: string;
    content: string;
    linkInfo: string;
    linkSys: string;
}
export interface HistoryPageParams {
    page: number;
    size: number;
    msgId: string;
}
export interface MileToLatlngApiResTypes {
    [key: string]: any;
}
export interface BaseSilent {
    /**
     * 配置的静默时间（单位：分钟）
     */
    silenceDuration?: number;
    /**
     * 当前静默状态：0-静默中，1-已结束
     */
    silentStatus?: number;
}
/**
 * AlarmSilence
 */
export interface AlarmSilence extends BaseSilent {
    /**
     * 摄像枪ID
     */
    cameraId?: string;
    /**
     * 摄像枪桩号
     */
    cameraMilePost?: string;
    /**
     * 摄像枪名称
     */
    cameraName?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 提前结束操作人ID（手动结束时填充）
     */
    endOperatorId?: string;
    /**
     * 提前结束操作人名称
     */
    endOperatorName?: string;
    /**
     * 告警消息ID（主键，关联告警消息表）
     */
    msgId?: string;
    /**
     * 静默操作人ID（关联门户用户表）
     */
    operatorId?: string;
    /**
     * 静默操作人名称
     */
    operatorName?: string;
    /**
     * 静默操作时间
     */
    operatorTime?: string;
    /**
     * 关联告警消息内容
     */
    relatedMsgContent?: string;
    /**
     * 所属路段
     */
    roadNo?: string;
    /**
     * 静默告警类型
     */
    silenceAlarmId?: string;
    /**
     * 静默预计结束时间（start + duration）
     */
    silentEndTime?: string;
    /**
     * 静默开始时间
     */
    silentStartTime?: string;
    [property: string]: any;
}
