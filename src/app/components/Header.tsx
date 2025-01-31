import ChatLinks from "./chat-links/ChatLinks";
import HamburgerMenu from "./HamburgerMenu";
import NewChat from "./NewChat";

export default function Header() {
  return (
    <header className="px-3 flex sticky z-50 top-0 items-center gap-x-4 py-4 backdrop-blur-sm w-full">
      <NewChat />
      <div className="sm:hidden">
        <HamburgerMenu>
          <ChatLinks />
        </HamburgerMenu>
      </div>
    </header>
  );
}
