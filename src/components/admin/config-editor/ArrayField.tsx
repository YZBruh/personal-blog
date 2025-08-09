"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ARRAY_TEMPLATES, CONFIG_FIELD_TYPES } from "./types";

interface ArrayFieldProps {
  path: string;
  value: unknown[];
  fieldKey: string;
  description?: string;
  onChangeAction: (path: string, value: unknown) => void;
}

const MotionButton = motion.create(Button);

const getAddButtonText = (fieldKey: string) => {
  const mapping: Record<string, string> = {
    social: "Add Social Media",
    projects: "Add Project",
    navItems: "Add Navigation Item",
    heroButtons: "Add Hero Button",
  };

  return mapping[fieldKey] || `Add ${fieldKey.slice(0, -1)}`;
};

export function ArrayField({
  path,
  value,
  fieldKey,
  onChangeAction,
}: ArrayFieldProps) {
  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className="space-y-2 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
    >
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div>
          <label className="text-sm font-medium capitalize">
            {fieldKey.replace(/([A-Z])/g, " $1").trim()}
          </label>
          {CONFIG_FIELD_TYPES[fieldKey]?.description && (
            <p className="text-xs text-muted-foreground">
              {CONFIG_FIELD_TYPES[fieldKey].description}
            </p>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MotionButton
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const template =
                ARRAY_TEMPLATES[fieldKey as keyof typeof ARRAY_TEMPLATES] || "";
              const newValue = [...value, template];
              onChangeAction(path, newValue);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getAddButtonText(fieldKey)}
          </MotionButton>
        </motion.div>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {value.map((item: unknown, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0, scale: 0.8 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                height: { duration: 0.3 },
                scale: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="pl-4 border-l-2 border-border"
            >
              {typeof item === "object" && item !== null ? (
                <div className="space-y-2">
                  {Object.entries(item as Record<string, unknown>).map(
                    ([itemKey, itemValue]) => (
                      <div key={itemKey} className="space-y-1">
                        <label className="text-xs font-medium capitalize">
                          {itemKey.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        {Array.isArray(itemValue) ? (
                          <div className="flex flex-wrap gap-2">
                            {itemValue.map((tag, tagIndex) => (
                              <motion.div
                                key={tagIndex}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center gap-1"
                              >
                                <Input
                                  value={tag}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                  ) => {
                                    const newArray = [...value];
                                    const currentItem = newArray[
                                      index
                                    ] as Record<string, unknown>;
                                    newArray[index] = {
                                      ...currentItem,
                                      [itemKey]: [
                                        ...(
                                          currentItem[itemKey] as unknown[]
                                        ).slice(0, tagIndex),
                                        e.target.value,
                                        ...(
                                          currentItem[itemKey] as unknown[]
                                        ).slice(tagIndex + 1),
                                      ],
                                    };
                                    onChangeAction(path, newArray);
                                  }}
                                  className="text-sm w-32"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newArray = [...value];
                                    const currentItem = newArray[
                                      index
                                    ] as Record<string, unknown>;
                                    newArray[index] = {
                                      ...currentItem,
                                      [itemKey]: (
                                        currentItem[itemKey] as unknown[]
                                      ).filter(
                                        (_: unknown, i: number) =>
                                          i !== tagIndex,
                                      ),
                                    };
                                    onChangeAction(path, newArray);
                                  }}
                                >
                                  ×
                                </Button>
                              </motion.div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newArray = [...value];
                                const currentItem = newArray[index] as Record<
                                  string,
                                  unknown
                                >;
                                newArray[index] = {
                                  ...currentItem,
                                  [itemKey]: [
                                    ...(currentItem[itemKey] as unknown[]),
                                    "",
                                  ],
                                };
                                onChangeAction(path, newArray);
                              }}
                            >
                              Add Tag
                            </Button>
                          </div>
                        ) : itemKey === "description" ? (
                          <Textarea
                            value={itemValue as string}
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) => {
                              const newArray = [...value];
                              const currentItem = newArray[index] as Record<
                                string,
                                unknown
                              >;
                              newArray[index] = {
                                ...currentItem,
                                [itemKey]: e.target.value,
                              };
                              onChangeAction(path, newArray);
                            }}
                            className="min-h-[100px] text-sm"
                          />
                        ) : (
                          <Input
                            value={itemValue as string}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              const newArray = [...value];
                              const currentItem = newArray[index] as Record<
                                string,
                                unknown
                              >;
                              newArray[index] = {
                                ...currentItem,
                                [itemKey]: e.target.value,
                              };
                              onChangeAction(path, newArray);
                            }}
                            className="text-sm"
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <Input
                  value={item as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newArray = [...value];
                    newArray[index] = e.target.value;
                    onChangeAction(path, newArray);
                  }}
                  className="text-sm"
                />
              )}
              <motion.div
                className="flex justify-end gap-2 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                <MotionButton
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const newArray = value.filter(
                      (_: unknown, i: number) => i !== index,
                    );
                    onChangeAction(path, newArray);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </MotionButton>
                {index > 0 && (
                  <MotionButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newArray = [...value];
                      [newArray[index - 1], newArray[index]] = [
                        newArray[index],
                        newArray[index - 1],
                      ];
                      onChangeAction(path, newArray);
                    }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Move Up
                  </MotionButton>
                )}
                {index < value.length - 1 && (
                  <MotionButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newArray = [...value];
                      [newArray[index], newArray[index + 1]] = [
                        newArray[index + 1],
                        newArray[index],
                      ];
                      onChangeAction(path, newArray);
                    }}
                    whileHover={{ scale: 1.05, y: 4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Move Down
                  </MotionButton>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
