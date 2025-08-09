"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
} from "@/components/Icons";

interface ConfigStatusProps {
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function ConfigStatus({ onRefresh, isLoading }: ConfigStatusProps) {
  const [configStatus, setConfigStatus] = useState<{
    isRuntimeActive: boolean;
    lastModified?: string;
    source: "default" | "runtime";
    error?: string;
  }>({
    isRuntimeActive: false,
    source: "default",
  });

  const checkConfigStatus = async () => {
    try {
      // Check if runtime config exists and is being used
      const response = await fetch("/config.json?" + Date.now(), {
        cache: "no-store",
      });

      if (response.ok) {
        const lastModified = response.headers.get("last-modified");
        setConfigStatus({
          isRuntimeActive: true,
          source: "runtime",
          lastModified: lastModified || undefined,
        });
      } else {
        setConfigStatus({
          isRuntimeActive: false,
          source: "default",
        });
      }
    } catch {
      setConfigStatus({
        isRuntimeActive: false,
        source: "default",
        error: "Failed to check config status",
      });
    }
  };

  useEffect(() => {
    checkConfigStatus();
  }, []);

  const handleRefresh = () => {
    checkConfigStatus();
    onRefresh?.();
  };

  const getStatusIcon = () => {
    if (configStatus.error) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    if (configStatus.isRuntimeActive) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  const getStatusColor = () => {
    if (configStatus.error) return "destructive";
    return "default";
  };

  const getStatusMessage = () => {
    if (configStatus.error) {
      return configStatus.error;
    }
    if (configStatus.isRuntimeActive) {
      return "Runtime configuration is active. Changes will take effect immediately without rebuilding.";
    }
    return "Using default configuration from source code. Initialize runtime config for production editing.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Configuration Status</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Alert
        variant={getStatusColor()}
        className="backdrop-blur-xs bg-white/50 dark:bg-black/50"
      >
        <div className="flex items-start gap-3">
          {getStatusIcon()}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <AlertDescription className="text-sm">
                {getStatusMessage()}
              </AlertDescription>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>Source:</span>
                <Badge
                  variant={
                    configStatus.isRuntimeActive ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {configStatus.source === "runtime"
                    ? "Runtime Config"
                    : "Default Config"}
                </Badge>
              </div>
              {configStatus.lastModified && (
                <div>
                  Last modified:{" "}
                  {new Date(configStatus.lastModified).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </Alert>

      {configStatus.isRuntimeActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-muted-foreground bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
        >
          <strong>Production Mode Active:</strong> Your configuration changes
          are saved to{" "}
          <code className="bg-green-100 dark:bg-green-900 px-1 rounded">
            public/config.json
          </code>{" "}
          and will persist across deployments without requiring a rebuild.
        </motion.div>
      )}
    </motion.div>
  );
}
