import type { Eslint, EslintResult } from '../index'

export const createFakeEslint = (result: EslintResult = { findings: [] }): Eslint => ({
  lint: () => result,
})
