import { describe, it, expect } from 'vitest'
import { chunkArray } from '../../lib/utils/common'

// test/utils/common.test.ts

describe('测试common文件', () => {
  it('should split array into chunks of given size', () => {
    expect(chunkArray([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  it('should handle arrays not divisible by size', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('should return the whole array as one chunk if size > array length', () => {
    expect(chunkArray([1, 2], 5)).toEqual([[1, 2]])
  })

  it('should return empty array when input is empty', () => {
    expect(chunkArray([], 3)).toEqual([])
  })

  it('should split array into single elements if size is 1', () => {
    expect(chunkArray([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })
})
