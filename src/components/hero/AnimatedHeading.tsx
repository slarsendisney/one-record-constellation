"use client";
import {m} from "framer-motion";
import { AnimatedOneRecordLogo } from "@/assets/AnimatedOneRecordLogo";

export const AnimatedHeading = (): JSX.Element => {
  return (
      <div className="flex items-center">
        <div className="border-white border-2">
          <AnimatedOneRecordLogo className="w-8 border-white" />
        </div>
        <m.div
            className="overflow-hidden "
            initial={{
                width: 0,
                marginLeft: 0,
            }}
            animate={{
                width: 240,
                marginLeft: 20,
            }}
            transition={{
                duration: 1,
                delay: 0.5,
            }}
        >
            <p className="text-white text-4xl font-bold">Constellation</p>
        </m.div>
      </div>
  );
};
