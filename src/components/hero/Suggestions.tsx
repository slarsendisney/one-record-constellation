"use client";
import { useGlobe } from "@/context/GlobeContext";
import { m } from "framer-motion";

export const Suggestions = ({
  delayed = true,
}: {
  delayed?: boolean;
}): JSX.Element => {
  const { onSubmit: questionSubmit } = useGlobe();
  return (
    <div className="grid md:grid-cols-3 max-w-3xl w-full gap-4">
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
            delay: delayed ? 2 + i * 0.2 : 0,
          }}
          key={i}
          className="bg-black text-left bg-opacity-40 hover:bg-opacity-60 rounded p-4 w-full"
          onClick={() => {
            console.log("Test Suggestion")
            questionSubmit("Test Suggestion");
          }}
        >
          <p className="text-white font-bold">Test Suggestion</p>
        </m.button>
      ))}
    </div>
  );
};
