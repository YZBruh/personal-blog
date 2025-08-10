import { loadConfigForServerSync } from "@/lib/server-config";
import { getAllPosts } from "@/lib/blog";
import { ClientBlogContent } from "./ClientBlogContent";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const config = loadConfigForServerSync();

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="space-y-8 sm:space-y-12">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 transition-colors">
              No Posts Found
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
              There are no blog posts available at the moment.
            </p>
          </div>
        ) : (
          <ClientBlogContent
            title={config.blogTitle}
            description={config.blogDescription}
            posts={posts}
          />
        )}
      </div>
    </div>
  );
}
