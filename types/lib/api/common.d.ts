import { DictOptions, ResponseResult, SectionItem } from './types';
export declare function getDictionaryListByKey(key: string): Promise<DictOptions>;
export declare function updateRemark(msgId: string, remark: string): Promise<ResponseResult<null | string>>;
export declare function getSectionList(): Promise<ResponseResult<SectionItem[]>>;
