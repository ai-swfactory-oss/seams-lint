export interface EslintFinding {
  readonly file: string
  readonly line: number
  readonly ruleId: string
  readonly message: string
}

export interface EslintResult {
  readonly findings: readonly EslintFinding[]
}

export interface Eslint {
  readonly lint: () => EslintResult
}

export const createEslint = (): Eslint => ({
  lint: () => ({ findings: [] }),
})
