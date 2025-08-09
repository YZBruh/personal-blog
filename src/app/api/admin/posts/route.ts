import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createPost, getAllPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password, post } = await request.json();

    if (!isAuthenticated(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const success = await createPost(post, password);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to create post" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
