import ChatLinks from "./chat-links/ChatLinks";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="px-3 flex sticky z-50 top-0 items-center gap-x-4 py-4 backdrop-blur-sm w-full shadow-sm justify-between flex-wrap gap-y-2">
      <Logo />
      <div className="sm:hidden">
        <HamburgerMenu>
          <ChatLinks />
        </HamburgerMenu>
      </div>
    </header>
  );
}
