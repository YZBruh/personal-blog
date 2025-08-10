"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/blog";

interface ClientRecentPostsProps {
  posts: Post[];
}

export function ClientRecentPosts({ posts }: ClientRecentPostsProps) {
  return (
    <section className="container px-4 sm:px-8 lg:px-12 py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Recent Posts
          </motion.h2>
          <Button
            asChild
            variant="link"
            size="lg"
            className="text-lg hover:translate-x-1 transition-transform"
          >
            <Link href="/blogs">View all posts →</Link>
          </Button>
        </motion.div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              staggerChildren: 0.1,
            }}
            className="grid grid-cols-1 gap-8 sm:gap-12 max-w-6xl mx-auto"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <BlogCard post={post} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
