import { describe, expect, it } from 'vitest'

import { createOxlint } from '../src/index'
import { createFakeOxlint } from '../src/testing/index'

describe('createOxlint', () => {
  it('reports no findings while the seam is a skeleton', () => {
    expect(createOxlint().lint()).toEqual({ findings: [] })
  })
})

describe('createFakeOxlint', () => {
  it('reports no findings by default', () => {
    expect(createFakeOxlint().lint()).toEqual({ findings: [] })
  })

  it('returns the result it was given', () => {
    const result = { findings: [{ file: 'a.ts', line: 1, ruleId: 'no-debugger', message: 'debugger' }] }
    expect(createFakeOxlint(result).lint()).toBe(result)
  })
})
