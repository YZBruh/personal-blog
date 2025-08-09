"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Button } from "@/components/ui/button";

export function ClientHeroSection() {
  const { config: SITE_CONFIG } = useSiteConfig();

  return (
    <section className="container relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 md:px-8 lg:px-12 py-12 md:py-24 lg:py-36">
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center space-y-8 md:space-y-10 lg:space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight"
        >
          <span className="bg-linear-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent hover:from-primary/90 hover:to-primary transition-colors duration-300">
            {SITE_CONFIG.homeTitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] leading-relaxed"
        >
          {SITE_CONFIG.homeDescription}
        </motion.p>

        <AnimatePresence>
          {SITE_CONFIG.heroButtons && SITE_CONFIG.heroButtons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-6 md:mt-8 lg:mt-10 w-full sm:w-auto"
            >
              {SITE_CONFIG.heroButtons.map((button, index) => (
                <Button
                  key={index}
                  asChild
                  size={(button.size as never) || "lg"}
                  variant={(button.variant as never) || "default"}
                  className="w-full sm:w-auto transform hover:scale-105 transition-transform duration-200"
                >
                  <Link href={button.href}>{button.text}</Link>
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
