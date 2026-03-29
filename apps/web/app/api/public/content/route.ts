import { NextResponse } from "next/server";
import { getSiteContentMap } from "@/lib/site-content";

export async function GET() {
  const content = await getSiteContentMap();
  return NextResponse.json(content);
}
