"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import CustomSocialLinks from "@/components/CustomSocialLinks";
import Link from "next/link";

const RenderContent = ({ content }: { content: string }) => {
  const parts = content.split(/(\[.*?\]\(.*?\))/g);

  return (
    <>
      {parts.map((part, index) => {
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const [, text, url] = linkMatch;
          return (
            <Link
              key={index}
              href={url}
              className="text-primary hover:underline transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </Link>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default function AboutPage() {
  const { config: SITE_CONFIG } = useSiteConfig();
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {SITE_CONFIG.aboutTitle}
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            {SITE_CONFIG.aboutDescription}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="border-b border-accent"
        />
        <div className="container px-4 py-8 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {SITE_CONFIG.aboutContentTitle}
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
                  <RenderContent content={SITE_CONFIG.aboutContent} />
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="pt-6"
              >
                <h3 className="text-2xl font-semibold mb-6">Connect with me</h3>
                <CustomSocialLinks
                  platforms={["Telegram", "Mail"]}
                  iconClassName="h-8 w-8 hover:scale-110 transition-transform duration-200"
                  className="gap-8"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 w-full"
            >
              <div className="aspect-16/9 relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={SITE_CONFIG.aboutHeroImage}
                  alt="About page hero image"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
