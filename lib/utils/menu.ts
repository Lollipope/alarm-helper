import type { MenuItem } from '@ah/utils'
export interface ObjectWithId {
  id: string | number
}
/**
 * 根据传入的 ID 数组对原始数组进行排序
 * @param {Array} array - 需要排序的数组，每个元素包含唯一的 id 属性
 * @param {Array} idArray - 按照此顺序进行排序的 ID 数组
 * @returns {Array} 排序后的数组
 */
export function sortArrayByIds<T extends ObjectWithId>(
  array: Array<T>,
  idArray: Array<string | number>,
) {
  // return array.sort((a, b) => {
  //   const indexA = idArray.indexOf(a.id); // 获取 a.id 在 idArray 中的索引
  //   const indexB = idArray.indexOf(b.id); // 获取 b.id 在 idArray 中的索引
  //   return indexA - indexB; // 根据索引排序
  // });
  const result: T[] = []
  idArray.forEach((id) => {
    const item = array.find((item) => String(item.id) === String(id))
    if (item) {
      result.push(item)
    }
  })
  return result
}

export function mergeWithImage(arr1: ObjectWithId[], arr2: ObjectWithId[]) {
  // 创建一个新的数组，用于存放合并后的结果
  const result = [] as MenuItem[]

  // 创建一个用于存储id对应合并对象的Map
  const mergedMap = new Map()

  // 将arr1中的元素先加入Map
  arr1.forEach((item) => {
    mergedMap.set(item.id, { ...item }) // 使用扩展运算符保留arr1的字段
  })

  // 将arr2中的元素合并到Map中
  arr2.forEach((item) => {
    if (mergedMap.has(item.id)) {
      const cacheItem = mergedMap.get(item.id)
      // 如果id已经存在于Map中，合并对象
      mergedMap.set(item.id, { ...cacheItem, ...item, name: cacheItem.name })
    } else {
      // 如果id不存在，直接添加
      mergedMap.set(item.id, { ...item })
    }
  })

  // 从Map中取出合并后的结果，按arr1的顺序排序
  arr1.forEach((item) => {
    result.push(mergedMap.get(item.id))
    mergedMap.delete(item.id)
  })

  // 添加arr2中剩下的没有在arr1中出现的对象
  if (mergedMap.size > 0) {
    for (const value of mergedMap.values()) {
      result.push(value)
    }
  }

  return result
}
