"use client";
import Image from "next/image";
import { m } from "framer-motion";

export const Credits = (): JSX.Element => {
  return (
    <div className="absolute bottom-0 p-2 flex flex-col w-full items-center text-white justify-center space-y-2">
      <p className="text-xs uppercase opacity-70">Built by</p>
      <div className="flex items-center gap-2">
        <m.button
          initial={{
            scale: 1,
            opacity: 0.8,
          }}
          whileHover={{
            scale: 1.1,
            opacity: 1,
          }}
        >
          <Image
            alt="Sam Larsen-Disney"
            src="/sam.jpeg"
            width={40}
            height={40}
            className="rounded-full"
          />
        </m.button>
        <p className="opacity-70 text-2xl">&</p>
        <m.button
          initial={{
            scale: 1,
            opacity: 0.8,
          }}
          whileHover={{
            scale: 1.1,
            opacity: 1,
          }}
        >
          <Image
            alt="Ryan Gregory"
            src="/ryan.jpeg"
            width={40}
            height={40}
            className="rounded-full"
          />
        </m.button>
      </div>
    </div>
  );
};
