"use client";

import { motion } from "framer-motion";
import { Post } from "@/lib/blog";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Clock, Calendar, Tags } from "@/components/Icons";
import ReactMarkdown from "react-markdown";
import { ComponentPropsWithoutRef } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { formatDate } from "@/lib/utils";

interface BlogPostContentProps {
  post: Post;
  headings: Array<{ id: string; text: string; level: number }>;
}

export function BlogPostContent({ post, headings }: BlogPostContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <article className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="aspect-video relative overflow-hidden rounded-xl shadow-xl mb-8 md:mb-12"
            >
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          )}

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          {post.author && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 bg-secondary/50 p-4 rounded-lg"
            >
              <div className="font-medium text-lg">By {post.author}</div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 text-muted-foreground"
          >
            <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {post.tags?.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-sm font-medium transition-colors"
                >
                  <Tags className="h-4 w-4 inline-block mr-1" />
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="border-b border-primary/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="prose dark:prose-invert max-w-none pt-8 leading-relaxed
    prose-h1:text-4xl prose-h1:font-bold
    prose-h2:text-3xl prose-h2:font-bold
    prose-h3:text-2xl prose-h3:font-bold
    prose-h4:text-xl prose-h4:font-bold
    prose-p:my-6 prose-p:leading-8
    prose-a:text-primary prose-a:transition-colors prose-a:duration-200
    prose-img:rounded-xl prose-img:shadow-xl
    prose-pre:bg-secondary/50
    prose-pre:p-6
    prose-pre:rounded-xl
    prose-code:text-primary
    prose-blockquote:border-l-4
    prose-blockquote:border-primary
    prose-blockquote:bg-secondary/20
    prose-blockquote:p-4
    prose-blockquote:rounded-r-lg"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              [rehypeHighlight, { detect: true, ignoreMissing: true }],
            ]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  {...props}
                  className="scroll-mt-24 text-4xl font-bold my-8"
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  {...props}
                  className="scroll-mt-24 text-3xl font-bold my-6"
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  {...props}
                  className="scroll-mt-24 text-2xl font-bold my-5"
                />
              ),
              h4: ({ ...props }) => (
                <h4
                  {...props}
                  className="scroll-mt-24 text-xl font-bold my-4"
                />
              ),
              h5: ({ ...props }) => (
                <h5
                  {...props}
                  className="scroll-mt-24 text-lg font-bold my-3"
                />
              ),
              h6: ({ ...props }) => (
                <h6
                  {...props}
                  className="scroll-mt-24 text-base font-bold my-2"
                />
              ),
              p: ({ ...props }) => <p {...props} className="my-4 leading-8" />,
              ul: ({ ...props }) => (
                <ul
                  {...props}
                  className="my-6 ml-6 list-disc [&>li]:mt-3 marker:text-primary"
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  {...props}
                  className="my-6 ml-6 list-decimal [&>li]:mt-3 marker:text-primary"
                />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  {...props}
                  className="my-6 border-l-4 border-primary bg-secondary/20 p-4 rounded-r-lg italic"
                />
              ),
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-8">
                  <table
                    {...props}
                    className="w-full border-collapse text-sm"
                  />
                </div>
              ),
              th: ({ ...props }) => (
                <th
                  {...props}
                  className="border border-slate-200 px-4 py-3 text-left font-bold bg-secondary/30"
                />
              ),
              td: ({ ...props }) => (
                <td {...props} className="border border-slate-200 px-4 py-3" />
              ),
              a: ({ ...props }) => (
                <a
                  {...props}
                  className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-2 transition-colors"
                />
              ),
              code: ({
                inline,
                ...props
              }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => (
                <code
                  {...props}
                  className={
                    inline
                      ? "bg-secondary/50 px-1.5 py-0.5 rounded-md text-sm font-medium"
                      : ""
                  }
                />
              ),
              img: ({ ...props }) => (
                <img
                  {...props}
                  className="my-8 rounded-xl shadow-lg max-w-full h-auto"
                />
              ),
              pre: ({ ...props }) => (
                <pre
                  {...props}
                  className="my-8 overflow-x-auto rounded-xl bg-secondary/50 p-6"
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>
      </article>

      <aside className="hidden lg:block sticky top-24 h-fit">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
}
