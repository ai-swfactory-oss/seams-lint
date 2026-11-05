export interface OxfmtCheckResult {
  readonly unformatted: readonly string[]
}

export interface Oxfmt {
  readonly check: () => OxfmtCheckResult
}

export const createOxfmt = (): Oxfmt => ({
  check: () => ({ unformatted: [] }),
})
