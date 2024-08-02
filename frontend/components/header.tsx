import React from "react";
import Logo from "./logo";
import ThemeSwitcher from "./theme-switcher";

const Header = () => {
  return (
    <nav
      className="sticky top-0 flex
        justify-between items-center border-b
        border-border h-[60px] px-4 py-2 bg-inherit	z-50"
    >
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Header;
