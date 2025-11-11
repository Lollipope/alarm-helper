import { DictOptions, ResponseResult, SectionItem, sendParams, HistoryPageParams } from './types';
export declare function getDictionaryListByKey(key: string): Promise<DictOptions>;
export declare function updateRemark(msgId: string, remark: string): Promise<ResponseResult<null | string>>;
export declare function getSectionList(): Promise<ResponseResult<SectionItem[]>>;
export declare function getAllUserInfoList(): Promise<unknown>;
export declare function sendSms(params: sendParams[]): Promise<unknown>;
export declare function getSmsSendHistoryPage(params: HistoryPageParams): Promise<unknown>;
