import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import admin from "firebase-admin";

import { storage } from "../../../../firebase-admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const server_url = searchParams.get("server_url");

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

  try {
    const doc = await storage.collection("data").doc("logistics-objects").get();
    const ids = doc.data()?.ids;

    const res = await Promise.all(
      ids.map(async (id: string) => {
        const res = await fetch(`${server_url}/${id}`, {
          headers: {
            Authorization: authorization,
          },
        });
        const resJson = await res.json();
        return resJson;
      })
    );

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
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

    return NextResponse.json({ "@id": `${server_url}/%${id}` });
  } catch (error) {
    console.log(error);
  }
}
