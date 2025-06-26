import cac, { CAC } from "cac";
import pkgJson from "../package.json"
import restoreCursor from "restore-cursor";
import { logger } from "../utils/logger";
import { generateLicense } from "./index";
import { availableLicenseType } from "./types";
import { bold, dim } from "ansis";

const cli: CAC = cac("raizensu")

const { version } = pkgJson

cli.command("generate", `Generate license.`)
    .option("--type, -t <type>", `License type, available value: ${availableLicenseType.join(",")}. Default: MIT.`)
    .option("--cwd, -c <cwd>", "Choose the path you want to generate your file.")
    .option("--date, -d <date>", "Licese create date, can be any format, like 2025-06-26.")
    .option("--copyrights, -C <copyrights>", "Copyrights, an array contains: year, author, link")
    .option("--filename, -n <filename>", "File name, e.g. license.txt")
    .action(async (options) => {
        const { type, cwd, date, copyrights, filename } = options

        logger.info(
            `raizensu ${dim(`v${version}`)} : ${bold(`License generator`)}.`,
        )

        const msg = await generateLicense({
            license: type,
            cwd,
            date,
            copyrights: JSON.parse(copyrights),
            filename
        })

        if(msg !== "") {
            logger.success("Generated Type")
        }
    })

cli.help()
cli.version(version)
cli.parse()

restoreCursor()