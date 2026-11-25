# seams-lint

Libraries for static analysis and formatting: oxlint, oxfmt and knip.

The packages are still the guarded skeleton: `createOxlint()` returns a seam whose `lint()` reports no findings, `createOxfmt()` one whose `check()` lists no unformatted files, and `createKnip()` one whose `analyse()` reports no issues; each of those packages' `./testing` holds a fake of it.

## Packages

- `@ai-swfactory-oss/seams-oxlint`: the oxlint seam.
- `@ai-swfactory-oss/seams-oxfmt`: the oxfmt seam.
- `@ai-swfactory-oss/seams-knip`: the knip seam.

## Licence

MIT
