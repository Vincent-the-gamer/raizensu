import type { CAC } from 'cac'
import { bold, dim } from 'ansis'
import cac from 'cac'
import restoreCursor from 'restore-cursor'
import pkgJson from '../package.json'
import { logger } from './utils/logger'
import { generateLicense } from './index'
import { availableLicenseType } from './types'

const cli: CAC = cac('raizensu')

const { version } = pkgJson

cli.command('generate', `Generate license.`)
  .option('--type, -t <type>', `License type, available value: ${availableLicenseType.join(',')}. Default: MIT.`)
  .option('--cwd, -c <cwd>', 'Choose the path you want to generate your file.')
  .option('--date, -d <date>', 'Licese create date, can be any format, like 2025-06-26.')
  .option('--copyrights, -C <copyrights>', 'Copyrights, an array contains: year, author, link')
  .option('--filename, -n <filename>', 'File name, e.g. license.txt')
  .action(async (options) => {
    const { type, cwd, date, copyrights, filename } = options

    logger.info(
      `raizensu ${dim(`v${version}`)} : ${bold(`License generator`)}.`,
    )

    let copyrightJson = copyrights

    try {
      if (copyrights) {
        copyrightJson = JSON.parse(copyrights)
      }
    } catch (err) {
      logger.error(err)
    }

    const msg = await generateLicense({
      license: type,
      cwd,
      date,
      copyrights: copyrightJson,
      filename,
    })

    if (msg !== '') {
      logger.success('Generated Type')
    }

  })

cli.help()
cli.version(version)
cli.parse()

restoreCursor()
