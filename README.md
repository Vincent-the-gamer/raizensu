# Raizensu

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Quickly generate license for repos. **(Raizensu = License)**

> [!NOTE]
> Currently supporting:
> - MIT
> - GPL v3

## Installation

This package provides both CLI and library usage.

### Library
```shell
npm i raizensu
```

### CLI
```shell
npm i raizensu -g
```

## Usage

You can set your config in `raizensu.config.[ts,js,mjs,mts,cjs,cts,json]`

```ts
import { defineConfig } from 'raizensu'

export default defineConfig({
  cwd: './',
  filename: 'LICENSE.txt',
  license: 'MIT',
  copyrights: [{
    year: '2025-present',
    author: 'Vincent-the-gamer',
    link: 'https://github.com/Vincent-the-gamer'
  }]
})
```

File will be generated in `./target/LICENSE.txt`

### Use as library

Example:

if msg returns undefined, that means license failed to generate.

```ts
import { Copyright, generateLicense } from 'raizensu'

const msg = await generateLicense({
  license: 'GPLv3',
  cwd: path.resolve(__dirname, '../'),
  date: 'June 26th, 2025',
  copyrights: <Copyright[]>[{
    year: '2025-present',
    author: 'Vincent-the-gamer',
    link: 'https://github.com/Vincent-the-gamer'
  }, {
    year: '2025-present',
    author: 'Random',
    link: 'https://github.com/random'
  }]
})
```

Result:
```
    GNU GENERAL PUBLIC LICENSE
    Version 3, June 26th, 2025

Copyright (c) 2025-present Vincent-the-gamer <https://github.com/Vincent-the-gamer>
Copyright (c) 2025-present Random <https://github.com/random>

 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

...
```

### Use as CLI
Example:
```shell
# This command generates a MIT license with your config in `raizensu.config.ts`
raizensu generate

# This command generates a license with specified config.
#  --type, -t <type>: License type.
# --cwd, -c <cwd>, Choose the path you want to generate your file.
# --date, -d <date>", Licese create date, can be any format, like 2025-06-26.
# --copyrights, -C <copyrights>, Copyrights, an array contains: year, author, link.
# --filename, -n <filename>, File name, e.g. license.txt.
raizensu generate -t MIT -c ./ -C '[{ "author": "Vincent-the-gamer" }]' -n "MIT.txt"

raizensu generate -t GPLv3 -c ./ -d June\ 26th \ 2025 -C '[{ "author": "Vincent-the-gamer" }]' -n "GPLv3.txt"
```

## License

[MIT](./LICENSE) License © 2025-PRESENT [Vincent-the-gamer](https://github.com/Vincent-the-gamer)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/raizensu?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/raizensu
[npm-downloads-src]: https://img.shields.io/npm/dm/raizensu?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/raizensu
[bundle-src]: https://img.shields.io/bundlephobia/minzip/raizensu?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=raizensu
[license-src]: https://img.shields.io/github/license/Vincent-the-gamer/raizensu.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/Vincent-the-gamer/raizensu/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/raizensu
