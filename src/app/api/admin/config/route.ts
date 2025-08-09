import { NextResponse } from "next/server";
import { ADMIN_PASSWORD } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { password, config } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Save config to public/config.json for runtime modification
    const configPath = path.join(process.cwd(), "public/config.json");
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      message: "Configuration saved to public/config.json",
    });
  } catch (error) {
    console.error("Config save error:", error);
    return NextResponse.json(
      { error: "Failed to save configuration" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), "public/config.json");

    try {
      const configContent = await fs.readFile(configPath, "utf8");
      const config = JSON.parse(configContent);
      return NextResponse.json({ config });
    } catch {
      // If config.json doesn't exist, return indication that it needs to be initialized
      return NextResponse.json({
        config: null,
        needsInit: true,
      });
    }
  } catch (error) {
    console.error("Config load error:", error);
    return NextResponse.json(
      { error: "Failed to load configuration" },
      { status: 500 },
    );
  }
}
