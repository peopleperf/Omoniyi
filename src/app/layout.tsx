import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/supabase-auth-provider";
import Navigation from "@/components/navigation";
import { ThemeProvider } from '@/components/theme-provider';
import ClientWrapper from '@/components/client-wrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omoniyi Ipaye - People Operations & HR Tech Innovation",
  description: "Global People Operations leader specializing in HR compliance, automation, and technology innovation. Building scalable people operations for the future of work.",
  keywords: ["People Operations", "HR Compliance", "HR Automation", "Global HR", "HR Technology", "Omoniyi Ipaye"],
  authors: [{ name: "Omoniyi Ipaye" }],
  openGraph: {
    title: "Omoniyi Ipaye - People Operations & HR Tech Innovation",
    description: "Global People Operations leader specializing in HR compliance, automation, and technology innovation.",
    url: "https://omoniyi-ipaye.com",
    siteName: "Omoniyi Ipaye",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omoniyi Ipaye - People Operations & HR Tech Innovation",
    description: "Global People Operations leader specializing in HR compliance, automation, and technology innovation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientWrapper>
            <AuthProvider>
              <Navigation />
              <main className="pt-16">
                {children}
              </main>
              <Toaster />
            </AuthProvider>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
