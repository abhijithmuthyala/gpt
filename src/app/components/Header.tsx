import ChatLinks from "./chat-links/ChatLinks";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import NewChat from "./NewChat";
import Signout from "./Signout";

export default function Header() {
  return (
    <header className="px-3 flex sticky z-50 top-0 items-center gap-x-4 py-4 backdrop-blur-sm w-full shadow-sm justify-between flex-wrap gap-y-2">
      <Logo />
      <div className="sm:flex items-center gap-x-3 sm:flex-wrap">
        <NewChat />
        <Signout />
      </div>
      <div className="sm:hidden">
        <HamburgerMenu>
          <ChatLinks />
          <NewChat />
        </HamburgerMenu>
      </div>
    </header>
  );
}
