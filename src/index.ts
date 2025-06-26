import { existsSync, mkdir, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

export enum License {
    GPLv3,
    MIT
}

const templatePaths = {
    GPLv3: path.resolve(__dirname, "./license-templates/GPLv3.txt")
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

function writeTargetFile(_path: string, content: string) {
    let folder = path.resolve(__dirname, "./target")
    if(!existsSync(folder)) {
        mkdirSync(folder)
    }
    writeFileSync(_path, content)
}

export function generateLicense(config: Config) {
    let license: string
    const filename = config.filename ?? "generated.txt"
    const writePath = config.cwd ?? path.resolve(__dirname)

    switch(config.license) {
        case License.GPLv3:
            license = readFileSync(templatePaths.GPLv3, "utf8")
            license.replace("${date}", config.date ?? "")
                    .replace("${years}", config.years ?? "")
                    .replace("${author}", config.author ?? "")
                    .replace("${link}", config.link ?? "")
            // Write license to file
            writeTargetFile(writePath, license)
            break
        default:
            break
    }
}