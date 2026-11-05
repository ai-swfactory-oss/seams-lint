import { describe, expect, it } from 'vitest'

import { createOxfmt } from '../src/index'
import { createFakeOxfmt } from '../src/testing/index'

describe('createOxfmt', () => {
  it('reports no unformatted files while the seam is a skeleton', () => {
    expect(createOxfmt().check()).toEqual({ unformatted: [] })
  })
})

describe('createFakeOxfmt', () => {
  it('reports no unformatted files by default', () => {
    expect(createFakeOxfmt().check()).toEqual({ unformatted: [] })
  })

  it('returns the result it was given', () => {
    const result = { unformatted: ['a.ts'] }
    expect(createFakeOxfmt(result).check()).toBe(result)
  })
})
