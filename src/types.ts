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

export const availableLicenseType = ['GPLv3', 'MIT']
