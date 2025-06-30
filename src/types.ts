export interface Copyright {
  year?: string
  author?: string
  link?: string
}

export interface Config {
  license: string
  filename?: string
  cwd?: string
  date?: string
  copyrights: Copyright[]
}

export const availableLicenseType = ['GPLv3', 'MIT', 'Apache2', 'LGPLv3', 'Anti996_zh', 'Anti996_en', 'BSD-3-Clause']
