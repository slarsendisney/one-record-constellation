"use client";
import { useGlobe } from "@/context/GlobeContext";
import { m } from "framer-motion";
import {
  StopIcon,
  MicrophoneIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const Search = () => {
  const { setActive } = useGlobe();
  const [searchInput, setSearchInput] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setSearchInput(transcript);
  }, [transcript]);

  const onSubmit = () => {
    if (searchInput.length > 0) {
      setActive(true);
    }
  };

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
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        className="border-white bg-black bg-opacity-20 border-2 text-white rounded-lg pl-6 pr-4 py-3.5 text-lg w-full bg-transparent"
      />

      <button className="absolute top-0 right-0 h-full flex items-center mr-3" onClick={() => {
        if(listening){
            SpeechRecognition.stopListening();
        }
        if(searchInput.length === 0 && browserSupportsSpeechRecognition){
            SpeechRecognition.startListening();
        }

      }}>
        {
            listening ? <StopIcon className="h-9 w-9 text-white p-1.5 bg-red-600 rounded-lg" /> :
            browserSupportsSpeechRecognition && searchInput.length === 0 ? <MicrophoneIcon className="h-9 w-9 text-white p-1.5 bg-blue-600 rounded-lg" /> :
            <MagnifyingGlassIcon className="h-9 w-9 text-white p-1.5 bg-blue-600 rounded-lg" />
        }
       
      </button>
    </m.div>
  );
};
