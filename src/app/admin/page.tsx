"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X, Eye, EyeOff } from "@/components/Icons";
import { SITE_CONFIG } from "@/config/config";
import { invalidateConfigCache } from "@/hooks/useSiteConfig";
import type { AdminState } from "@/types/admin";
import { PostsList } from "@/components/admin/PostsList";
import { ConfigEditor } from "@/components/admin/ConfigEditor";
import { Documentation } from "@/components/admin/Documentation";
import { ConfigStatus } from "@/components/admin/ConfigStatus";

export default function AdminPage() {
  const [state, setState] = useState<AdminState>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
    success: null,
    config: SITE_CONFIG,
    posts: [],
    configInitialized: false,
  });
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("config");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          success: "Authentication successful!",
        }));
      } else {
        throw new Error("Invalid password");
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Authentication failed",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const dismissAlert = () => {
    if (state.successTimeout) {
      clearTimeout(state.successTimeout);
    }
    setState((prev) => ({ ...prev, success: null, error: null }));
  };

  const fetchPosts = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await fetch("/api/admin/posts");
      const data = await response.json();
      setState((prev) => ({ ...prev, posts: data.posts }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch posts",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const checkConfigInit = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/admin/init-config?password=${password}`,
      );
      const data = await response.json();
      setState((prev) => ({ ...prev, configInitialized: data.exists }));
    } catch (error) {
      console.warn("Failed to check config initialization:", error);
    }
  }, [password]);

  const initializeConfig = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch("/api/admin/init-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setState((prev) => ({
          ...prev,
          configInitialized: true,
          success: data.message,
        }));
      } else {
        throw new Error(data.error || "Failed to initialize config");
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Failed to initialize config",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSaveConfig = async (updatedConfig: Record<string, unknown>) => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        success: null,
      }));

      // Initialize config.json if it doesn't exist
      if (!state.configInitialized) {
        await initializeConfig();
      }

      const response = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, config: updatedConfig }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Failed to save configuration");

      setState((prev) => ({
        ...prev,
        config: updatedConfig,
        success: data.message || "Configuration saved successfully!",
      }));

      // Invalidate the config cache to force reload of new config
      invalidateConfigCache();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Error saving configuration",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      fetchPosts();
      checkConfigInit();
    }
  }, [state.isAuthenticated, checkConfigInit]);

  useEffect(() => {
    if (state.success) {
      const timeout = setTimeout(() => {
        setState((prev) => ({ ...prev, success: null }));
      }, 5000);
      setState((prev) => ({ ...prev, successTimeout: timeout }));
      return () => clearTimeout(timeout);
    }
  }, [state.success]);

  if (!state.isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-background dark:bg-background">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-full max-w-md mx-auto px-6 py-12 backdrop-blur-xs bg-white/80 dark:bg-black/80 rounded-xl shadow-lg"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-center bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
              Admin Login
            </motion.h1>
            <div className="space-y-4">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={state.isLoading}
                    className="pr-10 backdrop-blur-xs bg-white/50 dark:bg-black/50"
                  />
                </motion.div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent transition-opacity"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={state.isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
                  disabled={state.isLoading}
                >
                  {state.isLoading ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>
            </div>
            <AnimatePresence mode="wait">
              {state.error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Alert variant="destructive">
                    <AlertDescription>{state.error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-b from-background to-background/95 dark:from-background dark:to-background/95"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            layout
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
          >
            <TabsList className="relative backdrop-blur-xs bg-white/50 dark:bg-black/50 rounded-lg">
              <TabsTrigger
                className="hover:text-primary hover:scale-105 transition-all duration-200"
                value="config"
              >
                Configuration
              </TabsTrigger>
              <TabsTrigger
                className="hover:text-primary hover:scale-105 transition-all duration-200"
                value="posts"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                className="hover:text-primary hover:scale-105 transition-all duration-200"
                value="docs"
              >
                Documentation
              </TabsTrigger>
            </TabsList>
            {state.isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <LoadingSpinner className="w-6 h-6" />
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {(state.error || state.success) && (
              <motion.div
                key="alert"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 20 }}
                className="mb-6"
              >
                <Alert
                  variant={state.error ? "destructive" : "default"}
                  className="relative backdrop-blur-xs bg-white/50 dark:bg-black/50"
                >
                  <AlertDescription>
                    {state.error || state.success}
                  </AlertDescription>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 hover:bg-white/20 dark:hover:bg-black/20"
                    onClick={dismissAlert}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <TabsContent
              key="config"
              value="config"
              className="mt-6 min-h-[calc(100vh-200px)]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <ConfigStatus
                  onRefresh={() => checkConfigInit()}
                  isLoading={state.isLoading}
                />
                {!state.configInitialized && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="backdrop-blur-xs bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Initialize Runtime Configuration
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 mb-4">
                      The runtime configuration file hasn&apos;t been created
                      yet. This file allows you to modify settings in production
                      without rebuilding the application.
                    </p>
                    <Button
                      onClick={initializeConfig}
                      disabled={state.isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {state.isLoading ? (
                        <>
                          <LoadingSpinner className="mr-2" />
                          Initializing...
                        </>
                      ) : (
                        "Initialize Config File"
                      )}
                    </Button>
                  </motion.div>
                )}
                <ConfigEditor
                  config={state.config}
                  onSaveAction={handleSaveConfig}
                  disabled={state.isLoading}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="posts" value="posts" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <PostsList
                  posts={state.posts}
                  onDeleteAction={() => fetchPosts()}
                  password={password}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="docs" value="docs" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Documentation />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </motion.main>
  );
}
