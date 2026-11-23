import type { FileEntry, Tree } from '@ai-swfactory-oss/files'
import { describe, expect, expectTypeOf, it } from 'vitest'

import * as entry from '../src/index'
import { formatTree, type PrettierConfig, type PrettierPlugin } from '../src/index'

const encoder = new TextEncoder()

const decoder = new TextDecoder()

const file = (path: string, text: string): FileEntry => ({ path, kind: 'file', content: encoder.encode(text), executable: false })

const CONFIG: PrettierConfig = {
  plugins: ['typescript', 'javascript', 'json', 'markdown', 'yaml'],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}

const textsOf = (tree: Tree): readonly (readonly [string, string])[] =>
  tree.entries.flatMap(changed => (changed.kind === 'file' ? [[changed.path, decoder.decode(changed.content)] as const] : []))

describe('formatTree', () => {
  it('returns each file it reformats with its formatted content, and no file it leaves unchanged', async () => {
    const result = await formatTree({ entries: [file('src/a.ts', 'const a:number=1'), file('src/ok.ts', 'const ok = 1\n')] }, CONFIG)

    expect(textsOf(result.changed)).toEqual([['src/a.ts', 'const a: number = 1\n']])
  })

  it('formats one mis-formatted file per extension in the closed map, and returns no already formatted file', async () => {
    const result = await formatTree(
      {
        entries: [
          file('a.ts', 'const a:number=1'),
          file('b.tsx', 'const b=<div/>'),
          file('c.mts', 'export const c=1'),
          file('d.cts', 'export const d=1'),
          file('e.js', 'const e=  2;'),
          file('f.jsx', 'const f=<p/>'),
          file('g.mjs', 'export const g=1'),
          file('h.cjs', 'module.exports={h:1}'),
          file('i.json', '{"i":1}'),
          file('j.md', '#  Title'),
          file('k.yaml', 'k:   1'),
          file('l.yml', 'l:   1'),
          file('formatted.ts', 'export const formatted = 1\n'),
        ],
      },
      CONFIG,
    )

    expect([textsOf(result.changed), result.skipped, result.failed]).toEqual([
      [
        ['a.ts', 'const a: number = 1\n'],
        ['b.tsx', 'const b = <div />\n'],
        ['c.mts', 'export const c = 1\n'],
        ['d.cts', 'export const d = 1\n'],
        ['e.js', 'const e = 2\n'],
        ['f.jsx', 'const f = <p />\n'],
        ['g.mjs', 'export const g = 1\n'],
        ['h.cjs', 'module.exports = { h: 1 }\n'],
        ['i.json', '{ "i": 1 }\n'],
        ['j.md', '# Title\n'],
        ['k.yaml', 'k: 1\n'],
        ['l.yml', 'l: 1\n'],
      ],
      [],
      [],
    ])
  })

  it('reports a file whose extension is not in the map as skipped and a file that does not parse as failed, each by path, and returns neither', async () => {
    const result = await formatTree({ entries: [file('notes.txt', 'free  text'), file('broken.ts', 'const = ;')] }, CONFIG)

    expect({
      changed: result.changed.entries,
      skipped: result.skipped,
      failed: result.failed.map(failure => failure.path),
      explained: result.failed.every(failure => failure.message !== ''),
    }).toEqual({ changed: [], skipped: [{ path: 'notes.txt' }], failed: ['broken.ts'], explained: true })
  })

  it('skips a file whose plugin the config does not name', async () => {
    const result = await formatTree({ entries: [file('a.yaml', 'a:   1')] }, { ...CONFIG, plugins: ['typescript'] })

    expect([result.changed.entries, result.skipped]).toEqual([[], [{ path: 'a.yaml' }]])
  })

  it('admits only the closed plugin names in its config, takes the config as a type the package declares, and exports only formatTree', () => {
    expectTypeOf<PrettierPlugin>().toEqualTypeOf<'typescript' | 'javascript' | 'json' | 'markdown' | 'yaml'>()
    expectTypeOf<PrettierConfig['plugins']>().toEqualTypeOf<readonly PrettierPlugin[]>()
    expectTypeOf(formatTree).parameters.toEqualTypeOf<[Tree, PrettierConfig]>()
    expect(Object.keys(entry)).toEqual(['formatTree'])
  })
})
