"use client";
import React from "react";
import * as Icons from "@/components/Icons";
import Link from "next/link";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import CustomSocialLinks from "./CustomSocialLinks";
import { FooterLoading } from "./loading";
import { motion } from "framer-motion";

export default function Footer() {
  const [loading, setLoading] = React.useState(true);
  const { config: SITE_CONFIG } = useSiteConfig();

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <FooterLoading />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="border-t border-border bg-linear-to-b from-background to-background/50 backdrop-blur-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16"
        >
          <motion.div variants={item} className="flex flex-col gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-foreground bg-clip-text bg-linear-to-r from-primary to-primary/80"
            >
              {SITE_CONFIG.footerTitle}
            </motion.div>
            <div className="text-base text-muted-foreground/80">
              © {new Date().getFullYear()} {SITE_CONFIG.copyright}
            </div>
            <CustomSocialLinks
              platforms={["all"]}
              className="flex-wrap gap-4"
              iconClassName="hover:scale-110 transition-transform duration-300"
              direction="row"
            />
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-6">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/80">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-4">
              {SITE_CONFIG.footerItems.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.icon && Icons[link.icon as keyof typeof Icons]
                      ? React.createElement(
                          Icons[
                            link.icon as keyof typeof Icons
                          ] as React.ComponentType<{ className?: string }>,
                          {
                            className: "h-4 w-4",
                          },
                        )
                      : null}
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-6">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/80">
              Contact
            </h3>
            <div className="flex flex-col gap-4">
              <p className="text-base text-muted-foreground/80">
                {SITE_CONFIG.contactDescription}
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${SITE_CONFIG.email}`}
                className="group text-base text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 w-fit rounded-lg hover:bg-secondary/30 px-3 py-2"
              >
                <Icons.Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="group-hover:underline">Email me</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
