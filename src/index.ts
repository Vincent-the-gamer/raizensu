import { existsSync, mkdir, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

export enum License {
    GPLv3,
    MIT
}

const templatePaths: Record<string, string> = {
    GPLv3: path.resolve(__dirname, "./license-templates/GPLv3.txt"),
    MIT: path.resolve(__dirname, "./license-templates/MIT.txt"),
}

interface Config {
    license: License,
    filename?: string,
    cwd?: string,
    date?: string,
    years?: string,
    author?: string,
    link?: string
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
    _license = _license.replace("${date}", config.date ?? "")
                        .replace("${years}", config.years ?? "")
                        .replace("${author}", config.author ?? "")
                        .replace("${link}", config.link ?? "")
    return _license
}

export function generateLicense(config: Config) {
    let license: string

    const writePath = config.cwd ?? path.resolve(__dirname)

    switch (config.license) {
        case License.GPLv3:
            license = loadLicense(templatePaths.GPLv3, config)
            // Write license to file
            writeTargetFile(writePath, config.filename ?? "generated.txt", license)
            break
        case License.MIT:
            license = loadLicense(templatePaths.MIT, config)
            writeTargetFile(writePath, config.filename ?? "generated.txt", license)
            break
        default:
            break
    }
}