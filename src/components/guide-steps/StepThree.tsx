"use client";
import { useEffect, useRef, useState } from "react";

import { smoothScroll } from "@/lib/helpers";
import { CodeBlock } from "@/components/CodeBlock";
import { GuideSuccess, useGuide } from "@/components/guide";
import { Label } from "../Label";
import { Input } from "../Input";
import { Reveal } from "../Reveal";
import { Loading } from "../Loading";

export const bashCode = (
  serverUrl: string,
  accessToken: string,
  body: string
) => `curl -i -X POST \\
  ${serverUrl || "<ONE RECORD SERVER URL HERE>"}/logistics-objects \\
  -H 'Accept: application/ld+json' \\
  -H 'Content-Type: application/ld+json' \\
  -H 'Authorization: Bearer ${accessToken || "<ACCESS TOKEN HERE>"}' \\
  -d '${body}'`;

export const product = (name: string) => `{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo#"
  },
  "@type": "cargo:Product",
  "cargo:description": "${name}"
}`;

export const shipper = (name: string) => `{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo#"
  },
  "@type": "https://onerecord.iata.org/ns/cargo#Organization",
  "cargo:basedAtLocation": {
    "@type": "cargo:Location",
    "cargo:locationName": "LHR",
    "cargo:locationType": "Airport",
    "cargo:geolocation": {
      "@type": "cargo:Geolocation",
      "cargo:latitude": "51.470020",
      "cargo:longitude": "-0.454295"
    }
  },
  "cargo:name": "${name}"
}`;

export const consignee = (name: string) => `{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo#"
  },
  "@type": "https://onerecord.iata.org/ns/cargo#Organization",
  "cargo:basedAtLocation": {
    "@type": "cargo:Location",
    "cargo:locationName": "DXB",
    "cargo:locationType": "Airport",
    "cargo:geolocation": {
      "@type": "cargo:Geolocation",
      "cargo:latitude": "25.252777",
      "cargo:longitude": "55.364445"
    }
  },
  "cargo:name": "${name}"
}`;

export const aircraft = (name: string) => `{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo#"
  },
  "@type": "cargo:TransportMeans",
  "cargo:operatedTransportMovements": {
    "@id":
      "https://london.one-record.lhind.dev/logistics-objects/transport-movement-1"
  },
  "cargo:vehicleModel": "${name}",
  "cargo:vehicleType": "Aircraft",
  "cargo:typicalCo2Coefficient": "90"
}`;

export function StepThree() {
  const {
    dispatch,
    state: { data, currentStep },
  } = useGuide<{ accessToken: string; serverUrl: string }>();

  const responseBlockRef1 = useRef<null | HTMLDivElement>(null);
  const continueRef1 = useRef<null | HTMLDivElement>(null);
  const responseBlockRef2 = useRef<null | HTMLDivElement>(null);
  const continueRef2 = useRef<null | HTMLDivElement>(null);
  const responseBlockRef3 = useRef<null | HTMLDivElement>(null);
  const continueRef3 = useRef<null | HTMLDivElement>(null);

  const [serverUrl, setServerUrl] = useState(data.serverUrl);
  const [productName, setProductName] = useState("");
  const [shipperName, setShipperName] = useState("");
  const [consigneeName, setConsigneeName] = useState("");
  const [aircraftName, setAircraftName] = useState("");

  const [isLoadingRequest1, setIsLoadingRequest1] = useState(false);
  const [isResponseSuccessful1, setIsResponseSuccessful1] = useState(false);
  const [response1, setResponse1] = useState("");

  const [isLoadingRequest2, setIsLoadingRequest2] = useState(false);
  const [isResponseSuccessful2, setIsResponseSuccessful2] = useState(false);
  const [response2, setResponse2] = useState("");

  const [isLoadingRequest3, setIsLoadingRequest3] = useState(false);
  const [isResponseSuccessful3, setIsResponseSuccessful3] = useState(false);
  const [response3, setResponse3] = useState("");

  useEffect(() => {
    setServerUrl(data.serverUrl);
  }, [data]);

  async function handleRequest() {
    setIsLoadingRequest1(true);
    try {
      const res = await fetch(`/api/logistics-objects`, {
        method: "POST",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${data.accessToken}`,
        },
        body: JSON.stringify({
          logistics_object: product(productName),
          server_url: `${data.serverUrl}/logistics-objects`,
        }),
      });

      if (res.ok) {
        const resJson = await res.json();
        setResponse1(JSON.stringify(resJson, null, 2));
        dispatch({
          type: "UPDATE_DATA",
          payload: {
            ...data,
            productLocation: resJson.headers.location,
          },
        });
        setIsResponseSuccessful1(true);
        smoothScroll(continueRef1);
      } else {
        const resJson = await res.json();
        // pretty print JSON
        setResponse1(JSON.stringify(resJson, null, 2));
        smoothScroll(responseBlockRef1);
      }
    } catch (error) {
      setResponse1(`An unknown error ocurred: ${JSON.stringify(error)}`);
    }
    setIsLoadingRequest1(false);
  }

  async function submitShipperAndConsignee() {
    setIsLoadingRequest2(true);
    try {
      const responses = await Promise.all(
        [shipper(shipperName), consignee(consigneeName)].map(async (body) => {
          const res = await fetch(`/api/logistics-objects`, {
            method: "POST",
            headers: {
              Accept: "application/ld+json",
              "Content-Type": "application/ld+json",
              Authorization: `Bearer ${data.accessToken}`,
            },
            body: JSON.stringify({
              logistics_object: body,
              server_url: `${data.serverUrl}/logistics-objects`,
            }),
          });
          const resJson = await res.json();
          return resJson;
        })
      );
      setResponse2(JSON.stringify([responses[0], responses[1]], null, 2));
      setIsResponseSuccessful2(true);
      smoothScroll(continueRef2);
    } catch (error) {
      setResponse2(`An unknown error ocurred: ${JSON.stringify(error)}`);
    }
    setIsLoadingRequest2(false);
  }

  async function handleAircraftRequest() {
    setIsLoadingRequest3(true);
    try {
      const res = await fetch(`/api/logistics-objects`, {
        method: "POST",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${data.accessToken}`,
        },
        body: JSON.stringify({
          logistics_object: aircraft(aircraftName),
          server_url: `${data.serverUrl}/logistics-objects`,
        }),
      });

      if (res.ok) {
        const resJson = await res.json();
        setResponse3(JSON.stringify(resJson, null, 2));
        setIsResponseSuccessful3(true);
        smoothScroll(continueRef3);
      } else {
        const resJson = await res.json();
        // pretty print JSON
        setResponse3(JSON.stringify(resJson, null, 2));
        smoothScroll(responseBlockRef3);
      }
    } catch (error) {
      setResponse1(`An unknown error ocurred: ${JSON.stringify(error)}`);
    }
    setIsLoadingRequest1(false);
  }

  function nextStep() {
    dispatch({ type: "UPDATE_CURRENT_STEP", payload: 4 });
  }

  return (
    <div className="flex flex-col gap-6">
      <p>
        Now it is time to define the logistics objects that we want to model and
        track. For the purpose of this guide we are going to create a product
        that we are going to track from a shipper in London, through it&apos;s
        flight, to the consignee in Dubai.
      </p>

      <p>
        First let us define the ONE Record server URL that we are going to make
        a POST request to:
      </p>

      <div className="flex flex-col">
        <Label htmlFor="3-one-record-server-url">ONE Record Server URL</Label>
        <Input
          id="3-one-record-server-url"
          type="text"
          value={serverUrl}
          readOnly
        />
      </div>

      <p>Now let us define the product that we want to track:</p>

      <div className="flex flex-col">
        <Label htmlFor="3-product-name">Product name</Label>
        <Input
          id="3-product-name"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <CodeBlock
        isExecuting={isLoadingRequest1}
        languages={[
          {
            code: bashCode(serverUrl, data.accessToken, product(productName)),
            label: "cURL",
            value: "bash",
          },
        ]}
        onExecute={handleRequest}
      />

      <Reveal show={!!response1}>
        <div ref={responseBlockRef1}>
          <CodeBlock
            languages={[{ code: response1, label: "tsx", value: "tsx" }]}
            noHeader
          />
        </div>
      </Reveal>

      <Reveal show={isResponseSuccessful1}>
        <div className="flex flex-col gap-6" ref={continueRef1}>
          <p>
            Great! Now let&apos;s define the name of a Shipper and Consignee to
            mark where our product is being shipped from/to:
          </p>

          <div className="flex flex-col">
            <Label htmlFor="3-shipper">Shipper Company Name</Label>
            <Input
              id="3-shipper"
              type="text"
              value={shipperName}
              onChange={(e) => setShipperName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="3-consignee">Consignee Company Name</Label>
            <Input
              id="3-consignee"
              type="text"
              value={consigneeName}
              onChange={(e) => setConsigneeName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="3-shipper-code">Shipper</Label>
            <CodeBlock
              languages={[
                {
                  code: bashCode(
                    serverUrl,
                    data.accessToken,
                    shipper(shipperName)
                  ),
                  label: "cURL",
                  value: "bash",
                },
              ]}
              noHeader
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="3-consignee-code">Consignee</Label>
            <CodeBlock
              languages={[
                {
                  code: bashCode(
                    serverUrl,
                    data.accessToken,
                    consignee(consigneeName)
                  ),
                  label: "cURL",
                  value: "bash",
                },
              ]}
              noHeader
            />
          </div>

          <button
            className="bg-green-600 rounded-md px-2 py-1 text-white flex justify-center"
            onClick={submitShipperAndConsignee}
          >
            {isLoadingRequest2 ? <Loading /> : "Submit Shipper and Consignee"}
          </button>
        </div>
      </Reveal>

      <Reveal show={!!response2}>
        <div ref={responseBlockRef2}>
          <CodeBlock
            languages={[{ code: response2, label: "tsx", value: "tsx" }]}
            noHeader
          />
        </div>
      </Reveal>

      <Reveal show={isResponseSuccessful2}>
        <div className="flex flex-col gap-6" ref={continueRef2}>
          <p>
            Finally let&apos;s define the type of aircraft that is being used to
            ship the Product you defined:
          </p>

          <div className="flex flex-col">
            <Label htmlFor="3-shipper">Aircraft</Label>
            <Input
              id="3-aircraft"
              type="text"
              value={aircraftName}
              onChange={(e) => setAircraftName(e.target.value)}
            />
          </div>

          <CodeBlock
            isExecuting={isLoadingRequest3}
            languages={[
              {
                code: bashCode(
                  serverUrl,
                  data.accessToken,
                  aircraft(aircraftName)
                ),
                label: "cURL",
                value: "bash",
              },
            ]}
            onExecute={handleAircraftRequest}
          />
        </div>
      </Reveal>

      <Reveal show={!!response3}>
        <div ref={responseBlockRef3}>
          <CodeBlock
            languages={[{ code: response3, label: "tsx", value: "tsx" }]}
            noHeader
          />
        </div>
      </Reveal>

      <div ref={continueRef3}>
        <GuideSuccess
          title="Logistics Objects created"
          show={isResponseSuccessful3}
        >
          <p>
            We have now populated our ONE Record server with Logistics Objects
            that are ready to track your Product as it ships its way across the
            world.
          </p>
          <p>
            Let&apos;s send some events to update the status of the product as
            it is shipped on each part of its journey.
          </p>
          <div>
            <button
              className="bg-green-600 rounded-md px-2 py-1 text-white"
              onClick={nextStep}
              disabled={currentStep !== 3}
            >
              Continue
            </button>
          </div>
        </GuideSuccess>
      </div>
    </div>
  );
}
