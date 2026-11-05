export interface PrettierCheckResult {
  readonly unformatted: readonly string[]
}

export interface Prettier {
  readonly check: () => PrettierCheckResult
}

export const createPrettier = (): Prettier => ({
  check: () => ({ unformatted: [] }),
})
