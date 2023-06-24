import type { NextApiRequest, NextApiResponse } from "next";
import dialogflow from "@google-cloud/dialogflow";
import gcKey from "../../../../gc.json";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const { project_id, private_key, client_email } = gcKey;


export async function POST(request: NextRequest) {
  const { message } = await request.json();
  let config = {
    credentials: {
        private_key,
      client_email,
    },
  };

  const sessionClient = new dialogflow.SessionsClient(config);

  const sessionPath = sessionClient.projectAgentSessionPath(project_id, randomUUID());
  const requestObj = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(requestObj);

  const result = responses[0].queryResult;
  if(!result) {
    return new Response("Dialog Flow error", {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (result.intent && result.intent.displayName !== "FALLBACK") {
    return NextResponse.json({
      message: result.fulfillmentText,
      intent: result.intent.displayName,
    });
  }


  return NextResponse.json({
    message: "ONTO OPEN AI"
  });
  

}
