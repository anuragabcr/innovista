import { getUserProjects } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req?.url?.split("projects/")[1];

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const result = await getUserProjects(id);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("project fetch error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
