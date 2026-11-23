# seams-lint

Libraries for static analysis and formatting: ESLint, oxlint, oxfmt, Prettier and knip.

`@ai-swfactory-oss/prettier` is a pure library over a Tree. The other packages are still the guarded skeleton: `createEslint()` and `createOxlint()` return seams whose `lint()` reports no findings, `createOxfmt()` one whose `check()` lists no unformatted files, and `createKnip()` one whose `analyse()` reports no issues; each of those packages' `./testing` holds a fake of it.

## Packages

- `@ai-swfactory-oss/seams-eslint`: the ESLint seam.
- `@ai-swfactory-oss/seams-oxlint`: the oxlint seam.
- `@ai-swfactory-oss/seams-oxfmt`: the oxfmt seam.
- `@ai-swfactory-oss/prettier`: formats the files of a Tree in-process with a closed plugin set (TypeScript, JavaScript, JSON, Markdown, YAML), and returns the changed, skipped and failed files as data.
- `@ai-swfactory-oss/seams-knip`: the knip seam.

## Licence

MIT
