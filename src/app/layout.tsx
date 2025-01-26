import ChatLinks from "./components/chat-links/ChatLinks";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body className="min-h-screen grid grid-cols-[12rem,1fr]">
        <div className="bg-gray-100 sticky top-0 h-screen overflow-y-auto">
          <ChatLinks />
        </div>
        {children}
      </body>
    </html>
  );
}
