import { NextResponse, type NextRequest } from "next/server";
import { suspensionResponse } from "./lib/site-suspension";

export function middleware(request: NextRequest) {
  return suspensionResponse(request, process.env.NODE_ENV, process.env.OROACTIVE_PUBLIC_SITE) ?? NextResponse.next();
}

// Include direct article URLs, APIs, RSC requests and static assets, not only the homepage.
export const config = { matcher: "/:path*" };
