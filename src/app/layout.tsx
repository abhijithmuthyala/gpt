import ChatLinks from "./components/chat-links/ChatLinks";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="grid sm:grid-cols-[12rem_1fr] grow">
          <Sidebar>
            <ChatLinks />
          </Sidebar>
          {children}
        </div>
      </body>
    </html>
  );
}
