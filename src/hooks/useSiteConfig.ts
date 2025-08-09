"use client";

import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/config/config";

export type SiteConfig = typeof SITE_CONFIG;

let cachedConfig: SiteConfig | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5000; // 5 seconds cache

export function useSiteConfig(): { config: SiteConfig; isLoading: boolean } {
  const [config, setConfig] = useState<SiteConfig>(cachedConfig || SITE_CONFIG);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedConfig);

  useEffect(() => {
    const loadConfig = async () => {
      const now = Date.now();

      // Return cached config if it's still fresh
      if (cachedConfig && now - lastFetchTime < CACHE_DURATION) {
        setConfig(cachedConfig);
        setIsLoading(false);
        return;
      }

      try {
        // Try to fetch the runtime config from public directory
        const response = await fetch("/config.json?" + now, {
          cache: "no-store",
        });

        if (response.ok) {
          const runtimeConfig = await response.json();

          // Merge with default config to ensure all properties exist
          const mergedConfig = { ...SITE_CONFIG, ...runtimeConfig };

          cachedConfig = mergedConfig;
          lastFetchTime = now;
          setConfig(mergedConfig);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.warn("Failed to load runtime config, using default:", error);
      }

      // Fallback to default config
      cachedConfig = SITE_CONFIG;
      lastFetchTime = now;
      setConfig(SITE_CONFIG);
      setIsLoading(false);
    };

    loadConfig();
  }, []);

  return { config, isLoading };
}

// Utility to invalidate cache (useful after config updates)
export function invalidateConfigCache(): void {
  cachedConfig = null;
  lastFetchTime = 0;
}

// Function to load config programmatically
export async function loadSiteConfig(): Promise<SiteConfig> {
  const now = Date.now();

  // Return cached config if it's still fresh
  if (cachedConfig && now - lastFetchTime < CACHE_DURATION) {
    return cachedConfig;
  }

  try {
    // Try to fetch the runtime config from public directory
    const response = await fetch("/config.json?" + now, {
      cache: "no-store",
    });

    if (response.ok) {
      const runtimeConfig = await response.json();

      // Merge with default config to ensure all properties exist
      const mergedConfig = { ...SITE_CONFIG, ...runtimeConfig };

      cachedConfig = mergedConfig;
      lastFetchTime = now;

      return mergedConfig;
    }
  } catch (error) {
    console.warn("Failed to load runtime config, using default:", error);
  }

  // Fallback to default config
  cachedConfig = SITE_CONFIG;
  lastFetchTime = now;
  return SITE_CONFIG;
}

// For server-side compatibility
export function getSiteConfigSync(): SiteConfig {
  // For server-side rendering, always return the default config
  if (typeof window === "undefined") {
    return SITE_CONFIG;
  }

  // For client-side, return cached config or default
  return cachedConfig || SITE_CONFIG;
}
