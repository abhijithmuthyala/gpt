import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nanoGPT: AI Chat Assistant",
  description: "Your personal AI assistant powered by Gemini",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="font-normal text-primary">{children}</body>
    </html>
  );
}
