import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path, { dirname } from "node:path"
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export enum License {
    GPLv3 = "GPLv3",
    MIT = "MIT"
}

const templatePaths: Record<string, string> = {
    GPLv3: path.resolve(__dirname, "./license-templates/GPLv3.txt"),
    MIT: path.resolve(__dirname, "./license-templates/MIT.txt"),
}

export interface Copyright {
    year?: string,
    author?: string,
    link?: string
}

interface Config {
    license: License,
    filename?: string,
    cwd?: string,
    date?: string,
    copyrights: Copyright[]
}

function writeTargetFile(_path: string, fileName: string, content: string) {
    let targetPath = path.resolve(_path)
    if (!existsSync(targetPath + "/target")) {
        mkdirSync(targetPath + "/target")
    }
    writeFileSync(_path + `/target/${fileName}`, content)
}

function loadLicense(templatePath: string, config: Config) {
    let _license = readFileSync(templatePath, "utf8")
    
    const copyright: string = config.copyrights.map(item => 
        `Copyright (c) ${item.year} ${item.author} <${item.link}>`
    ).join("\n")

    _license = _license.replace("${date}", config.date ?? "")
                       .replace("${copyright}", copyright)

    return _license
}

export function generateLicense(config: Config): string {
    let license: string

    const writePath = config.cwd ?? path.resolve(__dirname)

    console.log(path.resolve(__dirname))

    const filename = config.filename ?? "generated.txt"

    switch (config.license) {
        case License.GPLv3:
            license = loadLicense(templatePaths.GPLv3, config)
            // Write license to file
            writeTargetFile(writePath, filename, license)
            break
        case License.MIT:
            license = loadLicense(templatePaths.MIT, config)
            writeTargetFile(writePath, filename, license)
            break
        default:
            break
    }

    return `${writePath}${filename}` 
}