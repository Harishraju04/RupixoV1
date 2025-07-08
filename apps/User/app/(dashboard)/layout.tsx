import React, { JSX } from "react";
import { SidebarItem } from "../components/SidebarItem";
import { AppbarClient } from "../AppbarClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppbarClient></AppbarClient>
      <main className="flex-1 overflow-auto px-6 py-4">
          {children}
        </main>
    </div>
  );
}

