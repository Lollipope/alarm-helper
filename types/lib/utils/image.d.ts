import { MenuItem } from './types';
/**
 * 获取报警类型图片地址
 * @param name 报警类型名称
 * @returns
 */
export declare function getAlarmTypeImgUrl(name: string): string;
export declare function getAlarmSmallTypeImgUrl(name: string): string;
export declare const AlarmTypeIds: {
    ALL: string;
    SDJC: number;
    SFZJC: number;
    FLJC: number;
    JTQXJC: number;
    JSGJ: number;
    JTZTJC: number;
    SBKZ: number;
    SJTB: number;
    XTXX: number;
    SPXX: number;
    QBBAQFH: number;
    ZDGKTJ: number;
    ZNTJ: number;
    XZQQ: number;
    ZDCLJC: number;
    JTSJJC: number;
    JJJY: number;
    SBYC: number;
    DLJK: number;
    WRJGJ: number;
    DHGJ: number;
    DLWD: number;
    ZXCZ: number;
    JGWGJ: number;
    KLJC: number;
    HJSSJC: number;
    HJJC: number;
};
export declare const AlarmTypeList: Array<MenuItem>;
export declare const imgUrlDefault: string;
export declare const imgUrlDefaultS: string;
