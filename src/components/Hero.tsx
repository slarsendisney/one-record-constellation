/* eslint-disable react/no-unescaped-entities */
"use client";

import { AnimatedHeading } from "./hero/AnimatedHeading";
import { Search } from "./hero/Search";
import { useGlobe } from "@/context/GlobeContext";
import { Suggestions } from "./hero/Suggestions";
import { Credits } from "./hero/Credits";
import { AnimatePresence, m } from "framer-motion";
import { Links } from "./hero/Links";
import { Loading } from "./hero/Loading";
import { ExclamationTriangleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export const Hero = (): JSX.Element => {
  const { active, fetching, error, reset } = useGlobe();
  return (
    <AnimatePresence>
      {error && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full absolute top-0 left-0 z-20 flex flex-col items-center justify-center space-y-4"
        >
          <div className="max-w-3xl w-full flex items-center bg-black border-white border-2 bg-opacity-40 text-white p-3 space-x-2 rounded">
            <ExclamationTriangleIcon className="w-8 text-yellow-500" />
            <p>
             
              We can't seem to make sense of this query, perhaps try one of the
              suggestions below?
            </p>
          </div>
          <div className="space-y-12 flex justify-center items-center flex-col max-w-3xl w-full">
          <Suggestions delayed={false} />
          <button onClick={reset} className="bg-blue-600 text-white flex items-center justify-center space-x-2 py-1 px-4 rounded-full text-xl">
            <ArrowLeftIcon className="w-4" />
            <p>Back</p>
          </button>
          </div>
        </m.div>
      )}
      {!active && fetching && !error && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full absolute top-0 left-0 z-20 flex flex-col items-center justify-center space-y-4"
        >
          <Loading />
        </m.div>
      )}
      {!active && !fetching && !error && (
        <m.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full absolute top-0 left-0 z-10 flex flex-col items-center justify-center space-y-4"
        >
          <AnimatedHeading />
          <Search />
          <Suggestions />
          <Links />
          <Credits />
        </m.div>
      )}
    </AnimatePresence>
  );
};
