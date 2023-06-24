"use client";
import { UserButton } from "@clerk/nextjs";
import { m } from "framer-motion";

export const Nav = ({ className }: { className?: string }) => {
  return (
    <nav
      className={
        (className ||"") +
        " w-full items-center flex justify-between px-6 hover:bg-one-record-blue transition-colors duration-300 py-4 mx-auto"
      }
    >
        <div></div>

      <m.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <UserButton afterSignOutUrl="/" />
      </m.div>
    </nav>
  );
};
