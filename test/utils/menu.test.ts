import { describe, it, expect } from 'vitest'
import { sortArrayByIds, mergeWithImage } from '@ah/utils/menu'
describe('sortArrayByIds', () => {
  it('should return the array sorted by the provided ID array', () => {
    const array = [
      { id: 3, name: 'item3' },
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
    ]
    const idArray = [1, 2, 3]

    const sortedArray = sortArrayByIds(array, idArray)

    expect(sortedArray).toEqual([
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
      { id: 3, name: 'item3' },
    ])
  })

  it('should return an empty array when input array is empty', () => {
    const array: any[] = []
    const idArray = [1, 2, 3]

    const sortedArray = sortArrayByIds(array, idArray)

    expect(sortedArray).toEqual([])
  })

  it('should return an empty array when ID array is empty', () => {
    const array = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
    ]
    const idArray: any[] = []

    const sortedArray = sortArrayByIds(array, idArray)

    expect(sortedArray).toEqual([])
  })

  it('should handle missing IDs in the array', () => {
    const array = [
      { id: 3, name: 'item3' },
      { id: 1, name: 'item1' },
      { id: 4, name: 'item4' },
    ]
    const idArray = [1, 2, 3]

    const sortedArray = sortArrayByIds(array, idArray)

    expect(sortedArray).toEqual([
      { id: 1, name: 'item1' },
      { id: 3, name: 'item3' },
    ])
  })
})

describe('mergeWithImage', () => {
  it('should merge two arrays by their IDs', () => {
    const arr1 = [
      { id: 1, name: 'item1', imgUrl: 'img1.jpg' },
      { id: 2, name: 'item2', imgUrl: 'img2.jpg' },
    ]
    const arr2 = [
      { id: 1, description: 'desc1' },
      { id: 3, name: 'item3', imgUrl: 'img3.jpg' },
    ]

    const mergedArray = mergeWithImage(arr1, arr2)

    expect(mergedArray).toEqual([
      { id: 1, name: 'item1', imgUrl: 'img1.jpg', description: 'desc1' },
      { id: 2, name: 'item2', imgUrl: 'img2.jpg' },
      { id: 3, name: 'item3', imgUrl: 'img3.jpg' },
    ])
  })

  it('should add new items from arr2 when no matching ID in arr1', () => {
    const arr1 = [{ id: 1, name: 'item1', imgUrl: 'img1.jpg' }]
    const arr2 = [{ id: 2, name: 'item2', imgUrl: 'img2.jpg' }]

    const mergedArray = mergeWithImage(arr1, arr2)

    expect(mergedArray).toEqual([
      { id: 1, name: 'item1', imgUrl: 'img1.jpg' },
      { id: 2, name: 'item2', imgUrl: 'img2.jpg' },
    ])
  })

  it('should return only items from arr1 if arr2 is empty', () => {
    const arr1 = [{ id: 1, name: 'item1', imgUrl: 'img1.jpg' }]
    const arr2: any[] = []

    const mergedArray = mergeWithImage(arr1, arr2)

    expect(mergedArray).toEqual([{ id: 1, name: 'item1', imgUrl: 'img1.jpg' }])
  })

  it('should return only items from arr2 if arr1 is empty', () => {
    const arr1: any[] = []
    const arr2 = [{ id: 2, name: 'item2', imgUrl: 'img2.jpg' }]

    const mergedArray = mergeWithImage(arr1, arr2)

    expect(mergedArray).toEqual([{ id: 2, name: 'item2', imgUrl: 'img2.jpg' }])
  })
})
