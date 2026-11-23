import type { Tree } from '@ai-swfactory-oss/files'

export type PrettierPlugin = 'typescript' | 'javascript' | 'json' | 'markdown' | 'yaml'

export type PrettierTrailingComma = 'all' | 'es5' | 'none'

export interface PrettierConfig {
  readonly plugins: readonly PrettierPlugin[]
  readonly printWidth: number
  readonly tabWidth: number
  readonly useTabs: boolean
  readonly semi: boolean
  readonly singleQuote: boolean
  readonly trailingComma: PrettierTrailingComma
}

export interface PrettierSkipped {
  readonly path: string
}

export interface PrettierFailed {
  readonly path: string
  readonly message: string
}

export interface PrettierResult {
  readonly changed: Tree
  readonly skipped: readonly PrettierSkipped[]
  readonly failed: readonly PrettierFailed[]
}
