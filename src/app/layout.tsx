import ChatLinks from "./components/chat-links/ChatLinks";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen grid grid-cols-[12rem_1fr]">
        <div className="bg-gray-100 sticky top-0 h-screen overflow-y-auto overflow-x-hidden">
          <ChatLinks />
        </div>
        {children}
      </body>
    </html>
  );
}
