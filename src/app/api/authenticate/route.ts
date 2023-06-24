import { NextResponse } from "next/server";

export async function authenticate(client_id: any, client_secret: any, endpoint: RequestInfo | URL, scope: any){

  const body: Record<string, string> = {
    client_id,
    client_secret,
    grant_type: "client_credentials",
    scope,
  };

  const formBody = Object.keys(body)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
    .join("&");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    return error;
  }
}

export async function POST(request: Request) {
  const { client_id, client_secret, endpoint, scope } = await request.json();
  const auth = await authenticate(client_id, client_secret, endpoint, scope);
  return NextResponse.json(auth);
}
