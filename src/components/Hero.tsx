"use client";
import { AnimatedHeading } from "./hero/AnimatedHeading";
import { Search } from "./hero/Search";
import { useGlobe } from "@/context/GlobeContext";
import { Suggestions } from "./hero/Suggestions";
import { Credits } from "./hero/Credits";
import { AnimatePresence, m } from "framer-motion";

export const Hero = (): JSX.Element => {
  const { active } = useGlobe();
  return (
    <AnimatePresence>
      {!active && (
        <m.div exit={{ opacity: 0 }} className="w-full h-full absolute top-0 left-0 z-10 flex flex-col items-center justify-center space-y-4">
          <AnimatedHeading />
          <Search />
          <Suggestions />
          <Credits />
        </m.div>
      )}
    </AnimatePresence>
  );
};
