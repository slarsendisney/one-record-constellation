"use client";
import { useGlobe } from "@/context/GlobeContext";
import { m } from "framer-motion";

const sampleQuestions = [
    "Show me all active cargo?",
    "Test Suggestion",
    "Test Suggestion",
    "Test Suggestion",
    "Test Suggestion",
    "Test Suggestion",
]

export const Suggestions = ({
  delayed = true,
}: {
  delayed?: boolean;
}): JSX.Element => {
  const { onSubmit: questionSubmit } = useGlobe();
  return (
    <div className="grid md:grid-cols-3 max-w-3xl w-full gap-4">
      {sampleQuestions.map((value, i) => (
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
            questionSubmit(value);
          }}
        >
          <p className="text-white font-bold">{value}</p>
        </m.button>
      ))}
    </div>
  );
};
