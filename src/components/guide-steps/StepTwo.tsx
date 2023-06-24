"use client";
import { useEffect, useRef, useState } from "react";

import { smoothScroll } from "@/lib/helpers";
import { GuideSuccess, useGuide } from "@/components/guide";
import { CodeBlock } from "../CodeBlock";
import { Label } from "../Label";
import { Input } from "../Input";
import { Reveal } from "../Reveal";

export const bashCode = (
  authEndpoint: string,
  clientId: string,
  clientSecret: string,
  scope: string
) => `curl -i -X POST \\
  ${authEndpoint || "<AUTH ENDPOINT HERE>"} \\
  -H 'Content-Type: application/x-www-form-urlencoded' \\
  -d 'client_id=${encodeURIComponent(clientId)}
  &client_secret=${encodeURIComponent(clientSecret)}
  &grant_type=client_credentials
  &scope=${encodeURIComponent(scope)}'`;

export function StepTwo() {
  const {
    dispatch,
    state: { data, currentStep },
  } = useGuide<{ authEndpoint: string; clientId: string }>();

  const responseBlockRef = useRef<null | HTMLDivElement>(null);
  const continueRef = useRef<null | HTMLDivElement>(null);

  const [authEndpoint, setAuthEndpoint] = useState(data.authEndpoint);
  const [clientId, setClientId] = useState(data.clientId);
  const [clientSecret, setClientSecret] = useState("");
  const [scope, setScope] = useState("");

  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    setAuthEndpoint(data.authEndpoint);
    setClientId(data.clientId);
  }, [data]);

  async function handleRequest() {
    setIsLoadingRequest(true);
    try {
      const res = await fetch(`/api/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          endpoint: authEndpoint,
          scope,
        }),
      });

      if (res.ok) {
        const resJson = await res.json();
        setResponse(JSON.stringify(resJson, null, 2));
        setIsResponseSuccessful(true);
        smoothScroll(continueRef);
        dispatch({
          type: "UPDATE_DATA",
          payload: {
            ...data,
            accessToken: resJson.access_token,
          },
        });
      } else {
        const resJson = await res.json();
        // pretty print JSON
        setResponse(JSON.stringify(resJson, null, 2));
        smoothScroll(responseBlockRef);
      }
    } catch (error) {
      setResponse(`An unknown error ocurred: ${JSON.stringify(error)}`);
    }
    setIsLoadingRequest(false);
  }

  function nextStep() {
    dispatch({ type: "UPDATE_CURRENT_STEP", payload: 3 });
  }

  return (
    <div className="flex flex-col gap-6">
      <p>
        In order to interact with your ONE Record server you will first need to
        authenticate.
      </p>

      <p>
        This requires you to retrieve an OAuth 2.0 Access Token from your auth
        server so that you can send the token in any subsequent request to the
        ONE Record server.
      </p>

      <p>
        Lets construct the HTTP request by entering the following required
        information (you&apos;ll notice some fields are already populated with
        information provided in the previous step):
      </p>

      <div className="flex flex-col">
        <Label htmlFor="2-auth-token-endpoint">Auth token endpoint</Label>
        <Input
          id="2-auth-token-endpoint"
          type="text"
          value={authEndpoint}
          readOnly
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="2-client-id">Client ID</Label>
        <Input id="2-client-id" type="text" value={clientId} readOnly />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="2-client-secret">Client Secret</Label>
        <Input
          id="2-client-secret"
          type="text"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="2-scope">Scope</Label>
        <Input
          id="2-scope"
          type="text"
          value={scope}
          onChange={(e) => setScope(e.target.value)}
        />
      </div>

      <CodeBlock
        isExecuting={isLoadingRequest}
        languages={[
          {
            code: bashCode(authEndpoint, clientId, clientSecret, scope),
            label: "cURL",
            value: "bash",
          },
        ]}
        onExecute={handleRequest}
      />

      <Reveal show={!!response}>
        <div ref={responseBlockRef}>
          <CodeBlock
            languages={[{ code: response, label: "tsx", value: "tsx" }]}
            noHeader
          />
        </div>
      </Reveal>

      <div ref={continueRef}>
        <GuideSuccess title="You're authorized" show={isResponseSuccessful}>
          <p>
            We now have an access token to send it in our requests to your ONE
            Record server.
          </p>
          <div>
            <button
              className="bg-green-600 rounded-md px-2 py-1 text-white"
              onClick={nextStep}
              disabled={currentStep !== 2}
            >
              Continue
            </button>
          </div>
        </GuideSuccess>
      </div>
    </div>
  );
}
