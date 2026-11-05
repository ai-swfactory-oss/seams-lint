import { describe, expect, it } from 'vitest'

import { createEslint } from '../src/index'
import { createFakeEslint } from '../src/testing/index'

describe('createEslint', () => {
  it('reports no findings while the seam is a skeleton', () => {
    expect(createEslint().lint()).toEqual({ findings: [] })
  })
})

describe('createFakeEslint', () => {
  it('reports no findings by default', () => {
    expect(createFakeEslint().lint()).toEqual({ findings: [] })
  })

  it('returns the result it was given', () => {
    const result = { findings: [{ file: 'a.ts', line: 1, ruleId: 'no-unused-vars', message: 'unused' }] }
    expect(createFakeEslint(result).lint()).toBe(result)
  })
})
