import React, { ReactNode } from "react";
import Header from "@/components/header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <Header />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
