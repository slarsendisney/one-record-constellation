import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const { logistics_event, server_url } = await request.json();

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
      body: logistics_event,
    });
    const id = res.headers.get("location")?.split(`${server_url}/`)[1];

    return NextResponse.json({
      headers: {
        location: `${server_url}/${id}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
