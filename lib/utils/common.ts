/**
 * 拆分数组
 * @param arr
 * @param size
 * @returns
 */
export function chunkArray<R>(arr: Array<R>, size: number) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
