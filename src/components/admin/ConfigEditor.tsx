"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrayField } from "./config-editor/ArrayField";
import { SimpleField } from "./config-editor/SimpleField";
import {
  CONFIG_CATEGORIES,
  type ConfigEditorProps,
} from "./config-editor/types";
import { ConfigSection } from "./config-editor/ConfigSection";
import { useToast } from "@/hooks/use-toast";

export function ConfigEditor({
  config,
  onSaveAction,
  disabled,
}: ConfigEditorProps) {
  const [configState, setConfigState] = useState(config);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setError(null);
      onSaveAction(configState);
      toast({
        title: "Success",
        description: "Configuration saved successfully",
        variant: "success",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save configuration";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setConfigState(config);
    setError(null);
    toast({
      title: "Success",
      description: "Configuration reset to defaults",
      variant: "default",
    });
  };

  const handleChange = (path: string, value: unknown) => {
    setConfigState((prev) => {
      const newState = { ...prev };
      const keys = path.split(".");
      let current: Record<string, unknown> = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const renderField = (key: string, value: unknown, path: string = "") => {
    const currentPath = path ? `${path}.${key}` : key;

    if (value === null || value === undefined) {
      return null;
    }

    if (Array.isArray(value)) {
      return (
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrayField
            path={currentPath}
            value={value}
            fieldKey={key}
            onChangeAction={handleChange}
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        key={currentPath}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SimpleField
          path={currentPath}
          value={value}
          fieldKey={key}
          onChange={handleChange}
        />
      </motion.div>
    );
  };

  const renderFieldsForCategory = (fields: string[]) => {
    return fields.map((field) => {
      if (field in configState) {
        return renderField(
          field,
          (configState as Record<string, unknown>)[field],
        );
      }
      return null;
    });
  };

  return (
    <ScrollArea className="h-full w-full pr-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 py-6"
      >
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Alert variant="destructive">{error}</Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 w-full"
        >
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">
            Configuration Editor
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <motion.div
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={disabled}
                className="w-full sm:w-auto"
              >
                Reset to Defaults
              </Button>
            </motion.div>
            <motion.div
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleSave}
                disabled={disabled}
                className="w-full sm:w-auto"
              >
                {disabled ? (
                  <>
                    <LoadingSpinner className="mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Configuration"
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {Object.entries(CONFIG_CATEGORIES).map(([key, category], index) => (
            <ConfigSection
              key={key}
              title={category.title}
              description={category.description}
              defaultOpen={index === 0}
            >
              <div className="space-y-4">
                {renderFieldsForCategory(category.fields)}
              </div>
            </ConfigSection>
          ))}
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
}
