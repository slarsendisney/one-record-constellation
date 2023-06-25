import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getLogisticsObjects } from "@/utils/getLogisticsObjects";


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

    // await storage
    //   .collection("data")
    //   .doc("logistics-objects")
    //   .update({
    //     ids: admin.firestore.FieldValue.arrayUnion(id),
    //   });

    return NextResponse.json({
      headers: {
        location: `${server_url}/${id}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
