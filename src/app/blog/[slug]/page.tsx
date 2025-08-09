import { getPostBySlug, extractHeadings } from "@/lib/blog";
import { BlogPostContent } from "./BlogPostContent";
import { ArrowLeft } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col bg-background dark:bg-dark-background items-center justify-center">
        <div className="container max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8 text-base sm:text-lg max-w-lg mx-auto">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            asChild
            className="transition-all duration-300 hover:scale-105 px-6 py-2"
          >
            <Link href="/blogs" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blogs</span>
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const headings = extractHeadings(post.content);

  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-5 md:px-6 py-6 sm:py-8 md:py-12 transition-all duration-300">
      <BlogPostContent post={post} headings={headings} />
    </div>
  );
}
