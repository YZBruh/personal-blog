import { Metadata } from "next";
import { loadConfigForServerSync } from "@/lib/server-config";
import { generateMetadata } from "@/config/metadata";

const config = loadConfigForServerSync();

export const metadata: Metadata = {
  ...generateMetadata(config),
  title: `Projects - ${config.name} | ${config.siteName}`,
  description: config.projectDescription,
};

export default function ProjectsLayout({
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
