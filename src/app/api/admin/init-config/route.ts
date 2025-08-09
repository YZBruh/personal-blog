import { NextResponse } from "next/server";
import { ADMIN_PASSWORD } from "@/lib/auth";
import { SITE_CONFIG } from "@/config/config";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Path to the public config file
    const configPath = path.join(process.cwd(), "public/config.json");

    // Check if config.json already exists
    try {
      await fs.access(configPath);
      return NextResponse.json({
        success: true,
        message: "Config file already exists",
        existed: true
      });
    } catch {
      // File doesn't exist, create it
    }

    // Create the config.json file with current SITE_CONFIG
    await fs.writeFile(configPath, JSON.stringify(SITE_CONFIG, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      message: "Config file initialized successfully",
      existed: false
    });
  } catch (error) {
    console.error("Config initialization error:", error);
    return NextResponse.json(
      { error: "Failed to initialize configuration" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const configPath = path.join(process.cwd(), "public/config.json");

    try {
      await fs.access(configPath);
      return NextResponse.json({ exists: true });
    } catch {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error("Config check error:", error);
    return NextResponse.json(
      { error: "Failed to check configuration" },
      { status: 500 },
    );
  }
}
