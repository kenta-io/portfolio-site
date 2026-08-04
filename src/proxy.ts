import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic" },
  });
}
