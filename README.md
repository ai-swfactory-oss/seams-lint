# seams-lint

Seams for static analysis and formatting: ESLint, oxlint, oxfmt, Prettier and knip. Each package is a typed SDK seam over one tool, with a fake under `./testing`.

This repository holds only the guarded skeleton so far: `createEslint()` and `createOxlint()` return seams whose `lint()` reports no findings, `createOxfmt()` and `createPrettier()` seams whose `check()` lists no unformatted files, and `createKnip()` one whose `analyse()` reports no issues; each package's `./testing` holds a fake of it.

## Packages

- `@ai-swfactory-oss/seams-eslint`: the ESLint seam.
- `@ai-swfactory-oss/seams-oxlint`: the oxlint seam.
- `@ai-swfactory-oss/seams-oxfmt`: the oxfmt seam.
- `@ai-swfactory-oss/seams-prettier`: the Prettier seam.
- `@ai-swfactory-oss/seams-knip`: the knip seam.

## Licence

MIT
