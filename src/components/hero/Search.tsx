"use client";
import { useGlobe } from "@/context/GlobeContext";
import { m } from "framer-motion";
import {
  StopIcon,
  MicrophoneIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const Search = () => {
  const { onSubmit: submitQuestion } = useGlobe();
  const [searchInput, setSearchInput] = useState("");
  const [isUsingVoice, setIsUsingVoice] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      setIsUsingVoice(true);
    }
  }, [listening]);

  useEffect(() => {
    setSearchInput(transcript);
  }, [transcript]);

  const onSubmit = useCallback(() => {
    if (searchInput.length > 0) {
      submitQuestion(searchInput);
    }
  }, [searchInput, submitQuestion]);

  // when listening switches from true to false, submit the question
  useEffect(() => {
    if (!listening && isUsingVoice && searchInput.length > 0) {
      onSubmit();
    }
  }, [isUsingVoice, listening, onSubmit, searchInput.length]);

  // autofocus the search input when rendered
  useEffect(() => {
    document.getElementById("search")?.focus();
  }, []);

  return (
    <m.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1.5,
      }}
      className="relative max-w-3xl w-full"
    >
      <input
        id="search"
        autoComplete="off"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        className="border-white bg-black bg-opacity-20 border-2 text-white rounded-lg pl-6 pr-4 py-3.5 text-lg w-full bg-transparent focus:ring-0 focus:ring-offset-0"
      />

      <button
        className="absolute top-0 right-0 h-full flex items-center mr-3"
        onClick={() => {
          if (listening) {
            SpeechRecognition.stopListening();
          }
          if (searchInput.length === 0 && browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening();
          }
          else {
            onSubmit();
          }
        }}
      >
        {listening ? (
          <StopIcon className="h-9 w-9 text-white p-1.5 bg-red-600 rounded-lg" />
        ) : searchInput.length === 0 ? (
          <MicrophoneIcon className="h-9 w-9 text-white p-1.5 bg-blue-600 rounded-lg" />
        ) : (
          <MagnifyingGlassIcon className="h-9 w-9 text-white p-1.5 bg-blue-600 rounded-lg" />
        )}
      </button>
    </m.div>
  );
};
