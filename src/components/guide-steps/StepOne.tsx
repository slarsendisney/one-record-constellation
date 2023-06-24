"use client";
import { useState } from "react";

import { GuideSuccess, useGuide } from "@/components/guide";
import { Input } from "../Input";
import { Label } from "../Label";

export function StepOne() {
  const {
    dispatch,
    state: { data, currentStep },
  } = useGuide<{ publicKey: string; secretKey: string }>();

  const [authEndpoint, setAuthEndpoint] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [clientId, setClientId] = useState("");

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    dispatch({
      type: "UPDATE_DATA",
      payload: {
        ...data,
        authEndpoint,
        serverUrl,
        clientId,
      },
    });
    setSubmitted(true);
  }

  function nextStep() {
    dispatch({ type: "UPDATE_CURRENT_STEP", payload: 2 });
  }

  return (
    <div className="flex flex-col gap-6">
      <p>
        First, let us configure your guide experience to work directly with your
        IATA ONE Record server.
      </p>
      <p>
        Enter your personalized information in the form below to get up and
        running. These values will saved and automatically filled out to easily
        interact with the APIs as we continue.
      </p>

      <div className="flex flex-col">
        <Label htmlFor="1-auth-token-endpoint">Auth token endpoint</Label>
        <Input
          id="1-auth-token-endpoint"
          type="text"
          value={authEndpoint}
          onChange={(e) => setAuthEndpoint(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="1-one-record-server-url">ONE Record Server URL</Label>
        <Input
          id="1-one-record-server-url"
          type="text"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="client-id">Client ID</Label>
        <Input
          id="client-id"
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
      </div>

      <button
        className="bg-green-600 rounded-md px-2 py-1 text-white disabled:bg-gray-400 hover:bg-green-700"
        onClick={handleSubmit}
        disabled={!authEndpoint || !serverUrl || !clientId || submitted}
      >
        Submit
      </button>

      <GuideSuccess title="Guide personalized" show={submitted}>
        <p>
          Your guide is now setup and ready to interact with your ONE Record
          server. Next up is authentication.
        </p>
        <div>
          <button
            className="bg-green-600 rounded-md px-4 py-1 text-white disabled:bg-gray-400 hover:bg-green-700"
            onClick={nextStep}
            disabled={currentStep !== 1}
          >
            Continue
          </button>
        </div>
      </GuideSuccess>
    </div>
  );
}
