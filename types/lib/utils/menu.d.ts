export interface ObjectWithId {
    id: string | number;
}
/**
 * 根据传入的 ID 数组对原始数组进行排序
 * @param {Array} array - 需要排序的数组，每个元素包含唯一的 id 属性
 * @param {Array} idArray - 按照此顺序进行排序的 ID 数组
 * @returns {Array} 排序后的数组
 */
export declare function sortArrayByIds<T extends ObjectWithId>(array: Array<T>, idArray: Array<string | number>): any;
export declare function mergeWithImage(arr1: ObjectWithId[], arr2: ObjectWithId[]): any[];
