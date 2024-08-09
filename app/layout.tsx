import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pathsala",
  description: "Buy courses online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
