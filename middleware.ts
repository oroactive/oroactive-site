import { NextResponse, type NextRequest } from "next/server";
import { suspensionResponse } from "./lib/site-suspension";
import { publicAccessResponse } from "./lib/public-access";

export function middleware(request: NextRequest) {
  return suspensionResponse(request, process.env.NODE_ENV, process.env.OROACTIVE_PUBLIC_SITE)
    ?? publicAccessResponse(request, process.env.NODE_ENV)
    ?? NextResponse.next();
}

// Include direct article URLs, APIs, RSC requests and static assets, not only the homepage.
export const config = { matcher: "/:path*" };
