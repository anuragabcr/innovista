import { fetchAllProjects } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { category, endcursor } = await req.json();

  try {
    const result = await fetchAllProjects(category, endcursor);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("Image upload error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
