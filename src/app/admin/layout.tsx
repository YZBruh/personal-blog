import { Metadata } from "next";
import { loadConfigForServerSync } from "@/lib/server-config";
import { generateMetadata } from "@/config/metadata";

const config = loadConfigForServerSync();

export const metadata: Metadata = {
  ...generateMetadata(config),
  title: `Admin - ${config.name} | ${config.siteName}`,
  description: "Site Configuration Management",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primary-foreground dark:bg-primary-background">
      {children}
    </div>
  );
}
