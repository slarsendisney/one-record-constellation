"use client";
import { useRef, useState } from "react";

import { smoothScroll } from "@/lib/helpers";
import { GuideSuccess, useGuide } from "@/components/guide";
import { CodeBlock } from "../CodeBlock";
import { Reveal } from "../Reveal";

export const bashCode = (
  productLocation: string,
  accessToken: string,
  body: string
) => `curl -i -X POST \\
  ${productLocation || "<PRODUCT LOCATION HERE>"}/logistics-events \\
  -H 'Accept: application/ld+json' \\
  -H 'Content-Type: application/ld+json' \\
  -H 'Authorization: Bearer ${accessToken || "<ACCESS TOKEN HERE>"}' \\
  -d '${body}'`;

const event = (serverUrl: string) => `{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo#"        
  },
  "@type": "cargo:LogisticsEvent",    
  "cargo:eventDate": "2023-06-24T22:18:43.452Z",
  "cargo:creationDate": "2023-06-24T22:18:43.452Z",
  "cargo:eventCode": "DEP",
  "cargo:eventName": "Consignment departed on a specific flight",
  "cargo:eventTimeType": "Actual",
  "cargo:linkedObject": {
    "@type": "cargo:Shipment",
    "@id": "${serverUrl}/logistics-objects/shipment-1"
  }
}`;

export function StepFour() {
  const {
    dispatch,
    state: { data, currentStep },
  } = useGuide<{
    accessToken: string;
    productLocation: string;
    serverUrl: string;
  }>();

  const responseBlockRef = useRef<null | HTMLDivElement>(null);
  const continueRef = useRef<null | HTMLDivElement>(null);

  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(false);
  const [response, setResponse] = useState("");

  async function handleRequest() {
    setIsLoadingRequest(true);
    try {
      const res = await fetch(`/api/logistics-events`, {
        method: "POST",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${data.accessToken}`,
        },
        body: JSON.stringify({
          logistics_event: event(data.serverUrl),
          server_url: `${data.productLocation}/logistics-events`,
        }),
      });

      if (res.ok) {
        const resJson = await res.json();
        setResponse(JSON.stringify(resJson, null, 2));
        setIsResponseSuccessful(true);
        smoothScroll(continueRef);
      } else {
        const resJson = await res.json();
        setResponse(JSON.stringify(resJson, null, 2));
        smoothScroll(responseBlockRef);
      }
    } catch (error) {
      setResponse(`An unknown error ocurred: ${JSON.stringify(error)}`);
    }
    setIsLoadingRequest(false);
  }

  function nextStep() {
    dispatch({ type: "UPDATE_CURRENT_STEP", payload: 5 });
  }

  return (
    <div className="flex flex-col gap-6">
      <p>
        Now we can send some updates when the Product we are shipping performs
        different Transport Movements. These updates are called Logistics
        Events.
      </p>

      <p>Some examples of Logistics Events are:</p>
      <ul className="list-disc list-inside">
        <li>PUP - Pick Up from Shipper</li>
        <li>FOW - Freight Out Warehouse</li>
        <li>DEP - Departed</li>
        <li>ARR - Arrived</li>
        <li>RIW - Received Import Warehouse</li>
        <li>OFD - Out For Delivery</li>
      </ul>

      <p>Let&apos;s add a Logistics Event to the Product we created earlier.</p>

      <CodeBlock
        isExecuting={isLoadingRequest}
        languages={[
          {
            code: bashCode(
              data.productLocation,
              data.accessToken,
              event(data.serverUrl)
            ),
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
          <p>We have now successfully:</p>
          <ul className="list-disc list-inside">
            <li>Authenticated with the auth server</li>
            <li>Formed a ONE Record data model</li>
            <li>Created Logistics Objects</li>
            <li>Posted Logistics Events</li>
          </ul>

          <p>
            Now you have all the tools to start building more advanced models,
            updating Logistics Objects with more events and successfully
            tracking the information as it grows.
          </p>
          <div>
            <button
              className="bg-green-600 rounded-md px-2 py-1 text-white"
              onClick={nextStep}
              disabled={currentStep !== 4}
            >
              Complete Guide
            </button>
          </div>
        </GuideSuccess>
      </div>
    </div>
  );
}
