import type { Oxlint, OxlintResult } from '../index'

export const createFakeOxlint = (result: OxlintResult = { findings: [] }): Oxlint => ({
  lint: () => result,
})
