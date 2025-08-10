import { SITE_CONFIG } from "@/config/config";

export type SiteConfig = typeof SITE_CONFIG;

// Cache for server-side config to avoid repeated file system access
let serverConfigCache: SiteConfig | null = null;
let configCacheTime = 0;
const CACHE_DURATION = 30000; // 30 seconds cache for server-side

// Server-side config loader that can read from filesystem
export async function loadConfigForServer(): Promise<SiteConfig> {
  // Only run on server
  if (typeof window !== "undefined") {
    return SITE_CONFIG;
  }

  // Return cached config if it's still fresh
  const now = Date.now();
  if (serverConfigCache && now - configCacheTime < CACHE_DURATION) {
    return serverConfigCache;
  }

  try {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");

    const configPath = join(process.cwd(), "public", "config.json");
    const configFile = await readFile(configPath, "utf-8");
    const runtimeConfig = JSON.parse(configFile);

    // Merge with default config and cache
    const mergedConfig = { ...SITE_CONFIG, ...runtimeConfig };
    serverConfigCache = mergedConfig;
    configCacheTime = now;

    return mergedConfig;
  } catch {
    // If config.json doesn't exist or is invalid, cache and return default
    serverConfigCache = SITE_CONFIG;
    configCacheTime = now;
    return SITE_CONFIG;
  }
}

// Synchronous server-side config loader for layouts
export function loadConfigForServerSync(): SiteConfig {
  // Only run on server
  if (typeof window !== "undefined") {
    return SITE_CONFIG;
  }

  // Return cached config if it's still fresh
  const now = Date.now();
  if (serverConfigCache && now - configCacheTime < CACHE_DURATION) {
    return serverConfigCache;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { join } = require("path");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { readFileSync, existsSync } = require("fs");

    const configPath = join(process.cwd(), "public", "config.json");

    if (existsSync(configPath)) {
      const configFile = readFileSync(configPath, "utf-8");
      const runtimeConfig = JSON.parse(configFile);

      // Merge with default config and cache
      const mergedConfig = { ...SITE_CONFIG, ...runtimeConfig };
      serverConfigCache = mergedConfig;
      configCacheTime = now;

      return mergedConfig;
    }
  } catch {
    // If config.json doesn't exist or is invalid, fall through to default
  }

  // Cache and return default config
  serverConfigCache = SITE_CONFIG;
  configCacheTime = now;
  return SITE_CONFIG;
}

// Utility to invalidate server-side cache
export function invalidateServerConfigCache(): void {
  serverConfigCache = null;
  configCacheTime = 0;
}
