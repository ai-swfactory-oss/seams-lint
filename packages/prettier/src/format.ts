import type { FileEntry, Tree } from '@ai-swfactory-oss/files'
import type { Plugin } from 'prettier'
import * as babel from 'prettier/plugins/babel'
import * as estree from 'prettier/plugins/estree'
import * as markdown from 'prettier/plugins/markdown'
import * as typescript from 'prettier/plugins/typescript'
import * as yaml from 'prettier/plugins/yaml'
import { format } from 'prettier/standalone'

import type { PrettierConfig, PrettierFailed, PrettierPlugin, PrettierResult, PrettierSkipped } from './types'

interface Language {
  readonly plugin: PrettierPlugin
  readonly parser: string
}

const LANGUAGES: ReadonlyMap<string, Language> = new Map<string, Language>([
  ['ts', { plugin: 'typescript', parser: 'typescript' }],
  ['tsx', { plugin: 'typescript', parser: 'typescript' }],
  ['mts', { plugin: 'typescript', parser: 'typescript' }],
  ['cts', { plugin: 'typescript', parser: 'typescript' }],
  ['js', { plugin: 'javascript', parser: 'babel' }],
  ['jsx', { plugin: 'javascript', parser: 'babel' }],
  ['mjs', { plugin: 'javascript', parser: 'babel' }],
  ['cjs', { plugin: 'javascript', parser: 'babel' }],
  ['json', { plugin: 'json', parser: 'json' }],
  ['md', { plugin: 'markdown', parser: 'markdown' }],
  ['yaml', { plugin: 'yaml', parser: 'yaml' }],
  ['yml', { plugin: 'yaml', parser: 'yaml' }],
])

const PLUGINS: Readonly<Record<PrettierPlugin, readonly Plugin[]>> = {
  typescript: [typescript, estree],
  javascript: [babel, estree],
  json: [babel, estree],
  markdown: [markdown],
  yaml: [yaml],
}

const decoder = new TextDecoder()

const encoder = new TextEncoder()

const extensionOf = (path: string): string => {
  const name = path.slice(path.lastIndexOf('/') + 1)
  const dot = name.lastIndexOf('.')
  return dot <= 0 ? '' : name.slice(dot + 1).toLowerCase()
}

type Outcome =
  | { readonly kind: 'changed'; readonly entry: FileEntry }
  | { readonly kind: 'unchanged' }
  | { readonly kind: 'skipped'; readonly skipped: PrettierSkipped }
  | { readonly kind: 'failed'; readonly failed: PrettierFailed }

const formatEntry = async (entry: FileEntry, config: PrettierConfig): Promise<Outcome> => {
  const language = LANGUAGES.get(extensionOf(entry.path))
  if (language === undefined || !config.plugins.includes(language.plugin)) return { kind: 'skipped', skipped: { path: entry.path } }
  const source = decoder.decode(entry.content)
  try {
    const formatted = await format(source, {
      parser: language.parser,
      plugins: [...PLUGINS[language.plugin]],
      printWidth: config.printWidth,
      tabWidth: config.tabWidth,
      useTabs: config.useTabs,
      semi: config.semi,
      singleQuote: config.singleQuote,
      trailingComma: config.trailingComma,
    })
    return formatted === source ? { kind: 'unchanged' } : { kind: 'changed', entry: { ...entry, content: encoder.encode(formatted) } }
  } catch (error) {
    return { kind: 'failed', failed: { path: entry.path, message: error instanceof Error ? error.message : 'the formatter failed' } }
  }
}

export const formatTree = async (tree: Tree, config: PrettierConfig): Promise<PrettierResult> => {
  const files = tree.entries.filter((entry): entry is FileEntry => entry.kind === 'file')
  const outcomes = await Promise.all(files.map(entry => formatEntry(entry, config)))
  return {
    changed: { entries: outcomes.flatMap(outcome => (outcome.kind === 'changed' ? [outcome.entry] : [])) },
    skipped: outcomes.flatMap(outcome => (outcome.kind === 'skipped' ? [outcome.skipped] : [])),
    failed: outcomes.flatMap(outcome => (outcome.kind === 'failed' ? [outcome.failed] : [])),
  }
}
