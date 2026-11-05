import type { Prettier, PrettierCheckResult } from '../index'

export const createFakePrettier = (result: PrettierCheckResult = { unformatted: [] }): Prettier => ({
  check: () => result,
})
