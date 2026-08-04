import { requireEnv } from "@/lib/env";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const authValue = authHeader.split(" ")[1];
    const [user, password] = Buffer.from(authValue, "base64")
      .toString()
      .split(":");

    if (
      user === requireEnv("BASIC_AUTH_USER") &&
      password === requireEnv("BASIC_AUTH_PASSWORD")
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic" },
  });
}
