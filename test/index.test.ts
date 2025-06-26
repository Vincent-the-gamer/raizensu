import { it } from "vitest"
import { generateLicense, License } from "../src"
import path from "node:path"

it("Write GPLv3", () => {
    generateLicense({
        license: License.GPLv3,
        cwd: path.resolve(__dirname, "../../"),
        date: "June 26th, 2025",
        years: "2025-present",
        author: "Vincent-the-gamer",
        link: "<https://github.com/Vincent-the-gamer>"
    })
})