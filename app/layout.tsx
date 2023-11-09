import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryClientProvider from "./QueryClientProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPDf",
  description: "For a personal project and learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <QueryClientProvider>
          <body className={inter.className}>{children}</body>
        </QueryClientProvider>
        <Toaster />
      </html>
    </ClerkProvider>
  );
}
