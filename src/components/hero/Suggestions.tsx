"use client";
import { m } from "framer-motion";

export const Suggestions = (): JSX.Element => {
  return (
    <div
      className="grid grid-cols-3 max-w-3xl w-full gap-4"
    >
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <m.button
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2 + i * 0.2,
          }}
          key={i}
          className="bg-black text-left bg-opacity-40 hover:bg-opacity-60 rounded p-4 w-full"
        >
          <p className="text-white font-bold">Test Suggestion</p>
        </m.button>
      ))}
    </div>
  );
};
