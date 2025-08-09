import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CONFIG_FIELD_TYPES } from "./types";
import { useState } from "react";

interface SimpleFieldProps {
  path: string;
  value: unknown;
  fieldKey: string;
  description?: string;
  onChange: (path: string, value: unknown) => void;
}

export function SimpleField({
  path,
  value,
  fieldKey,
  onChange,
}: SimpleFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const shouldUseTextarea = (key: string, value: unknown) => {
    return (
      typeof value === "string" &&
      (value.includes("\n") ||
        value.length > 100 ||
        key.includes("description") ||
        key.includes("content"))
    );
  };

  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.1 },
      }}
      className="space-y-2 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
    >
      <div className="flex flex-col space-y-1">
        <motion.label
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-medium capitalize"
        >
          {fieldKey.replace(/([A-Z])/g, " $1").trim()}
        </motion.label>
        {CONFIG_FIELD_TYPES[fieldKey]?.description && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-muted-foreground"
          >
            {CONFIG_FIELD_TYPES[fieldKey].description}
          </motion.p>
        )}
      </div>

      {typeof value === "boolean" ? (
        <Select
          value={value.toString()}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChange(path, e.target.value === "true")
          }
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </Select>
      ) : shouldUseTextarea(fieldKey, value) ? (
        <Textarea
          value={value as string}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onChange(path, e.target.value)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`font-mono transition-all duration-200 ${
            isFocused ? "min-h-[300px]" : "min-h-[100px]"
          }`}
        />
      ) : (
        <Input
          type={typeof value === "number" ? "number" : "text"}
          value={value as string | number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(path, e.target.value)
          }
          className="font-mono"
        />
      )}
    </motion.div>
  );
}
