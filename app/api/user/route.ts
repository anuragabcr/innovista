import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const result = await getCurrentUser();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("project fetch error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
