import type { Copyright } from '../src'
import path from 'node:path'
import { it } from 'vitest'
import { __dirname, generateLicense } from '../src'

it('write GPLv3', async () => {
  await generateLicense({
    license: 'GPLv3',
    cwd: path.resolve(__dirname, '../'),
    date: 'June 26th, 2025',
    copyrights: <Copyright[]>[{
      year: '2025-present',
      author: 'Vincent-the-gamer',
      link: 'https://github.com/Vincent-the-gamer',
    }, {
      year: '2025-present',
      author: 'Random',
      link: 'https://github.com/random',
    }],
  })
})

it('write MIT', async () => {
  await generateLicense({
    license: 'MIT',
    cwd: path.resolve(__dirname, '../'),
    copyrights: <Copyright[]>[{
      year: '2025-present',
      author: 'Vincent-the-gamer',
      link: 'https://github.com/Vincent-the-gamer',
    }],
  })
})

it('write MIT with no config given. (Read config file)', async () => {
  await generateLicense({})
})
