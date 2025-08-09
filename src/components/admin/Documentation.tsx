"use client";

import { motion } from "framer-motion";
import * as Icons from "@/components/Icons";
import { Button } from "@/components/ui/button";

export function Documentation() {
  const buttonVariants = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "gradient",
    "gradient-secondary",
    "outline-gradient",
  ];

  const buttonSizes = ["default", "sm", "lg", "xl", "2xl", "icon"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Icons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Available Icons</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(Icons).map(
            ([name, IconComponent]) =>
              typeof IconComponent === "function" && (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm text-muted-foreground">{name}</span>
                </div>
              ),
          )}
        </div>
      </section>

      {/* Button Variants Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Button Variants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {buttonVariants.map((variant) => (
            <div
              key={variant}
              className="p-4 rounded-lg border bg-card space-y-2"
            >
              <Button variant={variant as never} className="w-full">
                {variant}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                variant=&quot;{variant}&quot;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Button Sizes Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Button Sizes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {buttonSizes.map((size) => (
            <div key={size} className="p-4 rounded-lg border bg-card space-y-2">
              <Button
                size={size as never}
                className={size === "icon" ? "aspect-square" : "w-full"}
              >
                {size === "icon" ? <Icons.Plus /> : size}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                size=&quot;{size}&quot;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Configuration Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Configuration Tips</h2>
        <div className="prose dark:prose-invert max-w-none">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use icon names from the list above in the <code>footerItems</code>{" "}
              configuration
            </li>
            <li>
              Button configurations in <code>heroButtons</code> support all
              variants and sizes listed above
            </li>
            <li>
              Social media platforms support:{" "}
              <code>
                Github, Twitter, Linkedin, Mail, Telegram, Facebook, Instagram,
                Youtube, Discord, ExternalLink
              </code>
            </li>
            <li>
              The about page content supports markdown links in format:{" "}
              <code>[link text](url)</code>
            </li>
          </ul>
        </div>
      </section>
    </motion.div>
  );
}
