"use client";
import type { ReactNode } from "react";

type GuideSidebarProps = {
  children: ReactNode;
};

export function GuideSidebar({ children }: GuideSidebarProps) {
  return (
    <div className="sticky top-[2.5rem] w-[37.5%] h-full ml-auto bg-gray-200 rounded-xl border-[1px] border-black">
      {children}
    </div>
  );
}
