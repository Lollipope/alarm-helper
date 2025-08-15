import { ManipulateType } from 'dayjs';
/**
 * 往前获取间隔时间
 * @param val 获取间隔值
 * @param format 格式化文本
 * @param type 间隔类型
 * @returns Object { startTime,endTime}
 */
export declare function getLatestInterval(val?: number, type?: ManipulateType, format?: string): {
    startTime: string;
    endTime: string;
};
export declare function uuid(): string;
export declare function formatTime(seconds: number): string;
