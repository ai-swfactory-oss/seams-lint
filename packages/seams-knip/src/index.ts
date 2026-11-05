export interface KnipIssue {
  readonly file: string
  readonly type: string
  readonly symbol: string
}

export interface KnipResult {
  readonly issues: readonly KnipIssue[]
}

export interface Knip {
  readonly analyse: () => KnipResult
}

export const createKnip = (): Knip => ({
  analyse: () => ({ issues: [] }),
})
