import ChatLinks from "../components/chat-links/ChatLinks";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grid sm:grid-cols-[14rem_1fr] grow">
        <Sidebar>
          <ChatLinks />
        </Sidebar>
        {children}
      </div>
    </div>
  );
}
