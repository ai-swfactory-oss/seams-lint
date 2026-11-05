import type { Oxfmt, OxfmtCheckResult } from '../index'

export const createFakeOxfmt = (result: OxfmtCheckResult = { unformatted: [] }): Oxfmt => ({
  check: () => result,
})
