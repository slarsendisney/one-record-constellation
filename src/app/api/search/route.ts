import { Configuration, OpenAIApi } from "openai";
import {
  CreateChatCompletionRequest,
  CreateCompletionRequest,
} from "openai/api";

import dialogflow from "@google-cloud/dialogflow";
import { GCJson } from "../../../../gc";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { dummyData } from "../../../data/dummy";
import { getLogisticsObjects } from "../../../utils/getLogisticsObjects";

const { project_id, private_key, client_email } = GCJson;

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const intentToMap = (data: any, intent: string, Entity: string) => {
  switch (intent) {
    case "FIND_ALL_ENTITY":
      if (Entity === "SHIPPER") {
        return {
          shippers: data.shippers,
          consignees: [],
          routes: [],
        };
      } else if (Entity === "CONSIGNEE") {
        return {
          shippers: [],
          consignees: data.consignees,
          routes: [],
        };
      }

      return {
        shippers: [],
        consignees: [],
        routes: [],
      };
    case "ALL_ACTIVE":
      console.log(data.routes.map((d: any) => d.coordinates));
      return data;
    default:
      return {
        shippers: [],
        consignees: [],
        routes: [],
      };
  }
};

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  const sampleData = await dummyData();

  let config = {
    credentials: {
      private_key,
      client_email,
    },
  };

  const sessionClient = new dialogflow.SessionsClient(config);

  const sessionPath = sessionClient.projectAgentSessionPath(
    project_id,
    randomUUID()
  );
  const requestObj = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en-US",
      },
    },
  };

  const [
    responses,
    // logisticsObjects
  ] = await Promise.all([
    sessionClient.detectIntent(requestObj),
    // getLogisticsObjects("https://london.one-record.lhind.dev"),
  ]);

  const result = responses[0].queryResult;
  if (!result) {
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
    console.log(result);
    return NextResponse.json({
      message: result.fulfillmentText,
      intent: result.intent.displayName,
      parameters: result?.parameters,
      map: intentToMap(
        sampleData,
        result?.intent?.displayName || "",
        result?.parameters?.fields?.Entity?.stringValue || ""
      ),
    });
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: message },
    ],
  });

  console.log(completion.data.choices[0].message);

  return NextResponse.json({
    message: "Sorry I'm struggling to understand that. Can you try again?",
  });
}
