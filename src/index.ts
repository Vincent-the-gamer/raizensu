import type { Config } from './types'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { logger } from "./utils/logger"
import { resolveConfig } from './config'
import { availableLicenseType } from './types'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export * from './config'
export * from './types'

const templatePaths: Record<string, string> = {
  GPLv3: path.resolve(__dirname, './license-templates/GPLv3.txt'),
  MIT: path.resolve(__dirname, './license-templates/MIT.txt'),
  Apache2: path.resolve(__dirname, './license-templates/Apache-2.0.txt'),
  LGPLv3: path.resolve(__dirname, './license-templates/LGPLv3.txt'),
  Anti996_zh: path.resolve(__dirname, './license-templates/Anti996-zh_CN.txt'),
  Anti996_en: path.resolve(__dirname, './license-templates/Anti996-en.txt')
}

function writeTargetFile(_path: string, fileName: string, content: string) {
  const targetPath = path.resolve(_path)
  if (!existsSync(`${targetPath}/target`)) {
    mkdirSync(`${targetPath}/target`)
  }
  writeFileSync(`${_path}/target/${fileName}`, content)
}

function loadLicense(templatePath: string, config: Config) {
  let _license = readFileSync(templatePath, 'utf8')

  let copyrightArray: string[] = config.copyrights.filter(item => item.author !== undefined)
    .map(item => `Copyright (C) ${item.year} ${item.author} <${item.link}>`)

  // distinct
  copyrightArray = Array.from(new Set(copyrightArray))

  const copyright = copyrightArray.join('\n')

  _license = _license.replace('${date}', config.date ?? '')
    .replace('${copyright}', copyright)

  return _license
}

export async function generateLicense(config: Partial<Config>, configCwd?: string): Promise<string> {
  let license: string

  const resolvedConfig: Config = await resolveConfig(config as Config, configCwd)

  const writePath = resolvedConfig.cwd!
  const filename = resolvedConfig.filename!

  if (!resolvedConfig.license) {
    logger.error('Please give a license type, like MIT, GPLv3...')
    return ''
  }
  else if (!availableLicenseType.includes(resolvedConfig.license)) {
    logger.error('License type not supported!')
    return ''
  }

  switch (resolvedConfig.license) {
    case 'GPLv3':
      license = loadLicense(templatePaths.GPLv3, resolvedConfig)
      // Write license to file
      writeTargetFile(writePath, filename, license)
      break
    case 'MIT':
      license = loadLicense(templatePaths.MIT, resolvedConfig)
      writeTargetFile(writePath, filename, license)
      break
    case 'Apache2':
      license = loadLicense(templatePaths.Apache2, resolvedConfig)
      writeTargetFile(writePath, filename, license)
      break
    case 'LGPLv3':
      license = loadLicense(templatePaths.LGPLv3, resolvedConfig)
      writeTargetFile(writePath, filename, license)
      break
    case 'Anti996_zh':
      license = loadLicense(templatePaths.Anti996_zh, resolvedConfig)
      license = license.replace("Copyright", "版权所有")
                       .replace("present", "现在")
                       .replace("PRESENT", "现在")
      writeTargetFile(writePath, filename, license)
      break
    case 'Anti996_en':
      license = loadLicense(templatePaths.Anti996_en, resolvedConfig)
      writeTargetFile(writePath, filename, license)
      break
    default:
      break
  }

  return `${writePath}${filename}`
}
