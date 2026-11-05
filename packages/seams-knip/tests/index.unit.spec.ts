import { describe, expect, it } from 'vitest'

import { createKnip } from '../src/index'
import { createFakeKnip } from '../src/testing/index'

describe('createKnip', () => {
  it('reports no issues while the seam is a skeleton', () => {
    expect(createKnip().analyse()).toEqual({ issues: [] })
  })
})

describe('createFakeKnip', () => {
  it('reports no issues by default', () => {
    expect(createFakeKnip().analyse()).toEqual({ issues: [] })
  })

  it('returns the result it was given', () => {
    const result = { issues: [{ file: 'a.ts', type: 'exports', symbol: 'unused' }] }
    expect(createFakeKnip(result).analyse()).toBe(result)
  })
})
