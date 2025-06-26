import cac, { CAC } from "cac";
import pkgJson from "../package.json"
import restoreCursor from "restore-cursor";
import { logger } from "../utils/logger";

const cli: CAC = cac("Raizensu")

const { version } = pkgJson

cli.command("generate", "Generate license")
    .option("--type, -t <type>", "License type. e.g. MIT, GPLv3.")
    .option("--cwd, -c <cwd>", "Choose the path you want to generate your file.")
    .action((options) => {
        const { type } = options

        if(!type) {
            logger.error("Please give a license type, like MIT, GPLv3...")
            return
        } else if (!["GPLv3", "MIT"].includes(type)){
            logger.error("License Type Not supported")
            return
        }



    })

cli.help()
cli.version(version)
cli.parse()

restoreCursor()