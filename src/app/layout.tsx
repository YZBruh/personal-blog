import { Geist } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadConfigForServerSync } from "@/lib/server-config";
import { generateMetadata } from "@/config/metadata";
import { Toaster } from "@/components/ui/toaster";

const config = loadConfigForServerSync();
const appleTitle = config.siteName;

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = generateMetadata(config);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content={appleTitle} />
      </head>
      <body className={`${geist.className} flex min-h-screen flex-col`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          storageKey="theme"
        >
          <Toaster />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
