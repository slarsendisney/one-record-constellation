import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "firebase-admin";

import { storage } from "../../../../firebase-admin";
import { authenticate } from "../authenticate/route";

export async function getLogisticsObjects(server_url: string) {
  const auth = await authenticate(
    process.env.ONE_RECORD_CLIENT_ID,
    process.env.ONE_RECORD_CLIENT_SECRET,
    process.env.ONE_RECORD_ENDPOINT as string,
    process.env.ONE_RECORD_SCOPE
  );

  const { access_token } = auth;

  try {
    const doc = await storage.collection("data").doc("logistics-objects").get();
    const ids = doc.data()?.ids;

    const res = await Promise.all(
      ids.map(async (id: string) => {
        const res = await fetch(`${server_url}/logistics-objects/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const resJson = await res.json();
        return resJson;
      })
    );

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const server_url = searchParams.get("server_url");

  if (!server_url) {
    return new Response(null, {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  const res = await getLogisticsObjects(server_url);
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const { logistics_object, server_url } = await request.json();

  const headersList = headers();
  const authorization = headersList.get("authorization");

  if (!authorization) {
    return new Response(null, {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const res = await fetch(server_url, {
      method: "POST",
      headers: {
        Authorization: authorization,
        Accept: "application/ld+json",
        "Content-Type": "application/ld+json",
      },
      body: logistics_object,
    });
    const id = res.headers.get("location")?.split(`${server_url}/`)[1];

    await storage
      .collection("data")
      .doc("logistics-objects")
      .update({
        ids: admin.firestore.FieldValue.arrayUnion(id),
      });

    return NextResponse.json({
      headers: {
        location: `${server_url}/${id}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
