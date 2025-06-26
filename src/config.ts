import { createConfigLoader } from "unconfig";
import type { Config } from "./types";
import { deepmerge } from "deepmerge-ts"
import { logger } from "../utils/logger";

export const defaultConfig: Partial<Config> = {
    cwd: process.cwd(),
    license: "MIT",
    filename: "LICENSE.txt",
    copyrights: []
}

export function defineConfig(config: Config): Config {
    return config
}

export async function resolveConfig(_config: Config, configCwd?: string): Promise<Config> {
    const loader = createConfigLoader<Config>({
        sources: [
            {
                files: [
                    'raizensu.config',
                ],
                extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json'],
            },
        ],
        cwd: configCwd || process.cwd(),
        merge: false,
    })

    const { config, sources } = await loader.load()

    if (!sources.length)
        return deepmerge(defaultConfig, _config)

    logger.info(`Config file found: ${sources[0]}`)

    return deepmerge(deepmerge(defaultConfig, config), _config)
}