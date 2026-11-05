import type { Knip, KnipResult } from '../index'

export const createFakeKnip = (result: KnipResult = { issues: [] }): Knip => ({
  analyse: () => result,
})
