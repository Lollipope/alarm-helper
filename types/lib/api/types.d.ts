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
export interface AlarmUserConf {
    handleUrl: string | null;
    isSupportReport: number;
    alarmConfigMsgUser: AlarmConfigMsgUser;
    alarmConfigViewList: any[];
    paramList: any[];
}
export interface UnreadBean {
    isImportant: boolean;
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
