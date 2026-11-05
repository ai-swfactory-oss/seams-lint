export interface OxlintFinding {
  readonly file: string
  readonly line: number
  readonly ruleId: string
  readonly message: string
}

export interface OxlintResult {
  readonly findings: readonly OxlintFinding[]
}

export interface Oxlint {
  readonly lint: () => OxlintResult
}

export const createOxlint = (): Oxlint => ({
  lint: () => ({ findings: [] }),
})
