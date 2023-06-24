"use client";
import { useGlobe } from "@/context/GlobeContext";
import { CpuChipIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import {
  StopIcon,
  MicrophoneIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const Messaging = (): JSX.Element | null => {
    const { onSubmit: submitQuestion, active, messages } = useGlobe();
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
        setSearchInput("");
        setIsUsingVoice(false);
      }
    }, [searchInput, submitQuestion]);
  
    // when listening switches from true to false, submit the question
    useEffect(() => {
      if (!listening && isUsingVoice && searchInput.length > 0) {
        onSubmit();
      }
    }, [isUsingVoice, listening, onSubmit, searchInput.length]);

  if (!active) return null;

  return (
    <div className="flex flex-col justify-end items-end absolute bottom-0 right-0 p-6 space-y-1 w-full max-w-lg">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`flex items-center  bg-opacity-40 p-2 space-x-2 rounded ${
            message.user === "AI" ? "bg-one-record-blue" : "bg-black"
          }`}
        >
          {message.user === "AI" ? (
            <CpuChipIcon className="w-4 h-4 text-white" />
          ) : (
            <QuestionMarkCircleIcon className="w-4 h-4 text-white" />
          )}
          <p className="text-white text-sm">{message.message}</p>
        </div>
      ))}
      <div className="w-full relative">
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
          className="border-white bg-black bg-opacity-20 border-2 text-white rounded-lg pl-1 pr-2 py-1.5 w-full bg-transparent focus:ring-0 focus:ring-offset-0"
        />
        <button
          className="absolute top-0 right-0 h-full flex items-center mr-2"
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
            <StopIcon className="h-7 w-7 text-white p-1.5 bg-red-600 rounded-lg" />
          ) : searchInput.length === 0 ? (
            <MicrophoneIcon className="h-7 w-7 text-white p-1.5 bg-one-record-blue rounded-lg" />
          ) : (
            <MagnifyingGlassIcon className="h-7 w-7 text-white p-1.5 bg-one-record-blue rounded-lg" />
          )}
        </button>
      </div>
    </div>
  );
};
