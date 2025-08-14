import { describe, it, expect } from 'vitest'
import { updateTokenId, getTokenId } from '../../lib/utils/tokenId'

describe('tokenId util', () => {
  it('should return empty string by default', () => {
    expect(getTokenId()).toBe('')
  })

  it('should update and get tokenId', () => {
    updateTokenId('abc123')
    expect(getTokenId()).toBe('abc123')

    updateTokenId('newToken')
    expect(getTokenId()).toBe('newToken')
  })
})
