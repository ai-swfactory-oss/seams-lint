import { describe, expect, it } from 'vitest'

import { createPrettier } from '../src/index'
import { createFakePrettier } from '../src/testing/index'

describe('createPrettier', () => {
  it('reports no unformatted files while the seam is a skeleton', () => {
    expect(createPrettier().check()).toEqual({ unformatted: [] })
  })
})

describe('createFakePrettier', () => {
  it('reports no unformatted files by default', () => {
    expect(createFakePrettier().check()).toEqual({ unformatted: [] })
  })

  it('returns the result it was given', () => {
    const result = { unformatted: ['a.ts'] }
    expect(createFakePrettier(result).check()).toBe(result)
  })
})
