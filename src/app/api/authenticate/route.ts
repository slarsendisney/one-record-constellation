import { authenticate } from "@/utils/authenticate";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { client_id, client_secret, endpoint, scope } = await request.json();
  const auth = await authenticate(client_id, client_secret, endpoint, scope);
  return NextResponse.json(auth);
}
