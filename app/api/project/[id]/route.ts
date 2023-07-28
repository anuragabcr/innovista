import { getProjectDetails, deleteProject } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req?.url?.split("project/")[1];

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const result = await getProjectDetails(id || "");
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("project fetch error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req?.url?.split("project/")[1];

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const result = await deleteProject(id || "");
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("project fetch error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
