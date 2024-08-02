import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="flex font-bold lg:text-3xl  bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      <Image
        src="https://www.nawy.com/assets/icons/common/nawy.svg"
        height="100"
        width="130"
        alt="Logo"
      />
    </Link>
  );
}

export default Logo;
