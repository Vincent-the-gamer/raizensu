import cac, { CAC } from "cac";
import pkgJson from "../package.json"
import restoreCursor from "restore-cursor";
import { logger } from "../utils/logger";
import { Copyright, generateLicense } from "./index";

const cli: CAC = cac("Raizensu")

const { version } = pkgJson

const availableLicenseType = ["GPLv3", "MIT"]

cli.command("generate <type>", `Generate license, license type can be: ${availableLicenseType.join(",")}.`)
    .option("--type, -t <type>", "License type. e.g. MIT, GPLv3.")
    .option("--cwd, -c <cwd>", "Choose the path you want to generate your file.")
    .option("--date, -d <date>", "Licese create date, can be any format, like 2025-06-26.")
    .option("--years, -y <years>", "License valid date, e.g. 2025-present, split multiple dates with comma. (e.g. 2024-2028,2025-2029")
    .option("--authors, -a <authors>", "Project authors, split multiple authors with comma.")
    .option("--links, -l <links>", "links to author profiles, split multiple links with comma.")
    .action((type, options) => {
        const { cwd, date, years, authors, links } = options

        if(!type) {
            logger.error("Please give a license type, like MIT, GPLv3...")
            return
        } else if (!availableLicenseType.includes(type)){
            logger.error("License Type Not supported")
            return
        }
    
        const yearsArr: string[] = years.includes(",") ? years.split(",") : [years]
        const authorsArr: string[] = authors.includes(",") ? authors.split(",") : [authors]
        const linksArr: string[] = links.includes(",") ? links.split(",") : [links]

        if(yearsArr.length !== authorsArr.length || authorsArr.length !== linksArr.length) {
            logger.error("years, authors, links must have same counts!")
            return
        }

        let copyrights: Copyright[] = []

        for (let i = 0; i < yearsArr.length; i++) {
            copyrights.push({
                year: yearsArr[i],
                author: authorsArr[i],
                link: linksArr[i]
            })
        }

        if(copyrights.length <= 0) {
            logger.error("years, authors, links loading failed!")
            return
        }

        const msg = generateLicense({
            cwd,
            license: type,
            date,
            copyrights
        })

        logger.info(`Generated License: ${msg}`)
    })

cli.help()
cli.version(version)
cli.parse()

restoreCursor()